import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'

export function ProjectCard({ project }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className="glass group relative overflow-hidden p-6"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-emerald-500/15 blur-2xl" />
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-amber-400/12 blur-2xl" />
      </div>

      <div className="relative">
        <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-2 text-sm text-white/70">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>

        {project.highlights?.length ? (
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-emerald-400/60" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.links?.live && project.links.live !== '#' ? (
            <a className="btn btn-primary" href={project.links.live} target="_blank" rel="noreferrer">
              Live <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
          {project.links?.code && project.links.code !== '#' ? (
            <a className="btn" href={project.links.code} target="_blank" rel="noreferrer">
              Code <Github className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}

