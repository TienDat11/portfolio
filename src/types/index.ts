export interface Profile {
  name: string
  firstName: string
  lastName: string
  title: string
  subtitle: string
  description: string
  location: string
  email: string
  phone: string
  github: string
  githubUrl: string
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  role: string
  tech: string[]
  highlights: string[]
  githubUrl: string
  category: 'mobile' | 'web' | 'ai' | 'other'
  hasGithubRepo: boolean
}

export interface Experience {
  company: string
  client?: string
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
}

export interface PortfolioData {
  profile: Profile
  skills: SkillCategory[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
}
