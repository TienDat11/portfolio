export interface CvLinks {
  fullstack: string
  ai: string
  mobile: string
}

export interface Profile {
  name: string
  title: string
  tagline: string
  location: string
  bio: string
  email: string
  phone: string
  github: string
  githubUrl: string
  cvs: CvLinks
}

export interface SkillCategory {
  category: string
  items: string[]
}

export type ProjectTrack = 'ai' | 'fullstack' | 'mobile'

export interface ProjectLink {
  label: string
  url: string
  kind: 'github' | 'live' | 'store-play' | 'store-appstore'
}

export type ProjectPreview =
  | { kind: 'terminal'; lines: string[] }
  | { kind: 'diagram'; nodes: string[] }
  | { kind: 'store'; app: string }

export interface Project {
  id: string
  title: string
  track: ProjectTrack
  description: string
  metric: string
  tech: string[]
  highlights: string[]
  links: ProjectLink[]
  preview: ProjectPreview
}

export interface Experience {
  company: string
  role: string
  period: string
  highlights: string[]
}

export interface Education {
  school: string
  degree: string
  period: string
}

export interface ShowcaseAct {
  id: string
  label: string
  headline: string
  body: string
  stats: string[]
}

export interface PortfolioData {
  profile: Profile
  showcase: ShowcaseAct[]
  skills: SkillCategory[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
}
