import { portfolioData } from '../data/portfolio'

export default function MoreProjects() {
  const { moreProjects } = portfolioData

  return (
    <div className="mt-12">
      <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400">More projects</h3>
      <ul className="mt-4 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {moreProjects.map((project) => (
          <li key={project.name} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900">{project.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">{project.description}</p>
            </div>
            <ul className="flex shrink-0 flex-wrap gap-1.5 sm:justify-end">
              {project.tech.map((tech) => (
                <li key={tech} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-500">
                  {tech}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
