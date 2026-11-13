import os
import time
import logging
from contextlib import asynccontextmanager
from datetime import datetime, timezone
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import (
    BackgroundTasks,
    Depends,
    FastAPI,
    HTTPException,
    Request,
    Response,
    status,
)
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text
from sqlalchemy.orm import Session

from database import DB_HOST, DB_NAME, DB_PORT, DB_USER, get_db, init_db
import models
import schemas
from seed import SAMPLE_PROJECTS
from security import (
    ADMIN_USERNAME,
    ADMIN_PASSWORD,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    create_access_token,
    get_current_admin,
    verify_password,
)
from rate_limiter import contact_limiter, inquiry_limiter, auth_limiter, chat_limiter, rate_limit
from notifier import send_contact_notification, send_inquiry_notification
from rag_service import rag_engine

load_dotenv()

# ==========================================
# Application Logging Setup
# ==========================================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("portfolio.api")

APP_START_TIME = time.time()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    FastAPI lifespan manager.
    Initializes database tables, creates tables for projects, messages, and inquiries,
    and seeds sample projects if the table is empty.
    """
    logger.info("Initializing MySQL database connection and tables...")
    try:
        init_db()
        logger.info("Database tables verified/created successfully.")
    except Exception as exc:
        logger.error(f"Notice: Could not connect to MySQL during startup: {exc}")
        logger.warning("Ensure MySQL service is running and .env credentials are correct.")

    # Automatically seed sample projects if table is empty
    try:
        db = next(get_db())
        project_count = db.query(models.Project).count()
        if project_count == 0:
            logger.info("Projects table is empty. Seeding initial projects...")
            for p in SAMPLE_PROJECTS:
                db.add(models.Project(**p))
            db.commit()
            logger.info("Successfully seeded sample projects into MySQL.")
        else:
            logger.info(f"Database already contains {project_count} project(s).")
    except Exception as seed_err:
        logger.warning(f"Project seed skipped or deferred: {seed_err}")

    yield
    logger.info("Portfolio Backend API shutting down cleanly.")


app = FastAPI(
    title="Anuj Pathak Portfolio API",
    description="Production-ready FastAPI backend for Anuj Pathak's Portfolio. Features MySQL persistence via SQLAlchemy, JWT-based Admin auth, sliding-window rate limiting, Pydantic v2 validation, SMTP email alerts, and health monitoring.",
    version="2.0.0",
    lifespan=lifespan,
)

# ==========================================
# Request Timing & Logging Middleware
# ==========================================
@app.middleware("http")
async def log_requests_and_timing(request: Request, call_next):
    start_time = time.time()
    client_ip = request.headers.get("X-Forwarded-For") or (
        request.client.host if request.client else "unknown"
    )
    response = await call_next(request)
    duration = time.time() - start_time
    response.headers["X-Process-Time"] = f"{duration:.4f}s"
    logger.info(
        f"{request.method} {request.url.path} status={response.status_code} "
        f"duration={duration:.3f}s ip={client_ip}"
    )
    return response


# ==========================================
# CORS Configuration
# Uses ALLOWED_ORIGINS environment variable for production and local development.
# Example: ALLOWED_ORIGINS="https://my-portfolio.vercel.app,http://192.168.1.5:5173"
# If unset or set to "*", permits all local network and preview origins via regex.
# ==========================================
allowed_origins_env = os.getenv(
    "ALLOWED_ORIGINS",
    os.getenv("CORS_ORIGINS", os.getenv("FRONTEND_URL", "")),
).strip()

if allowed_origins_env and allowed_origins_env != "*":
    explicit_origins = [o.strip() for o in allowed_origins_env.split(",") if o.strip()]
    origin_regex = None
else:
    explicit_origins = []
    origin_regex = os.getenv("CORS_ORIGIN_REGEX", r"^https?://.*$")

app.add_middleware(
    CORSMiddleware,
    allow_origins=explicit_origins,
    allow_origin_regex=origin_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# Global Exception Handlers
# ==========================================
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Structured response for Pydantic input validation failures.
    """
    errors = []
    for err in exc.errors():
        field = " -> ".join(str(loc) for loc in err.get("loc", []))
        errors.append({
            "field": field,
            "message": err.get("msg"),
            "type": err.get("type"),
        })
    logger.warning(f"Validation error on {request.method} {request.url.path}: {errors}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "error": "Validation Error",
            "message": "One or more input fields failed validation.",
            "details": errors,
        },
    )


