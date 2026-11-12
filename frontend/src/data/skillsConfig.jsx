import React from 'react'

// Simple Icons (Si) from react-icons
import {
  SiPython,
  SiPandas,
  SiNumpy,
  SiFastapi,
  SiFlask,
  SiPostman,
  SiPydantic,
  SiMysql,
  SiMongodb,
  SiDocker,
  SiKubernetes,
  SiGooglecloud,
  SiMlflow,
  SiGithubactions,
  SiScikitlearn,
  SiTensorflow,
  SiKeras,
  SiPytorch,
  SiHuggingface,
  SiLangchain,
} from 'react-icons/si'

// Devicon (Di) from react-icons
import { DiAws, DiDatabase } from 'react-icons/di'

// Lucide Icons for skills without direct SI/DI icons
import {
  Bot,
  Cpu,
  Server,
  Workflow,
  Network,
  UserCheck,
  ShieldCheck,
  Wrench,
  Terminal,
  Sparkles,
  Brain,
  BrainCircuit,
  Database,
  Search,
  FileText,
  Binary,
  Layers,
  Boxes,
  SlidersHorizontal,
  Languages,
  Repeat,
  Clock,
  TrendingUp,
  Trees,
  Zap,
  Split,
  Minimize2,
  LineChart,
  BarChart3,
  AreaChart,
  Activity,
  Cloud,
  SearchCode,
  Calculator,
  Flame,
  Users,
  GitFork,
  Eye,
  Grid,
  Webhook,
  BookOpen,
  PieChart,
} from 'lucide-react'

// ==========================================
// Custom Clean SVGs for specialized platforms
// ==========================================
export function OpenAIIcon({ className = 'w-5 h-5', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.402-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.407 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813l-.0048 6.7227zm1.145-2.054l3.003-1.732 3.003 1.732v3.464l-3.003 1.732-3.003-1.732z" />
    </svg>
  )
}

export function McpIcon({ className = 'w-5 h-5', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="7" height="7" rx="1.5" />
      <rect x="14" y="13" width="7" height="7" rx="1.5" />
      <path d="M7 11v5a2 2 0 0 0 2 2h5" strokeDasharray="2 2" />
      <path d="M17 13V8a2 2 0 0 0-2-2h-5" />
      <circle cx="6.5" cy="7.5" r="1" fill="currentColor" />
      <circle cx="17.5" cy="16.5" r="1" fill="currentColor" />
    </svg>
  )
}

export function AzureIcon({ className = 'w-5 h-5', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M5.44 2.25L12.56 12.63L7.75 16.59L1.69 13.59L5.44 2.25ZM13.88 12.44L8.31 17.69L17.53 21.75L22.31 14.81L13.88 12.44Z" />
    </svg>
  )
}

export function PineconeIcon({ className = 'w-5 h-5', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.2l6 3.75v3.42l-6-3.75V4.2zm-1 3.42v3.75l-6-3.75V4.2l6 3.75zm-6 5.66l6 3.75v3.77l-6-3.75v-3.77zm8 7.52v-3.77l6-3.75v3.77l-6 3.75z" />
    </svg>
  )
}

export function ChromaIcon({ className = 'w-5 h-5', style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="7" cy="12" r="5" fill="#FF5C5C" fillOpacity="0.85" />
      <circle cx="17" cy="12" r="5" fill="#FFA500" fillOpacity="0.85" />
      <circle cx="12" cy="7" r="5" fill="#3B82F6" fillOpacity="0.85" />
    </svg>
  )
}

