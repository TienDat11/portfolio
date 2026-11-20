import { useEffect, useId, useRef, useState } from 'react'
import { portfolioData } from '../data/portfolio'

interface CvMenuProps {
  tone: 'dark' | 'light'
}

const TRACK_CVS = [
  { label: 'Full-Stack CV', note: 'Full-Stack & Cloud', key: 'fullstack' },
  { label: 'AI Engineer CV', note: 'Applied AI & RAG', key: 'ai' },
  { label: 'Mobile Developer CV', note: 'Flutter · Play & App Store', key: 'mobile' },
] as const

export default function CvMenu({ tone }: CvMenuProps) {
  const { cvs } = portfolioData.profile
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const buttonClass =
    tone === 'dark'
      ? 'bg-white text-slate-900 hover:bg-sky-100'
      : 'bg-primary text-white hover:bg-primary-dark'

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-mono text-xs font-semibold transition-colors ${buttonClass}`}
      >
        Download CV
        <svg className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
          <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        id={menuId}
        role="menu"
        hidden={!open}
        className={`absolute left-0 top-full z-30 mt-2 w-72 overflow-hidden rounded-2xl border p-1.5 shadow-2xl ${
          tone === 'dark'
            ? 'border-white/10 bg-[#0c1220]/95 backdrop-blur-md'
            : 'border-slate-200 bg-white'
        }`}
      >
        {TRACK_CVS.map((cv) => (
          <a
            key={cv.key}
            role="menuitem"
            href={cvs[cv.key]}
            download
            onClick={() => setOpen(false)}
            className={`flex flex-col rounded-xl px-3 py-2.5 transition-colors ${
              tone === 'dark' ? 'text-slate-200 hover:bg-white/5' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="text-sm font-semibold">{cv.label}</span>
            <span className={`font-mono text-[11px] ${tone === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
              {cv.note}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
