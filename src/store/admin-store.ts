import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface AdminState {
  sidebarCollapsed: boolean
  currentPage: string
  notifications: Notification[]
  setSidebarCollapsed: (collapsed: boolean) => void
  setCurrentPage: (page: string) => void
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
}

export const useAdminStore = create<AdminState>()(
  devtools(
    (set, get) => ({
      sidebarCollapsed: false,
      currentPage: 'dashboard',
      notifications: [],
      
      setSidebarCollapsed: (collapsed) => 
        set({ sidebarCollapsed: collapsed }),
      
      setCurrentPage: (page) => 
        set({ currentPage: page }),
      
      addNotification: (notification) => 
        set((state) => ({
          notifications: [
            ...state.notifications,
            { ...notification, id: Date.now().toString() }
          ]
        })),
      
      removeNotification: (id) => 
        set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }))
    }),
    { name: 'admin-store' }
  )
)