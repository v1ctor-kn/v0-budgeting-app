"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useBudget } from "@/lib/budget-context"
import { Send, Sparkles, Bot, User, Loader2, MessageSquare } from "lucide-react"
import type { ChatMessage } from "@/lib/types"

const quickQuestions = [
  "Can I afford a new laptop?",
  "What's my biggest expense?",
  "How much did I spend on food?",
  "Am I on track with savings?",
  "Show my spending trends",
]

export function ChatInterface() {
  const { chatMessages, addChatMessage, transactions, budgets, totalBalance, monthlySavings } = useBudget()
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const generateAiResponse = (question: string): string => {
    const lowerQ = question.toLowerCase()

    // Calculate some real data
    const totalSpent = transactions.reduce((acc, tx) => acc + tx.amount, 0)
    const foodSpending = transactions
      .filter((tx) => tx.category.name === "Food & Dining")
      .reduce((acc, tx) => acc + tx.amount, 0)
    const biggestCategory = budgets.reduce((max, b) => (b.spent > max.spent ? b : max), budgets[0])

    if (lowerQ.includes("afford") || lowerQ.includes("buy") || lowerQ.includes("laptop")) {
      const laptopCost = 1200
      const canAfford = totalBalance > laptopCost * 1.5
      if (canAfford) {
        return `Based on your current balance of $${totalBalance.toLocaleString()} and monthly savings of $${monthlySavings}, you can comfortably afford a laptop around $1,200. I recommend waiting until you have at least 3 months of expenses saved (about $8,500) before making this purchase. You're currently at $${totalBalance.toLocaleString()}, so you're in good shape! 💰`
      } else {
        return `With your current balance of $${totalBalance.toLocaleString()}, I'd suggest saving for another 2-3 months before purchasing a $1,200 laptop. This ensures you maintain a healthy emergency fund. Would you like me to create a savings plan for this goal?`
      }
    }

    if (lowerQ.includes("biggest expense") || lowerQ.includes("most money")) {
      return `Your biggest expense category is **${biggestCategory.category.name}** ${biggestCategory.category.icon} at $${biggestCategory.spent} this month. That's ${Math.round((biggestCategory.spent / biggestCategory.allocated) * 100)}% of your allocated budget. Would you like tips on reducing this category?`
    }

    if (lowerQ.includes("food") || lowerQ.includes("dining") || lowerQ.includes("eating")) {
      return `You've spent **$${foodSpending.toFixed(2)}** on Food & Dining this month. Based on your patterns, you spend about 35% more on weekends. Consider meal prepping on Sundays to save approximately $120/month. Your top food expenses are coffee shops and delivery services.`
    }

    if (lowerQ.includes("savings") || lowerQ.includes("track") || lowerQ.includes("goal")) {
      const savingsRate = (monthlySavings / 5500) * 100
      return `You're saving **$${monthlySavings}/month** which is a ${savingsRate.toFixed(1)}% savings rate. Financial experts recommend 20%, so you're doing great! At this pace, you'll have an additional $10,200 saved by the end of the year. Keep it up! 📈`
    }

    if (lowerQ.includes("trend") || lowerQ.includes("pattern") || lowerQ.includes("spending")) {
      return `Here are your spending trends:\n\n📊 **This Month**: $${totalSpent.toFixed(2)} total\n📈 **vs Last Month**: -5% (you're improving!)\n🔝 **Peak Day**: Fridays (40% higher)\n💡 **Tip**: Your weekend spending is 60% higher than weekdays. Setting a weekend budget of $150 could save you $200/month.`
    }

    if (lowerQ.includes("help") || lowerQ.includes("what can")) {
      return `I'm your AI financial assistant! I can help you with:\n\n💰 **Affordability checks** - "Can I afford X?"\n📊 **Spending analysis** - "What's my biggest expense?"\n🎯 **Goal tracking** - "Am I on track with savings?"\n💡 **Tips & advice** - "How can I save more?"\n📈 **Trends** - "Show my spending patterns"\n\nJust ask me anything about your finances!`
    }

    return `I analyzed your financial data and here's what I found: Your total balance is $${totalBalance.toLocaleString()}, with monthly savings of $${monthlySavings}. Your spending is well-distributed across categories. Is there something specific you'd like to know about your finances?`
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput("")

    addChatMessage({ role: "user", content: userMessage })
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(
      () => {
        const response = generateAiResponse(userMessage)
        addChatMessage({ role: "assistant", content: response })
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b bg-card">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold flex items-center gap-2">
              BudgetWise AI
              <Badge variant="secondary" className="gap-1 text-xs">
                <Sparkles className="h-3 w-3" />
                Powered by AI
              </Badge>
            </h2>
            <p className="text-sm text-muted-foreground">Ask me anything about your finances</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Start a Conversation</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              Ask me about your spending, savings goals, or get personalized financial advice.
            </p>
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
              {quickQuestions.map((q) => (
                <Button key={q} variant="outline" size="sm" onClick={() => handleQuickQuestion(q)} className="text-xs">
                  {q}
                </Button>
              ))}
            </div>
          </div>
        )}

        {chatMessages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}

        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <Card className="p-3 max-w-[80%]">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Analyzing your data...</span>
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions (when there are messages) */}
      {chatMessages.length > 0 && (
        <div className="px-4 py-2 border-t bg-muted/30">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickQuestions.slice(0, 3).map((q) => (
              <Button
                key={q}
                variant="ghost"
                size="sm"
                onClick={() => handleQuickQuestion(q)}
                className="text-xs shrink-0"
              >
                {q}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t bg-card">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your finances..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button type="submit" disabled={!input.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user"

  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser ? "bg-primary text-primary-foreground" : "bg-primary/10"
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-primary" />}
      </div>
      <Card className={`p-3 max-w-[80%] ${isUser ? "bg-primary text-primary-foreground" : ""}`}>
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className={`text-[10px] mt-1 ${isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          {new Date(message.timestamp).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
      </Card>
    </div>
  )
}
