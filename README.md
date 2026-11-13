# Full-Stack 3D Portfolio & Production AI Engineering Showcase

A modern, full-stack portfolio application for **Anuj Pathak** (Data Scientist & AI/ML Engineer). Features an interactive 3D frontend powered by React, Three.js, and Tailwind CSS, paired with an enterprise-ready Python FastAPI backend backed by MySQL.

---

## 📁 Project Structure

```text
my-portfolio/
├── backend/
│   ├── venv/                   # Python virtual environment
│   ├── database.py             # SQLAlchemy engine & session management
│   ├── main.py                 # FastAPI application & REST endpoints
│   ├── models.py               # Database models (Projects, Messages, Inquiries, ChatLogs)
│   ├── schemas.py              # Pydantic v2 validation schemas
│   ├── security.py             # PBKDF2 hashing, JWT token creation & bearer auth
│   ├── rate_limiter.py         # Sliding-window IP rate limiting
│   ├── notifier.py             # Asynchronous SMTP HTML & text email alerts
│   ├── rag_service.py          # LangChain + FAISS vector store & RAG engine
│   ├── seed.py                 # MySQL seeding script for projects
│   ├── test_suite.py           # Backend unit test suite (schemas, auth, limiter)
│   ├── requirements.txt        # Backend dependencies
│   ├── .env                    # Local environment config (DB, JWT, Admin, SMTP)
│   └── .env.example            # Example environment template
├── frontend/
│   ├── public/
│   │   ├── favicon.svg         # Favicon icon
│   │   ├── og-image.svg        # 1200x630 Open Graph preview graphic
│   │   ├── resume.pdf          # Official PDF resume
│   │   ├── robots.txt          # Search engine crawler instructions
│   │   └── sitemap.xml         # XML sitemap with route priorities
│   ├── src/
│   │   ├── context/
│   │   │   └── ThemeContext.jsx        # Light/Dark/System modes & accent color engine
│   │   ├── components/
│   │   │   ├── LoadingScreen.jsx       # Introductory splash with monogram & progress bar
│   │   │   ├── Navbar.jsx              # Responsive nav with status, freelance badge & "Hire Me"
│   │   │   ├── Hero.jsx                # Headline, 3D Canvas, freelance badge, resume & CTAs
│   │   │   ├── TechTicker.jsx          # Infinite scrolling marquee of technology logos
│   │   │   ├── AnimatedCounter.jsx     # Smooth requestAnimationFrame counter
│   │   │   ├── About.jsx               # Background, focus pillars, metrics & resume button
│   │   │   ├── Services.jsx            # 5 Freelance AI/ML service cards
│   │   │   ├── Skills.jsx              # Categorized skill pills and filter tabs
│   │   │   ├── HowIWork.jsx            # 5-step process (Discovery, Proposal, Build, Testing, Delivery)
│   │   │   ├── Experience.jsx          # Chronological work milestones
│   │   │   ├── Projects.jsx            # Projects grid with category tabs & route links
│   │   │   ├── EngagementOptions.jsx   # Fixed-price, Hourly, Retainer ("Contact for quote")
│   │   │   ├── InquiryForm.jsx         # Project inquiry form connected to /api/inquiry
│   │   │   ├── FAQ.jsx                 # Interactive FAQ accordion
│   │   │   ├── Testimonials.jsx        # Ready testimonials component (hidden until reviews added)
│   │   │   ├── Contact.jsx             # Contact form connected to /api/contact
│   │   │   ├── FloatingActions.jsx     # Floating "Hire Me" button & "Back to Top" button
│   │   │   ├── Footer.jsx              # Links, back-to-top, copyright
│   │   │   ├── ThemeSettings.jsx       # Floating palette controller with glassmorphic modal
│   │   │   ├── ProjectArchitecture.jsx # SVG pipeline architecture diagrams
│   │   │   └── ThreeCanvas.jsx         # Theme-reactive 3D Canvas (R3F & Drei, lazy loaded)
│   │   ├── pages/
│   │   │   └── ProjectDetail.jsx       # Detail page with architecture, problem/solution, prev/next
│   │   ├── data/
│   │   │   └── portfolioData.js        # Anuj Pathak's centralized portfolio data
│   │   ├── App.jsx                     # Routes wrapped in ThemeProvider, LoadingScreen & FloatingActions
│   │   ├── index.css                   # Dynamic CSS variables, theme classes & scrollbar
│   │   └── main.jsx
│   ├── index.html                      # Zero-flash FOUC pre-load inline script & SEO tags
│   ├── package.json            # Frontend dependencies & scripts
│   ├── vite.config.js          # Vite config with React & Tailwind plugins
│   ├── .env                    # Frontend environment (VITE_API_URL)
│   └── .env.example            # Example frontend environment template
├── .gitignore
└── README.md                   # Instructions & documentation
```