@app.exception_handler(HTTPException)
async def custom_http_exception_handler(request: Request, exc: HTTPException):
    """
    Consistent JSON structure for HTTP exceptions with header preservation (e.g. Retry-After).
    """
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": "HTTP Error",
            "message": exc.detail,
            "status_code": exc.status_code,
        },
        headers=exc.headers,
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    """
    Catch-all handler to prevent unhandled 500 trace leaks.
    """
    logger.exception(f"Unhandled exception during {request.method} {request.url.path}: {exc}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": "Internal Server Error",
            "message": "An unexpected error occurred. Please try again later.",
        },
    )


# ==========================================
# Health Check Helper & Endpoints
# ==========================================
def get_db_health(db: Session) -> str:
    try:
        db.execute(text("SELECT 1"))
        return f"connected (MySQL at {DB_HOST}:{DB_PORT}/{DB_NAME})"
    except Exception as exc:
        logger.warning(f"Database health probe failed: {exc}")
        return f"disconnected ({str(exc)})"


@app.get("/health", response_model=schemas.HealthResponse, tags=["Monitoring"])
@app.get("/api/health", response_model=schemas.HealthResponse, tags=["Monitoring"])
def health_check(db: Session = Depends(get_db)):
    """
    Production health check endpoint verifying server status, uptime, and MySQL connectivity.
    """
    db_status = get_db_health(db)
    is_healthy = "connected" in db_status
    return {
        "status": "healthy" if is_healthy else "degraded",
        "service": "portfolio-fastapi-backend",
        "version": "2.0.0",
        "database": db_status,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "uptime_seconds": round(time.time() - APP_START_TIME, 2),
    }


@app.get("/", tags=["General"])
def read_root():
    """Root metadata endpoint with documentation links."""
    return {
        "message": "Welcome to Anuj Pathak's Portfolio Backend API",
        "version": "2.0.0",
        "docs_url": "/docs",
        "health_check": "/health",
        "endpoints": {
            "projects_list": "GET /api/projects",
            "project_detail": "GET /api/projects/{id}",
            "contact_form": "POST /api/contact",
            "inquiry_form": "POST /api/inquiry",
            "ai_chat": "POST /api/chat",
            "admin_login": "POST /api/admin/login",
            "admin_messages": "GET /api/admin/messages (JWT)",
            "admin_inquiries": "GET /api/admin/inquiries (JWT)",
        },
    }


# ==========================================
# Authentication & Admin Endpoints
# ==========================================
@app.post(
    "/api/admin/login",
    response_model=schemas.TokenResponse,
    dependencies=[Depends(rate_limit(auth_limiter))],
    tags=["Admin"],
)
def admin_login(creds: schemas.AdminLogin):
    """
    Authenticates the administrator using username/password and issues a cryptographically signed JWT.
    Rate limited to 6 requests/minute to defend against brute force attempts.
    """
    username_valid = secrets_equal = (creds.username == ADMIN_USERNAME)
    password_valid = verify_password(creds.password, ADMIN_PASSWORD)

    if not (username_valid and password_valid):
        logger.warning(f"Failed admin login attempt for user: '{creds.username}'")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": creds.username, "role": "admin"})
    logger.info(f"Admin '{creds.username}' successfully authenticated.")
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    }


@app.get(
    "/api/admin/me",
    response_model=schemas.AdminMeResponse,
    tags=["Admin"],
)
def get_current_admin_profile(admin: dict = Depends(get_current_admin)):
    """
    Verifies JWT token validity and returns the active admin identity.
    """
    return {"username": admin["username"], "role": admin["role"]}


# ==========================================
# Projects Endpoints (Public List/Get, Admin Mutate)
# ==========================================
@app.get(
    "/api/projects",
    response_model=List[schemas.ProjectResponse],
    tags=["Projects"],
)
def get_projects(db: Session = Depends(get_db)):
    """
    Fetch all projects from MySQL for the public portfolio showcase.
    """
    try:
        projects = db.query(models.Project).all()
        return projects
    except Exception as exc:
        logger.error(f"Failed to query projects: {exc}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database query error: {str(exc)}",
        )


@app.get(
    "/api/projects/{project_id}",
    response_model=schemas.ProjectResponse,
    tags=["Projects"],
)
def get_project_by_id(project_id: int, db: Session = Depends(get_db)):
    """
    Fetch a single project by its primary key id.
    """
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID {project_id} not found.",
        )
    return project


