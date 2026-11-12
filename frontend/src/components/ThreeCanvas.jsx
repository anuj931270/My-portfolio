import React, { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import { useTheme } from '../context/ThemeContext'

/**
 * Rotating Neural Network with connected nodes and synapses.
 * Reacts dynamically to mouse coordinates with smooth damping,
 * and dynamically shifts color palette based on theme mode & accent.
 */
function NeuralNetwork({ isMobile, accentHex, isLightMode }) {
  const groupRef = useRef(null)
  const pointsGeometryRef = useRef(null)
  const linesGeometryRef = useRef(null)

  // Lightweight on mobile: 28 nodes; 65 nodes on desktop
  const nodeCount = isMobile ? 28 : 65
  const maxDistance = isMobile ? 1.3 : 1.45

  // Generate node positions and random gentle drift velocities
  const [nodes, velocities] = useMemo(() => {
    const coords = new Float32Array(nodeCount * 3)
    const vels = []
    const radius = 2.05

    for (let i = 0; i < nodeCount; i++) {
      // Distribute points pseudo-uniformly in a spherical cloud
      const phi = Math.acos(-1 + (2 * i) / nodeCount)
      const theta = Math.sqrt(nodeCount * Math.PI) * phi
      const r = radius * (0.45 + 0.55 * Math.random())

      coords[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      coords[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      coords[i * 3 + 2] = r * Math.cos(phi)

      vels.push({
        x: (Math.random() - 0.5) * 0.004,
        y: (Math.random() - 0.5) * 0.004,
        z: (Math.random() - 0.5) * 0.004,
      })
    }
    return [coords, vels]
  }, [nodeCount])

  // Pre-allocate buffer for maximum potential lines to prevent runtime allocations
  const maxPossibleLines = (nodeCount * (nodeCount - 1)) / 2
  const linePositions = useMemo(() => new Float32Array(maxPossibleLines * 6), [maxPossibleLines])

  useFrame((state) => {
    if (!groupRef.current) return

    // 1. Mouse Reaction & Rotation
    // state.pointer has normalized coordinates between -1 and 1
    const targetRotX = -state.pointer.y * 0.45
    const targetRotY = state.pointer.x * 0.55 + state.clock.getElapsedTime() * 0.14

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.05
    )
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.05
    )

    // Subtle breathing float on Y
    groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.9) * 0.06

    // 2. Animate nodes slightly within spherical bounds
    const pos = nodes
    for (let i = 0; i < nodeCount; i++) {
      const idx = i * 3
      pos[idx] += velocities[i].x
      pos[idx + 1] += velocities[i].y
      pos[idx + 2] += velocities[i].z

      // Soft bounce if moving outside spherical boundary
      const distSq = pos[idx] ** 2 + pos[idx + 1] ** 2 + pos[idx + 2] ** 2
      if (distSq > 5.8) {
        velocities[i].x *= -1
        velocities[i].y *= -1
        velocities[i].z *= -1
      }
    }

    if (pointsGeometryRef.current) {
      pointsGeometryRef.current.attributes.position.needsUpdate = true
    }

    // 3. Rebuild synaptic line segments between nodes within proximity
    let lineVertexIndex = 0
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < maxDistance) {
          linePositions[lineVertexIndex++] = pos[i * 3]
          linePositions[lineVertexIndex++] = pos[i * 3 + 1]
          linePositions[lineVertexIndex++] = pos[i * 3 + 2]

          linePositions[lineVertexIndex++] = pos[j * 3]
          linePositions[lineVertexIndex++] = pos[j * 3 + 1]
          linePositions[lineVertexIndex++] = pos[j * 3 + 2]
        }
      }
    }

    if (linesGeometryRef.current) {
      linesGeometryRef.current.setDrawRange(0, lineVertexIndex / 3)
      linesGeometryRef.current.attributes.position.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      {/* 3D Neural Nodes */}
      <points>
        <bufferGeometry ref={pointsGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={nodes.length / 3}
            array={nodes}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.088 : 0.098}
          color={accentHex}
          transparent
          opacity={isLightMode ? 0.95 : 0.88}
          sizeAttenuation
        />
      </points>

      {/* 3D Neural Connections */}
      <lineSegments>
        <bufferGeometry ref={linesGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={accentHex}
          transparent
          opacity={isLightMode ? 0.58 : 0.38}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

/**
 * Geometric floating shapes inside and around the neural network
 */
function FloatingShapes({ isMobile, accentHex, isLightMode }) {
  const coreRef = useRef(null)

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.2
      coreRef.current.rotation.y += delta * 0.25
    }
  })

  return (
    <>
      {/* Central Core Wireframe Icosahedron */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh ref={coreRef} scale={isMobile ? 0.8 : 0.95}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={accentHex}
            wireframe
            roughness={isLightMode ? 0.3 : 0.15}
            metalness={0.85}
            emissive={accentHex}
            emissiveIntensity={isLightMode ? 0.45 : 0.75}
          />
        </mesh>
      </Float>

      {/* Additional floating satellite shapes - Rendered on Desktop / Tablet only */}
      {!isMobile && (
        <>
          <Float speed={3} rotationIntensity={1.4} floatIntensity={1.4} position={[2.1, 1.2, -0.8]}>
            <mesh scale={0.28}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color={accentHex}
                wireframe
                emissive={accentHex}
                emissiveIntensity={isLightMode ? 0.5 : 0.8}
              />
            </mesh>
          </Float>

          <Float speed={2.4} rotationIntensity={1.2} floatIntensity={1.3} position={[-2.0, -1.2, 0.6]}>
            <mesh scale={0.26}>
              <dodecahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color={accentHex}
                wireframe
                emissive={accentHex}
                emissiveIntensity={isLightMode ? 0.5 : 0.8}
              />
            </mesh>
          </Float>

          <Float speed={2.8} rotationIntensity={1.3} floatIntensity={1.5} position={[-1.7, 1.5, -0.6]}>
            <mesh scale={0.22}>
              <tetrahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color={accentHex}
                wireframe
                emissive={accentHex}
                emissiveIntensity={isLightMode ? 0.5 : 0.8}
              />
            </mesh>
          </Float>
        </>
      )}
    </>
  )
}

