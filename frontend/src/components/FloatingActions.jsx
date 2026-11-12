import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToInquiry = () => {
    const elem = document.getElementById('inquiry')
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Floating "Hire Me" Button (Bottom Left) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="fixed bottom-6 left-6 z-40 select-none"
      >
        <button
          type="button"
          onClick={scrollToInquiry}
          aria-label="Hire Me for Freelance AI Projects"
          className="group relative px-4 py-2.5 rounded-full border shadow-xl backdrop-blur-xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)',
            boxShadow: 'var(--shadow-card), 0 0 20px -8px rgba(16, 185, 129, 0.3)',
          }}
        >
          {/* Green Live Status Pulse Dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>

          <span className="text-xs font-bold text-theme-primary group-hover:text-accent transition">
            Hire Me
          </span>

          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 hidden sm:inline">
            &bull; Available
          </span>
        </button>
      </motion.div>

      {/* Floating Back to Top Button (Bottom Right, placed above Theme Settings) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-22 right-6 z-40 w-11 h-11 rounded-xl flex items-center justify-center border shadow-lg backdrop-blur-xl transition duration-200 cursor-pointer"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

