import { portfolioData } from '../data/portfolio'

export default function Navbar() {
  const { profile } = portfolioData

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
        </div>
      </div>
    </nav>
  )
}
