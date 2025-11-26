"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useBudget } from "@/lib/budget-context"
import { Sparkles, RefreshCw, Loader2, Zap, Gift } from "lucide-react"

const generatedChallenges = [
  {
    title: "Beat Your Record",
    description: "Spend less than last week on dining out",
    reward: "75 points",
    difficulty: "medium",
  },
  {
    title: "Savings Sprint",
    description: "Save 10% more than your monthly average",
    reward: "100 points",
    difficulty: "hard",
  },
  {
    title: "Subscription Audit",
    description: "Cancel one unused subscription this week",
    reward: "50 points + $15/mo saved",
    difficulty: "easy",
  },
]

export function AiChallengeGenerator() {
  const { userProfile } = useBudget()
  const [isGenerating, setIsGenerating] = useState(false)
  const [challenges, setChallenges] = useState(generatedChallenges)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      // Simulate AI generating new challenges
      setChallenges([...generatedChallenges].sort(() => Math.random() - 0.5))
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Challenges
          </CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">Personalized for your {userProfile} profile</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {challenges.map((challenge, index) => (
          <div key={index} className="p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <Zap
                className={`h-4 w-4 ${
                  challenge.difficulty === "hard"
                    ? "text-destructive"
                    : challenge.difficulty === "medium"
                      ? "text-warning"
                      : "text-primary"
                }`}
              />
              <p className="text-sm font-medium">{challenge.title}</p>
              <Badge
                variant={
                  challenge.difficulty === "hard"
                    ? "destructive"
                    : challenge.difficulty === "medium"
                      ? "secondary"
                      : "outline"
                }
                className="text-[10px] ml-auto"
              >
                {challenge.difficulty}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{challenge.description}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-primary">
              <Gift className="h-3 w-3" />
              {challenge.reward}
            </div>
          </div>
        ))}

        <Button className="w-full bg-transparent" variant="outline">
          <Sparkles className="h-4 w-4 mr-2" />
          Accept All Challenges
        </Button>
      </CardContent>
    </Card>
  )
}
