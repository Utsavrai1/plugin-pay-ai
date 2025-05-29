"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Settings, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AIAgentCard } from "@/components/ai-agents/ai-agent-card";
import { AIAgentDetailModal } from "@/components/ai-agents/ai-agent-detail-modal";
import { agentsData } from "@/components/ai-agents/agents-data";

export function AIAgentsOverview() {
  const [selectedAgent, setSelectedAgent] = useState<
    (typeof agentsData)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Check if configuration is complete
    const configStatus = localStorage.getItem("agentConfigurationStatus");
    setIsConfigured(configStatus === "complete");
  }, []);

  const handleCardClick = (agent: (typeof agentsData)[0]) => {
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Agents</h1>
          <p className="text-muted-foreground">
            Manage your AI agents that automate sales operations and coaching
            tasks.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isConfigured && (
            <Badge variant="default" className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Configured
            </Badge>
          )}
          <Link href="/dashboard/ai-agents/config">
            <Button variant="outline" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {isConfigured ? "Update Configuration" : "Configure Agents"}
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {agentsData.map((agent) => (
          <AIAgentCard
            key={agent.id}
            agent={agent}
            onClick={() => handleCardClick(agent)}
          />
        ))}
      </div>

      <AIAgentDetailModal
        agent={selectedAgent}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