---

## 🛡️ Production FastAPI Backend Features

1. **Input Validation with Pydantic v2**:
   - `schemas.MessageCreate`: strictly validates sender name (min 2, max 100 chars), standard email format regex (`^[^@\s]+@[^@\s]+\.[^@\s]+$`), and message content (min 5, max 5,000 chars).
   - `schemas.InquiryCreate`: validates client name, valid email, selected service type, budget bracket, project timeline, and detailed scope specifications.
   - `schemas.ProjectCreate` & `schemas.ProjectUpdate`: enforces data validation for titles, categories, problems, solutions, impacts, and URLs.
   - Structured JSON response for validation failures with field-level error messages (`422 Unprocessable Entity`).

2. **Sliding-Window Rate Limiting**:
   - In-memory sliding-window limiter (`rate_limiter.py`) tracking requests by client IP address (respecting reverse-proxy `X-Forwarded-For` headers).
   - Defends against spam, abuse, and brute-force attempts:
     - `POST /api/contact`: max 5 requests / 60 seconds per IP.
     - `POST /api/inquiry`: max 5 requests / 60 seconds per IP.
     - `POST /api/admin/login`: max 6 login attempts / 60 seconds per IP.
   - Returns standard `429 Too Many Requests` status with `Retry-After` header.

3. **Asynchronous SMTP Email Alerts**:
   - Sends real-time notifications via FastAPI `BackgroundTasks` without blocking client HTTP responses (`notifier.py`).
   - Dispatches beautifully formatted HTML and plain-text emails to `pathakanuj322@gmail.com` whenever a new message or inquiry arrives.
   - Fully configurable via `.env` (`SMTP_ENABLED`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_TLS`, `SMTP_TO_EMAIL`).
   - If SMTP is disabled (`SMTP_ENABLED=false`), gracefully logs notification details without failing requests.

4. **JWT Admin Authentication**:
   - Secure login via `POST /api/admin/login` verifying admin credentials using PBKDF2-HMAC-SHA256 constant-time comparison.
   - Issues cryptographically signed HS256 JSON Web Tokens with configurable expiration (`ACCESS_TOKEN_EXPIRE_MINUTES`).
   - Protected Admin Endpoints:
     - `GET /api/admin/me`: verify token and get admin identity.
     - `GET /api/admin/messages`: view all submitted contact messages.
     - `DELETE /api/admin/messages/{id}`: delete a contact message.
     - `GET /api/admin/inquiries`: view all submitted freelance inquiries.
     - `DELETE /api/admin/inquiries/{id}`: delete a freelance inquiry.
     - `POST /api/projects`: create a new portfolio project.
     - `PUT /api/projects/{id}`: update an existing project.
     - `DELETE /api/projects/{id}`: delete a project.

5. **Proper Error Handling & Request Logging**:
   - Centralized logging with timestamps, severity levels, and route execution logs.
   - Request timing middleware adding `X-Process-Time` response headers.
   - Global exception handlers for `RequestValidationError`, `HTTPException`, and unhandled server errors.

6. **Health Check & Monitoring Endpoints**:
   - `GET /health` and `GET /api/health`: validates live server status, server uptime in seconds, ISO timestamp, API version, and live MySQL database connectivity (`SELECT 1`).

7. **"Ask Anuj" AI Chat Assistant (LangChain + FAISS RAG)**:
   - Floating interactive assistant in the bottom-right corner powered by `POST /api/chat`.
   - **Vector Knowledge Base**: Indexes Anuj's complete work history, 4 featured enterprise projects, 67 skills across 8 domains, freelance engagement tiers, and contact channels using LangChain and a FAISS in-memory vector store.
   - **Guardrails**: Intelligently rejects off-topic queries (general trivia, coding challenges, math, homework) with polite guidance directing users to ask about Anuj's portfolio.
   - **Bill & Abuse Protection**:
     - Client IP sliding-window rate limiting: 10 requests / 60 seconds.
     - Strict 500-character input length limit enforced on both frontend and backend.
     - `OPENAI_API_KEY` stored exclusively in the backend `.env` (never exposed to frontend bundle).
     - Intelligent semantic fallback retriever if `OPENAI_API_KEY` is not configured, ensuring zero downtime.
   - **MySQL Audit Logging**: Every conversation (user prompt, bot response, client IP, timestamp) is logged to the `chat_logs` table, viewable via `GET /api/admin/chat-logs`.

---

## ⚡ Professional Frontend Features

1. **Short Loading Screen & Page Transitions**:
   - Sleek monogram `AP` with spinning gradient and animated progress bar on initial visit (`LoadingScreen.jsx`), cached via `sessionStorage` for instant navigation.
   - Smooth route and section transitions using Framer Motion.
2. **Animated Numerical Counters**:
   - Smooth `requestAnimationFrame` counters (`AnimatedCounter.jsx`) bound strictly to the real numbers in `portfolioData.js`:
     - **3+** Years of Experience
     - **4+** Enterprise AI Solutions
     - **67+** Technologies & Tools
     - **8** Core Technical Domains
   - Respects `prefers-reduced-motion` to immediately display the final count without animating.
3. **Scrolling Tech Stack Strip with Logos**:
   - Infinite horizontal marquee (`TechTicker.jsx`) showcasing Python, LangChain, LangGraph, OpenAI, TensorFlow, PyTorch, FastAPI, Docker, AWS, Azure, Pinecone, Scikit-learn, and MySQL with pause-on-hover.
4. **Experience Timeline**:
   - Full chronological timeline (`Experience.jsx`) featuring Arcgate Technologies (Data Scientist & AI/ML Engineer, May 2024 &ndash; Present) and B.Tech CSE (2020 &ndash; 2024) with glowing milestones and tech badges.
5. **Download Resume Button**:
   - High-visibility "Download Resume" buttons in both Hero and About sections.
   - Downloads a genuine, cleanly formatted PDF resume (`/resume.pdf`).
6. **Floating "Hire Me" & Back-to-Top Buttons**:
   - Bottom-left floating "Hire Me" button with live green pulse dot (`FloatingActions.jsx`).
   - Bottom-right floating "Back to Top" button that smoothly appears when scrolling down.
7. **Comprehensive SEO & Meta Suite**:
   - Complete `<meta>` tags: title, description, keywords, canonical link, and JSON-LD structured data (`Person` schema).
   - High-resolution Open Graph preview image (`/og-image.svg`).
   - `robots.txt` and `sitemap.xml` for full search engine indexation.
8. **Accessibility (WCAG 2.1 AAA Compliant)**:
   - Skip to main content link for keyboard navigation.
   - High-visibility `:focus-visible` outlines dynamically matching the chosen accent color.
   - ARIA roles, descriptive `alt` tags, and `@media (prefers-reduced-motion: reduce)` support.
9. **Performance & 90+ Lighthouse Score**:
   - The 3D Three.js canvas is **lazy-loaded** via `React.lazy()` and `Suspense`, splitting the 940 kB Three.js library out of the initial bundle and reducing the main bundle to just 579 kB.
   - Images utilize `loading="lazy"` and `decoding="async"`.

---

## 🎨 Theme & Customization System

- **Appearance Modes**: Light, Dark, and System (device preference via `matchMedia`).
- **6 Accent Colors**: Blue (`#3b82f6`), Purple (`#a855f7`), Green (`#10b981`), Orange (`#f97316`), Pink (`#ec4899`), Cyan (`#06b6d4`), plus a Custom HEX color picker.
- **Reactive 3D Scene**: Neural nodes, synapses, core icosahedron, and lights shift color dynamically with the theme.
- **Zero-Flash Pre-load**: Synchronous script in `<head>` ensures no FOUC on page load.
- **Floating Controller**: Bottom-right palette button with clean glassmorphic popup.

---

## 💼 Freelance & Hire Me Suite

- **Availability Badge**: Pulsing green status badge across Hero and Navbar.
- **5 Core AI/ML Services**:
  1. ML Model Development
  2. RAG & LLM Chatbots
  3. AI Agents & Automation (LangGraph, MCP)
  4. Data Analysis & Dashboards
  5. ML Model Deployment (FastAPI, Docker, AWS/Azure)
- **How I Work**: 5-stage agile workflow (Discovery &rarr; Architecture Proposal &rarr; Model Build &rarr; Rigorous Testing &rarr; Delivery & MLOps).
- **Engagement Options**: Fixed-Price Project, Hourly Consulting, and Monthly Retainer ("Contact for quote").
- **Freelance Project Inquiry Form**: Dedicated multi-field form connected directly to `POST /api/inquiry`.
- **FAQ Accordion**: Common questions on data confidentiality, agent security, and deployment infrastructure.
- **Schedule Call Link**: Direct CTA pointing to Anuj's calendar booking link.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v24) and `npm`
- **Python**: 3.10+ (tested on Python 3.14)
- **MySQL**: 8.0+

---

### 2. Backend Setup & Run

```bash
cd backend
.\venv\Scripts\Activate.ps1   # On Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

- **API Base URL**: [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Interactive Swagger Docs**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Health Check**: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

#### Running Backend Tests:
```bash
python backend/test_suite.py
```

---

### 3. Frontend Setup & Run

```bash
cd frontend
npm install
npm run dev
```

Open your browser or mobile phone on the local network (e.g. `http://192.168.1.5:5173` or your machine's IP printed in the Vite console).

Build for production:
```bash
npm run build
```

---

## 🔗 Complete API Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | API root metadata & endpoint index |
| `GET` | `/health` | Public | Health check verifying status, uptime & MySQL connectivity |
| `GET` | `/api/health` | Public | Alias health check endpoint |
| `POST` | `/api/admin/login` | Rate-Limited | Admin login, returns signed JWT access token |
| `GET` | `/api/admin/me` | Admin (JWT) | Current admin identity & role verification |
| `GET` | `/api/projects` | Public | Return all portfolio projects from MySQL |
| `GET` | `/api/projects/{id}` | Public | Return detailed info for a single project |
| `POST` | `/api/projects` | Admin (JWT) | Add a new project to MySQL |
| `PUT` | `/api/projects/{id}` | Admin (JWT) | Update an existing project |
| `DELETE` | `/api/projects/{id}` | Admin (JWT) | Delete a project from MySQL |
| `POST` | `/api/contact` | Rate-Limited | Validate & save contact message + trigger SMTP email alert |
| `GET` | `/api/admin/messages` | Admin (JWT) | View all submitted contact messages |
| `DELETE` | `/api/admin/messages/{id}` | Admin (JWT) | Delete a contact message |
| `POST` | `/api/inquiry` | Rate-Limited | Validate & save freelance inquiry + trigger SMTP email alert |
| `GET` | `/api/admin/inquiries` | Admin (JWT) | View all submitted freelance project inquiries |
| `DELETE` | `/api/admin/inquiries/{id}` | Admin (JWT) | Delete a freelance project inquiry |
