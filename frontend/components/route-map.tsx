"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export function RouteMap() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-xl">Route Visualization</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="aspect-video relative rounded-md overflow-hidden border bg-muted/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full relative">
              {/* This would be replaced with an actual map component */}
              <div className="absolute inset-0 bg-blue-50">
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-primary animate-ping" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-primary z-10"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-4 h-4 rounded-full bg-primary animate-ping" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-primary z-10"></div>
                  <div className="w-1/2 h-0.5 bg-primary absolute top-1/3 left-1/4 transform rotate-12"></div>
                  <div className="absolute top-1/5 left-1/4 mt-4 text-xs font-medium">Bangladesh</div>
                  <div className="absolute bottom-1/3 right-1/4 mb-4 text-xs font-medium">Los Angeles</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Origin:</span>
            <span className="font-medium">Chittagong, Bangladesh</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Destination:</span>
            <span className="font-medium">Los Angeles, USA</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Distance:</span>
            <span className="font-medium">9,472 nautical miles</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Est. Transit Time:</span>
            <span className="font-medium">37 days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RouteMap;
