"use client"

import { useState } from "react"
import { RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LeaderboardTable } from "@/components/dashboard/leaderboard-table"
import { SummaryCards } from "@/components/dashboard/summary-cards"

export function DashboardOverview() {
  const [timeframe, setTimeframe] = useState("today")
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your team's performance.</p>
      </div>

      <SummaryCards />

      <Tabs defaultValue="today" className="space-y-4" onValueChange={setTimeframe}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Daily Sales Activity Leaderboard</h2>
          <div className="flex items-center gap-2">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              <span className="sr-only">Refresh data</span>
            </Button>
          </div>
        </div>
        <TabsContent value="today" className="space-y-4">
          <LeaderboardTable timeframe="today" />
        </TabsContent>
        <TabsContent value="week" className="space-y-4">
          <LeaderboardTable timeframe="week" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
