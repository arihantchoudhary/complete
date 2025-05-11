"use client";

import * as React from 'react';
import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
// Import mapboxgl and necessary types that are directly exported
import mapboxgl, { Map, Marker, LngLatBoundsLike, MarkerOptions, LinePaint, FillPaint } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { cn } from '@/lib/utils';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Ensure Mapbox access token is set (consider moving to environment variables)
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "pk.eyJ1IjoiYXJpaGFudGNob3VkaGFyeSIsImEiOiJjbThvNmZtdWgwOG5iMmlwemJpcnRudjd3In0.JmygHU07dAryo96ZLH3uAA";

interface InteractiveMapProps extends React.HTMLAttributes<HTMLDivElement> {
  initialCenter?: [number, number];
  initialZoom?: number;
  initialProjection?: 'mercator' | 'globe';
  mapStyle?: string;
  height?: string | number;
}

// Define GeoJSON types used internally (optional but good practice)
type Point = [number, number];
type LineStringCoords = Point[];
type PolygonCoords = Point[][];

// Helper function moved outside the component
const createGeoJSONCircle = (center: Point, radiusInKm: number, points = 64): GeoJSON.Feature<GeoJSON.Polygon> => {
    const coords = { latitude: center[1], longitude: center[0] };
    const km = radiusInKm;
    const ret: Point[] = [];
    const distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
    const distanceY = km / 110.574;

    let theta, x, y;
    for (let i = 0; i < points; i++) {
        theta = (i / points) * (2 * Math.PI);
        x = distanceX * Math.cos(theta);
        y = distanceY * Math.sin(theta);
        ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]); // Close the polygon

    return {
        type: "Feature",
        properties: {}, // Added properties field
        geometry: { type: "Polygon", coordinates: [ret] }
    };
};


export interface InteractiveMapRef {
  addMarker: (lngLat: Point, options?: MarkerOptions, popupHtml?: string) => Marker | null;
  removeMarker: (marker: Marker) => void;
  addRoute: (id: string, coordinates: LineStringCoords, paintProps?: LinePaint) => void;
  removeRoute: (id: string) => void;
  addRiskZone: (id: string, center: Point, radiusKm: number, paintProps?: FillPaint) => void;
  removeRiskZone: (id: string) => void;
  // Use generic object for options to bypass specific type issues
  flyTo: (options: object) => void;
  fitBounds: (bounds: LngLatBoundsLike, options?: object) => void;
  getMapInstance: () => Map | null;
  toggleProjection: () => void; // Added method
  clearAllRoutes: () => void; // Added method
  clearAllMarkers: () => void; // Added method
}

