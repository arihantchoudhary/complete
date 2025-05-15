import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Plus, Search } from "lucide-react";
import { RouteCard } from "@/components/RouteCard";
import { GlobeVisualization } from "@/components/GlobeVisualization";
import { AddRouteModal } from "@/components/AddRouteModal";
import { calculateRiskFactors, calculateRouteRisk, fetchRiskFactors } from "@/utils/riskCalculations";
import { RouteType } from "@/types/route";
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
  },
  {
    id: 6,
    origin: "Hamburg",
    destination: "Santos",
    etaStatus: "on-time",
    etaDays: 16,
    etaHours: 4,
    riskScore: 55,
    volume: 4500,
    cost: "$3,900/TEU"
  }
];

export default function TradeRoutes() {
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);
  const [routes, setRoutes] = useState(routesData);
  const [riskFactors, setRiskFactors] = useState(calculateRiskFactors(routesData));
  const [searchTerm, setSearchTerm] = useState("");
  const [routeType, setRouteType] = useState("all");
  const [riskMetrics, setRiskMetrics] = useState({ high: 0, medium: 0, low: 0 });

  useEffect(() => {
    const high = routes.filter(route => (route.riskScore || 0) >= 70).length;
    const medium = routes.filter(route => (route.riskScore || 0) >= 40 && (route.riskScore || 0) < 70).length;
    const low = routes.filter(route => (route.riskScore || 0) < 40).length;
    setRiskMetrics({ high, medium, low });
    setRiskFactors(calculateRiskFactors(routes));
    
    const fetchData = async () => {
      const freshRiskFactors = await fetchRiskFactors(routes);
      setRiskFactors(freshRiskFactors);
    };
    
    fetchData().catch(console.error);
  }, [routes]);

  const handleAddRoute = (route: Omit<RouteType, "id">) => {
    const newRoute = {
      ...route,
      id: routes.length + 1,
    };
    const updatedRoutes = [newRoute, ...routes];
    setRoutes(updatedRoutes);
    toast.success(`New route from ${route.origin} to ${route.destination} added successfully!`);
  };

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = searchTerm === "" || 
      route.origin.toLowerCase().includes(searchTerm.toLowerCase()) || 
      route.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = routeType === "all" || routeType === "maritime"; // For demo purposes
    
    return matchesSearch && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Trade Routes</h1>
            <p className="text-muted-foreground">
              Monitor and manage active shipping routes across your network.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" onClick={() => setIsAddRouteOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Route
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="active">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <TabsList>
              <TabsTrigger value="active">Active Routes</TabsTrigger>
              <TabsTrigger value="historical">Historical Data</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search routes..."
                  className="pl-8 w-[200px] md:w-[260px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select 
                defaultValue="all" 
                value={routeType} 
                onValueChange={setRouteType}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Route Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="maritime">Maritime</SelectItem>
                  <SelectItem value="air">Air Freight</SelectItem>
                  <SelectItem value="rail">Rail</SelectItem>
                  <SelectItem value="road">Road</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="active" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 overflow-hidden">
                <CardHeader>
                  <CardTitle>Routes Map</CardTitle>
                  <CardDescription>
                    Interactive visualization of current trade routes
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[500px] w-full">
                    <GlobeVisualization height={500} />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Risk Summary</CardTitle>
                  <CardDescription>Route risk analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>High Risk Routes</span>
                        <span className="font-medium text-risk-high">{riskMetrics.high}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Medium Risk Routes</span>
                        <span className="font-medium text-risk-medium">{riskMetrics.medium}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Low Risk Routes</span>
                        <span className="font-medium text-risk-low">{riskMetrics.low}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <h4 className="text-sm font-medium mb-2">Top Risk Factors</h4>
                      <ul className="space-y-2 text-sm">
                        {riskFactors.map((factor, index) => (
                          <li key={index} className="flex justify-between">
                            <span>{factor.name}</span>
                            <span>{Math.round(factor.score)}%</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route) => (
                  <RouteCard
                    key={route.id}
                    origin={route.origin}
                    destination={route.destination}
                    etaStatus={route.etaStatus as "on-time" | "delayed" | "early"}
                    etaDays={route.etaDays}
                    etaHours={route.etaHours}
                    riskScore={route.riskScore}
                    volume={route.volume}
                    cost={route.cost}
                  />
                ))
              ) : (
                <div className="col-span-full flex items-center justify-center p-12 border rounded-lg bg-muted/20">
                  <p>No routes found matching your criteria.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="historical" className="mt-6">
            <div className="flex items-center justify-center p-16 border rounded-lg bg-muted/20">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Historical Route Data</h3>
                <p className="text-muted-foreground mb-4">View past performance metrics and analytics for completed routes.</p>
                <Button>Load Historical Data</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="scheduled" className="mt-6">
            <div className="flex items-center justify-center p-16 border rounded-lg bg-muted/20">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Scheduled Routes</h3>
                <p className="text-muted-foreground mb-4">View and manage upcoming trade routes that are planned but not yet active.</p>
                <Button>View Schedule</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <AddRouteModal 
          isOpen={isAddRouteOpen}
          onClose={() => setIsAddRouteOpen(false)}
          onAddRoute={handleAddRoute}
        />
      </div>
    </DashboardLayout>
  );
}
