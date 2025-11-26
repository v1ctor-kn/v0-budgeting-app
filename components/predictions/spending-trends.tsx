"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Sparkles, ArrowUp, ArrowDown } from "lucide-react"

const categoryTrends = [
  { category: "Food", current: 450, predicted: 520, change: 15.5, trend: "up" },
  { category: "Transport", current: 280, predicted: 250, change: -10.7, trend: "down" },
  { category: "Shopping", current: 350, predicted: 400, change: 14.3, trend: "up" },
  { category: "Entertainment", current: 180, predicted: 160, change: -11.1, trend: "down" },
  { category: "Utilities", current: 230, predicted: 235, change: 2.2, trend: "up" },
  { category: "Subscriptions", current: 95, predicted: 95, change: 0, trend: "neutral" },
]

export function SpendingTrends() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Category Trends</CardTitle>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            AI Analysis
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryTrends} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
              <XAxis type="number" tickFormatter={(v) => `$${v}`} className="text-xs" />
              <YAxis type="category" dataKey="category" className="text-xs" width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`$${value}`, ""]}
              />
              <Bar dataKey="current" name="Current" radius={[0, 4, 4, 0]}>
                {categoryTrends.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="hsl(var(--chart-1))" />
                ))}
              </Bar>
              <Bar dataKey="predicted" name="Predicted" radius={[0, 4, 4, 0]}>
                {categoryTrends.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="hsl(var(--primary))" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categoryTrends.map((item) => (
            <div key={item.category} className="p-3 rounded-lg bg-muted/50">
              <p className="text-sm font-medium">{item.category}</p>
              <div className="flex items-center gap-1 mt-1">
                {item.trend === "up" ? (
                  <ArrowUp className="h-4 w-4 text-destructive" />
                ) : item.trend === "down" ? (
                  <ArrowDown className="h-4 w-4 text-primary" />
                ) : null}
                <span
                  className={`text-sm font-semibold ${
                    item.trend === "up"
                      ? "text-destructive"
                      : item.trend === "down"
                        ? "text-primary"
                        : "text-muted-foreground"
                  }`}
                >
                  {item.change > 0 ? "+" : ""}
                  {item.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
