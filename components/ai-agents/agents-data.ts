export const agentsData = [
  {
    id: "stats-producer",
    name: "Stats Producing Agent",
    description:
      "Generates daily sales activity leaderboards and performance statistics for the team.",
    buttonText: "View Stats",
    buttonAction: "viewStats",
    status: "active" as const,
    integrations: ["crm"],
    badges: ["Real-time"],
    icon: "bot",
    exampleOutput: `Daily Sales Activity Leaderboard
1. Derek - Deals: 1, Emails: 2, Calls: 0, Talktime: 0 min
2. Lokesh - Deals: 0, Emails: 28, Calls: 0, Talktime: 0 min
3. Josh - Deals: 0, Emails: 0, Calls: 5, Talktime: 6 min
4. Angela - Deals: 0, Emails: 0, Calls: 3, Talktime: 0 min
5. Joshua - Deals: 0, Emails: 2, Calls: 1, Talktime: 0 min

Team Summary:
- Total Calls: 9
- Total Emails: 34
- Total Deals: 1
- Total Talktime: 6 min`,
    configuration: {
      title: "Stats Settings",
      description:
        "Configure how the Stats Producing Agent generates and displays performance data.",
    },
  },
  {
    id: "lead-prioritization",
    name: "Lead Prioritization Agent",
    description:
      "Organizes and prioritizes leads by sales representative with deal amounts and status tracking.",
    buttonText: "Review Leads",
    buttonAction: "reviewLeads",
    status: "active" as const,
    integrations: ["crm"],
    badges: ["Auto-update"],
    icon: "bot",
    exampleOutput: `April Dawn
• 3256 Wailea Circle, Fairfield, CA 94534 | ($3900 | Sent - CSS)
• Ralene Amirr | ($0 | Sent - CSS)
• Pedro Lemos Inquiry | ($1350 | Sent - CSS)
• Benjamin Losch | ($6500 | Sent - CSS)

Bryan Sunga
• 2024 15th Ave, San Francisco, CA 94116, USA | ($5500 | Sent - CSS)
• Bryan - Concrete Porch | SE Drawings w/ Calcs | ($5500 | Sent - CSS)
• 2603 Leopard Way, Antioch, CA 94531, USA | ($2500 | Sent - CSS)

Nithin David
• CO7-1851 Oro Drive | ($2805 | Sent - CSS)
• 333 SAN RAFAEL via Charles Minyard | ($3500 | Sent - CSS)`,
    configuration: {
      title: "Lead Prioritization Settings",
      description:
        "Configure how leads are organized and prioritized for each sales representative.",
    },
  },
  {
    id: "slack-invoice",
    name: "Slack Invoice Agent",
    description:
      "Automatically generates and sends invoices through Slack, email, and SMS notifications.",
    buttonText: "Generate Invoice",
    buttonAction: "generateInvoice",
    status: (() => {
      // Check if configuration is complete to determine status
      if (typeof window !== "undefined") {
        const configStatus = localStorage.getItem("agentConfigurationStatus");
        return configStatus === "complete"
          ? ("active" as const)
          : ("paused" as const);
      }
      return "paused" as const;
    })(),
    integrations: ["slack", "email", "sms"],
    badges: ["Multi-channel", "Automated"],
    icon: "bot",
    exampleOutput: `Emailed to client@acme.com`,
    configuration: {
      title: "Invoice Agent Settings",
      description:
        "Configure Slack, email, and SMS credentials for automated invoice delivery.",
    },
  },
];
