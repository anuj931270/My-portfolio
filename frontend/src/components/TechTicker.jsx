import React from 'react'

const TECH_ITEMS = [
  {
    name: 'Python',
    category: 'Core',
    color: '#3776ab',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.752h5.814v.826H3.9S0 5.787 0 11.932c0 6.14 3.404 5.925 3.404 5.925h2.032v-2.854s-.11-3.404 3.35-3.404h5.762s3.24.053 3.24-3.136V2.656S18.23 0 11.914 0zm-3.23 1.696a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z" />
        <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.006-2.752H11.98v-.826h8.12s3.9.447 3.9-5.698c0-6.14-3.404-5.925-3.404-5.925h-2.032v2.854s.11 3.404-3.35 3.404H9.454s-3.24-.053-3.24 3.136v5.787S5.77 24 12.086 24zm3.23-1.696a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z" />
      </svg>
    ),
  },
  {
    name: 'LangChain',
    category: 'GenAI & RAG',
    color: '#1c3c3c',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M8.5 8.5l7 7M15.5 8.5a3 3 0 10-7 7" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    name: 'LangGraph',
    category: 'Agentic AI',
    color: '#8b5cf6',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="5" cy="12" r="3" />
        <circle cx="19" cy="6" r="3" />
        <circle cx="19" cy="18" r="3" />
        <path d="M8 12h8M8 12l8-5M8 12l8 5" />
      </svg>
    ),
  },
  {
    name: 'OpenAI API',
    category: 'LLMs',
    color: '#10a37f',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646z" />
      </svg>
    ),
  },
  {
    name: 'TensorFlow',
    category: 'Deep Learning',
    color: '#ff6f00',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 0L1.758 5.918l3.414 1.972L12 3.943l6.828 3.947 3.414-1.972L12.001 0zm-8.53 9.86v7.886l6.829 3.946v-3.944l-3.415-1.973V11.83l3.415 1.973v-3.943L3.471 9.86zm17.06 0l-6.828 3.943v3.943l3.414-1.973v3.944l-3.414 1.973v3.946l6.828-3.946V9.86z" />
      </svg>
    ),
  },
  {
    name: 'PyTorch',
    category: 'Deep Learning',
    color: '#ee4c2c',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.723 0a11.966 11.966 0 0 0-4.088.72l1.637 1.637a9.704 9.704 0 1 1-6.862 9.278c0-1.874.529-3.626 1.45-5.118l-1.66-1.66A11.94 11.94 0 0 0 .75 11.635C.75 18.261 6.11 23.62 12.736 23.62s11.986-5.36 11.986-11.985C24.722 5.008 19.35.001 12.723 0zm-.018 4.792a1.71 1.71 0 0 0-1.71 1.71v3.08a1.71 1.71 0 1 0 3.42 0V6.502a1.71 1.71 0 0 0-1.71-1.71z" />
      </svg>
    ),
  },
  {
    name: 'FastAPI',
    category: 'Backend APIs',
    color: '#009688',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm-.714 4.887h1.428v6.226h4.15l-6.292 7.999v-6.226H6.422l4.864-7.999z" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    category: 'MLOps',
    color: '#2496ed',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.185.185 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185zm0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186zm-5.91 2.714h2.12a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.12a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185zm2.955-2.714h2.118a.186.186 0 00.186-.186V6.29a.186.186 0 00-.186-.185H8.074a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186z" />
        <path d="M23.77 12.316a4.266 4.266 0 00-1.782-.94 6.786 6.786 0 00-.317-1.39l-.17-.492-1.077.567.165.485c.348 1.026.236 1.776.216 1.887a.382.382 0 01-.19.266c-.397.23-1.02.26-1.892.093l-.403-.077-.168.375c-.44.98-1.22 1.573-2.317 1.764-1.272.22-3.844.24-5.918.24-2.075 0-4.646-.02-5.918-.24-1.127-.196-1.916-.81-2.335-1.823l-.16-.388-.396.082c-.93.19-1.574.15-1.97-.103a.383.383 0 01-.176-.27c-.015-.1-.082-.82.257-1.84l.163-.487-1.076-.566-.17.492a6.76 6.76 0 00-.316 1.39 4.266 4.266 0 00-1.783.94A2.08 2.08 0 000 13.914c0 3.03 2.508 5.486 5.6 5.486h12.8c3.092 0 5.6-2.456 5.6-5.486a2.08 2.08 0 00-.23-1.598z" />
      </svg>
    ),
  },
  {
    name: 'AWS',
    category: 'Cloud Services',
    color: '#ff9900',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.763 10.035c0 .356.037.669.112.937.075.269.186.52.333.754.148.234.331.428.55.58.219.153.475.228.769.228.324 0 .59-.084.796-.252.206-.168.378-.387.516-.656.137-.27.234-.572.289-.906.056-.334.083-.674.083-1.02V7.12H12v2.96c0 .61-.06 1.18-.182 1.708a4.773 4.773 0 0 1-.54 1.455c-.24.417-.549.76-.927 1.029-.378.27-.834.405-1.368.405-.444 0-.84-.083-1.186-.25-.347-.166-.638-.396-.874-.689-.236-.293-.417-.636-.543-1.029a5.187 5.187 0 0 1-.19-1.378V7.12h1.573v2.915z" />
        <path d="M12.001 18.067c-4.887 0-9.288-1.737-11.89-4.402a.453.453 0 0 1 .051-.663.454.454 0 0 1 .665.048c2.404 2.463 6.55 4.077 11.174 4.077 4.624 0 8.77-1.614 11.174-4.077a.454.454 0 0 1 .665-.048.453.453 0 0 1 .051.663c-2.602 2.665-7.003 4.402-11.89 4.402z" />
      </svg>
    ),
  },
  {
    name: 'Pinecone',
    category: 'Vector DB',
    color: '#000000',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    name: 'Scikit-Learn',
    category: 'Machine Learning',
    color: '#f7931e',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
      </svg>
    ),
  },
  {
    name: 'MySQL',
    category: 'Databases',
    color: '#4479a1',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    name: 'Hugging Face',
    category: 'Transformers',
    color: '#ffd21e',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
      </svg>
    ),
  },
  {
    name: 'Azure ML',
    category: 'Cloud Services',
    color: '#0078d4',
    svg: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.485 20.432l6.236-11.458 5.764 10.74h-6.721l-3.327 2.164-1.952-1.446zm7.265-13.79l3.528-6.642 7.722 14.594h-5.275l-5.975-7.952z" />
      </svg>
    ),
  },
]

export default function TechTicker() {
  // Duplicate array for continuous seamless infinite loop
  const duplicatedItems = [...TECH_ITEMS, ...TECH_ITEMS]

  return (
    <div
      className="w-full py-5 border-y border-theme relative overflow-hidden select-none"
      style={{
        backgroundColor: 'var(--bg-secondary)',
      }}
    >
      {/* Edge Gradient Fades for Smooth Infinite Illusion */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, var(--bg-secondary), transparent)',
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, var(--bg-secondary), transparent)',
        }}
      />

      {/* Marquee Track */}
      <div className="flex w-max animate-ticker hover:[animation-play-state:paused] gap-4 sm:gap-6">
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-theme bg-theme-card hover:border-accent transition duration-200 shrink-0 shadow-sm"
          >
            <span
              className="shrink-0 transition-transform duration-200"
              style={{ color: item.color }}
            >
              {item.svg}
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-theme-primary tracking-tight">
                {item.name}
              </span>
              <span className="text-[10px] font-mono text-theme-muted uppercase tracking-wider">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

