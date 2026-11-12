import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onComplete }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if loading screen already showed this session
    const hasLoaded = sessionStorage.getItem('has_loaded_intro')
    const timerDuration = hasLoaded ? 400 : 900

    const timer = setTimeout(() => {
      setLoading(false)
      sessionStorage.setItem('has_loaded_intro', 'true')
      if (onComplete) onComplete()
    }, timerDuration)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none"
          style={{
            backgroundColor: 'var(--bg-primary)',
          }}
        >
          {/* Central Logo Symbol */}
          <div className="relative mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
              className="w-16 h-16 rounded-2xl p-[2px]"
              style={{
                backgroundImage: 'var(--accent-gradient)',
              }}
            >
              <div
                className="w-full h-full rounded-[14px] flex items-center justify-center"
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <span
                  className="font-extrabold text-xl font-mono tracking-tighter"
                  style={{ color: 'var(--accent-color)' }}
                >
                  AP
                </span>
              </div>
            </motion.div>
          </div>

          {/* Name & Headline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-center space-y-1"
          >
            <h2 className="text-lg font-bold tracking-tight text-theme-primary">
              Anuj Pathak
            </h2>
            <p className="text-xs font-mono text-theme-muted uppercase tracking-widest">
              Data Scientist &bull; AI/ML Engineer
            </p>
          </motion.div>

          {/* Sleek Progress Track */}
          <div className="w-48 h-1 rounded-full overflow-hidden bg-theme-nav-inner border border-theme mt-6">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.85, ease: 'easeInOut' }}
              className="h-full rounded-full"
              style={{ backgroundImage: 'var(--accent-gradient)' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

