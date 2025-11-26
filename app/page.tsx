import { BudgetProvider } from "@/lib/budget-context"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { BalanceCard } from "@/components/dashboard/balance-card"
import { AiInsightsCard } from "@/components/dashboard/ai-insights-card"
import { SpendingChart } from "@/components/dashboard/spending-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { BudgetProgress } from "@/components/dashboard/budget-progress"
import { QuickActions } from "@/components/dashboard/quick-actions"

export default function DashboardPage() {
  return (
    <BudgetProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Welcome back, Alex</h1>
              <p className="text-muted-foreground">Here&apos;s your financial overview for January 2024</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <BalanceCard />
                  <QuickActions />
                </div>
                <SpendingChart />
                <RecentTransactions />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <AiInsightsCard />
                <BudgetProgress />
              </div>
            </div>
          </main>
        </div>
      </div>
    </BudgetProvider>
  )
}
