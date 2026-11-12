import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

function getCategoryIcon(id) {
  switch (id) {
    case 'agentic-ai':
      return (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    case 'generative-ai':
      return (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    case 'deep-learning':
      return (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    case 'machine-learning':
      return (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      )
    case 'cloud-mlops':
      return (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )
    case 'databases':
      return (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      )
    case 'backend':
      return (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      )
    case 'programming':
      return (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    default:
      return (
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
  }
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { skills } = portfolioData

  const displayedCategories =
    activeCategory === 'all'
      ? skills
      : skills.filter((c) => c.id === activeCategory)

  return (
    <section id="skills" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-theme-primary relative border-t border-theme">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
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
            Technical Expertise
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight"
          >
            Skills & Specialized Domains
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-theme-secondary text-base sm:text-lg"
          >
            Categorized toolkit spanning Agentic workflows, Generative AI, Deep Learning, MLOps, and scalable backend services.
          </motion.p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                activeCategory === 'all'
                  ? 'text-white shadow-md'
                  : 'bg-theme-card border border-theme text-theme-secondary hover:text-theme-primary hover:border-theme-hover'
              }`}
              style={{
                backgroundImage: activeCategory === 'all' ? 'var(--accent-gradient)' : 'none',
                boxShadow: activeCategory === 'all' ? '0 4px 12px 0 var(--accent-glow)' : 'none',
              }}
            >
              All Skills ({skills.reduce((acc, cat) => acc + cat.skills.length, 0)})
            </button>
            {skills.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'bg-theme-card border border-theme text-theme-secondary hover:text-theme-primary hover:border-theme-hover'
                  }`}
                  style={{
                    backgroundImage: isActive ? 'var(--accent-gradient)' : 'none',
                    boxShadow: isActive ? '0 4px 12px 0 var(--accent-glow)' : 'none',
                  }}
                >
                  <span>{cat.category}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {displayedCategories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-theme bg-theme-card p-6 flex flex-col justify-between hover:border-accent hover:bg-theme-card-hover transition-all duration-300 shadow-md group"
              >
                <div className="space-y-4">
                  {/* Category Header with Icon */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl border border-theme flex items-center justify-center shrink-0 group-hover:scale-105 transition"
                      style={{
                        backgroundColor: 'var(--accent-light)',
                      }}
                    >
                      {getCategoryIcon(cat.id)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-theme-primary group-hover:text-accent transition">
                        {cat.category}
                      </h3>
                      <span className="text-[11px] font-mono text-theme-muted">
                        {cat.skills.length} competencies
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-theme-secondary leading-relaxed min-h-[36px]">
                    {cat.description}
                  </p>

                  {/* Skills Tag Pills */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {cat.skills.map((skillName) => (
                      <span
                        key={skillName}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-theme-nav-inner border border-theme text-theme-primary hover:border-accent transition"
                      >
                        {skillName}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
