import React from 'react'
import { motion } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'
import AnimatedCounter from './AnimatedCounter'

export default function About() {
  const { personal, education, skills, featuredProjects } = portfolioData

  // Real numbers directly extracted from data file (Requirement #2)
  const totalSkillsCount = skills.reduce((acc, cat) => acc + cat.skills.length, 0)
  const yearsNumber = parseInt(personal.yearsOfExperience, 10) || 3
  const projectsCount = featuredProjects.length || 4

  const STATS = [
    { label: 'Years of Experience', target: yearsNumber, suffix: '+' },
    { label: 'Enterprise AI Solutions', target: projectsCount, suffix: '+' },
    { label: 'Technologies & Tools', target: totalSkillsCount, suffix: '+' },
    { label: 'Core Technical Domains', target: skills.length, suffix: '' },
  ]

  const PILLARS = [
    {
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Agentic AI & LangGraph',
      description:
        'Architecting stateful multi-agent systems with custom tool calling, Model Context Protocol (MCP) servers, checkpointing, and human-in-the-loop approvals.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Generative AI & Enterprise RAG',
      description:
        'Developing production RAG apps with LangChain, Pinecone, ChromaDB, and OpenAI API with semantic embeddings, hybrid search, and hallucination guardrails.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
      ),
      title: 'Deep Learning & NLP',
      description:
        'Building sequence models, Transformers, BERT, and LSTM sentiment analysis engines in TensorFlow, Keras, and PyTorch.',
    },
    {
      icon: (
        <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 7v10c0 2 1.5 3 3.5 3h9c2 0 3.5-1 3.5-3V7c0-2-1.5-3-3.5-3h-9C5.5 4 4 5 4 7zM9 9h6M9 13h6M9 17h4" />
        </svg>
      ),
      title: 'Cloud MLOps & Production APIs',
      description:
        'Deploying scalable model inference services via FastAPI, Docker, and CI/CD pipelines on AWS (SageMaker, Bedrock, EC2) and Azure.',
    },
  ]

  return (
    <section id="about" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-t border-theme bg-theme-primary/40 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
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
            About Anuj Pathak
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight"
          >
            Driving Impact through AI & Machine Learning
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-theme-secondary text-base sm:text-lg leading-relaxed"
          >
            {personal.summary}
          </motion.p>

          {/* Download Resume Link Button */}
          <div className="pt-2 flex justify-center">
            <a
              href="/resume.pdf"
              download="Anuj_Pathak_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-theme bg-theme-card hover:bg-theme-card-hover text-theme-primary hover:border-accent transition shadow-md group cursor-pointer"
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
              <span>Download Official Resume (PDF)</span>
            </a>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-theme bg-theme-card p-6 flex flex-col justify-between hover:border-accent hover:bg-theme-card-hover transition-all duration-300 shadow-md group"
            >
              <div className="space-y-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition duration-300 border border-theme"
                  style={{
                    backgroundColor: 'var(--accent-light)',
                  }}
                >
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-theme-primary group-hover:text-accent transition">
                  {pillar.title}
                </h3>
                <p className="text-theme-secondary text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row with Animated Counters (Requirement #2) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-theme bg-theme-card p-8 shadow-xl backdrop-blur-md"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-theme">
            {STATS.map((stat, idx) => (
              <div key={stat.label} className={`text-center ${idx > 0 ? 'pt-6 lg:pt-0' : ''}`}>
                <div className="text-3xl sm:text-5xl font-extrabold gradient-accent-text font-mono">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-theme-secondary font-medium mt-1.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education & Languages Sub-Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-theme bg-theme-card p-6 sm:p-7 space-y-4 shadow-md"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-theme"
                style={{
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent-color)',
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-theme-primary">Education</h3>
                <span className="text-xs font-mono font-semibold" style={{ color: 'var(--accent-color)' }}>
                  Academic Foundation
                </span>
              </div>
            </div>

            {education.map((edu) => (
              <div key={edu.institution} className="space-y-1.5 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h4 className="text-base font-semibold text-theme-primary">{edu.degree}</h4>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-theme-tag text-theme-secondary self-start sm:self-auto border border-theme">
                    {edu.period}
                  </span>
                </div>
                <p className="text-sm font-medium" style={{ color: 'var(--accent-color)' }}>
                  {edu.institution}
                </p>
                <p className="text-xs text-theme-muted">{edu.location}</p>
                <p className="text-xs text-theme-secondary pt-1 leading-relaxed">{edu.highlights}</p>
              </div>
            ))}
          </motion.div>

          {/* Languages & Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-theme bg-theme-card p-6 sm:p-7 space-y-4 shadow-md"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-theme"
                style={{
                  backgroundColor: 'var(--accent-light)',
                  color: 'var(--accent-color)',
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-theme-primary">Languages & Location</h3>
                <span className="text-xs font-mono font-semibold" style={{ color: 'var(--accent-color)' }}>
                  Communication & Presence
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                {personal.languages.map((lang) => (
                  <div key={lang.name} className="p-3 rounded-xl bg-theme-nav-inner border border-theme space-y-0.5">
                    <span className="text-sm font-semibold text-theme-primary block">{lang.name}</span>
                    <span className="text-[11px] font-mono" style={{ color: 'var(--accent-color)' }}>
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-theme-nav-inner border border-theme flex items-center justify-between text-xs">
                <span className="text-theme-muted font-mono">Current Base:</span>
                <span className="text-theme-primary font-semibold">{personal.location}</span>
              </div>

              <div className="p-3 rounded-xl bg-theme-nav-inner border border-theme flex items-center justify-between text-xs">
                <span className="text-theme-muted font-mono">Work Modes:</span>
                <span className="text-emerald-500 font-semibold">Remote / Hybrid / On-site</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
