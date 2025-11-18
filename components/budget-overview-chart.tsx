"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useBudgetStore } from "@/lib/store"

export function BudgetOverviewChart() {
  const { budgets, expenses } = useBudgetStore()

  const data = budgets.map(budget => {
    const spent = expenses
      .filter(exp => exp.category === budget.category)
      .reduce((sum, exp) => sum + exp.amount, 0)
    
    return {
      category: budget.category,
      budget: budget.limit,
      spent: spent
    }
  })

  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No budget data available
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
        <Legend />
        <Bar dataKey="budget" fill="hsl(var(--chart-1))" name="Budget" />
        <Bar dataKey="spent" fill="hsl(var(--chart-2))" name="Spent" />
      </BarChart>
    </ResponsiveContainer>
  )
}
