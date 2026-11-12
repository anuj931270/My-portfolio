from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


# ==========================================
# Project Schemas
# ==========================================
class ProjectBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=255, description="Project title")
    category: Optional[str] = Field(
        None, max_length=100, description="Project category (GenAI, Agentic AI, etc.)"
    )
    description: Optional[str] = Field(
        None, description="Brief high-level description"
    )
    problem: Optional[str] = Field(
        None, description="Core problem statement addressed"
    )
    solution: Optional[str] = Field(
        None, description="Technical solution details (markdown or bullet list)"
    )
    impact: Optional[str] = Field(
        None, description="Quantified business/engineering impact points"
    )
    tech_stack: str = Field(
        ..., min_length=2, description="Comma-separated or formatted tech stack list"
    )
    github_link: Optional[str] = Field(
        None, max_length=255, description="Link to source code repository"
    )
    live_link: Optional[str] = Field(
        None, max_length=255, description="Link to live web app or demo"
    )
    image_url: Optional[str] = Field(
        None, max_length=255, description="URL or relative path to project screenshot"
    )


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=2, max_length=255)
    category: Optional[str] = Field(None, max_length=100)
    description: Optional[str] = None
    problem: Optional[str] = None
    solution: Optional[str] = None
    impact: Optional[str] = None
    tech_stack: Optional[str] = Field(None, min_length=2)
    github_link: Optional[str] = Field(None, max_length=255)
    live_link: Optional[str] = Field(None, max_length=255)
    image_url: Optional[str] = Field(None, max_length=255)


class ProjectResponse(ProjectBase):
    id: int

    class Config:
        from_attributes = True


# ==========================================
# Contact Message Schemas
# ==========================================
class MessageCreate(BaseModel):
    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Full name of sender",
        examples=["Jane Doe"],
    )
    email: str = Field(
        ...,
        min_length=5,
        max_length=150,
        pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$",
        description="Valid email address for replies",
        examples=["jane@example.com"],
    )
    message: str = Field(
        ...,
        min_length=5,
        max_length=5000,
        description="Message inquiry text",
        examples=["Hi Anuj, I would like to discuss an AI project."],
    )


class MessageResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ==========================================
# Freelance Inquiry Schemas
# ==========================================
class InquiryCreate(BaseModel):
    name: str = Field(
        ...,
        min_length=2,
        max_length=150,
        description="Client full name or company representative",
    )
    email: str = Field(
        ...,
        min_length=5,
        max_length=255,
        pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$",
        description="Contact email address",
    )
    service_type: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="Requested service category (e.g. AI Agents, RAG, ML Deployment)",
    )
    budget_range: str = Field(
        ...,
        min_length=1,
        max_length=100,
        description="Estimated project budget bracket",
    )
    timeline: str = Field(
        ...,
        min_length=1,
        max_length=100,
        description="Target project completion timeframe",
    )
    details: str = Field(
        ...,
        min_length=5,
        max_length=5000,
        description="Scope of work, deliverables, and project specifications",
    )


class InquiryResponse(InquiryCreate):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ==========================================
# Admin Auth Schemas
# ==========================================
class AdminLogin(BaseModel):
    username: str = Field(..., min_length=1, description="Admin username")
    password: str = Field(..., min_length=1, description="Admin password")


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class AdminMeResponse(BaseModel):
    username: str
    role: str


# ==========================================
# Generic API & Health Schemas
# ==========================================
class HealthResponse(BaseModel):
    status: str
    service: str
    version: str
    database: str
    timestamp: str
    uptime_seconds: float


class StatusMessageResponse(BaseModel):
    message: str
    success: bool = True
