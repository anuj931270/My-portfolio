import os
import re
import logging
from typing import Dict, List, Optional, Tuple
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger("portfolio.rag")

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "").strip()

# ==========================================
# Comprehensive Portfolio Knowledge Base
# Derived directly from Anuj Pathak's portfolio data
# ==========================================
PORTFOLIO_KNOWLEDGE = [
    {
        "id": "personal_summary",
        "title": "Anuj Pathak - Professional Summary & Background",
        "category": "Profile",
        "content": """
Name: Anuj Pathak
Professional Title: Data Scientist | AI/ML Engineer | Freelancer
Location: Gurugram, India
Phone: 7479931270
Email: pathakanuj322@gmail.com
GitHub: https://github.com/anuj931270
LinkedIn: https://www.linkedin.com/in/anuj-kumar6702/
Languages: Hindi, English
Education: B.Tech in Computer Science & Engineering from Rajasthan Technical University, Udaipur, Rajasthan (2020 - 2024).

Executive Summary:
Data Scientist with 3+ years of experience architecting and deploying end-to-end Machine Learning, Deep Learning, and Generative AI solutions. Proficient in building production RAG applications with LangChain, LlamaIndex, and vector databases (Pinecone, ChromaDB, FAISS). Skilled in stateful multi-agent workflows with LangGraph, Model Context Protocol (MCP) servers, tool calling, checkpointing, and human-in-the-loop guardrails. Proficient in Python, SQL, FastAPI, and Docker for scalable, production-ready AI microservices.
        """.strip(),
    },
    {
        "id": "experience_arcgate",
        "title": "Work Experience - Arcgate Technologies",
        "category": "Experience",
        "content": """
Company: Arcgate Technologies
Role: Data Scientist & AI/ML Engineer
Period: May 2024 - Present
Location: Udaipur, Rajasthan, India

Key Achievements and Responsibilities:
1. Stateful Multi-Agent HR Chatbot: Built an advanced multi-agent HR chatbot in LangGraph with tool calling, MCP server integration, cyclical graph checkpointing, and human-in-the-loop approvals for sensitive employee actions.
2. MCP Server & Guardrails: Designed and deployed a custom Model Context Protocol (MCP) server with role-based access control (RBAC), PII redaction, topic boundaries, and audit logging.
3. Enterprise RAG Chatbots: Developed production RAG chatbots utilizing LangChain, OpenAI API, and Pinecone vector database with semantic search, top-k threshold filtering, and hallucination guardrails.
4. NLP & Sentiment Analysis: Architected LSTM and RNN sentiment analysis models in TensorFlow and Keras to process thousands of customer feedback reviews automatically.
5. Demand Forecasting: Engineered time series demand forecasting systems using an ensemble of XGBoost, Random Forest, and AdaBoost with lag and rolling features.
6. Cloud Deployment & CI/CD: Containerized models into production FastAPI REST microservices with Docker and deployed them to AWS (EC2, S3, SageMaker) and Azure (AKS, Azure ML) via automated CI/CD pipelines.
        """.strip(),
    },
    {
        "id": "project_rag_chatbot",
        "title": "Project 1: Enterprise RAG-Based Customer Support Chatbot",
        "category": "Projects",
        "content": """
Project: Enterprise RAG-Based Customer Support Chatbot (Category: Generative AI)
Tech Stack: Python, LangChain, OpenAI API, Pinecone, FastAPI, LangSmith, MySQL, AWS, Docker, CI/CD

Problem:
The customer support team spent most of their time resolving repetitive, high-frequency FAQs, and plain zero-shot LLMs frequently hallucinated or gave inaccurate responses to company-specific policy questions.

Solution:
Engineered an enterprise RAG pipeline with dense vector embeddings stored in Pinecone serverless. Implemented semantic hybrid search, top-k retrieval with similarity threshold scoring, grounded system prompts with strict fallback behavior, chat session history persistence in MySQL, and observability tracing in LangSmith. Deployed as a containerized FastAPI service on AWS with automated CI/CD.

Impact:
- Drastically reduced human support ticket workload and response turnaround time.
- Achieved high answer relevance with near-zero hallucination rates.
- Knowledge base updates require zero model retraining—only incremental Pinecone re-indexing.
        """.strip(),
    },
    {
        "id": "project_hr_agent",
        "title": "Project 2: HR Policy & Employee Support Chatbot",
        "category": "Projects",
        "content": """
Project: HR Policy and Employee Support Chatbot (Category: Agentic AI)
Tech Stack: LangGraph, LangChain, MCP Server, OpenAI API, Pinecone, FastAPI, MySQL, LangSmith, AWS, Docker

Problem:
The human resources team was overwhelmed by repetitive employee questions regarding leave balances, payroll schedules, and internal company policies, and sensitive requests (e.g. salary changes or leave approvals) were handled inconsistently.

Solution:
Architected a stateful multi-agent workflow using LangGraph with a dedicated supervisor routing requests to specialized sub-agents. Integrated a Model Context Protocol (MCP) server with role-based access control, persistent graph checkpointing, and human-in-the-loop review gates for sensitive mutations. Secured with audit logging in MySQL and guardrails preventing cross-employee data exposure.

Impact:
- Substantially reduced HR administrative burden and eliminated response bottlenecks.
- Accelerated employee query resolution from hours to seconds.
- Enforced strict compliance and safer handling of sensitive employee data.
        """.strip(),
    },
    {
        "id": "project_sentiment_analysis",
        "title": "Project 3: Customer Feedback Sentiment Analysis",
        "category": "Projects",
        "content": """
Project: Customer Feedback Sentiment Analysis (Category: NLP and Deep Learning)
Tech Stack: Python, TensorFlow, LSTM, RNN, Word2Vec, TF-IDF, Pandas, FastAPI, Docker, Kubernetes, Azure ML, AKS

Problem:
Tens of thousands of user reviews were manually audited, making it virtually impossible for leadership to identify recurring complaints, urgent escalations, or long-term sentiment trends in real time.

Solution:
Built an end-to-end NLP deep learning classification pipeline. Included automated text preprocessing, a TF-IDF baseline, and Word2Vec neural embeddings feeding into bidirectional LSTM and RNN models. Developed analytical dashboards displaying word clouds, recurring complaint clusters, and longitudinal sentiment trends. Served predictions via a FastAPI endpoint deployed on Azure Kubernetes Service (AKS).

Impact:
- Automated the classification of thousands of customer feedback reviews with high accuracy.
- Enabled instant identification of emerging product issues before they escalated.
- Delivered a scalable real-time sentiment inference API for connected internal systems.
        """.strip(),
    },
    {
        "id": "project_demand_forecasting",
        "title": "Project 4: Medicine Demand Forecasting",
        "category": "Projects",
        "content": """
Project: Medicine Demand Forecasting (Category: Machine Learning & Time Series)
Tech Stack: Python, XGBoost, Random Forest, AdaBoost, Pandas, SQL, FastAPI, Docker, AWS EC2, S3, SageMaker

Problem:
Pharmaceutical inventory planning relied on manual, static spreadsheets, resulting in frequent supply stockouts of essential medicines and costly overstock expiration waste.

Solution:
Engineered an advanced time series regression ensemble utilizing lag variables, rolling window statistics, day-of-week seasonality, and trend indicators. Combined XGBoost, Random Forest, and AdaBoost regressors with chronological cross-validation evaluated on RMSE, MAPE, and MAE. Implemented automated retraining pipelines on AWS SageMaker and created a filterable forecast interface by region and product line.

Impact:
- Reduced stockout events significantly and minimized inventory holding costs.
- Replaced intuition-based planning with data-driven predictive forecasts.
- Automated scheduled retraining keeps forecasts accurate and aligned with demand shifts.
        """.strip(),
    },
    {
        "id": "skills_catalog",
        "title": "Technical Skills & Competencies",
        "category": "Skills",
        "content": """
Anuj Pathak's technical skills across 8 core domains:
1. Agentic AI: AI Agents, MCP Server (Model Context Protocol), Tool Calling, LangGraph, Multi-Agent Workflows, Human-in-the-Loop, Guardrails, Agentic RAG.
2. Generative AI: Large Language Models (LLMs), RAG, Prompt Engineering, Hugging Face, LangChain, OpenAI API (GPT-4o, reasoning models), LangSmith, FAISS, ChromaDB, Pinecone, Vector Embeddings, LoRA/PEFT, LlamaIndex.
3. Deep Learning: Natural Language Processing (NLP), Word2Vec, TF-IDF, Transformers, Artificial Neural Networks (ANN), Convolutional Neural Networks (CNN), Recurrent Neural Networks (RNN), LSTM, BERT, TensorFlow, Keras, PyTorch.
4. Machine Learning: Regression (Linear, Ridge, Lasso), Random Forest, XGBoost, AdaBoost, Support Vector Machines (SVM), K-Nearest Neighbors (KNN), K-Means Clustering, PCA, Time Series Forecasting, Scikit-learn.
5. Cloud and MLOps: AWS (EC2, S3, SageMaker, Bedrock), Azure (Azure ML, AKS, Container Registry), Google Cloud Platform (GCP), Docker, Kubernetes, CI/CD Automation (GitHub Actions), MLflow.
6. Databases: MySQL (relational, SQLAlchemy), MongoDB (NoSQL), SQL (window functions, query tuning), Pinecone, ChromaDB, FAISS.
7. Backend: FastAPI (asynchronous, Pydantic), Flask, RESTful APIs, Postman, Uvicorn, Pydantic v2.
8. Programming & Analytics: Python, Pandas, NumPy, Matplotlib, Seaborn.
        """.strip(),
    },
    {
        "id": "freelance_services",
        "title": "Freelance Services & Engagement Options",
        "category": "Services",
        "content": """
Freelance Services Offered by Anuj Pathak:
1. ML Model Development: Custom predictive models, tabular machine learning, classification, and time series demand forecasting.
2. RAG & LLM Chatbots: Enterprise knowledge retrieval systems with hybrid search, vector databases (Pinecone, ChromaDB), and hallucination guardrails.
3. AI Agents & Automation: Stateful autonomous agent architectures with LangGraph, MCP servers, tool calling, and human-in-the-loop workflows.
4. Data Analysis & Dashboards: Statistical exploratory data analysis, KPI dashboards, and actionable insights.
5. ML Model Deployment & MLOps: Containerizing models into FastAPI REST microservices, Docker packaging, and cloud deployment on AWS or Azure with automated CI/CD.

Engagement Options:
- Fixed-Price Project: Defined scope, milestones, and deliverables (Contact for quote).
- Hourly Consulting: Flexible technical advisory, debugging, architecture reviews, and sprint support.
- Monthly Retainer: Dedicated part-time or full-time AI/ML engineering capacity for ongoing roadmap needs.

Availability: Available for freelance projects, technical consulting, and collaborative contracts.
How to Book / Contact: Email pathakanuj322@gmail.com, call +91 7479931270, or submit an inquiry through the portfolio website.
        """.strip(),
    },
]

