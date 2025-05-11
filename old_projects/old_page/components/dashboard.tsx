"use client";

import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { 
  Truck, DollarSign, AlertTriangle, Plus, 
  Flag, CloudRain, Ship, Currency, 
  ArrowRight, Bell 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ShipmentDetails } from "@/types";
import { ShipmentMap } from "@/components/shipment-map";
import { RiskTrendChart } from "@/components/risk-trend-chart";

// Extracted components for better code organization and performance
const RiskIcon = memo(({ iconType }: { iconType: string }) => {
  switch (iconType) {
    case "flag":
      return <Flag className="h-5 w-5 text-red-500" />;
    case "cloud-rain":
      return <CloudRain className="h-5 w-5 text-blue-500" />;
    case "ship":
      return <Ship className="h-5 w-5 text-amber-500" />;
    case "dollar-sign":
      return <Currency className="h-5 w-5 text-green-500" />;
    default:
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
  }
});

const AlertIcon = memo(({ severity }: { severity: string }) => {
  switch (severity) {
    case "high":
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case "medium":
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    default:
      return <Bell className="h-5 w-5 text-blue-500" />;
  }
});

// Risk score badge component
const RiskBadge = memo(({ score }: { score: number }) => {
  const badgeClass = useMemo(() => {
    if (score < 30) return "bg-green-100 text-green-800";
    if (score < 60) return "bg-amber-100 text-amber-800";
    return "bg-red-100 text-red-800";
  }, [score]);

  return (
    <span className={`text-sm font-medium px-3 py-1 rounded-full ${badgeClass}`}>
      {score}/100
    </span>
  );
});

// Alert item component
const AlertItem = memo(({ alert }: { alert: { title: string; description: string; severity: string } }) => (
  <div className="flex items-start">
    <div className="mr-2 mt-0.5">
      <AlertIcon severity={alert.severity} />
    </div>
    <div>
      <h4 className="font-medium text-gray-800">{alert.title}</h4>
      <p className="text-sm text-gray-600">{alert.description}</p>
    </div>
  </div>
));

// Risk item component
const RiskItem = memo(({ risk }: { risk: { description: string; icon: string } }) => (
  <div className="flex items-start">
    <div className="mr-3 mt-0.5">
      <RiskIcon iconType={risk.icon} />
    </div>
    <p className="text-sm text-gray-700">{risk.description}</p>
  </div>
));

interface DashboardProps {
  shipmentDetails: ShipmentDetails;
  showAlternativeRoute: boolean;
  onAddAnotherShipment: () => void;
}

export function Dashboard({ 
  shipmentDetails, 
  showAlternativeRoute, 
  onAddAnotherShipment 
}: DashboardProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Calculate once and memoize
  const daysSaved = useMemo(
    () => shipmentDetails.estimatedDelivery - shipmentDetails.alternativeRoute.estimatedDelivery,
    [shipmentDetails.estimatedDelivery, shipmentDetails.alternativeRoute.estimatedDelivery]
  );

  useEffect(() => {
    // Use requestAnimationFrame for smoother animations
    const animationId = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Memoize the handleAddAnotherShipment callback
  const handleAddAnotherShipment = useCallback(() => {
    onAddAnotherShipment();
  }, [onAddAnotherShipment]);

  return (
    <div className={`space-y-4 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipment Dashboard</h2>

        {/* Map with Globe/Map view toggle */}
        <div className="mb-6 animate-fade-in" style={{ animationDelay: "100ms", position: 'relative' }}>
          <h3 className="text-base font-medium mb-2">Route Visualization</h3>
          <div className="h-[400px] rounded-lg overflow-hidden">
            <ShipmentMap
              origin={shipmentDetails.origin}
              destination={shipmentDetails.destination}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Top metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Delivery Time Card */}
          <Card
            className="shadow-sm hover:shadow-md transition-shadow animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 flex items-center">
                <Truck className="h-4 w-4 mr-2 text-blue-600" />
                Estimated Delivery Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{shipmentDetails.estimatedDelivery} days</div>
              <p className="text-sm text-gray-500 mt-1">
                From {shipmentDetails.origin} to {shipmentDetails.destination}
              </p>
            </CardContent>
          </Card>

          {/* Tariff Cost Card */}
          <Card
            className="shadow-sm hover:shadow-md transition-shadow animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500 flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                Tariff Cost Estimate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">${shipmentDetails.tariffCost.toLocaleString()}</div>
              <p className="text-sm text-gray-500 mt-1">
                Based on {shipmentDetails.productType} value: ${shipmentDetails.value}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Risk assessment section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-3 animate-fade-in" style={{ animationDelay: "400ms" }}>
            {/* Risk Assessment Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-medium">Overall Risk Score</span>
                  <RiskBadge score={shipmentDetails.riskScore} />
                </div>
                <div className="space-y-3">
                  {shipmentDetails.risks.map((risk, index) => (
                    <RiskItem key={index} risk={risk} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Live Alerts Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 flex items-center">
                  <Bell className="h-4 w-4 mr-2 text-amber-500" />
                  Live Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {shipmentDetails.alerts.map((alert, index) => (
                  <AlertItem key={index} alert={alert} />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Risk forecast & alternative route */}
          <div className="space-y-3 animate-fade-in" style={{ animationDelay: "500ms" }}>
            {/* Risk Forecast Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500">Risk Forecast (3 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <RiskTrendChart data={shipmentDetails.riskTrend} />
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Trend: <span className="text-red-500 font-medium">Rising Risk</span>
                </p>
              </CardContent>
            </Card>

            {/* Alternative Route Card (conditional) */}
            {showAlternativeRoute && (
              <Card className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500 flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2 text-blue-600" />
                    Recommended Reroute
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium text-gray-800 mb-2">{shipmentDetails.alternativeRoute.port}</h4>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-500">New Delivery</p>
                      <p className="font-bold text-gray-900">
                        {shipmentDetails.alternativeRoute.estimatedDelivery} days
                      </p>
                    </div>
                    <div className="bg-green-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-500">Days Saved</p>
                      <p className="font-bold text-green-600">{daysSaved} days</p>
                    </div>
                    <div className="bg-amber-50 p-2 rounded-lg">
                      <p className="text-xs text-gray-500">Risk Score</p>
                      <p className="font-bold text-amber-600">{shipmentDetails.alternativeRoute.riskScore}/100</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Shipment Details Card */}
        <Card
          className="shadow-sm hover:shadow-md transition-shadow mb-6 animate-fade-in"
          style={{ animationDelay: "600ms" }}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Shipment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Origin</p>
                <p className="font-medium">{shipmentDetails.origin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Destination</p>
                <p className="font-medium">{shipmentDetails.destination}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Product Type</p>
                <p className="font-medium">{shipmentDetails.productType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Supplier</p>
                <p className="font-medium">{shipmentDetails.supplier}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Button */}
        <div className="mt-6 flex justify-center animate-fade-in" style={{ animationDelay: "700ms" }}>
          <Button
            onClick={handleAddAnotherShipment}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Shipment
          </Button>
        </div>
      </div>
    </div>
  );
}
