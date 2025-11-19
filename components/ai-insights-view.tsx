"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useBudgetStore } from "@/lib/store"
import { getTranslation } from "@/lib/i18n"
import { Brain, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react'
import { useEffect } from "react"

export function AIInsightsView() {
  const { insights, generateInsights, locale } = useBudgetStore()

  useEffect(() => {
    generateInsights()
  }, [generateInsights])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-balance">{getTranslation(locale, 'aiInsights')}</h2>
        <p className="text-muted-foreground">{getTranslation(locale, 'aiDescription')}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {insights.map((insight) => (
          <Card key={insight.id} className={`border-l-4 ${
            insight.impact === 'negative' ? 'border-l-destructive' : 
            insight.impact === 'positive' ? 'border-l-success' : 'border-l-primary'
          }`}>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className={`p-2 rounded-full ${
                insight.type === 'trend' ? 'bg-blue-100 text-blue-600' :
                insight.type === 'prediction' ? 'bg-amber-100 text-amber-600' :
                'bg-green-100 text-green-600'
              }`}>
                {insight.type === 'trend' && <TrendingUp className="h-5 w-5" />}
                {insight.type === 'prediction' && <AlertTriangle className="h-5 w-5" />}
                {insight.type === 'tip' && <Lightbulb className="h-5 w-5" />}
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base">{insight.title}</CardTitle>
                <CardDescription className="text-xs capitalize">{insight.type}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
        
        {insights.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Brain className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No insights yet</h3>
              <p className="text-muted-foreground">Add more income and expenses to generate AI insights.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
