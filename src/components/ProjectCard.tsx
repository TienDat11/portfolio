import type { Project, ProjectTrack } from '../types'

export const TRACK_LABEL: Record<ProjectTrack, string> = {
  ai: 'Applied AI & CV',
  fullstack: 'Full-Stack & Cloud',
  mobile: 'Mobile · Play & App Store',
}

function ProjectPreviewPane({ project }: { project: Project }) {
  const { preview } = project

  if (preview.kind === 'terminal') {
    return (
      <div className="rounded-xl border border-slate-800 bg-[#0b1020] p-4 font-mono text-[11px] leading-relaxed text-slate-300">
        <div className="mb-3 flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-rose-400/80" />
          <span className="h-2 w-2 rounded-full bg-amber-300/80" />
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
        </div>
        {preview.lines.map((line, i) => (
          <p key={i} className={line.startsWith('$') ? 'text-sky-300' : undefined}>
            {line}
          </p>
        ))}
      </div>
    )
  }

  if (preview.kind === 'diagram') {
    return (
      <div className="grid grid-cols-2 gap-2">
        {preview.nodes.map((node, i) => (
          <div
            key={node}
            style={{ transitionDelay: `${i * 40}ms` }}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 font-mono text-[11px] text-slate-600 transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-primary-light/50 group-hover:text-primary-dark"
          >
            {node}
          </div>
        ))}
      </div>
    )
  }

  const storeLabels = project.links.filter((link) => link.kind.startsWith('store-')).map((link) => link.label)
  return (
    <div className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 p-4 text-white">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 font-mono text-lg font-bold">
        {preview.app.slice(0, 2).toUpperCase()}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{preview.app}</p>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {storeLabels.map((label) => (
            <span key={label} className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-slate-300">
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
      <ProjectPreviewPane project={project} />

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] text-slate-400">{String(index + 1).padStart(2, '0')}</span>
        <span className="rounded-full bg-primary-light px-2.5 py-0.5 font-mono text-[10px] text-primary-dark">
          {TRACK_LABEL[project.track]}
        </span>
      </div>

      <h3 className="mt-3 text-lg font-semibold text-slate-900">{project.title}</h3>
      <p className="mt-2 inline-flex w-fit rounded-md bg-slate-900 px-2 py-1 font-mono text-[11px] text-sky-200">
        {project.metric}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{project.description}</p>

      <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
        {project.highlights.slice(0, 3).map((highlight) => (
          <li key={highlight} className="flex items-start gap-2">
            <span className="mt-0.5 text-primary">&#9654;</span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((tech) => (
          <li key={tech} className="rounded-md border border-slate-200 px-2 py-0.5 font-mono text-[10px] text-slate-600">
            {tech}
          </li>
        ))}
      </ul>

      {project.links.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-5">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-primary hover:underline"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  )
}
