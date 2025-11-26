"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowRight } from "lucide-react"
import { predictions } from "@/lib/mock-data"

export function MonthlyBreakdown() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Monthly Projections</CardTitle>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            Next 5 Months
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-5">
          {predictions.map((pred, index) => (
            <div key={pred.month} className="relative p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
              {index < predictions.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground hidden md:block" />
              )}
              <p className="text-lg font-semibold">{pred.month}</p>
              <div className="mt-3 space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground">Spending</p>
                  <p className="text-sm font-medium text-destructive">${pred.predictedSpending.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Savings</p>
                  <p className="text-sm font-medium text-primary">${pred.predictedSavings.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t">
                <div className="flex items-center gap-1">
                  <div className="h-1.5 rounded-full bg-primary" style={{ width: `${pred.confidence * 100}%` }} />
                  <span className="text-[10px] text-muted-foreground">{Math.round(pred.confidence * 100)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
