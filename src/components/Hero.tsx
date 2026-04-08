import { portfolioData } from '../data/portfolio'

export default function Hero() {
  const { profile } = portfolioData

  return (
    <section className="flex items-center justify-center min-h-[85vh] px-6">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-10 animate-fade-in">
        <div className="flex-1">
          <p className="text-primary font-mono text-sm mb-4">
            Hi, my name is
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-1 leading-tight">
            Tien Dat
          </h1>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-400 mb-5 leading-tight">
            Ngo.
          </h2>
          <p className="text-base md:text-lg text-slate-500 max-w-xl mb-7 leading-relaxed">
            {profile.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-block bg-primary text-white font-mono text-sm px-6 py-2.5 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Check out my work!
            </a>
            <a
              href="#contact"
              className="inline-block border border-slate-300 text-slate-600 font-mono text-sm px-6 py-2.5 rounded-lg hover:border-primary hover:text-primary transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
        <div className="flex-shrink-0">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
            <img
              src="/portfolio/profile.jpg"
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
