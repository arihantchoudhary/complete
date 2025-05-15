import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { calculateRiskFactors, clearRiskFactorCache } from "@/utils/riskCalculations";
import { RiskScorecard } from "@/components/RiskScorecard";
import { DataSourceManager } from "@/components/DataSourceManager";
import { RouteType } from "@/types/route";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Loader2, RefreshCcw, Shield, Zap } from "lucide-react";
import { toast } from "sonner";

const routesData: RouteType[] = [
  {
    id: 1,
    origin: "Shanghai",
    destination: "Rotterdam",
    etaStatus: "on-time",
    etaDays: 34,
    etaHours: 6,
    riskScore: 42,
    volume: 8500,
    cost: "$5,600/TEU"
  },
  {
    id: 2,
    origin: "Los Angeles",
    destination: "Singapore",
    etaStatus: "delayed",
    etaDays: 18,
    etaHours: 12,
    riskScore: 75,
    volume: 6200,
    cost: "$4,900/TEU"
  },
  {
    id: 3,
    origin: "Rotterdam",
    destination: "New York",
    etaStatus: "early",
    etaDays: 11,
    etaHours: 15,
    riskScore: 25,
    volume: 4800,
    cost: "$3,800/TEU"
  },
  {
    id: 4,
    origin: "Dubai",
    destination: "Mumbai",
    etaStatus: "on-time",
    etaDays: 4,
    etaHours: 8,
    riskScore: 30,
    volume: 3200,
    cost: "$2,100/TEU"
  },
  {
    id: 5,
    origin: "Singapore",
    destination: "Sydney",
    etaStatus: "delayed",
    etaDays: 9,
    etaHours: 22,
    riskScore: 68,
    volume: 5100,
    cost: "$4,200/TEU"
  }
];

