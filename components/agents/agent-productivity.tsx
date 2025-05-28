"use client";

import { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductivityChart } from "@/components/agents/productivity-chart";
import { ProductivityTable } from "@/components/agents/productivity-table";

export function AgentProductivity() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [agent, setAgent] = useState("all");
  const [agentData, setAgentData] = useState([]);

  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const response = await fetch(
          "https://communication-ai-server.onrender.com/api/agent-stats"
        );
        const data = await response.json();
        setAgentData(data);
      } catch (error) {
        console.error("Error fetching agent data:", error);
      }
    };

    fetchAgentData();
  }, []);

  // Create agents list for dropdown
  const agents = [
    { id: "all", name: "All Agents" },
    ...agentData.map((agent: any) => ({
      id: agent.name.toLowerCase(),
      name: agent.name,
    })),
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Agent Productivity
        </h1>
        <p className="text-muted-foreground">
          Track and analyze your sales representatives' productivity.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Select defaultValue="all" onValueChange={setAgent}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select agent" />
            </SelectTrigger>
            <SelectContent>
              {agents.map((a) => (
                <SelectItem key={a.id} value={a.id}>
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline">Today</Button>
          <Button variant="outline">This Week</Button>
          <Button variant="outline">This Month</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Productivity Trend</CardTitle>
            <CardDescription>
              Daily productivity metrics over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductivityChart />
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Detailed Breakdown</CardTitle>
            <CardDescription>Productivity metrics by agent</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductivityTable agentData={agentData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
