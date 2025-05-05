
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data
const tariffRiskData = [
  { name: "Incorrect HS Code", value: 42 },
  { name: "Missing Documentation", value: 28 },
  { name: "Value Discrepancy", value: 18 },
  { name: "Other", value: 12 },
];

const logisticsRiskData = [
  { name: 'Jan', delay: 12, damage: 5, costOverrun: 8 },
  { name: 'Feb', delay: 15, damage: 7, costOverrun: 10 },
  { name: 'Mar', delay: 18, damage: 8, costOverrun: 12 },
  { name: 'Apr', delay: 14, damage: 6, costOverrun: 11 },
  { name: 'May', delay: 19, damage: 9, costOverrun: 14 },
];

const hsCodeData = [
  { code: '8471.30.01', status: 'valid', confidence: 98, description: 'Laptop computers' },
  { code: '6402.99.31', status: 'review', confidence: 75, description: 'Sports footwear' },
  { code: '8517.12.00', status: 'valid', confidence: 94, description: 'Mobile phones' },
  { code: '9503.00.00', status: 'valid', confidence: 96, description: 'Toys' },
  { code: '8528.72.64', status: 'invalid', confidence: 45, description: 'Television sets' },
];

const shipmentData = [
  { id: 'SHP-001', origin: 'Shanghai', destination: 'Los Angeles', risk: 'low' },
  { id: 'SHP-002', origin: 'Rotterdam', destination: 'New York', risk: 'medium' },
  { id: 'SHP-003', origin: 'Busan', destination: 'Long Beach', risk: 'high' },
  { id: 'SHP-004', origin: 'Hamburg', destination: 'Miami', risk: 'low' },
  { id: 'SHP-005', origin: 'Ningbo', destination: 'Seattle', risk: 'medium' },
];

