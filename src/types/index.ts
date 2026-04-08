export interface Profile {
  name: string
  title: string
  subtitle: string
  description: string
  location: string
  email: string
  phone: string
  github: string
  githubUrl: string
  linkedin?: string
  avatar?: string
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface Project {
  id: string
  title: string
  problem: string
  role: string
  solution: string
  tech: string[]
  impact: string
  githubUrl: string
  limitations: string
  featured: boolean
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  description: string
  highlights: string[]
}

export interface Education {
  school: string
  degree: string
  period: string
  description?: string
}

export interface PortfolioData {
  profile: Profile
  skills: SkillCategory[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
}
