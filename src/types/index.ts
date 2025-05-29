export interface User {
  id: string
  name?: string | null
  email: string
  role: 'ADMIN' | 'EDITOR'
  image?: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  client: string
  role: string
  services: string[]
  results?: string | null
  featured: boolean
  published: boolean
  category: string
  tags: string[]
  images: string[]
  videos: string[]
  createdAt: Date
  updatedAt: Date
  views: number
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string | null
  coverImage?: string | null
  published: boolean
  tags: string[]
  readingTime: number
  createdAt: Date
  updatedAt: Date
  views: number
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  company?: string | null
  subject: string
  message: string
  phone?: string | null
  budget?: string | null
  timeline?: string | null
  services: string[]
  createdAt: Date
  expiresAt: Date
}

export interface Newsletter {
  id: string
  email: string
  confirmed: boolean
  source?: string | null
  createdAt: Date
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  image?: string | null
  email?: string | null
  linkedin?: string | null
  twitter?: string | null
  order: number
  active: boolean
}

export interface FAQ {
  id: string
  question: string
  answer: string
  order: number
  active: boolean
}

export interface CompanyInfo {
  id: string
  key: string
  value: string
  description?: string | null
  updatedAt: Date
}

export interface PageView {
  id: string
  page: string
  userAgent?: string | null
  ip?: string | null
  country?: string | null
  createdAt: Date
}