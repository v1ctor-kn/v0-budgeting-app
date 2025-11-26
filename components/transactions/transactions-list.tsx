"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useBudget } from "@/lib/budget-context"
import { Sparkles, Check, Search, Filter, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { categories } from "@/lib/mock-data"

export function TransactionsList() {
  const { transactions, updateTransaction } = useBudget()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || tx.category.id === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">All Transactions</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 w-48"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {selectedCategory ? categories.find((c) => c.id === selectedCategory)?.name : "All Categories"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedCategory(null)}>All Categories</DropdownMenuItem>
                {categories.map((cat) => (
                  <DropdownMenuItem key={cat.id} onClick={() => setSelectedCategory(cat.id)}>
                    {cat.icon} {cat.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {filteredTransactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-xl">
                {tx.category.icon}
              </div>
              <div>
                <p className="font-medium">{tx.description}</p>
                <div className="flex items-center gap-2 mt-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        {tx.category.name}
                        <ChevronDown className="h-3 w-3 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {categories.map((cat) => (
                        <DropdownMenuItem
                          key={cat.id}
                          onClick={() =>
                            updateTransaction(tx.id, {
                              category: cat,
                              isManuallySet: true,
                              aiConfidence: 1,
                            })
                          }
                        >
                          {cat.icon} {cat.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {!tx.isManuallySet ? (
                    <Badge variant="secondary" className="text-[10px] h-5 gap-1">
                      <Sparkles className="h-3 w-3" />
                      AI {Math.round(tx.aiConfidence * 100)}%
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[10px] h-5 gap-1">
                      <Check className="h-3 w-3" />
                      Manual
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-destructive">-${tx.amount.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(tx.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
