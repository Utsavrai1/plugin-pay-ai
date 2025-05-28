import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface SlackPreviewProps {
  enabled: boolean
  leaderboardEnabled: boolean
  productivityEnabled: boolean
  channel: string
  postTime: string
  frequency: string
}

export function SlackPreview({
  enabled,
  leaderboardEnabled,
  productivityEnabled,
  channel,
  postTime,
  frequency,
}: SlackPreviewProps) {
  // Format the time for display
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  }

  // Get the day for display based on frequency
  const getDay = () => {
    if (frequency === "daily") return "Today"
    if (frequency === "weekly") return "This Week"
    return "This Month"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Preview</CardTitle>
        <CardDescription>
          Preview of what will be posted to {channel} at {formatTime(postTime)} {frequency}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!enabled ? (
          <div className="rounded-md bg-muted p-4 text-center text-muted-foreground">
            Slack integration is currently disabled. Enable it to see a preview.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-md border p-4">
              <div className="mb-4 flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="SalesBoost" />
                  <AvatarFallback>SB</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">SalesBoost</div>
                  <div className="text-xs text-muted-foreground">{getDay()}'s Sales Team Update</div>
                </div>
              </div>

              {leaderboardEnabled && (
                <div className="mb-4">
                  <h3 className="mb-2 font-semibold">🏆 Leaderboard</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">1.</span>
                        <span>Alex Johnson</span>
                      </div>
                      <div className="text-xs">45 calls, 78 emails</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">2.</span>
                        <span>Sarah Williams</span>
                      </div>
                      <div className="text-xs">38 calls, 65 emails</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">3.</span>
                        <span>Michael Brown</span>
                      </div>
                      <div className="text-xs">32 calls, 52 emails</div>
                    </div>
                  </div>
                </div>
              )}

              {productivityEnabled && (
                <div>
                  <h3 className="mb-2 font-semibold">📊 Productivity Summary</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Total Calls:</span>
                      <span className="font-medium">168</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Emails:</span>
                      <span className="font-medium">285</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Meetings Completed:</span>
                      <span className="font-medium">16</span>
                    </div>
                    <div className="flex justify-between">
                      <span>CRM Updates:</span>
                      <span className="font-medium">117</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 text-xs text-muted-foreground">
                View full details in the{" "}
                <a href="#" className="text-primary underline">
                  SalesBoost Dashboard
                </a>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
