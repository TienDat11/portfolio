import { portfolioData } from '../data/portfolio'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const { projects } = portfolioData

  return (
    <section id="projects" className="px-6 py-20 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-300 mb-10 flex items-center gap-3">
        <span className="text-accent font-mono text-lg">03.</span>
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
