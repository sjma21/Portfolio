import { cn } from '../../lib/utils'

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35',
        'focus:border-cyan-300/35 focus:outline-none focus:ring-2 focus:ring-cyan-300/15',
        className,
      )}
      {...props}
    />
  )
}

