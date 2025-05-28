"use client"

import { Bot, Check, Slack } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AIAgentDetailModalProps {
  agent: {
    id: string
    name: string
    description: string
    buttonText: string
    buttonAction: string
    status: "active" | "paused"
    integrations: string[]
    badges?: string[]
    icon: string
    exampleOutput?: string
    configuration?: {
      title: string
      description: string
    }
  } | null
  isOpen: boolean
  onClose: () => void
}

export function AIAgentDetailModal({ agent, isOpen, onClose }: AIAgentDetailModalProps) {
  if (!agent) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              {agent.icon === "bot" ? (
                <Bot className="h-5 w-5 text-primary" />
              ) : (
                <Image
                  src={agent.icon || "/placeholder.svg"}
                  alt={agent.name}
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              )}
            </div>
            <div>
              <DialogTitle className="text-xl">{agent.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={agent.status === "active" ? "default" : "outline"}>
                  {agent.status === "active" ? "Active" : "Paused"}
                </Badge>
                {agent.badges?.map((badge) => (
                  <Badge key={badge} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogDescription className="pt-2">{agent.description}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="example" className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="example">Example Output</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
          </TabsList>
          <TabsContent value="example" className="p-4 border rounded-md mt-2">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div className="bg-muted p-4 rounded-md text-sm font-mono whitespace-pre-wrap">
                {agent.exampleOutput || "No example output available."}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="configuration" className="p-4 border rounded-md mt-2">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">{agent.configuration?.title || "Settings"}</h4>
                <p className="text-sm text-muted-foreground">
                  {agent.configuration?.description || "Configure how this agent works."}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Enable Agent</div>
                  <div className="text-sm text-muted-foreground">Turn this agent on or off</div>
                </div>
                <Switch checked={agent.status === "active"} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Slack Notifications</div>
                  <div className="text-sm text-muted-foreground">Send notifications to Slack</div>
                </div>
                <Switch checked={agent.integrations.includes("slack")} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">CRM Integration</div>
                  <div className="text-sm text-muted-foreground">Connect with your CRM system</div>
                </div>
                <Switch checked={agent.integrations.includes("crm")} />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex sm:justify-between gap-2">
          <div className="flex gap-2">
            {agent.integrations.includes("slack") && (
              <div className="h-8 w-8 rounded bg-[#4A154B] flex items-center justify-center">
                <Slack className="h-5 w-5 text-white" />
              </div>
            )}
            {agent.integrations.includes("crm") && (
              <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>{agent.buttonText}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
