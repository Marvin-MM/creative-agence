import * as yup from 'yup'

// Contact form validation schema
export const contactFormSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  company: yup.string().optional(),
  phone: yup.string().optional(),
  subject: yup.string().optional(),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
  budget: yup.string().optional(),
  timeline: yup.string().optional(),
  services: yup.array().of(yup.string()).optional()
})

// Newsletter subscription validation schema
export const newsletterSchema = yup.object({
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  name: yup.string().optional()
})

// Project validation schema
export const projectSchema = yup.object({
  title: yup.string().required('Title is required').min(2, 'Title must be at least 2 characters'),
  slug: yup.string().required('Slug is required').matches(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
  description: yup.string().optional(),
  content: yup.string().optional(),
  image: yup.string().url('Image must be a valid URL').optional(),
  gallery: yup.array().of(yup.string().url()).optional(),
  category: yup.string().required('Category is required'),
  tags: yup.array().of(yup.string()).required('At least one tag is required'),
  client: yup.string().optional(),
  year: yup.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  url: yup.string().url('URL must be valid').optional(),
  featured: yup.boolean().required(),
  published: yup.boolean().required()
})

// Blog post validation schema
export const blogPostSchema = yup.object({
  title: yup.string().required('Title is required').min(2, 'Title must be at least 2 characters'),
  slug: yup.string().required('Slug is required').matches(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and hyphens'),
  content: yup.string().required('Content is required').min(50, 'Content must be at least 50 characters'),
  excerpt: yup.string().optional(),
  image: yup.string().url('Image must be a valid URL').optional(),
  author: yup.string().required('Author is required'),
  tags: yup.array().of(yup.string()).required('At least one tag is required'),
  category: yup.string().optional(),
  published: yup.boolean().required(),
  featured: yup.boolean().required()
})

// Sign in validation schema
export const signInSchema = yup.object({
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters')
})

// User validation schema
export const userSchema = yup.object({
  name: yup.string().optional(),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  role: yup.string().oneOf(['USER', 'ADMIN']).required('Role is required')
})

// FAQ validation schema
export const faqSchema = yup.object({
  question: yup.string().required('Question is required').min(5, 'Question must be at least 5 characters'),
  answer: yup.string().required('Answer is required').min(10, 'Answer must be at least 10 characters'),
  category: yup.string().optional(),
  order: yup.number().min(0).required('Order is required'),
  active: yup.boolean().required()
})

// Team member validation schema
export const teamMemberSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  role: yup.string().required('Role is required'),
  bio: yup.string().optional(),
  image: yup.string().url('Image must be a valid URL').optional(),
  email: yup.string().email('Please enter a valid email').optional(),
  linkedin: yup.string().url('LinkedIn must be a valid URL').optional(),
  twitter: yup.string().url('Twitter must be a valid URL').optional(),
  order: yup.number().min(0).required('Order is required'),
  active: yup.boolean().required()
})

// Type exports
export type ContactFormData = yup.InferType<typeof contactFormSchema>
export type NewsletterFormData = yup.InferType<typeof newsletterSchema>
export type ProjectFormData = yup.InferType<typeof projectSchema>
export type BlogPostFormData = yup.InferType<typeof blogPostSchema>
export type SignInFormData = yup.InferType<typeof signInSchema>
export type UserFormData = yup.InferType<typeof userSchema>
export type FAQFormData = yup.InferType<typeof faqSchema>
export type TeamMemberFormData = yup.InferType<typeof teamMemberSchema>