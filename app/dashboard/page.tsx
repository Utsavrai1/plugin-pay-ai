import type { Metadata } from "next"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

export const metadata: Metadata = {
  title: "Dashboard | Sales Team Productivity",
  description: "Overview of your sales team performance and productivity metrics",
}

export default function DashboardPage() {
  return <DashboardOverview />
}
