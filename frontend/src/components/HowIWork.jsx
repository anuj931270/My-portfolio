import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

export default function HowIWork() {
  const { howIWork } = portfolioData

  return (
    <section id="how-i-work" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-theme-primary relative border-t border-theme">
      <div className="max-w-7xl mx-auto space-y-16">
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
            Engineering Workflow
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight"
          >
            How I Work &bull; From Concept to Production
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-theme-secondary text-base sm:text-lg"
          >
            A transparent, sprint-based approach ensuring zero surprises, high code quality, and on-time delivery.
          </motion.p>
        </div>

        {/* 5-Step Process Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 relative">
          {howIWork.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-theme bg-theme-card p-6 flex flex-col justify-between hover:border-accent hover:bg-theme-card-hover transition-all duration-300 shadow-lg group relative"
            >
              <div className="space-y-4">
                {/* Step Number Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className="w-10 h-10 rounded-xl font-mono text-sm font-extrabold flex items-center justify-center border border-theme group-hover:scale-105 transition"
                    style={{
                      backgroundColor: 'var(--accent-light)',
                      color: 'var(--accent-color)',
                    }}
                  >
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted font-bold">
                    Phase {idx + 1}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-lg font-bold text-theme-primary group-hover:text-accent transition">
                    {step.title}
                  </h3>
                  <p
                    className="text-xs font-mono font-medium mt-0.5"
                    style={{ color: 'var(--accent-color)' }}
                  >
                    {step.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs text-theme-secondary leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              {/* Deliverables */}
              <div className="pt-4 mt-4 border-t border-theme">
                <span className="text-[10px] font-mono uppercase tracking-wider text-theme-muted font-semibold block mb-1.5">
                  Phase Outputs:
                </span>
                <ul className="space-y-1 text-[11px] text-theme-secondary font-medium">
                  {step.deliverables.map((d, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span
                        className="w-1 h-1 rounded-full shrink-0"
                        style={{ backgroundColor: 'var(--accent-color)' }}
                      />
                      <span className="truncate">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

