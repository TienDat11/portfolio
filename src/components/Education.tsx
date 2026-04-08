import { portfolioData } from '../data/portfolio'

export default function Education() {
  const { education } = portfolioData

  return (
    <section className="px-6 py-20 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-300 mb-10 flex items-center gap-3">
        <span className="text-accent font-mono text-lg">05.</span>
        Education
      </h2>
      <div className="space-y-6">
        {education.map((edu, i) => (
          <div
            key={i}
            className="relative pl-6 border-l-2 border-accent/30"
          >
            <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-accent" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
              <h3 className="text-lg font-bold text-slate-300">
                {edu.degree}
              </h3>
              <span className="text-slate-400 font-mono text-sm">
                {edu.period}
              </span>
            </div>
            <p className="text-accent text-sm">{edu.school}</p>
            {edu.description && (
              <p className="text-slate-400 text-sm mt-2">
                {edu.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
