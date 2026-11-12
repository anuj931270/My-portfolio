import React, { useState, useMemo, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { portfolioData } from '../data/portfolioData'
import { getSkillMeta } from '../data/skillsConfig'

// Lazy load 3D Skills Sphere to maintain peak bundle performance
const SkillsSphere = lazy(() => import('./SkillsSphere'))
import {
  Search,
  X,
  Layers,
  Sparkles,
  Bot,
  BrainCircuit,
  TrendingUp,
  Cloud,
  Database,
  Server,
  Code,
  LayoutGrid,
  Globe2,
} from 'lucide-react'

function getCategoryHeaderIcon(id) {
  switch (id) {
    case 'agentic-ai':
      return <Bot className="w-5 h-5 text-accent" />
    case 'generative-ai':
      return <Sparkles className="w-5 h-5 text-accent" />
    case 'deep-learning':
      return <Layers className="w-5 h-5 text-accent" />
    case 'machine-learning':
      return <TrendingUp className="w-5 h-5 text-accent" />
    case 'cloud-mlops':
      return <Cloud className="w-5 h-5 text-accent" />
    case 'databases':
      return <Database className="w-5 h-5 text-accent" />
    case 'backend':
      return <Server className="w-5 h-5 text-accent" />
    case 'programming':
      return <Code className="w-5 h-5 text-accent" />
    default:
      return <BrainCircuit className="w-5 h-5 text-accent" />
  }
}

/**
 * Single Skill Card / Chip with Icon, Name, Official Brand Hover Color & Tooltip
 */
function SkillCard({ skillName, categoryName }) {
  const [isHovered, setIsHovered] = useState(false)
  const meta = getSkillMeta(skillName)
  const IconComponent = meta.icon

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-theme bg-theme-nav-inner/90 backdrop-blur-md cursor-pointer transition-all duration-300 shadow-sm select-none"
        style={{
          borderColor: isHovered ? meta.color : undefined,
          backgroundColor: isHovered ? `${meta.color}15` : undefined,
          boxShadow: isHovered ? `0 6px 20px ${meta.color}35` : undefined,
        }}
      >
        {/* Official Brand Icon */}
        <span
          className="w-5 h-5 flex items-center justify-center shrink-0 transition-colors duration-200"
          style={{
            color: isHovered ? meta.color : 'inherit',
          }}
        >
          <IconComponent className="w-4 h-4" />
        </span>

        {/* Skill Name */}
        <span
          className="text-xs font-semibold tracking-tight transition-colors duration-200 whitespace-nowrap"
          style={{
            color: isHovered ? meta.color : 'inherit',
          }}
        >
          {skillName}
        </span>
      </motion.div>

      {/* Floating Hover Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-50 w-64 p-3 rounded-2xl border backdrop-blur-2xl shadow-2xl pointer-events-none"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: meta.color,
              boxShadow: `0 10px 30px ${meta.color}35`,
            }}
          >
            {/* Header: Dot + Name + Category */}
            <div className="flex items-center justify-between gap-2 border-b border-theme pb-1.5 mb-1.5">
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2 h-2 rounded-full shrink-0 shadow-[0_0_6px]"
                  style={{ backgroundColor: meta.color, color: meta.color }}
                />
                <span className="font-bold text-xs text-theme-primary truncate">
                  {skillName}
                </span>
              </div>
              <span
                className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0"
                style={{
                  backgroundColor: `${meta.color}20`,
                  color: meta.color,
                }}
              >
                {categoryName || meta.category}
              </span>
            </div>

            {/* Description */}
            <p className="text-[11px] text-theme-secondary leading-relaxed">
              {meta.description}
            </p>

            {/* Subtle bottom arrow */}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2.5 h-2.5 rotate-45 border-r border-b"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: meta.color,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'sphere'
  const { skills } = portfolioData

  // Total skill count
  const totalSkillsCount = useMemo(
    () => skills.reduce((acc, cat) => acc + (cat.skills ? cat.skills.length : 0), 0),
    [skills]
  )

  // Filter skills based on Category Tab and Real-time Search Box
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()

    return skills
      .filter((cat) => activeCategory === 'all' || cat.id === activeCategory)
      .map((cat) => {
        if (!q) return cat

        // Match skills by name or category
        const matchingSkills = cat.skills.filter((s) => {
          const meta = getSkillMeta(s)
          return (
            s.toLowerCase().includes(q) ||
            cat.category.toLowerCase().includes(q) ||
            meta.description.toLowerCase().includes(q)
          )
        })

        return {
          ...cat,
          skills: matchingSkills,
        }
      })
      .filter((cat) => cat.skills.length > 0)
  }, [skills, activeCategory, searchQuery])

  // Flat list of matching skills for 3D sphere
  const flatMatchingSkills = useMemo(() => {
    return filteredCategories.flatMap((c) => c.skills)
  }, [filteredCategories])

  return (
    <section id="skills" className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-theme-primary relative border-t border-theme">
      <div className="max-w-7xl mx-auto space-y-10">
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
            Technical Expertise &bull; {totalSkillsCount} Skills
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight"
          >
            Skills &amp; Specialized Domains
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-theme-secondary text-base sm:text-lg"
          >
            Comprehensive technology stack with official brand icons, categorized across Agentic AI, Generative AI, Deep Learning, MLOps, and backend engineering.
          </motion.p>
        </div>

        {/* Search Box & View Mode Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          {/* Real-time Search Box */}
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-theme-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills (e.g. LangGraph, Python, Docker...)"
              className="w-full pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm bg-theme-card border border-theme text-theme-primary placeholder-theme-muted focus:outline-none focus:border-accent transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-primary transition p-0.5"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* View Mode Toggle: Grid Cards vs 3D Sphere Cloud */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-theme-card border border-theme shrink-0 shadow-inner">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-accent text-white shadow-md'
                  : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Categorized Grid</span>
            </button>
            <button
              onClick={() => setViewMode('sphere')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                viewMode === 'sphere'
                  ? 'bg-accent text-white shadow-md'
                  : 'text-theme-secondary hover:text-theme-primary'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>3D Sphere Cloud</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
              activeCategory === 'all'
                ? 'text-white shadow-md'
                : 'bg-theme-card border border-theme text-theme-secondary hover:text-theme-primary hover:border-theme-hover'
            }`}
            style={{
              backgroundImage: activeCategory === 'all' ? 'var(--accent-gradient)' : 'none',
              boxShadow: activeCategory === 'all' ? '0 4px 12px 0 var(--accent-glow)' : 'none',
            }}
          >
            All Skills ({totalSkillsCount})
          </button>
          {skills.map((cat) => {
            const isActive = activeCategory === cat.id
            const count = cat.skills ? cat.skills.length : 0
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'bg-theme-card border border-theme text-theme-secondary hover:text-theme-primary hover:border-theme-hover'
                }`}
                style={{
                  backgroundImage: isActive ? 'var(--accent-gradient)' : 'none',
                  boxShadow: isActive ? '0 4px 12px 0 var(--accent-glow)' : 'none',
                }}
              >
                <span>{cat.category}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20' : 'bg-theme-nav-inner text-theme-muted'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* View 1: 3D Interactive Sphere Cloud */}
        {viewMode === 'sphere' ? (
          <div className="space-y-4">
            <Suspense
              fallback={
                <div className="w-full h-[450px] sm:h-[520px] md:h-[580px] rounded-3xl border border-theme bg-theme-card/60 flex flex-col items-center justify-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                  <span className="text-xs font-mono text-theme-muted">Loading 3D Skill Sphere...</span>
                </div>
              }
            >
              <SkillsSphere skills={flatMatchingSkills.length > 0 ? flatMatchingSkills : skills} />
            </Suspense>
            <div className="text-center text-xs text-theme-muted flex items-center justify-center gap-2">
              <span>Showing {flatMatchingSkills.length} skills in 3D sphere</span>
              <span>&bull;</span>
              <button
                onClick={() => setViewMode('grid')}
                className="text-accent hover:underline font-semibold"
              >
                Switch to Categorized Grid
              </button>
            </div>
          </div>
        ) : (
          /* View 2: Categorized Cards Grid */
          <>
            {filteredCategories.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-3xl border border-theme bg-theme-card space-y-4 max-w-md mx-auto">
                <Search className="w-10 h-10 text-theme-muted mx-auto stroke-1" />
                <div>
                  <h3 className="font-bold text-base text-theme-primary">No skills found</h3>
                  <p className="text-xs text-theme-secondary mt-1">
                    No competencies match &ldquo;{searchQuery}&rdquo; in this category.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('all')
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition shadow-md"
                  style={{ backgroundImage: 'var(--accent-gradient)' }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                  {filteredCategories.map((cat, idx) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.35, delay: idx * 0.04 }}
                      whileHover={{ y: -4 }}
                      className="rounded-2xl border border-theme bg-theme-card p-5 sm:p-6 flex flex-col justify-between hover:border-accent hover:bg-theme-card-hover transition-all duration-300 shadow-md group"
                    >
                      <div className="space-y-4">
                        {/* Category Header with Icon & Count */}
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl border border-theme flex items-center justify-center shrink-0 group-hover:scale-105 transition"
                            style={{
                              backgroundColor: 'var(--accent-light)',
                            }}
                          >
                            {getCategoryHeaderIcon(cat.id)}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm sm:text-base font-bold text-theme-primary group-hover:text-accent transition truncate">
                              {cat.category}
                            </h3>
                            <span className="text-[11px] font-mono text-theme-muted">
                              {cat.skills.length} skills
                            </span>
                          </div>
                        </div>

                        {/* Category Description */}
                        <p className="text-xs text-theme-secondary leading-relaxed min-h-[32px]">
                          {cat.description}
                        </p>

                        {/* Skill Cards / Chips with Brand Icons & Tooltips */}
                        <div className="pt-2 flex flex-wrap gap-2">
                          {cat.skills.map((skillName) => (
                            <SkillCard
                              key={skillName}
                              skillName={skillName}
                              categoryName={cat.category}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
