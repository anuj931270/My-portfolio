import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'
import { useTheme } from '../context/ThemeContext'

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'How I Work', href: '#how-i-work' },
  { name: 'Projects', href: '#projects' },
  { name: 'Pricing', href: '#engagement' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar({ backendStatus }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { accentHex } = useTheme()

  const { personal } = portfolioData

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-theme-nav backdrop-blur-md border-b border-theme shadow-lg py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Freelance Status Badge */}
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div
                className="w-9 h-9 rounded-xl p-[1.5px] shadow-md transition"
                style={{
                  backgroundImage: 'var(--accent-gradient)',
                  boxShadow: '0 4px 14px -2px var(--accent-glow)',
                }}
              >
                <div className="w-full h-full bg-theme-primary rounded-[10px] flex items-center justify-center">
                  <span
                    className="font-extrabold text-sm"
                    style={{ color: 'var(--accent-color)' }}
                  >
                    {personal.initials}
                  </span>
                </div>
              </div>
              <span className="font-bold text-base sm:text-lg tracking-tight text-theme-primary flex items-center gap-1">
                {personal.name.split(' ')[0]}
                <span style={{ color: 'var(--accent-color)' }}>.{personal.name.split(' ')[1]}</span>
              </span>
            </a>

            {/* Green "Available for freelance work" badge in Navbar */}
            <a
              href="#inquiry"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15 transition shadow-sm"
              title="Click to hire Anuj for freelance AI/ML work"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for freelance work</span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-theme-nav-inner border border-theme rounded-full px-3.5 py-1.5 backdrop-blur-md shadow-inner">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1 text-xs font-medium text-theme-secondary hover:text-theme-primary hover:bg-theme-card rounded-full transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Section: Backend Status, Hire Me & Contact CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Live Backend Badge */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border border-theme bg-theme-nav-inner backdrop-blur"
              title="FastAPI & MySQL Backend Status"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  backendStatus === 'connected'
                    ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                    : backendStatus === 'checking'
                    ? 'bg-amber-400 animate-ping'
                    : 'bg-rose-400'
                }`}
              />
              <span className="text-theme-muted text-[10px]">
                API:{' '}
                <strong
                  className={
                    backendStatus === 'connected'
                      ? 'text-emerald-500 font-semibold'
                      : backendStatus === 'checking'
                      ? 'text-amber-500 font-semibold'
                      : 'text-rose-500 font-semibold'
                  }
                >
                  {backendStatus === 'connected' ? 'OK' : backendStatus === 'checking' ? '...' : 'Off'}
                </strong>
              </span>
            </div>

            {/* "Hire Me" High-Priority Button */}
            <a
              href="#inquiry"
              className="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-md transition transform hover:scale-105 cursor-pointer flex items-center gap-1.5"
              style={{
                backgroundImage: 'var(--accent-gradient)',
                boxShadow: '0 4px 14px 0 var(--accent-glow)',
              }}
            >
              <span>Hire Me</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            </a>

            <a
              href="#contact"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-theme-card hover:bg-theme-card-hover border border-theme text-theme-primary transition shadow-sm"
            >
              Contact
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href="#inquiry"
              className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm flex items-center gap-1"
              style={{
                backgroundImage: 'var(--accent-gradient)',
              }}
            >
              <span>Hire Me</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-theme-card border border-theme text-theme-primary focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden bg-theme-nav border-b border-theme px-4 pt-3 pb-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col space-y-2">
              {/* Green freelance status in mobile drawer */}
              <div className="p-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available for freelance work</span>
              </div>

              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-theme-secondary hover:bg-theme-card hover:text-theme-primary transition"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-3 border-t border-theme flex flex-col gap-2">
                <a
                  href="#inquiry"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-white text-center shadow"
                  style={{
                    backgroundImage: 'var(--accent-gradient)',
                  }}
                >
                  Hire Me &bull; Submit Inquiry
                </a>
                <a
                  href={personal.calendly}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl text-xs font-semibold bg-theme-card border border-theme text-theme-primary text-center hover:border-accent transition"
                >
                  Book a 15-Min Discovery Call
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
