export function ExperienceItem({ item }) {
  return (
    <div className="relative pl-8">
      <div className="absolute left-0 top-2 h-3 w-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" style={{ boxShadow: '0 0 8px rgba(16,185,129,0.5)' }} />
      <div className="glass p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold tracking-tight">
            {item.title}{' '}
            <span className="text-white/50 font-normal">— {item.company}</span>
          </h3>
          <span className="chip">{item.period}</span>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-white/70">
          {item.points.map((p) => (
            <li key={p} className="flex gap-2">
              <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-emerald-400/50" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

