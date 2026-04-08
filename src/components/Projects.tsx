import { useState } from 'react'
import { portfolioData } from '../data/portfolio'
import ProjectCard from './ProjectCard'

type CategoryFilter = 'all' | 'mobile' | 'web' | 'ai'

const filters: { label: string; value: CategoryFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Flutter', value: 'mobile' },
  { label: 'Web', value: 'web' },
  { label: 'AI / Data', value: 'ai' },
]

export default function Projects() {
  const { projects } = portfolioData
  const [filter, setFilter] = useState<CategoryFilter>('all')

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="px-6 py-16 max-w-5xl mx-auto">
      <h2 className="section-heading">
        <span className="section-number">03.</span>
        Featured Projects
      </h2>
      <div className="flex gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`font-mono text-xs px-3 py-1.5 rounded border transition-colors ${
              filter === f.value
                ? 'border-accent text-accent bg-accent/10'
                : 'border-navy-600/40 text-slate-500 hover:text-accent hover:border-accent/40'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