// ==========================================
// Comprehensive Skill Metadata Catalog
// Maps every skill to its icon, brand color, and tooltip description
// ==========================================
export const SKILLS_CONFIG = {
  // --- 1. Agentic AI ---
  'AI Agents': {
    icon: Bot,
    color: '#6366F1',
    category: 'Agentic AI',
    description: 'Autonomous goal-driven systems with dynamic reasoning, execution loops, and external tool interaction.',
  },
  'MCP Server': {
    icon: McpIcon,
    color: '#10B981',
    category: 'Agentic AI',
    description: 'Model Context Protocol server exposing standard tool calling, resources, and secure role-based guardrails.',
  },
  'Tool Calling': {
    icon: Wrench,
    color: '#F59E0B',
    category: 'Agentic AI',
    description: 'Function calling and structured JSON schema bindings connecting LLMs directly to APIs and databases.',
  },
  'LangGraph': {
    icon: Workflow,
    color: '#22C55E',
    category: 'Agentic AI',
    description: 'Stateful cyclical graph orchestration with persistent checkpointing, time-travel debugging, and multi-actor coordination.',
  },
  'Multi-Agent Workflows': {
    icon: Network,
    color: '#8B5CF6',
    category: 'Agentic AI',
    description: 'Hierarchical supervisor and collaborative agent teams dividing complex problem domains into specialized roles.',
  },
  'Human-in-the-Loop': {
    icon: UserCheck,
    color: '#EC4899',
    category: 'Agentic AI',
    description: 'Intervention checkpoints for approving sensitive mutations, human review loops, and state rollback safety.',
  },
  'Guardrails': {
    icon: ShieldCheck,
    color: '#EF4444',
    category: 'Agentic AI',
    description: 'Input/output sanitization, PII redaction, topic boundaries, hallucination suppression, and jailbreak defense.',
  },
  'Agentic RAG': {
    icon: SearchCode,
    color: '#06B6D4',
    category: 'Agentic AI',
    description: 'Adaptive multi-step retrieval routing with query rewriting, self-correction, and dynamic document verification.',
  },

  // --- 2. Generative AI ---
  'LLMs': {
    icon: BrainCircuit,
    color: '#8B5CF6',
    category: 'Generative AI',
    description: 'Large language model fine-tuning, context engineering, temperature sampling, and production inference.',
  },
  'RAG': {
    icon: FileText,
    color: '#10B981',
    category: 'Generative AI',
    description: 'Retrieval-Augmented Generation grounding enterprise proprietary data into context windows with zero hallucination.',
  },
  'Prompt Engineering': {
    icon: Terminal,
    color: '#3B82F6',
    category: 'Generative AI',
    description: 'Few-shot prompting, Chain-of-Thought, ReAct framing, system instructions, and structured JSON output prompts.',
  },
  'Hugging Face': {
    icon: SiHuggingface,
    color: '#FFD21E',
    category: 'Generative AI',
    description: 'Transformers library, open-source model hub, tokenizers, quantization pipelines, and pipeline inference.',
  },
  'LangChain': {
    icon: SiLangchain,
    color: '#22C55E',
    category: 'Generative AI',
    description: 'Chains, document loaders, text splitters, vector store retrievers, and output parsers.',
  },
  'OpenAI API': {
    icon: OpenAIIcon,
    color: '#10A37F',
    category: 'Generative AI',
    description: 'GPT-4o, o1/o3 reasoning models, embeddings generation, Whisper speech, and structured responses.',
  },
  'LangSmith': {
    icon: Activity,
    color: '#0284C7',
    category: 'Generative AI',
    description: 'Production observability, latency tracing, token cost tracking, prompt versioning, and automated evals.',
  },
  'FAISS': {
    icon: Binary,
    color: '#0081FB',
    category: 'Generative AI',
    description: 'Facebook AI Similarity Search for sub-millisecond nearest neighbor vector lookups on dense high-dimensional vectors.',
  },
  'ChromaDB': {
    icon: ChromaIcon,
    color: '#FF5C5C',
    category: 'Generative AI',
    description: 'Lightweight embedding database with metadata filtering for fast local and microservice vector search.',
  },
  'Pinecone': {
    icon: PineconeIcon,
    color: '#059669',
    category: 'Generative AI',
    description: 'Cloud-native managed serverless vector database providing high throughput, namespaces, and hybrid sparse-dense search.',
  },
  'Embeddings': {
    icon: Boxes,
    color: '#A855F7',
    category: 'Generative AI',
    description: 'Vector representations mapping semantic text meanings into metric vector spaces (OpenAI text-embedding-3, BGE).',
  },
  'LoRA/PEFT': {
    icon: SlidersHorizontal,
    color: '#F97316',
    category: 'Generative AI',
    description: 'Low-Rank Adaptation and Parameter-Efficient Fine-Tuning for lightweight domain-specific model adaptation.',
  },
  'LlamaIndex': {
    icon: Search,
    color: '#7C3AED',
    category: 'Generative AI',
    description: 'Data framework connecting custom data sources to LLMs with index structures, rerankers, and query engines.',
  },

  // --- 3. Deep Learning ---
  'NLP': {
    icon: Languages,
    color: '#06B6D4',
    category: 'Deep Learning',
    description: 'Natural language processing: tokenization, lemmatization, named entity recognition (NER), and sentiment scoring.',
  },
  'Word2Vec': {
    icon: Binary,
    color: '#3B82F6',
    category: 'Deep Learning',
    description: 'Continuous Bag-of-Words (CBOW) and Skip-gram neural embeddings encoding syntactic and semantic word associations.',
  },
  'TF-IDF': {
    icon: Calculator,
    color: '#10B981',
    category: 'Deep Learning',
    description: 'Term Frequency-Inverse Document Frequency statistical baseline vectorizer for keyword extraction and text ranking.',
  },
  'Transformers': {
    icon: Cpu,
    color: '#F59E0B',
    category: 'Deep Learning',
    description: 'Self-attention and cross-attention architectures powering modern generative models, encoder-decoder networks.',
  },
  'ANN': {
    icon: Network,
    color: '#8B5CF6',
    category: 'Deep Learning',
    description: 'Artificial Neural Networks: multi-layer perceptrons, backpropagation, dropout regularization, and activation functions.',
  },
  'CNN': {
    icon: Grid,
    color: '#EC4899',
    category: 'Deep Learning',
    description: 'Convolutional Neural Networks: feature extraction kernels, pooling, spatial invariance, and visual classification.',
  },
  'RNN': {
    icon: Repeat,
    color: '#14B8A6',
    category: 'Deep Learning',
    description: 'Recurrent Neural Networks: hidden state transitions capturing temporal dynamics in sequential time series and text.',
  },
  'LSTM': {
    icon: Clock,
    color: '#F97316',
    category: 'Deep Learning',
    description: 'Long Short-Term Memory networks: forget, input, and output gates resolving vanishing gradients in sequence modeling.',
  },
  'BERT': {
    icon: BookOpen,
    color: '#4285F4',
    category: 'Deep Learning',
    description: 'Bidirectional Encoder Representations from Transformers for context-aware classification and semantic extraction.',
  },
  'TensorFlow': {
    icon: SiTensorflow,
    color: '#FF6F00',
    category: 'Deep Learning',
    description: 'End-to-end deep learning framework with computational graph execution, TensorBoard profiling, and SavedModel exports.',
  },
  'Keras': {
    icon: SiKeras,
    color: '#D00000',
    category: 'Deep Learning',
    description: 'High-level neural network API for rapid prototyping, sequential/functional architectures, and custom training loops.',
  },
  'PyTorch': {
    icon: SiPytorch,
    color: '#EE4C2C',
    category: 'Deep Learning',
    description: 'Dynamic neural network framework with autograd automatic differentiation, TorchScript, and CUDA acceleration.',
  },

  // --- 4. Machine Learning ---
  'Regression': {
    icon: TrendingUp,
    color: '#3B82F6',
    category: 'Machine Learning',
    description: 'Linear, Ridge, Lasso, and Polynomial regression modeling continuous numeric variables with residual diagnostics.',
  },
  'Random Forest': {
    icon: Trees,
    color: '#22C55E',
    category: 'Machine Learning',
    description: 'Bagging ensemble aggregating de-correlated decision trees with out-of-bag validation and feature importance metrics.',
  },
  'XGBoost': {
    icon: Zap,
    color: '#FF7F00',
    category: 'Machine Learning',
    description: 'Extreme Gradient Boosting with second-order Taylor expansion gradients, regularization, and tree pruning.',
  },
  'AdaBoost': {
    icon: Activity,
    color: '#E11D48',
    category: 'Machine Learning',
    description: 'Adaptive Boosting sequentially assigning higher sample weights to misclassified instances across decision stumps.',
  },
  'SVM': {
    icon: Split,
    color: '#6366F1',
    category: 'Machine Learning',
    description: 'Support Vector Machines maximizing margin hyperplanes with RBF and polynomial kernel tricks for non-linear boundaries.',
  },
  'KNN': {
    icon: Users,
    color: '#06B6D4',
    category: 'Machine Learning',
    description: 'K-Nearest Neighbors non-parametric instance-based classifier using Euclidean and Manhattan distance metrics.',
  },
  'K-Means': {
    icon: PieChart,
    color: '#A855F7',
    category: 'Machine Learning',
    description: 'Unsupervised iterative centroid clustering minimizing within-cluster inertia with Elbow and Silhouette optimization.',
  },
  'PCA': {
    icon: Minimize2,
    color: '#EC4899',
    category: 'Machine Learning',
    description: 'Principal Component Analysis reducing dimensionality while maximizing explained variance via eigenvalue decomposition.',
  },
  'Time Series': {
    icon: LineChart,
    color: '#10B981',
    category: 'Machine Learning',
    description: 'Temporal forecasting using lag features, rolling windows, seasonal decomposition, and chronological cross-validation.',
  },
  'Scikit-learn': {
    icon: SiScikitlearn,
    color: '#F7931E',
    category: 'Machine Learning',
    description: 'Premier Python ML toolkit: pipelines, transformers, cross-validation, grid search, and comprehensive metrics.',
  },

  // --- 5. Cloud and MLOps ---
  'AWS (EC2, S3, SageMaker, Bedrock)': {
    icon: DiAws,
    color: '#FF9900',
    category: 'Cloud and MLOps',
    description: 'Amazon Web Services: EC2 GPU instances, S3 data lakes, SageMaker training/endpoints, and Bedrock foundation models.',
  },
  'Azure (Azure ML, AKS, ACR)': {
    icon: AzureIcon,
    color: '#0089D6',
    category: 'Cloud and MLOps',
    description: 'Microsoft Azure: Azure Machine Learning workspace, Container Registry, and Azure Kubernetes Service (AKS) clusters.',
  },
  'GCP': {
    icon: SiGooglecloud,
    color: '#4285F4',
    category: 'Cloud and MLOps',
    description: 'Google Cloud Platform: Vertex AI pipelines, Cloud Storage, Compute Engine, and BigQuery analytics.',
  },
  'Docker': {
    icon: SiDocker,
    color: '#2496ED',
    category: 'Cloud and MLOps',
    description: 'Multi-stage containerization creating reproducible, lightweight production microservice images for AI applications.',
  },
  'Kubernetes': {
    icon: SiKubernetes,
    color: '#326CE5',
    category: 'Cloud and MLOps',
    description: 'Production container orchestration: horizontal pod autoscaling, rolling updates, health probes, and cluster ingress.',
  },
  'CI/CD': {
    icon: SiGithubactions,
    color: '#2088FF',
    category: 'Cloud and MLOps',
    description: 'Automated continuous integration and deployment pipelines with linting, unit testing, Docker builds, and deployment gates.',
  },
  'MLflow': {
    icon: SiMlflow,
    color: '#0194E2',
    category: 'Cloud and MLOps',
    description: 'Open-source MLOps platform managing experiment tracking, artifact logging, model versioning, and staging registries.',
  },

  // --- 6. Databases ---
  'MySQL': {
    icon: SiMysql,
    color: '#4479A1',
    category: 'Databases',
    description: 'Relational ACID database management system with indexed queries, transactions, foreign keys, and SQLAlchemy ORM.',
  },
  'MongoDB': {
    icon: SiMongodb,
    color: '#47A248',
    category: 'Databases',
    description: 'NoSQL document store for semi-structured data, chat logs, unstructured payloads, and dynamic JSON document models.',
  },
  'SQL': {
    icon: DiDatabase,
    color: '#336791',
    category: 'Databases',
    description: 'Structured Query Language: analytical window functions, complex joins, CTEs, aggregation queries, and schema design.',
  },

  // --- 7. Backend ---
  'FastAPI': {
    icon: SiFastapi,
    color: '#009688',
    category: 'Backend',
    description: 'Modern asynchronous Python framework featuring Pydantic validation, automatic OpenAPI Swagger docs, and fast throughput.',
  },
  'Flask': {
    icon: SiFlask,
    color: '#64748B',
    category: 'Backend',
    description: 'Lightweight WSGI Python web microframework with modular blueprints, extensible request lifecycle, and middleware.',
  },
  'REST APIs': {
    icon: Webhook,
    color: '#0284C7',
    category: 'Backend',
    description: 'Representational State Transfer API architecture with standard HTTP verbs, status codes, CORS, and JSON payloads.',
  },
  'Postman': {
    icon: SiPostman,
    color: '#FF6C37',
    category: 'Backend',
    description: 'API development and testing suite: automated endpoint test collections, mocking, environment variables, and monitoring.',
  },
  'Uvicorn': {
    icon: Server,
    color: '#499848',
    category: 'Backend',
    description: 'Lightning-fast ASGI web server implementation for Python based on uvloop and httptools.',
  },
  'Pydantic': {
    icon: SiPydantic,
    color: '#E92063',
    category: 'Backend',
    description: 'Data validation and settings management using Python type hints with fast compiled Rust core in Pydantic v2.',
  },

  // --- 8. Programming ---
  'Python': {
    icon: SiPython,
    color: '#3776AB',
    category: 'Programming',
    description: 'Primary programming language for Data Science, Machine Learning, Deep Learning, Generative AI, and backend APIs.',
  },
  'Pandas': {
    icon: SiPandas,
    color: '#E70488',
    category: 'Programming',
    description: 'High-performance DataFrame library for data wrangling, cleaning, pivot tables, grouping, and feature engineering.',
  },
  'NumPy': {
    icon: SiNumpy,
    color: '#4DABCF',
    category: 'Programming',
    description: 'Fundamental package for scientific computing with multi-dimensional N-d arrays, vectorization, and linear algebra.',
  },
  'Matplotlib': {
    icon: BarChart3,
    color: '#11557C',
    category: 'Programming',
    description: 'Comprehensive data visualization library for publication-quality static, animated, and interactive figures.',
  },
  'Seaborn': {
    icon: AreaChart,
    color: '#4C72B0',
    category: 'Programming',
    description: 'Statistical data visualization built on Matplotlib providing beautiful heatmaps, pairplots, and distribution curves.',
  },
}

/**
 * Helper to retrieve skill metadata safely with fallback
 */
export function getSkillMeta(skillName) {
  if (SKILLS_CONFIG[skillName]) {
    return SKILLS_CONFIG[skillName]
  }

  // Handle case-insensitive or partial match
  const matchKey = Object.keys(SKILLS_CONFIG).find(
    (k) => k.toLowerCase() === skillName.toLowerCase()
  )
  if (matchKey) {
    return SKILLS_CONFIG[matchKey]
  }

  // Graceful fallback: clean Lucide icon with accent color
  return {
    icon: Sparkles,
    color: '#6366F1',
    category: 'Technical Skill',
    description: `${skillName} - Applied in production AI/ML systems.`,
  }
}
