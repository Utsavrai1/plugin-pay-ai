const express = require("express")
const cors = require("cors")
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

// Mock data for daily sales activity leaderboard
const dailyLeaderboard = [
  { rank: 1, name: "Derek", deals: 1, emails: 2, calls: 0, talktime: 0 },
  { rank: 2, name: "Lokesh", deals: 0, emails: 28, calls: 0, talktime: 0 },
  { rank: 3, name: "Josh", deals: 0, emails: 0, calls: 5, talktime: 6 },
  { rank: 4, name: "Angela", deals: 0, emails: 0, calls: 3, talktime: 0 },
  { rank: 5, name: "Joshua", deals: 0, emails: 2, calls: 1, talktime: 0 },
  { rank: 6, name: "Dawn", deals: 0, emails: 2, calls: 0, talktime: 0 },
  { rank: 7, name: "Irvin", deals: 0, emails: 0, calls: 0, talktime: 0 },
  { rank: 8, name: "Jerick", deals: 0, emails: 0, calls: 0, talktime: 0 },
  { rank: 9, name: "Von", deals: 0, emails: 0, calls: 0, talktime: 0 },
  { rank: 10, name: "Nithin", deals: 0, emails: 0, calls: 0, talktime: 0 },
  { rank: 11, name: "Ellaine", deals: 0, emails: 0, calls: 0, talktime: 0 },
  { rank: 12, name: "Bryan", deals: 0, emails: 0, calls: 0, talktime: 0 },
  { rank: 13, name: "Queen", deals: 0, emails: 0, calls: 0, talktime: 0 },
]

// Mock data for lead prioritization
const leadPrioritization = {
  "April Dawn": [
    { address: "3256 Wailea Circle, Fairfield, CA 94534", amount: 3900, status: "Sent - CSS" },
    { address: "Ralene Amirr", amount: 0, status: "Sent - CSS" },
    { address: "Pedro Lemos Inquiry", amount: 1350, status: "Sent - CSS" },
    { address: "Benjamin Losch", amount: 6500, status: "Sent - CSS" },
    { address: "Yelp - Ankit Singhal", amount: 995, status: "YTC - Kim & CSM" },
  ],
  "Bryan Sunga": [
    { address: "2024 15th Ave, San Francisco, CA 94116, USA", amount: 5500, status: "Sent - CSS" },
    { address: "Bryan - Concrete Porch | SE Drawings w/ Calcs", amount: 5500, status: "Sent - CSS" },
    {
      address: "2603 Leopard Way, Antioch, CA 94531, USA Antioch California 94531-Retaining Wall With No Site Plan",
      amount: 2500,
      status: "Sent - CSS",
    },
    { address: "Upsell - 770 Vía Del Castille, Morgan Hill, CA, 95037", amount: 4500, status: "Sent - CSS" },
  ],
  "Nithin David": [
    { address: "CO7-1851 Oro Drive", amount: 2805, status: "Sent - CSS" },
    { address: "333 SAN RAFAEL via Charles Minyard", amount: 3500, status: "Sent - CSS" },
    { address: "816 N Inglewood Ave.Inglewood via Modern Community Management", amount: 20000, status: "Sent - CSS" },
    { address: "Insta - Ervin Flores", amount: 5500, status: "Priced/Sent onhold - CSS" },
    { address: "Mark john Bonsavage Inquiry", amount: 3500, status: "Sent - CSS" },
  ],
  "Lokesh Bulchandani": [
    { address: "15910/15950 E. 14th St via Tailong Ke", amount: 45000, status: "Sent - CSS" },
    { address: "James Stalie Inquiry", amount: 3500, status: "Sent - CSS" },
    { address: "Lokesh- 2638 Gomes Dr", amount: 4900, status: "Sent - CSS" },
    { address: "Lokesh- 7042 Westmoorland Dr", amount: 11500, status: "Sent - CSS" },
    { address: "Detached ADUs - 2206 S 128TH ST via Trinh L Howa Le", amount: 4000, status: "Sent - CSS" },
  ],
  "Josh Krumm": [
    { address: "6500 San Pablo Ave Jerrod Langston", amount: 25000, status: "Sent - CSS" },
    { address: "Str ~ 1177 TEMPLE HILL DR., lot 2", amount: 12000, status: "YTC - Kim & CSM" },
    { address: "Str ~ 1177 Temple Hill Dr., Lot 1", amount: 14000, status: "YTC - Kim & CSM" },
    { address: "Dustin Dinh", amount: 3500, status: "Sent - CSS" },
    { address: "Yelp - Shannon D.", amount: 6300, status: "Sent - CSS" },
  ],
  "Irvin John Chua": [
    { address: "Yelp - Debra Kaplan", amount: 995, status: "Sent - CSS" },
    { address: "3855 Randolph Avenue", amount: 5600, status: "Sent - CSS" },
    { address: "Jim Kelman Inquiry", amount: 3500, status: "Priced/Sent onhold - CSS" },
    { address: "Aravinth", amount: 5900, status: "Priced/Sent onhold - CSS" },
    { address: "Gabriel Stredia", amount: 6500, status: "Priced/Sent onhold - CSS" },
  ],
  "Ella Dar Juan": [
    { address: "1111 Wikiup Dr-Santa Rosa-CA-95403 - Main House", amount: 8500, status: "Sent - CSS" },
    { address: "Juan Pablo Ruelas Inquiry", amount: 6000, status: "Sent - CSS" },
    { address: "Santa Dasu Inquiry", amount: 8000, status: "Sent - CSS" },
    { address: "James McDonell Inquiry", amount: 995, status: "Sent - CSS" },
    { address: "Deal with Wayne Huang", amount: 1100, status: "Sent - CSS" },
  ],
  "Derek Galotera": [
    { address: "Ricky Manzano", amount: 5500, status: "Sent - CSS" },
    { address: "700 N Sunnyside Ave Peter Mitsakos", amount: 5500, status: "Sent - CSS" },
    { address: "Po-Kang Huang Inquiry", amount: 1100, status: "Sent - CSS" },
    { address: "Angi - Robert Hsu", amount: 4000, status: "Sent - CSS" },
    { address: "Mia Halston", amount: 1100, status: "Sent - CSS" },
  ],
}

