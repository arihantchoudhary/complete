
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertTriangle, Bell, Globe, Lock, Mail, Save, Shield, User } from "lucide-react";

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="app">App Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">Change Avatar</Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input id="jobTitle" defaultValue="Supply Chain Manager" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Preferences</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <select id="language" className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <select id="timezone" className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option>Pacific Time (PT)</option>
                        <option>Eastern Time (ET)</option>
                        <option>Central European Time (CET)</option>
                        <option>Japan Standard Time (JST)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure how and when you receive alerts and notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Email Notifications</h3>
                  
                  {[
                    { 
                      title: "Risk Alerts", 
                      description: "Receive email when high risk events are detected",
                      icon: AlertTriangle 
                    },
                    { 
                      title: "Weekly Reports", 
                      description: "Receive weekly summary of route performance",
                      icon: Mail 
                    },
                    { 
                      title: "Team Activity", 
                      description: "Updates about team member actions",
                      icon: User
                    }
                  ].map((item, i) => {
                    const ItemIcon = item.icon;
                    return (
                      <div key={i} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 bg-muted rounded-md">
                            <ItemIcon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        <Switch defaultChecked={i !== 2} />
                      </div>
                    );
                  })}
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Push Notifications</h3>
                  
                  {[
                    { 
                      title: "Critical Alerts", 
                      description: "Immediate alerts for urgent situations",
                      defaultOn: true
                    },
                    { 
                      title: "Route Status Updates", 
                      description: "Real-time updates on route status changes",
                      defaultOn: true
                    },
                    { 
                      title: "System Announcements", 
                      description: "Updates about system maintenance and features",
                      defaultOn: false
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <Switch defaultChecked={item.defaultOn} />
                    </div>
                  ))}
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    <Bell className="h-4 w-4 mr-2" />
                    Test Notifications
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and security options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Change Password</h3>
                  
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                  
                  <Button variant="outline">
                    <Lock className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Shield className="h-8 w-8 text-primary" />
                          <div>
                            <h4 className="font-medium">Two-Factor Authentication</h4>
                            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                          </div>
                        </div>
                        <Button variant={false ? "outline" : "default"}>
                          {false ? "Disable" : "Enable"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Login Sessions</h3>
                  
                  <div className="space-y-3">
                    {[
                      { 
                        device: "Windows PC", 
                        location: "New York, USA", 
                        lastActive: "Active now",
                        current: true
                      },
                      { 
                        device: "iPhone 15", 
                        location: "New York, USA", 
                        lastActive: "3 hours ago",
                        current: false
                      },
                      { 
                        device: "MacBook Pro", 
                        location: "Boston, USA", 
                        lastActive: "Yesterday",
                        current: false
                      }
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{session.device}</h4>
                            {session.current && (
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{session.location}</span>
                            <span>•</span>
                            <span>{session.lastActive}</span>
                          </div>
                        </div>
                        {!session.current && (
                          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                            End Session
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="app" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
                <CardDescription>
                  Customize your LogiTrade experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Display Settings</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium text-sm">Compact Mode</h4>
                        <p className="text-xs text-muted-foreground">Display more information on screen with reduced spacing</p>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium text-sm">Dashboard Auto-refresh</h4>
                        <p className="text-xs text-muted-foreground">Automatically refresh dashboard data every 5 minutes</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">Default Units</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium text-sm">Distance Units</h4>
                        <p className="text-xs text-muted-foreground">Choose your preferred distance unit</p>
                      </div>
                      <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                        <option>Kilometers</option>
                        <option>Miles</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium text-sm">Currency</h4>
                        <p className="text-xs text-muted-foreground">Default currency for cost calculations</p>
                      </div>
                      <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium text-sm">Date Format</h4>
                        <p className="text-xs text-muted-foreground">Choose your preferred date format</p>
                      </div>
                      <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="font-medium">System Integration</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium text-sm">Default Map Provider</h4>
                          <p className="text-xs text-muted-foreground">Provider for route visualization</p>
                        </div>
                      </div>
                      <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                        <option>LogiTrade Maps</option>
                        <option>Google Maps</option>
                        <option>OpenStreetMap</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <h4 className="font-medium text-sm">Data Export Format</h4>
                        <p className="text-xs text-muted-foreground">Default format for exported reports</p>
                      </div>
                      <select className="rounded-md border border-input bg-background px-3 py-1 text-sm">
                        <option>Excel (.xlsx)</option>
                        <option>CSV</option>
                        <option>PDF</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button variant="outline" className="mr-2">Reset to Defaults</Button>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
