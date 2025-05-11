"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, BarChart2, Globe, Shield, Zap } from "lucide-react";

export function Agent() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("report");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      toast.warning("Please enter a risk analysis query", {
        closeButton: true,
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      // Parse the response
      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // Check for error conditions
      if (!response.ok) {
        const errorMessage = typeof data === 'object' && data.error 
          ? data.error 
          : `Error: ${response.status}`;
        throw new Error(errorMessage);
      }

      setResult(data);
      toast.success("Risk analysis completed", {
        closeButton: true,
        duration: 3000,
      });
    } catch (error) {
      console.error("Error processing risk analysis:", error);
      toast.error(error.message || "Failed to complete risk analysis", {
        closeButton: true,
        duration: Infinity,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderRiskCategory = (category) => {
    const colors = {
      Low: "bg-green-500",
      Medium: "bg-yellow-500",
      High: "bg-orange-500",
      Critical: "bg-red-500",
    };

    return (
      <span className={`px-2 py-1 rounded-md text-white font-medium ${colors[category] || "bg-gray-500"}`}>
        {category}
      </span>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Shield className="h-6 w-6" />
            Lockheed Martin Risk Analysis Tool
          </CardTitle>
          <CardDescription>
            Calculate comprehensive risk scores based on geopolitical and environmental parameters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Describe your project and location for risk analysis. Example: Analyze risks for a new aerospace manufacturing facility in Taiwan over the next 5 years."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[120px] bg-background"
              disabled={loading}
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? "Analyzing Risks..." : "Generate Risk Assessment"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {loading && (
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Analyzing risk factors...</span>
                <span className="text-sm">Please wait</span>
              </div>
              <Progress value={loading ? 80 : 0} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5" />
              Risk Assessment Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="report" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="report">Full Report</TabsTrigger>
                <TabsTrigger value="scores">Risk Scores</TabsTrigger>
              </TabsList>
              
              <TabsContent value="report" className="space-y-4">
                <div className="whitespace-pre-wrap">
                  {result.report}
                </div>
              </TabsContent>
              
              <TabsContent value="scores" className="space-y-6">
                {result.riskScores && (
                  <>
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Overall Risk Category:</h3>
                      {renderRiskCategory(result.riskScores.riskCategory)}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="flex items-center gap-1">
                            <Globe className="h-4 w-4" /> Geopolitical Risk
                          </span>
                          <span>{result.riskScores.geopoliticalRiskScore}/50</span>
                        </div>
                        <Progress 
                          value={(result.riskScores.geopoliticalRiskScore / 50) * 100} 
                          className="h-2 bg-muted" 
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="flex items-center gap-1">
                            <Zap className="h-4 w-4" /> Environmental Risk
                          </span>
                          <span>{result.riskScores.environmentalRiskScore}/40</span>
                        </div>
                        <Progress 
                          value={(result.riskScores.environmentalRiskScore / 40) * 100} 
                          className="h-2 bg-muted" 
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" /> Supply Chain Risk
                          </span>
                          <span>{result.riskScores.supplyChainRiskScore}/40</span>
                        </div>
                        <Progress 
                          value={(result.riskScores.supplyChainRiskScore / 40) * 100} 
                          className="h-2 bg-muted" 
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Total Risk Score</span>
                          <span className="font-medium">{result.riskScores.totalRiskScore}/130</span>
                        </div>
                        <Progress 
                          value={(result.riskScores.totalRiskScore / 130) * 100} 
                          className="h-3 bg-muted" 
                        />
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Highest Risk Factors</h3>
                      <div className="space-y-3">
                        {result.riskScores.highestRiskFactors.map((factor, index) => (
                          <div key={index} className="p-3 bg-secondary rounded-lg">
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{factor.factor}</span>
                              <span className="font-medium">Score: {factor.score}/10</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{factor.rationale}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Recommended Mitigation Strategies</h3>
                      <ul className="space-y-2 list-disc pl-5">
                        {result.riskScores.mitigationStrategies.map((strategy, index) => (
                          <li key={index}>{strategy}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-4">
            <Button 
              variant="outline" 
              onClick={() => setActiveTab(activeTab === "report" ? "scores" : "report")}
            >
              View {activeTab === "report" ? "Risk Scores" : "Full Report"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}