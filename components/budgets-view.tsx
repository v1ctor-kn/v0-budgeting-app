"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, AlertTriangle } from 'lucide-react'
import { useBudgetStore } from "@/lib/store"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

const CATEGORIES = ["Food", "Transport", "Bills", "Entertainment", "Shopping", "Health", "Education", "Other"]

export function BudgetsView() {
  const { budgets, expenses, addBudget, removeBudget } = useBudgetStore()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    category: "Other",
    limit: "",
    period: "monthly" as "weekly" | "monthly"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addBudget({
      id: Date.now().toString(),
      category: formData.category,
      limit: parseFloat(formData.limit),
      period: formData.period
    })
    setFormData({
      category: "Other",
      limit: "",
      period: "monthly"
    })
    setOpen(false)
  }

  const getBudgetStatus = (budget: typeof budgets[0]) => {
    const spent = expenses
      .filter(exp => exp.category === budget.category)
      .reduce((sum, exp) => sum + exp.amount, 0)
    const percentage = (spent / budget.limit) * 100
    const remaining = budget.limit - spent

    return { spent, percentage, remaining }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-balance">Budget Management</h2>
          <p className="text-muted-foreground">Set spending limits and track your progress</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Budget</DialogTitle>
              <DialogDescription>Set a spending limit for a category</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="limit">Budget Limit</Label>
                <Input
                  id="limit"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.limit}
                  onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="period">Period</Label>
                <Select value={formData.period} onValueChange={(value: "weekly" | "monthly") => setFormData({ ...formData, period: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Create Budget</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {budgets.map((budget) => {
          const { spent, percentage, remaining } = getBudgetStatus(budget)
          const isWarning = percentage >= 90
          const isOver = percentage >= 100

          return (
            <Card key={budget.id} className={isOver ? "border-destructive" : isWarning ? "border-warning" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
                      {getCategoryIcon(budget.category)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{budget.category}</CardTitle>
                      <CardDescription className="capitalize">{budget.period} budget</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeBudget(budget.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Spent</span>
                  <span className="font-semibold">${spent.toFixed(2)} of ${budget.limit.toFixed(2)}</span>
                </div>
                <Progress 
                  value={Math.min(percentage, 100)} 
                  className={`h-3 ${isOver ? '[&>div]:bg-destructive' : isWarning ? '[&>div]:bg-warning' : ''}`}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isOver && (
                      <>
                        <AlertTriangle className="w-4 h-4 text-destructive" />
                        <span className="text-sm font-medium text-destructive">Over budget</span>
                      </>
                    )}
                    {isWarning && !isOver && (
                      <>
                        <AlertTriangle className="w-4 h-4 text-warning" />
                        <span className="text-sm font-medium text-warning">Approaching limit</span>
                      </>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${remaining < 0 ? 'text-destructive' : 'text-success'}`}>
                    {remaining >= 0 ? `$${remaining.toFixed(2)} remaining` : `$${Math.abs(remaining).toFixed(2)} over`}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
        {budgets.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <AlertTriangle className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No budgets set</p>
              <p className="text-sm text-muted-foreground">Create your first budget to start tracking spending limits</p>
            </CardContent>
          </Card>
        )}
      </div>
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
