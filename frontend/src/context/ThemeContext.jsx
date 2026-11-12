import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'

export const ACCENT_PRESETS = {
  blue: {
    id: 'blue',
    name: 'Blue',
    color: '#3b82f6',
    secondary: '#1d4ed8',
    glow: '#60a5fa',
  },
  purple: {
    id: 'purple',
    name: 'Purple',
    color: '#a855f7',
    secondary: '#7e22ce',
    glow: '#c084fc',
  },
  green: {
    id: 'green',
    name: 'Green',
    color: '#10b981',
    secondary: '#047857',
    glow: '#34d399',
  },
  orange: {
    id: 'orange',
    name: 'Orange',
    color: '#f97316',
    secondary: '#c2410c',
    glow: '#fb923c',
  },
  pink: {
    id: 'pink',
    name: 'Pink',
    color: '#ec4899',
    secondary: '#be185d',
    glow: '#f472b6',
  },
  cyan: {
    id: 'cyan',
    name: 'Cyan',
    color: '#06b6d4',
    secondary: '#0e7490',
    glow: '#22d3ee',
  },
}

// Convert any valid hex string to RGB object { r, g, b }
export function hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') return { r: 168, g: 85, b: 247 }
  let clean = hex.replace('#', '').trim()
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('')
  }
  if (clean.length !== 6) return { r: 168, g: 85, b: 247 }
  const num = parseInt(clean, 16)
  if (isNaN(num)) return { r: 168, g: 85, b: 247 }
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  }
}

// Calculate relative luminance to determine optimal text color over a given hex
export function getContrastColor(hex) {
  const { r, g, b } = hexToRgb(hex)
  // Standard perceived brightness formula
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 145 ? '#0f172a' : '#ffffff'
}

const ThemeContext = createContext({
  mode: 'system',
  effectiveMode: 'dark',
  accent: 'purple',
  customColor: '#8b5cf6',
  accentHex: '#a855f7',
  accentRgb: { r: 168, g: 85, b: 247 },
  contrastText: '#ffffff',
  setMode: () => {},
  setAccent: () => {},
  setCustomColor: () => {},
})

export function ThemeProvider({ children }) {
  // Initialize mode from localStorage (default: 'system')
  const [mode, setModeState] = useState(() => {
    try {
      return localStorage.getItem('theme-mode') || 'system'
    } catch {
      return 'system'
    }
  })

  // System preference media query state
  const [systemIsDark, setSystemIsDark] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Initialize accent from localStorage (default: 'purple')
  const [accent, setAccentState] = useState(() => {
    try {
      return localStorage.getItem('theme-accent') || 'purple'
    } catch {
      return 'purple'
    }
  })

  // Initialize custom accent color (default: '#8b5cf6')
  const [customColor, setCustomColorState] = useState(() => {
    try {
      return localStorage.getItem('theme-custom-accent') || '#8b5cf6'
    } catch {
      return '#8b5cf6'
    }
  })

  // Effective mode: if 'system', follow system preference; otherwise use explicit mode
  const effectiveMode = useMemo(() => {
    if (mode === 'system') {
      return systemIsDark ? 'dark' : 'light'
    }
    return mode === 'light' ? 'light' : 'dark'
  }, [mode, systemIsDark])

  // Compute active accent hex
  const accentHex = useMemo(() => {
    if (accent === 'custom') {
      return customColor.startsWith('#') ? customColor : `#${customColor}`
    }
    return ACCENT_PRESETS[accent]?.color || ACCENT_PRESETS.purple.color
  }, [accent, customColor])

  const accentRgb = useMemo(() => hexToRgb(accentHex), [accentHex])
  const contrastText = useMemo(() => getContrastColor(accentHex), [accentHex])

  // Listen to OS system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e) => setSystemIsDark(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Sync mode and effectiveMode with HTML class and localStorage
  const setMode = useCallback((newMode) => {
    setModeState(newMode)
    try {
      localStorage.setItem('theme-mode', newMode)
    } catch (e) {
      console.warn('Could not save theme-mode:', e)
    }
  }, [])

  // Sync accent with localStorage
  const setAccent = useCallback((newAccent) => {
    setAccentState(newAccent)
    try {
      localStorage.setItem('theme-accent', newAccent)
    } catch (e) {
      console.warn('Could not save theme-accent:', e)
    }
  }, [])

  // Sync custom color with localStorage
  const setCustomColor = useCallback((newColor) => {
    setCustomColorState(newColor)
    setAccentState('custom')
    try {
      localStorage.setItem('theme-custom-accent', newColor)
      localStorage.setItem('theme-accent', 'custom')
    } catch (e) {
      console.warn('Could not save custom accent:', e)
    }
  }, [])

  // Apply CSS variables and classes to <html> root whenever effectiveMode or accentHex changes
  useEffect(() => {
    const root = document.documentElement
    const { r, g, b } = accentRgb

    // 1. Class and dataset
    root.classList.remove('dark', 'light')
    root.classList.add(effectiveMode)
    root.dataset.theme = effectiveMode
    root.style.colorScheme = effectiveMode

    // 2. CSS variables for dynamic theme adaptation
    root.style.setProperty('--accent-color', accentHex)
    root.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`)
    root.style.setProperty('--accent-contrast-text', contrastText)
    root.style.setProperty('--accent-light', `rgba(${r}, ${g}, ${b}, 0.12)`)
    root.style.setProperty('--accent-border', `rgba(${r}, ${g}, ${b}, 0.28)`)
    root.style.setProperty('--accent-glow', `rgba(${r}, ${g}, ${b}, 0.25)`)
    root.style.setProperty(
      '--accent-gradient',
      `linear-gradient(135deg, ${accentHex}, rgba(${r}, ${g}, ${b}, 0.7))`
    )
  }, [effectiveMode, accentHex, accentRgb, contrastText])

  const contextValue = useMemo(
    () => ({
      mode,
      effectiveMode,
      accent,
      customColor,
      accentHex,
      accentRgb,
      contrastText,
      setMode,
      setAccent,
      setCustomColor,
    }),
    [
      mode,
      effectiveMode,
      accent,
      customColor,
      accentHex,
      accentRgb,
      contrastText,
      setMode,
      setAccent,
      setCustomColor,
    ]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

