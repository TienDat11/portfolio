import { useState } from 'react'
import { portfolioData } from '../data/portfolio'
import type { ProjectTrack } from '../types'
import ProjectCard from './ProjectCard'
import ScrollSection from './ScrollSection'

type TrackFilter = 'all' | ProjectTrack

const FILTERS: { value: TrackFilter; label: string }[] = [
  { value: 'all', label: 'All Systems' },
  { value: 'ai', label: 'Applied AI & CV' },
  { value: 'fullstack', label: 'Full-Stack & Cloud' },
  { value: 'mobile', label: 'Mobile · Play Store & App Store' },
]

export default function Projects() {
  const { projects } = portfolioData
  const [filter, setFilter] = useState<TrackFilter>('all')

  const visible = filter === 'all' ? projects : projects.filter((project) => project.track === filter)
  const countFor = (value: TrackFilter) =>
    value === 'all' ? projects.length : projects.filter((project) => project.track === value).length

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="section-heading">
        <span className="section-number">04.</span>
        Featured Projects
      </h2>

      <div role="tablist" aria-label="Filter projects by track" className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={filter === item.value}
            onClick={() => setFilter(item.value)}
            className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${
              filter === item.value
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-slate-200 text-slate-400 hover:border-primary/40 hover:text-primary'
            }`}
          >
            {item.label} ({countFor(item.value)})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {visible.map((project, i) => (
          <ScrollSection key={project.id} delay={(i % 2) * 80}>
            <ProjectCard project={project} index={i} />
          </ScrollSection>
        ))}
      </div>
    </section>
  )
}
