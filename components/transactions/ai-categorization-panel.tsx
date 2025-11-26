"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Brain, CheckCircle, AlertCircle } from "lucide-react"
import { useBudget } from "@/lib/budget-context"

export function AiCategorizationPanel() {
  const { transactions } = useBudget()

  const aiCategorized = transactions.filter((tx) => !tx.isManuallySet)
  const highConfidence = aiCategorized.filter((tx) => tx.aiConfidence >= 0.9)
  const avgConfidence =
    aiCategorized.length > 0 ? aiCategorized.reduce((acc, tx) => acc + tx.aiConfidence, 0) / aiCategorized.length : 0

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Categorization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center p-4 rounded-lg bg-primary/10">
          <div className="text-4xl font-bold text-primary">{Math.round(avgConfidence * 100)}%</div>
          <p className="text-sm text-muted-foreground mt-1">Average Confidence</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm">AI Categorized</span>
            </div>
            <span className="text-sm font-medium">
              {aiCategorized.length} / {transactions.length}
            </span>
          </div>
          <Progress value={(aiCategorized.length / transactions.length) * 100} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <CheckCircle className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <p className="text-sm font-medium">High Confidence</p>
              <p className="text-xs text-muted-foreground">{highConfidence.length} transactions (90%+ confidence)</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <AlertCircle className="h-5 w-5 text-warning" />
            <div className="flex-1">
              <p className="text-sm font-medium">Needs Review</p>
              <p className="text-xs text-muted-foreground">
                {aiCategorized.length - highConfidence.length} transactions need verification
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center p-3 bg-muted/30 rounded-lg">
          <p>Our AI uses NLP to parse transaction descriptions and classify them into the most appropriate category.</p>
        </div>
      </CardContent>
    </Card>
  )
}
