"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeaderboardTableProps {
  timeframe: "today" | "week";
}

interface LeaderboardData {
  rank: number;
  name: string;
  deals: number;
  emails: number;
  calls: number;
  talktime: number;
}

export function LeaderboardTable({ timeframe }: LeaderboardTableProps) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          "https://communication-ai-server.onrender.com/api/leaderboard"
        );
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        // Fallback data if server is not running
        setLeaderboardData([
          {
            rank: 1,
            name: "Derek",
            deals: 1,
            emails: 2,
            calls: 0,
            talktime: 0,
          },
          {
            rank: 2,
            name: "Lokesh",
            deals: 0,
            emails: 28,
            calls: 0,
            talktime: 0,
          },
          { rank: 3, name: "Josh", deals: 0, emails: 0, calls: 5, talktime: 6 },
          {
            rank: 4,
            name: "Angela",
            deals: 0,
            emails: 0,
            calls: 3,
            talktime: 0,
          },
          {
            rank: 5,
            name: "Joshua",
            deals: 0,
            emails: 2,
            calls: 1,
            talktime: 0,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [timeframe]);

  if (loading) {
    return (
      <Card>
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading leaderboard...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Rank</TableHead>
            <TableHead>Sales Rep</TableHead>
            <TableHead className="text-right">Deals</TableHead>
            <TableHead className="text-right">Emails</TableHead>
            <TableHead className="text-right">Calls</TableHead>
            <TableHead className="text-right">Talktime (min)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((rep) => (
            <TableRow key={rep.rank}>
              <TableCell className="font-medium">{rep.rank}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt={rep.name} />
                    <AvatarFallback>
                      {rep.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{rep.name}</div>
                    {rep.rank <= 3 && (
                      <Badge variant="default" className="text-xs">
                        Top Performer
                      </Badge>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">
                {rep.deals}
              </TableCell>
              <TableCell className="text-right">{rep.emails}</TableCell>
              <TableCell className="text-right">{rep.calls}</TableCell>
              <TableCell className="text-right">{rep.talktime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
