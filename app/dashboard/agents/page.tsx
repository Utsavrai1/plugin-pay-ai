import type { Metadata } from "next"
import { AgentProductivity } from "@/components/agents/agent-productivity"

export const metadata: Metadata = {
  title: "Agent Productivity | Sales Team Productivity",
  description: "Track and analyze your sales representatives' productivity",
}

export default function AgentsPage() {
  return <AgentProductivity />
}
