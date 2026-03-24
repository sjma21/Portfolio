import { useEffect, useRef } from 'react'

// Ring definitions — radius, angular speed (rad/ms), and techs with start angle + color
const RINGS = [
  {
    r: 68,
    speed: 0.00038,
    techs: [
      { label: 'React',   angle: 0,           color: '#61dafb' },
      { label: 'Next.js', angle: Math.PI,      color: '#e2e8f0' },
    ],
  },
  {
    r: 112,
    speed: 0.00022,
    techs: [
      { label: 'Go',       angle: Math.PI / 4,       color: '#00acd7' },
      { label: 'Node.js',  angle: Math.PI * 5 / 4,   color: '#68a063' },
      { label: 'Tailwind', angle: Math.PI * 3 / 4,   color: '#38bdf8' },
    ],
  },
  {
    r: 154,
    speed: 0.00013,
    techs: [
      { label: 'Solidity',   angle: 0,                color: '#a0aec0' },
      { label: 'EVM',        angle: Math.PI * 2 / 3,  color: '#10b981' },
      { label: 'TypeScript', angle: Math.PI / 3,      color: '#3b82f6' },
      { label: 'MERN',       angle: Math.PI * 4 / 3,  color: '#f6ad55' },
    ],
  },
]

const NODES = RINGS.flatMap(ring =>
  ring.techs.map(tech => ({ ...tech, r: ring.r, speed: ring.speed }))
)

const SIZE = 340
const CENTER = SIZE / 2

export function TechOrbit() {
  const nodeRefs = useRef([])
  const anglesRef = useRef(NODES.map(n => n.angle))
  const rafRef = useRef(null)
  const lastRef = useRef(null)

  useEffect(() => {
    function frame(ts) {
      if (lastRef.current === null) lastRef.current = ts
      const dt = Math.min(ts - lastRef.current, 50)
      lastRef.current = ts

      anglesRef.current = anglesRef.current.map((a, i) => a + NODES[i].speed * dt)

      anglesRef.current.forEach((a, i) => {
        const el = nodeRefs.current[i]
        if (!el) return
        const x = CENTER + Math.cos(a) * NODES[i].r
        const y = CENTER + Math.sin(a) * NODES[i].r
        el.style.left = `${x}px`
        el.style.top = `${y}px`
      })

      rafRef.current = requestAnimationFrame(frame)
    }

    rafRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="flex items-center justify-center py-4">
      <div className="relative select-none" style={{ width: SIZE, height: SIZE }}>

        {/* Orbit rings */}
        {RINGS.map(({ r }) => (
          <div
            key={r}
            className="absolute rounded-full border border-emerald-500/10"
            style={{ width: r * 2, height: r * 2, top: CENTER - r, left: CENTER - r }}
          />
        ))}

        {/* Subtle radial glow from center */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 200,
            height: 200,
            top: CENTER - 100,
            left: CENTER - 100,
            background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Core node */}
        <div
          className="absolute flex flex-col items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm"
          style={{
            width: 52,
            height: 52,
            top: CENTER - 26,
            left: CENTER - 26,
            boxShadow: '0 0 28px rgba(16,185,129,0.22)',
          }}
        >
          <span className="text-[11px] font-bold font-mono text-emerald-400 leading-none">SM</span>
          <span className="text-[7px] font-mono text-emerald-400/50 mt-0.5 leading-none">dev</span>
        </div>

        {/* Tech nodes — positioned via direct DOM in rAF */}
        {NODES.map((node, i) => (
          <div
            key={node.label}
            ref={el => { nodeRefs.current[i] = el }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 py-0.5 text-[9px] font-mono whitespace-nowrap backdrop-blur-sm"
            style={{
              left: CENTER + Math.cos(node.angle) * node.r,
              top: CENTER + Math.sin(node.angle) * node.r,
              borderColor: `${node.color}40`,
              backgroundColor: `${node.color}14`,
              color: node.color,
              boxShadow: `0 0 8px ${node.color}38`,
            }}
          >
            {node.label}
          </div>
        ))}
      </div>
    </div>
  )
}
