"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useBudget } from "@/lib/budget-context"
import { categories } from "@/lib/mock-data"
import { Plus, Sparkles, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function AddTransactionDialog() {
  const { addTransaction } = useBudget()
  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [suggestedCategory, setSuggestedCategory] = useState<(typeof categories)[0] | null>(null)

  const analyzeDescription = (desc: string) => {
    if (desc.length < 3) {
      setSuggestedCategory(null)
      return
    }

    setIsAnalyzing(true)

    // Simulate AI categorization
    setTimeout(() => {
      const lowerDesc = desc.toLowerCase()
      let category = categories[2] // Default to shopping

      if (
        lowerDesc.includes("coffee") ||
        lowerDesc.includes("restaurant") ||
        lowerDesc.includes("food") ||
        lowerDesc.includes("uber eats") ||
        lowerDesc.includes("doordash")
      ) {
        category = categories[0]
      } else if (
        lowerDesc.includes("uber") ||
        lowerDesc.includes("lyft") ||
        lowerDesc.includes("gas") ||
        lowerDesc.includes("parking")
      ) {
        category = categories[1]
      } else if (lowerDesc.includes("netflix") || lowerDesc.includes("spotify") || lowerDesc.includes("subscription")) {
        category = categories[7]
      } else if (lowerDesc.includes("electric") || lowerDesc.includes("water") || lowerDesc.includes("internet")) {
        category = categories[4]
      } else if (lowerDesc.includes("movie") || lowerDesc.includes("concert") || lowerDesc.includes("game")) {
        category = categories[3]
      }

      setSuggestedCategory(category)
      setIsAnalyzing(false)
    }, 500)
  }

  const handleSubmit = () => {
    if (!description || !amount || !suggestedCategory) return

    addTransaction({
      description,
      amount: Number.parseFloat(amount),
      date: new Date().toISOString().split("T")[0],
      category: suggestedCategory,
      aiConfidence: 0.92,
      isManuallySet: false,
    })

    setDescription("")
    setAmount("")
    setSuggestedCategory(null)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="e.g., Starbucks Coffee"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value)
                analyzeDescription(e.target.value)
              }}
            />
            {isAnalyzing && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                AI is analyzing...
              </div>
            )}
            {suggestedCategory && !isAnalyzing && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  AI suggests: {suggestedCategory.icon} {suggestedCategory.name}
                </Badge>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!description || !amount}>
            Add Transaction
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