export default function ThreeCanvas() {
  const [isMobile, setIsMobile] = useState(false)
  const { accentHex, effectiveMode } = useTheme()
  const isLightMode = effectiveMode === 'light'

  // Detect small screens to reduce 3D objects and optimize mobile performance
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  return (
    <div className="w-full h-[320px] sm:h-[380px] md:h-[440px] relative select-none">
      <Canvas
        camera={{ position: [0, 0, 4.3], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={isLightMode ? 1.1 : 0.75} />
        <directionalLight position={[10, 10, 5]} intensity={1.6} color={accentHex} />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color={accentHex} />
        <pointLight position={[0, 4, -4]} intensity={0.9} color={accentHex} />

        {/* Neural Network Plexus with mouse reaction */}
        <NeuralNetwork isMobile={isMobile} accentHex={accentHex} isLightMode={isLightMode} />

        {/* Floating geometric shapes (adaptive complexity) */}
        <FloatingShapes isMobile={isMobile} accentHex={accentHex} isLightMode={isLightMode} />

        {/* Orbit controls for manual interaction */}
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>

      {/* Floating UI Badge */}
      <div
        className="absolute bottom-3 right-3 text-[11px] font-mono px-3 py-1 rounded-full border backdrop-blur pointer-events-none flex items-center gap-1.5 shadow-md transition-colors"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
          color: 'var(--text-secondary)',
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-ping"
          style={{ backgroundColor: accentHex }}
        />
        <span>Neural Mesh &bull; Moves with cursor</span>
      </div>
    </div>
  )
}
