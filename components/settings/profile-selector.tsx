"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBudget } from "@/lib/budget-context"
import { cn } from "@/lib/utils"
import { GraduationCap, Briefcase, Users, Building2, Sparkles } from "lucide-react"
import type { UserProfile } from "@/lib/types"

const profiles: { id: UserProfile; name: string; icon: typeof GraduationCap; description: string }[] = [
  {
    id: "student",
    name: "Student",
    icon: GraduationCap,
    description: "Limited income, focus on essentials and student discounts",
  },
  {
    id: "freelancer",
    name: "Freelancer",
    icon: Briefcase,
    description: "Variable income, quarterly taxes, project-based budgeting",
  },
  {
    id: "family",
    name: "Family",
    icon: Users,
    description: "Shared expenses, child costs, long-term savings goals",
  },
  {
    id: "professional",
    name: "Professional",
    icon: Building2,
    description: "Stable income, career growth, investment focus",
  },
]

export function ProfileSelector() {
  const { userProfile, setUserProfile } = useBudget()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Your Profile</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">AI tailors recommendations based on your lifestyle</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-primary">
            <Sparkles className="h-3 w-3" />
            AI-Personalized
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {profiles.map((profile) => {
            const isSelected = userProfile === profile.id
            return (
              <button
                key={profile.id}
                onClick={() => setUserProfile(profile.id)}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-lg border text-left transition-all",
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "hover:border-primary/50 hover:bg-muted/50",
                )}
              >
                <div
                  className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  <profile.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{profile.name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{profile.description}</p>
                </div>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
