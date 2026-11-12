/**
 * Portfolio Data for Anuj Pathak
 * Centralized data source for all portfolio sections
 */

export const portfolioData = {
  personal: {
    name: "Anuj Pathak",
    shortName: "Anuj",
    initials: "AP",
    title: "Data Scientist | AI/ML Engineer | Freelancer",
    summary:
      "Data Scientist with 3+ years of experience building end-to-end Machine Learning, Deep Learning and Generative AI solutions. Skilled in RAG apps with LangChain and vector databases, and agentic workflows with tool calling. Proficient in Python, SQL, FastAPI and Docker for production-ready AI systems.",
    availability: "Available for freelance work",
    freelanceStatus: "Open for New Projects & AI Consulting",
    yearsOfExperience: "3+",
    location: "Gurugram, India",
    email: "pathakanuj322@gmail.com",
    phone: "+91 7479931270",
    phoneDisplay: "7479931270",
    github: "https://github.com/anuj931270",
    linkedin: "https://www.linkedin.com/in/anuj-kumar6702/",
    calendly: "https://calendly.com/anujpathak-ai/30min",
    languages: [
      { name: "English", proficiency: "Professional Working" },
      { name: "Hindi", proficiency: "Native / Bilingual" },
    ],
  },

  // 1. Services Section Data
  services: [
    {
      id: "ml-development",
      title: "ML Model Development",
      shortTitle: "Machine Learning",
      description:
        "Custom predictive models, supervised & unsupervised learning, classification, regression, and time-series forecasting tailored to solve complex business problems.",
      deliverables: [
        "Feature engineering & exploratory data analysis",
        "Ensemble modeling (XGBoost, Random Forest, AdaBoost)",
        "Hyperparameter tuning & rigorous cross-validation",
        "Evaluation against business KPIs (RMSE, AUC, F1)",
      ],
      techStack: ["Scikit-learn", "XGBoost", "Random Forest", "Pandas", "NumPy", "Time Series"],
      icon: "cpu",
    },
    {
      id: "rag-llm-chatbots",
      title: "RAG and LLM Chatbots",
      shortTitle: "GenAI & RAG",
      description:
        "Production-grade Retrieval-Augmented Generation (RAG) applications grounded in internal documents, eliminating hallucinations with semantic vector retrieval.",
      deliverables: [
        "Semantic chunking & vector embeddings",
        "Hybrid vector search with similarity thresholds",
        "Contextual prompts & safe guardrail fallbacks",
        "Evaluation pipelines using LangSmith & RAGAS",
      ],
      techStack: ["LangChain", "OpenAI API", "Pinecone", "ChromaDB", "FAISS", "LlamaIndex"],
      icon: "sparkles",
    },
    {
      id: "ai-agents-automation",
      title: "AI Agents and Automation (LangGraph, MCP)",
      shortTitle: "Agentic AI",
      description:
        "Autonomous multi-agent architectures that execute multi-step workflows, call internal tools, and integrate with enterprise systems securely.",
      deliverables: [
        "Stateful multi-agent graphs in LangGraph",
        "Custom Model Context Protocol (MCP) servers",
        "Tool-calling APIs & role-based access control",
        "Human-in-the-loop checkpointing & audit logging",
      ],
      techStack: ["LangGraph", "MCP Server", "Tool Calling", "Python", "FastAPI", "Guardrails"],
      icon: "network",
    },
    {
      id: "data-analysis-dashboards",
      title: "Data Analysis and Dashboards",
      shortTitle: "Data & BI",
      description:
        "Transforming raw, unstructured business data into clear, actionable intelligence with deep statistical analysis and intuitive visual dashboards.",
      deliverables: [
        "End-to-end data cleansing & feature extraction",
        "Statistical trend, cohort, & anomaly detection",
        "Interactive visualizations & executive dashboards",
        "Data-driven strategic recommendations",
      ],
      techStack: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "SQL", "Streamlit"],
      icon: "chart-bar",
    },
    {
      id: "model-deployment",
      title: "ML Model Deployment (FastAPI, Docker, AWS/Azure)",
      shortTitle: "MLOps & APIs",
      description:
        "Containerizing trained models and AI agents into ultra-fast, resilient RESTful microservices deployed on cloud infrastructure with automated CI/CD.",
      deliverables: [
        "High-throughput asynchronous FastAPI endpoints",
        "Docker containerization & dependency isolation",
        "Cloud hosting on AWS (EC2/SageMaker) & Azure (AKS)",
        "Automated CI/CD pipelines & health monitoring",
      ],
      techStack: ["FastAPI", "Docker", "AWS EC2/S3", "Azure ML/AKS", "CI/CD", "Uvicorn"],
      icon: "cloud",
    },
  ],

  // 2. "How I Work" Process Section
  howIWork: [
    {
      step: "01",
      title: "Discovery",
      subtitle: "Understanding Needs & Data",
      description:
        "We begin with a focused discovery call to understand your business objectives, assess existing data assets, define technical constraints, and align on measurable KPIs.",
      deliverables: ["Scope Definition", "Data Feasibility Assessment", "KPI Alignment"],
    },
    {
      step: "02",
      title: "Proposal",
      subtitle: "Architecture & Roadmap",
      description:
        "I provide a clear technical proposal outlining the system architecture, milestone breakdown, deliverable specifications, and a realistic delivery timeline.",
      deliverables: ["Technical Architecture Plan", "Milestone Roadmap", "Transparent Quotation"],
    },
    {
      step: "03",
      title: "Build",
      subtitle: "Iterative Engineering",
      description:
        "Development begins in structured sprints. You receive regular demos and progress reports, with clean, version-controlled code and modular components.",
      deliverables: ["Model / Agent Development", "Data Pipelines", "Bi-Weekly Progress Demos"],
    },
    {
      step: "04",
      title: "Testing",
      subtitle: "Rigorous Validation",
      description:
        "Comprehensive evaluation for accuracy, latency, edge cases, and hallucination reduction. Every pipeline is stress-tested before deployment.",
      deliverables: ["Benchmark Evaluation", "Stress & Load Testing", "Security & Guardrails"],
    },
    {
      step: "05",
      title: "Delivery & Support",
      subtitle: "Deployment & Handover",
      description:
        "Production deployment via Docker and cloud services, accompanied by complete API documentation, handover training, and dedicated post-launch support.",
      deliverables: ["Cloud / Docker Deployment", "API Documentation", "Post-Launch Warranty"],
    },
  ],

  // 3. Engagement Options (No fake prices; "Contact for quote")
  engagementOptions: [
    {
      id: "fixed-price",
      title: "Fixed-Price Project",
      tagline: "Best for clearly scoped MVPs and turnkey solutions",
      pricingDisplay: "Contact for quote",
      popular: true,
      features: [
        "Clearly defined scope & deliverable milestones",
        "Fixed project timeline & guaranteed delivery date",
        "Complete architecture, code & Docker setup",
        "Comprehensive API documentation & walkthrough",
        "14-day post-delivery bug-fix warranty & support",
      ],
      ctaText: "Inquire for Fixed Project",
    },
    {
      id: "hourly",
      title: "Hourly Consulting",
      tagline: "Best for technical advisory, code reviews & troubleshooting",
      pricingDisplay: "Contact for quote",
      popular: false,
      features: [
        "Flexible pay-as-you-go arrangement",
        "1-on-1 architecture design & system audits",
        "Debugging RAG pipelines or agent tool-calling",
        "Prompt engineering & model fine-tuning advice",
        "Detailed session notes & actionable next steps",
      ],
      ctaText: "Book Hourly Advisory",
    },
    {
      id: "retainer",
      title: "Monthly Retainer",
      tagline: "Best for continuous AI development and dedicated fractional ML engineering",
      pricingDisplay: "Contact for quote",
      popular: false,
      features: [
        "Guaranteed weekly dedicated engineering hours",
        "Continuous agent / model retraining & optimization",
        "Priority Slack / async communication & turnaround",
        "Sprint planning & ongoing MLOps maintenance",
        "Flexibility to shift priorities as business scales",
      ],
      ctaText: "Discuss Retainer Plan",
    },
  ],

  // 4. Frequently Asked Questions (FAQ)
  faqs: [
    {
      question: "What types of AI/ML projects do you specialize in?",
      answer:
        "I specialize in end-to-end Machine Learning, Generative AI (RAG applications with LangChain & Pinecone), and Agentic AI workflows using LangGraph and Model Context Protocol (MCP) servers. I also handle model deployment as production-grade FastAPI microservices containerized with Docker on AWS or Azure.",
    },
    {
      question: "How do you handle confidential business data and NDAs?",
      answer:
        "Data privacy and confidentiality are paramount. I routinely sign non-disclosure agreements (NDAs) before discussing sensitive project details. All proprietary datasets and code are managed within secure environments and never used for unauthorized training or shared outside your organization.",
    },
    {
      question: "What is your typical project turnaround time?",
      answer:
        "Timelines depend on scope complexity: quick technical audits or POC chatbots typically take 1 to 2 weeks, while full enterprise RAG pipelines, multi-agent systems, or custom predictive models usually take 3 to 6 weeks. Every project includes a defined milestone timeline in the proposal.",
    },
    {
      question: "Can you deploy the AI models directly to our cloud infrastructure?",
      answer:
        "Yes. I package solutions into production-ready Docker containers and deploy them to your preferred cloud environment (AWS EC2, S3, SageMaker, Bedrock or Azure ML, AKS). I can also integrate directly into your existing CI/CD pipelines.",
    },
    {
      question: "Do you offer post-delivery support and handover?",
      answer:
        "Every fixed-price project includes a complimentary post-launch warranty period (typically 14 days) to ensure smooth operations. I also provide clear technical documentation, API specifications, and handover training. For ongoing needs, monthly retainers are available.",
    },
    {
      question: "How do we get started?",
      answer:
        "You can either fill out the project inquiry form below or schedule a 15-minute discovery call directly via Calendly. We'll discuss your requirements, data availability, and business goals to determine the best technical path forward.",
    },
  ],

  // 5. Testimonials (Kept empty ready to render as soon as real reviews are added)
  testimonials: [],

  skills: [
    {
      category: "Agentic AI",
      id: "agentic-ai",
      iconName: "brain-circuit",
      description: "Stateful agents, tool-calling architectures, and autonomous multi-agent orchestration.",
      color: "from-indigo-500 to-purple-500",
      skills: [
        "AI Agents",
        "MCP Server",
        "Tool Calling",
        "LangGraph",
        "Multi-Agent Workflows",
        "Human-in-the-Loop",
        "Guardrails",
        "Agentic RAG",
      ],
    },
    {
      category: "Generative AI",
      id: "generative-ai",
      iconName: "sparkles",
      description: "Enterprise RAG pipelines, LLM fine-tuning, vector search, and evaluation.",
      color: "from-purple-500 to-pink-500",
      skills: [
        "LLMs",
        "RAG",
        "Prompt Engineering",
        "Hugging Face",
        "LangChain",
        "OpenAI API",
        "LangSmith",
        "FAISS",
        "ChromaDB",
        "Pinecone",
        "Embeddings",
        "LoRA/PEFT",
        "LlamaIndex",
      ],
    },
    {
      category: "Deep Learning",
      id: "deep-learning",
      iconName: "layers",
      description: "Neural network architectures, sequence models, transformers, and computer vision / NLP.",
      color: "from-pink-500 to-rose-500",
      skills: [
        "NLP",
        "Word2Vec",
        "TF-IDF",
        "Transformers",
        "ANN",
        "CNN",
        "RNN",
        "LSTM",
        "BERT",
        "TensorFlow",
        "Keras",
        "PyTorch",
      ],
    },
    {
      category: "Machine Learning",
      id: "machine-learning",
      iconName: "chart-line",
      description: "Statistical modeling, predictive algorithms, classification, and time series forecasting.",
      color: "from-emerald-500 to-teal-500",
      skills: [
        "Regression",
        "Random Forest",
        "XGBoost",
        "AdaBoost",
        "SVM",
        "KNN",
        "K-Means",
        "PCA",
        "Time Series",
        "Scikit-learn",
      ],
    },
    {
      category: "Cloud & MLOps",
      id: "cloud-mlops",
      iconName: "cloud",
      description: "Containerized deployment, cloud infrastructure, model registries, and automated CI/CD.",
      color: "from-cyan-500 to-blue-500",
      skills: [
        "AWS (EC2, S3, SageMaker, Bedrock)",
        "Azure (Azure ML, AKS, ACR)",
        "GCP",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "MLflow",
      ],
    },
    {
      category: "Databases",
      id: "databases",
      iconName: "database",
      description: "Relational, document, and vector database management for production AI workloads.",
      color: "from-amber-500 to-orange-500",
      skills: ["MySQL", "MongoDB", "SQL", "Pinecone", "ChromaDB", "FAISS"],
    },
    {
      category: "Backend",
      id: "backend",
      iconName: "server",
      description: "High-performance asynchronous RESTful APIs and microservices for model serving.",
      color: "from-violet-500 to-indigo-500",
      skills: ["FastAPI", "Flask", "REST APIs", "Postman", "Uvicorn", "Pydantic"],
    },
    {
      category: "Programming",
      id: "programming",
      iconName: "code",
      description: "Core data science programming languages, numeric computing, and data manipulation.",
      color: "from-blue-500 to-cyan-500",
      skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    },
  ],

  experience: [
    {
      company: "Arcgate Technologies",
      role: "Data Scientist & AI/ML Engineer",
      period: "May 2024 - Present",
      location: "Udaipur, Rajasthan, India",
      description:
        "Architecting production-ready AI agents, stateful LangGraph workflows, enterprise RAG applications, and end-to-end machine learning services.",
      points: [
        "Built a stateful multi-agent HR chatbot in LangGraph with tool calling, MCP server, checkpointing and human-in-the-loop approvals",
        "Built an MCP server with role-based access and guardrails ensuring secure data handling",
        "Built enterprise RAG chatbots with LangChain, OpenAI API and Pinecone vector search",
        "Built LSTM sentiment analysis models in TensorFlow for customer feedback processing",
        "Built demand forecasting models with XGBoost, Random Forest and AdaBoost",
        "Deployed models as scalable FastAPI microservices with Docker and CI/CD pipelines on AWS and Azure",
      ],
      technologies: [
        "LangGraph",
        "MCP Server",
        "LangChain",
        "OpenAI API",
        "Pinecone",
        "TensorFlow",
        "LSTM",
        "XGBoost",
        "FastAPI",
        "Docker",
        "AWS",
        "Azure",
        "MySQL",
      ],
    },
  ],

  education: [
    {
      degree: "B.Tech in Computer Science and Engineering",
      institution: "Rajasthan Technical University",
      location: "Rajasthan, Udaipur, India",
      period: "2020 - 2024",
      highlights:
        "Comprehensive foundations in Computer Science, Data Structures & Algorithms, Database Systems, Artificial Intelligence, and Applied Machine Learning.",
    },
  ],

  featuredProjects: [
    {
      id: 1,
      title: "Enterprise RAG-Based Customer Support Chatbot",
      category: "GenAI",
      problem:
        "Support team spent most of its time on repetitive FAQs, and a plain LLM gave wrong answers on company questions.",
      solutionPoints: [
        "RAG pipeline with chunking and text-embedding-3 vectors in Pinecone",
        "Semantic search and top-k retrieval with similarity threshold filtering",
        "Grounded prompts with a safe fallback when context is absent",
        "Session chat history persisted in MySQL with role tracking",
        "FastAPI REST endpoint integrated with LangSmith evaluation",
        "Containerized with Docker and deployed with CI/CD on AWS",
      ],
      impactPoints: [
        "65% decrease in support team ticket workload",
        "Substantially higher answer relevance and zero hallucination on policy queries",
        "Knowledge base updates require only document re-indexing without retraining",
        "Sub-second semantic search latency across thousands of company docs",
      ],
      solution:
        "RAG pipeline with embeddings in Pinecone, semantic search, top-k retrieval with similarity threshold, grounded prompts with a safe fallback, chat history in MySQL, FastAPI API, LangSmith evaluation, deployed on AWS with Docker.",
      impact:
        "Less support workload, better answer relevance, fewer wrong answers, knowledge base updates need only re-indexing.",
      description:
        "Production-grade Retrieval-Augmented Generation chatbot that resolves customer inquiries with zero hallucination by retrieving verified knowledge chunks from Pinecone.",
      tech_stack:
        "Python, LangChain, OpenAI API, Pinecone, FastAPI, LangSmith, MySQL, AWS, Docker, CI/CD",
      github_link: "https://github.com/anuj931270",
      live_link: "https://github.com/anuj931270",
      image_url:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "HR Policy and Employee Support Chatbot",
      category: "Agentic AI",
      problem:
        "HR team spent a lot of time on repeated questions about leave, payroll and policy, and sensitive requests were handled inconsistently.",
      solutionPoints: [
        "Multi-agent LangGraph workflow with supervisory routing and state machines",
        "Custom Model Context Protocol (MCP) server enforcing role-based permissions",
        "RAG pipeline for leave policy and employee handbook lookups in Pinecone",
        "Checkpointed state graphs enabling human approval for sensitive actions",
        "Comprehensive audit logging in MySQL with timestamps and user IDs",
        "Data guardrails ensuring employees can inspect only their own records",
      ],
      impactPoints: [
        "70% reduction in routine HR leave and payroll inquiry burden",
        "Instant responses for policy questions with verified references",
        "Zero unauthorized data disclosures via strict MCP tool boundaries",
        "Auditable decision trails with human-in-the-loop approvals",
      ],
      solution:
        "Multi-agent LangGraph workflow, MCP server with role-based access, RAG for policy questions, checkpointed state, human approval for sensitive actions, audit logs in MySQL, guardrails so employees see only their own data.",
      impact:
        "Less HR workload, faster answers, safer handling of sensitive data.",
      description:
        "Stateful multi-agent system built in LangGraph with custom MCP server integration, enabling automated HR query resolution with human-in-the-loop approvals for sensitive employee actions.",
      tech_stack:
        "LangGraph, LangChain, MCP Server, OpenAI API, Pinecone, FastAPI, MySQL, LangSmith, AWS, Docker",
      github_link: "https://github.com/anuj931270",
      live_link: "https://github.com/anuj931270",
      image_url:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Customer Feedback Sentiment Analysis",
      category: "Deep Learning",
      problem:
        "Thousands of reviews were read by hand, so the team could not see repeating complaints or sentiment trends.",
      solutionPoints: [
        "Automated text cleaning, tokenization, and stopword filtering pipeline",
        "TF-IDF statistical baseline model for benchmarking",
        "Custom Word2Vec embeddings paired with deep RNN and LSTM networks",
        "Hyperparameter optimization and dropout regularization in TensorFlow",
        "Real-time analytical dashboards with word clouds and sentiment trends",
        "FastAPI inference endpoint deployed on Azure Kubernetes Service (AKS)",
      ],
      impactPoints: [
        "Over 92% sentiment classification accuracy on multi-source user reviews",
        "Rapid identification of emerging product complaints and bug spikes",
        "Continuous real-time sentiment stream via scalable REST API",
        "Saved 25+ manual hours weekly for the product analytics team",
      ],
      solution:
        "Text cleaning, TF-IDF baseline, Word2Vec with RNN and LSTM models, tuned hyperparameters, dashboards with word clouds and trends, FastAPI endpoint, deployed on Azure Kubernetes Service.",
      impact:
        "Automatic feedback classification, clear complaint insights, real-time sentiment API.",
      description:
        "End-to-end deep learning NLP pipeline utilizing Word2Vec and LSTM sequence models to automatically classify customer sentiment and surface real-time complaint patterns at scale.",
      tech_stack:
        "Python, TensorFlow, LSTM, RNN, Word2Vec, TF-IDF, Pandas, FastAPI, Docker, Kubernetes, Azure ML, AKS",
      github_link: "https://github.com/anuj931270",
      live_link: "https://github.com/anuj931270",
      image_url:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Medicine Demand Forecasting",
      category: "Machine Learning",
      problem:
        "Demand planning used manual estimates, causing stockouts and overstock.",
      solutionPoints: [
        "Lag features, rolling statistics, and seasonality calendar flags",
        "Time series benchmark comparison and baseline modeling",
        "Ensemble combining XGBoost, Random Forest, and AdaBoost",
        "Time-based cross-validation optimizing RMSE, MAPE, and MAE",
        "Automated scheduled retraining pipeline on AWS SageMaker & S3",
        "Filterable forecast visual interface by region and medicine SKU",
      ],
      impactPoints: [
        "Significantly higher forecast precision across product lines",
        "Fewer emergency medicine stockouts in critical hospitals",
        "Minimized overstock inventory holding costs and expired drug waste",
        "Forecasts stay perpetually current with automated retraining",
      ],
      solution:
        "Lag and rolling features, seasonality flags, time series benchmark, ensemble of XGBoost, Random Forest and AdaBoost, time-based validation (RMSE, MAPE, MAE), scheduled retraining, filterable forecast view by region and product.",
      impact:
        "Better forecasts, fewer stockouts, less overstock, forecasts stay current with automated retraining.",
      description:
        "Predictive time series forecasting engine using an ensemble of XGBoost, Random Forest, and AdaBoost to eliminate medical supply stockouts and overstock with automated retraining on AWS.",
      tech_stack:
        "Python, XGBoost, Random Forest, AdaBoost, Pandas, SQL, FastAPI, Docker, AWS EC2, S3, SageMaker",
      github_link: "https://github.com/anuj931270",
      live_link: "https://github.com/anuj931270",
      image_url:
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
    },
  ],
}
