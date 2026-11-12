import React, { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'

// Lazy load the 3D Canvas to reduce initial JS payload and optimize Lighthouse score (Requirement #9)
const ThreeCanvas = lazy(() => import('./ThreeCanvas'))

export default function Hero() {
  const { personal } = portfolioData

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Ambient Glows reacting to accent */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: 'var(--accent-color)' }}
      />
      <div
        className="absolute top-1/3 right-10 w-[350px] h-[350px] rounded-full blur-[110px] pointer-events-none opacity-15"
        style={{ backgroundColor: 'var(--accent-color)' }}
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Hero Copy & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:col-span-7 space-y-6 text-center lg:text-left"
        >
          {/* Green "Available for freelance work" badge */}
          <a
            href="#inquiry"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium border border-emerald-500/35 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 backdrop-blur-md shadow-sm hover:bg-emerald-500/20 transition cursor-pointer"
            title="Click to hire Anuj Pathak"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">Available for freelance work</span>
            <span className="opacity-70">&bull; {personal.location}</span>
          </a>

          {/* Name & Headline */}
          <div className="space-y-2">
            <p
              className="text-xs sm:text-sm font-mono tracking-widest uppercase font-semibold"
              style={{ color: 'var(--accent-color)' }}
            >
              Hi, I&apos;m
            </p>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-theme-primary leading-tight">
              {personal.name}
            </h1>
            <p className="text-base sm:text-xl font-semibold gradient-accent-text">
              {personal.title}
            </p>
          </div>

          {/* Summary */}
          <p className="text-base sm:text-lg text-theme-secondary max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            {personal.summary}
          </p>

          {/* CTAs: Hire Me, Explore Projects, Download Resume, Book Call & Socials */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
            {/* "Hire Me" Primary Action Button */}
            <a
              href="#inquiry"
              className="px-6 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl transition transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              style={{
                backgroundImage: 'var(--accent-gradient)',
                boxShadow: '0 4px 18px 0 var(--accent-glow)',
              }}
            >
              <span>Hire Me</span>
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            </a>

            {/* Download Resume Button (Requirement #5) */}
            <a
              href="/resume.pdf"
              download="Anuj_Pathak_Resume.pdf"
              className="px-5 py-3.5 rounded-xl text-sm font-semibold bg-theme-card hover:bg-theme-card-hover text-theme-primary border border-theme hover:border-accent transition shadow-sm flex items-center gap-2 cursor-pointer group"
              title="Download official PDF resume"
            >
              <svg
                className="w-4 h-4 group-hover:translate-y-0.5 transition-transform"
                style={{ color: 'var(--accent-color)' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Resume</span>
            </a>

            <a
              href="#projects"
              className="px-5 py-3.5 rounded-xl text-sm font-semibold bg-theme-card hover:bg-theme-card-hover text-theme-secondary hover:text-theme-primary border border-theme hover:border-theme-hover transition shadow-sm cursor-pointer"
            >
              Projects &rarr;
            </a>

            {/* Book a Call Button (Calendly) */}
            <a
              href={personal.calendly}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3.5 rounded-xl text-sm font-semibold bg-theme-card hover:bg-theme-card-hover text-theme-secondary hover:text-theme-primary border border-theme hover:border-accent transition shadow-sm flex items-center gap-2 cursor-pointer"
              title="Schedule a 15-minute discovery call"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" />
              </svg>
              <span>Book Call</span>
            </a>

            {/* LinkedIn */}
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl bg-theme-card hover:bg-theme-card-hover text-theme-secondary hover:text-theme-primary border border-theme transition shadow-sm"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* GitHub */}
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl bg-theme-card hover:bg-theme-card-hover text-theme-secondary hover:text-theme-primary border border-theme transition shadow-sm"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>

          {/* Quick Capability Tags */}
          <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2">
            <span className="text-xs text-theme-muted font-mono">Specializing in:</span>
            {[
              'Agentic AI',
              'LangGraph',
              'Generative AI',
              'Deep Learning',
              'FastAPI',
              'Docker',
              'Cloud MLOps',
            ].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-theme-tag border border-theme text-theme-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Column: 3D Interactive Canvas Display (Lazy loaded) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div
            className="relative rounded-2xl p-[1.5px] transition-all"
            style={{
              backgroundImage: 'linear-gradient(180deg, var(--accent-border), var(--border-color))',
              boxShadow: 'var(--shadow-card), 0 0 25px -8px var(--accent-glow)',
            }}
          >
            <div className="w-full rounded-[15px] bg-theme-card backdrop-blur-xl border border-theme overflow-hidden">
              {/* Window Bar Header */}
              <div className="px-4 py-2.5 border-b border-theme bg-theme-nav-inner flex items-center justify-between text-xs text-theme-muted font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-theme-muted text-[11px]">neural_network_3d.jsx</span>
                </div>
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: 'var(--accent-color)' }}
                >
                  WebGL R3F
                </span>
              </div>

              {/* Canvas Component with Suspense Fallback (Lazy Loaded) */}
              <Suspense
                fallback={
                  <div className="w-full h-[320px] sm:h-[380px] md:h-[440px] flex flex-col items-center justify-center space-y-3 bg-theme-card">
                    <div
                      className="w-9 h-9 rounded-full border-2 border-t-transparent animate-spin"
                      style={{ borderColor: 'var(--accent-color)', borderTopColor: 'transparent' }}
                    />
                    <span className="text-xs font-mono text-theme-muted">
                      Initializing 3D Neural Mesh...
                    </span>
                  </div>
                }
              >
                <ThreeCanvas />
              </Suspense>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
