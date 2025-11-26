"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award } from "lucide-react"

const leaderboardData = [
  { rank: 1, name: "You", points: 850, change: "+45", isUser: true },
  { rank: 2, name: "Sarah M.", points: 820, change: "+32", isUser: false },
  { rank: 3, name: "John D.", points: 795, change: "+28", isUser: false },
  { rank: 4, name: "Emma K.", points: 760, change: "+15", isUser: false },
  { rank: 5, name: "Mike R.", points: 720, change: "+20", isUser: false },
]

export function Leaderboard() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Leaderboard
          </CardTitle>
          <Badge variant="secondary">This Week</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {leaderboardData.map((entry) => (
          <div
            key={entry.rank}
            className={`flex items-center gap-3 p-3 rounded-lg ${
              entry.isUser ? "bg-primary/10 border border-primary" : "hover:bg-muted/50"
            }`}
          >
            <div className="w-8 text-center">
              {entry.rank === 1 ? (
                <Trophy className="h-5 w-5 mx-auto text-yellow-500" />
              ) : entry.rank === 2 ? (
                <Medal className="h-5 w-5 mx-auto text-gray-400" />
              ) : entry.rank === 3 ? (
                <Award className="h-5 w-5 mx-auto text-amber-600" />
              ) : (
                <span className="text-sm font-medium text-muted-foreground">#{entry.rank}</span>
              )}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-medium ${entry.isUser ? "text-primary" : ""}`}>{entry.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{entry.points}</p>
              <p className="text-xs text-primary">{entry.change}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
