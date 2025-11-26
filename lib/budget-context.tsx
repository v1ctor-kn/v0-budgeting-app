"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Transaction, Budget, Alert, Badge, Challenge, UserProfile, ChatMessage } from "./types"
import {
  transactions as mockTransactions,
  budgets as mockBudgets,
  alerts as mockAlerts,
  badges as mockBadges,
  challenges as mockChallenges,
} from "./mock-data"

interface BudgetContextType {
  transactions: Transaction[]
  budgets: Budget[]
  alerts: Alert[]
  badges: Badge[]
  challenges: Challenge[]
  userProfile: UserProfile
  chatMessages: ChatMessage[]
  totalBalance: number
  monthlyIncome: number
  monthlySavings: number
  addTransaction: (tx: Omit<Transaction, "id">) => void
  updateTransaction: (id: string, tx: Partial<Transaction>) => void
  setUserProfile: (profile: UserProfile) => void
  dismissAlert: (id: string) => void
  addChatMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined)

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [budgets] = useState<Budget[]>(mockBudgets)
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts)
  const [badges] = useState<Badge[]>(mockBadges)
  const [challenges] = useState<Challenge[]>(mockChallenges)
  const [userProfile, setUserProfile] = useState<UserProfile>("professional")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])

  const totalBalance = 12450.0
  const monthlyIncome = 5500
  const monthlySavings = 850

  const addTransaction = (tx: Omit<Transaction, "id">) => {
    const newTx: Transaction = {
      ...tx,
      id: Date.now().toString(),
    }
    setTransactions((prev) => [newTx, ...prev])
  }

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) => prev.map((tx) => (tx.id === id ? { ...tx, ...updates } : tx)))
  }

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id))
  }

  const addChatMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    }
    setChatMessages((prev) => [...prev, newMessage])
  }

  return (
    <BudgetContext.Provider
      value={{
        transactions,
        budgets,
        alerts,
        badges,
        challenges,
        userProfile,
        chatMessages,
        totalBalance,
        monthlyIncome,
        monthlySavings,
        addTransaction,
        updateTransaction,
        setUserProfile,
        dismissAlert,
        addChatMessage,
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}

export function useBudget() {
  const context = useContext(BudgetContext)
  if (!context) {
    throw new Error("useBudget must be used within a BudgetProvider")
  }
  return context
}
