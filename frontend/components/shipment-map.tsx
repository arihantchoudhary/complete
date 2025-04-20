"use client"

import * as React from "react"
import { useState, useEffect, useRef } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Globe, Map as MapIcon } from "lucide-react"

// Set mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoiYXJpaGFudGNob3VkaGFyeSIsImEiOiJjbThvNmZtdWgwOG5iMmlwemJpcnRudjd3In0.JmygHU07dAryo96ZLH3uAA"

// Fixed coordinates for key locations
const FIXED_COORDINATES: Record<string, [number, number]> = {
  "Jebel Ali, UAE": [55.0371, 24.9857],
  "Houston, US": [-95.3698, 29.7604],
  "Charleston, US": [-79.9311, 32.7765]
}

// Custom maritime route coordinates
const ROUTE_COORDINATES = [
  [55.0371, 24.9857], // Jebel Ali, UAE
  [56.5, 24.5],       // Persian Gulf
  [58.0, 23.0],       // Arabian Sea
  [50.0, 15.0],       // Red Sea entry
  [40.0, 16.0],       // Red Sea exit
  [32.0, 31.0],       // Mediterranean
  [12.0, 36.0],       // Gibraltar
  [-7.0, 35.0],       // Atlantic Ocean entry
  [-40.0, 30.0],      // Mid-Atlantic
  [-70.0, 28.0],      // Caribbean approach
  [-80.0, 25.0],      // Florida coast
  [-88.0, 27.0],      // Gulf of Mexico
  [-95.3698, 29.7604] // Houston, US
] as [number, number][]

interface ShipmentMapProps extends React.HTMLAttributes<HTMLDivElement> {
  origin?: string
  destination?: string
  height?: string | number
}

const ShipmentMap = React.forwardRef<HTMLDivElement, ShipmentMapProps>(({
  origin = "Jebel Ali, UAE",
  destination = "Houston, US",
  height = 400,
  className,
  ...props
}, ref) => {
  // Component state
  const [viewMode, setViewMode] = useState<"map" | "globe">("map")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Refs for map elements
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])
  
  // Toggle between map and globe views
  const toggleViewMode = () => {
    setViewMode(prev => {
      // Clean up current map before changing view
      if (mapRef.current) {
        markersRef.current.forEach(marker => marker.remove())
        mapRef.current.remove()
        mapRef.current = null
      }
      return prev === "map" ? "globe" : "map"
    })
  }
  
  // Clean up map resources
  const cleanupMap = () => {
    if (mapRef.current) {
      markersRef.current.forEach(marker => marker.remove())
      markersRef.current = []
      mapRef.current.remove()
      mapRef.current = null
    }
  }
  
  // Initialize and setup map
  useEffect(() => {
    // Skip if container ref not available or map already initialized
    if (!mapContainerRef.current || mapRef.current) return
    
    setLoading(true)
    
    try {
      // Create map instance
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: [0, 25],
        zoom: 1.8,
        projection: viewMode === "globe" ? "globe" : "mercator",
        attributionControl: true
      })
      
      // Add navigation controls
      mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right")
      
      // When map loads, add route and markers
      mapRef.current.on("load", () => {
        if (!mapRef.current) return
        
        // Get coordinates
        const originCoords = FIXED_COORDINATES[origin] || FIXED_COORDINATES["Jebel Ali, UAE"]
        const destCoords = FIXED_COORDINATES[destination] || FIXED_COORDINATES["Houston, US"]
        
        // Add route source
        mapRef.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: ROUTE_COORDINATES
            }
          }
        })
        
        // Add route layer
        mapRef.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": "#3b82f6",
            "line-width": 3,
            "line-opacity": 0.8
          }
        })
        
        // Add markers
        const originMarker = new mapboxgl.Marker({ color: "#3b82f6" })
          .setLngLat(originCoords)
          .setPopup(new mapboxgl.Popup().setHTML(`<strong>${origin}</strong>`))
          .addTo(mapRef.current)
        
        const destMarker = new mapboxgl.Marker({ color: "#ef4444" })
          .setLngLat(destCoords)
          .setPopup(new mapboxgl.Popup().setHTML(`<strong>${destination}</strong>`))
          .addTo(mapRef.current)
        
        markersRef.current = [originMarker, destMarker]
        
        // Fit bounds to show route
        const bounds = new mapboxgl.LngLatBounds()
          .extend(originCoords)
          .extend(destCoords)
        
        mapRef.current.fitBounds(bounds, {
          padding: 50,
          duration: 1000
        })
        
        setLoading(false)
      })
      
      // Handle errors
      mapRef.current.on("error", (e) => {
        console.error("Mapbox error:", e)
        setError("Failed to load map resources")
      })
      
    } catch (err) {
      console.error("Failed to initialize map:", err)
      setError("Failed to initialize map")
      setLoading(false)
    }
    
    // Cleanup on unmount
    return () => cleanupMap()
  }, [origin, destination, viewMode])
  
  return (
    <Card 
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
      {...props}
    >
      {/* Map container */}
      <div 
        ref={mapContainerRef}
        className="absolute inset-0 w-full h-full" 
      />
      
      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 z-10 bg-muted/20">
          <Skeleton className="w-full h-full" />
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
          <Alert variant="destructive" className="w-full max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
      
      {/* View toggle button */}
      <div className="absolute top-3 left-3 z-10">
        <Button
          variant="secondary"
          size="sm"
          className="bg-white/90 dark:bg-gray-800/90 shadow-md"
          onClick={toggleViewMode}
        >
          {viewMode === "map" ? (
            <>
              <Globe className="h-4 w-4 mr-2" />
              Globe View
            </>
          ) : (
            <>
              <MapIcon className="h-4 w-4 mr-2" />
              Map View
            </>
          )}
        </Button>
      </div>
    </Card>
  )
})
ShipmentMap.displayName = "ShipmentMap"

export { ShipmentMap }
