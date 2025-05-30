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
import { User, Project, BlogPost, ContactMessage, Newsletter, Analytics, FAQ, TeamMember } from '@prisma/client'

export type { User, Project, BlogPost, ContactMessage, Newsletter, Analytics, FAQ, TeamMember }

export interface ExtendedUser extends User {
  role: string
}

export interface ProjectWithStats extends Project {
  _count?: {
    views: number
  }
}

export interface BlogPostWithStats extends BlogPost {
  _count?: {
    views: number
  }
}

export interface AnalyticsData {
  totalViews: number
  totalVisitors: number
  totalProjects: number
  totalBlogPosts: number
  totalMessages: number
  totalSubscribers: number
  pageViews: Array<{
    page: string
    views: number
  }>
  trafficSources: Array<{
    source: string
    visitors: number
  }>
  topPages: Array<{
    page: string
    views: number
  }>
  recentActivity: Array<{
    id: string
    type: string
    description: string
    createdAt: Date
  }>
}

export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  subject?: string
  message: string
  budget?: string
  timeline?: string
  services?: string[]
}

export interface NewsletterFormData {
  email: string
  name?: string
}

export interface ProjectFormData {
  title: string
  slug: string
  description?: string
  content?: string
  image?: string
  gallery?: string[]
  category: string
  tags: string[]
  client?: string
  year?: number
  url?: string
  featured: boolean
  published: boolean
}

export interface BlogPostFormData {
  title: string
  slug: string
  content: string
  excerpt?: string
  image?: string
  author: string
  tags: string[]
  category?: string
  published: boolean
  featured: boolean
}

export interface SearchParams {
  query?: string
  category?: string
  tag?: string
  page?: string
  limit?: string
  sort?: string
  order?: 'asc' | 'desc'
}

export interface PaginatedResult<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
      role: string
    }
  }

  interface User {
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
  }
}
