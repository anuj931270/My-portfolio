import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import ThemeSettings from './components/ThemeSettings'
import LoadingScreen from './components/LoadingScreen'
import FloatingActions from './components/FloatingActions'
import ChatWidget from './components/ChatWidget'
import TechTicker from './components/TechTicker'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Skills from './components/Skills'
import HowIWork from './components/HowIWork'
import Experience from './components/Experience'
import Projects from './components/Projects'
import EngagementOptions from './components/EngagementOptions'
import InquiryForm from './components/InquiryForm'
import FAQ from './components/FAQ'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectDetail from './pages/ProjectDetail'
import { portfolioData } from './data/portfolioData'
import { getApiBaseUrl } from './utils/api'

// Dynamically resolve Backend API URL across localhost, LAN IPs (e.g. 192.168.x.x), and production
const API_BASE_URL = getApiBaseUrl()

function HomePage({
  backendStatus,
  projects,
  loadingProjects,
  isFromBackend,
  fetchProjects,
}) {
  const [inquiryService, setInquiryService] = useState('ML Model Development')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-theme-primary text-theme-primary flex flex-col selection:bg-accent selection:text-white transition-colors duration-200"
    >
      {/* Accessibility: Skip to Content Link (Requirement #8) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 text-white font-bold rounded-xl shadow-2xl transition"
        style={{
          backgroundImage: 'var(--accent-gradient)',
        }}
      >
        Skip to main content
      </a>

      {/* 1. Sticky Navbar with Green Freelance Badge & "Hire Me" Button */}
      <Navbar backendStatus={backendStatus} apiBaseUrl={API_BASE_URL} />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1 focus:outline-none">
        {/* 2. Hero Section with 3D Canvas (Lazy loaded), Freelance Badge & Resume Download */}
        <Hero />

        {/* 3. Scrolling Tech Stack Strip with Logos (Requirement #3) */}
        <TechTicker />

        {/* 4. About Section with Animated Counters (Requirement #2) */}
        <About />

        {/* 5. Services Section (ML, RAG, AI Agents, Data Analysis, Model Deployment) */}
        <Services onSelectService={(service) => setInquiryService(service)} />

        {/* 6. Skills Section */}
        <Skills />

        {/* 7. "How I Work" Process Section (Discovery, Proposal, Build, Testing, Delivery) */}
        <HowIWork />

        {/* 8. Experience Timeline Section (Requirement #4) */}
        <Experience />

        {/* 9. Projects Showcase Section */}
        <Projects
          projects={projects}
          backendStatus={backendStatus}
          loading={loadingProjects}
          isFromBackend={isFromBackend}
          onRefresh={fetchProjects}
          apiBaseUrl={API_BASE_URL}
        />

        {/* 10. Engagement Options (Fixed-Price, Hourly, Retainer - No fake prices) */}
        <EngagementOptions onSelectPlan={(plan) => setInquiryService(plan)} />

        {/* 11. Project Inquiry Form (saves to MySQL table 'inquiries' via POST /api/inquiry) */}
        <InquiryForm
          apiBaseUrl={API_BASE_URL}
          initialService={inquiryService}
        />

        {/* 12. FAQ Section (Requirement #7) */}
        <FAQ />

        {/* 13. Testimonials (Stays cleanly hidden until real reviews are added) */}
        <Testimonials />

        {/* 14. General Contact Form */}
        <Contact apiBaseUrl={API_BASE_URL} />
      </main>

      {/* 15. Footer Section */}
      <Footer />

      {/* Floating "Hire Me" Button & Back-To-Top Button (Requirement #6) */}
      <FloatingActions />
    </motion.div>
  )
}

function AnimatedRoutes({
  backendStatus,
  projects,
  loadingProjects,
  isFromBackend,
  fetchProjects,
}) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <HomePage
              backendStatus={backendStatus}
              projects={projects}
              loadingProjects={loadingProjects}
              isFromBackend={isFromBackend}
              fetchProjects={fetchProjects}
            />
          }
        />
        <Route
          path="/project/:id"
          element={
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <ProjectDetail projects={projects} />
            </motion.div>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [backendStatus, setBackendStatus] = useState('checking')
  const [projects, setProjects] = useState(portfolioData.featuredProjects)
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [isFromBackend, setIsFromBackend] = useState(false)

  const fetchProjects = useCallback(async () => {
    setLoadingProjects(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        setProjects(data)
        setIsFromBackend(true)
      }
    } catch (err) {
      console.warn('[API] Could not fetch projects from backend, using fallback:', err)
      setIsFromBackend(false)
    } finally {
      setLoadingProjects(false)
    }
  }, [])

  const checkHealth = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/health`)
      if (!res.ok) throw new Error('Health check response not OK')
      const data = await res.json()
      if (data.status === 'healthy') {
        setBackendStatus('connected')
        // Automatically fetch live projects upon successful connection
        fetchProjects()
      } else {
        setBackendStatus('disconnected')
      }
    } catch {
      setBackendStatus('disconnected')
    }
  }, [fetchProjects])

  useEffect(() => {
    checkHealth()
    fetchProjects()

    // Periodically poll backend health every 15s to auto-connect when backend starts
    const interval = setInterval(checkHealth, 15000)
    return () => clearInterval(interval)
  }, [checkHealth, fetchProjects])

  return (
    <ThemeProvider>
      {/* 1. Refined Loading Intro Screen (Requirement #1) */}
      <LoadingScreen />

      <Router>
        {/* Animated Routes with Smooth Page Transitions */}
        <AnimatedRoutes
          backendStatus={backendStatus}
          projects={projects}
          loadingProjects={loadingProjects}
          isFromBackend={isFromBackend}
          fetchProjects={fetchProjects}
        />

        {/* Global Floating Theme Settings Controller */}
        <ThemeSettings />

        {/* Ask Anuj AI Chat Widget (Bottom Right Corner) */}
        <ChatWidget apiBaseUrl={API_BASE_URL} />
      </Router>
    </ThemeProvider>
  )
}
