import { useMemo, useState } from 'react'
import { Copy, Linkedin, Mail, MessageCircle, Send } from 'lucide-react'
import { content } from '../content'

function buildMailto({ name, email, message }) {
  const subject = `Portfolio inquiry — ${name || 'Hello'}`
  const body = [
    `Name: ${name || ''}`,
    `Email: ${email || ''}`,
    '',
    message || '',
  ].join('\n')

  const href = `mailto:${content.links.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`
  return href
}

export function ContactCard() {
  const [copied, setCopied] = useState(false)
  const [phoneCopied, setPhoneCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const mailto = useMemo(() => buildMailto(form), [form])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(content.links.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      // ignore
    }
  }

  async function copyPhone() {
    try {
      if (!content.links.phone) return
      await navigator.clipboard.writeText(content.links.phone)
      setPhoneCopied(true)
      window.setTimeout(() => setPhoneCopied(false), 1400)
    } catch {
      // ignore
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="glass p-6 lg:col-span-2">
        <h3 className="text-xl font-semibold tracking-tight">Let’s talk.</h3>
        <p className="mt-2 text-sm text-white/70">
          If you want something that looks expensive, feels fast, and ships on time — I’m in.
        </p>

        <div className="mt-5 grid gap-2">
          <a className="btn btn-primary w-full" href={`mailto:${content.links.email}`}>
            Email me <Mail className="h-4 w-4" />
          </a>
          {content.links.whatsapp ? (
            <a
              className="btn w-full"
              href={content.links.whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp <MessageCircle className="h-4 w-4" />
            </a>
          ) : null}
          {content.links.linkedin && content.links.linkedin !== '#' ? (
            <a
              className="btn w-full"
              href={content.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <Linkedin className="h-4 w-4" />
            </a>
          ) : null}
          <button type="button" className="btn w-full" onClick={copyEmail}>
            {copied ? 'Copied' : 'Copy email'} <Copy className="h-4 w-4" />
          </button>
          {content.links.phone ? (
            <button type="button" className="btn w-full" onClick={copyPhone}>
              {phoneCopied ? 'Copied' : 'Copy phone'} <Copy className="h-4 w-4" />
            </button>
          ) : null}
        </div>

        <div className="mt-6 text-sm text-white/70">
          <div className="grid gap-2">
            <div className="chip w-fit">{content.links.email}</div>
            {content.links.phone ? (
              <div className="chip w-fit">{content.links.phone}</div>
            ) : null}
            {content.person.location ? (
              <div className="chip w-fit">{content.person.location}</div>
            ) : null}
          </div>
        </div>
      </div>

      <form
        className="glass p-6 lg:col-span-3"
        onSubmit={(e) => {
          e.preventDefault()
          window.location.href = mailto
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight">Send a message</h3>
          <span className="chip">opens your email app</span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-wider text-white/60">Name</span>
            <input
              className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 focus:border-white/25 focus:outline-none"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </label>
          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-wider text-white/60">Email</span>
            <input
              className="h-11 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 focus:border-white/25 focus:outline-none"
              placeholder="you@domain.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </label>
        </div>

        <label className="mt-3 grid gap-2">
          <span className="text-xs uppercase tracking-wider text-white/60">Message</span>
          <textarea
            rows={6}
            className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/25 focus:outline-none"
            placeholder="What are we building?"
            value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          />
        </label>

        <div className="mt-5 flex flex-wrap gap-2">
          <button type="submit" className="btn btn-primary">
            Send <Send className="h-4 w-4" />
          </button>
          <a className="btn" href={mailto}>
            Use mailto link <Mail className="h-4 w-4" />
          </a>
        </div>
      </form>
    </div>
  )
}

