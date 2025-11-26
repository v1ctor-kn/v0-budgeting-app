import { BudgetProvider } from "@/lib/budget-context"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ChatInterface } from "@/components/chat/chat-interface"

export default function ChatPage() {
  return (
    <BudgetProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-64">
          <Header />
          <main className="h-[calc(100vh-4rem)]">
            <ChatInterface />
          </main>
        </div>
      </div>
    </BudgetProvider>
  )
}
