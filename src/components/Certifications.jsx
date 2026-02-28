import { motion } from 'framer-motion'
import { ExternalLink, Maximize2 } from 'lucide-react'
import { useState } from 'react'
import { content } from '../content'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'

export function Certifications() {
  const certs = content.certifications ?? []
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certs.map((c) => (
          <motion.button
            key={c.title}
            type="button"
            onClick={() => {
              setActive(c)
              setOpen(true)
            }}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="glass group animated-border overflow-hidden text-left"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="h-44 w-full object-cover object-center opacity-[0.92] transition group-hover:opacity-100"
              />
              <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-ink-950/60 px-3 py-2 text-xs text-white/80 opacity-0 backdrop-blur transition group-hover:opacity-100">
                Preview <Maximize2 className="h-4 w-4" />
              </div>
            </div>

            <div className="p-6">
              <div className="chip w-fit">{c.date}</div>
              <h3 className="mt-3 text-balance text-lg font-semibold tracking-tight">
                {c.title}
              </h3>
              <p className="mt-2 text-sm muted">{c.issuer}</p>
              {c.note ? <p className="mt-3 text-xs subtle">{c.note}</p> : null}
            </div>
          </motion.button>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 overflow-hidden">
          {active ? (
            <div className="grid">
              <div className="relative">
                <img
                  src={active.image}
                  alt={active.title}
                  className="max-h-[75vh] w-full object-contain bg-black/40"
                />
              </div>
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle>{active.title}</DialogTitle>
                  <DialogDescription>
                    {active.issuer} • {active.date}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-4 flex flex-wrap gap-2">
                  <a className="btn btn-primary" href={active.image} target="_blank" rel="noreferrer">
                    Open image <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}

