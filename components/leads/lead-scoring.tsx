"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Lead {
  address: string;
  amount: number;
  status: string;
}

interface LeadPrioritization {
  [key: string]: Lead[];
}

export function LeadScoring() {
  const [leadData, setLeadData] = useState<LeadPrioritization>({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch(
          "https://communication-ai-server.onrender.com/api/lead-prioritization"
        );
        const data = await response.json();
        setLeadData(data);
      } catch (error) {
        console.error("Error fetching leads:", error);
        // Fallback data
        setLeadData({
          Derek: [
            { address: "Ricky Manzano", amount: 5500, status: "Sent - CSS" },
            {
              address: "700 N Sunnyside Ave Peter Mitsakos",
              amount: 5500,
              status: "Sent - CSS",
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Lead Prioritization
          </h1>
          <p className="text-muted-foreground">Loading lead data...</p>
        </div>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Lead Prioritization
        </h1>
        <p className="text-muted-foreground">
          View leads organized by sales representative with deal amounts and
          status.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input type="search" placeholder="Search leads..." className="h-9" />
          <Button type="submit" size="sm" className="h-9">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="all" onValueChange={setFilter}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Filter by rep" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Representatives</SelectItem>
              {Object.keys(leadData).map((rep) => (
                <SelectItem key={rep} value={rep}>
                  {rep}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6">
        {Object.entries(leadData)
          .filter(([rep]) => filter === "all" || rep === filter)
          .map(([rep, leads]) => (
            <Card key={rep}>
              <CardHeader>
                <CardTitle className="text-lg">{rep}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leads.map((lead, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{lead.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-green-600">
                          ${lead.amount.toLocaleString()}
                        </span>
                        <Badge
                          variant={
                            lead.status.includes("YTC")
                              ? "secondary"
                              : "default"
                          }
                          className="text-xs"
                        >
                          {lead.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
