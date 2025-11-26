"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useBudget } from "@/lib/budget-context"
import { Sparkles, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

export function BudgetOptimizer() {
  const { budgets } = useBudget()

  const optimizations = budgets.slice(0, 5).map((budget) => {
    const diff = budget.aiRecommended - budget.allocated
    return {
      category: budget.category,
      current: budget.allocated,
      recommended: budget.aiRecommended,
      difference: diff,
      direction: diff > 0 ? "increase" : diff < 0 ? "decrease" : "same",
    }
  })

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Budget Optimizer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {optimizations.map((opt) => (
          <div key={opt.category.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-2">
              <span className="text-lg">{opt.category.icon}</span>
              <div>
                <p className="text-sm font-medium">{opt.category.name}</p>
                <p className="text-xs text-muted-foreground">
                  ${opt.current} → ${opt.recommended}
                </p>
              </div>
            </div>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                opt.direction === "increase"
                  ? "text-destructive"
                  : opt.direction === "decrease"
                    ? "text-primary"
                    : "text-muted-foreground"
              }`}
            >
              {opt.direction === "increase" ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : opt.direction === "decrease" ? (
                <ArrowDownRight className="h-4 w-4" />
              ) : (
                <Minus className="h-4 w-4" />
              )}
              ${Math.abs(opt.difference)}
            </div>
          </div>
        ))}

        <Button className="w-full mt-4 bg-transparent" variant="outline">
          <Sparkles className="h-4 w-4 mr-2" />
          Apply All Recommendations
        </Button>
      </CardContent>
    </Card>
  )
}
