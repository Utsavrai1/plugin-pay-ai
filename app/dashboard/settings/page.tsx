import type { Metadata } from "next"
import { SlackSettings } from "@/components/settings/slack-settings"

export const metadata: Metadata = {
  title: "Settings | Sales Team Productivity",
  description: "Configure your Slack publishing and notification settings",
}

export default function SettingsPage() {
  return <SlackSettings />
}
