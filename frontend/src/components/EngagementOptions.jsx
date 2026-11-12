import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

export default function EngagementOptions({ onSelectPlan }) {
  const { engagementOptions, personal } = portfolioData

  const handleSelectPlan = (planTitle) => {
    if (onSelectPlan) {
      onSelectPlan(planTitle)
    }
    const elem = document.getElementById('inquiry')
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="engagement" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-theme-primary relative border-t border-theme">
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
            Engagement Models
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight"
          >
            Flexible Collaboration Options
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-theme-secondary text-base sm:text-lg"
          >
            Transparent agreements tailored to your stage — from standalone MVP builds to on-demand technical consulting and dedicated monthly retainers.
          </motion.p>
        </div>

        {/* 3 Pricing/Engagement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {engagementOptions.map((option, idx) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className={`rounded-2xl border p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl relative ${
                option.popular
                  ? 'bg-theme-card border-accent shadow-accent'
                  : 'bg-theme-card border-theme hover:border-accent hover:bg-theme-card-hover'
              }`}
            >
              {/* Popular Badge */}
              {option.popular && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-semibold text-white tracking-wide shadow-md"
                  style={{
                    backgroundImage: 'var(--accent-gradient)',
                  }}
                >
                  Most Popular for MVPs
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-theme-primary">
                    {option.title}
                  </h3>
                  <p className="text-xs text-theme-secondary mt-1.5 leading-relaxed">
                    {option.tagline}
                  </p>
                </div>

                {/* Price Display: "Contact for quote" (NO fake prices) */}
                <div className="p-4 rounded-xl bg-theme-nav-inner border border-theme text-center">
                  <span className="text-xs uppercase tracking-wider font-mono text-theme-muted block mb-0.5">
                    Investment
                  </span>
                  <span
                    className="text-lg sm:text-xl font-bold font-mono"
                    style={{ color: 'var(--accent-color)' }}
                  >
                    {option.pricingDisplay}
                  </span>
                  <span className="text-[11px] text-theme-muted block mt-1">
                    Custom scoped to your requirements
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-theme-muted font-semibold block">
                    What&apos;s Included:
                  </span>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-theme-secondary">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <svg
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: 'var(--accent-color)' }}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => handleSelectPlan(option.title)}
                  className={`w-full py-3 rounded-xl text-xs sm:text-sm font-semibold transition shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    option.popular ? 'text-white' : 'border border-theme text-theme-primary hover:border-accent'
                  }`}
                  style={
                    option.popular
                      ? {
                          backgroundImage: 'var(--accent-gradient)',
                          boxShadow: '0 4px 14px 0 var(--accent-glow)',
                        }
                      : {
                          backgroundColor: 'var(--bg-nav-inner)',
                        }
                  }
                >
                  <span>{option.ctaText}</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Discovery Call Banner with Calendly Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-theme bg-theme-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl backdrop-blur-md"
        >
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono" style={{ color: 'var(--accent-color)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Free 15-Minute Technical Consultation</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-theme-primary">
              Not sure which option fits your roadmap?
            </h3>
            <p className="text-xs sm:text-sm text-theme-secondary max-w-xl">
              Let&apos;s get on a call to talk through your architecture, data constraints, and technical milestones — no commitment required.
            </p>
          </div>

          <a
            href={personal.calendly}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white shadow-lg transition transform hover:scale-105 flex items-center gap-2 shrink-0 cursor-pointer"
            style={{
              backgroundImage: 'var(--accent-gradient)',
              boxShadow: '0 4px 18px 0 var(--accent-glow)',
            }}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" />
            </svg>
            <span>Book a 15-Min Discovery Call</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

