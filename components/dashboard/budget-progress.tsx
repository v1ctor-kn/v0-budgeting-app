"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useBudget } from "@/lib/budget-context"
import { Sparkles, AlertTriangle } from "lucide-react"

export function BudgetProgress() {
  const { budgets } = useBudget()

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Budget Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {budgets.slice(0, 5).map((budget) => {
          const percentage = Math.min((budget.spent / budget.allocated) * 100, 100)
          const isOverBudget = percentage >= 90
          const hasAiRecommendation = budget.aiRecommended !== budget.allocated

          return (
            <div key={budget.category.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{budget.category.icon}</span>
                  <span className="text-sm font-medium">{budget.category.name}</span>
                  {isOverBudget && <AlertTriangle className="h-4 w-4 text-destructive" />}
                </div>
                <div className="flex items-center gap-2">
                  {hasAiRecommendation && (
                    <span className="text-xs text-primary flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      AI: ${budget.aiRecommended}
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">
                    ${budget.spent} / ${budget.allocated}
                  </span>
                </div>
              </div>
              <Progress value={percentage} className={isOverBudget ? "[&>div]:bg-destructive" : ""} />
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
