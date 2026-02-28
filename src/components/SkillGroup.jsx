export function SkillGroup({ group }) {
  return (
    <div className="glass p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight">{group.group}</h3>
        <span className="chip">{group.items.length} skills</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {group.items.map((s) => (
          <span
            key={s}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

