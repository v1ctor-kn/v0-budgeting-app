import { BudgetProvider } from "@/lib/budget-context"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { AlertsList } from "@/components/alerts/alerts-list"
import { AlertInsights } from "@/components/alerts/alert-insights"
import { AlertSettings } from "@/components/alerts/alert-settings"
import { BehaviorPatterns } from "@/components/alerts/behavior-patterns"

export default function AlertsPage() {
  return (
    <BudgetProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Smart Alerts</h1>
              <p className="text-muted-foreground">AI-driven notifications that adapt to your behavior</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <AlertsList />
                <BehaviorPatterns />
              </div>
              <div className="space-y-6">
                <AlertInsights />
                <AlertSettings />
              </div>
            </div>
          </main>
        </div>
      </div>
    </BudgetProvider>
  )
}
