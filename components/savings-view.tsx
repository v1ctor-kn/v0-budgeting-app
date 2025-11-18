"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Target, TrendingUp } from 'lucide-react'
import { useBudgetStore } from "@/lib/store"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export function SavingsView() {
  const { savingsGoals, addSavingsGoal, removeSavingsGoal, updateSavingsGoal } = useBudgetStore()
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    target: "",
    current: "0",
    deadline: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addSavingsGoal({
      id: Date.now().toString(),
      name: formData.name,
      target: parseFloat(formData.target),
      current: parseFloat(formData.current),
      deadline: formData.deadline
    })
    setFormData({
      name: "",
      target: "",
      current: "0",
      deadline: ""
    })
    setOpen(false)
  }

  const handleAddFunds = (goalId: string, amount: number) => {
    const goal = savingsGoals.find(g => g.id === goalId)
    if (goal) {
      updateSavingsGoal(goalId, { current: goal.current + amount })
    }
  }

  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.current, 0)
  const totalTarget = savingsGoals.reduce((sum, goal) => sum + goal.target, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-balance">Savings Goals</h2>
          <p className="text-muted-foreground">Track your progress toward financial goals</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Savings Goal</DialogTitle>
              <DialogDescription>Set a new financial target to work toward</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Goal Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Emergency Fund, Vacation, New Car"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Target Amount</Label>
                <Input
                  id="target"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="current">Current Amount</Label>
                <Input
                  id="current"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.current}
                  onChange={(e) => setFormData({ ...formData, current: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Target Date</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Create Goal</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
            <Target className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSaved.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Across all goals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Target</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalTarget.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{savingsGoals.length} active goals</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {savingsGoals.map((goal) => {
          const percentage = (goal.current / goal.target) * 100
          const remaining = goal.target - goal.current
          const daysRemaining = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

          return (
            <Card key={goal.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Target className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{goal.name}</CardTitle>
                      <CardDescription>
                        {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Deadline passed'}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSavingsGoal(goal.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">${goal.current.toFixed(2)} of ${goal.target.toFixed(2)}</span>
                </div>
                <Progress value={Math.min(percentage, 100)} className="h-3" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {percentage >= 100 ? '🎉 Goal reached!' : `$${remaining.toFixed(2)} to go`}
                  </span>
                  <span className="text-sm font-medium text-accent">{percentage.toFixed(1)}%</span>
                </div>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Add amount"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const input = e.currentTarget
                        const amount = parseFloat(input.value)
                        if (amount > 0) {
                          handleAddFunds(goal.id, amount)
                          input.value = ''
                        }
                      }
                    }}
                  />
                  <Button
                    onClick={(e) => {
                      const input = e.currentTarget.previousElementSibling as HTMLInputElement
                      const amount = parseFloat(input.value)
                      if (amount > 0) {
                        handleAddFunds(goal.id, amount)
                        input.value = ''
                      }
                    }}
                  >
                    Add Funds
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
        {savingsGoals.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Target className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No savings goals yet</p>
              <p className="text-sm text-muted-foreground">Create your first goal to start saving</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