// Summary stats
const summaryStats = {
  totalCalls: dailyLeaderboard.reduce((sum, rep) => sum + rep.calls, 0),
  totalEmails: dailyLeaderboard.reduce((sum, rep) => sum + rep.emails, 0),
  totalDeals: dailyLeaderboard.reduce((sum, rep) => sum + rep.deals, 0),
  totalTalktime: dailyLeaderboard.reduce((sum, rep) => sum + rep.talktime, 0),
}

// API Routes
app.get("/api/leaderboard", (req, res) => {
  res.json(dailyLeaderboard)
})

app.get("/api/lead-prioritization", (req, res) => {
  res.json(leadPrioritization)
})

app.get("/api/summary-stats", (req, res) => {
  res.json(summaryStats)
})

app.get("/api/agent-stats", (req, res) => {
  const agentStats = dailyLeaderboard.map((rep) => ({
    id: rep.rank,
    name: rep.name,
    avatar: "/placeholder.svg",
    initials: rep.name.substring(0, 2).toUpperCase(),
    calls: rep.calls,
    emails: rep.emails,
    deals: rep.deals,
    talktime: rep.talktime,
  }))

  res.json(agentStats)
})

// Blog API Routes - Mock responses for now
app.post("/api/blog/generate-titles", (req, res) => {
  const { keywords } = req.body

  // Mock response - replace with your actual blog controller logic
  setTimeout(() => {
    res.json({
      status: "success",
      generated_content: {
        titles: [
          `10 Proven ${keywords} Strategies That Boost Sales Performance`,
          `How to Master ${keywords} for Maximum Revenue Growth`,
          `The Ultimate Guide to ${keywords} in Modern Sales`,
          `${keywords} Best Practices: What Top Performers Do Differently`,
          `Transform Your Sales Team with These ${keywords} Techniques`,
        ],
      },
    })
  }, 2000)
})

app.post("/api/blog/generate-metadata", (req, res) => {
  const { title } = req.body

  // Mock response - replace with your actual blog controller logic
  setTimeout(() => {
    res.json({
      status: "success",
      generated_content: {
        meta_description: `Discover proven strategies and techniques for ${title.toLowerCase()}. Learn from industry experts and boost your sales performance with actionable insights.`,
        meta_keywords: "sales, productivity, CRM, performance, strategies, techniques, revenue, growth",
        focus_keyword: "sales productivity",
      },
    })
  }, 1500)
})

app.post("/api/blog/generate-content", (req, res) => {
  const { title, keywords, Instructions } = req.body

  // Mock response - replace with your actual blog controller logic
  setTimeout(() => {
    res.json({
      status: "success",
      generated_content: `# ${title}

## Introduction

In today's competitive business landscape, mastering ${keywords} has become essential for sales success. This comprehensive guide will walk you through proven strategies and techniques that top-performing sales teams use to achieve exceptional results.

## Key Strategies

### 1. Data-Driven Approach
Leverage analytics and CRM data to make informed decisions about your sales process.

### 2. Customer-Centric Focus
Always prioritize understanding your customer's needs and pain points.

### 3. Continuous Learning
Stay updated with the latest trends and best practices in ${keywords}.

## Implementation Tips

${Instructions ? `Based on your specific requirements: ${Instructions}` : "Follow these best practices for optimal results."}

## Conclusion

By implementing these strategies, you'll be well on your way to achieving better sales performance and driving revenue growth.

*This content was generated using AI assistance and should be reviewed and customized for your specific needs.*`,
    })
  }, 3000)
})

app.post("/api/blog/generate-image", (req, res) => {
  const { text } = req.body

  // Mock response - replace with your actual image generation logic
  // For now, return a placeholder image
  setTimeout(() => {
    // In a real implementation, you would generate the actual image
    // and return it as binary data
    res.status(500).json({
      error: "Image generation not implemented in mock server. Please integrate your actual blog controller.",
    })
  }, 2000)
})

app.listen(port, () => {
  console.log(`Sales dashboard server running at http://localhost:${port}`)
})
