
import { AlertCard } from "@/components/AlertCard";
import { DashboardLayout } from "@/components/DashboardLayout";
import { GlobeVisualization } from "@/components/GlobeVisualization";
import { RiskScorecard } from "@/components/RiskScorecard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { 
  AlertTriangle, 
  Filter, 
  Sparkles, 
  Brain, 
  Info, 
  ShieldAlert, 
  Clock,
  Zap, 
  BarChart as BarChartIcon, 
  Globe, 
  MapPin,
  CloudRain,
  Flag,
  TrendingUp,
  TrendingDown,
  Bell,
  Anchor
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { calculateRiskFactors, fetchRiskFactors } from "@/utils/riskCalculations";

const riskTrendData = [
  { name: 'Jan', geopolitical: 65, economic: 40, weather: 24, port: 50 },
  { name: 'Feb', geopolitical: 50, economic: 45, weather: 22, port: 48 },
  { name: 'Mar', geopolitical: 55, economic: 48, weather: 28, port: 52 },
  { name: 'Apr', geopolitical: 70, economic: 50, weather: 35, port: 58 },
  { name: 'May', geopolitical: 60, economic: 52, weather: 32, port: 55 },
  { name: 'Jun', geopolitical: 65, economic: 55, weather: 40, port: 60 },
  { name: 'Jul', geopolitical: 80, economic: 58, weather: 45, port: 65 },
  { name: 'Aug', geopolitical: 75, economic: 60, weather: 50, port: 62 },
];

const alertsData = [
  {
    title: "Port Congestion Alert",
    region: "East Asia",
    severity: "high",
    time: "10 minutes ago",
    description: "Significant congestion detected at Shanghai port due to increased volume and labor shortages."
  },
  {
    title: "Geopolitical Tension",
    region: "Middle East",
    severity: "medium",
    time: "2 hours ago",
    description: "Rising diplomatic tensions may affect shipping routes through the Suez Canal in the coming week."
  },
  {
    title: "Weather Advisory",
    region: "Atlantic Ocean",
    severity: "medium",
    time: "1 hour ago",
    description: "Tropical storm forming in the Atlantic may impact shipping lanes between North America and Europe."
  },
  {
    title: "Customs Delay Notice",
    region: "North America",
    severity: "low",
    time: "3 hours ago",
    description: "New inspection procedures at Los Angeles port causing moderate processing delays for incoming cargo."
  }
];

const routesData = [
  {
    id: 1,
    origin: "Shanghai",
    destination: "Rotterdam",
    etaStatus: "on-time" as const,
    etaDays: 34,
    etaHours: 6,
    riskScore: 72,
    volume: 8500,
    cost: "$5,600/TEU"
  },
  {
    id: 2,
    origin: "Los Angeles",
    destination: "Singapore",
    etaStatus: "delayed" as const,
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
    etaStatus: "early" as const,
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
    etaStatus: "on-time" as const,
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
    etaStatus: "delayed" as const,
    etaDays: 9,
    etaHours: 22,
    riskScore: 68,
    volume: 5100,
    cost: "$4,200/TEU"
  },
  {
    id: 6,
    origin: "Hamburg",
    destination: "Santos",
    etaStatus: "on-time" as const,
    etaDays: 16,
    etaHours: 4,
    riskScore: 55,
    volume: 4500,
    cost: "$3,900/TEU"
  }
];

const riskFactorsData = calculateRiskFactors(routesData);

const totalRiskScore = Math.round(riskFactorsData.reduce((acc, factor) => acc + factor.score, 0));

