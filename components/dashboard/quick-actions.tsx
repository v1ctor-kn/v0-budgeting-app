"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, MessageSquare, Target, TrendingUp, Sparkles } from "lucide-react"
import Link from "next/link"

const actions = [
  { label: "Add Transaction", icon: Plus, href: "/transactions", aiPowered: false },
  { label: "Ask AI", icon: MessageSquare, href: "/chat", aiPowered: true },
  { label: "Set Goal", icon: Target, href: "/achievements", aiPowered: true },
  { label: "View Predictions", icon: TrendingUp, href: "/predictions", aiPowered: true },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Link key={action.label} href={action.href}>
              <Button
                variant="outline"
                className="w-full h-auto py-4 flex flex-col items-center gap-2 relative bg-transparent"
              >
                <action.icon className="h-5 w-5" />
                <span className="text-xs">{action.label}</span>
                {action.aiPowered && <Sparkles className="h-3 w-3 text-primary absolute top-2 right-2" />}
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
