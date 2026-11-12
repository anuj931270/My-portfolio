import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme, ACCENT_PRESETS } from '../context/ThemeContext'

export default function ThemeSettings() {
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef(null)
  const colorInputRef = useRef(null)

  const {
    mode,
    effectiveMode,
    accent,
    customColor,
    accentHex,
    setMode,
    setAccent,
    setCustomColor,
  } = useTheme()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const presetsList = Object.values(ACCENT_PRESETS)

  return (
    <div ref={panelRef} className="fixed bottom-6 right-6 z-50 select-none">
      {/* Floating Settings Button with Palette Icon */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Theme & Accent Settings"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="w-13 h-13 rounded-2xl flex items-center justify-center shadow-xl border backdrop-blur-xl transition-all duration-300 relative group cursor-pointer"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: isOpen ? 'var(--accent-color)' : 'var(--border-color)',
          boxShadow: isOpen
            ? '0 0 25px -4px var(--accent-glow)'
            : 'var(--shadow-card)',
        }}
      >
        {/* Subtle accent ring on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"
          style={{ backgroundColor: 'var(--accent-glow)' }}
        />

        {/* Palette SVG Icon with dynamic color fill */}
        <svg
          className="w-6 h-6 transition-transform duration-300 group-hover:rotate-12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--accent-color)' }}
        >
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
        </svg>

        {/* Mini active accent dot indicator */}
        <span
          className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-950 shadow-sm"
          style={{ backgroundColor: accentHex }}
        />
      </motion.button>

      {/* Clean Glassmorphic Dropdown Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            transition={{ type: 'spring', damping: 24, stiffness: 320 }}
            className="absolute bottom-16 right-0 w-[310px] sm:w-[340px] rounded-2xl border p-4 shadow-2xl backdrop-blur-2xl"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              boxShadow: 'var(--shadow-card), 0 0 30px -10px var(--accent-glow)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: accentHex }}
                />
                <span className="font-semibold text-sm tracking-tight text-theme-primary">
                  Theme & Accent
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-theme-muted hover:text-theme-primary hover:bg-theme-secondary transition cursor-pointer"
                aria-label="Close settings"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* 1. Theme Mode Switcher */}
            <div className="mb-4">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-theme-muted block mb-2">
                Appearance Mode
              </label>
              <div
                className="grid grid-cols-3 gap-1.5 p-1 rounded-xl border text-xs"
                style={{
                  backgroundColor: 'var(--bg-nav-inner)',
                  borderColor: 'var(--border-color)',
                }}
              >
                {/* Light Option */}
                <button
                  type="button"
                  onClick={() => setMode('light')}
                  className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg transition-all cursor-pointer font-medium ${
                    mode === 'light'
                      ? 'shadow-sm text-theme-primary font-semibold'
                      : 'text-theme-muted hover:text-theme-primary'
                  }`}
                  style={{
                    backgroundColor: mode === 'light' ? 'var(--bg-card-solid)' : 'transparent',
                    border: mode === 'light' ? '1px solid var(--border-color)' : '1px solid transparent',
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                  <span>Light</span>
                </button>

                {/* Dark Option */}
                <button
                  type="button"
                  onClick={() => setMode('dark')}
                  className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg transition-all cursor-pointer font-medium ${
                    mode === 'dark'
                      ? 'shadow-sm text-theme-primary font-semibold'
                      : 'text-theme-muted hover:text-theme-primary'
                  }`}
                  style={{
                    backgroundColor: mode === 'dark' ? 'var(--bg-card-solid)' : 'transparent',
                    border: mode === 'dark' ? '1px solid var(--border-color)' : '1px solid transparent',
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  <span>Dark</span>
                </button>

                {/* System Option */}
                <button
                  type="button"
                  onClick={() => setMode('system')}
                  className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg transition-all cursor-pointer font-medium ${
                    mode === 'system'
                      ? 'shadow-sm text-theme-primary font-semibold'
                      : 'text-theme-muted hover:text-theme-primary'
                  }`}
                  style={{
                    backgroundColor: mode === 'system' ? 'var(--bg-card-solid)' : 'transparent',
                    border: mode === 'system' ? '1px solid var(--border-color)' : '1px solid transparent',
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  <span className="flex items-center gap-1">
                    System
                    <span className="text-[9px] opacity-70">({effectiveMode})</span>
                  </span>
                </button>
              </div>
            </div>

            {/* 2. Accent Color Switcher (6 Presets + Custom) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-theme-muted">
                  Accent Color
                </label>
                <span className="text-[11px] font-mono capitalize" style={{ color: accentHex }}>
                  {accent === 'custom' ? customColor : accent}
                </span>
              </div>

              {/* 6 Preset Circles */}
              <div className="grid grid-cols-6 gap-2 mb-3">
                {presetsList.map((preset) => {
                  const isSelected = accent === preset.id
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setAccent(preset.id)}
                      title={`${preset.name} Accent`}
                      aria-label={`${preset.name} Accent`}
                      className="group relative w-10 h-10 rounded-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                      style={{
                        backgroundColor: preset.color,
                        boxShadow: isSelected
                          ? `0 0 12px 2px ${preset.glow}`
                          : 'none',
                        outline: isSelected
                          ? '2px solid var(--text-primary)'
                          : 'none',
                        outlineOffset: '2px',
                      }}
                    >
                      {isSelected && (
                        <svg
                          className="w-4 h-4 text-white drop-shadow"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Custom Color Picker Row */}
              <div
                className="p-2.5 rounded-xl border flex items-center justify-between gap-2"
                style={{
                  backgroundColor: 'var(--bg-nav-inner)',
                  borderColor: accent === 'custom' ? 'var(--accent-color)' : 'var(--border-color)',
                }}
              >
                <div className="flex items-center gap-2.5">
                  {/* Clickable color swatch opening native picker */}
                  <div
                    onClick={() => colorInputRef.current?.click()}
                    className="relative w-8 h-8 rounded-lg cursor-pointer overflow-hidden border flex items-center justify-center shadow-inner group"
                    style={{
                      backgroundColor: accent === 'custom' ? customColor : accentHex,
                      borderColor: 'var(--border-color)',
                    }}
                    title="Choose custom color"
                  >
                    <input
                      ref={colorInputRef}
                      type="color"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                    <svg
                      className="w-3.5 h-3.5 text-white drop-shadow opacity-75 group-hover:opacity-100"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-theme-primary flex items-center gap-1.5">
                      <span>Custom Color</span>
                      {accent === 'custom' && (
                        <span
                          className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full"
                          style={{
                            backgroundColor: 'var(--accent-light)',
                            color: 'var(--accent-color)',
                          }}
                        >
                          Active
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-theme-muted font-mono">
                      Pick any HEX color
                    </div>
                  </div>
                </div>

                {/* Hex input */}
                <div className="flex items-center gap-1 bg-theme-input border border-theme rounded-lg px-2 py-1">
                  <span className="text-xs text-theme-muted font-mono">#</span>
                  <input
                    type="text"
                    maxLength={7}
                    value={customColor.replace('#', '')}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9A-Fa-f]/g, '')
                      if (val.length <= 6) {
                        setCustomColor(`#${val}`)
                      }
                    }}
                    placeholder="8b5cf6"
                    className="w-16 text-xs font-mono bg-transparent text-theme-primary focus:outline-none uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Quick Live Preview Bar */}
            <div className="mt-3 pt-2.5 border-t flex items-center justify-between text-[11px] text-theme-muted" style={{ borderColor: 'var(--border-color)' }}>
              <span>Mode: <strong className="text-theme-primary uppercase">{effectiveMode}</strong></span>
              <button
                type="button"
                onClick={() => {
                  setMode('dark')
                  setAccent('purple')
                }}
                className="hover:underline text-[10px] cursor-pointer"
                style={{ color: 'var(--accent-color)' }}
              >
                Reset to Default
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

