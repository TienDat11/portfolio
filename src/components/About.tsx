import { portfolioData } from '../data/portfolio'

export default function About() {
  const { profile } = portfolioData

  return (
    <section id="about" className="px-6 py-16 max-w-4xl mx-auto">
      <h2 className="section-heading">
        <span className="section-number">01.</span>
        About Me
      </h2>
      <div className="space-y-3 text-slate-400 leading-relaxed max-w-2xl">
        <p>
          I'm a <span className="text-accent">Mobile Developer</span> based in{' '}
          {profile.location}, specializing in building exceptional digital
          experiences with Flutter.
        </p>
        <p>
          My focus is on building scalable, maintainable applications using{' '}
          <span className="text-accent">Clean Architecture</span>,{' '}
          <span className="text-accent">BLoC pattern</span>, and modern
          development practices.
        </p>
      </div>
    </section>
  )
}
