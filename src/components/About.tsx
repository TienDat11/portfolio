import { portfolioData } from '../data/portfolio'

export default function About() {
  const { profile } = portfolioData

  return (
    <section id="about" className="px-6 py-20 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-300 mb-8 flex items-center gap-3">
        <span className="text-accent font-mono text-lg">01.</span>
        About Me
      </h2>
      <div className="space-y-4 text-slate-400 leading-relaxed max-w-2xl">
        <p>
          I'm a <span className="text-accent">Mobile Developer</span> based in{' '}
          {profile.location}, specializing in building exceptional digital
          experiences with Flutter.
        </p>
        <p>
          My focus is on building scalable, maintainable applications using{' '}
          <span className="text-accent">Clean Architecture</span>,{' '}
          <span className="text-accent">BLoC pattern</span>, and modern
          development practices. I enjoy turning complex problems into simple,
          beautiful, and intuitive solutions.
        </p>
        <p>
          When I'm not coding, I'm exploring new technologies, contributing to
          open-source, and continuously improving my craft.
        </p>
      </div>
    </section>
  )
}
