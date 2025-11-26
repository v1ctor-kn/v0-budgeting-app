import { BudgetProvider } from "@/lib/budget-context"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { BadgesGrid } from "@/components/achievements/badges-grid"
import { ActiveChallenges } from "@/components/achievements/active-challenges"
import { ProgressTracker } from "@/components/achievements/progress-tracker"
import { Leaderboard } from "@/components/achievements/leaderboard"
import { AiChallengeGenerator } from "@/components/achievements/ai-challenge-generator"

export default function AchievementsPage() {
  return (
    <BudgetProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Achievements & Challenges</h1>
              <p className="text-muted-foreground">AI-generated challenges and personalized rewards</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <ProgressTracker />
                <ActiveChallenges />
                <BadgesGrid />
              </div>
              <div className="space-y-6">
                <AiChallengeGenerator />
                <Leaderboard />
              </div>
            </div>
          </main>
        </div>
      </div>
    </BudgetProvider>
  )
}
