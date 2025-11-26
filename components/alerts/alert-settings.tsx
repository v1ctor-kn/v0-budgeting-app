"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Sparkles, Bell, Brain, Zap } from "lucide-react"

export function AlertSettings() {
  const [aiEnabled, setAiEnabled] = useState(true)
  const [sensitivity, setSensitivity] = useState([70])
  const [adaptiveThresholds, setAdaptiveThresholds] = useState(true)
  const [weekendMode, setWeekendMode] = useState(true)

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Alert Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            <Label htmlFor="ai-alerts" className="text-sm">
              AI-Powered Alerts
            </Label>
          </div>
          <Switch id="ai-alerts" checked={aiEnabled} onCheckedChange={setAiEnabled} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Alert Sensitivity</Label>
            <span className="text-sm text-muted-foreground">{sensitivity[0]}%</span>
          </div>
          <Slider value={sensitivity} onValueChange={setSensitivity} max={100} step={10} className="w-full" />
          <p className="text-xs text-muted-foreground">Higher sensitivity = more alerts for smaller deviations</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <div>
              <Label htmlFor="adaptive" className="text-sm">
                Adaptive Thresholds
              </Label>
              <p className="text-xs text-muted-foreground">AI adjusts limits based on your habits</p>
            </div>
          </div>
          <Switch id="adaptive" checked={adaptiveThresholds} onCheckedChange={setAdaptiveThresholds} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <div>
              <Label htmlFor="weekend" className="text-sm">
                Weekend Mode
              </Label>
              <p className="text-xs text-muted-foreground">Relaxed thresholds on Sat & Sun</p>
            </div>
          </div>
          <Switch id="weekend" checked={weekendMode} onCheckedChange={setWeekendMode} />
        </div>
      </CardContent>
    </Card>
  )
}
