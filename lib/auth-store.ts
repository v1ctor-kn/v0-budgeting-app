import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
}

interface StoredAccount {
  id: string
  name: string
  email: string
  password: string // In production, this would be hashed
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  accounts: StoredAccount[]
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      accounts: [],
      login: (email: string, password: string) => {
        const { accounts } = get()
        const account = accounts.find(
          (acc) => acc.email === email && acc.password === password
        )
        
        if (account) {
          const user: User = {
            id: account.id,
            name: account.name,
            email: account.email,
          }
          set({ user, isAuthenticated: true })
          return true
        }
        return false
      },
      register: (name: string, email: string, password: string) => {
        const { accounts } = get()
        
        // Check if email already exists
        if (accounts.some((acc) => acc.email === email)) {
          return false
        }
        
        const newAccount: StoredAccount = {
          id: Math.random().toString(36).substring(7),
          name,
          email,
          password, // In production, this would be hashed
        }
        
        const user: User = {
          id: newAccount.id,
          name: newAccount.name,
          email: newAccount.email,
        }
        
        set({ 
          accounts: [...accounts, newAccount],
          user, 
          isAuthenticated: true 
        })
        return true
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
