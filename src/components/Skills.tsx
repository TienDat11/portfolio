import { portfolioData } from '../data/portfolio'

export default function Skills() {
  const { skills } = portfolioData

  return (
    <section id="skills" className="px-6 py-16 max-w-4xl mx-auto">
      <h2 className="section-heading">
        <span className="section-number">03.</span>
        Skills & Technologies
      </h2>
      <div className="space-y-5">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="text-primary font-mono text-xs mb-2 uppercase tracking-wider">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="text-xs font-mono text-slate-700 bg-white border border-slate-200 px-2.5 py-1 rounded hover:border-primary/40 hover:text-primary transition-colors shadow-sm"
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
