import { Download, ExternalLink, FileText } from 'lucide-react'
import { content } from '../content'

export function ResumeSection() {
  const href = content.links.resume
  if (!href || href === '#') return null

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="glass p-6 lg:col-span-2">
        <div className="chip w-fit">
          <FileText className="h-4 w-4" />
          Resume (PDF)
        </div>
        <h3 className="mt-4 text-xl font-semibold tracking-tight">
          Download my resume
        </h3>
        <p className="mt-2 text-sm muted">
          One-click download, or open in a new tab. Updated and ready to share.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <a className="btn btn-primary" href={href} download>
            Download <Download className="h-4 w-4" />
          </a>
          <a className="btn" href={href} target="_blank" rel="noreferrer">
            Open <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="glass overflow-hidden lg:col-span-3">
        <div className="border-b border-white/10 bg-white/5 px-6 py-4 text-sm subtle">
          Preview
        </div>
        <div className="h-[560px] w-full">
          <object
            data={href}
            type="application/pdf"
            className="h-full w-full"
            aria-label="Resume PDF preview"
          >
            <div className="p-6">
              <p className="text-sm muted">
                Preview not available in this browser.
              </p>
              <div className="mt-4">
                <a className="btn btn-primary" href={href} download>
                  Download <Download className="h-4 w-4" />
                </a>
              </div>
            </div>
          </object>
        </div>
      </div>
    </div>
  )
}

