import { portfolioData } from '../data/portfolio'

export default function Skills() {
  const { skills } = portfolioData

  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-300 mb-10 flex items-center gap-3">
        <span className="text-accent font-mono text-lg">02.</span>
        Skills & Technologies
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {skills.map((group) => (
          <div key={group.category} className="bg-navy-800 rounded-lg p-5">
            <h3 className="text-accent font-mono text-sm mb-3">
              {group.category}
            </h3>
            <ul className="space-y-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="text-slate-400 text-sm flex items-center gap-2"
                >
                  <span className="text-accent text-xs">&#9654;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
