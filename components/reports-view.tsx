"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, TrendingUp, TrendingDown, FileText, Calendar } from 'lucide-react'
import { useBudgetStore } from "@/lib/store"
import { SpendingTrendChart } from "@/components/spending-trend-chart"
import { CategoryComparisonChart } from "@/components/category-comparison-chart"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function ReportsView() {
  const { income, expenses, budgets, savingsGoals } = useBudgetStore()
  const [reportPeriod, setReportPeriod] = useState("monthly")

  const totalIncome = income.reduce((sum, item) => sum + item.amount, 0)
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0)
  const totalSavings = savingsGoals.reduce((sum, goal) => sum + goal.current, 0)
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0

  const handleExport = (format: 'json' | 'csv') => {
    if (format === 'json') {
      const data = {
        summary: {
          totalIncome,
          totalExpenses,
          balance: totalIncome - totalExpenses,
          totalSavings,
          savingsRate: savingsRate.toFixed(2) + '%'
        },
        income,
        expenses,
        budgets,
        savingsGoals,
        exportDate: new Date().toISOString()
      }
      downloadFile(JSON.stringify(data, null, 2), 'json', 'application/json')
    } else {
      // Create CSV content
      const headers = ['Date', 'Type', 'Category', 'Description', 'Amount']
      const incomeRows = income.map(i => [new Date().toLocaleDateString(), 'Income', 'Income', i.source, i.amount])
      const expenseRows = expenses.map(e => [new Date(e.date).toLocaleDateString(), 'Expense', e.category, e.description, -e.amount])
      
      const csvContent = [
        headers.join(','),
        ...incomeRows.map(row => row.join(',')),
        ...expenseRows.map(row => row.join(','))
      ].join('\n')
      
      downloadFile(csvContent, 'csv', 'text/csv')
    }
  }

  const downloadFile = (content: string, extension: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `budget-report-${new Date().toISOString().split('T')[0]}.${extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-balance">Financial Reports</h2>
          <p className="text-muted-foreground">Analyze your spending patterns and trends</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('csv')} className="gap-2">
            <FileText className="w-4 h-4" />
            Export CSV/Excel
          </Button>
          <Button onClick={() => handleExport('json')} className="gap-2">
            <Download className="w-4 h-4" />
            Backup Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="tax">Tax Report</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Income</CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(totalIncome - totalExpenses).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">After expenses</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{savingsRate.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">Of total income</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Daily Spending</CardTitle>
                <TrendingDown className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(totalExpenses / 30).toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                <TrendingUp className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{income.length + expenses.length}</div>
                <p className="text-xs text-muted-foreground">This period</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>Key metrics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-muted-foreground">Income Sources</h4>
                    <div className="space-y-2">
                      {income.slice(0, 3).map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.source}</span>
                          <span className="font-medium text-success">+${item.amount.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-muted-foreground">Top Expenses</h4>
                    <div className="space-y-2">
                      {expenses
                        .sort((a, b) => b.amount - a.amount)
                        .slice(0, 3)
                        .map(item => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.description}</span>
                            <span className="font-medium text-destructive">-${item.amount.toFixed(2)}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Spending Trends</CardTitle>
                <CardDescription>Daily spending over time</CardDescription>
              </CardHeader>
              <CardContent>
                <SpendingTrendChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Comparison</CardTitle>
                <CardDescription>Budget vs actual spending</CardDescription>
              </CardHeader>
              <CardContent>
                <CategoryComparisonChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tax" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tax Report</CardTitle>
              <CardDescription>Summary of income and deductible expenses for tax purposes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium text-muted-foreground">Total Income</p>
                    <p className="text-2xl font-bold text-success">+${totalIncome.toFixed(2)}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
                    <p className="text-2xl font-bold text-destructive">-${totalExpenses.toFixed(2)}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
                    <p className="text-2xl font-bold">${(totalIncome - totalExpenses).toFixed(2)}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Expense Breakdown by Category</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Transaction Count</TableHead>
                        <TableHead className="text-right">Total Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(
                        expenses.reduce((acc, curr) => {
                          acc[curr.category] = (acc[curr.category] || 0) + curr.amount
                          return acc
                        }, {} as Record<string, number>)
                      ).map(([category, amount]) => (
                        <TableRow key={category}>
                          <TableCell>{category}</TableCell>
                          <TableCell>{expenses.filter(e => e.category === category).length}</TableCell>
                          <TableCell className="text-right">${amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
