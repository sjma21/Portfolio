import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur-xl',
  {
    variants: {
      variant: {
        default: 'border-white/10 bg-white/5 text-white/80',
        neon: 'border-cyan-300/25 bg-cyan-300/10 text-cyan-100',
        violet: 'border-violet-300/25 bg-violet-300/10 text-violet-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />
}

export { Badge, badgeVariants }

