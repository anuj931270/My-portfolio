import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

function getServiceIcon(icon) {
  switch (icon) {
    case 'cpu':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={1.8} />
          <rect x="9" y="9" width="6" height="6" strokeWidth={1.8} />
          <path strokeLinecap="round" strokeWidth={1.8} d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
        </svg>
      )
    case 'sparkles':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    case 'network':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="3" strokeWidth={1.8} />
          <circle cx="5" cy="19" r="3" strokeWidth={1.8} />
          <circle cx="19" cy="19" r="3" strokeWidth={1.8} />
          <path strokeWidth={1.8} d="M12 8v4m-4 3l-3 2m11-2l3 2" />
        </svg>
      )
    case 'chart-bar':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    case 'cloud':
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )
    default:
      return (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
  }
}

export default function Services({ onSelectService }) {
  const { services } = portfolioData

  const handleRequestService = (serviceTitle) => {
    if (onSelectService) {
      onSelectService(serviceTitle)
    }
    const elem = document.getElementById('inquiry')
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="services" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-theme-primary relative border-t border-theme">
      <div className="max-w-7xl mx-auto space-y-14">
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
            What I Can Build For You
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight"
          >
            Freelance &amp; Consulting Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-theme-secondary text-base sm:text-lg"
          >
            From custom predictive algorithms to autonomous multi-agent systems and production cloud APIs, I deliver end-to-end AI engineering that moves business metrics.
          </motion.p>
        </div>

        {/* 5 Services Cards Grid (2 cols on md, 3 on lg with 5th card balanced) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-theme bg-theme-card p-7 flex flex-col justify-between hover:border-accent hover:bg-theme-card-hover transition-all duration-300 shadow-xl group relative overflow-hidden"
            >
              {/* Top Accent Gradient Border Glow */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundImage: 'var(--accent-gradient)' }}
              />

              <div className="space-y-5">
                {/* Header with Icon & Counter */}
                <div className="flex items-center justify-between">
                  <div
                    className="w-12 h-12 rounded-xl border border-theme flex items-center justify-center group-hover:scale-110 transition duration-300"
                    style={{
                      backgroundColor: 'var(--accent-light)',
                      color: 'var(--accent-color)',
                    }}
                  >
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="text-xs font-mono text-theme-muted font-bold">
                    0{idx + 1}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl font-bold text-theme-primary group-hover:text-accent transition leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-theme-secondary text-xs sm:text-sm mt-2 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-2 pt-2 border-t border-theme">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-theme-muted font-semibold">
                    Key Deliverables:
                  </span>
                  <ul className="space-y-1.5 text-xs text-theme-secondary">
                    {service.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 mt-0.5 shrink-0"
                          style={{ color: 'var(--accent-color)' }}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Tech Tags & Action */}
              <div className="pt-5 mt-4 border-t border-theme space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-theme-nav-inner border border-theme text-theme-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleRequestService(service.title)}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold border border-theme text-theme-primary hover:border-accent hover:text-white transition flex items-center justify-center gap-1.5 group-hover:shadow-md cursor-pointer"
                  style={{
                    backgroundColor: 'var(--bg-nav-inner)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundImage = 'var(--accent-gradient)'
                    e.currentTarget.style.color = '#ffffff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundImage = 'none'
                    e.currentTarget.style.color = 'var(--text-primary)'
                  }}
                >
                  <span>Request This Service</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

