import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const raf = useRef(0)
  const target = useRef({ x: 0.5, y: 0.35 })
  const current = useRef({ x: 0.5, y: 0.35 })

  useEffect(() => {
    const el = document.documentElement

    const onMove = (e) => {
      target.current.x = e.clientX / window.innerWidth
      target.current.y = e.clientY / window.innerHeight
      if (raf.current) return
      raf.current = window.requestAnimationFrame(() => {
        raf.current = 0
        // smooth follow
        current.current.x += (target.current.x - current.current.x) * 0.18
        current.current.y += (target.current.y - current.current.y) * 0.18

        el.style.setProperty('--mx', `${(current.current.x * 100).toFixed(2)}%`)
        el.style.setProperty('--my', `${(current.current.y * 100).toFixed(2)}%`)
      })
    }

    // defaults
    el.style.setProperty('--mx', '50%')
    el.style.setProperty('--my', '35%')

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf.current) window.cancelAnimationFrame(raf.current)
    }
  }, [])

  return null
}

