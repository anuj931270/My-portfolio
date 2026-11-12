import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const CATEGORIES = ['All', 'GenAI', 'Agentic AI', 'Deep Learning', 'Machine Learning']

function parsePoints(pointsOrString) {
  if (Array.isArray(pointsOrString)) return pointsOrString
  if (!pointsOrString || typeof pointsOrString !== 'string') return []
  return pointsOrString
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2)
}

function hasValidLink(link) {
  return Boolean(link && typeof link === 'string' && link.trim() !== '' && link.trim() !== '#')
}

function getCategoryColor(category = '') {
  const cat = category.toLowerCase()
  if (cat.includes('agentic')) {
    return 'bg-indigo-500/15 text-indigo-400 dark:text-indigo-300 border-indigo-500/30'
  }
  if (cat.includes('genai') || cat.includes('generative')) {
    return 'bg-purple-500/15 text-purple-500 dark:text-purple-300 border-purple-500/30'
  }
  if (cat.includes('nlp') || cat.includes('deep learning')) {
    return 'bg-pink-500/15 text-pink-500 dark:text-pink-300 border-pink-500/30'
  }
  if (cat.includes('time series') || cat.includes('machine learning')) {
    return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30'
  }
  return 'bg-theme-tag text-theme-secondary border-theme'
}

