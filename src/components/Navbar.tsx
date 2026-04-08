import { useState } from 'react'
import { portfolioData } from '../data/portfolio'

export default function Navbar() {
  const { profile } = portfolioData
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/90 backdrop-blur-sm border-b border-navy-700/50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <a
          href="#"
          className="text-accent font-mono text-sm font-bold hover:text-accent-dark transition-colors"
        >
          {profile.github}
        </a>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-6">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-400 text-sm hover:text-accent transition-colors"
            >
              <span className="text-accent font-mono text-xs mr-1">
                {String(i + 1).padStart(2, '0')}.
              </span>
              {link.label}
            </a>
          ))}
          <a
            href="/portfolio/cv.pdf"
            download
            className="text-accent font-mono text-sm border border-accent/40 px-3 py-1 rounded hover:bg-accent/10 transition-colors"
          >
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-slate-400 hover:text-accent transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden bg-navy-800 border-b border-navy-700/50 px-6 pb-4">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-slate-400 text-sm hover:text-accent transition-colors"
            >
              <span className="text-accent font-mono text-xs mr-1">
                {String(i + 1).padStart(2, '0')}.
              </span>
              {link.label}
            </a>
          ))}
          <a
            href="/portfolio/cv.pdf"
            download
            className="block py-2 text-accent font-mono text-sm"
          >
            Resume
          </a>
        </div>
      )}
    </nav>
  )
}
