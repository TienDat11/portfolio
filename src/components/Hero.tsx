import { portfolioData } from '../data/portfolio'

export default function Hero() {
  const { profile } = portfolioData

  return (
    <section className="flex items-center justify-center min-h-screen px-6">
      <div className="max-w-3xl">
        <p className="text-accent font-mono text-sm mb-5">
          Hi, my name is
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-300 mb-2">
          {profile.name.split(' ').slice(0, -1).join(' ')}
        </h1>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-400 mb-6">
          {profile.name.split(' ').slice(-1)}.
        </h2>
        <p className="text-base md:text-xl text-slate-400 max-w-xl mb-8 leading-relaxed">
          {profile.description}
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="inline-block border border-accent text-accent font-mono text-sm px-7 py-3 rounded hover:bg-accent/10 transition-colors"
          >
            Check out my work!
          </a>
          <a
            href="#contact"
            className="inline-block border border-slate-400/30 text-slate-400 font-mono text-sm px-7 py-3 rounded hover:border-accent hover:text-accent transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  )
}