export default function Projects({
  projects = [],
  loading = false,
  isFromBackend = false,
  onRefresh,
  apiBaseUrl,
}) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'All') return true
    const cat = (project.category || '').toLowerCase()
    const title = (project.title || '').toLowerCase()
    const tech = (project.tech_stack || '').toLowerCase()

    if (selectedCategory === 'GenAI') {
      return cat.includes('genai') || cat.includes('generative') || title.includes('rag')
    }
    if (selectedCategory === 'Agentic AI') {
      return cat.includes('agentic') || cat.includes('agent') || tech.includes('langgraph')
    }
    if (selectedCategory === 'Deep Learning') {
      return cat.includes('deep learning') || cat.includes('nlp') || tech.includes('lstm')
    }
    if (selectedCategory === 'Machine Learning') {
      return cat.includes('machine learning') || cat.includes('time series') || tech.includes('xgboost')
    }

    const query = selectedCategory.toLowerCase()
    return cat.includes(query) || title.includes(query) || tech.includes(query)
  })

  return (
    <section id="projects" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-theme-primary relative border-t border-theme">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest border"
              style={{
                backgroundColor: 'var(--accent-light)',
                borderColor: 'var(--accent-border)',
                color: 'var(--accent-color)',
              }}
            >
              Featured Portfolio Projects
            </motion.div>

            {/* Backend Sync Indicator Badge */}
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border flex items-center gap-1.5 ${
                isFromBackend
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                  : 'bg-theme-card text-theme-muted border-theme'
              }`}
              title={`Fetched from ${apiBaseUrl}/api/projects`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isFromBackend ? 'bg-emerald-400' : 'bg-slate-400'
                }`}
              />
              {isFromBackend ? 'MySQL Live' : 'Database Ready'}
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight"
          >
            End-to-End AI & Machine Learning Systems
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-theme-secondary text-base sm:text-lg"
          >
            Click any project card to open its dedicated architecture deep-dive page with system flow diagrams.
          </motion.p>

          {/* Filter Tabs: All, GenAI, Agentic AI, Deep Learning, Machine Learning */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'bg-theme-card border border-theme text-theme-secondary hover:text-theme-primary hover:border-theme-hover'
                  }`}
                  style={{
                    backgroundImage: isActive ? 'var(--accent-gradient)' : 'none',
                    boxShadow: isActive ? '0 4px 14px 0 var(--accent-glow)' : 'none',
                  }}
                >
                  {cat}
                </button>
              )
            })}

            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={loading}
                title="Reload projects from FastAPI backend"
                className="p-2.5 rounded-full bg-theme-card border border-theme text-theme-secondary hover:text-theme-primary hover:border-accent transition disabled:opacity-50 cursor-pointer"
              >
                <svg
                  className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && projects.length === 0 && (
          <div className="text-center py-12 text-theme-muted font-mono text-sm flex items-center justify-center gap-2">
            <span
              className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: 'var(--accent-color)', borderTopColor: 'transparent' }}
            />
            <span>Loading projects from GET /api/projects...</span>
          </div>
        )}

        {/* Projects Grid: 2 columns on lg for detailed problem/solution/impact cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => {
              const solPoints = project.solutionPoints || parsePoints(project.solution)
              const impPoints = project.impactPoints || parsePoints(project.impact)
              const showGithub = hasValidLink(project.github_link)
              const showLiveDemo = hasValidLink(project.live_link)

              return (
                <motion.div
                  key={project.id || project.title || idx}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="rounded-2xl border border-theme bg-theme-card overflow-hidden flex flex-col justify-between hover:border-accent hover:bg-theme-card-hover transition-all duration-300 shadow-xl group"
                >
                  {/* Card Header with Image & Category Overlay */}
                  <Link
                    to={`/project/${project.id}`}
                    className="relative h-44 sm:h-52 w-full overflow-hidden bg-theme-nav-inner block focus:outline-none"
                  >
                    <img
                      src={
                        project.image_url ||
                        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
                      }
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      {project.category && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border backdrop-blur-md shadow-sm ${getCategoryColor(
                            project.category
                          )}`}
                        >
                          {project.category}
                        </span>
                      )}
                    </div>

                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-black/60 text-white border border-white/20 backdrop-blur">
                      Project 0{project.id || idx + 1}
                    </span>

                    {/* Hover Hint */}
                    <div
                      className="absolute bottom-3 right-3 px-3 py-1 rounded-lg text-white text-xs font-semibold backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md"
                      style={{
                        backgroundImage: 'var(--accent-gradient)',
                      }}
                    >
                      View Architecture &rarr;
                    </div>
                  </Link>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    {/* Title (links to detail page) */}
                    <div>
                      <Link
                        to={`/project/${project.id}`}
                        className="hover:underline focus:outline-none"
                      >
                        <h3 className="text-xl sm:text-2xl font-bold text-theme-primary group-hover:text-accent transition leading-snug">
                          {project.title}
                        </h3>
                      </Link>
                      {project.description && (
                        <p className="text-xs text-theme-secondary mt-1.5 leading-relaxed">
                          {project.description}
                        </p>
                      )}
                    </div>

                    {/* Problem Statement Box */}
                    {project.problem && (
                      <div className="rounded-xl border border-rose-500/25 bg-rose-500/10 p-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-500 font-mono uppercase tracking-wider">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <span>Problem Statement</span>
                        </div>
                        <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed font-normal">
                          {project.problem}
                        </p>
                      </div>
                    )}

                    {/* Solution Points Box */}
                    {solPoints.length > 0 && (
                      <div
                        className="rounded-xl border p-4 space-y-2"
                        style={{
                          backgroundColor: 'var(--accent-light)',
                          borderColor: 'var(--accent-border)',
                        }}
                      >
                        <div
                          className="flex items-center gap-1.5 text-xs font-semibold font-mono uppercase tracking-wider"
                          style={{ color: 'var(--accent-color)' }}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          <span>Architected Solution</span>
                        </div>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-theme-secondary font-normal">
                          {solPoints.slice(0, 3).map((point, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span
                                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                style={{ backgroundColor: 'var(--accent-color)' }}
                              />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                          {solPoints.length > 3 && (
                            <li
                              className="text-xs font-mono pt-0.5 font-medium"
                              style={{ color: 'var(--accent-color)' }}
                            >
                              + {solPoints.length - 3} more technical architectural steps...
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Impact Points Box */}
                    {impPoints.length > 0 && (
                      <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4 space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono uppercase tracking-wider">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          <span>Measurable Impact</span>
                        </div>
                        <ul className="space-y-1.5 text-xs sm:text-sm text-theme-secondary font-normal">
                          {impPoints.slice(0, 3).map((point, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Stack Tags */}
                    <div className="pt-2">
                      <p className="text-[11px] font-mono text-theme-muted uppercase tracking-wider mb-2">
                        Tech Stack
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {(project.tech_stack || '')
                          .split(',')
                          .map((tech) => (
                            <span
                              key={tech.trim()}
                              className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-theme-nav-inner border border-theme text-theme-secondary hover:border-accent transition"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Action Buttons: Architecture Detail, GitHub (hidden if no link), Live Demo (hidden if no link) */}
                    <div className="pt-4 border-t border-theme flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
                      <Link
                        to={`/project/${project.id}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-white shadow-md transition"
                        style={{
                          backgroundImage: 'var(--accent-gradient)',
                          boxShadow: '0 4px 14px 0 var(--accent-glow)',
                        }}
                      >
                        <span>Architecture Diagram</span>
                        <span>&rarr;</span>
                      </Link>

                      <div className="flex items-center gap-3">
                        {showGithub && (
                          <a
                            href={project.github_link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-theme-secondary hover:text-accent transition"
                            title="GitHub Repository"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                            <span>Repo</span>
                          </a>
                        )}

                        {showLiveDemo && (
                          <a
                            href={project.live_link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 transition hover:underline"
                            style={{ color: 'var(--accent-color)' }}
                            title="Live Demo"
                          >
                            <span>Demo</span>
                            <span>&nearr;</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Empty state when filtering */}
        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-12 rounded-2xl border border-theme bg-theme-card text-theme-muted">
            <p className="text-base font-semibold text-theme-primary">
              No projects found for category &ldquo;{selectedCategory}&rdquo;
            </p>
            <p className="text-xs text-theme-muted mt-1">
              Select &ldquo;All&rdquo; or another tab to view projects.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