# Keywords to detect if question is related to Anuj Pathak's profile
RELEVANT_KEYWORDS = [
    "anuj", "pathak", "you", "he", "his", "experience", "skill", "project", "work",
    "freelance", "hire", "contact", "email", "phone", "arcgate", "rag", "agent",
    "langgraph", "langchain", "mcp", "fastapi", "docker", "python", "aws", "azure",
    "mysql", "education", "b.tech", "college", "degree", "services", "quote",
    "pricing", "hourly", "retainer", "ml", "ai", "machine learning", "deep learning",
    "portfolio", "about", "resume", "cv", "background", "customer support",
    "sentiment", "demand forecasting", "hr", "chatbot", "rate", "cost", "availability"
]

DEFAULT_SUGGESTED_QUESTIONS = [
    "What projects has Anuj built?",
    "Is he available for freelance?",
    "What are Anuj's skills in Agentic AI?",
    "Tell me about his experience at Arcgate.",
    "How can I contact Anuj?",
]

OUT_OF_SCOPE_RESPONSE = (
    "I am specifically designed to answer questions about Anuj Pathak's professional profile, "
    "projects, skills, experience, and freelance availability. "
    "How can I assist you with Anuj's work?"
)


class PortfolioRAG:
    """
    RAG engine for 'Ask Anuj' AI chat widget.
    Uses LangChain and FAISS with OpenAI when OPENAI_API_KEY is available,
    with an intelligent semantic fallback retriever when offline or API key is absent.
    """

    def __init__(self):
        self.vector_store = None
        self.initialized = False
        self._init_rag()

    def _init_rag(self):
        """Initializes the FAISS vector index using LangChain."""
        try:
            if OPENAI_API_KEY and not OPENAI_API_KEY.startswith("your_"):
                from langchain_community.vectorstores import FAISS
                from langchain_openai import OpenAIEmbeddings
                from langchain_core.documents import Document

                docs = [
                    Document(
                        page_content=item["content"],
                        metadata={"title": item["title"], "category": item["category"], "id": item["id"]},
                    )
                    for item in PORTFOLIO_KNOWLEDGE
                ]
                embeddings = OpenAIEmbeddings(
                    openai_api_key=OPENAI_API_KEY,
                    model="text-embedding-3-small",
                )
                self.vector_store = FAISS.from_documents(docs, embeddings)
                self.initialized = True
                logger.info("LangChain FAISS vector store initialized successfully with OpenAI embeddings.")
            else:
                logger.info("OPENAI_API_KEY not configured. Using high-precision grounded fallback retriever.")
        except Exception as exc:
            logger.warning(f"Could not initialize OpenAI FAISS vector store: {exc}. Using fallback retriever.")
            self.vector_store = None

    def is_relevant_query(self, query: str) -> bool:
        """
        Guardrail check to ensure query relates to Anuj's professional profile.
        Explicitly rejects off-topic queries (math, weather, generic coding homework, recipes, poems).
        """
        q = query.lower().strip()

        # 1. Catch explicit off-topic patterns first
        off_topic_patterns = [
            r"^(what is|calculate|solve)\s+\d+",
            r"\b(weather in|weather today|recipe for|capital of|write a poem|sing a song|who is the president|tell me a joke)\b",
            r"\b(leetcode|bubble sort|reverse a linked list|fibonacci|binary search tree)\b",
            r"\b(write a python script to|write code to solve|implement quicksort)\b",
        ]
        for pattern in off_topic_patterns:
            if re.search(pattern, q):
                return False

        # 2. Direct short greetings are accepted
        if re.match(r"^(hi|hello|hey|greetings|good\s+(morning|afternoon|evening)|who\s+are\s+you)\b", q):
            return True

        # 3. Check for presence of portfolio-relevant terms
        for kw in RELEVANT_KEYWORDS:
            if kw in q:
                return True

        # 4. If user asks about technical or career competencies in context
        if any(term in q for term in ["build", "tech", "model", "data", "bot", "database", "api", "cloud"]):
            return True

        return False

    def _retrieve_relevant_chunks(self, query: str, top_k: int = 3) -> List[Dict]:
        """
        Retrieves relevant context items. Uses FAISS if available, else term-frequency similarity.
        """
        if self.vector_store and self.initialized:
            try:
                faiss_results = self.vector_store.similarity_search(query, k=top_k)
                return [{"title": d.metadata.get("title", ""), "content": d.page_content} for d in faiss_results]
            except Exception as e:
                logger.warning(f"FAISS search failed: {e}. Falling back to internal retriever.")

        # Grounded keyword & semantic overlap fallback
        q_words = set(re.findall(r"\w+", query.lower()))
        scored = []
        for item in PORTFOLIO_KNOWLEDGE:
            content_lower = item["content"].lower()
            title_lower = item["title"].lower()
            score = 0
            for w in q_words:
                if len(w) > 2:
                    if w in title_lower:
                        score += 3
                    if w in content_lower:
                        score += 1
            scored.append((score, item))

        scored.sort(key=lambda x: x[0], reverse=True)
        return [item for score, item in scored[:top_k] if score > 0] or PORTFOLIO_KNOWLEDGE[:2]

    def _fallback_generate(self, query: str) -> str:
        """
        Produces clean, grounded answers directly from the knowledge base when OpenAI API key is unset.
        """
        q = query.lower().strip()

        # Greetings
        if re.search(r"^(hi|hello|hey|good\s+(morning|afternoon|evening)|who\s+are\s+you)", q):
            return (
                "Hi there! I am **Ask Anuj**, Anuj Pathak's AI assistant. "
                "I can answer questions about his 3+ years of experience in Data Science & AI/ML, "
                "his stateful LangGraph agents, enterprise RAG chatbots, and freelance availability. "
                "What would you like to know?"
            )

        # Freelance / Hire / Availability / Rates
        if any(w in q for w in ["freelance", "hire", "available", "cost", "rate", "quote", "pricing", "contract", "salary"]):
            return (
                "**Yes! Anuj is actively available for freelance work, consulting, and contract roles.**\n\n"
                "**Engagement Models:**\n"
                "- **Fixed-Price Project**: Clear deliverables and milestone-based timeline.\n"
                "- **Hourly Consulting**: Technical advisory, architecture reviews, and sprint support.\n"
                "- **Monthly Retainer**: Dedicated part-time or full-time AI/ML engineering bandwidth.\n\n"
                "To discuss your project or request a quote, reach out via:\n"
                "- **Email**: [pathakanuj322@gmail.com](mailto:pathakanuj322@gmail.com)\n"
                "- **Phone**: +91 7479931270\n"
                "- Or submit the project inquiry form directly on this website!"
            )

        # Projects
        if any(w in q for w in ["project", "built", "portfolio", "case study", "apps"]):
            return (
                "Anuj has engineered 4 production-grade AI/ML solutions showcased on this portfolio:\n\n"
                "1. **Enterprise RAG Customer Support Chatbot (GenAI)**:\n"
                "   - *Tech*: LangChain, OpenAI API, Pinecone, FastAPI, Docker, AWS.\n"
                "   - *Impact*: Hybrid semantic search with similarity thresholds, eliminating support backlogs with near-zero hallucinations.\n\n"
                "2. **HR Policy & Employee Support Chatbot (Agentic AI)**:\n"
                "   - *Tech*: LangGraph, MCP Server, OpenAI API, Pinecone, FastAPI, MySQL.\n"
                "   - *Impact*: Stateful multi-agent supervisor with human-in-the-loop approvals and guardrails for sensitive payroll/leave operations.\n\n"
                "3. **Customer Feedback Sentiment Analysis (NLP & Deep Learning)**:\n"
                "   - *Tech*: TensorFlow, LSTM, RNN, Word2Vec, TF-IDF, AKS, Azure ML.\n"
                "   - *Impact*: Automated classification of tens of thousands of customer reviews with word cloud analytics.\n\n"
                "4. **Medicine Demand Forecasting (ML & Time Series)**:\n"
                "   - *Tech*: XGBoost, Random Forest, AdaBoost, Pandas, SQL, AWS SageMaker.\n"
                "   - *Impact*: Time series regression ensemble with rolling features, substantially reducing stockouts."
            )

        # Experience / Arcgate
        if any(w in q for w in ["experience", "arcgate", "company", "career", "job", "work"]):
            return (
                "Anuj currently serves as a **Data Scientist & AI/ML Engineer** at **Arcgate Technologies** (May 2024 - Present) in Udaipur, Rajasthan.\n\n"
                "**Key Highlights at Arcgate:**\n"
                "- Architected a stateful multi-agent HR chatbot in LangGraph with tool calling, MCP server integration, and human-in-the-loop approvals.\n"
                "- Implemented custom MCP servers with role-based guardrails and PII redaction.\n"
                "- Developed enterprise RAG pipelines with Pinecone vector retrieval and LangSmith observability.\n"
                "- Built LSTM sentiment models in TensorFlow and demand forecasting models with XGBoost and AdaBoost.\n"
                "- Deployed production FastAPI microservices in Docker across AWS and Azure environments."
            )

        # Skills / Technologies
        if any(w in q for w in ["skill", "stack", "technology", "langgraph", "langchain", "mcp", "fastapi", "python"]):
            return (
                "Anuj has expertise across **8 technical domains** and over **67 technologies**:\n\n"
                "- **Agentic AI**: LangGraph, AI Agents, MCP Server, Tool Calling, Multi-Agent Workflows, Human-in-the-Loop, Guardrails, Agentic RAG.\n"
                "- **Generative AI**: LLMs, RAG, LangChain, OpenAI API, LangSmith, FAISS, Pinecone, ChromaDB, Hugging Face, LoRA/PEFT, LlamaIndex.\n"
                "- **Deep Learning**: NLP, Word2Vec, TF-IDF, Transformers, BERT, TensorFlow, Keras, PyTorch, LSTM, RNN, CNN, ANN.\n"
                "- **Machine Learning**: Scikit-learn, XGBoost, Random Forest, AdaBoost, SVM, KNN, K-Means, PCA, Time Series Forecasting.\n"
                "- **Cloud & MLOps**: AWS (EC2, S3, SageMaker, Bedrock), Azure (AKS, Azure ML), Docker, Kubernetes, CI/CD, MLflow.\n"
                "- **Backend & Databases**: FastAPI, Flask, REST APIs, Postman, MySQL, MongoDB, SQL, Pydantic v2."
            )

        # Contact / Reach out
        if any(w in q for w in ["contact", "email", "phone", "reach", "linkedin", "github", "call"]):
            return (
                "You can get in touch with Anuj directly:\n\n"
                "- **Email**: [pathakanuj322@gmail.com](mailto:pathakanuj322@gmail.com)\n"
                "- **Phone**: +91 7479931270\n"
                "- **Location**: Gurugram, India\n"
                "- **LinkedIn**: [linkedin.com/in/anuj-kumar6702](https://www.linkedin.com/in/anuj-kumar6702/)\n"
                "- **GitHub**: [github.com/anuj931270](https://github.com/anuj931270)\n\n"
                "Feel free to submit a project inquiry or contact form message right here on the portfolio!"
            )

        # Default grounded profile response
        chunks = self._retrieve_relevant_chunks(query, top_k=2)
        return (
            f"Here is what Anuj's profile says regarding your query:\n\n"
            f"{chunks[0]['content']}\n\n"
            f"Feel free to ask about his specific projects, technical skills in LangGraph/RAG, or freelance availability!"
        )

    def answer_query(self, user_message: str) -> Tuple[str, List[str]]:
        """
        Processes the user message through guardrails and RAG.
        Returns: (reply_text, suggested_followup_questions)
        """
        trimmed = user_message.strip()

        # 1. Guardrail check
        if not self.is_relevant_query(trimmed):
            return OUT_OF_SCOPE_RESPONSE, DEFAULT_SUGGESTED_QUESTIONS[:3]

        # 2. If OpenAI API key is active, execute LangChain RAG pipeline
        if OPENAI_API_KEY and not OPENAI_API_KEY.startswith("your_"):
            try:
                from langchain_openai import ChatOpenAI
                from langchain_core.prompts import ChatPromptTemplate
                from langchain_core.output_parsers import StrOutputParser

                chunks = self._retrieve_relevant_chunks(trimmed, top_k=3)
                context_str = "\n\n---\n\n".join([f"[{c.get('title', '')}]:\n{c.get('content', '')}" for c in chunks])

                system_prompt = (
                    "You are 'Ask Anuj', an intelligent AI assistant for Anuj Pathak's portfolio.\n"
                    "Your goal is to answer visitor questions accurately, professionally, and concisely about Anuj's "
                    "work experience, technical skills, projects, services, education, and freelance availability.\n\n"
                    "CRITICAL RULES:\n"
                    "1. Rely ONLY on the provided context. If the question is outside Anuj's professional domain "
                    "(e.g. general trivia, unrelated code, recipes, weather, politics), politely decline and state: "
                    "'I am specifically designed to answer questions about Anuj Pathak's professional profile, projects, skills, and freelance availability.'\n"
                    "2. Format your response cleanly using GitHub Markdown (bolding, bullet points, concise paragraphs).\n"
                    "3. If asked about contact or hiring, provide his email (pathakanuj322@gmail.com) and phone (+91 7479931270).\n\n"
                    f"CONTEXT ABOUT ANUJ PATHAK:\n{context_str}"
                )

                prompt = ChatPromptTemplate.from_messages([
                    ("system", system_prompt),
                    ("user", "{question}"),
                ])
                llm = ChatOpenAI(
                    model="gpt-4o-mini",
                    temperature=0.2,
                    openai_api_key=OPENAI_API_KEY,
                    max_tokens=450,
                )
                chain = prompt | llm | StrOutputParser()
                response = chain.invoke({"question": trimmed})
                return response.strip(), DEFAULT_SUGGESTED_QUESTIONS
            except Exception as exc:
                logger.warning(f"OpenAI LangChain execution failed: {exc}. Using grounded fallback engine.")

        # 3. Grounded Fallback response
        response = self._fallback_generate(trimmed)
        return response, DEFAULT_SUGGESTED_QUESTIONS


# Singleton instance
rag_engine = PortfolioRAG()
