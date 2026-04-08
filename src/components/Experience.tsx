import { portfolioData } from '../data/portfolio'

export default function Experience() {
  const { experience } = portfolioData

  return (
    <section className="px-6 py-16 max-w-4xl mx-auto">
      <h2 className="section-heading">
        <span className="section-number">04.</span>
        Experience
      </h2>
      <div className="space-y-6">
        {experience.map((exp, i) => (
          <div
            key={i}
            className="relative pl-5 border-l-2 border-accent/30"
          >
            <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-accent" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
              <h3 className="text-base font-bold text-accent">
                {exp.role}
              </h3>
              <span className="text-slate-500 font-mono text-xs">
                {exp.period}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-2">
              {exp.company} &middot; {exp.location}
            </p>
            <ul className="space-y-1">
              {exp.highlights.map((h, j) => (
                <li
                  key={j}
                  className="text-slate-400 text-sm flex items-start gap-2"
                >
                  <span className="text-accent text-xs mt-0.5">&#9654;</span>
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
