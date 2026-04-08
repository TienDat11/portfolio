import { portfolioData } from '../data/portfolio'

export default function About() {
  const { profile } = portfolioData

  return (
    <section id="about" className="px-6 py-16 max-w-4xl mx-auto">
      <h2 className="section-heading">
        <span className="section-number">02.</span>
        About Me
      </h2>
      <div className="space-y-3 text-slate-600 leading-relaxed max-w-2xl">
        <p>
          I'm a <span className="text-primary font-semibold">Mobile & Full-stack Developer</span> based in{' '}
          {profile.location}, with professional experience shipping production applications
          across Flutter, React/Next.js, and Python/AI.
        </p>
        <p>
          My core strength is building scalable, maintainable applications using{' '}
          <span className="text-primary font-semibold">Clean Architecture</span>,{' '}
          <span className="text-primary font-semibold">BLoC pattern</span>, and modern development practices.
          I've shipped apps across healthcare, ride-hailing, e-commerce, social platforms, and AI domains.
        </p>
        <p>
          Beyond mobile, I've built full-stack web platforms with Next.js 15 and AI systems including
          RAG chatbots, computer vision pipelines, and recommendation engines.
        </p>
      </div>
    </section>
  )
}
