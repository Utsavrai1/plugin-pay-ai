import type { Metadata } from "next"
import { AIAgentsOverview } from "@/components/ai-agents/ai-agents-overview"

export const metadata: Metadata = {
  title: "AI Agents | Sales Team Productivity",
  description: "Manage your AI agents that automate sales operations and coaching tasks",
}

export default function AIAgentsPage() {
  return <AIAgentsOverview />
}
