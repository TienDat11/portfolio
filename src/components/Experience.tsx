import { portfolioData } from '../data/portfolio'
import ScrollSection from './ScrollSection'

export default function Experience() {
  const { experience } = portfolioData

  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="section-heading">
        <span className="section-number">05.</span>
        Experience
      </h2>

      <ScrollSection>
        <div className="mb-10 grid gap-3 rounded-2xl border border-primary/20 bg-white p-5 sm:grid-cols-3">
          <div>
            <p className="font-mono text-2xl font-bold text-primary">2.5+ yrs</p>
            <p className="mt-1 text-xs text-slate-500">Shipping production software since Sep 2023</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold text-primary">{experience.length} companies</p>
            <p className="mt-1 text-xs text-slate-500">Rikkeisoft, HiveFive, Crosstechedu</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold text-primary">4 live apps</p>
            <p className="mt-1 text-xs text-slate-500">Google Play & App Store releases</p>
          </div>
        </div>
      </ScrollSection>

      <ol className="space-y-8">
        {experience.map((item, i) => (
          <ScrollSection key={`${item.company}-${item.period}`} delay={i * 80}>
            <li className="relative border-l-2 border-primary/30 pl-6">
              <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-primary" />
              <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-base font-bold text-primary">{item.role}</h3>
                <span className="font-mono text-xs text-slate-400">{item.period}</span>
              </div>
              <p className="mb-3 text-sm text-slate-600">{item.company}</p>
              <ul className="space-y-1.5">
                {item.highlights.slice(0, 4).map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-sm text-slate-500">
                    <span className="mt-0.5 text-xs text-primary">&#9654;</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ScrollSection>
        ))}
      </ol>
    </section>
  )
}
