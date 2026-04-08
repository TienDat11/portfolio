import { portfolioData } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-8 text-center">
      <p className="text-slate-400 text-xs font-mono">
        Designed & Built by {portfolioData.profile.name}
      </p>
      <p className="text-slate-300 text-xs font-mono mt-1">
        Built with React + TypeScript + Tailwind CSS
      </p>
    </footer>
  )
}
