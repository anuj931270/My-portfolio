import React, { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({
  target = 0,
  suffix = '',
  duration = 1400,
  className = '',
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setCount(target)
      return
    }

    if (!isInView) return

    let startTime = null
    let animationFrameId

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(easeProgress * target))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [isInView, target, duration])

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  )
}

