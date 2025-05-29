// src/lib/validations.ts
import * as yup from 'yup'

// Project validation schema
export const projectSchema = yup.object({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  client: yup.string().required('Client name is required'),
  role: yup.string().required('Role is required'),
  services: yup.array().of(yup.string()).min(1, 'At least one service is required'),
  results: yup.string().optional(),
  featured: yup.boolean().default(false),
  published: yup.boolean().default(true),
  category: yup.string().required('Category is required'),
  tags: yup.array().of(yup.string()).min(1, 'At least one tag is required'),
  images: yup.array().of(yup.string()).min(1, 'At least one image is required'),
  videos: yup.array().of(yup.string()).optional(),
})

// Blog post validation schema
export const blogPostSchema = yup.object({
  title: yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
  content: yup.string().required('Content is required').min(50, 'Content must be at least 50 characters'),
  excerpt: yup.string().optional().max(200, 'Excerpt must be less than 200 characters'),
  coverImage: yup.string().optional(),
  published: yup.boolean().default(false),
  tags: yup.array().of(yup.string()).min(1, 'At least one tag is required'),
})

// Contact form validation schema
export const contactSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  company: yup.string().optional(),
  subject: yup.string().required('Subject is required').min(5, 'Subject must be at least 5 characters'),
  message: yup.string().required('Message is required').min(20, 'Message must be at least 20 characters'),
  phone: yup.string().optional(),
  budget: yup.string().optional(),
  timeline: yup.string().optional(),
  services: yup.array().of(yup.string()).optional(),
})

// Newsletter subscription validation schema
export const newsletterSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  source: yup.string().optional(),
})

// FAQ validation schema
export const faqSchema = yup.object({
  question: yup.string().required('Question is required').min(10, 'Question must be at least 10 characters'),
  answer: yup.string().required('Answer is required').min(20, 'Answer must be at least 20 characters'),
  order: yup.number().integer().min(0).default(0),
  active: yup.boolean().default(true),
})

// Team member validation schema
export const teamMemberSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  role: yup.string().required('Role is required'),
  bio: yup.string().required('Bio is required').min(50, 'Bio must be at least 50 characters'),
  image: yup.string().optional(),
  email: yup.string().email('Invalid email address').optional(),
  linkedin: yup.string().url('Invalid LinkedIn URL').optional(),
  twitter: yup.string().url('Invalid Twitter URL').optional(),
  order: yup.number().integer().min(0).default(0),
  active: yup.boolean().default(true),
})

// Company info validation schema
export const companyInfoSchema = yup.object({
  key: yup.string().required('Key is required'),
  value: yup.string().required('Value is required'),
  description: yup.string().optional(),
})

// User validation schema
export const userSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  role: yup.string().oneOf(['ADMIN', 'EDITOR']).default('ADMIN'),
})

// Login validation schema
export const loginSchema = yup.object({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().required('Password is required'),
})