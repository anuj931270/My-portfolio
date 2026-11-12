import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ProjectArchitecture from '../components/ProjectArchitecture'
import { portfolioData } from '../data/portfolioData'

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

export default function ProjectDetail({ projects = [] }) {
  const { id } = useParams()

  // Scroll to top upon navigating to a project detail
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  const allProjects =
    projects && projects.length > 0 ? projects : portfolioData.featuredProjects

  const currentIndex = allProjects.findIndex(
    (p) => String(p.id) === String(id)
  )

  const project = currentIndex !== -1 ? allProjects[currentIndex] : allProjects[0]

  if (!project) {
    return (
      <div className="min-h-screen bg-theme-primary text-theme-primary flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="text-theme-muted mb-6">The requested project could not be found.</p>
        <Link
          to="/"
          className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition"
          style={{
            backgroundImage: 'var(--accent-gradient)',
            boxShadow: '0 4px 14px 0 var(--accent-glow)',
          }}
        >
          &larr; Return to Portfolio
        </Link>
      </div>
    )
  }

  // Calculate Previous and Next project indices
  const prevProject =
    allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length]
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length]

  const solPoints = project.solutionPoints || parsePoints(project.solution)
  const impPoints = project.impactPoints || parsePoints(project.impact)

  const showGithub = hasValidLink(project.github_link)
  const showLiveDemo = hasValidLink(project.live_link)

  return (
    <div className="min-h-screen bg-theme-primary text-theme-primary flex flex-col selection:bg-accent selection:text-white transition-colors duration-200">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-theme-nav backdrop-blur-md border-b border-theme py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-theme-secondary hover:text-theme-primary transition group"
          >
            <span className="p-1.5 rounded-lg bg-theme-card border border-theme group-hover:border-accent transition">
              &larr;
            </span>
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-theme-muted hidden sm:inline">
              Project {currentIndex + 1} of {allProjects.length}
            </span>
            <span
              className="px-3 py-1 rounded-full text-xs font-mono font-semibold border"
              style={{
                backgroundColor: 'var(--accent-light)',
                borderColor: 'var(--accent-border)',
                color: 'var(--accent-color)',
              }}
            >
              {project.category || 'AI Project'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
        {/* Title & Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <div
            className="flex flex-wrap items-center gap-2 text-xs font-mono font-semibold"
            style={{ color: 'var(--accent-color)' }}
          >
            <span>Engineering Deep-Dive</span>
            <span>&bull;</span>
            <span>{project.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-theme-primary tracking-tight leading-tight">
            {project.title}
          </h1>

          {project.description && (
            <p className="text-base sm:text-lg text-theme-secondary leading-relaxed max-w-3xl">
              {project.description}
            </p>
          )}

          {/* Action Links (GitHub & Live Demo - hidden if no valid link) */}
          {(showGithub || showLiveDemo) && (
            <div className="flex flex-wrap gap-3 pt-2">
              {showGithub && (
                <a
                  href={project.github_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-theme-card hover:bg-theme-card-hover text-theme-primary border border-theme transition shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>View GitHub Repository</span>
                  <span>&rarr;</span>
                </a>
              )}

              {showLiveDemo && (
                <a
                  href={project.live_link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition shadow-lg"
                  style={{
                    backgroundImage: 'var(--accent-gradient)',
                    boxShadow: '0 4px 14px 0 var(--accent-glow)',
                  }}
                >
                  <span>Open Live Demo</span>
                  <span>&nearr;</span>
                </a>
              )}
            </div>
          )}
        </motion.div>

        {/* 1. Architecture Diagram Section */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-theme bg-theme-card p-6 sm:p-8 backdrop-blur shadow-2xl space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-theme pb-4">
            <div>
              <h2 className="text-xl font-bold text-theme-primary flex items-center gap-2">
                <span>System Architecture Flow Diagram</span>
              </h2>
              <p className="text-xs text-theme-secondary mt-0.5">
                End-to-end data pipelines, microservices, and decision nodes.
              </p>
            </div>
            <span
              className="text-[11px] font-mono px-2.5 py-1 rounded border self-start sm:self-auto font-medium"
              style={{
                backgroundColor: 'var(--accent-light)',
                borderColor: 'var(--accent-border)',
                color: 'var(--accent-color)',
              }}
            >
              Interactive SVG Pipeline
            </span>
          </div>

          {/* Render SVG Architecture Diagram inside a high-contrast container */}
          <div className="pt-2 rounded-xl bg-slate-950 p-4 border border-slate-800 shadow-inner overflow-hidden">
            <ProjectArchitecture projectId={project.id} />
          </div>
        </motion.section>

        {/* 2. Problem Statement */}
        {project.problem && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-rose-500/25 bg-rose-500/10 p-6 sm:p-8 space-y-3 shadow-lg"
          >
            <div className="flex items-center gap-2 text-rose-500 font-mono text-xs uppercase tracking-wider font-semibold">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>The Problem &amp; Business Bottleneck</span>
            </div>
            <p className="text-base text-theme-primary leading-relaxed font-normal">
              {project.problem}
            </p>
          </motion.section>
        )}

        {/* 3. Solution Points */}
        {solPoints.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl border p-6 sm:p-8 space-y-4 shadow-lg"
            style={{
              backgroundColor: 'var(--accent-light)',
              borderColor: 'var(--accent-border)',
            }}
          >
            <div
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold"
              style={{ color: 'var(--accent-color)' }}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span>The Solution &amp; Technical Execution</span>
            </div>
            <ul className="space-y-3">
              {solPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-theme-primary font-normal">
                  <span
                    className="w-2 h-2 rounded-full mt-2 shrink-0"
                    style={{ backgroundColor: 'var(--accent-color)' }}
                  />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* 4. Business Impact */}
        {impPoints.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-6 sm:p-8 space-y-4 shadow-lg"
          >
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs uppercase tracking-wider font-semibold">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>Measurable Business Impact</span>
            </div>
            <ul className="space-y-3">
              {impPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-theme-primary font-normal">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* 5. Tech Stack Tags */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="rounded-2xl border border-theme bg-theme-card p-6 sm:p-8 space-y-4 shadow-md"
        >
          <h3 className="text-sm font-mono text-theme-muted uppercase tracking-wider">
            Technologies &amp; Libraries Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {(project.tech_stack || '')
              .split(',')
              .map((tech) => (
                <span
                  key={tech.trim()}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-theme-nav-inner border border-theme text-theme-secondary hover:border-accent transition"
                >
                  {tech.trim()}
                </span>
              ))}
          </div>
        </motion.section>

        {/* Next & Previous Project Navigation */}
        <nav className="border-t border-theme pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to={`/project/${prevProject.id}`}
            className="w-full sm:w-auto p-4 rounded-xl border border-theme bg-theme-card hover:bg-theme-card-hover hover:border-accent text-left transition space-y-1 group flex-1 shadow-md"
          >
            <span
              className="text-xs font-mono transition"
              style={{ color: 'var(--accent-color)' }}
            >
              &larr; Previous Project
            </span>
            <p className="text-sm font-semibold text-theme-primary group-hover:text-accent transition truncate">
              {prevProject.title}
            </p>
          </Link>

          <Link
            to={`/project/${nextProject.id}`}
            className="w-full sm:w-auto p-4 rounded-xl border border-theme bg-theme-card hover:bg-theme-card-hover hover:border-accent text-right transition space-y-1 group flex-1 shadow-md"
          >
            <span
              className="text-xs font-mono transition"
              style={{ color: 'var(--accent-color)' }}
            >
              Next Project &rarr;
            </span>
            <p className="text-sm font-semibold text-theme-primary group-hover:text-accent transition truncate">
              {nextProject.title}
            </p>
          </Link>
        </nav>
      </main>

      {/* Footer */}
      <footer className="border-t border-theme py-8 px-4 text-center text-xs text-theme-muted">
        <p>&copy; {new Date().getFullYear()} Anuj Pathak. All rights reserved.</p>
      </footer>
    </div>
  )
}
