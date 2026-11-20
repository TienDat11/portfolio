import { useEffect, useState } from 'react'
import CvMenu from './CvMenu'

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [overHero, setOverHero] = useState(true)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero')
      if (hero) setOverHero(window.scrollY < hero.offsetHeight - window.innerHeight)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const link of links) {
      const section = document.getElementById(link.href.slice(1))
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [])

  const linkClass = (id: string) => {
    if (active === id) return overHero ? 'bg-white/10 text-white' : 'bg-primary-light text-primary-dark'
    return overHero ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-primary'
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        overHero ? 'bg-transparent' : 'border-b border-slate-200 bg-white/90 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#hero" className={`font-mono text-sm font-semibold ${overHero ? 'text-white' : 'text-slate-900'}`}>
          TD<span className="text-primary">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href.slice(1) ? 'true' : undefined}
              className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${linkClass(link.href.slice(1))}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <CvMenu tone={overHero ? 'dark' : 'light'} />
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
            className={`rounded-md px-3 py-1.5 font-mono text-xs lg:hidden ${
              overHero ? 'text-white' : 'text-slate-900'
            }`}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-slate-200 bg-white/95 px-6 py-3 backdrop-blur-md lg:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 font-mono text-sm text-slate-700 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
