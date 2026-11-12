import React, { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Float } from '@react-three/drei'
import { useTheme } from '../context/ThemeContext'
import { getSkillMeta } from '../data/skillsConfig'

/**
 * A single interactive skill node positioned on the 3D spherical cloud
 */
function SkillNode({ position, name, onHover, isHovered }) {
  const meta = getSkillMeta(name)
  const IconComponent = meta.icon
  const { effectiveMode } = useTheme()
  const isLightMode = effectiveMode === 'light'

  return (
    <group position={position}>
      <Html center distanceFactor={7.5} zIndexRange={[100, 0]}>
        <div
          onMouseEnter={() => onHover(name)}
          onMouseLeave={() => onHover(null)}
          className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 select-none cursor-pointer backdrop-blur-md shadow-lg ${
            isHovered
              ? 'scale-125 z-50 ring-2'
              : 'hover:scale-110'
          }`}
          style={{
            backgroundColor: isHovered
              ? `${meta.color}22`
              : isLightMode
              ? 'rgba(255, 255, 255, 0.92)'
              : 'rgba(15, 23, 42, 0.88)',
            borderColor: isHovered ? meta.color : isLightMode ? '#e2e8f0' : 'rgba(255,255,255,0.12)',
            boxShadow: isHovered ? `0 0 20px ${meta.color}66` : '0 4px 12px rgba(0,0,0,0.15)',
            transform: isHovered ? 'scale(1.2)' : undefined,
          }}
        >
          {/* Official Icon */}
          <span
            className="w-4 h-4 flex items-center justify-center shrink-0 transition-colors duration-200"
            style={{
              color: isHovered ? meta.color : isLightMode ? '#334155' : '#e2e8f0',
            }}
          >
            <IconComponent className="w-4 h-4" />
          </span>

          {/* Skill Name */}
          <span
            className="text-xs font-semibold whitespace-nowrap transition-colors duration-200"
            style={{
              color: isHovered ? meta.color : isLightMode ? '#1e293b' : '#f8fafc',
            }}
          >
            {name}
          </span>
        </div>
      </Html>
    </group>
  )
}

/**
 * 3D Rotating Sphere Cloud containing skills distributed on a Fibonacci sphere
 */
function SphereGroup({ skillsList, activeSkill, setActiveSkill }) {
  const groupRef = useRef(null)
  const { accentHex, effectiveMode } = useTheme()
  const isLightMode = effectiveMode === 'light'

  // Fibonacci sphere point distribution
  const nodes = useMemo(() => {
    const list = skillsList.slice(0, 48) // optimal density for 3D visibility
    const count = list.length
    const radius = 3.6
    const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle in radians

    return list.map((name, i) => {
      const y = 1 - (i / (count - 1)) * 2 // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y) // radius at y
      const theta = phi * i // golden angle increment

      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY

      return {
        name,
        position: [x * radius, y * radius, z * radius],
      }
    })
  }, [skillsList])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // If a skill is hovered, slow rotation for easier inspection
    const rotationMultiplier = activeSkill ? 0.2 : 1.0

    // Smooth inertia and cursor-influenced rotation
    const targetRotX = -state.pointer.y * 0.35
    const targetRotY = state.pointer.x * 0.45 + state.clock.getElapsedTime() * 0.12 * rotationMultiplier

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.04
    )
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.04
    )
  })

  return (
    <group ref={groupRef}>
      {/* Subtle Central Wireframe Core Sphere */}
      <mesh scale={2.8}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color={accentHex}
          wireframe
          transparent
          opacity={isLightMode ? 0.08 : 0.12}
        />
      </mesh>

      {/* 3D Skill Nodes */}
      {nodes.map(({ name, position }) => (
        <SkillNode
          key={name}
          name={name}
          position={position}
          onHover={setActiveSkill}
          isHovered={activeSkill === name}
        />
      ))}
    </group>
  )
}

export default function SkillsSphere({ skills = [] }) {
  const [activeSkill, setActiveSkill] = useState(null)
  const { accentHex, effectiveMode } = useTheme()
  const isLightMode = effectiveMode === 'light'

  // Extract flat list of skill names from input
  const skillsList = useMemo(() => {
    if (!skills || skills.length === 0) return []
    if (typeof skills[0] === 'string') return skills
    // If passed categories array from portfolioData
    return skills.flatMap((c) => c.skills || [])
  }, [skills])

  const hoveredMeta = activeSkill ? getSkillMeta(activeSkill) : null

  return (
    <div className="w-full h-[450px] sm:h-[520px] md:h-[580px] relative rounded-3xl border border-theme bg-theme-card/60 backdrop-blur-md overflow-hidden shadow-xl">
      {/* Active Hover Tooltip Card Banner */}
      <div className="absolute top-4 left-4 right-4 z-20 pointer-events-none flex justify-center">
        {hoveredMeta ? (
          <div
            className="px-5 py-2.5 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 max-w-md text-center flex items-center gap-3 animate-fade-in"
            style={{
              backgroundColor: isLightMode ? 'rgba(255,255,255,0.95)' : 'rgba(15,23,42,0.95)',
              borderColor: hoveredMeta.color,
              boxShadow: `0 8px 30px ${hoveredMeta.color}40`,
            }}
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${hoveredMeta.color}22`, color: hoveredMeta.color }}
            >
              {React.createElement(hoveredMeta.icon, { className: 'w-5 h-5' })}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-theme-primary">{activeSkill}</span>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${hoveredMeta.color}22`,
                    color: hoveredMeta.color,
                  }}
                >
                  {hoveredMeta.category}
                </span>
              </div>
              <p className="text-xs text-theme-secondary line-clamp-2 mt-0.5">
                {hoveredMeta.description}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-xs text-theme-muted font-mono bg-theme-nav-inner/80 px-3.5 py-1.5 rounded-full border border-theme backdrop-blur">
            Hover an icon to inspect &bull; Drag to rotate 3D sphere
          </div>
        )}
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={isLightMode ? 1.2 : 0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color={accentHex} />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#ffffff" />

        <SphereGroup
          skillsList={skillsList}
          activeSkill={activeSkill}
          setActiveSkill={setActiveSkill}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.65}
          autoRotate={false}
        />
      </Canvas>

      {/* Corner Hint */}
      <div className="absolute bottom-3 right-4 z-10 pointer-events-none text-[11px] font-mono text-theme-muted">
        3D Interactive Sphere Cloud &bull; {skillsList.length} Technologies
      </div>
    </div>
  )
}
