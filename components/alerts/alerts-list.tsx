"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useBudget } from "@/lib/budget-context"
import { AlertTriangle, Info, CheckCircle, XCircle, Sparkles, X, Bell, Clock } from "lucide-react"

const iconMap = {
  warning: AlertTriangle,
  info: Info,
  success: CheckCircle,
  danger: XCircle,
}

const colorMap = {
  warning: "bg-warning/10 text-warning border-warning/20",
  info: "bg-chart-2/10 text-chart-2 border-chart-2/20",
  success: "bg-primary/10 text-primary border-primary/20",
  danger: "bg-destructive/10 text-destructive border-destructive/20",
}

export function AlertsList() {
  const { alerts, dismissAlert } = useBudget()
  const [filter, setFilter] = useState<"all" | "warning" | "info" | "success" | "danger">("all")

  const filteredAlerts = alerts
    .filter((a) => filter === "all" || a.type === filter)
    .sort((a, b) => b.priority - a.priority)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Active Alerts
          </CardTitle>
          <div className="flex gap-1">
            {(["all", "danger", "warning", "info", "success"] as const).map((type) => (
              <Button
                key={type}
                variant={filter === type ? "default" : "ghost"}
                size="sm"
                onClick={() => setFilter(type)}
                className="text-xs capitalize"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No alerts in this category</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const Icon = iconMap[alert.type]
            return (
              <div key={alert.id} className={`flex items-start gap-4 p-4 rounded-lg border ${colorMap[alert.type]}`}>
                <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{alert.title}</p>
                    {alert.isAiGenerated && (
                      <Badge variant="secondary" className="text-[10px] gap-0.5">
                        <Sparkles className="h-2.5 w-2.5" />
                        AI
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-[10px]">
                      Priority: {alert.priority}/10
                    </Badge>
                  </div>
                  <p className="text-sm mt-1 opacity-90">{alert.message}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                    <Clock className="h-3 w-3" />
                    {new Date(alert.timestamp).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => dismissAlert(alert.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
