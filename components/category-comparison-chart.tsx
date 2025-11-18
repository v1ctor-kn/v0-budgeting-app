"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useBudgetStore } from "@/lib/store"

export function CategoryComparisonChart() {
  const { budgets, expenses } = useBudgetStore()

  const data = budgets.map(budget => {
    const spent = expenses
      .filter(exp => exp.category === budget.category)
      .reduce((sum, exp) => sum + exp.amount, 0)
    
    const percentage = (spent / budget.limit) * 100
    
    return {
      category: budget.category,
      percentage: Math.min(percentage, 100)
    }
  })

  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No budget comparison data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" domain={[0, 100]} />
        <YAxis dataKey="category" type="category" />
        <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
        <Bar dataKey="percentage" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  )
}
