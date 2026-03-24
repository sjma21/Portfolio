import { useMemo, useState } from 'react'
import { ArrowUpRight, BadgeCheck, Menu, X } from 'lucide-react'
import { content } from '../content'
import { cx } from '../lib/cx'
import { useActiveSection } from '../lib/useActiveSection'

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function Nav() {
  const links = useMemo(
    () => [
      { id: 'about', label: 'About' },
      { id: 'projects', label: 'Projects' },
      { id: 'skills', label: 'Skills' },
      { id: 'certifications', label: 'Certifications' },
      { id: 'experience', label: 'Experience' },
      { id: 'contact', label: 'Contact' },
    ],
    [],
  )

  const active = useActiveSection(links.map((l) => l.id))
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-500/15 bg-ink-950/70 backdrop-blur-xl">
      <div className="container-max flex h-16 items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToId('top')}
          className="group inline-flex items-center gap-2 font-display text-sm tracking-wide text-white/90"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/30 transition group-hover:bg-emerald-500/25 text-emerald-400">
            ⬡
          </span>
          <span className="hidden items-center gap-2 sm:inline-flex">
            <span>{content.person.name}</span>
            {content.person.verified ? (
              <BadgeCheck className="h-4 w-4 text-cyan-300" aria-label="Verified" />
            ) : null}
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => scrollToId(l.id)}
              className={cx(
                'rounded-xl px-3 py-2 text-sm text-white/70 transition hover:bg-emerald-500/8 hover:text-emerald-300',
                active === l.id && 'bg-emerald-500/12 text-emerald-300 ring-1 ring-emerald-500/20',
              )}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {content.links.github && content.links.github !== '#' ? (
            <a
              className="btn"
              href={content.links.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
          {content.links.resume && content.links.resume !== '#' ? (
            <a className="btn" href={content.links.resume} target="_blank" rel="noreferrer">
              Resume <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}
          <a
            className="btn btn-primary"
            href={`mailto:${content.links.email}`}
            title="Send an email"
          >
            Let’s build <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          className="btn md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="container-max grid gap-2 pb-4">
            <div className="glass p-2">
              {links.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    scrollToId(l.id)
                  }}
                  className={cx(
                    'flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm text-white/75 hover:bg-emerald-500/8 hover:text-emerald-300',
                    active === l.id && 'bg-emerald-500/12 text-emerald-300',
                  )}
                >
                  <span>{l.label}</span>
                  <span className="text-white/40">↳</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              {content.links.github && content.links.github !== '#' ? (
                <a
                  className="btn"
                  href={content.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <span className="btn opacity-60">Add GitHub link</span>
              )}
              {content.links.resume && content.links.resume !== '#' ? (
                <a className="btn" href={content.links.resume} target="_blank" rel="noreferrer">
                  Resume <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <a className="btn btn-primary" href={`mailto:${content.links.email}`}>
                  Let’s build <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

