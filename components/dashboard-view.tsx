"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Wallet, Target, AlertCircle, Brain } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useBudgetStore } from "@/lib/store"
import { SpendingChart } from "@/components/spending-chart"
import { BudgetOverviewChart } from "@/components/budget-overview-chart"
import { formatCurrency } from "@/lib/utils"
import { getTranslation } from "@/lib/i18n"
import { useEffect } from "react"

export function DashboardView() {
  const { income, expenses, budgets, savingsGoals, locale, currency, insights, generateInsights } = useBudgetStore()

  useEffect(() => {
    generateInsights()
  }, [generateInsights])

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0)
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0)
  const totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.current, 0)
  const balance = totalIncome - totalExpenses

  const budgetAlerts = budgets.filter(budget => {
    const spent = expenses
      .filter(exp => exp.category === budget.category)
      .reduce((sum, exp) => sum + exp.amount, 0)
    return spent >= budget.limit * 0.9
  })

  const topInsight = insights[0]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-balance">{getTranslation(locale, 'financialOverview')}</h2>
        <p className="text-muted-foreground">{getTranslation(locale, 'trackFinances')}</p>
      </div>

      {topInsight && (
        <Alert className="border-primary bg-primary/5">
          <Brain className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary-foreground/90">
            <strong>AI Insight:</strong> {topInsight.description}
          </AlertDescription>
        </Alert>
      )}

      {budgetAlerts.length > 0 && (
        <Alert className="border-warning bg-warning/10">
          <AlertCircle className="h-4 w-4 text-warning-foreground" />
          <AlertDescription className="text-warning-foreground">
            <strong>{getTranslation(locale, 'budgetAlert')}:</strong> {getTranslation(locale, 'approachingLimit')} {budgetAlerts.length} {budgetAlerts.length === 1 ? getTranslation(locale, 'category') : getTranslation(locale, 'categories')}
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
            <CardTitle className="text-sm font-medium">{getTranslation(locale, 'totalIncome')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold">{formatCurrency(totalIncome, currency, locale)}</div>
            <p className="text-xs text-muted-foreground">{getTranslation(locale, 'thisMonth')}</p>
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
            <CardTitle className="text-sm font-medium">{getTranslation(locale, 'totalExpenses')}</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold">{formatCurrency(totalExpenses, currency, locale)}</div>
            <p className="text-xs text-muted-foreground">{getTranslation(locale, 'thisMonth')}</p>
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
            <CardTitle className="text-sm font-medium">{getTranslation(locale, 'balance')}</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-success' : 'text-destructive'}`}>
              {formatCurrency(balance, currency, locale)}
            </div>
            <p className="text-xs text-muted-foreground">{getTranslation(locale, 'availableFunds')}</p>
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
            <CardTitle className="text-sm font-medium">{getTranslation(locale, 'totalSavings')}</CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold">{formatCurrency(totalSavings, currency, locale)}</div>
            <p className="text-xs text-muted-foreground">{savingsGoals.length} {getTranslation(locale, 'activeGoals')}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{getTranslation(locale, 'spendingByCategory')}</CardTitle>
            <CardDescription>{getTranslation(locale, 'expenseDistribution')}</CardDescription>
          </CardHeader>
          <CardContent>
            <SpendingChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{getTranslation(locale, 'budgetOverview')}</CardTitle>
            <CardDescription>{getTranslation(locale, 'trackSpending')}</CardDescription>
          </CardHeader>
          <CardContent>
            <BudgetOverviewChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{getTranslation(locale, 'recentTransactions')}</CardTitle>
          <CardDescription>{getTranslation(locale, 'latestExpenses')}</CardDescription>
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
                  <p className="font-semibold text-destructive">-{formatCurrency(expense.amount, currency, locale)}</p>
                  <p className="text-xs text-muted-foreground">{new Date(expense.date).toLocaleDateString(locale)}</p>
                </div>
              </div>
            ))}
            {expenses.length === 0 && (
              <p className="text-center text-muted-foreground py-8">{getTranslation(locale, 'noTransactions')}</p>
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
