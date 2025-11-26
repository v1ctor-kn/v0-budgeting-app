"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, CheckCircle, Info, AlertTriangle } from "lucide-react"

const modelDetails = {
  accuracy: 87,
  dataPoints: 156,
  lastUpdated: "2 hours ago",
  factors: [
    { name: "Historical spending", weight: 40, impact: "high" },
    { name: "Seasonal patterns", weight: 25, impact: "medium" },
    { name: "Income stability", weight: 20, impact: "high" },
    { name: "Economic indicators", weight: 15, impact: "low" },
  ],
}

export function AiPredictionDetails() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Model Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-muted/50 text-center">
            <p className="text-2xl font-bold text-primary">{modelDetails.accuracy}%</p>
            <p className="text-xs text-muted-foreground">Accuracy</p>
          </div>
          <div className="p-3 rounded-lg bg-muted/50 text-center">
            <p className="text-2xl font-bold">{modelDetails.dataPoints}</p>
            <p className="text-xs text-muted-foreground">Data Points</p>
          </div>
        </div>

        <div className="text-xs text-muted-foreground flex items-center gap-1">
          <Info className="h-3 w-3" />
          Last updated: {modelDetails.lastUpdated}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Prediction Factors</p>
          {modelDetails.factors.map((factor) => (
            <div key={factor.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
              <div className="flex items-center gap-2">
                {factor.impact === "high" ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : factor.impact === "medium" ? (
                  <Info className="h-4 w-4 text-warning" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-sm">{factor.name}</span>
              </div>
              <Badge
                variant={factor.impact === "high" ? "default" : factor.impact === "medium" ? "secondary" : "outline"}
                className="text-xs"
              >
                {factor.weight}%
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
