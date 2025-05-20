
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Phone, Plus, Search, Settings, User } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Define form schema
const teamMemberSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.string().min(1, { message: "Please select a role." }),
  department: z.string().min(1, { message: "Please select a department." }),
  accessLevel: z.string().min(1, { message: "Please select an access level." }),
});

export default function Teams() {
  const [activeTab, setActiveTab] = useState("members");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const form = useForm<z.infer<typeof teamMemberSchema>>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      department: "",
      accessLevel: "viewer",
    },
  });
  
  // Sample team members data
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Supply Chain Manager",
      department: "Operations",
      email: "alex.johnson@company.com",
      phone: "+1 (555) 123-4567",
      accessLevel: "admin",
      status: "active",
    },
    {
      id: 2,
      name: "Jamie Smith",
      role: "Logistics Coordinator",
      department: "Logistics",
      email: "jamie.smith@company.com",
      phone: "+1 (555) 234-5678",
      accessLevel: "editor",
      status: "active",
    },
    {
      id: 3,
      name: "Taylor Morgan",
      role: "Risk Analyst",
      department: "Risk Management",
      email: "taylor.morgan@company.com",
      phone: "+1 (555) 345-6789",
      accessLevel: "editor",
      status: "active",
    },
    {
      id: 4,
      name: "Jordan Lee",
      role: "Data Scientist",
      department: "Analytics",
      email: "jordan.lee@company.com",
      phone: "+1 (555) 456-7890",
      accessLevel: "viewer",
      status: "active",
    },
    {
      id: 5,
      name: "Casey Rivera",
      role: "Operations Director",
      department: "Executive",
      email: "casey.rivera@company.com",
      phone: "+1 (555) 567-8901",
      accessLevel: "admin",
      status: "away",
    },
    {
      id: 6,
      name: "Riley Cooper",
      role: "Customer Success",
      department: "Support",
      email: "riley.cooper@company.com",
      phone: "+1 (555) 678-9012",
      accessLevel: "viewer",
      status: "inactive",
    },
  ];
  
  // Filter team members based on search term
  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  function onSubmit(values: z.infer<typeof teamMemberSchema>) {
    console.log(values);
    setIsAddMemberOpen(false);
    form.reset();
  }
  
  // Get status badge variant based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "away":
        return "outline";
      case "inactive":
        return "destructive";
      default:
        return "outline";
    }
  };
  
  // Get access level badge
  const getAccessBadge = (level: string) => {
    switch (level) {
      case "admin":
        return { class: "bg-blue-100 text-blue-800", label: "Admin" };
      case "editor":
        return { class: "bg-green-100 text-green-800", label: "Editor" };
      case "viewer":
        return { class: "bg-gray-100 text-gray-800", label: "Viewer" };
      default:
        return { class: "bg-gray-100 text-gray-800", label: "Unknown" };
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
            <p className="text-muted-foreground">
              Manage team members and permissions for LogiTrade
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Team Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Team Member</DialogTitle>
                  <DialogDescription>
                    Invite a new team member to collaborate on LogiTrade.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Team members will receive an invitation via email.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <Input placeholder="Supply Chain Manager" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="operations">Operations</SelectItem>
                                <SelectItem value="logistics">Logistics</SelectItem>
                                <SelectItem value="risk">Risk Management</SelectItem>
                                <SelectItem value="analytics">Analytics</SelectItem>
                                <SelectItem value="executive">Executive</SelectItem>
                                <SelectItem value="support">Support</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="accessLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Access Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select access level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="admin">Admin (Full access)</SelectItem>
                              <SelectItem value="editor">Editor (Can edit)</SelectItem>
                              <SelectItem value="viewer">Viewer (Read-only)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Determines what actions and data the team member can access.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <Button type="submit">Add Team Member</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Team Settings
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="members" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <TabsList>
              <TabsTrigger value="members">Team Members</TabsTrigger>
              <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
              <TabsTrigger value="departments">Departments</TabsTrigger>
            </TabsList>
            
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search team members..."
                className="pl-8 w-[250px] md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage team members and their access to LogiTrade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 items-center border-b p-3 text-sm font-medium text-muted-foreground">
                    <div className="col-span-2">Name & Role</div>
                    <div>Access Level</div>
                    <div>Department</div>
                    <div>Status</div>
                    <div>Actions</div>
                  </div>
                  
                  {filteredMembers.length > 0 ? (
                    <div className="divide-y">
                      {filteredMembers.map((member) => {
                        const accessBadge = getAccessBadge(member.accessLevel);
                        
                        return (
                          <div key={member.id} className="grid grid-cols-6 items-center p-3">
                            <div className="col-span-2 flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{member.name}</div>
                                <div className="text-sm text-muted-foreground">{member.role}</div>
                              </div>
                            </div>
                            
                            <div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${accessBadge.class}`}>
                                {accessBadge.label}
                              </span>
                            </div>
                            
                            <div>{member.department}</div>
                            
                            <div>
                              <Badge variant={getStatusBadge(member.status)}>
                                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Mail className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <User className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No team members found matching your search.
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <div className="text-sm text-muted-foreground">
                  Showing {filteredMembers.length} of {teamMembers.length} team members
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="roles" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Roles & Permissions</CardTitle>
                <CardDescription>
                  Configure access levels and permission sets for your team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-16 border rounded-lg">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Permission Management</h3>
                    <p className="text-muted-foreground mb-4">Configure custom roles and permissions for your organization.</p>
                    <Button>Configure Permissions</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="departments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Department Structure</CardTitle>
                <CardDescription>
                  Organize your team into departments and hierarchies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center p-16 border rounded-lg">
                  <div className="text-center">
                    <h3 className="text-lg font-medium mb-2">Department Organization</h3>
                    <p className="text-muted-foreground mb-4">Create and manage departments within your organization.</p>
                    <Button>Manage Departments</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
