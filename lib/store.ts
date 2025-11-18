"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Income {
  id: string
  source: string
  amount: number
  type: 'recurring' | 'one-time'
  frequency?: 'weekly' | 'monthly' | 'yearly'
  date: string
}

export interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

export interface Budget {
  id: string
  category: string
  limit: number
  period: 'weekly' | 'monthly'
}

export interface SavingsGoal {
  id: string
  name: string
  target: number
  current: number
  deadline: string
}

interface BudgetStore {
  income: Income[]
  expenses: Expense[]
  budgets: Budget[]
  savingsGoals: SavingsGoal[]
  addIncome: (income: Income) => void
  removeIncome: (id: string) => void
  addExpense: (expense: Expense) => void
  removeExpense: (id: string) => void
  addBudget: (budget: Budget) => void
  removeBudget: (id: string) => void
  addSavingsGoal: (goal: SavingsGoal) => void
  removeSavingsGoal: (id: string) => void
  updateSavingsGoal: (id: string, updates: Partial<SavingsGoal>) => void
}

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set) => ({
      income: [],
      expenses: [],
      budgets: [],
      savingsGoals: [],
      addIncome: (income) => set((state) => ({ income: [...state.income, income] })),
      removeIncome: (id) => set((state) => ({ income: state.income.filter((i) => i.id !== id) })),
      addExpense: (expense) => set((state) => ({ expenses: [...state.expenses, expense] })),
      removeExpense: (id) => set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) })),
      addBudget: (budget) => set((state) => ({ budgets: [...state.budgets, budget] })),
      removeBudget: (id) => set((state) => ({ budgets: state.budgets.filter((b) => b.id !== id) })),
      addSavingsGoal: (goal) => set((state) => ({ savingsGoals: [...state.savingsGoals, goal] })),
      removeSavingsGoal: (id) => set((state) => ({ savingsGoals: state.savingsGoals.filter((g) => g.id !== id) })),
      updateSavingsGoal: (id, updates) =>
        set((state) => ({
          savingsGoals: state.savingsGoals.map((g) => (g.id === id ? { ...g, ...updates } : g))
        }))
    }),
    {
      name: 'budget-storage'
    }
  )
)
