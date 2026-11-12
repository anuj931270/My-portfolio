import React from 'react'

export default function ProjectArchitecture({ projectId }) {
  const id = Number(projectId)

  switch (id) {
    case 1:
      // Enterprise RAG Architecture Diagram
      return (
        <div className="w-full overflow-x-auto py-2">
          <svg
            viewBox="0 0 940 320"
            className="w-full min-w-[700px] h-auto font-sans select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="grad-indigo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#4338ca" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="grad-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0.1" />
              </linearGradient>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#818cf8" />
              </marker>
            </defs>

            {/* Connection Arrows - Row 1 */}
            <path d="M 160 80 L 220 80" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowhead)" />
            <path d="M 370 80 L 430 80" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <path d="M 580 80 L 640 80" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <path d="M 790 80 L 840 80 L 840 210 L 790 210" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Connection Arrows - Row 2 */}
            <path d="M 640 210 L 580 210" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <path d="M 430 210 L 370 210" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <path d="M 220 210 L 160 210" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowhead)" />

            {/* Node 1: User Query */}
            <g transform="translate(20, 40)">
              <rect width="140" height="80" rx="12" fill="url(#grad-indigo)" stroke="#6366f1" strokeWidth="1.5" />
              <text x="70" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">User Query</text>
              <text x="70" y="58" textAnchor="middle" fill="#94a3b8" fontSize="11">Chat UI Client</text>
            </g>

            {/* Node 2: FastAPI Gateway */}
            <g transform="translate(220, 40)">
              <rect width="150" height="80" rx="12" fill="url(#grad-indigo)" stroke="#6366f1" strokeWidth="1.5" />
              <text x="75" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">FastAPI Gateway</text>
              <text x="75" y="58" textAnchor="middle" fill="#818cf8" fontSize="11">CORS &amp; Auth &amp; Docker</text>
            </g>

            {/* Node 3: OpenAI Embeddings */}
            <g transform="translate(430, 40)">
              <rect width="150" height="80" rx="12" fill="url(#grad-purple)" stroke="#a855f7" strokeWidth="1.5" />
              <text x="75" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Embedding Model</text>
              <text x="75" y="58" textAnchor="middle" fill="#c084fc" fontSize="11">text-embedding-3</text>
            </g>

            {/* Node 4: Pinecone Vector DB */}
            <g transform="translate(640, 40)">
              <rect width="150" height="80" rx="12" fill="url(#grad-purple)" stroke="#a855f7" strokeWidth="1.5" />
              <text x="75" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Pinecone Vector DB</text>
              <text x="75" y="58" textAnchor="middle" fill="#c084fc" fontSize="11">Top-K Cosine Similarity</text>
            </g>

            {/* Node 5: Context Reranker & Guardrails */}
            <g transform="translate(640, 170)">
              <rect width="150" height="80" rx="12" fill="url(#grad-cyan)" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="75" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Threshold Filter</text>
              <text x="75" y="58" textAnchor="middle" fill="#38bdf8" fontSize="11">Relevance Gate &amp; Rerank</text>
            </g>

            {/* Node 6: LLM + LangSmith */}
            <g transform="translate(430, 170)">
              <rect width="150" height="80" rx="12" fill="url(#grad-purple)" stroke="#a855f7" strokeWidth="1.5" />
              <text x="75" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">OpenAI LLM</text>
              <text x="75" y="58" textAnchor="middle" fill="#c084fc" fontSize="11">LangSmith Evaluation</text>
            </g>

            {/* Node 7: MySQL Memory & Fallback */}
            <g transform="translate(220, 170)">
              <rect width="150" height="80" rx="12" fill="url(#grad-cyan)" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="75" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">MySQL Memory</text>
              <text x="75" y="58" textAnchor="middle" fill="#38bdf8" fontSize="11">History &amp; Safe Fallback</text>
            </g>

            {/* Node 8: Verified Grounded Output */}
            <g transform="translate(20, 170)">
              <rect width="140" height="80" rx="12" fill="url(#grad-emerald)" stroke="#10b981" strokeWidth="1.5" />
              <text x="70" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Grounded Answer</text>
              <text x="70" y="58" textAnchor="middle" fill="#34d399" fontSize="11">Zero Hallucinations</text>
            </g>
          </svg>
        </div>
      )

    case 2:
      // Multi-Agent HR LangGraph Architecture
      return (
        <div className="w-full overflow-x-auto py-2">
          <svg
            viewBox="0 0 940 320"
            className="w-full min-w-[700px] h-auto font-sans select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="g-langgraph" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#312e81" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="g-agent" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#581c87" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="g-mcp" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#164e63" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="g-approval" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#831843" stopOpacity="0.1" />
              </linearGradient>
              <marker id="arrow-agent" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#a855f7" />
              </marker>
            </defs>

            {/* Connecting paths */}
            <path d="M 170 80 L 230 80" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-agent)" />
            <path d="M 400 80 L 460 80" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-agent)" />
            <path d="M 630 80 L 690 80" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-agent)" />
            <path d="M 770 120 L 770 200 L 710 200" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-agent)" />
            <path d="M 540 200 L 480 200" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-agent)" />
            <path d="M 310 200 L 250 200" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow-agent)" />

            {/* Step 1: Employee Prompt */}
            <g transform="translate(20, 40)">
              <rect width="150" height="80" rx="12" fill="url(#g-langgraph)" stroke="#6366f1" strokeWidth="1.5" />
              <text x="75" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Employee Request</text>
              <text x="75" y="58" textAnchor="middle" fill="#94a3b8" fontSize="11">Leave, Payroll &amp; Benefits</text>
            </g>

            {/* Step 2: LangGraph State Machine */}
            <g transform="translate(230, 40)">
              <rect width="170" height="80" rx="12" fill="url(#g-langgraph)" stroke="#6366f1" strokeWidth="1.5" />
              <text x="85" y="36" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">LangGraph Graph</text>
              <text x="85" y="54" textAnchor="middle" fill="#818cf8" fontSize="11">Checkpointer &amp; Memory</text>
              <text x="85" y="68" textAnchor="middle" fill="#64748b" fontSize="10">Stateful Interrupts</text>
            </g>

            {/* Step 3: Multi-Agent Supervisor */}
            <g transform="translate(460, 40)">
              <rect width="170" height="80" rx="12" fill="url(#g-agent)" stroke="#a855f7" strokeWidth="1.5" />
              <text x="85" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Supervisor Agent</text>
              <text x="85" y="58" textAnchor="middle" fill="#c084fc" fontSize="11">Route to Specialized Agents</text>
            </g>

            {/* Step 4: MCP Server */}
            <g transform="translate(690, 40)">
              <rect width="160" height="80" rx="12" fill="url(#g-mcp)" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="80" y="36" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">MCP Server</text>
              <text x="80" y="54" textAnchor="middle" fill="#38bdf8" fontSize="11">Tool Calling Interface</text>
              <text x="80" y="68" textAnchor="middle" fill="#64748b" fontSize="10">Role-Based Access (RBAC)</text>
            </g>

            {/* Step 5: Human-in-the-Loop */}
            <g transform="translate(540, 160)">
              <rect width="170" height="80" rx="12" fill="url(#g-approval)" stroke="#ec4899" strokeWidth="1.5" />
              <text x="85" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Human-in-the-Loop</text>
              <text x="85" y="58" textAnchor="middle" fill="#f472b6" fontSize="11">Manager Approval Gate</text>
            </g>

            {/* Step 6: MySQL Audit & Guardrails */}
            <g transform="translate(310, 160)">
              <rect width="170" height="80" rx="12" fill="url(#g-mcp)" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="85" y="36" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">MySQL Audit Log</text>
              <text x="85" y="54" textAnchor="middle" fill="#38bdf8" fontSize="11">Guardrails Isolation</text>
              <text x="85" y="68" textAnchor="middle" fill="#64748b" fontSize="10">Strict Data Boundary</text>
            </g>

            {/* Step 7: Completed Resolution */}
            <g transform="translate(80, 160)">
              <rect width="170" height="80" rx="12" fill="url(#g-langgraph)" stroke="#10b981" strokeWidth="1.5" />
              <text x="85" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Verified Action / Answer</text>
              <text x="85" y="58" textAnchor="middle" fill="#34d399" fontSize="11">FastAPI Backend Service</text>
            </g>
          </svg>
        </div>
      )

    case 3:
      // Customer Feedback Sentiment Analysis (NLP & Deep Learning)
      return (
        <div className="w-full overflow-x-auto py-2">
          <svg
            viewBox="0 0 940 320"
            className="w-full min-w-[700px] h-auto font-sans select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="g-nlp1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#831843" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="g-nlp2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#581c87" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="g-nlp3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#164e63" stopOpacity="0.1" />
              </linearGradient>
              <marker id="arrow-nlp" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#f472b6" />
              </marker>
            </defs>

            {/* Connecting paths */}
            <path d="M 160 80 L 220 80" stroke="#f472b6" strokeWidth="2" markerEnd="url(#arrow-nlp)" />
            <path d="M 380 80 L 440 80" stroke="#f472b6" strokeWidth="2" markerEnd="url(#arrow-nlp)" />
            <path d="M 600 80 L 660 80" stroke="#f472b6" strokeWidth="2" markerEnd="url(#arrow-nlp)" />
            <path d="M 750 120 L 750 200 L 690 200" stroke="#f472b6" strokeWidth="2" markerEnd="url(#arrow-nlp)" />
            <path d="M 520 200 L 460 200" stroke="#f472b6" strokeWidth="2" markerEnd="url(#arrow-nlp)" />
            <path d="M 290 200 L 230 200" stroke="#f472b6" strokeWidth="2" markerEnd="url(#arrow-nlp)" />

            {/* Step 1: Raw Reviews */}
            <g transform="translate(20, 40)">
              <rect width="140" height="80" rx="12" fill="url(#g-nlp1)" stroke="#ec4899" strokeWidth="1.5" />
              <text x="70" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Customer Reviews</text>
              <text x="70" y="58" textAnchor="middle" fill="#f472b6" fontSize="11">Thousands of Feedbacks</text>
            </g>

            {/* Step 2: Text Preprocessing */}
            <g transform="translate(220, 40)">
              <rect width="160" height="80" rx="12" fill="url(#g-nlp1)" stroke="#ec4899" strokeWidth="1.5" />
              <text x="80" y="36" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Text Preprocessing</text>
              <text x="80" y="54" textAnchor="middle" fill="#f472b6" fontSize="11">Cleaning &amp; Lemmatizing</text>
              <text x="80" y="68" textAnchor="middle" fill="#64748b" fontSize="10">TF-IDF Baseline</text>
            </g>

            {/* Step 3: Word2Vec Embeddings */}
            <g transform="translate(440, 40)">
              <rect width="160" height="80" rx="12" fill="url(#g-nlp2)" stroke="#a855f7" strokeWidth="1.5" />
              <text x="80" y="36" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Word2Vec Vectors</text>
              <text x="80" y="54" textAnchor="middle" fill="#c084fc" fontSize="11">Semantic Embeddings</text>
              <text x="80" y="68" textAnchor="middle" fill="#64748b" fontSize="10">Dense Vocabulary Matrix</text>
            </g>

            {/* Step 4: LSTM / RNN Layers */}
            <g transform="translate(660, 40)">
              <rect width="170" height="80" rx="12" fill="url(#g-nlp2)" stroke="#a855f7" strokeWidth="1.5" />
              <text x="85" y="36" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">LSTM &amp; RNN Network</text>
              <text x="85" y="54" textAnchor="middle" fill="#c084fc" fontSize="11">TensorFlow / Keras</text>
              <text x="85" y="68" textAnchor="middle" fill="#64748b" fontSize="10">Sequential Attention</text>
            </g>

            {/* Step 5: Multi-Class Softmax */}
            <g transform="translate(520, 160)">
              <rect width="170" height="80" rx="12" fill="url(#g-nlp2)" stroke="#a855f7" strokeWidth="1.5" />
              <text x="85" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Softmax Classifier</text>
              <text x="85" y="58" textAnchor="middle" fill="#c084fc" fontSize="11">Positive / Neutral / Negative</text>
            </g>

            {/* Step 6: FastAPI on AKS */}
            <g transform="translate(290, 160)">
              <rect width="170" height="80" rx="12" fill="url(#g-nlp3)" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="85" y="36" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">FastAPI on AKS</text>
              <text x="85" y="54" textAnchor="middle" fill="#38bdf8" fontSize="11">Docker &amp; Kubernetes</text>
              <text x="85" y="68" textAnchor="middle" fill="#64748b" fontSize="10">Azure ML Service</text>
            </g>

            {/* Step 7: Dashboard Insights */}
            <g transform="translate(60, 160)">
              <rect width="170" height="80" rx="12" fill="url(#g-nlp1)" stroke="#10b981" strokeWidth="1.5" />
              <text x="85" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Trend Analytics</text>
              <text x="85" y="58" textAnchor="middle" fill="#34d399" fontSize="11">Word Clouds &amp; Alerts</text>
            </g>
          </svg>
        </div>
      )

    case 4:
    default:
      // Medicine Demand Forecasting (ML & Time Series)
      return (
        <div className="w-full overflow-x-auto py-2">
          <svg
            viewBox="0 0 940 320"
            className="w-full min-w-[700px] h-auto font-sans select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="g-ml1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#064e3b" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="g-ml2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#164e63" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="g-ml3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#312e81" stopOpacity="0.1" />
              </linearGradient>
              <marker id="arrow-ml" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#34d399" />
              </marker>
            </defs>

            {/* Connecting paths */}
            <path d="M 160 80 L 220 80" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-ml)" />
            <path d="M 390 80 L 450 80" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-ml)" />
            <path d="M 610 80 L 670 80" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-ml)" />
            <path d="M 760 120 L 760 200 L 700 200" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-ml)" />
            <path d="M 520 200 L 460 200" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-ml)" />
            <path d="M 280 200 L 220 200" stroke="#34d399" strokeWidth="2" markerEnd="url(#arrow-ml)" />

            {/* Step 1: Historical Sales & Supply DB */}
            <g transform="translate(20, 40)">
              <rect width="140" height="80" rx="12" fill="url(#g-ml1)" stroke="#10b981" strokeWidth="1.5" />
              <text x="70" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Sales &amp; Supply DB</text>
              <text x="70" y="58" textAnchor="middle" fill="#34d399" fontSize="11">SQL / S3 Data Lake</text>
            </g>

            {/* Step 2: Time Series Feature Engineering */}
            <g transform="translate(220, 40)">
              <rect width="170" height="80" rx="12" fill="url(#g-ml1)" stroke="#10b981" strokeWidth="1.5" />
              <text x="85" y="36" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Feature Engineering</text>
              <text x="85" y="54" textAnchor="middle" fill="#34d399" fontSize="11">Lags (7/14/30d) &amp; Rolling</text>
              <text x="85" y="68" textAnchor="middle" fill="#64748b" fontSize="10">Seasonality Indicators</text>
            </g>

            {/* Step 3: Time-based Split */}
            <g transform="translate(450, 40)">
              <rect width="160" height="80" rx="12" fill="url(#g-ml2)" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="80" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Time-based Split</text>
              <text x="80" y="58" textAnchor="middle" fill="#38bdf8" fontSize="11">Zero Lookahead Bias</text>
            </g>

            {/* Step 4: ML Ensemble */}
            <g transform="translate(670, 40)">
              <rect width="180" height="80" rx="12" fill="url(#g-ml3)" stroke="#6366f1" strokeWidth="1.5" />
              <text x="90" y="34" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Ensemble Forecaster</text>
              <text x="90" y="52" textAnchor="middle" fill="#818cf8" fontSize="11">XGBoost &amp; Random Forest</text>
              <text x="90" y="66" textAnchor="middle" fill="#818cf8" fontSize="10">AdaBoost Meta-model</text>
            </g>

            {/* Step 5: Metrics Evaluation */}
            <g transform="translate(520, 160)">
              <rect width="180" height="80" rx="12" fill="url(#g-ml2)" stroke="#06b6d4" strokeWidth="1.5" />
              <text x="90" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Model Validation</text>
              <text x="90" y="58" textAnchor="middle" fill="#38bdf8" fontSize="11">RMSE, MAPE &amp; MAE Tuning</text>
            </g>

            {/* Step 6: AWS Retraining */}
            <g transform="translate(280, 160)">
              <rect width="180" height="80" rx="12" fill="url(#g-ml1)" stroke="#10b981" strokeWidth="1.5" />
              <text x="90" y="36" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">AWS Retraining</text>
              <text x="90" y="54" textAnchor="middle" fill="#34d399" fontSize="11">SageMaker &amp; S3 Automated</text>
              <text x="90" y="68" textAnchor="middle" fill="#64748b" fontSize="10">Scheduled Trigger</text>
            </g>

            {/* Step 7: Filterable Forecast API */}
            <g transform="translate(50, 160)">
              <rect width="170" height="80" rx="12" fill="url(#g-ml3)" stroke="#6366f1" strokeWidth="1.5" />
              <text x="85" y="38" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="bold">Forecast Dashboard</text>
              <text x="85" y="58" textAnchor="middle" fill="#818cf8" fontSize="11">FastAPI by Region &amp; SKU</text>
            </g>
          </svg>
        </div>
      )
  }
}

