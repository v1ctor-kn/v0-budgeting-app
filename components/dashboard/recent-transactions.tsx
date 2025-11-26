"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useBudget } from "@/lib/budget-context"
import { Sparkles, Check } from "lucide-react"
import Link from "next/link"

export function RecentTransactions() {
  const { transactions } = useBudget()

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
          <Link href="/transactions" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {transactions.slice(0, 5).map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-lg">
                {tx.category.icon}
              </div>
              <div>
                <p className="text-sm font-medium">{tx.description}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">{tx.category.name}</span>
                  {tx.aiConfidence >= 0.9 ? (
                    <Badge variant="secondary" className="text-[10px] h-4 px-1 gap-0.5">
                      <Sparkles className="h-2.5 w-2.5" />
                      AI
                    </Badge>
                  ) : tx.isManuallySet ? (
                    <Badge variant="outline" className="text-[10px] h-4 px-1 gap-0.5">
                      <Check className="h-2.5 w-2.5" />
                      Manual
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-destructive">-${tx.amount.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
