"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Map, BarChart3, AlertTriangle } from "lucide-react";

export function SupplyChainFlow() {
  const steps = [
    {
      title: "Document Upload",
      description: "Upload B/L, Packing List, or Commercial Invoice",
      icon: FileText
    },
    {
      title: "Automated Analysis",
      description: "AI extracts key shipment data",
      icon: BarChart3
    },
    {
      title: "Route Visualization",
      description: "View shipment route and key ports",
      icon: Map
    },
    {
      title: "Risk Assessment",
      description: "Get alerts about potential issues",
      icon: AlertTriangle
    }
  ];

  return (
    <div className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <step.icon className="h-8 w-8 text-primary mb-4" />
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{step.description}</p>
              </CardContent>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <div className="w-6 h-0.5 bg-gray-300"></div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SupplyChainFlow;
