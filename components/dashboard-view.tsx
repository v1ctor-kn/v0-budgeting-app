"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Wallet, Target, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { useBudgetStore } from "@/lib/store"
import { SpendingChart } from "@/components/spending-chart"
import { BudgetOverviewChart } from "@/components/budget-overview-chart"

export function DashboardView() {
  const { income, expenses, budgets, savingsGoals } = useBudgetStore()

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0)
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0)
  const totalBudget = budgets.reduce((sum, item) => sum + item.limit, 0)
  const totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.current, 0)
  const balance = totalIncome - totalExpenses

  const budgetAlerts = budgets.filter(budget => {
    const spent = expenses
      .filter(exp => exp.category === budget.category)
      .reduce((sum, exp) => sum + exp.amount, 0)
    return spent >= budget.limit * 0.9
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-balance">Financial Overview</h2>
        <p className="text-muted-foreground">Track your income, expenses, and savings at a glance</p>
      </div>

      {budgetAlerts.length > 0 && (
        <Alert className="border-warning bg-warning/10">
          <AlertCircle className="h-4 w-4 text-warning-foreground" />
          <AlertDescription className="text-warning-foreground">
            <strong>Budget Alert:</strong> You're approaching or exceeding limits in {budgetAlerts.length} {budgetAlerts.length === 1 ? 'category' : 'categories'}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <img
              src="/upward-trending-financial-graph.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold">${totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <img
              src="/downward-financial-chart-expenses.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <img
              src="/money-wallet-balance-financial.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-success' : 'text-destructive'}`}>
              ${balance.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Available funds</p>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <img
              src="/target-goal-achievement-savings.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold">${totalSavings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{savingsGoals.length} active goals</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
            <CardDescription>Your expense distribution this month</CardDescription>
          </CardHeader>
          <CardContent>
            <SpendingChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
            <CardDescription>Track your spending against budgets</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetOverviewChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.slice(0, 5).map((expense) => (
              <div key={expense.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-lg">{getCategoryIcon(expense.category)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">{expense.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-destructive">-${expense.amount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">{new Date(expense.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {expenses.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No transactions yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getCategoryIcon(category: string) {
  const icons: Record<string, string> = {
    Food: "🍔",
    Transport: "🚗",
    Bills: "📄",
    Entertainment: "🎬",
    Shopping: "🛍️",
    Health: "🏥",
    Education: "📚",
    Other: "💰"
  }
  return icons[category] || "💰"
}
