"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useBudget } from "@/lib/budget-context"
import { Target, Sparkles, Clock, Gift } from "lucide-react"

export function ActiveChallenges() {
  const { challenges } = useBudget()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Active Challenges
          </CardTitle>
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="h-3 w-3" />
            AI-Generated
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {challenges.map((challenge) => {
          const progress = Math.min((challenge.current / challenge.target) * 100, 100)
          const isComplete = challenge.current >= challenge.target
          const daysLeft = Math.ceil((new Date(challenge.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))

          return (
            <div
              key={challenge.id}
              className={`p-4 rounded-lg border ${isComplete ? "border-primary bg-primary/5" : ""}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{challenge.title}</p>
                    {challenge.isAiGenerated && (
                      <Badge variant="secondary" className="text-[10px] gap-0.5">
                        <Sparkles className="h-2.5 w-2.5" />
                        AI
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{challenge.description}</p>
                </div>
              </div>

              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {challenge.current} / {challenge.target}
                  </span>
                  <span className={isComplete ? "text-primary font-medium" : "text-muted-foreground"}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <Progress value={progress} className={isComplete ? "[&>div]:bg-primary" : ""} />
              </div>

              <div className="flex items-center justify-between mt-3 text-xs">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {daysLeft > 0 ? `${daysLeft} days left` : "Ended"}
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <Gift className="h-3 w-3" />
                  {challenge.reward}
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