const aiPredictionsData = [
  { month: 'Current', geopolitical: 75, economic: 58, weather: 45, port: 62, overall: 68 },
  { month: 'Next Month', geopolitical: 78, economic: 62, weather: 48, port: 65, overall: 71 },
  { month: '+2 Months', geopolitical: 81, economic: 65, weather: 52, port: 68, overall: 74 },
  { month: '+3 Months', geopolitical: 85, economic: 70, weather: 55, port: 72, overall: 78 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('risk-overview');
  const [currentRiskFactors, setCurrentRiskFactors] = useState(riskFactorsData);
  const [currentTotalRiskScore, setCurrentTotalRiskScore] = useState(totalRiskScore);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const freshRiskFactors = await fetchRiskFactors(routesData);
        setCurrentRiskFactors(freshRiskFactors);
        const freshTotalRiskScore = Math.round(freshRiskFactors.reduce((acc, factor) => acc + factor.score, 0));
        setCurrentTotalRiskScore(freshTotalRiskScore);
      } catch (error) {
        console.error("Error fetching risk factors:", error);
      }
    };
    
    fetchData();
  }, []);

  const handleAlertClick = (title: string) => {
    toast({
      title: "Alert Selected",
      description: `You clicked on the "${title}" alert.`,
      duration: 3000,
    });
  };

  const handleMarkAllRead = () => {
    toast({
      title: "Alerts Updated",
      description: "All alerts have been marked as read.",
      duration: 3000,
    });
  };

  const currentRisk = aiPredictionsData[0].overall;
  const futureRisk = aiPredictionsData[3].overall;
  const riskTrend = futureRisk > currentRisk ? "up" : "down";
  const riskDifference = Math.abs(futureRisk - currentRisk);

  const scrollToDemo = () => {
    window.location.href = '/#demo';
  };

  // Group risk factors by category based on name matching
  const geopoliticalRisks = currentRiskFactors.filter(factor => 
    factor.name.toLowerCase().includes('politic') || 
    factor.name.toLowerCase().includes('conflict') || 
    factor.name.toLowerCase().includes('stability') ||
    factor.name.toLowerCase().includes('tariff'));
  
  const portRisks = currentRiskFactors.filter(factor => 
    factor.name.toLowerCase().includes('port') || 
    factor.name.toLowerCase().includes('congest') || 
    factor.name.toLowerCase().includes('delay') ||
    factor.name.toLowerCase().includes('route') ||
    factor.name.toLowerCase().includes('container') ||
    factor.name.toLowerCase().includes('shipping'));
  
  const weatherRisks = currentRiskFactors.filter(factor => 
    factor.name.toLowerCase().includes('weather') || 
    factor.name.toLowerCase().includes('climate') || 
    factor.name.toLowerCase().includes('sea route') ||
    factor.name.toLowerCase().includes('severe'));
  
  const economicRisks = currentRiskFactors.filter(factor => 
    factor.name.toLowerCase().includes('economic') || 
    factor.name.toLowerCase().includes('cost') || 
    factor.name.toLowerCase().includes('inflation') ||
    factor.name.toLowerCase().includes('currency') ||
    factor.name.toLowerCase().includes('trade volume') ||
    factor.name.toLowerCase().includes('market'));

  // Calculate category totals based on actual risk factor values and weights
  const calculateCategoryRisk = (risks) => {
    if (risks.length === 0) return 35; // Base value to ensure no category is 0%
    
    // Sum of weighted values
    const weightedSum = risks.reduce((acc, risk) => acc + (risk.value * risk.weight), 0);
    // Total weight in this category
    const totalWeight = risks.reduce((acc, risk) => acc + risk.weight, 0);
    
    // Normalize to a percentage (capped at 100%)
    return Math.min(Math.round(weightedSum * (1 / totalWeight)), 100);
  };

  // Supply chain professionals typically care most about port/logistics (40%), 
  // economic factors (30%), geopolitical issues (20%), and weather (10%)
  const geopoliticalRiskScore = calculateCategoryRisk(geopoliticalRisks);
  const portRiskScore = calculateCategoryRisk(portRisks);
  const weatherRiskScore = calculateCategoryRisk(weatherRisks);
  const economicRiskScore = calculateCategoryRisk(economicRisks);

  const getRiskLevel = (score) => {
    if (score >= 70) return "high";
    if (score >= 40) return "medium";
    return "low";
  };

  const getCategoryTrend = (category) => {
    const current = aiPredictionsData[0][category];
    const future = aiPredictionsData[3][category];
    return future > current ? "up" : future < current ? "down" : "stable";
  };

  // Calculate total weights for display (rounded to whole numbers)
  const totalGeopoliticalWeight = Math.round(geopoliticalRisks.reduce((acc, r) => acc + r.weight, 0) * 100);
  const totalPortWeight = Math.round(portRisks.reduce((acc, r) => acc + r.weight, 0) * 100);
  const totalWeatherWeight = Math.round(weatherRisks.reduce((acc, r) => acc + r.weight, 0) * 100);
  const totalEconomicWeight = Math.round(economicRisks.reduce((acc, r) => acc + r.weight, 0) * 100);

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8 bg-background/30 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-card/40 p-6 rounded-xl border shadow-sm">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Risk Intelligence Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time monitoring of global trade risks and supply chain disruptions
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hover-scale">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" onClick={scrollToDemo} className="bg-primary hover:bg-primary/90 text-white hover-scale">
              <Sparkles className="mr-2 h-4 w-4" />
              Book a Demo
            </Button>
            <Select defaultValue="week">
              <SelectTrigger className="w-[150px] bg-background">
                <SelectValue placeholder="Time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Last 24 hours</SelectItem>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="quarter">Last quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <RiskScorecard 
            title="Port & Logistics Risk" 
            score={portRiskScore}
            trend={getCategoryTrend("port")}
            type={getRiskLevel(portRiskScore)}
            description={`Supply chain operations (${totalPortWeight}%)`}
            category="port"
          />
          <RiskScorecard 
            title="Economic Risk" 
            score={economicRiskScore}
            trend={getCategoryTrend("economic")}
            type={getRiskLevel(economicRiskScore)}
            description={`Financial factors (${totalEconomicWeight}%)`}
            category="economic"
          />
          <RiskScorecard 
            title="Geopolitical Risk" 
            score={geopoliticalRiskScore}
            trend={getCategoryTrend("geopolitical")}
            type={getRiskLevel(geopoliticalRiskScore)}
            description={`Political factors (${totalGeopoliticalWeight}%)`}
            category="geopolitical"
          />
          <RiskScorecard 
            title="Weather Risk" 
            score={weatherRiskScore}
            trend={getCategoryTrend("weather")}
            type={getRiskLevel(weatherRiskScore)}
            description={`Climate impacts (${totalWeatherWeight}%)`}
            category="weather"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 overflow-hidden border bg-card/50 shadow-lg relative hover-scale">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
            <CardHeader className="border-b bg-card/60 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-primary" />
                    Global Trade Routes
                  </CardTitle>
                  <CardDescription>
                    Real-time maritime shipping with risk overlay
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary">Live Data</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[500px] w-full">
                <GlobeVisualization height={500} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 border shadow-lg relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-400 to-red-500 rounded-l-md"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-xl">
                    <Bell className="h-5 w-5 mr-2 text-orange-500" />
                    Live Alerts
                  </CardTitle>
                  <CardDescription>Real-time disruption notifications</CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={handleMarkAllRead} className="text-xs">
                  Mark all read
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
                {alertsData.map((alert, index) => (
                  <div 
                    key={index} 
                    className="cursor-pointer transition-all hover:translate-x-1 hover:shadow-md" 
                    onClick={() => handleAlertClick(alert.title)}
                  >
                    <AlertCard 
                      title={alert.title}
                      region={alert.region}
                      severity={alert.severity as "low" | "medium" | "high"}
                      time={alert.time}
                      description={alert.description}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs 
          defaultValue="risk-overview" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="bg-card rounded-xl border shadow-lg p-6"
        >
          <div className="flex justify-between items-center pb-4 border-b">
            <TabsList className="grid grid-cols-2 w-[400px] bg-muted/50">
              <TabsTrigger value="risk-overview" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <ShieldAlert className="mr-2 h-4 w-4" />
                Risk Analysis
              </TabsTrigger>
              <TabsTrigger value="ai-predictions" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                <div className="flex items-center">
                  <Brain className="mr-2 h-4 w-4" />
                  AI Risk Predictions
                  <Badge className="ml-2 bg-primary/20 text-primary" variant="outline">AI</Badge>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="na">North America</SelectItem>
                <SelectItem value="eu">Europe</SelectItem>
                <SelectItem value="asia">Asia Pacific</SelectItem>
                <SelectItem value="mena">Middle East & Africa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <TabsContent value="risk-overview" className="pt-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/50 border shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <ShieldAlert className="h-5 w-5 mr-2 text-primary" />
                        Overall Risk Score
                      </CardTitle>
                      <CardDescription>
                        Composite risk assessment across all categories
                      </CardDescription>
                    </div>
                    <div className={cn(
                      "text-2xl font-bold px-4 py-2 rounded-md",
                      currentTotalRiskScore >= 70 ? "bg-risk-high/10 text-risk-high" :
                      currentTotalRiskScore >= 40 ? "bg-risk-medium/10 text-risk-medium" :
                      "bg-risk-low/10 text-risk-low"
                    )}>
                      {currentTotalRiskScore}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Anchor className="h-4 w-4 text-primary" />
                          <span className="font-medium">Port & Logistics Risk</span>
                          <Badge variant="outline" className="text-xs bg-muted/50">
                            Weight: {totalPortWeight}%
                          </Badge>
                        </span>
                        <span className={cn(
                          "font-medium px-2 py-0.5 rounded",
                          portRiskScore >= 70 ? "bg-risk-high/10 text-risk-high" :
                          portRiskScore >= 40 ? "bg-risk-medium/10 text-risk-medium" :
                          "bg-risk-low/10 text-risk-low"
                        )}>
                          {portRiskScore}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all",
                            portRiskScore >= 70 ? "bg-risk-high" :
                            portRiskScore >= 40 ? "bg-risk-medium" :
                            "bg-risk-low"
                          )}
                          style={{ width: `${portRiskScore}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <span className="font-medium">Economic Risk</span>
                          <Badge variant="outline" className="text-xs bg-muted/50">
                            Weight: {totalEconomicWeight}%
                          </Badge>
                        </span>
                        <span className={cn(
                          "font-medium px-2 py-0.5 rounded",
                          economicRiskScore >= 70 ? "bg-risk-high/10 text-risk-high" :
                          economicRiskScore >= 40 ? "bg-risk-medium/10 text-risk-medium" :
                          "bg-risk-low/10 text-risk-low"
                        )}>
                          {economicRiskScore}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all",
                            economicRiskScore >= 70 ? "bg-risk-high" :
                            economicRiskScore >= 40 ? "bg-risk-medium" :
                            "bg-risk-low"
                          )}
                          style={{ width: `${economicRiskScore}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Flag className="h-4 w-4 text-primary" />
                          <span className="font-medium">Geopolitical Risk</span>
                          <Badge variant="outline" className="text-xs bg-muted/50">
                            Weight: {totalGeopoliticalWeight}%
                          </Badge>
                        </span>
                        <span className={cn(
                          "font-medium px-2 py-0.5 rounded",
                          geopoliticalRiskScore >= 70 ? "bg-risk-high/10 text-risk-high" :
                          geopoliticalRiskScore >= 40 ? "bg-risk-medium/10 text-risk-medium" :
                          "bg-risk-low/10 text-risk-low"
                        )}>
                          {geopoliticalRiskScore}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all",
                            geopoliticalRiskScore >= 70 ? "bg-risk-high" :
                            geopoliticalRiskScore >= 40 ? "bg-risk-medium" :
                            "bg-risk-low"
                          )}
                          style={{ width: `${geopoliticalRiskScore}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <CloudRain className="h-4 w-4 text-primary" />
                          <span className="font-medium">Weather Risk</span>
                          <Badge variant="outline" className="text-xs bg-muted/50">
                            Weight: {totalWeatherWeight}%
                          </Badge>
                        </span>
                        <span className={cn(
                          "font-medium px-2 py-0.5 rounded",
                          weatherRiskScore >= 70 ? "bg-risk-high/10 text-risk-high" :
                          weatherRiskScore >= 40 ? "bg-risk-medium/10 text-risk-medium" :
                          "bg-risk-low/10 text-risk-low"
                        )}>
                          {weatherRiskScore}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all",
                            weatherRiskScore >= 70 ? "bg-risk-high" :
                            weatherRiskScore >= 40 ? "bg-risk-medium" :
                            "bg-risk-low"
                          )}
                          style={{ width: `${weatherRiskScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card to-background/80 border shadow-sm overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold flex items-center">
                        <Brain className="h-5 w-5 mr-2 text-primary" /> 
                        AI Risk Prediction
                      </CardTitle>
                      <CardDescription>
                        3-month risk forecast for your supply chain
                      </CardDescription>
                    </div>
                    <Badge className="bg-primary/20 text-primary" variant="outline">AI Powered</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium">Risk Trajectory</h4>
                      <div className="flex items-center">
                        {riskTrend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-risk-high mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-risk-low mr-1" />
                        )}
                        <span className={cn(
                          "px-2 py-0.5 rounded text-sm font-medium",
                          riskTrend === "up" ? "bg-risk-high/10 text-risk-high" : "bg-risk-low/10 text-risk-low"
                        )}>
                          {riskTrend === "up" ? "+" : "-"}{riskDifference} points
                        </span>
                      </div>
                    </div>
                    <div className="h-[260px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={aiPredictionsData}
                          margin={{
                            top: 5,
                            right: 10,
                            left: 0,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis 
                            dataKey="month" 
                            tick={{fontSize: 12}}
                            tickLine={false}
                            axisLine={{stroke: '#eaeaea', strokeWidth: 1}}
                          />
                          <YAxis 
                            domain={[0, 100]} 
                            tick={{fontSize: 12}}
                            tickLine={false}
                            axisLine={{stroke: '#eaeaea', strokeWidth: 1}}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              border: '1px solid #eaeaea'
                            }}
                            formatter={(value) => [`${value}%`, '']}
                            labelFormatter={(label) => `Forecast: ${label}`}
                          />
                          <defs>
                            <linearGradient id="overallGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <Area 
                            type="monotone" 
                            dataKey="overall" 
                            stroke="#9b87f5" 
                            strokeWidth={3}
                            fillOpacity={0.9}
                            fill="url(#overallGradient)" 
                            name="Overall Risk"
                            activeDot={{r: 6}}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-6">
              <Card className="bg-card/50 border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <BarChartIcon className="h-5 w-5 mr-2 text-primary" />
                    Risk Trend Analysis
                  </CardTitle>
                  <CardDescription>
                    8-month trend of risk factors across trade routes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={riskTrendData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => [`${value}%`, '']} />
                        <Legend />
                        <defs>
                          <linearGradient id="geopoliticalColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f87171" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f87171" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="economicColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#facc15" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#facc15" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="weatherColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#4ade80" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="portColor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <Area 
                          type="monotone" 
                          dataKey="geopolitical" 
                          stroke="#f87171" 
                          fillOpacity={1}
                          fill="url(#geopoliticalColor)" 
                          name="Geopolitical Risk"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="economic" 
                          stroke="#facc15" 
                          fillOpacity={1}
                          fill="url(#economicColor)" 
                          name="Economic Risk"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="weather" 
                          stroke="#4ade80" 
                          fillOpacity={1}
                          fill="url(#weatherColor)" 
                          name="Weather Risk"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="port" 
                          stroke="#60a5fa" 
                          fillOpacity={1}
                          fill="url(#portColor)" 
                          name="Port Risk"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="ai-predictions" className="pt-6 animate-fade-in">
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-gradient-to-br from-background to-primary/5 border shadow-sm overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <Brain className="h-5 w-5 mr-2 text-primary" /> 
                        AI Risk Prediction Engine
                        <Badge className="ml-2 bg-primary/20 text-primary" variant="outline">AI Powered</Badge>
                      </CardTitle>
                      <CardDescription>
                        3-month risk forecast powered by machine learning
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="hover-scale">
                      <Info className="h-4 w-4 mr-2" />
                      How it works
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="bg-card p-6 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-medium flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                        Risk Forecast: Next 3 Months
                      </h4>
                      <div className="flex items-center">
                        {riskTrend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-risk-high mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-risk-low mr-1" />
                        )}
                        <span className={cn(
                          "px-2 py-0.5 rounded text-sm font-medium",
                          riskTrend === "up" ? "bg-risk-high/10 text-risk-high" : "bg-risk-low/10 text-risk-low"
                        )}>
                          {riskTrend === "up" ? "+" : "-"}{riskDifference} points
                        </span>
                      </div>
                    </div>
                    <div className="h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={aiPredictionsData}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                          <XAxis 
                            dataKey="month" 
                            tick={{fontSize: 13}}
                          />
                          <YAxis 
                            domain={[0, 100]} 
                            tickFormatter={(value) => `${value}%`}
                          />
                          <Tooltip 
                            formatter={(value) => [`${value}%`, '']}
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              borderRadius: '8px',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              border: '1px solid #eaeaea'
                            }}
                          />
                          <Legend />
                          <defs>
                            <linearGradient id="overallColor" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#9b87f5" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="geopoliticalColorAI" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f87171" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#f87171" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="economicColorAI" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#facc15" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#facc15" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="weatherColorAI" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#4ade80" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#4ade80" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="portColorAI" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <Area 
                            type="monotone" 
                            dataKey="overall" 
                            stroke="#9b87f5" 
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#overallColor)" 
                            name="Overall Risk"
                            activeDot={{r: 8}}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="geopolitical" 
                            stroke="#f87171" 
                            fillOpacity={0.5}
                            fill="url(#geopoliticalColorAI)" 
                            name="Geopolitical"
                            activeDot={{r: 5}}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="economic" 
                            stroke="#facc15" 
                            fillOpacity={0.5}
                            fill="url(#economicColorAI)" 
                            name="Economic"
                            activeDot={{r: 5}}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="weather" 
                            stroke="#4ade80" 
                            fillOpacity={0.5}
                            fill="url(#weatherColorAI)" 
                            name="Weather"
                            activeDot={{r: 5}}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="port" 
                            stroke="#60a5fa" 
                            fillOpacity={0.5}
                            fill="url(#portColorAI)" 
                            name="Port"
                            activeDot={{r: 5}}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
