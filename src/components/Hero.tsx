import { portfolioData } from '../data/portfolio'

export default function Hero() {
  const { profile } = portfolioData

  return (
    <section className="flex items-center justify-center min-h-[85vh] px-6">
      <div className="max-w-3xl animate-fade-in">
        <p className="text-accent font-mono text-sm mb-4">
          Hi, my name is
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-300 mb-1 leading-tight">
          {profile.name.split(' ').slice(0, -1).join(' ')}
        </h1>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-400 mb-5 leading-tight">
          {profile.name.split(' ').slice(-1)}.
        </h2>
        <p className="text-base md:text-lg text-slate-400 max-w-xl mb-7 leading-relaxed">
          {profile.description}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-block border border-accent text-accent font-mono text-sm px-6 py-2.5 rounded hover:bg-accent/10 transition-colors"
          >
            Check out my work!
          </a>
          <a
            href="#contact"
            className="inline-block border border-slate-400/30 text-slate-400 font-mono text-sm px-6 py-2.5 rounded hover:border-accent hover:text-accent transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}
