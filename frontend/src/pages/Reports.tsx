
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const riskTrendData = [
  { month: 'Jan', tariffRisk: 32, logisticsRisk: 28, complianceRisk: 20 },
  { month: 'Feb', tariffRisk: 35, logisticsRisk: 25, complianceRisk: 18 },
  { month: 'Mar', tariffRisk: 30, logisticsRisk: 22, complianceRisk: 16 },
  { month: 'Apr', tariffRisk: 25, logisticsRisk: 20, complianceRisk: 15 },
  { month: 'May', tariffRisk: 23, logisticsRisk: 21, complianceRisk: 13 },
];

const riskActionItems = [
  {
    id: 1,
    risk: "HS Code Misclassification",
    priority: "high", 
    action: "Review and update HS codes for laptop shipments based on most recent tariff guidelines",
    impact: "Potential duty savings of $4,500",
    status: "pending"
  },
  {
    id: 2,
    risk: "Missing Documentation",
    priority: "medium", 
    action: "Request complete Certificate of Origin for Rotterdam shipments",
    impact: "Avoid clearance delays up to 3 days",
    status: "in-progress"
  },
  {
    id: 3,
    risk: "Port Congestion",
    priority: "medium", 
    action: "Consider alternate routing through Ningbo for upcoming shipments",
    impact: "Reduce transit time by 5-7 days",
    status: "pending"
  },
  {
    id: 4,
    risk: "Value Declaration",
    priority: "high", 
    action: "Standardize valuation methodology across all mobile phone shipments",
    impact: "Mitigate potential duties reassessment of $8,200",
    status: "completed"
  },
  {
    id: 5,
    risk: "Insurance Coverage",
    priority: "low", 
    action: "Increase coverage for high-value electronics shipments",
    impact: "Additional protection of $25,000 per container",
    status: "pending"
  }
];

export default function Reports() {
  const { toast } = useToast();
  const [reportType, setReportType] = useState("summary");
  const [generating, setGenerating] = useState(false);

  const handleGenerateReport = () => {
    setGenerating(true);
    
    setTimeout(() => {
      toast({
        title: "Report generated successfully",
        description: "Your report is ready for download",
      });
      setGenerating(false);
    }, 2000);
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Risk Reports</h1>
          <p className="text-muted-foreground mt-2">Generate customized risk reports and action plans for your shipments.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Risk Trends Overview</CardTitle>
              <CardDescription>
                Trend analysis of key risk factors over the last 5 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={riskTrendData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="tariffRisk" stroke="#E53935" name="Tariff Risk" strokeWidth={2} />
                  <Line type="monotone" dataKey="logisticsRisk" stroke="#FFC107" name="Logistics Risk" strokeWidth={2} />
                  <Line type="monotone" dataKey="complianceRisk" stroke="#33B1B1" name="Compliance Risk" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                <div>Data last updated: May 5, 2025</div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info mr-1"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  <span>Showing percentage of shipments affected</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generate Report</CardTitle>
              <CardDescription>
                Create custom PDF reports for your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-sm mb-2">Report Type</p>
                  <Tabs defaultValue="summary" onValueChange={setReportType} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="summary">Summary</TabsTrigger>
                      <TabsTrigger value="detailed">Detailed</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="tariff-risk"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="tariff-risk" className="ml-2 block text-sm">
                      Tariff Risk Analysis
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="logistics-risk"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="logistics-risk" className="ml-2 block text-sm">
                      Logistics Risk Analysis
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="hs-code"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="hs-code" className="ml-2 block text-sm">
                      HS Code Validation
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="action-plan"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="action-plan" className="ml-2 block text-sm">
                      Recommended Action Plan
                    </label>
                  </div>
                </div>
                
                <Button onClick={handleGenerateReport} disabled={generating} className="w-full mt-4">
                  {generating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-pdf mr-2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M10 11h1v6h-1"/><path d="M14 11h-1.5v2h1.5a1 1 0 1 0 0-2z"/><path d="M14 14.5h-1.5v2.5h1.5a1.5 1.5 0 0 0 0-3z"/><path d="M3 15h1v1.5h.5"/><path d="m5.5 16.5-.5.5"/><path d="M5 12v3"/></svg>
                      Generate PDF Report
                    </>
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground mt-2">
                  {reportType === "summary" ? 
                    "Summary report includes high-level insights and top risk factors (2-3 pages)." : 
                    "Detailed report includes comprehensive analysis and complete action items (5-8 pages)."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Risk Mitigation Action Plan</CardTitle>
            <CardDescription>
              Recommended actions to address identified risks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium">Risk Factor</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Priority</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Recommended Action</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Expected Impact</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {riskActionItems.map((item) => (
                    <tr key={item.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle font-medium">{item.risk}</td>
                      <td className="p-4 align-middle">
                        <Badge variant={item.priority === "high" ? "destructive" : item.priority === "medium" ? "default" : "outline"}>
                          {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">{item.action}</td>
                      <td className="p-4 align-middle text-muted-foreground">{item.impact}</td>
                      <td className="p-4 align-middle">
                        <Badge variant={
                          item.status === "completed" ? "outline" : 
                          item.status === "in-progress" ? "secondary" : 
                          "default"
                        }>
                          {item.status === "in-progress" ? "In Progress" : 
                            item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Cost Savings Opportunity Breakdown</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={[
                    { category: 'Duty Optimization', savings: 16500 },
                    { category: 'Routing Changes', savings: 9800 },
                    { category: 'Document Compliance', savings: 7200 },
                    { category: 'Insurance Adjustment', savings: 4500 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Potential Savings']} />
                  <Bar dataKey="savings" fill="#33B1B1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <div className="flex items-center justify-between w-full">
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold">Total projected savings:</span> $38,000 per quarter
              </div>
              <Button variant="outline" className="ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                Export Action Plan
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
