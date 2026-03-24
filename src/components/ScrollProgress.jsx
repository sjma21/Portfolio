import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 22, mass: 0.2 })

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[80] h-1">
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500"
        style={{ scaleX }}
      />
      <div className="h-px w-full bg-white/10" />
    </div>
  )
}

