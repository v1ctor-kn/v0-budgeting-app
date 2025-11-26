"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, AlertCircle, Lightbulb, PiggyBank } from "lucide-react"
import { insights } from "@/lib/mock-data"

const iconMap = {
  saving: PiggyBank,
  spending: TrendingUp,
  tip: Lightbulb,
  alert: AlertCircle,
}

const colorMap = {
  saving: "bg-primary/10 text-primary",
  spending: "bg-chart-2/10 text-chart-2",
  tip: "bg-warning/10 text-warning",
  alert: "bg-destructive/10 text-destructive",
}

export function AiInsightsCard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Insights
          </CardTitle>
          <Badge variant="secondary" className="text-xs">
            {insights.length} new
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.slice(0, 3).map((insight) => {
          const Icon = iconMap[insight.type]
          return (
            <div
              key={insight.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
            >
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${colorMap[insight.type]}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{insight.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{insight.description}</p>
                {insight.impact && (
                  <p className="text-xs text-primary font-medium mt-1">Potential savings: ${insight.impact}/year</p>
                )}
              </div>
              <div className="text-xs text-muted-foreground shrink-0">{Math.round(insight.confidence * 100)}%</div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
