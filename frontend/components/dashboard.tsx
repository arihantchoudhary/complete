"use client"

import { useState, useEffect } from "react"
import { Truck, DollarSign, AlertTriangle, Plus, Flag, CloudRain, Ship, Currency, ArrowRight, Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ShipmentDetails } from "@/types"
import { ShipmentMap } from "@/components/shipment-map"
import { RiskTrendChart } from "@/components/risk-trend-chart"

interface DashboardProps {
  shipmentDetails: ShipmentDetails
  showAlternativeRoute: boolean
  onAddAnotherShipment: () => void
}

export function Dashboard({ shipmentDetails, showAlternativeRoute, onAddAnotherShipment }: DashboardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Get risk icon based on type
  const getRiskIcon = (iconType: string) => {
    switch (iconType) {
      case "flag":
        return <Flag className="h-5 w-5 text-red-500" />
      case "cloud-rain":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      case "ship":
        return <Ship className="h-5 w-5 text-amber-500" />
      case "dollar-sign":
        return <Currency className="h-5 w-5 text-green-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
    }
  }

  // Get risk color based on score
  const getRiskColor = (score: number) => {
    if (score < 30) return "bg-green-100 text-green-800"
    if (score < 60) return "bg-amber-100 text-amber-800"
    return "bg-red-100 text-red-800"
  }

  // Get alert icon based on severity
  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      default:
        return <Bell className="h-5 w-5 text-blue-500" />
    }
  }

  // Calculate days saved with alternative route
  const daysSaved = shipmentDetails.estimatedDelivery - shipmentDetails.alternativeRoute.estimatedDelivery

  return (
    <div className={`space-y-4 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipment Dashboard</h2>

        <div className="mb-6 animate-fade-in" style={{ animationDelay: "100ms", position: 'relative' }}>
          <ShipmentMap origin={shipmentDetails.origin} destination={shipmentDetails.destination} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-3 animate-fade-in" style={{ animationDelay: "400ms" }}>
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
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${getRiskColor(shipmentDetails.riskScore)}`}
                  >
                    {shipmentDetails.riskScore}/100
                  </span>
                </div>
                <div className="space-y-3">
                  {shipmentDetails.risks.map((risk, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mr-3 mt-0.5">{getRiskIcon(risk.icon)}</div>
                      <p className="text-sm text-gray-700">{risk.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-500 flex items-center">
                  <Bell className="h-4 w-4 mr-2 text-amber-500" />
                  Live Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {shipmentDetails.alerts.map((alert, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-2 mt-0.5">{getAlertIcon(alert.severity)}</div>
                    <div>
                      <h4 className="font-medium text-gray-800">{alert.title}</h4>
                      <p className="text-sm text-gray-600">{alert.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3 animate-fade-in" style={{ animationDelay: "500ms" }}>
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

        <div className="mt-6 flex justify-center animate-fade-in" style={{ animationDelay: "700ms" }}>
          <Button
            onClick={onAddAnotherShipment}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Shipment
          </Button>
        </div>
      </div>
    </div>
  )
}
