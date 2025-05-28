"use client"

import { useState } from "react"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SlackPreview } from "@/components/settings/slack-preview"

export function SlackSettings() {
  const [slackEnabled, setSlackEnabled] = useState(true)
  const [leaderboardEnabled, setLeaderboardEnabled] = useState(true)
  const [productivityEnabled, setProductivityEnabled] = useState(true)
  const [channel, setChannel] = useState("#sales-team")
  const [postTime, setPostTime] = useState("17:00")
  const [frequency, setFrequency] = useState("daily")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Slack Settings</h1>
        <p className="text-muted-foreground">Configure what gets posted to Slack and when.</p>
      </div>

      <Tabs defaultValue="publishing" className="space-y-4">
        <TabsList>
          <TabsTrigger value="publishing">Publishing</TabsTrigger>
          <TabsTrigger value="preview">Message Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="publishing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Slack Integration</CardTitle>
              <CardDescription>Enable or disable Slack notifications for your team.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="slack-toggle" className="flex flex-col space-y-1">
                  <span>Enable Slack Integration</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Post updates to your Slack workspace
                  </span>
                </Label>
                <Switch id="slack-toggle" checked={slackEnabled} onCheckedChange={setSlackEnabled} />
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="channel">Slack Channel</Label>
                  <Input
                    id="channel"
                    placeholder="#sales-team"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    disabled={!slackEnabled}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="post-time">Post Time</Label>
                    <div className="flex items-center">
                      <Input
                        id="post-time"
                        type="time"
                        value={postTime}
                        onChange={(e) => setPostTime(e.target.value)}
                        disabled={!slackEnabled}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency} disabled={!slackEnabled}>
                      <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
              <CardDescription>Choose what content to include in Slack notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="leaderboard"
                  checked={leaderboardEnabled}
                  onCheckedChange={(checked) => setLeaderboardEnabled(checked as boolean)}
                  disabled={!slackEnabled}
                />
                <Label
                  htmlFor="leaderboard"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Leaderboard
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="productivity"
                  checked={productivityEnabled}
                  onCheckedChange={(checked) => setProductivityEnabled(checked as boolean)}
                  disabled={!slackEnabled}
                />
                <Label
                  htmlFor="productivity"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Productivity Summary
                </Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={!slackEnabled}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="preview">
          <SlackPreview
            enabled={slackEnabled}
            leaderboardEnabled={leaderboardEnabled}
            productivityEnabled={productivityEnabled}
            channel={channel}
            postTime={postTime}
            frequency={frequency}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
