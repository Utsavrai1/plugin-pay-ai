"use client"

import { useState } from "react"
import { AIAgentCard } from "@/components/ai-agents/ai-agent-card"
import { AIAgentDetailModal } from "@/components/ai-agents/ai-agent-detail-modal"
import { agentsData } from "@/components/ai-agents/agents-data"

export function AIAgentsOverview() {
  const [selectedAgent, setSelectedAgent] = useState<(typeof agentsData)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = (agent: (typeof agentsData)[0]) => {
    setSelectedAgent(agent)
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Agents</h1>
        <p className="text-muted-foreground">
          Manage your AI agents that automate sales operations and coaching tasks.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {agentsData.map((agent) => (
          <AIAgentCard key={agent.id} agent={agent} onClick={() => handleCardClick(agent)} />
        ))}
      </div>

      <AIAgentDetailModal agent={selectedAgent} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