const InteractiveMap = forwardRef<InteractiveMapRef, InteractiveMapProps>(({
  initialCenter = [0, 20],
  initialZoom = 1.5,
  initialProjection = 'globe', // Keep track of initial for reset
  mapStyle = "mapbox://styles/mapbox/dark-v11",
  height = "100%",
  className,
  ...props
}, ref) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);
  const [currentProjection, setCurrentProjection] = useState(initialProjection); // State for current projection
  const markersRef = useRef<Marker[]>([]);
  const routeIdsRef = useRef<string[]>([]); // Keep track of added route IDs
  const riskZoneIdsRef = useRef<string[]>([]); // Keep track of added risk zone IDs

  // --- Map Initialization Effect ---
  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return; // Initialize map only once

    if (!mapboxgl.accessToken) {
      setError("Mapbox access token is not set.");
      setLoading(false);
      return;
    }

    try {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: mapStyle,
        center: initialCenter,
        zoom: initialZoom,
        projection: { name: initialProjection },
        attributionControl: false, // Optional: hide default attribution
      });

      mapRef.current.on("load", () => {
        setLoading(false);
        setIsStyleLoaded(true);
        // Optional: Add initial configurations like fog for globe view
        if (initialProjection === 'globe' && mapRef.current) {
           mapRef.current.setFog({}); // Use default fog settings
        }
      });

      mapRef.current.on("style.load", () => {
         setIsStyleLoaded(true);
         if (initialProjection === 'globe' && mapRef.current) {
           mapRef.current.setFog({});
         }
      });

      mapRef.current.on("error", (e) => {
        console.error("Mapbox error:", e);
        setError("Failed to load map resources. Check console and token.");
        setLoading(false);
      });

    } catch (err) {
      console.error("Failed to initialize map:", err);
      setError("Map initialization failed. Check console.");
      setLoading(false);
    }

    // Cleanup on unmount
    // Cleanup function remains the same
    return () => {
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
        routeIdsRef.current = [];
        riskZoneIdsRef.current = [];
        mapRef.current?.remove();
        mapRef.current = null;
        setIsStyleLoaded(false);
    };
  // Removed initialProjection from dependencies to prevent re-init on toggle
  }, [initialCenter, initialZoom, mapStyle]);

  // --- Exposed Map Interaction Methods via Ref ---
  useImperativeHandle(ref, () => ({
    addMarker: (lngLat, options, popupHtml) => {
      if (!mapRef.current) return null;
      const marker = new mapboxgl.Marker(options).setLngLat(lngLat);
      if (popupHtml) {
        marker.setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(popupHtml));
      }
      marker.addTo(mapRef.current);
      markersRef.current.push(marker); // Track marker
      return marker;
    },
    removeMarker: (marker) => {
       marker.remove();
       markersRef.current = markersRef.current.filter(m => m !== marker);
    },
    clearAllMarkers: () => {
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
    },
    addRoute: (id, coordinates, paintProps) => {
      const map = mapRef.current;
      if (!map || !isStyleLoaded) return;
      // Remove previous if exists
      if (map.getLayer(id)) map.removeLayer(id);
      if (map.getSource(id)) map.removeSource(id);

      map.addSource(id, {
        type: "geojson",
        data: {
            type: "Feature",
            properties: {}, // Added required properties field
            geometry: { type: "LineString", coordinates }
        },
      });
      map.addLayer({
        id: id,
        type: "line",
        source: id,
        layout: { "line-join": "round", "line-cap": "round" },
        paint: {
          "line-color": "#3b82f6", // Default blue
          "line-width": 3,
          "line-opacity": 0.8,
          ...paintProps, // Allow overriding paint properties
        },
      });
      routeIdsRef.current.push(id); // Track added route ID
    },
    removeRoute: (id) => {
      const map = mapRef.current;
      if (!map) return;
      if (map.getLayer(id)) map.removeLayer(id);
      if (map.getSource(id)) map.removeSource(id);
      routeIdsRef.current = routeIdsRef.current.filter(routeId => routeId !== id);
    },
    clearAllRoutes: () => {
        // Simplify by iterating over a copy and calling removeRoute directly
        const routeIdsToRemove = [...routeIdsRef.current];
        routeIdsToRemove.forEach(id => {
            const map = mapRef.current;
            if (!map) return;
            if (map.getLayer(id)) map.removeLayer(id);
            if (map.getSource(id)) map.removeSource(id);
        });
        routeIdsRef.current = []; // Clear the tracked IDs
    },
    addRiskZone: (id, center, radiusKm, paintProps) => {
        const map = mapRef.current;
        if (!map || !isStyleLoaded) return;
        // Remove previous if exists
        if (map.getLayer(id)) map.removeLayer(id);
        if (map.getSource(id)) map.removeSource(id);

        // Call helper function
        const circleGeoJSON = createGeoJSONCircle(center, radiusKm);

        map.addSource(id, { type: 'geojson', data: circleGeoJSON });
        map.addLayer({
            id: id,
            type: 'fill',
            source: id,
            paint: {
                'fill-color': '#ff0000', // Default red
                'fill-opacity': 0.3,
                ...paintProps,
            },
        });
        riskZoneIdsRef.current.push(id); // Track added risk zone ID
    },
    removeRiskZone: (id) => {
        const map = mapRef.current;
        if (!map) return;
        if (map.getLayer(id)) map.removeLayer(id);
        if (map.getSource(id)) map.removeSource(id);
        riskZoneIdsRef.current = riskZoneIdsRef.current.filter(riskId => riskId !== id);
    },
    // Revert options to object type to avoid persistent TS errors
    flyTo: (options: object) => {
      mapRef.current?.flyTo(options);
    },
    fitBounds: (bounds: LngLatBoundsLike, options?: object) => {
      mapRef.current?.fitBounds(bounds, options);
    },
    getMapInstance: () => mapRef.current,
    toggleProjection: () => {
        const newProjection = currentProjection === 'globe' ? 'mercator' : 'globe';
        setCurrentProjection(newProjection);
        // Re-initialize map with new projection
        // Note: This is a simple re-init; preserving layers/sources would require more complex logic
        setLoading(true);
        setIsStyleLoaded(false);
        markersRef.current.forEach(marker => marker.remove()); // Clear markers before re-init
        markersRef.current = [];
        routeIdsRef.current = []; // Clear tracked IDs
        riskZoneIdsRef.current = [];
        mapRef.current?.remove();
        mapRef.current = null;

        // Trigger re-initialization via useEffect dependency change (or lack thereof)
        // We need a way to force re-render or re-run the effect.
        // A common pattern is to use a key prop on the container, but here we'll re-init manually.
        if (mapContainerRef.current) {
             try {
                const newMap = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    style: mapStyle,
                    center: initialCenter, // Or get current center/zoom from old map if needed
                    zoom: initialZoom,
                    projection: { name: newProjection },
                    attributionControl: false,
                });
                newMap.on("load", () => {
                    setLoading(false);
                    setIsStyleLoaded(true);
                    if (newProjection === 'globe') {
                        newMap.setFog({});
                    }
                    mapRef.current = newMap; // Assign new map instance to ref
                });
                 newMap.on("style.load", () => {
                     setIsStyleLoaded(true);
                     if (newProjection === 'globe') {
                        newMap.setFog({});
                     }
                 });
                newMap.on("error", (e) => { console.error("Mapbox error:", e); setError("Map reload failed."); setLoading(false); });
            } catch (err) { console.error("Failed to re-initialize map:", err); setError("Map re-initialization failed."); setLoading(false); }
        }
    },
  }), [isStyleLoaded, currentProjection, initialCenter, initialZoom, mapStyle]); // Add dependencies that affect re-initialization or methods

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
      {...props}
    >
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50">
          <Skeleton className="w-1/2 h-1/2" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-background/80">
          <Alert variant="destructive" className="w-full max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
});

InteractiveMap.displayName = "InteractiveMap";

export { InteractiveMap };
