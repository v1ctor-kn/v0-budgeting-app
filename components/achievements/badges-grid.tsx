"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useBudget } from "@/lib/budget-context"
import { Award, Lock } from "lucide-react"

export function BadgesGrid() {
  const { badges } = useBudget()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Badges Collection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {badges.map((badge) => {
            const isEarned = !!badge.earnedAt
            const progress = (badge.progress / badge.target) * 100

            return (
              <div
                key={badge.id}
                className={`relative p-4 rounded-lg border text-center transition-all ${
                  isEarned ? "bg-primary/5 border-primary" : "bg-muted/50 opacity-75 hover:opacity-100"
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <p className="text-sm font-medium">{badge.name}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{badge.description}</p>

                {isEarned ? (
                  <p className="text-[10px] text-primary mt-2">
                    Earned {new Date(badge.earnedAt!).toLocaleDateString()}
                  </p>
                ) : (
                  <div className="mt-2">
                    <Progress value={progress} className="h-1.5" />
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {badge.progress} / {badge.target}
                    </p>
                  </div>
                )}

                {!isEarned && (
                  <div className="absolute top-2 right-2">
                    <Lock className="h-3 w-3 text-muted-foreground" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
