"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Target, TrendingUp, Calendar } from "lucide-react"

const savingsGoals = [
  { name: "Emergency Fund", target: 10000, current: 6200, projected: 8500, deadline: "Dec 2024" },
  { name: "Vacation", target: 3000, current: 1200, projected: 2800, deadline: "Jun 2024" },
  { name: "New Car", target: 15000, current: 4500, projected: 7200, deadline: "Dec 2025" },
]

export function SavingsProjection() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Savings Goals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {savingsGoals.map((goal) => {
          const currentProgress = (goal.current / goal.target) * 100
          const projectedProgress = (goal.projected / goal.target) * 100

          return (
            <div key={goal.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{goal.name}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {goal.deadline}
                </div>
              </div>
              <div className="relative">
                <Progress value={currentProgress} className="h-3" />
                <div
                  className="absolute top-0 h-3 border-r-2 border-dashed border-primary"
                  style={{ left: `${Math.min(projectedProgress, 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                </span>
                <div className="flex items-center gap-1 text-primary">
                  <Sparkles className="h-3 w-3" />
                  <span>Projected: ${goal.projected.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )
        })}

        <div className="p-3 rounded-lg bg-primary/10 mt-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">AI Insight</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Based on your patterns, increasing savings by $100/month would help you reach your Emergency Fund goal 3
            months earlier.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
