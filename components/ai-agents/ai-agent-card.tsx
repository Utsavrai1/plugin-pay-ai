"use client"

import { useState } from "react"
import Image from "next/image"
import { Bot, Check, Slack } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AIAgentCardProps {
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
  }
  onClick: () => void
}

export function AIAgentCard({ agent, onClick }: AIAgentCardProps) {
  const [isActive, setIsActive] = useState(agent.status === "active")

  const handleToggle = (checked: boolean) => {
    setIsActive(checked)
    // In a real app, this would update the agent status in the backend
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer" onClick={onClick}>
      <CardHeader className="relative p-0">
        <div className="absolute top-3 right-3 z-10" onClick={(e) => e.stopPropagation()}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Switch checked={isActive} onCheckedChange={handleToggle} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{isActive ? "Disable" : "Enable"} agent</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            {agent.icon === "bot" ? (
              <Bot className="h-8 w-8 text-primary" />
            ) : (
              <Image
                src={agent.icon || "/placeholder.svg"}
                alt={agent.name}
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">{agent.name}</h3>
          <Badge variant={isActive ? "default" : "outline"}>{isActive ? "Active" : "Paused"}</Badge>
        </div>
        <p className="text-muted-foreground text-sm mb-4">{agent.description}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {agent.badges?.map((badge) => (
            <Badge key={badge} variant="secondary" className="text-xs">
              {badge}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          {agent.integrations.includes("slack") && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="h-6 w-6 rounded bg-[#4A154B] flex items-center justify-center">
                    <Slack className="h-4 w-4 text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Slack Integration</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {agent.integrations.includes("crm") && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="h-6 w-6 rounded bg-blue-600 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>CRM Integration</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0" onClick={(e) => e.stopPropagation()}>
        <Button className="w-full" variant="default">
          {agent.buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
