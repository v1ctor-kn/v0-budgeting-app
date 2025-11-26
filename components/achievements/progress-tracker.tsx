"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useBudget } from "@/lib/budget-context"
import { Trophy, Star, Flame, Target, Sparkles } from "lucide-react"

export function ProgressTracker() {
  const { badges, challenges } = useBudget()

  const earnedBadges = badges.filter((b) => b.earnedAt)
  const totalPoints = 850
  const currentStreak = 12
  const nextLevelPoints = 1000

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="p-4 rounded-lg bg-primary text-primary-foreground text-center">
            <Star className="h-6 w-6 mx-auto mb-2" />
            <p className="text-2xl font-bold">{totalPoints}</p>
            <p className="text-xs opacity-80">Total Points</p>
          </div>
          <div className="p-4 rounded-lg bg-muted text-center">
            <Trophy className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{earnedBadges.length}</p>
            <p className="text-xs text-muted-foreground">Badges Earned</p>
          </div>
          <div className="p-4 rounded-lg bg-muted text-center">
            <Flame className="h-6 w-6 mx-auto mb-2 text-warning" />
            <p className="text-2xl font-bold">{currentStreak}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
          <div className="p-4 rounded-lg bg-muted text-center">
            <Target className="h-6 w-6 mx-auto mb-2 text-chart-2" />
            <p className="text-2xl font-bold">{challenges.filter((c) => c.current >= c.target).length}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Level 4: Smart Saver</span>
            </div>
            <span className="text-muted-foreground">
              {totalPoints} / {nextLevelPoints} XP
            </span>
          </div>
          <Progress value={(totalPoints / nextLevelPoints) * 100} className="h-3" />
          <p className="text-xs text-muted-foreground text-center">
            {nextLevelPoints - totalPoints} points to reach Level 5: Budget Master
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
