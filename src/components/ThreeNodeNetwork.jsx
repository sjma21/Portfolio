import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return
    const onChange = () => setReduced(Boolean(mq.matches))
    onChange()
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  return reduced
}

function usePointer() {
  const ref = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      ref.current.x = x
      ref.current.y = y
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return ref
}

function NodeField({ count = 70 }) {
  const group = useRef(null)
  const pointer = usePointer()
  const lineMat = useRef(null)
  const pointMat = useRef(null)

  const { nodes, nodePositions, segmentPositions } = useMemo(() => {
    const pts = []
    for (let i = 0; i < count; i++) {
      // a flattened "space sheet" with depth
      const x = (Math.random() - 0.5) * 7.2
      const y = (Math.random() - 0.5) * 4.6
      const z = (Math.random() - 0.5) * 2.2
      pts.push(new THREE.Vector3(x, y, z))
    }

    const nodePositions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      nodePositions[i * 3 + 0] = pts[i].x
      nodePositions[i * 3 + 1] = pts[i].y
      nodePositions[i * 3 + 2] = pts[i].z
    }

    const segments = []
    const threshold = 1.55
    const threshold2 = threshold * threshold
    let maxSegments = 220
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (maxSegments <= 0) break
        const d2 = pts[i].distanceToSquared(pts[j])
        if (d2 < threshold2) {
          segments.push(pts[i].x, pts[i].y, pts[i].z)
          segments.push(pts[j].x, pts[j].y, pts[j].z)
          maxSegments--
        }
      }
      if (maxSegments <= 0) break
    }

    const segmentPositions = new Float32Array(segments)
    return { nodes: pts, nodePositions, segmentPositions }
  }, [count])

  const linesGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(segmentPositions, 3))
    return g
  }, [segmentPositions])

  const pointsGeo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3))
    return g
  }, [nodePositions])

  const [theme, setTheme] = useState(
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )

  useEffect(() => {
    const root = document.documentElement
    const obs = new MutationObserver(() => {
      setTheme(root.classList.contains('dark') ? 'dark' : 'light')
    })
    obs.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const colors = useMemo(() => {
    // tuned for both modes; light mode is softer
    const cyan = new THREE.Color('#22d3ee')
    const violet = new THREE.Color('#a855f7')
    const line = theme === 'dark' ? cyan : new THREE.Color('#0ea5e9')
    const point = theme === 'dark' ? violet : new THREE.Color('#6366f1')
    return { line, point }
  }, [theme])

  useFrame(({ clock }, delta) => {
    if (!group.current) return
    const t = clock.getElapsedTime()

    const px = pointer.current.x
    const py = pointer.current.y
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      t * 0.035 + px * 0.15,
      1 - Math.exp(-delta * 2.2),
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -py * 0.12,
      1 - Math.exp(-delta * 2.2),
    )

    // twinkle (cheap but effective)
    if (pointMat.current) {
      pointMat.current.size = 0.045 + Math.sin(t * 1.25) * 0.005
      pointMat.current.opacity = (theme === 'dark' ? 0.85 : 0.55) + Math.sin(t * 0.9) * 0.06
    }
    if (lineMat.current) {
      const base = theme === 'dark' ? 0.16 : 0.1
      lineMat.current.opacity = base + Math.sin(t * 0.7) * 0.025
    }
  })

  return (
    <group ref={group}>
      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial
          ref={lineMat}
          color={colors.line}
          transparent
          opacity={theme === 'dark' ? 0.16 : 0.10}
        />
      </lineSegments>

      <points geometry={pointsGeo}>
        <pointsMaterial
          ref={pointMat}
          color={colors.point}
          size={0.045}
          sizeAttenuation
          transparent
          opacity={theme === 'dark' ? 0.85 : 0.55}
        />
      </points>
    </group>
  )
}

export default function ThreeNodeNetwork() {
  const reduce = usePrefersReducedMotion()
  const [ok, setOk] = useState(false)

  useEffect(() => {
    // guard: skip on reduced motion
    if (reduce) return
    // guard: skip if WebGL is not available
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setOk(Boolean(gl))
    } catch {
      setOk(false)
    }
  }, [reduce])

  if (!ok) return null

  return (
    <Canvas
      dpr={[1, 1.4]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.6} />
      <NodeField />
    </Canvas>
  )
}

