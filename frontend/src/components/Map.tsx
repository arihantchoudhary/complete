
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl, { Map as MapboxMap } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Default to null, will be set by user input
let mapboxToken: string | null = null;

interface MapProps {
  startLocation: string;
  endLocation: string;
  route: any | null;
  riskScore: number | null;
  isAnalyzing: boolean;
}

export const Map: React.FC<MapProps> = ({ 
  startLocation, 
  endLocation,
  route,
  riskScore,
  isAnalyzing
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<MapboxMap | null>(null);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);
  const [token, setToken] = useState<string>('');
  const [isMapReady, setIsMapReady] = useState<boolean>(false);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current) return;
    
    // If no token is set, don't initialize the map
    if (!mapboxToken) {
      setMapError('Please enter your Mapbox token to load the map');
      return;
    }
    
    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [0, 30],
        zoom: 1.5,
        projection: 'globe'
      });
      
      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );
      
      // Set up event listeners for map loading
      map.current.on('style.load', () => {
        if (map.current) {
          // Add atmosphere effect
          map.current.setFog({
            color: 'rgb(255, 255, 255)',
            'high-color': 'rgb(200, 200, 225)',
            'horizon-blend': 0.2,
          });
          
          setIsMapReady(true);
          setMapError(null);
        }
      });
      
      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setMapError(`Map error: ${e.error?.message || 'Unknown error'}`);
      });
      
      // Clean up on unmount
      return () => {
        markers.forEach(marker => marker.remove());
        map.current?.remove();
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError(`Failed to initialize map: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapboxToken]);
  
  // Update map when route changes
  useEffect(() => {
    if (!map.current || !route || !isMapReady) return;
    
    try {
      // Clear old markers
      markers.forEach(marker => marker.remove());
      const newMarkers: mapboxgl.Marker[] = [];
      
      // Add start marker
      const startMarker = new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat(route.startCoords)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(`Start: ${startLocation}`))
        .addTo(map.current);
      newMarkers.push(startMarker);
      
      // Add end marker
      const endMarker = new mapboxgl.Marker({ color: '#ef4444' })
        .setLngLat(route.endCoords)
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(`End: ${endLocation}`))
        .addTo(map.current);
      newMarkers.push(endMarker);
      
      setMarkers(newMarkers);
      
      // Draw route line
      const routeId = 'route';
      
      // Check if the map is fully loaded and the style is ready
      if (map.current.isStyleLoaded()) {
        // Remove previous route if it exists
        if (map.current.getSource(routeId)) {
          map.current.removeLayer(routeId);
          map.current.removeSource(routeId);
        }
        
        // Determine line color based on risk score
        let routeColor = '#4ade80'; // Default green (low risk)
        if (riskScore !== null) {
          if (riskScore > 75) routeColor = '#ef4444'; // red
          else if (riskScore > 50) routeColor = '#f97316'; // orange
          else if (riskScore > 25) routeColor = '#facc15'; // yellow
        }
        
        // Add the route line source and layer
        map.current.addSource(routeId, {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [route.startCoords, route.endCoords]
            }
          }
        });
        
        map.current.addLayer({
          id: routeId,
          type: 'line',
          source: routeId,
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': routeColor,
            'line-width': 4,
            'line-opacity': 0.8
          }
        });
        
        // Fit map to show all markers
        const bounds = new mapboxgl.LngLatBounds()
          .extend(route.startCoords)
          .extend(route.endCoords);
        
        map.current.fitBounds(bounds, {
          padding: 100,
          duration: 1000
        });
      } else {
        // If style is not loaded yet, wait for it to load
        map.current.once('style.load', () => {
          // This will trigger the useEffect again when the style is loaded
          setIsMapReady(true);
        });
      }
    } catch (error) {
      console.error('Error updating map:', error);
      setMapError(`Failed to update map: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, riskScore, isMapReady]);

  // Function to set the Mapbox token
  const handleSetToken = () => {
    if (token.trim()) {
      mapboxToken = token.trim();
      localStorage.setItem('mapbox_token', mapboxToken);
      setMapError(null);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    } else {
      setMapError('Please enter a valid Mapbox token');
    }
  };

  // Check for saved token on component mount
  useEffect(() => {
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setToken(savedToken);
      mapboxToken = savedToken;
    }
  }, []);
  
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      {!mapboxToken ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 dark:bg-gray-800/95 z-20 p-6 rounded-lg">
          <div className="max-w-md w-full space-y-4">
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Map Token Required</AlertTitle>
              <AlertDescription>
                Please enter your Mapbox public token to display the map.
                Get one for free at <a href="https://mapbox.com/" target="_blank" rel="noreferrer" className="underline">Mapbox.com</a>
              </AlertDescription>
            </Alert>
            <div className="flex space-x-2">
              <Input 
                type="text" 
                value={token} 
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter your Mapbox token"
                className="flex-1"
              />
              <Button onClick={handleSetToken}>Set Token</Button>
            </div>
          </div>
        </div>
      ) : null}
      
      {mapError ? (
        <div className="absolute top-4 left-4 right-4 z-30">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Map Error</AlertTitle>
            <AlertDescription>{mapError}</AlertDescription>
          </Alert>
        </div>
      ) : null}
      
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Loading overlay */}
      {isAnalyzing ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10 rounded-lg">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg animate-pulse-subtle">
            <div className="flex flex-col items-center">
              <div className="mb-3 text-blue-500">
                <svg className="h-12 w-12 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-1">Analyzing Route</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Calculating optimal path and risk factors...
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
