import { useState, useEffect } from "react";
import { DataSource, ScrapedData, DataScrapingService } from "@/services/DataScrapingService";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, Database, Globe, Loader2, RefreshCcw, XCircle } from "lucide-react";
import { toast } from "sonner";
import { clearRiskFactorCache } from "@/utils/riskCalculations";

export function DataSourceManager() {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [scrapedData, setScrapedData] = useState<{[key: string]: ScrapedData}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("sources");

  useEffect(() => {
    loadDataSources();
  }, []);

  const loadDataSources = async () => {
    const sources = await DataScrapingService.getDataSources();
    setDataSources(sources);
  };

  const toggleDataSource = (sourceId: string) => {
    setDataSources(prev => prev.map(source => 
      source.id === sourceId ? { ...source, active: !source.active } : source
    ));
  };

  const refreshData = async () => {
    setIsLoading(true);
    
    try {
      const data = await DataScrapingService.scrapeAllActiveSources();
      setScrapedData(data);
      
      clearRiskFactorCache();
      
      toast.success("Data sources refreshed successfully");
      setActiveTab("data");
    } catch (error) {
      console.error("Error refreshing data:", error);
      toast.error("Failed to refresh data sources");
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'economic': return "bg-blue-500/10 text-blue-500";
      case 'geopolitical': return "bg-amber-500/10 text-amber-500";
      case 'weather': return "bg-emerald-500/10 text-emerald-500";
      case 'supply-chain': return "bg-purple-500/10 text-purple-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };
  
  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <div className="flex items-center text-risk-high">↑ Increasing</div>;
      case 'down':
        return <div className="flex items-center text-risk-low">↓ Decreasing</div>;
      case 'stable':
      default:
        return <div className="flex items-center text-gray-500">→ Stable</div>;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" /> Data Sources
            </CardTitle>
            <CardDescription>Configure and refresh risk intelligence data sources</CardDescription>
          </div>
          <Button 
            onClick={refreshData} 
            disabled={isLoading} 
            variant="outline"
            className="flex items-center"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="mr-2 h-4 w-4" />
            )}
            Refresh Data
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="sources">Data Sources</TabsTrigger>
            <TabsTrigger value="data">Latest Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sources" className="space-y-4">
            {dataSources.map(source => (
              <Card key={source.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-base">{source.name}</CardTitle>
                      <CardDescription className="flex items-center text-xs">
                        <Globe className="h-3 w-3 mr-1" /> {source.url}
                      </CardDescription>
                    </div>
                    <Badge className={getTypeColor(source.type)}>
                      {source.type.charAt(0).toUpperCase() + source.type.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className="flex justify-between py-3">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    Last updated: {formatDate(source.lastUpdated)}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm">Active</span>
                    <Switch 
                      checked={source.active} 
                      onCheckedChange={() => toggleDataSource(source.id)} 
                    />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="data">
            <div className="space-y-4">
              {Object.keys(scrapedData).length === 0 ? (
                <div className="text-center p-8">
                  <p className="text-muted-foreground mb-4">No data available. Click "Refresh Data" to fetch the latest information.</p>
                  <Button onClick={refreshData} disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCcw className="mr-2 h-4 w-4" />
                    )}
                    Fetch Data
                  </Button>
                </div>
              ) : (
                Object.values(scrapedData).map((data, idx) => (
                  <Card key={idx} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{data.source}</CardTitle>
                        <Badge variant="outline">
                          {new Date(data.timestamp).toLocaleString()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {data.data.indicators.map((indicator, i) => (
                          <div key={i} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                            <div>
                              <p className="font-medium">{indicator.name}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                {getTrendIcon(indicator.trend)}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold">{indicator.value}</p>
                              <div className="flex items-center text-xs">
                                <span className="mr-1">Confidence:</span>
                                {indicator.confidence >= 75 ? (
                                  <span className="flex items-center text-green-500">
                                    <CheckCircle className="h-3 w-3 mr-1" /> High ({indicator.confidence}%)
                                  </span>
                                ) : indicator.confidence >= 50 ? (
                                  <span className="flex items-center text-amber-500">
                                    Medium ({indicator.confidence}%)
                                  </span>
                                ) : (
                                  <span className="flex items-center text-red-500">
                                    <XCircle className="h-3 w-3 mr-1" /> Low ({indicator.confidence}%)
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
