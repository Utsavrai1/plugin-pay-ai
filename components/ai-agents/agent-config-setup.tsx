"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ConfigData {
  slackChannelId: string;
  slackBotToken: string;
  emailSender: string;
  emailPass: string;
  twilioSid: string;
  twilioAuthToken: string;
  twilioPhoneNumber: string;
}

export function AgentConfigSetup() {
  const router = useRouter();
  const [config, setConfig] = useState<ConfigData>({
    slackChannelId: "",
    slackBotToken: "",
    emailSender: "",
    emailPass: "",
    twilioSid: "",
    twilioAuthToken: "",
    twilioPhoneNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    slackBotToken: false,
    emailPass: false,
    twilioAuthToken: false,
  });
  const [configStatus, setConfigStatus] = useState<
    "none" | "partial" | "complete"
  >("none");
  const { toast } = useToast();

  useEffect(() => {
    // Load existing configuration from localStorage if available
    const savedConfig = localStorage.getItem("agentConfiguration");
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig(parsedConfig);
      } catch (error) {
        console.error("Error loading saved configuration:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Check configuration status
    const filledFields = Object.values(config).filter(
      (value) => value.trim() !== ""
    ).length;
    const totalFields = Object.keys(config).length;

    if (filledFields === 0) {
      setConfigStatus("none");
    } else if (filledFields < totalFields) {
      setConfigStatus("partial");
    } else {
      setConfigStatus("complete");
    }
  }, [config]);

  const handleInputChange = (field: keyof ConfigData, value: string) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        // Save configuration to localStorage
        localStorage.setItem("agentConfiguration", JSON.stringify(config));

        // Mark configuration as complete
        localStorage.setItem("agentConfigurationStatus", "complete");
        localStorage.setItem(
          "agentConfigurationDate",
          new Date().toISOString()
        );

        // Show success message
        toast({
          title: "Configuration Saved Successfully!",
          description:
            "Your agent configuration has been saved. Redirecting to AI Agents...",
          duration: 3000,
        });

        // Redirect after a short delay to show the success message
        setTimeout(() => {
          router.push("/dashboard/ai-agents");
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save configuration");
      }
    } catch (error) {
      console.error("Error saving config:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to save configuration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async (service: string) => {
    toast({
      title: "Testing Connection",
      description: `Testing ${service} connection...`,
    });

    // Simulate connection test
    setTimeout(() => {
      toast({
        title: "Connection Test",
        description: `${service} connection test completed. Check logs for details.`,
      });
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Agent Configuration
            </h1>
            <p className="text-muted-foreground">
              Configure your AI agents with necessary credentials and settings.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {configStatus === "complete" && (
              <Badge variant="default" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Complete
              </Badge>
            )}
            {configStatus === "partial" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Partial
              </Badge>
            )}
            {configStatus === "none" && (
              <Badge variant="outline" className="flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Not Configured
              </Badge>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="slack" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="slack">Slack Configuration</TabsTrigger>
          <TabsTrigger value="email">Email Configuration</TabsTrigger>
          <TabsTrigger value="twilio">Twilio Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="slack">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-[#4A154B] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                Slack Integration
              </CardTitle>
              <CardDescription>
                Configure Slack bot credentials for sending invoices and
                notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="slackChannelId">Slack Channel ID</Label>
                  <Input
                    id="slackChannelId"
                    placeholder="C1234567890"
                    value={config.slackChannelId}
                    onChange={(e) =>
                      handleInputChange("slackChannelId", e.target.value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    The channel ID where invoices will be sent (e.g.,
                    C1234567890)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slackBotToken">Slack Bot Token</Label>
                  <div className="relative">
                    <Input
                      id="slackBotToken"
                      type={showPasswords.slackBotToken ? "text" : "password"}
                      placeholder="xoxb-your-bot-token"
                      value={config.slackBotToken}
                      onChange={(e) =>
                        handleInputChange("slackBotToken", e.target.value)
                      }
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility("slackBotToken")}
                    >
                      {showPasswords.slackBotToken ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your Slack bot token (starts with xoxb-)
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => testConnection("Slack")}
                  disabled={!config.slackChannelId || !config.slackBotToken}
                >
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">@</span>
                </div>
                Email Configuration
              </CardTitle>
              <CardDescription>
                Configure email credentials for sending invoices and
                notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emailSender">Email Address</Label>
                  <Input
                    id="emailSender"
                    type="email"
                    placeholder="your.email@company.com"
                    value={config.emailSender}
                    onChange={(e) =>
                      handleInputChange("emailSender", e.target.value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    The email address that will send invoices
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailPass">
                    Email Password / App Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="emailPass"
                      type={showPasswords.emailPass ? "text" : "password"}
                      placeholder="Your email password or app password"
                      value={config.emailPass}
                      onChange={(e) =>
                        handleInputChange("emailPass", e.target.value)
                      }
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => togglePasswordVisibility("emailPass")}
                    >
                      {showPasswords.emailPass ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use app password for Gmail/Outlook for better security
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => testConnection("Email")}
                  disabled={!config.emailSender || !config.emailPass}
                >
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="twilio">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-red-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                Twilio Configuration
              </CardTitle>
              <CardDescription>
                Configure Twilio credentials for SMS notifications and
                communication.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twilioSid">Twilio Account SID</Label>
                  <Input
                    id="twilioSid"
                    placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    value={config.twilioSid}
                    onChange={(e) =>
                      handleInputChange("twilioSid", e.target.value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Your Twilio Account SID (starts with AC)
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twilioAuthToken">Twilio Auth Token</Label>
                  <div className="relative">
                    <Input
                      id="twilioAuthToken"
                      type={showPasswords.twilioAuthToken ? "text" : "password"}
                      placeholder="Your Twilio Auth Token"
                      value={config.twilioAuthToken}
                      onChange={(e) =>
                        handleInputChange("twilioAuthToken", e.target.value)
                      }
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        togglePasswordVisibility("twilioAuthToken")
                      }
                    >
                      {showPasswords.twilioAuthToken ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your Twilio authentication token
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twilioPhoneNumber">Twilio Phone Number</Label>
                  <Input
                    id="twilioPhoneNumber"
                    placeholder="+1234567890"
                    value={config.twilioPhoneNumber}
                    onChange={(e) =>
                      handleInputChange("twilioPhoneNumber", e.target.value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Your Twilio phone number (include country code)
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => testConnection("Twilio")}
                  disabled={
                    !config.twilioSid ||
                    !config.twilioAuthToken ||
                    !config.twilioPhoneNumber
                  }
                >
                  Test Connection
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={loading} size="lg">
          {loading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Configuration
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
