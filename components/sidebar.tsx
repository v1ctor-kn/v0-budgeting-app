"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Receipt,
  TrendingUp,
  MessageSquare,
  Bell,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Brain,
} from "lucide-react"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, aiPowered: false },
  { href: "/transactions", label: "Transactions", icon: Receipt, aiPowered: true },
  { href: "/predictions", label: "Predictions", icon: TrendingUp, aiPowered: true },
  { href: "/chat", label: "AI Assistant", icon: MessageSquare, aiPowered: true },
  { href: "/alerts", label: "Smart Alerts", icon: Bell, aiPowered: true },
  { href: "/achievements", label: "Achievements", icon: Trophy, aiPowered: true },
  { href: "/settings", label: "Settings", icon: Settings, aiPowered: false },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <Brain className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">BudgetWise</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors relative",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.aiPowered && <Sparkles className="h-3.5 w-3.5 text-sidebar-primary" />}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {!collapsed && (
        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-lg bg-sidebar-accent p-3">
            <div className="flex items-center gap-2 text-xs text-sidebar-foreground">
              <Sparkles className="h-4 w-4 text-sidebar-primary" />
              <span className="font-medium">60% AI-Powered</span>
            </div>
            <p className="mt-1 text-xs text-sidebar-foreground/70">Smart insights active</p>
          </div>
        </div>
      )}
    </aside>
  )
}
