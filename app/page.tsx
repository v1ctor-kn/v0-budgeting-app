"use client"

import { useState } from "react"
import { DashboardView } from "@/components/dashboard-view"
import { IncomeView } from "@/components/income-view"
import { ExpensesView } from "@/components/expenses-view"
import { BudgetsView } from "@/components/budgets-view"
import { SavingsView } from "@/components/savings-view"
import { ReportsView } from "@/components/reports-view"
import { AuthView } from "@/components/auth-view"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, TrendingUp, CreditCard, Target, PieChart, DollarSign, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/auth-store"

export default function BudgetApp() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { isAuthenticated, user, logout } = useAuthStore()

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
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-2 h-auto p-1 bg-muted/50">
              <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <DollarSign className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="income" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Income</span>
              </TabsTrigger>
              <TabsTrigger value="expenses" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <CreditCard className="w-4 h-4" />
                <span className="hidden sm:inline">Expenses</span>
              </TabsTrigger>
              <TabsTrigger value="budgets" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">Budgets</span>
              </TabsTrigger>
              <TabsTrigger value="savings" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Savings</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <PieChart className="w-4 h-4" />
                <span className="hidden sm:inline">Reports</span>
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
          </Tabs>
        </main>
      </div>
    </div>
  )
}
