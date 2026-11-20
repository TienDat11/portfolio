import { portfolioData } from '../data/portfolio'
import ScrollSection from './ScrollSection'

const STATS = [
  { value: '2.5+', label: 'years in production' },
  { value: '9', label: 'production systems' },
  { value: '4', label: 'live store apps' },
  { value: '3', label: 'companies' },
]

export default function About() {
  const { profile } = portfolioData

  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="section-heading">
        <span className="section-number">02.</span>
        About Me
      </h2>

      <ScrollSection depth={24}>
        <p className="max-w-2xl text-lg leading-relaxed text-slate-700">{profile.bio}</p>
        <p className="mt-3 font-mono text-xs text-slate-400">{profile.location}</p>
      </ScrollSection>

      <ScrollSection delay={120}>
        <dl className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-4">
              <dt className="text-xs text-slate-500">{stat.label}</dt>
              <dd className="font-mono text-2xl font-bold text-primary">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </ScrollSection>
    </section>
  )
}
