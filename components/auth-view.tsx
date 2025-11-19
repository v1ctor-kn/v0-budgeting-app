"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wallet, AlertCircle, TrendingUp, PieChart, Bell, ShieldCheck } from 'lucide-react'
import { useAuthStore } from "@/lib/auth-store"

export function AuthView() {
  const { login, register } = useAuthStore()
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" })
  const [loginError, setLoginError] = useState("")
  const [registerError, setRegisterError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")
    const success = login(loginForm.email, loginForm.password)
    if (!success) {
      setLoginError("Invalid email or password. Please try again.")
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setRegisterError("")
    const success = register(registerForm.name, registerForm.email, registerForm.password)
    if (!success) {
      setRegisterError("An account with this email already exists.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Background image with overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src="/modern-financial-dashboard-with-charts-and-graphs-.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      </div>

      {/* Floating elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md my-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4 shadow-lg shadow-primary/20">
            <Wallet className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-balance mb-2">BudgetWise</h1>
          <p className="text-muted-foreground text-lg">Smart Money Management for Everyone</p>
        </div>

        <Card className="border-2 shadow-xl bg-card/80 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{loginError}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="you@example.com"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  {registerError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{registerError}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="John Doe"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="you@example.com"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6 mb-12">
          Your data is stored securely on your device. We prioritize your privacy.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-4">
        <div className="bg-card/40 backdrop-blur-md p-6 rounded-xl border border-border/50 hover:bg-card/60 transition-colors">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Track Income & Expenses</h3>
          <p className="text-muted-foreground text-sm">Easily log your recurring and one-time transactions to see exactly where your money goes.</p>
        </div>

        <div className="bg-card/40 backdrop-blur-md p-6 rounded-xl border border-border/50 hover:bg-card/60 transition-colors">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <PieChart className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Visual Analytics</h3>
          <p className="text-muted-foreground text-sm">Understand your spending habits with beautiful, interactive charts and detailed reports.</p>
        </div>

        <div className="bg-card/40 backdrop-blur-md p-6 rounded-xl border border-border/50 hover:bg-card/60 transition-colors">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Bell className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Smart Alerts</h3>
          <p className="text-muted-foreground text-sm">Set monthly budgets and receive instant notifications when you're nearing your limits.</p>
        </div>

        <div className="bg-card/40 backdrop-blur-md p-6 rounded-xl border border-border/50 hover:bg-card/60 transition-colors">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Private & Secure</h3>
          <p className="text-muted-foreground text-sm">Your financial data stays on your device. We use local storage for maximum privacy and offline access.</p>
        </div>
      </div>
    </div>
  )
}
