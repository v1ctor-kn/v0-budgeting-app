import { BudgetProvider } from "@/lib/budget-context"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { TransactionsList } from "@/components/transactions/transactions-list"
import { AddTransactionDialog } from "@/components/transactions/add-transaction-dialog"
import { AiCategorizationPanel } from "@/components/transactions/ai-categorization-panel"

export default function TransactionsPage() {
  return (
    <BudgetProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Transactions</h1>
                <p className="text-muted-foreground">AI automatically categorizes your transactions</p>
              </div>
              <AddTransactionDialog />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <TransactionsList />
              </div>
              <div>
                <AiCategorizationPanel />
              </div>
            </div>
          </main>
        </div>
      </div>
    </BudgetProvider>
  )
}
