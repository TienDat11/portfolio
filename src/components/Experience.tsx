import { portfolioData } from '../data/portfolio'

export default function Experience() {
  const { experience } = portfolioData

  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-300 mb-10 flex items-center gap-3">
        <span className="text-accent font-mono text-lg">04.</span>
        Experience
      </h2>
      <div className="space-y-8">
        {experience.map((exp, i) => (
          <div
            key={i}
            className="relative pl-6 border-l-2 border-accent/30"
          >
            <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-accent" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-lg font-bold text-accent">
                {exp.role}
              </h3>
              <span className="text-slate-400 font-mono text-sm">
                {exp.period}
              </span>
            </div>
            <p className="text-slate-300 text-sm mb-1">
              {exp.company} &middot; {exp.location}
            </p>
            <p className="text-slate-400 text-sm mb-3">
              {exp.description}
            </p>
            <ul className="space-y-1.5">
              {exp.highlights.map((h, j) => (
                <li
                  key={j}
                  className="text-slate-400 text-sm flex items-start gap-2"
                >
                  <span className="text-accent text-xs mt-1">&#9654;</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
