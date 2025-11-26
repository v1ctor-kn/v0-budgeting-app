"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Brain, Sparkles, TrendingUp } from "lucide-react"

const weekdaySpending = [
  { day: "Mon", spending: 45, average: 52 },
  { day: "Tue", spending: 38, average: 52 },
  { day: "Wed", spending: 52, average: 52 },
  { day: "Thu", spending: 48, average: 52 },
  { day: "Fri", spending: 85, average: 52 },
  { day: "Sat", spending: 120, average: 52 },
  { day: "Sun", spending: 95, average: 52 },
]

const patterns = [
  {
    id: "1",
    pattern: "Weekend Overspending",
    description: "You spend 60% more on weekends compared to weekdays",
    severity: "high",
    threshold: "Dynamic: $75/day weekend limit recommended",
  },
  {
    id: "2",
    pattern: "Friday Dining Surge",
    description: "Friday restaurant spending is 3x your daily average",
    severity: "medium",
    threshold: "AI adjusted: Alert at $50+ single dining expense on Fridays",
  },
  {
    id: "3",
    pattern: "End-of-Month Rush",
    description: "Spending increases 25% in the last week of each month",
    severity: "low",
    threshold: "Proactive reminder on the 20th of each month",
  },
]

export function BehaviorPatterns() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Detected Behavior Patterns
          </CardTitle>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            AI Analysis
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekdaySpending}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
              <XAxis dataKey="day" className="text-xs" />
              <YAxis className="text-xs" tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`$${value}`, ""]}
              />
              <Bar dataKey="spending" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="average" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Daily Spending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-muted" />
            <span className="text-muted-foreground">Weekly Average</span>
          </div>
        </div>

        <div className="space-y-3">
          {patterns.map((pattern) => (
            <div key={pattern.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp
                  className={`h-4 w-4 ${
                    pattern.severity === "high"
                      ? "text-destructive"
                      : pattern.severity === "medium"
                        ? "text-warning"
                        : "text-muted-foreground"
                  }`}
                />
                <p className="font-medium">{pattern.pattern}</p>
                <Badge
                  variant={
                    pattern.severity === "high"
                      ? "destructive"
                      : pattern.severity === "medium"
                        ? "secondary"
                        : "outline"
                  }
                  className="text-[10px]"
                >
                  {pattern.severity}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{pattern.description}</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-primary">
                <Sparkles className="h-3 w-3" />
                {pattern.threshold}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
