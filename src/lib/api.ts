
import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message = error.response?.data?.error || error.message || 'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

export default api

// API functions
export const contactAPI = {
  submit: (data: any) => api.post('/contact', data),
}

export const newsletterAPI = {
  subscribe: (data: any) => api.post('/newsletter', data),
}

export const projectsAPI = {
  getAll: (params?: any) => api.get('/projects', { params }),
  getById: (id: string) => api.get(`/projects/${id}`),
  create: (data: any) => api.post('/projects', data),
  update: (id: string, data: any) => api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
}

export const blogAPI = {
  getAll: (params?: any) => api.get('/blog', { params }),
  getById: (id: string) => api.get(`/blog/${id}`),
  create: (data: any) => api.post('/blog', data),
  update: (id: string, data: any) => api.put(`/blog/${id}`, data),
  delete: (id: string) => api.delete(`/blog/${id}`),
}

export const analyticsAPI = {
  getDashboard: () => api.get('/analytics/dashboard'),
  getPageViews: (params?: any) => api.get('/analytics/pageviews', { params }),
  trackPageView: (data: any) => api.post('/analytics', data),
}

export const teamAPI = {
  getAll: (params?: any) => api.get('/team', { params }),
  create: (data: any) => api.post('/team', data),
  update: (id: string, data: any) => api.put(`/team/${id}`, data),
  delete: (id: string) => api.delete(`/team/${id}`),
}

export const faqAPI = {
  getAll: (params?: any) => api.get('/faq', { params }),
  create: (data: any) => api.post('/faq', data),
  update: (id: string, data: any) => api.put(`/faq/${id}`, data),
  delete: (id: string) => api.delete(`/faq/${id}`),
}

export const companyAPI = {
  getInfo: () => api.get('/company'),
  updateInfo: (data: any) => api.put('/company', data),
}
