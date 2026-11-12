# Production Deployment Guide

This guide provides step-by-step instructions for deploying the **Full-Stack 3D Portfolio** to production:
- **Frontend**: [Vercel](https://vercel.com/) (React 19 + Vite + Tailwind CSS)
- **Backend**: [Render](https://render.com/) (FastAPI + Python + Uvicorn)
- **Database**: Hosted MySQL (e.g. [TiDB Cloud Serverless](https://tidbcloud.com/), [Aiven](https://aiven.io/), or [Railway](https://railway.app/))

```mermaid
flowchart LR
    User["Client Browser / Mobile"] -->|HTTPS| Vercel["Vercel (React Frontend)"]
    Vercel -->|REST API / CORS| Render["Render (FastAPI Backend)"]
    Render -->|SQLAlchemy / SSL| MySQL[("Hosted MySQL Database")]
```

---

## 📋 Pre-Deployment Checklist

Before starting, ensure you have:
1. Pushed this repository to your GitHub account (`main` branch).
2. A free account on [Vercel](https://vercel.com/).
3. A free account on [Render](https://render.com/).
4. A free hosted MySQL instance (instructions below).

---

## 🗄️ Step 1: Provision a Hosted MySQL Database

You can use any cloud-hosted MySQL 8.0+ service. **TiDB Cloud Serverless** and **Aiven for MySQL** are two popular free-tier choices.

### Option A: TiDB Cloud Serverless (Recommended — 5 GB Free Forever)
1. Sign up at [https://tidbcloud.com/](https://tidbcloud.com/) (free via GitHub or Google login).
2. Click **Create Cluster** &rarr; select **Serverless** (Free Tier).
3. Select your closest AWS/GCP region (e.g., `ap-southeast-1` or `us-east-1`).
4. Click **Create**.
5. Once created, click **Connect** &rarr; select **General / PyMySQL** or **MySQL CLI**:
   - Copy the generated connection parameters:
     - `DB_HOST`: e.g. `gateway01.ap-southeast-1.prod.aws.tidbcloud.com`
     - `DB_PORT`: `4000` (or `3306`)
     - `DB_USER`: e.g. `xxxxxx.root`
     - `DB_PASSWORD`: your generated password
     - `DB_NAME`: `portfolio_db` (or create database via web SQL editor: `CREATE DATABASE portfolio_db;`)
6. In **Security** / **IP Access List**, ensure access is set to **Allow access from anywhere** (`0.0.0.0/0`) so Render can connect.

### Option B: Aiven for MySQL / Railway
1. Create a MySQL database service on [Aiven](https://aiven.io/) or [Railway](https://railway.app/).
2. Copy the `DATABASE_URL` (format: `mysql+pymysql://user:password@host:port/database`).

---

## 🚀 Step 2: Deploy FastAPI Backend on Render

1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** in the top right &rarr; select **Web Service**.
3. Choose **Build and deploy from a Git repository** &rarr; select your portfolio repository.
4. Fill in the service configuration:
   - **Name**: `anuj-portfolio-backend` (or a name of your choice)
   - **Region**: Choose the region closest to your database (e.g., Singapore, Frankfurt, or Oregon)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**:
     ```bash
     pip install -r requirements.txt
     ```
   - **Start Command**:
     ```bash
     uvicorn main:app --host 0.0.0.0 --port $PORT
     ```
   *(Note: The repository includes a `Procfile` with this exact start command).*

5. Scroll down to **Environment Variables** and add the following:

   | Key | Example Value | Description |
   |---|---|---|
   | `APP_ENV` | `production` | Production environment flag |
   | `APP_HOST` | `0.0.0.0` | Bind to all interfaces |
   | `ALLOWED_ORIGINS` | `*` *(Update after Step 3)* | Allowed frontend URL(s) for CORS |
   | `DB_HOST` | `gateway01.ap-southeast-1.prod.aws.tidbcloud.com` | Hosted MySQL Host |
   | `DB_PORT` | `4000` | Hosted MySQL Port |
   | `DB_USER` | `xxxxxx.root` | Hosted MySQL Username |
   | `DB_PASSWORD` | `your_hosted_db_password` | Hosted MySQL Password |
   | `DB_NAME` | `portfolio_db` | MySQL Database Name |
   | `JWT_SECRET_KEY` | *(generate random 64-char hex)* | JWT signing secret |
   | `ADMIN_USERNAME` | `admin` | Admin dashboard username |
   | `ADMIN_PASSWORD` | `your_secure_admin_password` | Admin dashboard password |
   | `SMTP_ENABLED` | `false` *(or `true` if configured)* | Real-time email notification alerts |
   | `SMTP_HOST` | `smtp.gmail.com` | SMTP Mail Server |
   | `SMTP_PORT` | `587` | SMTP TLS Port |
   | `SMTP_USER` | `pathakanuj322@gmail.com` | Your Gmail address |
   | `SMTP_PASSWORD` | `your_gmail_app_password` | 16-character Google App Password |
   | `SMTP_FROM_EMAIL` | `pathakanuj322@gmail.com` | Sender header |
   | `SMTP_TO_EMAIL` | `pathakanuj322@gmail.com` | Recipient address for inquiries |
   | `SMTP_TLS` | `true` | Enable STARTTLS |

   > [!TIP]
   > You can generate a secure `JWT_SECRET_KEY` with:
   > ```bash
   > python -c "import secrets; print(secrets.token_hex(32))"
   > ```

6. Click **Deploy Web Service**.
7. Wait 2–3 minutes for Render to build and start your application.
8. **Verify Backend**:
   - Render will generate a URL like `https://anuj-portfolio-backend.onrender.com`.
   - Open `https://anuj-portfolio-backend.onrender.com/health` in your browser.
   - You should see:
     ```json
     {
       "status": "healthy",
       "service": "portfolio-fastapi-backend",
       "version": "2.0.0",
       "database": "connected (MySQL at ...)",
       "timestamp": "2026-11-12T...",
       "uptime_seconds": 12.4
     }
     ```
   - Interactive API Docs are available at: `https://anuj-portfolio-backend.onrender.com/docs`.
   - **Auto-Seeding**: On first boot, the backend automatically initializes database tables (`projects`, `messages`, `inquiries`) and seeds the 4 featured projects if the table is empty!

---

## ⚡ Step 3: Deploy React Frontend on Vercel

1. Log in to [Vercel](https://vercel.com/) and click **Add New...** &rarr; **Project**.
2. Select your portfolio GitHub repository and click **Import**.
3. In the **Configure Project** screen:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click **Edit** and select **`frontend`**
   - **Build and Output Settings**:
     - Build Command: `npm run build` (default)
     - Output Directory: `dist` (default)
     - Install Command: `npm install` (default)
4. Expand **Environment Variables** and add:

   | Name | Value |
   |---|---|
   | `VITE_API_URL` | `https://anuj-portfolio-backend.onrender.com` *(your Render URL from Step 2)* |

5. Click **Deploy**.
6. Vercel will install dependencies, build the production bundle, and assign your live URL (e.g., `https://anuj-portfolio.vercel.app`).

---

## 🔗 Step 4: Finalize CORS on Render

Now that your frontend has a live production URL:

1. Return to your [Render Dashboard](https://dashboard.render.com/) &rarr; select `anuj-portfolio-backend`.
2. Go to **Environment** &rarr; locate **`ALLOWED_ORIGINS`**.
3. Update its value with your Vercel domain(s):
   ```ini
   ALLOWED_ORIGINS=https://anuj-portfolio.vercel.app,https://your-custom-domain.com
   ```
4. Click **Save Changes**. Render will automatically restart the web service with your updated CORS policy.

---

## ✅ Step 5: Post-Deployment Verification

1. **Visit Frontend**: Open your Vercel URL in your browser and on your mobile device.
2. **Check Status Indicator**: In the Navbar, verify the backend badge shows a glowing green indicator (`API: connected`).
3. **Projects Showcase**: Verify that the 4 featured AI/ML projects load dynamically from the backend MySQL database.
4. **Project Detail Pages**: Click "View Case Study" on any card to confirm dynamic route rendering, SVG architecture diagrams, and problem/solution breakdowns.
5. **Theme Picker**: Click the floating palette icon to test dark/light/system modes and color accents.
6. **Inquiry Form**: Submit a test inquiry under the Freelance section &rarr; verify the success banner appears.
7. **Contact Form**: Submit a test contact message &rarr; verify the confirmation message.
8. **Admin Dashboard / API**:
   - Access `https://anuj-portfolio-backend.onrender.com/docs`
   - Test `POST /api/admin/login` using your configured admin credentials
   - Call `GET /api/admin/messages` and `GET /api/admin/inquiries` with your Bearer token to inspect submissions.

---

## 🛠️ Troubleshooting & FAQ

### 1. Frontend shows "API: disconnected"
- Check that `VITE_API_URL` on Vercel is pointing to your Render backend URL without trailing slashes (e.g. `https://anuj-portfolio-backend.onrender.com`).
- Note: Render free-tier web services sleep after 15 minutes of inactivity. When accessed, the first request takes ~30–45 seconds to spin up. The frontend automatically polls `/health` and connects as soon as the backend wakes up.

### 2. CORS Errors in Browser Console
- Confirm that your Vercel production URL is listed in `ALLOWED_ORIGINS` on Render (including `https://` and without trailing slashes).
- To test without restrictions, set `ALLOWED_ORIGINS=*` temporarily on Render.

### 3. Database Connection Errors on Startup
- Verify your database host permits remote connections from `0.0.0.0/0`.
- Verify database password encoding if it includes special characters (`@`, `:`, `/`).

