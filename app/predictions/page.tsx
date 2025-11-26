import { BudgetProvider } from "@/lib/budget-context"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ForecastChart } from "@/components/predictions/forecast-chart"
import { SpendingTrends } from "@/components/predictions/spending-trends"
import { SavingsProjection } from "@/components/predictions/savings-projection"
import { AiPredictionDetails } from "@/components/predictions/ai-prediction-details"
import { MonthlyBreakdown } from "@/components/predictions/monthly-breakdown"

export default function PredictionsPage() {
  return (
    <BudgetProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Predictive Analytics</h1>
              <p className="text-muted-foreground">AI-powered forecasts based on your spending patterns</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <ForecastChart />
                <SpendingTrends />
              </div>
              <div className="space-y-6">
                <SavingsProjection />
                <AiPredictionDetails />
              </div>
            </div>

            <div className="mt-6">
              <MonthlyBreakdown />
            </div>
          </main>
        </div>
      </div>
    </BudgetProvider>
  )
}
