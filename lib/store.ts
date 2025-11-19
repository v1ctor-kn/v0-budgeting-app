"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Language } from './i18n'

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

export interface AIInsight {
  id: string
  type: 'trend' | 'prediction' | 'tip'
  title: string
  description: string
  impact?: 'positive' | 'negative' | 'neutral'
  date: string
}

interface BudgetStore {
  income: Income[]
  expenses: Expense[]
  budgets: Budget[]
  savingsGoals: SavingsGoal[]
  insights: AIInsight[]
  locale: Language
  currency: string
  highContrast: boolean
  
  addIncome: (income: Income) => void
  removeIncome: (id: string) => void
  addExpense: (expense: Expense) => void
  removeExpense: (id: string) => void
  addBudget: (budget: Budget) => void
  removeBudget: (id: string) => void
  addSavingsGoal: (goal: SavingsGoal) => void
  removeSavingsGoal: (id: string) => void
  updateSavingsGoal: (id: string, updates: Partial<SavingsGoal>) => void
  
  setLocale: (locale: Language) => void
  setCurrency: (currency: string) => void
  setHighContrast: (enabled: boolean) => void
  generateInsights: () => void
}

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set, get) => ({
      income: [],
      expenses: [],
      budgets: [],
      savingsGoals: [],
      insights: [],
      locale: 'en-US',
      currency: 'USD',
      highContrast: false,

      addIncome: (income) => set((state) => ({ income: [...state.income, income] })),
      removeIncome: (id) => set((state) => ({ income: state.income.filter((i) => i.id !== id) })),
      addExpense: (expense) => {
        set((state) => ({ expenses: [...state.expenses, expense] }))
        get().generateInsights()
      },
      removeExpense: (id) => set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) })),
      addBudget: (budget) => set((state) => ({ budgets: [...state.budgets, budget] })),
      removeBudget: (id) => set((state) => ({ budgets: state.budgets.filter((b) => b.id !== id) })),
      addSavingsGoal: (goal) => set((state) => ({ savingsGoals: [...state.savingsGoals, goal] })),
      removeSavingsGoal: (id) => set((state) => ({ savingsGoals: state.savingsGoals.filter((g) => g.id !== id) })),
      updateSavingsGoal: (id, updates) =>
        set((state) => ({
          savingsGoals: state.savingsGoals.map((g) => (g.id === id ? { ...g, ...updates } : g))
        })),
      
      setLocale: (locale) => set({ locale }),
      setCurrency: (currency) => set({ currency }),
      setHighContrast: (highContrast) => set({ highContrast }),
      
      generateInsights: () => {
        const { expenses, budgets } = get()
        const insights: AIInsight[] = []
        
        // 1. Weekend Spending Analysis
        const weekendExpenses = expenses.filter(e => {
          const day = new Date(e.date).getDay()
          return day === 0 || day === 6
        })
        const totalWeekend = weekendExpenses.reduce((sum, e) => sum + e.amount, 0)
        const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
        
        if (totalExpenses > 0 && (totalWeekend / totalExpenses) > 0.4) {
          insights.push({
            id: 'weekend-spending',
            type: 'trend',
            title: 'Weekend Spending Spike',
            description: 'You spend over 40% of your budget on weekends. Consider setting a weekend-specific limit.',
            impact: 'negative',
            date: new Date().toISOString()
          })
        }

        // 2. Predictive Budgeting
        budgets.forEach(budget => {
          const categoryExpenses = expenses.filter(e => e.category === budget.category)
          const totalCategory = categoryExpenses.reduce((sum, e) => sum + e.amount, 0)
          
          if (totalCategory > budget.limit * 0.8) {
            insights.push({
              id: `predict-${budget.id}`,
              type: 'prediction',
              title: `${budget.category} Alert`,
              description: `Based on current trends, you may exceed your ${budget.category} budget by 15% this month.`,
              impact: 'negative',
              date: new Date().toISOString()
            })
          }
        })

        // 3. Savings Tip
        const entertainmentExpenses = expenses.filter(e => e.category === 'Entertainment')
        const totalEntertainment = entertainmentExpenses.reduce((sum, e) => sum + e.amount, 0)
        
        if (totalEntertainment > 200) { // Arbitrary threshold
           insights.push({
            id: 'entertainment-tip',
            type: 'tip',
            title: 'Boost Your Savings',
            description: 'Reducing entertainment spending by 10% could add significant value to your emergency fund.',
            impact: 'positive',
            date: new Date().toISOString()
          })
        }

        set({ insights })
      }
    }),
    {
      name: 'budget-storage'
    }
  )
)
