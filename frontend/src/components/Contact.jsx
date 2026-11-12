import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'
import { getApiBaseUrl } from '../utils/api'

export default function Contact({ apiBaseUrl }) {
  const { personal } = portfolioData

  const resolvedBaseUrl = (apiBaseUrl || getApiBaseUrl()).replace(/\/+$/, '')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [statusState, setStatusState] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatusState({ type: '', text: '' })

    try {
      const formattedMessage = subject.trim()
        ? `[Subject: ${subject.trim()}] ${message.trim()}`
        : message.trim()

      const payload = {
        name: name.trim(),
        email: email.trim(),
        message: formattedMessage,
      }

      const res = await fetch(`${resolvedBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        const responseData = await res.json().catch(() => ({}))
        setStatusState({
          type: 'success',
          text: `Thank you! Your message (${responseData.id ? `ID #${responseData.id}` : 'Delivered'}) has been saved to the MySQL database. Anuj will reach out shortly.`,
        })
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
        const errData = await res.json().catch(() => ({}))
        const errorDetail =
          errData.detail ||
          `Server returned status ${res.status}. Could not record your message.`
        setStatusState({
          type: 'error',
          text: errorDetail,
        })
      }
    } catch (err) {
      console.error('[Contact Error]', err)
      setStatusState({
        type: 'error',
        text: `Unable to connect to backend server at ${resolvedBaseUrl}. Please ensure FastAPI is running.`,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-theme-primary relative border-t border-theme"
    >
      <div className="max-w-7xl mx-auto space-y-12">
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
            Direct Contact
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight"
          >
            Let&apos;s Connect & Discuss AI Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-theme-secondary text-base"
          >
            Have a project, machine learning architecture, or freelance inquiry? Send a message directly or connect via email or phone.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="rounded-2xl border border-theme bg-theme-card p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur">
              <h3 className="text-xl font-bold text-theme-primary">Contact Details</h3>
              <p className="text-theme-secondary text-sm leading-relaxed">
                Available for full-time opportunities, freelance consulting, and high-impact enterprise AI engineering engagements.
              </p>

              <div className="space-y-4 text-sm">
                {/* Email */}
                <div className="flex items-center gap-3.5 text-theme-secondary">
                  <div
                    className="w-10 h-10 rounded-xl border border-theme flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: 'var(--accent-light)',
                      color: 'var(--accent-color)',
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-theme-muted font-mono">Email Address</div>
                    <a
                      href={`mailto:${personal.email}`}
                      className="font-semibold text-theme-primary hover:text-accent transition"
                    >
                      {personal.email}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3.5 text-theme-secondary">
                  <div
                    className="w-10 h-10 rounded-xl border border-theme flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: 'var(--accent-light)',
                      color: 'var(--accent-color)',
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-theme-muted font-mono">Phone / WhatsApp</div>
                    <a
                      href={`tel:${personal.phoneDisplay}`}
                      className="font-semibold text-theme-primary hover:text-accent transition"
                    >
                      {personal.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3.5 text-theme-secondary">
                  <div
                    className="w-10 h-10 rounded-xl border border-theme flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: 'var(--accent-light)',
                      color: 'var(--accent-color)',
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-theme-muted font-mono">Current Base</div>
                    <span className="font-semibold text-theme-primary">{personal.location}</span>
                  </div>
                </div>

                {/* Availability status */}
                <div className="flex items-center gap-3.5 text-theme-secondary">
                  <div
                    className="w-10 h-10 rounded-xl border border-theme flex items-center justify-center text-emerald-500 shrink-0"
                    style={{
                      backgroundColor: 'var(--accent-light)',
                    }}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs text-theme-muted font-mono">Status</div>
                    <span className="font-semibold text-theme-primary">{personal.availability}</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-theme">
                <p className="text-xs font-mono text-theme-muted uppercase tracking-wider mb-3">
                  Online Presence
                </p>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-theme-nav-inner hover:bg-theme-card text-theme-secondary hover:text-theme-primary border border-theme text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <span>LinkedIn</span>
                    <span>&nearr;</span>
                  </a>
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-theme-nav-inner hover:bg-theme-card text-theme-secondary hover:text-theme-primary border border-theme text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    <span>GitHub</span>
                    <span>&nearr;</span>
                  </a>
                  <a
                    href={`tel:${personal.phoneDisplay}`}
                    className="px-3.5 py-2 rounded-xl border text-xs font-semibold transition flex items-center gap-1.5"
                    style={{
                      backgroundColor: 'var(--accent-light)',
                      borderColor: 'var(--accent-border)',
                      color: 'var(--accent-color)',
                    }}
                  >
                    <span>Call / SMS</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-theme bg-theme-card p-6 sm:p-8 shadow-xl backdrop-blur">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-theme-secondary mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Smith"
                      className="w-full px-4 py-2.5 rounded-xl bg-theme-input border border-theme text-theme-primary placeholder-theme-muted focus:outline-none transition text-sm shadow-inner"
                      style={{
                        outlineColor: 'var(--accent-color)',
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-theme-secondary mb-1.5">
                      Your Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. john@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-theme-input border border-theme text-theme-primary placeholder-theme-muted focus:outline-none transition text-sm shadow-inner"
                      style={{
                        outlineColor: 'var(--accent-color)',
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-theme-secondary mb-1.5">
                    Subject / Discussion Topic
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="E.g. Agentic AI Pipeline or Full-Time Opportunity"
                    className="w-full px-4 py-2.5 rounded-xl bg-theme-input border border-theme text-theme-primary placeholder-theme-muted focus:outline-none transition text-sm shadow-inner"
                    style={{
                      outlineColor: 'var(--accent-color)',
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-theme-secondary mb-1.5">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell Anuj about your requirements, project scope, or opportunity..."
                    className="w-full px-4 py-2.5 rounded-xl bg-theme-input border border-theme text-theme-primary placeholder-theme-muted focus:outline-none transition text-sm resize-none shadow-inner"
                    style={{
                      outlineColor: 'var(--accent-color)',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-semibold text-sm text-white shadow-lg transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                  style={{
                    backgroundImage: 'var(--accent-gradient)',
                    boxShadow: '0 4px 18px 0 var(--accent-glow)',
                  }}
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Recording to MySQL via FastAPI...</span>
                    </>
                  ) : (
                    <span>Send Message to Anuj &rarr;</span>
                  )}
                </button>

                {/* Success & Error Feedback Alerts */}
                <AnimatePresence>
                  {statusState.type === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2.5 shadow-sm"
                    >
                      <svg
                        className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div className="flex-1">
                        <strong className="font-semibold block mb-0.5">Message Sent!</strong>
                        <span>{statusState.text}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStatusState({ type: '', text: '' })}
                        className="text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-200 text-xs font-mono ml-1 cursor-pointer"
                      >
                        &times;
                      </button>
                    </motion.div>
                  )}

                  {statusState.type === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2.5 shadow-sm"
                    >
                      <svg
                        className="w-4 h-4 text-rose-500 shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="flex-1">
                        <strong className="font-semibold block mb-0.5">Submission Error</strong>
                        <span>{statusState.text}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStatusState({ type: '', text: '' })}
                        className="text-rose-500 hover:text-rose-700 dark:hover:text-rose-200 text-xs font-mono ml-1 cursor-pointer"
                      >
                        &times;
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
