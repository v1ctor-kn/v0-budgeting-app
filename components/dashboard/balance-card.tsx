"use client"

import { useBudget } from "@/lib/budget-context"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Wallet } from "lucide-react"

export function BalanceCard() {
  const { totalBalance, monthlyIncome, monthlySavings } = useBudget()

  return (
    <Card className="bg-primary text-primary-foreground">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Total Balance</p>
            <p className="text-3xl font-bold mt-1">
              ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="h-12 w-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Wallet className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs opacity-80">Income</p>
              <p className="text-sm font-semibold">${monthlyIncome.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
              <TrendingDown className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs opacity-80">Savings</p>
              <p className="text-sm font-semibold">${monthlySavings.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
