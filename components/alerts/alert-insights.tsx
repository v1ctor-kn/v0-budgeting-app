"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useBudget } from "@/lib/budget-context"
import { Brain, TrendingDown, Shield } from "lucide-react"

export function AlertInsights() {
  const { alerts } = useBudget()

  const aiAlerts = alerts.filter((a) => a.isAiGenerated)
  const avgPriority = alerts.length > 0 ? alerts.reduce((acc, a) => acc + a.priority, 0) / alerts.length : 0

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Alert Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-muted/50 text-center">
            <p className="text-2xl font-bold text-primary">{aiAlerts.length}</p>
            <p className="text-xs text-muted-foreground">AI-Generated</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50 text-center">
            <p className="text-2xl font-bold">{avgPriority.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">Avg Priority</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Alert Accuracy</span>
            <span className="font-medium">94%</span>
          </div>
          <Progress value={94} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5">
            <TrendingDown className="h-4 w-4 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">Alerts Reduced</p>
              <p className="text-xs text-muted-foreground">23% fewer alerts as AI learns your patterns</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5">
            <Shield className="h-4 w-4 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">Fraud Prevention</p>
              <p className="text-xs text-muted-foreground">2 unusual transactions flagged this month</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
