"use client"

import { useState } from "react"
import { DashboardView } from "@/components/dashboard-view"
import { IncomeView } from "@/components/income-view"
import { ExpensesView } from "@/components/expenses-view"
import { BudgetsView } from "@/components/budgets-view"
import { SavingsView } from "@/components/savings-view"
import { ReportsView } from "@/components/reports-view"
import { AuthView } from "@/components/auth-view"
import { SettingsView } from "@/components/settings-view"
import { AIInsightsView } from "@/components/ai-insights-view"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, TrendingUp, CreditCard, Target, PieChart, DollarSign, LogOut, Settings, Brain } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/auth-store"
import { useBudgetStore } from "@/lib/store"
import { getTranslation } from "@/lib/i18n"
import { ModeToggle } from "@/components/mode-toggle"

export default function BudgetApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { isAuthenticated, user, logout } = useAuthStore()
  const { locale } = useBudgetStore()

  if (!isAuthenticated) {
    return <AuthView />
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 z-0">
        <img
          src="/abstract-financial-growth-chart-with-soft-gradient.jpg"
          alt=""
          className="w-full h-full object-cover opacity-5"
        />
      </div>
      
      <div className="relative z-10">
        <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-balance">BudgetWise</h1>
                  <p className="text-xs text-muted-foreground">Smart Money Management</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <ModeToggle />
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <Button variant="outline" size="sm" onClick={logout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-2 h-auto p-1 bg-muted/50">
              <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <DollarSign className="w-4 h-4" />
                <span className="hidden sm:inline">{getTranslation(locale, 'dashboard')}</span>
              </TabsTrigger>
              <TabsTrigger value="income" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">{getTranslation(locale, 'income')}</span>
              </TabsTrigger>
              <TabsTrigger value="expenses" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <CreditCard className="w-4 h-4" />
                <span className="hidden sm:inline">{getTranslation(locale, 'expenses')}</span>
              </TabsTrigger>
              <TabsTrigger value="budgets" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">{getTranslation(locale, 'budgets')}</span>
              </TabsTrigger>
              <TabsTrigger value="savings" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">{getTranslation(locale, 'savings')}</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <PieChart className="w-4 h-4" />
                <span className="hidden sm:inline">{getTranslation(locale, 'reports')}</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">{getTranslation(locale, 'insights')}</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">{getTranslation(locale, 'settings')}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <DashboardView />
            </TabsContent>

            <TabsContent value="income" className="space-y-6">
              <IncomeView />
            </TabsContent>

            <TabsContent value="expenses" className="space-y-6">
              <ExpensesView />
            </TabsContent>

            <TabsContent value="budgets" className="space-y-6">
              <BudgetsView />
            </TabsContent>

            <TabsContent value="savings" className="space-y-6">
              <SavingsView />
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <ReportsView />
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              <AIInsightsView />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <SettingsView />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
