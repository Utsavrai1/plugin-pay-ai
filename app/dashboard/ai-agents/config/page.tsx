import type { Metadata } from "next";
import { AgentConfigSetup } from "@/components/ai-agents/agent-config-setup";

export const metadata: Metadata = {
  title: "Agent Configuration | Sales Team Productivity",
  description:
    "Configure your AI agents with necessary credentials and settings",
};

export default function AgentConfigPage() {
  return <AgentConfigSetup />;
}
