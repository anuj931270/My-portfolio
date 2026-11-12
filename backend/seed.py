"""
Database seeding script to populate the MySQL projects table with Anuj Pathak's 4 featured projects:
1. Enterprise RAG-Based Customer Support Chatbot (GenAI)
2. HR Policy and Employee Support Chatbot (Agentic AI)
3. Customer Feedback Sentiment Analysis (NLP and Deep Learning)
4. Medicine Demand Forecasting (Machine Learning and Time Series)
"""
import sys
from database import SessionLocal, init_db
import models

SAMPLE_PROJECTS = [
    {
        "title": "Enterprise RAG-Based Customer Support Chatbot",
        "category": "GenAI",
        "problem": "Support team spent most of its time on repetitive FAQs, and a plain LLM gave wrong answers on company questions.",
        "solution": "RAG pipeline with embeddings in Pinecone, semantic search, top-k retrieval with similarity threshold, grounded prompts with a safe fallback, chat history in MySQL, FastAPI API, LangSmith evaluation, deployed on AWS with Docker.",
        "impact": "Less support workload, better answer relevance, fewer wrong answers, knowledge base updates need only re-indexing.",
        "description": "Production-grade enterprise RAG system that eliminates support overhead by grounding OpenAI LLM responses against verified internal company documents using Pinecone vector search.",
        "tech_stack": "Python, LangChain, OpenAI API, Pinecone, FastAPI, LangSmith, MySQL, AWS, Docker, CI/CD",
        "github_link": "https://github.com/anuj931270",
        "live_link": "https://github.com/anuj931270",
        "image_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "HR Policy and Employee Support Chatbot",
        "category": "Agentic AI",
        "problem": "HR team spent a lot of time on repeated questions about leave, payroll and policy, and sensitive requests were handled inconsistently.",
        "solution": "Multi-agent LangGraph workflow, MCP server with role-based access, RAG for policy questions, checkpointed state, human approval for sensitive actions, audit logs in MySQL, guardrails so employees see only their own data.",
        "impact": "Less HR workload, faster answers, safer handling of sensitive data.",
        "description": "Autonomous multi-agent HR assistant built with LangGraph and Model Context Protocol (MCP) server, featuring human-in-the-loop approvals, strict role-based access, and state checkpointing.",
        "tech_stack": "LangGraph, LangChain, MCP Server, OpenAI API, Pinecone, FastAPI, MySQL, LangSmith, AWS, Docker",
        "github_link": "https://github.com/anuj931270",
        "live_link": "https://github.com/anuj931270",
        "image_url": "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "Customer Feedback Sentiment Analysis",
        "category": "NLP and Deep Learning",
        "problem": "Thousands of reviews were read by hand, so the team could not see repeating complaints or sentiment trends.",
        "solution": "Text cleaning, TF-IDF baseline, Word2Vec with RNN and LSTM models, tuned hyperparameters, dashboards with word clouds and trends, FastAPI endpoint, deployed on Azure Kubernetes Service.",
        "impact": "Automatic feedback classification, clear complaint insights, real-time sentiment API.",
        "description": "End-to-end deep learning NLP pipeline utilizing Word2Vec and LSTM sequence models to automatically classify customer sentiment and surface real-time complaint patterns at scale.",
        "tech_stack": "Python, TensorFlow, LSTM, RNN, Word2Vec, TF-IDF, Pandas, FastAPI, Docker, Kubernetes, Azure ML, AKS",
        "github_link": "https://github.com/anuj931270",
        "live_link": "https://github.com/anuj931270",
        "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    },
    {
        "title": "Medicine Demand Forecasting",
        "category": "Machine Learning and Time Series",
        "problem": "Demand planning used manual estimates, causing stockouts and overstock.",
        "solution": "Lag and rolling features, seasonality flags, time series benchmark, ensemble of XGBoost, Random Forest and AdaBoost, time-based validation (RMSE, MAPE, MAE), scheduled retraining, filterable forecast view by region and product.",
        "impact": "Better forecasts, fewer stockouts, less overstock, forecasts stay current with automated retraining.",
        "description": "Predictive time series forecasting engine using an ensemble of XGBoost, Random Forest, and AdaBoost to eliminate medical supply stockouts and overstock with automated retraining on AWS.",
        "tech_stack": "Python, XGBoost, Random Forest, AdaBoost, Pandas, SQL, FastAPI, Docker, AWS EC2, S3, SageMaker",
        "github_link": "https://github.com/anuj931270",
        "live_link": "https://github.com/anuj931270",
        "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    },
]


def seed_database(force: bool = False):
    print("[Seed] Initializing MySQL database tables...")
    try:
        init_db()
    except Exception as exc:
        print(f"[Seed] Error connecting to database: {exc}")
        print("[Seed] Please ensure MySQL is running and your .env credentials are correct.")
        return False

    db = SessionLocal()
    try:
        if force:
            print("[Seed] Force flag detected: Clearing existing projects...")
            db.query(models.Project).delete()
            db.commit()

        existing_count = db.query(models.Project).count()
        if existing_count > 0:
            print(f"[Seed] Database already contains {existing_count} project(s). Use --force to replace.")
            return True

        for p_data in SAMPLE_PROJECTS:
            project = models.Project(**p_data)
            db.add(project)

        db.commit()
        print(f"[Seed] Successfully added {len(SAMPLE_PROJECTS)} featured projects to MySQL:")
        for idx, p in enumerate(SAMPLE_PROJECTS, 1):
            print(f"  {idx}. {p['title']} [{p['category']}]")
        return True
    except Exception as exc:
        db.rollback()
        print(f"[Seed] Error seeding projects: {exc}")
        return False
    finally:
        db.close()


if __name__ == "__main__":
    force_seed = "--force" in sys.argv or "-f" in sys.argv
    success = seed_database(force=force_seed)
    if not success:
        sys.exit(1)
