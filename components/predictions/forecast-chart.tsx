"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { Sparkles, TrendingUp } from "lucide-react"

const historicalData = [
  { month: "Oct", actual: 2650, predicted: null },
  { month: "Nov", actual: 2800, predicted: null },
  { month: "Dec", actual: 3100, predicted: null },
  { month: "Jan", actual: 2750, predicted: 2780 },
]

const forecastData = [
  { month: "Jan", actual: 2750, predicted: 2780 },
  { month: "Feb", actual: null, predicted: 2850, lower: 2650, upper: 3050 },
  { month: "Mar", actual: null, predicted: 2720, lower: 2520, upper: 2920 },
  { month: "Apr", actual: null, predicted: 2900, lower: 2650, upper: 3150 },
  { month: "May", actual: null, predicted: 2650, lower: 2400, upper: 2900 },
  { month: "Jun", actual: null, predicted: 2800, lower: 2500, upper: 3100 },
]

const combinedData = [...historicalData.slice(0, -1), ...forecastData]

export function ForecastChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Spending Forecast
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">6-month projection with confidence intervals</p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            AI Forecast
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={combinedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number, name: string) => [
                  `$${value?.toLocaleString() || "N/A"}`,
                  name === "actual" ? "Actual" : name === "predicted" ? "Predicted" : name,
                ]}
              />
              <ReferenceLine x="Jan" stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
              <Area type="monotone" dataKey="upper" stroke="transparent" fill="url(#colorConfidence)" fillOpacity={1} />
              <Area type="monotone" dataKey="lower" stroke="transparent" fill="hsl(var(--card))" fillOpacity={1} />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                fill="url(#colorActual)"
                connectNulls={false}
              />
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="url(#colorPredicted)"
                connectNulls={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-chart-1" />
            <span className="text-muted-foreground">Historical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Predicted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-primary/20" />
            <span className="text-muted-foreground">Confidence Range</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
