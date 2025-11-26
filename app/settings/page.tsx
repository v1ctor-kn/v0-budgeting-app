import { BudgetProvider } from "@/lib/budget-context"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ProfileSelector } from "@/components/settings/profile-selector"
import { PersonalizedRecommendations } from "@/components/settings/personalized-recommendations"
import { BudgetOptimizer } from "@/components/settings/budget-optimizer"
import { SavingsNudges } from "@/components/settings/savings-nudges"

export default function SettingsPage() {
  return (
    <BudgetProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Settings & Recommendations</h1>
              <p className="text-muted-foreground">Personalized AI recommendations based on your profile</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <ProfileSelector />
                <PersonalizedRecommendations />
              </div>
              <div className="space-y-6">
                <BudgetOptimizer />
                <SavingsNudges />
              </div>
            </div>
          </main>
        </div>
      </div>
    </BudgetProvider>
  )
}
