import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

export default function Testimonials() {
  const { testimonials } = portfolioData

  // As requested: Do not show fake testimonials or logos.
  // The component stays completely hidden until real reviews are added to portfolioData.testimonials.
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section id="testimonials" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-theme-primary relative border-t border-theme">
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
            Client Endorsements
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight"
          >
            What Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-theme-secondary text-base sm:text-lg"
          >
            Feedback from engineering leaders and product teams who partnered with Anuj Pathak.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.author || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl border border-theme bg-theme-card p-6 flex flex-col justify-between shadow-lg"
            >
              <div className="space-y-4">
                <svg
                  className="w-8 h-8 opacity-40"
                  style={{ color: 'var(--accent-color)' }}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-sm text-theme-secondary leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-theme flex items-center gap-3">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-10 h-10 rounded-full object-cover border border-theme"
                  />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs"
                    style={{
                      backgroundColor: 'var(--accent-light)',
                      color: 'var(--accent-color)',
                    }}
                  >
                    {item.author ? item.author.charAt(0) : 'C'}
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-bold text-theme-primary">{item.author}</h4>
                  <p className="text-xs text-theme-muted">
                    {item.role} {item.company ? `&bull; ${item.company}` : ''}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

