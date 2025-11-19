import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => void
  register: (name: string, email: string, password: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        // Simple local authentication - in production, this would call an API
        const user: User = {
          id: Math.random().toString(36).substring(7),
          name: email.split('@')[0],
          email,
        }
        set({ user, isAuthenticated: true })
      },
      register: (name: string, email: string, password: string) => {
        // Simple local registration - in production, this would call an API
        const user: User = {
          id: Math.random().toString(36).substring(7),
          name,
          email,
        }
        set({ user, isAuthenticated: true })
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'budgetwise-auth-storage',
    }
  )
)
