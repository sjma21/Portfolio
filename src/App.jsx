import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ArrowUpRight,
  BadgeCheck,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Twitter,
} from 'lucide-react'
import { Background } from './components/Background'
import { ContactCard } from './components/ContactCard'
import { CursorGlow } from './components/CursorGlow'
import { ExperienceItem } from './components/ExperienceItem'
import { Nav } from './components/Nav'
import { ProjectCard } from './components/ProjectCard'
import { Reveal } from './components/Reveal'
import { ScrollProgress } from './components/ScrollProgress'
import { SectionHeading } from './components/SectionHeading'
import { SkillGroup } from './components/SkillGroup'
import { Certifications } from './components/Certifications'
import { BlockchainBlocks } from './components/BlockchainBlocks'
import { HashScrambler } from './components/HashScrambler'
import { TxTicker } from './components/TxTicker'
import { GasTracker } from './components/GasTracker'
import { TechOrbit } from './components/TechOrbit'
import { content } from './content'

function Section({ id, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-14 sm:py-20">
      <div className="container-max">{children}</div>
    </section>
  )
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60" />
      {children}
    </span>
  )
}

export default function App() {
  const reduce = useReducedMotion()
  const [showTop, setShowTop] = useState(false)

  const socials = useMemo(
    () => [
      {
        label: 'GitHub',
        href: content.links.github,
        icon: <Github className="h-4 w-4" />,
      },
      {
        label: 'LinkedIn',
        href: content.links.linkedin,
        icon: <Linkedin className="h-4 w-4" />,
      },
      {
        label: 'WhatsApp',
        href: content.links.whatsapp,
        icon: <MessageCircle className="h-4 w-4" />,
      },
      {
        label: 'Instagram',
        href: content.links.instagram,
        icon: <Instagram className="h-4 w-4" />,
      },
      {
        label: 'Twitter/X',
        href: content.links.twitter,
        icon: <Twitter className="h-4 w-4" />,
      },
      {
        label: 'Email',
        href: `mailto:${content.links.email}`,
        icon: <Mail className="h-4 w-4" />,
      },
    ],
    [],
  )

  useEffect(() => {
    document.title = content.meta.title

    function onScroll() {
      setShowTop(window.scrollY > 900)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div id="top" className="min-h-dvh">
      <CursorGlow />
      <ScrollProgress />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-ink-950"
      >
        Skip to content
      </a>

      <Background />
      <Nav />

      <main>
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="container-max">
            <div className="grid items-start gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <div className="flex flex-wrap gap-2">
                    <Pill>{content.person.role}</Pill>
                    <Pill>{content.person.location}</Pill>
                    {content.person.availability ? (
                      <Pill>{content.person.availability}</Pill>
                    ) : null}
                  </div>

                  <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                    <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span>{content.person.name}</span>
                      {content.person.verified ? (
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
                          <BadgeCheck className="h-4 w-4 text-emerald-400" />
                          Verified
                        </span>
                      ) : null}
                    </span>
                    <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                      {content.meta.tagline}
                    </span>
                  </h1>

                  <div className="mt-3">
                    <HashScrambler className="text-[11px]" />
                  </div>

                  <p className="mt-4 max-w-2xl text-lg text-white/70">
                    {content.person.summary}
                  </p>

                  {content.person.headline ? (
                    <p className="mt-4 max-w-2xl text-sm text-white/60">
                      {content.person.headline}
                    </p>
                  ) : null}

                  <div className="mt-8 flex flex-wrap gap-3">
                    <a className="btn btn-primary" href="#projects">
                      View projects <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <a className="btn" href={`mailto:${content.links.email}`}>
                      Email <Mail className="h-4 w-4" />
                    </a>
                    {content.links.resume && content.links.resume !== '#' ? (
                      <a className="btn" href={content.links.resume} target="_blank" rel="noreferrer">
                        Resume <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>

                  <div className="mt-10 grid gap-3 sm:grid-cols-3">
                    {content.stats.map((s) => (
                      <div key={s.title} className="glass p-5">
                        <div className="text-xl font-semibold tracking-tight sm:text-2xl">
                          {s.title}
                        </div>
                        {s.subtitle ? (
                          <div className="mt-1 text-sm text-white/70">{s.subtitle}</div>
                        ) : null}
                        {s.description ? (
                          <div className="mt-3 text-sm text-white/60">{s.description}</div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-5">
                <Reveal delay={0.05}>
                  <div className="space-y-4">
                  <div className="glass relative overflow-hidden p-6">
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-emerald-500/12 blur-3xl" />
                      <div className="absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
                    </div>

                    <div className="relative">
                      <div className="chip w-fit border-emerald-500/20 bg-emerald-500/8 text-emerald-300">What I do</div>
                      <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                        Build. Chain. Scale.
                      </h2>
                      <p className="mt-2 text-sm text-white/70">
                        On-chain logic underneath. High-impact interfaces on top.
                        I care about how it feels and how it scales.
                      </p>

                      <div className="mt-5 grid gap-2">
                        {content.person.highlights.map((h) => (
                          <div
                            key={h}
                            className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
                          >
                            <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {socials
                          .filter((s) => s.href && s.href !== '#')
                          .map((s) => (
                            <a
                              key={s.label}
                              className="btn"
                              href={s.href}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={s.label}
                              title={s.label}
                            >
                              {s.icon}
                              <span className="text-sm">{s.label}</span>
                            </a>
                          ))}
                      </div>
                    </div>
                  </div>
                  <GasTracker />
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Live Ethereum blockchain visualization */}
            <div className="mt-12">
              <BlockchainBlocks />
            </div>

            {/* Transaction ticker */}
            <div className="mt-6">
              <TxTicker />
            </div>

            {!reduce ? (
              <motion.div
                aria-hidden="true"
                className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              />
            ) : (
              <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent" />
            )}
          </div>
        </section>

        <Section id="about">
          <Reveal>
            <SectionHeading
              eyebrow="About"
              title="Hello there! I’m Sajal."
              subtitle="Final-year B.Tech student building across full-stack, scalable backend systems, and blockchain."
            />

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="glass p-6 lg:col-span-2">
                <h3 className="text-xl font-semibold tracking-tight">My story</h3>
                <div className="mt-3 space-y-4 text-sm text-white/70">
                  {(content.person.about ?? []).map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-5">
                    <div className="chip w-fit border-emerald-500/20 bg-emerald-500/8 text-emerald-300">Frontend</div>
                    <p className="mt-3 text-sm text-white/70">
                      Dynamic, performant interfaces with React.js and Next.js.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-cyan-500/15 bg-cyan-500/5 p-5">
                    <div className="chip w-fit border-cyan-500/20 bg-cyan-500/8 text-cyan-300">Backend</div>
                    <p className="mt-3 text-sm text-white/70">
                      Scalable systems and APIs — especially with Go (Golang).
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass overflow-hidden">
                {content.person.avatar ? (
                  <div className="relative">
                    <img
                      src={content.person.avatar}
                      alt={`${content.person.name} profile photo`}
                      className="h-56 w-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 chip">
                      {content.person.name}
                    </div>
                  </div>
                ) : null}

                <div className="p-6">
                  <h3 className="text-xl font-semibold tracking-tight">Quick facts</h3>
                  <div className="mt-4 grid gap-3 text-sm muted">
                    <div className="flex items-center justify-between gap-4">
                      <span>Web</span>
                      <span className="text-white/90">MERN • Next.js</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Backend</span>
                      <span className="text-white/90">Go • Node</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Core</span>
                      <span className="text-white/90">DSA • System design</span>
                    </div>
                  </div>
                  <div className="mt-5 h-px bg-white/10" />
                  <p className="mt-5 text-sm muted">
                    Deeply interested in decentralized systems and emerging technologies.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>

        <Section id="projects">
          <Reveal>
            <SectionHeading
              eyebrow="Work"
              title="Selected projects"
              subtitle="A few builds that show range — clean UI, strong UX, and sharp engineering."
            />

            <div className="space-y-10">
              <div>
                <div className="mb-4 flex items-end justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-tight">Personal projects</h3>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                  {(content.projects?.personal ?? []).map((p) => (
                    <ProjectCard key={`personal-${p.title}`} project={p} />
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-end justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-tight">Organisation projects</h3>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                  {(content.projects?.organisation ?? []).map((p) => (
                    <ProjectCard key={`org-${p.title}`} project={p} />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Section>

        <Section id="skills">
          <Reveal>
            <SectionHeading
              eyebrow="Skills"
              title="Tools I use to ship"
              subtitle="Modern frontend, practical backend, and engineering habits that keep things maintainable."
            />
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-none">
                <TechOrbit />
              </div>
              <div className="flex-1 grid gap-4 sm:grid-cols-2 w-full">
                {content.skills.map((g) => (
                  <SkillGroup key={g.group} group={g} />
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        <Section id="certifications">
          <Reveal>
            <SectionHeading
              eyebrow="Credentials"
              title="Certifications & publications"
              subtitle="A few milestones and proofs of work — click any card to preview the certificate."
            />
            <Certifications />
          </Reveal>
        </Section>

        <Section id="experience">
          <Reveal>
            <SectionHeading
              eyebrow="Experience"
              title="Where I’ve done the work"
              subtitle="Impact-focused roles with an emphasis on shipping and polish."
            />

            <div className="relative">
              <div className="absolute left-[5px] top-2 h-full w-px bg-gradient-to-b from-emerald-500/30 via-teal-500/20 to-transparent" />
              <div className="grid gap-6">
                {content.experience.map((e) => (
                  <ExperienceItem key={`${e.title}-${e.company}`} item={e} />
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        <Section id="contact">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Let’s build something loud."
              subtitle="Send a message, or just copy the email. No friction."
            />
            <ContactCard />
          </Reveal>
        </Section>

        <footer className="border-t border-emerald-500/15 py-12">
          <div className="container-max">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="font-display text-lg font-semibold tracking-tight">
                  {content.person.name}
                </div>
                <div className="mt-1 text-sm text-white/60">
                  {content.person.role} • {content.person.location}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {socials
                  .filter((s) => s.href && s.href !== '#')
                  .map((s) => (
                    <a
                      key={s.label}
                      className="btn"
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {s.icon} {s.label}
                    </a>
                  ))}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs text-white/50">
              <span className="font-mono text-emerald-500/60">⬡</span>
              Built with React + Tailwind • © {new Date().getFullYear()}
            </div>
          </div>
        </footer>
      </main>

      {showTop ? (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-5 right-5 z-50 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300 shadow-glow backdrop-blur-xl transition hover:bg-emerald-500/20"
          aria-label="Scroll to top"
        >
          ↑ Top
        </button>
      ) : null}
    </div>
  )
}
