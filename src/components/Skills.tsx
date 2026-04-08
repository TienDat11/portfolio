import { portfolioData } from '../data/portfolio'

export default function Skills() {
  const { skills } = portfolioData

  return (
    <section className="px-6 py-16 max-w-4xl mx-auto">
      <h2 className="section-heading">
        <span className="section-number">02.</span>
        Skills & Technologies
      </h2>
      <div className="space-y-5">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-accent font-mono text-xs mb-2 uppercase tracking-wider">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-xs font-mono text-slate-300 bg-navy-900/60 border border-navy-600/40 px-2.5 py-1 rounded hover:border-accent/40 hover:text-accent transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