@app.post(
    "/api/projects",
    response_model=schemas.ProjectResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Projects"],
)
def create_project(
    project: schemas.ProjectCreate,
    admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """
    Add a new project to MySQL (Admin authenticated via JWT).
    """
    try:
        new_project = models.Project(**project.model_dump())
        db.add(new_project)
        db.commit()
        db.refresh(new_project)
        logger.info(f"Admin '{admin['username']}' created project #{new_project.id}: {new_project.title}")
        return new_project
    except Exception as exc:
        db.rollback()
        logger.error(f"Failed to create project: {exc}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to save project: {str(exc)}",
        )


@app.put(
    "/api/projects/{project_id}",
    response_model=schemas.ProjectResponse,
    tags=["Projects"],
)
def update_project(
    project_id: int,
    updates: schemas.ProjectUpdate,
    admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """
    Update an existing project (Admin authenticated via JWT).
    """
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID {project_id} not found.",
        )

    try:
        update_data = updates.model_dump(exclude_unset=True)
        for key, val in update_data.items():
            setattr(project, key, val)
        db.commit()
        db.refresh(project)
        logger.info(f"Admin '{admin['username']}' updated project #{project_id}")
        return project
    except Exception as exc:
        db.rollback()
        logger.error(f"Failed to update project #{project_id}: {exc}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update project: {str(exc)}",
        )


@app.delete(
    "/api/projects/{project_id}",
    response_model=schemas.StatusMessageResponse,
    tags=["Projects"],
)
def delete_project(
    project_id: int,
    admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """
    Delete a project by ID (Admin authenticated via JWT).
    """
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Project with ID {project_id} not found.",
        )

    try:
        db.delete(project)
        db.commit()
        logger.info(f"Admin '{admin['username']}' deleted project #{project_id}")
        return {"message": f"Project #{project_id} successfully deleted.", "success": True}
    except Exception as exc:
        db.rollback()
        logger.error(f"Failed to delete project #{project_id}: {exc}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete project: {str(exc)}",
        )


# ==========================================
# Contact Form Endpoint (Rate Limited + Email Alert)
# ==========================================
@app.post(
    "/api/contact",
    response_model=schemas.MessageResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(rate_limit(contact_limiter))],
    tags=["Contact"],
)
def create_contact(
    message: schemas.MessageCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    """
    Receives and persists a contact form submission with Pydantic validation.
    Rate limited to 5 submissions/minute per IP address.
    Dispatches an asynchronous SMTP email notification to Anuj Pathak.
    """
    try:
        new_message = models.Message(
            name=message.name.strip(),
            email=message.email.strip(),
            message=message.message.strip(),
        )
        db.add(new_message)
        db.commit()
        db.refresh(new_message)

        # Trigger background email dispatch without blocking client response
        background_tasks.add_task(
            send_contact_notification,
            new_message.name,
            new_message.email,
            new_message.message,
            new_message.id,
        )

        logger.info(f"Contact message #{new_message.id} saved from {new_message.name} <{new_message.email}>")
        return new_message
    except Exception as exc:
        db.rollback()
        logger.error(f"Failed to save contact message: {exc}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process contact submission: {str(exc)}",
        )


# ==========================================
# Freelance Inquiry Endpoint (Rate Limited + Email Alert)
# ==========================================
@app.post(
    "/api/inquiry",
    response_model=schemas.InquiryResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(rate_limit(inquiry_limiter))],
    tags=["Freelance Inquiries"],
)
def create_inquiry(
    inquiry: schemas.InquiryCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    """
    Receives and persists a freelance project inquiry with validated fields:
    (name, email, service_type, budget_range, timeline, details).
    Rate limited to 5 inquiries/minute per IP address.
    Dispatches an asynchronous SMTP notification to Anuj Pathak.
    """
    try:
        new_inquiry = models.Inquiry(
            name=inquiry.name.strip(),
            email=inquiry.email.strip(),
            service_type=inquiry.service_type.strip(),
            budget_range=inquiry.budget_range.strip(),
            timeline=inquiry.timeline.strip(),
            details=inquiry.details.strip(),
        )
        db.add(new_inquiry)
        db.commit()
        db.refresh(new_inquiry)

        # Schedule async email alert
        background_tasks.add_task(
            send_inquiry_notification,
            new_inquiry.name,
            new_inquiry.email,
            new_inquiry.service_type,
            new_inquiry.budget_range,
            new_inquiry.timeline,
            new_inquiry.details,
            new_inquiry.id,
        )

        logger.info(
            f"Project inquiry #{new_inquiry.id} received from {new_inquiry.name} for '{new_inquiry.service_type}'"
        )
        return new_inquiry
    except Exception as exc:
        db.rollback()
        logger.error(f"Failed to save inquiry: {exc}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process project inquiry: {str(exc)}",
        )


# ==========================================
# 5. POST /api/chat - "Ask Anuj" AI Assistant (RAG + LangChain)
# ==========================================
@app.post(
    "/api/chat",
    response_model=schemas.ChatResponse,
    dependencies=[Depends(rate_limit(chat_limiter))],
    tags=["AI Assistant"],
)
def chat_with_assistant(
    chat_req: schemas.ChatRequest,
    request: Request,
    db: Session = Depends(get_db),
):
    """
    RAG-powered conversational AI assistant answering questions regarding Anuj Pathak's
    experience, skills, projects, services, and freelance availability.
    Enforces sliding-window rate limiting (10 req/min) and max 500 characters input limit.
    Saves conversation logs into MySQL (chat_logs table).
    """
    client_ip = request.headers.get("X-Forwarded-For") or (
        request.client.host if request.client else "unknown"
    )

    try:
        reply, suggestions = rag_engine.answer_query(chat_req.message)

        # Persist conversation log in MySQL
        try:
            chat_log = models.ChatLog(
                user_message=chat_req.message.strip(),
                bot_response=reply,
                client_ip=client_ip,
            )
            db.add(chat_log)
            db.commit()
            logger.info(f"Recorded chat query from {client_ip} (Log #{chat_log.id})")
        except Exception as log_err:
            db.rollback()
            logger.warning(f"Could not persist chat interaction log: {log_err}")

        return {
            "reply": reply,
            "suggested_questions": suggestions,
        }
    except Exception as exc:
        logger.error(f"Chat execution failed: {exc}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate AI response. Please try again shortly.",
        )


# ==========================================
# Protected Admin Data Endpoints
# ==========================================
@app.get(
    "/api/admin/messages",
    response_model=List[schemas.MessageResponse],
    tags=["Admin"],
)
def get_all_messages_admin(
    admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """
    Retrieve all submitted contact messages (Admin only via JWT).
    """
    try:
        return db.query(models.Message).order_by(models.Message.created_at.desc()).all()
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database query error: {str(exc)}",
        )


@app.delete(
    "/api/admin/messages/{message_id}",
    response_model=schemas.StatusMessageResponse,
    tags=["Admin"],
)
def delete_message_admin(
    message_id: int,
    admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """
    Delete a contact message by ID (Admin only via JWT).
    """
    msg = db.query(models.Message).filter(models.Message.id == message_id).first()
    if not msg:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Message #{message_id} not found.",
        )
    db.delete(msg)
    db.commit()
    logger.info(f"Admin '{admin['username']}' deleted message #{message_id}")
    return {"message": f"Message #{message_id} deleted successfully.", "success": True}


@app.get(
    "/api/admin/inquiries",
    response_model=List[schemas.InquiryResponse],
    tags=["Admin"],
)
def get_all_inquiries_admin(
    admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """
    Retrieve all submitted project inquiries (Admin only via JWT).
    """
    try:
        return db.query(models.Inquiry).order_by(models.Inquiry.created_at.desc()).all()
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database query error: {str(exc)}",
        )


@app.delete(
    "/api/admin/inquiries/{inquiry_id}",
    response_model=schemas.StatusMessageResponse,
    tags=["Admin"],
)
def delete_inquiry_admin(
    inquiry_id: int,
    admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """
    Delete a project inquiry by ID (Admin only via JWT).
    """
    inq = db.query(models.Inquiry).filter(models.Inquiry.id == inquiry_id).first()
    if not inq:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Inquiry #{inquiry_id} not found.",
        )
    db.delete(inq)
    db.commit()
    logger.info(f"Admin '{admin['username']}' deleted inquiry #{inquiry_id}")
    return {"message": f"Inquiry #{inquiry_id} deleted successfully.", "success": True}


@app.get(
    "/api/admin/chat-logs",
    response_model=List[schemas.ChatLogResponse],
    tags=["Admin"],
)
def get_chat_logs_admin(
    admin: dict = Depends(get_current_admin),
    db: Session = Depends(get_db),
):
    """
    Retrieve conversation logs recorded by the Ask Anuj AI assistant (Admin only via JWT).
    """
    try:
        return db.query(models.ChatLog).order_by(models.ChatLog.created_at.desc()).limit(150).all()
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database query error: {str(exc)}",
        )


# Keep convenient backward compatibility for /api/messages and /api/inquiry GET
@app.get("/api/messages", response_model=List[schemas.MessageResponse], include_in_schema=False)
def legacy_get_messages(admin: dict = Depends(get_current_admin), db: Session = Depends(get_db)):
    return get_all_messages_admin(admin=admin, db=db)


@app.get("/api/inquiries", response_model=List[schemas.InquiryResponse], include_in_schema=False)
def legacy_get_inquiries(admin: dict = Depends(get_current_admin), db: Session = Depends(get_db)):
    return get_all_inquiries_admin(admin=admin, db=db)


if __name__ == "__main__":
    import uvicorn

    host = os.getenv("APP_HOST", "0.0.0.0")
    port = int(os.getenv("APP_PORT", 8000))
    uvicorn.run("main:app", host=host, port=port, reload=True)
