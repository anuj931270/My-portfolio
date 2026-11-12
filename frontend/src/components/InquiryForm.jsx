import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'
import { getApiBaseUrl } from '../utils/api'

const SERVICE_OPTIONS = [
  'ML Model Development',
  'RAG and LLM Chatbots',
  'AI Agents and Automation (LangGraph, MCP)',
  'Data Analysis and Dashboards',
  'ML Model Deployment (FastAPI, Docker, AWS/Azure)',
  'General AI Consulting & Advisory',
]

const BUDGET_OPTIONS = [
  '< $1,000',
  '$1,000 - $3,000',
  '$3,000 - $5,000',
  '$5,000 - $10,000+',
  'Flexible / Open to Quote',
]

const TIMELINE_OPTIONS = [
  '< 2 Weeks (Urgent)',
  '2 - 4 Weeks',
  '1 - 3 Months',
  'Ongoing / Retainer',
  'Flexible',
]

export default function InquiryForm({ apiBaseUrl, initialService = '' }) {
  const { personal } = portfolioData

  const resolvedBaseUrl = (apiBaseUrl || getApiBaseUrl()).replace(/\/+$/, '')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [serviceType, setServiceType] = useState(
    initialService || SERVICE_OPTIONS[0]
  )
  const [budgetRange, setBudgetRange] = useState(BUDGET_OPTIONS[1])
  const [timeline, setTimeline] = useState(TIMELINE_OPTIONS[1])
  const [details, setDetails] = useState('')

  const [statusState, setStatusState] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatusState({ type: '', text: '' })

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        service_type: serviceType,
        budget_range: budgetRange,
        timeline: timeline,
        details: details.trim(),
      }

      const res = await fetch(`${resolvedBaseUrl}/api/inquiry`, {
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
          text: `Inquiry successfully recorded${
            responseData.id ? ` (ID #${responseData.id})` : ''
          } in the MySQL database! Anuj will review your project requirements and respond within 24 hours.`,
        })
        setName('')
        setEmail('')
        setDetails('')
      } else {
        const errData = await res.json().catch(() => ({}))
        const errorDetail =
          errData.detail ||
          `Server returned status ${res.status}. Could not record inquiry.`
        setStatusState({
          type: 'error',
          text: errorDetail,
        })
      }
    } catch (err) {
      console.error('[Inquiry Error]', err)
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
      id="inquiry"
      className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-theme-primary relative border-t border-theme"
    >
      <div className="max-w-4xl mx-auto space-y-12">
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
            Start a Collaboration
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight"
          >
            Project Inquiry Form
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-theme-secondary text-base"
          >
            Fill out the details below to receive a custom architecture scope, timeline breakdown, and milestone proposal.
          </motion.p>
        </div>

        {/* Main Card with Inquiry Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-theme bg-theme-card p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-theme-muted mb-2">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-4 py-3 rounded-xl bg-theme-input border border-theme text-theme-primary placeholder-theme-muted focus:outline-none transition text-sm shadow-inner"
                  style={{ outlineColor: 'var(--accent-color)' }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-theme-muted mb-2">
                  Work / Personal Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sarah@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-theme-input border border-theme text-theme-primary placeholder-theme-muted focus:outline-none transition text-sm shadow-inner"
                  style={{ outlineColor: 'var(--accent-color)' }}
                />
              </div>
            </div>

            {/* 2. Service Type Dropdown / Select */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-theme-muted mb-2">
                Primary Service Required <span className="text-rose-500">*</span>
              </label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-theme-input border border-theme text-theme-primary focus:outline-none transition text-sm cursor-pointer shadow-inner"
                style={{ outlineColor: 'var(--accent-color)' }}
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-theme-card text-theme-primary">
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Budget Range (Pill Selector) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-theme-muted">
                  Estimated Budget Range
                </label>
                <span className="text-xs font-mono font-semibold" style={{ color: 'var(--accent-color)' }}>
                  {budgetRange}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {BUDGET_OPTIONS.map((opt) => {
                  const isSelected = budgetRange === opt
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setBudgetRange(opt)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition cursor-pointer text-center ${
                        isSelected
                          ? 'border-accent text-white shadow-sm font-semibold'
                          : 'bg-theme-nav-inner border-theme text-theme-secondary hover:text-theme-primary hover:border-theme-hover'
                      }`}
                      style={
                        isSelected
                          ? {
                              backgroundImage: 'var(--accent-gradient)',
                              boxShadow: '0 2px 10px 0 var(--accent-glow)',
                            }
                          : {}
                      }
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 4. Timeline (Pill Selector) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-theme-muted">
                  Target Delivery Timeline
                </label>
                <span className="text-xs font-mono font-semibold" style={{ color: 'var(--accent-color)' }}>
                  {timeline}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {TIMELINE_OPTIONS.map((opt) => {
                  const isSelected = timeline === opt
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setTimeline(opt)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border transition cursor-pointer text-center ${
                        isSelected
                          ? 'border-accent text-white shadow-sm font-semibold'
                          : 'bg-theme-nav-inner border-theme text-theme-secondary hover:text-theme-primary hover:border-theme-hover'
                      }`}
                      style={
                        isSelected
                          ? {
                              backgroundImage: 'var(--accent-gradient)',
                              boxShadow: '0 2px 10px 0 var(--accent-glow)',
                            }
                          : {}
                      }
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 5. Project Details Textarea */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-theme-muted mb-2">
                Project Scope &amp; Technical Requirements <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe your goals, problem statement, existing datasets (formats, sizes), target users, cloud constraints, or any specific models you have in mind..."
                className="w-full px-4 py-3 rounded-xl bg-theme-input border border-theme text-theme-primary placeholder-theme-muted focus:outline-none transition text-sm resize-none shadow-inner"
                style={{ outlineColor: 'var(--accent-color)' }}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-sm text-white shadow-xl transition transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                style={{
                  backgroundImage: 'var(--accent-gradient)',
                  boxShadow: '0 4px 20px 0 var(--accent-glow)',
                }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Transmitting Inquiry to MySQL...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Project Inquiry &amp; Request Proposal</span>
                    <span>&rarr;</span>
                  </>
                )}
              </button>
            </div>

            {/* Success & Error Feedback */}
            <AnimatePresence>
              {statusState.type === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-3 shadow-sm"
                >
                  <svg
                    className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div className="flex-1">
                    <strong className="font-semibold block mb-0.5">Inquiry Recorded!</strong>
                    <span>{statusState.text}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatusState({ type: '', text: '' })}
                    className="text-emerald-600 hover:text-emerald-800 dark:hover:text-emerald-100 text-xs font-mono cursor-pointer"
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
                  className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-800 dark:text-rose-300 text-xs flex items-start gap-3 shadow-sm"
                >
                  <svg
                    className="w-5 h-5 text-rose-500 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <strong className="font-semibold block mb-0.5">Submission Error</strong>
                    <span>{statusState.text}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatusState({ type: '', text: '' })}
                    className="text-rose-600 hover:text-rose-800 dark:hover:text-rose-100 text-xs font-mono cursor-pointer"
                  >
                    &times;
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Direct Calendly Alternative Option */}
            <div className="pt-4 border-t border-theme flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-theme-muted">
              <span>Need an immediate conversation?</span>
              <a
                href={personal.calendly}
                target="_blank"
                rel="noreferrer"
                className="font-semibold hover:underline flex items-center gap-1.5 transition"
                style={{ color: 'var(--accent-color)' }}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" />
                </svg>
                <span>Book a Call Directly on Calendly &rarr;</span>
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

