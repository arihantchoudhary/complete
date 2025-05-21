
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Code, CopyIcon, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const apiFormSchema = z.object({
  apiKey: z.string().min(10, {
    message: "API Key must be at least 10 characters.",
  }),
  webhookUrl: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
  environment: z.enum(["production", "development", "testing"]),
  notifications: z.boolean().default(false),
  dataFormat: z.enum(["json", "xml"]).default("json"),
});

export default function ApiIntegration() {
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [integrationStatus, setIntegrationStatus] = useState<
    "connected" | "disconnected" | "pending"
  >("disconnected");

  const form = useForm<z.infer<typeof apiFormSchema>>({
    resolver: zodResolver(apiFormSchema),
    defaultValues: {
      apiKey: "",
      webhookUrl: "",
      environment: "development",
      notifications: false,
      dataFormat: "json",
    },
  });

  function onSubmit(values: z.infer<typeof apiFormSchema>) {
    console.log(values);
    setIsVerified(true);
    setIntegrationStatus("connected");
    toast.success("API integration settings saved successfully!");
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  }

  // Sample webhook JSON
  const sampleWebhook = `{
  "event": "route_update",
  "route_id": "RT-12345",
  "status": "delayed",
  "eta": "2025-05-15T14:30:00Z",
  "delay_minutes": 120,
  "risk_score": 75,
  "timestamp": "2025-04-17T09:15:00Z"
}`;

  // Sample API response
  const sampleResponse = `{
  "success": true,
  "data": {
    "routes": [
      {
        "id": "RT-12345",
        "origin": "Shanghai",
        "destination": "Rotterdam",
        "status": "in-transit",
        "eta": "2025-05-15T14:30:00Z",
        "risk_score": 42,
        "risk_factors": [
          {
            "type": "weather",
            "severity": "medium",
            "location": "South China Sea"
          },
          {
            "type": "port_congestion",
            "severity": "low",
            "location": "Rotterdam"
          }
        ]
      }
    ],
    "meta": {
      "total": 1,
      "page": 1,
      "per_page": 10
    }
  }
}`;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">API Integration</h1>
          <p className="text-muted-foreground">
            Connect LogiTrade with your existing systems through our robust API
          </p>
        </div>

        <Tabs defaultValue="setup" className="space-y-4">
          <TabsList>
            <TabsTrigger value="setup">API Setup</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="logs">Request Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="setup" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>API Configuration</CardTitle>
                    <CardDescription>
                      Set up your API keys and integration preferences
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      integrationStatus === "connected"
                        ? "default"
                        : integrationStatus === "pending"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {integrationStatus === "connected"
                      ? "Connected"
                      : integrationStatus === "pending"
                      ? "Pending"
                      : "Disconnected"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Key</FormLabel>
                          <div className="flex space-x-2">
                            <FormControl>
                              <Input
                                type={isApiKeyVisible ? "text" : "password"}
                                placeholder="Enter your API key"
                                {...field}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() =>
                                setIsApiKeyVisible(!isApiKeyVisible)
                              }
                            >
                              {isApiKeyVisible ? "Hide" : "Show"}
                            </Button>
                          </div>
                          <FormDescription>
                            Your API key provides access to the LogiTrade API.
                            Keep it secure.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="webhookUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Webhook URL (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://your-server.com/webhook"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Receive real-time updates about route changes and
                            risk alerts.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="environment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Environment</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select environment" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="development">
                                  Development
                                </SelectItem>
                                <SelectItem value="testing">Testing</SelectItem>
                                <SelectItem value="production">
                                  Production
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choose the environment for your API integration.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dataFormat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data Format</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select data format" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="json">JSON</SelectItem>
                                <SelectItem value="xml">XML</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choose the format for API responses.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="notifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Email Notifications
                            </FormLabel>
                            <FormDescription>
                              Receive email alerts when API rate limits are
                              reached or errors occur.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button type="submit">Save API Configuration</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Status</CardTitle>
                <CardDescription>
                  Current status and health of your API integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col p-4 border rounded-md">
                      <span className="text-sm text-muted-foreground">
                        API Requests (24h)
                      </span>
                      <span className="text-2xl font-bold">1,423</span>
                    </div>
                    <div className="flex flex-col p-4 border rounded-md">
                      <span className="text-sm text-muted-foreground">
                        Rate Limit
                      </span>
                      <span className="text-2xl font-bold">10,000/day</span>
                    </div>
                    <div className="flex flex-col p-4 border rounded-md">
                      <span className="text-sm text-muted-foreground">
                        Uptime
                      </span>
                      <span className="text-2xl font-bold">99.9%</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        isVerified ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span className="font-medium">
                      API Connection:{" "}
                      {isVerified ? "Verified ✓" : "Not Verified"}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsVerified(true)}>
                  Test Connection
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    toast.success(
                      "API key regenerated! Make sure to update your systems."
                    )
                  }
                >
                  Regenerate API Key
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>
                  Learn how to use the LogiTrade API to manage your trade routes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Getting Started
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      The LogiTrade API allows you to programmatically access and
                      manage your trade routes, risk assessments, and analytics.
                    </p>

                    <div className="bg-muted p-4 rounded-md mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-mono text-sm">Base URL</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8"
                          onClick={() =>
                            copyToClipboard("https://api.logitrade.com/v1")
                          }
                        >
                          <CopyIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="font-mono text-sm">
                        https://api.logitrade.com/v1
                      </p>
                    </div>

                    <h4 className="font-medium mb-2">Authentication</h4>
                    <p className="text-muted-foreground mb-2">
                      All API requests require authentication using your API key
                      in the request header:
                    </p>

                    <div className="bg-muted p-4 rounded-md overflow-x-auto mb-6">
                      <pre className="font-mono text-sm">
                        {`Authorization: Bearer YOUR_API_KEY`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Endpoints</h3>

                    <div className="space-y-6">
                      <div>
                        <h4 className="flex items-center font-medium mb-2">
                          <Code className="mr-2 h-4 w-4" />
                          GET /routes
                        </h4>
                        <p className="text-muted-foreground mb-2">
                          Retrieve all trade routes with optional filtering.
                        </p>
                        <div className="bg-muted p-4 rounded-md overflow-x-auto">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-mono text-sm">
                              Example Response
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8"
                              onClick={() => copyToClipboard(sampleResponse)}
                            >
                              <CopyIcon className="h-4 w-4" />
                            </Button>
                          </div>
                          <pre className="font-mono text-sm whitespace-pre-wrap">
                            {sampleResponse}
                          </pre>
                        </div>
                      </div>

                      <div>
                        <h4 className="flex items-center font-medium mb-2">
                          <Code className="mr-2 h-4 w-4" />
                          GET /routes/:id
                        </h4>
                        <p className="text-muted-foreground">
                          Retrieve a specific trade route by ID.
                        </p>
                      </div>

                      <div>
                        <h4 className="flex items-center font-medium mb-2">
                          <Code className="mr-2 h-4 w-4" />
                          POST /routes
                        </h4>
                        <p className="text-muted-foreground">
                          Create a new trade route.
                        </p>
                      </div>

                      <div>
                        <h4 className="flex items-center font-medium mb-2">
                          <Code className="mr-2 h-4 w-4" />
                          GET /risks/analysis
                        </h4>
                        <p className="text-muted-foreground">
                          Get risk analysis for all active routes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    toast.info("Downloading complete API documentation...")
                  }
                >
                  Download Full API Documentation
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
                <CardDescription>
                  Receive real-time updates about route changes and risk alerts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Webhook Events</h3>
                    <p className="text-muted-foreground">
                      Configure which events trigger webhook notifications to
                      your systems.
                    </p>

                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">Route Updates</p>
                          <p className="text-sm text-muted-foreground">
                            When route status, ETA, or location changes
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">Risk Alerts</p>
                          <p className="text-sm text-muted-foreground">
                            When risk scores increase significantly
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">New Routes</p>
                          <p className="text-sm text-muted-foreground">
                            When a new route is created
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Completed Routes</p>
                          <p className="text-sm text-muted-foreground">
                            When a route reaches its destination
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Webhook URL</h3>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="https://your-server.com/webhook"
                        value={form.getValues().webhookUrl || ""}
                        onChange={(e) =>
                          form.setValue("webhookUrl", e.target.value)
                        }
                      />
                      <Button variant="outline" onClick={() => form.handleSubmit(onSubmit)()}>
                        Save
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Example Webhook Payload
                    </h3>
                    <div className="bg-muted p-4 rounded-md overflow-x-auto">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-mono text-sm">JSON Payload</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8"
                          onClick={() => copyToClipboard(sampleWebhook)}
                        >
                          <CopyIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <pre className="font-mono text-sm whitespace-pre-wrap">
                        {sampleWebhook}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => toast.info("Testing webhook delivery...")}
                >
                  Test Webhook
                </Button>
                <Button
                  onClick={() => {
                    form.setValue("webhookUrl", "");
                    toast.success("Webhook configuration saved!");
                  }}
                >
                  Save Webhook Settings
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>API Request Logs</CardTitle>
                <CardDescription>
                  Monitor and troubleshoot API requests made to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 text-xs font-medium text-muted-foreground p-4 border-b">
                    <div className="col-span-2">Endpoint</div>
                    <div>Method</div>
                    <div>Status</div>
                    <div>IP Address</div>
                    <div>Time</div>
                    <div>Details</div>
                  </div>
                  <div className="divide-y">
                    {[
                      {
                        endpoint: "/routes",
                        method: "GET",
                        status: 200,
                        ip: "192.168.1.1",
                        time: "2025-04-17 10:15:22",
                      },
                      {
                        endpoint: "/routes/5",
                        method: "GET",
                        status: 200,
                        ip: "192.168.1.1",
                        time: "2025-04-17 10:14:30",
                      },
                      {
                        endpoint: "/routes",
                        method: "POST",
                        status: 201,
                        ip: "192.168.1.1",
                        time: "2025-04-17 09:45:12",
                      },
                      {
                        endpoint: "/risks/analysis",
                        method: "GET",
                        status: 200,
                        ip: "192.168.1.1",
                        time: "2025-04-17 09:30:05",
                      },
                      {
                        endpoint: "/auth/token",
                        method: "POST",
                        status: 401,
                        ip: "192.168.1.55",
                        time: "2025-04-17 08:12:44",
                      },
                    ].map((log, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-7 p-4 text-sm items-center"
                      >
                        <div className="font-mono text-xs col-span-2">
                          {log.endpoint}
                        </div>
                        <div>
                          <Badge
                            variant={
                              log.method === "GET"
                                ? "outline"
                                : log.method === "POST"
                                ? "default"
                                : "destructive"
                            }
                            className="font-mono"
                          >
                            {log.method}
                          </Badge>
                        </div>
                        <div className="flex items-center">
                          {log.status < 300 ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                          )}
                          {log.status}
                        </div>
                        <div className="font-mono text-xs">{log.ip}</div>
                        <div className="text-xs">{log.time}</div>
                        <div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 120 entries
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
