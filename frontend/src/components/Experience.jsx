import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

export default function Experience() {
  const { experience, education } = portfolioData

  return (
    <section
      id="experience"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-theme-primary relative border-t border-theme"
    >
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
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
            Track Record
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight"
          >
            Professional Experience & Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-theme-secondary text-base"
          >
            Demonstrated engineering excellence in production Agentic AI systems, enterprise RAG, and deep learning pipelines.
          </motion.p>
        </div>

        {/* Experience Timeline */}
        <div
          className="relative pl-6 sm:pl-8 border-l-2 space-y-12"
          style={{ borderColor: 'var(--accent-border)' }}
        >
          {experience.map((exp, idx) => (
            <motion.div
              key={exp.company + exp.period}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Glowing Timeline Marker */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--accent-color)',
                  boxShadow: '0 0 10px 0 var(--accent-glow)',
                }}
              />

              {/* Card Container */}
              <div className="rounded-2xl border border-theme bg-theme-card p-6 sm:p-8 hover:border-accent hover:bg-theme-card-hover transition-all duration-300 shadow-xl space-y-5">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-theme pb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-theme-primary group-hover:text-accent transition">
                      {exp.role}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold mt-0.5" style={{ color: 'var(--accent-color)' }}>
                      {exp.company}{' '}
                      <span className="text-theme-muted font-normal">&bull; {exp.location}</span>
                    </p>
                  </div>
                  <span
                    className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-medium border self-start sm:self-auto"
                    style={{
                      backgroundColor: 'var(--accent-light)',
                      borderColor: 'var(--accent-border)',
                      color: 'var(--accent-color)',
                    }}
                  >
                    {exp.period}
                  </span>
                </div>

                <p className="text-theme-secondary text-sm leading-relaxed">{exp.description}</p>

                {/* Key Points / Achievements */}
                <div className="space-y-2.5 pt-1">
                  <p className="text-xs font-mono uppercase tracking-wider text-theme-muted">
                    Key Deliverables & Technical Milestones:
                  </p>
                  <ul className="space-y-2.5 text-sm text-theme-secondary">
                    {exp.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: 'var(--accent-color)' }}
                        />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="pt-3 border-t border-theme">
                  <p className="text-xs font-mono uppercase tracking-wider text-theme-muted mb-2">
                    Technologies Utilized:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-theme-nav-inner border border-theme text-theme-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Timeline Entry */}
        <div
          className="relative pl-6 sm:pl-8 border-l-2"
          style={{ borderColor: 'var(--accent-border)' }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Glowing Marker */}
            <div
              className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300"
              style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--accent-color)',
                boxShadow: '0 0 10px 0 var(--accent-glow)',
              }}
            />

            <div className="rounded-2xl border border-theme bg-theme-card p-6 sm:p-8 hover:border-accent hover:bg-theme-card-hover transition-all duration-300 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-theme pb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-theme-primary group-hover:text-accent transition">
                    {education[0].degree}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold mt-0.5" style={{ color: 'var(--accent-color)' }}>
                    {education[0].institution}{' '}
                    <span className="text-theme-muted font-normal">&bull; {education[0].location}</span>
                  </p>
                </div>
                <span
                  className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-medium border self-start sm:self-auto"
                  style={{
                    backgroundColor: 'var(--accent-light)',
                    borderColor: 'var(--accent-border)',
                    color: 'var(--accent-color)',
                  }}
                >
                  {education[0].period}
                </span>
              </div>

              <p className="text-theme-secondary text-sm leading-relaxed">{education[0].highlights}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
