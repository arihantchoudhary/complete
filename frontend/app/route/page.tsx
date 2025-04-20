"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { ShipmentMap } from "@/components/shipment-map";

export default function RoutePage() {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [showRoute, setShowRoute] = useState(false);

  const handleVisualize = () => {
    if (startPoint && endPoint) {
      setShowRoute(true);
    }
  };

  return (
    <div className="min-h-screen pt-16 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Route Visualization</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="start" className="text-sm font-medium">
                  Start Point
                </label>
                <div className="flex gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <Input
                    id="start"
                    placeholder="Enter start location"
                    value={startPoint}
                    onChange={(e) => setStartPoint(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="end" className="text-sm font-medium">
                  End Point
                </label>
                <div className="flex gap-2">
                  <Navigation className="h-5 w-5 text-muted-foreground" />
                  <Input
                    id="end"
                    placeholder="Enter destination"
                    value={endPoint}
                    onChange={(e) => setEndPoint(e.target.value)}
                  />
                </div>
              </div>
              <Button
                className="w-full"
                onClick={handleVisualize}
                disabled={!startPoint || !endPoint}
              >
                Visualize Route
              </Button>
            </div>
          </Card>
          <Card className="p-6">
            <div className="h-[600px]">
              <ShipmentMap
                showRoute={showRoute}
                startPoint={startPoint}
                endPoint={endPoint}
                className="w-full h-full rounded-lg"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
