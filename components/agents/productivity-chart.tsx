"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for the chart
const data = [
  {
    name: "Mon",
    calls: 40,
    emails: 65,
    meetings: 4,
    crmUpdates: 30,
  },
  {
    name: "Tue",
    calls: 45,
    emails: 70,
    meetings: 5,
    crmUpdates: 35,
  },
  {
    name: "Wed",
    calls: 55,
    emails: 80,
    meetings: 6,
    crmUpdates: 40,
  },
  {
    name: "Thu",
    calls: 50,
    emails: 75,
    meetings: 5,
    crmUpdates: 38,
  },
  {
    name: "Fri",
    calls: 60,
    emails: 85,
    meetings: 7,
    crmUpdates: 45,
  },
  {
    name: "Sat",
    calls: 30,
    emails: 40,
    meetings: 2,
    crmUpdates: 20,
  },
  {
    name: "Sun",
    calls: 20,
    emails: 30,
    meetings: 1,
    crmUpdates: 15,
  },
]

export function ProductivityChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Line type="monotone" dataKey="calls" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="emails" stroke="#06b6d4" strokeWidth={2} />
        <Line type="monotone" dataKey="meetings" stroke="#10b981" strokeWidth={2} />
        <Line type="monotone" dataKey="crmUpdates" stroke="#f59e0b" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}