const COLORS = ['#E53935', '#FFC107', '#43A047', '#9E9E9E'];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("tariff");
  
  const getRiskVariant = (risk: string) => {
    switch(risk) {
      case 'high': return 'risk-badge-high';
      case 'medium': return 'risk-badge-medium'; 
      case 'low': return 'risk-badge-low';
      default: return '';
    }
  };
  
  const getHsCodeVariant = (status: string) => {
    switch(status) {
      case 'invalid': return 'risk-badge-high';
      case 'review': return 'risk-badge-medium'; 
      case 'valid': return 'risk-badge-low';
      default: return '';
    }
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shipment Risk Dashboard</h1>
          <p className="text-muted-foreground mt-2">Monitor and manage risk factors across your global shipments.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-2xl font-bold">5</span>
                  <span className="text-sm text-muted-foreground">Active Shipments</span>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M6 11l6-3l6 3M6 19l6-3l6 3M6 11v8M12 8v8M18 11v8"/></svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">23%</span>
                    <span className="text-shipsafe-risk-high text-sm ml-2">↑ 5.2%</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Overall Risk Level</span>
                </div>
                <div className="bg-shipsafe-risk-high/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-shipsafe-risk-high"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-2xl font-bold">3</span>
                  <span className="text-sm text-muted-foreground">High Risk Items</span>
                </div>
                <div className="bg-shipsafe-risk-high/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-shipsafe-risk-high"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold">89%</span>
                    <span className="text-shipsafe-risk-low text-sm ml-2">↑ 3.1%</span>
                  </div>
                  <span className="text-sm text-muted-foreground">On-time Delivery</span>
                </div>
                <div className="bg-shipsafe-risk-low/10 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-shipsafe-risk-low"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs 
          defaultValue="tariff" 
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid w-full md:w-fit grid-cols-3">
            <TabsTrigger value="tariff">Tariff Risk</TabsTrigger>
            <TabsTrigger value="logistics">Logistics Risk</TabsTrigger>
            <TabsTrigger value="hscode">HS Code Validation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tariff" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Tariff Risk Distribution</CardTitle>
                  <CardDescription>
                    Breakdown of tariff risks by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                      <Pie
                        data={tariffRiskData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {tariffRiskData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Risk Factors</CardTitle>
                  <CardDescription>
                    Top tariff compliance risk factors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-shipsafe-risk-high mr-2"></div>
                        <span>HS Code Misclassification</span>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-xs rounded-full px-2 py-0.5 risk-badge-high">High</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">42% of shipments affected</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-shipsafe-risk-medium mr-2"></div>
                        <span>Missing Documentation</span>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-xs rounded-full px-2 py-0.5 risk-badge-medium">Medium</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">28% of shipments affected</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-shipsafe-risk-medium mr-2"></div>
                        <span>Value Declaration Issues</span>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-xs rounded-full px-2 py-0.5 risk-badge-medium">Medium</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">18% of shipments affected</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                    <li className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-shipsafe-risk-low mr-2"></div>
                        <span>Other Compliance Issues</span>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-xs rounded-full px-2 py-0.5 risk-badge-low">Low</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">12% of shipments affected</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="logistics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Logistics Risk Trends</CardTitle>
                  <CardDescription>
                    Monthly trends of key logistics risk factors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={logisticsRiskData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <RechartsTooltip />
                      <Legend />
                      <Area type="monotone" dataKey="delay" stackId="1" stroke="#E53935" fill="#E53935" fillOpacity={0.5} />
                      <Area type="monotone" dataKey="damage" stackId="1" stroke="#FFC107" fill="#FFC107" fillOpacity={0.5} />
                      <Area type="monotone" dataKey="costOverrun" stackId="1" stroke="#33B1B1" fill="#33B1B1" fillOpacity={0.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Port Congestion</CardTitle>
                  <CardDescription>
                    Current port delay status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li>
                      <div className="flex items-center justify-between mb-1">
                        <span>Shanghai</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-xs rounded-full px-2 py-0.5 risk-badge-high">Severe</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">5-7 day delays expected</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-shipsafe-risk-high h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </li>
                    
                    <li>
                      <div className="flex items-center justify-between mb-1">
                        <span>Rotterdam</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-xs rounded-full px-2 py-0.5 risk-badge-medium">Moderate</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">2-4 day delays expected</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-shipsafe-risk-medium h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </li>
                    
                    <li>
                      <div className="flex items-center justify-between mb-1">
                        <span>Los Angeles</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-xs rounded-full px-2 py-0.5 risk-badge-medium">Moderate</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">2-3 day delays expected</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-shipsafe-risk-medium h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </li>
                    
                    <li>
                      <div className="flex items-center justify-between mb-1">
                        <span>Singapore</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="text-xs rounded-full px-2 py-0.5 risk-badge-low">Low</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">No significant delays</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-shipsafe-risk-low h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="hscode" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>HS Code Validation</CardTitle>
                <CardDescription>
                  Classification accuracy and validity check for your shipments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50 transition-colors">
                        <th className="h-12 px-4 text-left align-middle font-medium">HS Code</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Description</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Confidence</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hsCodeData.map((item, idx) => (
                        <tr key={idx} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">{item.code}</td>
                          <td className="p-4 align-middle">{item.description}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    item.confidence > 90 
                                      ? 'bg-shipsafe-risk-low' 
                                      : item.confidence > 70 
                                        ? 'bg-shipsafe-risk-medium' 
                                        : 'bg-shipsafe-risk-high'
                                  }`} 
                                  style={{ width: `${item.confidence}%` }}
                                />
                              </div>
                              <span>{item.confidence}%</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className={`text-xs rounded-full px-2 py-0.5 ${getHsCodeVariant(item.status)}`}>
                                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {item.status === 'valid' && <p className="text-xs">Code is valid and properly classified</p>}
                                  {item.status === 'review' && <p className="text-xs">Potential misclassification - needs review</p>}
                                  {item.status === 'invalid' && <p className="text-xs">Incorrect classification - high risk of penalties</p>}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Current Shipments</CardTitle>
              <CardDescription>
                Overview of active shipments and their risk status
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b transition-colors">
                    <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Origin</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Destination</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Risk Level</th>
                  </tr>
                </thead>
                <tbody>
                  {shipmentData.map((shipment) => (
                    <tr key={shipment.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle font-medium">{shipment.id}</td>
                      <td className="p-4 align-middle">{shipment.origin}</td>
                      <td className="p-4 align-middle">{shipment.destination}</td>
                      <td className="p-4 align-middle">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getRiskVariant(shipment.risk)}`}>
                          {shipment.risk.charAt(0).toUpperCase() + shipment.risk.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