export default function Risks() {
  const [riskFactors, setRiskFactors] = useState<any[]>([]);
  const [totalRiskScore, setTotalRiskScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("week");

  const [historicalData, setHistoricalData] = useState([
    { date: '2025-04-14', geopolitical: 72, economic: 65, supplyChain: 58, overall: 68 },
    { date: '2025-04-15', geopolitical: 74, economic: 63, supplyChain: 59, overall: 69 },
    { date: '2025-04-16', geopolitical: 73, economic: 66, supplyChain: 57, overall: 68 },
    { date: '2025-04-17', geopolitical: 76, economic: 68, supplyChain: 61, overall: 71 },
    { date: '2025-04-18', geopolitical: 78, economic: 67, supplyChain: 62, overall: 72 },
    { date: '2025-04-19', geopolitical: 77, economic: 69, supplyChain: 63, overall: 72 },
    { date: '2025-04-20', geopolitical: 75, economic: 70, supplyChain: 64, overall: 71 },
    { date: '2025-04-21', geopolitical: 76, economic: 68, supplyChain: 63, overall: 70 },
  ]);

  useEffect(() => {
    loadRiskData();
  }, []);

  const loadRiskData = async () => {
    setIsLoading(true);
    try {
      const factors = await calculateRiskFactors(routesData);
      
      setRiskFactors(factors);
      
      const total = Math.round(factors.reduce((acc, factor) => acc + factor.score, 0));
      setTotalRiskScore(total > 100 ? 100 : total);
      
      toast.success("Risk data refreshed");
    } catch (error) {
      console.error("Error loading risk data:", error);
      toast.error("Failed to load risk data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    clearRiskFactorCache();
    loadRiskData();
  };

  const getRiskLevel = (score: number) => {
    if (score >= 70) return "high";
    if (score >= 40) return "medium";
    return "low";
  };

  const getRiskTrend = () => {
    if (historicalData.length < 2) return "stable";
    
    const latest = historicalData[historicalData.length - 1].overall;
    const previous = historicalData[historicalData.length - 2].overall;
    
    if (latest > previous) return "up";
    if (latest < previous) return "down";
    return "stable";
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Risk Intelligence</h1>
            <p className="text-muted-foreground">
              Comprehensive risk assessment based on real-time global data
            </p>
          </div>
          
          <Button 
            onClick={handleRefresh} 
            disabled={isLoading}
            className="flex items-center"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="mr-2 h-4 w-4" />
            )}
            Refresh Risk Data
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RiskScorecard 
            title="Overall Risk Score" 
            score={totalRiskScore}
            trend={getRiskTrend()}
            type={getRiskLevel(totalRiskScore)}
            description="Aggregate assessment from all factors"
            category="geopolitical"
          />
          
          <RiskScorecard 
            title="Geopolitical Risk" 
            score={historicalData[historicalData.length - 1].geopolitical}
            trend={
              historicalData[historicalData.length - 1].geopolitical > 
              historicalData[historicalData.length - 2].geopolitical ? "up" : "down"
            }
            type={getRiskLevel(historicalData[historicalData.length - 1].geopolitical)}
            description="Political and regional stability"
            category="geopolitical"
          />
          
          <RiskScorecard 
            title="Economic Risk" 
            score={historicalData[historicalData.length - 1].economic}
            trend={
              historicalData[historicalData.length - 1].economic > 
              historicalData[historicalData.length - 2].economic ? "up" : "down"
            }
            type={getRiskLevel(historicalData[historicalData.length - 1].economic)}
            description="Market and financial factors"
            category="economic"
          />
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="overview" className="flex items-center">
                <Shield className="mr-2 h-4 w-4" /> Risk Overview
              </TabsTrigger>
              <TabsTrigger value="sources" className="flex items-center">
                <Zap className="mr-2 h-4 w-4" /> Data Sources
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4" /> Risk Alerts
              </TabsTrigger>
            </TabsList>

            <div>
              <TabsList>
                <TabsTrigger value="day" onClick={() => setTimeRange("day")}>24H</TabsTrigger>
                <TabsTrigger value="week" onClick={() => setTimeRange("week")}>7D</TabsTrigger>
                <TabsTrigger value="month" onClick={() => setTimeRange("month")}>30D</TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Historical Risk Trend</CardTitle>
                  <CardDescription>
                    Risk factor evolution over the past {timeRange === "day" ? "24 hours" : timeRange === "week" ? "7 days" : "30 days"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={historicalData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <defs>
                          <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorGeopolitical" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ff4d4f" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#ff4d4f" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorEconomic" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#faad14" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#faad14" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorSupplyChain" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#52c41a" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#52c41a" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area 
                          type="monotone" 
                          dataKey="overall" 
                          stroke="#8884d8" 
                          fillOpacity={1}
                          fill="url(#colorOverall)"
                          name="Overall Risk"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="geopolitical" 
                          stroke="#ff4d4f" 
                          fillOpacity={0.5}
                          fill="url(#colorGeopolitical)"
                          name="Geopolitical"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="economic" 
                          stroke="#faad14" 
                          fillOpacity={0.5}
                          fill="url(#colorEconomic)"
                          name="Economic"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="supplyChain" 
                          stroke="#52c41a" 
                          fillOpacity={0.5}
                          fill="url(#colorSupplyChain)"
                          name="Supply Chain"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Risk Factors Analysis</CardTitle>
                  <CardDescription>
                    Breakdown of current risk components
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center items-center h-[350px]">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-5 max-h-[350px] overflow-y-auto pr-2">
                      {riskFactors.map((factor, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div>
                              <span className="font-medium">{factor.name}</span>
                              {factor.source && (
                                <span className="text-xs text-muted-foreground ml-2">
                                  Source: {factor.source}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              {factor.trend && (
                                <span className={
                                  factor.trend === "up" ? "text-risk-high" :
                                  factor.trend === "down" ? "text-risk-low" :
                                  "text-gray-500"
                                }>
                                  {factor.trend === "up" ? "↑" : factor.trend === "down" ? "↓" : "→"}
                                </span>
                              )}
                              <span className="font-medium px-2 py-0.5 rounded bg-muted/50">
                                {Math.round(factor.value)}
                              </span>
                            </div>
                          </div>
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                factor.value >= 70 ? "bg-risk-high" :
                                factor.value >= 40 ? "bg-risk-medium" :
                                "bg-risk-low"
                              }`}
                              style={{ width: `${factor.value}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Weight: {Math.round(factor.weight * 100)}%</span>
                            <span>
                              Contribution: {factor.score.toFixed(1)} points
                              {factor.confidence && ` (Confidence: ${factor.confidence}%)`}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="sources">
            <DataSourceManager />
          </TabsContent>
          
          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Risk Alerts</CardTitle>
                <CardDescription>
                  Automated risk notifications based on real-time data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-risk-high/10 border border-risk-high/30 rounded-lg p-4">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-risk-high mr-2" />
                      <h3 className="font-semibold text-risk-high">High Risk Alert: Geopolitical Tensions</h3>
                    </div>
                    <p className="mt-2 text-sm">
                      Rising political tensions in the Middle East region are likely to affect shipping routes through the Suez Canal.
                      Consider alternative routing options for shipments between Asia and Europe.
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Source: Political Risk Index • 2 hours ago
                    </div>
                  </div>
                  
                  <div className="bg-risk-medium/10 border border-risk-medium/30 rounded-lg p-4">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-risk-medium mr-2" />
                      <h3 className="font-semibold text-risk-medium">Medium Risk Alert: Port Congestion</h3>
                    </div>
                    <p className="mt-2 text-sm">
                      Significant congestion detected at Shanghai port due to increased volume and labor shortages.
                      Expect potential delays of 3-5 days for shipments originating from or passing through this hub.
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Source: Supply Chain Disruptions • 10 hours ago
                    </div>
                  </div>
                  
                  <div className="bg-risk-medium/10 border border-risk-medium/30 rounded-lg p-4">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-risk-medium mr-2" />
                      <h3 className="font-semibold text-risk-medium">Medium Risk Alert: Weather Advisory</h3>
                    </div>
                    <p className="mt-2 text-sm">
                      Tropical storm forming in the Atlantic may impact shipping lanes between North America and Europe.
                      Monitor weather patterns and prepare for potential rerouting requirements.
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Source: Global Weather Patterns • 1 day ago
                    </div>
                  </div>
                  
                  <div className="bg-risk-low/10 border border-risk-low/30 rounded-lg p-4">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-risk-low mr-2" />
                      <h3 className="font-semibold text-risk-low">Low Risk Alert: Customs Procedure Changes</h3>
                    </div>
                    <p className="mt-2 text-sm">
                      New inspection procedures at Los Angeles port causing moderate processing delays for incoming cargo.
                      Consider adding 1-2 extra days to expected processing times.
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Source: Supply Chain Disruptions • 3 days ago
                    </div>
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
