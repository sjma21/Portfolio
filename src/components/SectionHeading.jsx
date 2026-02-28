export function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <div className="chip mb-3 w-fit">
          <span className="h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
          <span className="uppercase tracking-wider">{eyebrow}</span>
        </div>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 max-w-2xl text-white/70">{subtitle}</p>}
    </div>
  )
}

