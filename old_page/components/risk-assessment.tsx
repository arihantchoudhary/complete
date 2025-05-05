"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle, Clock } from "lucide-react";

export function RiskAssessment() {
  const risks = [
    { 
      id: 1, 
      type: "Political",
      level: "High", 
      impact: "Trade restrictions may delay goods", 
      icon: AlertCircle, 
      color: "text-red-500 bg-red-50" 
    },
    { 
      id: 2, 
      type: "Weather",
      level: "Medium", 
      impact: "Typhoon season may affect transit time", 
      icon: AlertTriangle, 
      color: "text-amber-500 bg-amber-50" 
    },
    { 
      id: 3, 
      type: "Logistical",
      level: "Low", 
      impact: "Port congestion slightly above average", 
      icon: Clock, 
      color: "text-blue-500 bg-blue-50" 
    },
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-xl">Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {risks.map((risk) => (
            <div 
              key={risk.id} 
              className="flex items-start p-3 rounded-lg border gap-4"
            >
              <div className={`p-2 rounded-full ${risk.color}`}>
                <risk.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">{risk.type} Risk</h3>
                  <Badge 
                    variant={risk.level === "High" 
                      ? "destructive" 
                      : risk.level === "Medium" 
                        ? "default" 
                        : "secondary"}
                    className="ml-2"
                  >
                    {risk.level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{risk.impact}</p>
              </div>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t">
            <h3 className="font-medium mb-2">Overall Risk Level</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-amber-500 h-2.5 rounded-full" 
                style={{ width: '65%' }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>Low</span>
              <span className="font-medium">Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RiskAssessment;
