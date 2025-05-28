import type { Metadata } from "next"
import { LeadScoring } from "@/components/leads/lead-scoring"

export const metadata: Metadata = {
  title: "Lead Scoring | Sales Team Productivity",
  description: "View and manage your leads ranked by priority score",
}

export default function LeadsPage() {
  return <LeadScoring />
}
