export type UserProfile = "student" | "freelancer" | "family" | "professional"

export interface Transaction {
  id: string
  description: string
  amount: number
  date: string
  category: Category
  aiConfidence: number
  isManuallySet: boolean
}

export interface Category {
  id: string
  name: string
  icon: string
  color: string
  budget?: number
}

export interface Budget {
  category: Category
  allocated: number
  spent: number
  aiRecommended: number
}

export interface Prediction {
  month: string
  predictedSpending: number
  predictedSavings: number
  confidence: number
}

export interface Alert {
  id: string
  type: "warning" | "info" | "success" | "danger"
  title: string
  message: string
  isAiGenerated: boolean
  timestamp: string
  priority: number
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt?: string
  progress: number
  target: number
}

export interface Challenge {
  id: string
  title: string
  description: string
  target: number
  current: number
  deadline: string
  reward: string
  isAiGenerated: boolean
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export interface FinancialInsight {
  id: string
  type: "saving" | "spending" | "tip" | "alert"
  title: string
  description: string
  impact?: number
  confidence: number
}
