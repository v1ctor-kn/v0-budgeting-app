"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useBudget } from "@/lib/budget-context"
import { Sparkles, ArrowRight, Lightbulb, PiggyBank, Shield } from "lucide-react"
import type { UserProfile } from "@/lib/types"

type Recommendation = {
  id: string
  title: string
  description: string
  impact: string
  icon: typeof Lightbulb
  type: "saving" | "budget" | "security" | "lifestyle"
  priority: "high" | "medium" | "low"
}

const recommendationsByProfile: Record<UserProfile, Recommendation[]> = {
  student: [
    {
      id: "1",
      title: "Student Subscription Bundles",
      description: "Switch to student plans for Spotify, Apple Music, and Adobe. Save up to 60% on subscriptions.",
      impact: "Save $45/month",
      icon: Lightbulb,
      type: "saving",
      priority: "high",
    },
    {
      id: "2",
      title: "Meal Prep Strategy",
      description: "Based on your dining patterns, meal prepping on Sundays could reduce food expenses significantly.",
      impact: "Save $120/month",
      icon: PiggyBank,
      type: "budget",
      priority: "high",
    },
    {
      id: "3",
      title: "Emergency Fund Start",
      description: "Start with just $25/week. You can build a $1,300 emergency fund by graduation.",
      impact: "Build safety net",
      icon: Shield,
      type: "security",
      priority: "medium",
    },
  ],
  freelancer: [
    {
      id: "1",
      title: "Quarterly Tax Reserve",
      description: "Set aside 25-30% of each payment for taxes. We detected irregular savings patterns.",
      impact: "Avoid tax penalties",
      icon: Shield,
      type: "security",
      priority: "high",
    },
    {
      id: "2",
      title: "Income Smoothing",
      description: "Your income varies by 40%. Create a 3-month buffer to stabilize monthly budgets.",
      impact: "Reduce stress",
      icon: PiggyBank,
      type: "budget",
      priority: "high",
    },
    {
      id: "3",
      title: "Business Expense Tracking",
      description: "We noticed potential deductible expenses. Separate business costs for tax benefits.",
      impact: "Tax deductions",
      icon: Lightbulb,
      type: "saving",
      priority: "medium",
    },
  ],
  family: [
    {
      id: "1",
      title: "Shared Expense Optimization",
      description: "Family phone plans and streaming bundles could save your household significantly.",
      impact: "Save $80/month",
      icon: Lightbulb,
      type: "saving",
      priority: "high",
    },
    {
      id: "2",
      title: "Education Savings (529)",
      description: "Based on your income, consider a 529 plan. Tax benefits and compound growth.",
      impact: "Long-term savings",
      icon: PiggyBank,
      type: "budget",
      priority: "high",
    },
    {
      id: "3",
      title: "Life Insurance Review",
      description: "With family dependents, ensure adequate coverage. Your current ratio may be low.",
      impact: "Family protection",
      icon: Shield,
      type: "security",
      priority: "medium",
    },
  ],
  professional: [
    {
      id: "1",
      title: "401(k) Match Optimization",
      description: "You may not be capturing full employer match. Increase contribution by 2%.",
      impact: "Free $2,400/year",
      icon: PiggyBank,
      type: "saving",
      priority: "high",
    },
    {
      id: "2",
      title: "Lifestyle Inflation Alert",
      description: "Your spending increased 15% with last raise. Redirect 50% to investments.",
      impact: "Build wealth faster",
      icon: Lightbulb,
      type: "budget",
      priority: "high",
    },
    {
      id: "3",
      title: "High-Yield Savings",
      description: "Your emergency fund could earn 5% APY instead of 0.5%. Switch banks.",
      impact: "Earn $400/year",
      icon: Shield,
      type: "saving",
      priority: "medium",
    },
  ],
}

export function PersonalizedRecommendations() {
  const { userProfile } = useBudget()
  const recommendations = recommendationsByProfile[userProfile]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Personalized Recommendations
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Tailored for your {userProfile} profile</p>
          </div>
          <Badge variant="secondary">{recommendations.length} suggestions</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div
              className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                rec.priority === "high"
                  ? "bg-primary/10 text-primary"
                  : rec.priority === "medium"
                    ? "bg-warning/10 text-warning"
                    : "bg-muted text-muted-foreground",
              )}
            >
              <rec.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium">{rec.title}</p>
                <Badge variant={rec.priority === "high" ? "default" : "secondary"} className="text-[10px]">
                  {rec.priority}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm font-medium text-primary">{rec.impact}</span>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  Apply
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
