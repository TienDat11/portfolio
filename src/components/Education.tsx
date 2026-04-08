import { portfolioData } from '../data/portfolio'

export default function Education() {
  const { education } = portfolioData

  return (
    <section className="px-6 max-w-4xl mx-auto pb-16">
      <h2 className="section-heading">
        <span className="section-number">06.</span>
        Education
      </h2>
      <div className="space-y-4">
        {education.map((edu, i) => (
          <div
            key={i}
            className="relative pl-5 border-l-2 border-primary/30"
          >
            <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-primary" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-0.5">
              <h3 className="text-base font-bold text-slate-800">
                {edu.degree}
              </h3>
              <span className="text-slate-400 font-mono text-xs">
                {edu.period}
              </span>
            </div>
            <p className="text-primary text-sm">{edu.school}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
