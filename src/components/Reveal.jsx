import { motion, useReducedMotion } from 'framer-motion'

export function Reveal({ children, className, delay = 0 }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14, filter: 'blur(6px)' }}
      whileInView={
        reduce
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, delay } }
      }
      viewport={{ once: true, margin: '-120px' }}
    >
      {children}
    </motion.div>
  )
}

