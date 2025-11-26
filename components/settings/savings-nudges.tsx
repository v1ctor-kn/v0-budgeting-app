"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useBudget } from "@/lib/budget-context"
import { Sparkles, Coffee, Utensils, Car, Zap } from "lucide-react"
import type { UserProfile } from "@/lib/types"

type Nudge = {
  id: string
  title: string
  description: string
  savingAmount: number
  icon: typeof Coffee
}

const nudgesByProfile: Record<UserProfile, Nudge[]> = {
  student: [
    {
      id: "1",
      title: "Library Coffee",
      description: "Free coffee at the library instead of Starbucks",
      savingAmount: 25,
      icon: Coffee,
    },
    {
      id: "2",
      title: "Campus Dining",
      description: "Use meal plan instead of ordering delivery",
      savingAmount: 80,
      icon: Utensils,
    },
    { id: "3", title: "Bike to Class", description: "Skip the rideshare for short trips", savingAmount: 40, icon: Car },
  ],
  freelancer: [
    {
      id: "1",
      title: "Home Office Coffee",
      description: "Invest in good coffee maker, skip cafes",
      savingAmount: 60,
      icon: Coffee,
    },
    {
      id: "2",
      title: "Batch Cooking",
      description: "Prep lunches instead of ordering",
      savingAmount: 120,
      icon: Utensils,
    },
    { id: "3", title: "Co-working Pass", description: "Monthly pass vs. daily rates", savingAmount: 50, icon: Zap },
  ],
  family: [
    {
      id: "1",
      title: "Family Meal Nights",
      description: "Cook together instead of takeout",
      savingAmount: 150,
      icon: Utensils,
    },
    { id: "2", title: "Carpool Kids", description: "Share school runs with neighbors", savingAmount: 80, icon: Car },
    {
      id: "3",
      title: "Thermostat Smart",
      description: "Program heating/cooling schedules",
      savingAmount: 40,
      icon: Zap,
    },
  ],
  professional: [
    {
      id: "1",
      title: "Office Coffee",
      description: "Use office amenities instead of buying",
      savingAmount: 50,
      icon: Coffee,
    },
    {
      id: "2",
      title: "Lunch Prep",
      description: "Meal prep Sundays for the work week",
      savingAmount: 100,
      icon: Utensils,
    },
    { id: "3", title: "Public Transit", description: "Use transit pass for commute", savingAmount: 120, icon: Car },
  ],
}

export function SavingsNudges() {
  const { userProfile } = useBudget()
  const nudges = nudgesByProfile[userProfile]
  const totalSavings = nudges.reduce((acc, n) => acc + n.savingAmount, 0)

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Savings Nudges
          </CardTitle>
          <Badge variant="default">${totalSavings}/mo</Badge>
        </div>
        <p className="text-xs text-muted-foreground">Small changes for your {userProfile} lifestyle</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {nudges.map((nudge) => (
          <div
            key={nudge.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <nudge.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{nudge.title}</p>
              <p className="text-xs text-muted-foreground truncate">{nudge.description}</p>
            </div>
            <span className="text-sm font-semibold text-primary">+${nudge.savingAmount}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
