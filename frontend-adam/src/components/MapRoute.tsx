
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapRouteProps {
  origin: string;
  destination: string;
}

// Define a more specific type for coordinates
type Coordinates = [number, number];
type CoordinatesMap = {
  [location: string]: Coordinates;
};

export function MapRoute({ origin, destination }: MapRouteProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapInitialized, setMapInitialized] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTokenInput(false);
    initializeMap();
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;
    
    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: [0, 0],
      zoom: 1
    });

    map.current.on('load', () => {
      setMapInitialized(true);
    });
  };

  useEffect(() => {
    if (!map.current || !mapInitialized) return;

    // Get coordinates for origin and destination
    // In a real application, you would use geocoding API
    const coordinates: CoordinatesMap = {
      "Jebel Ali": [55.0684, 25.0657],
      "Houston": [-95.2860, 29.7604],
      "Shanghai": [121.4737, 31.2304],
      "Rotterdam": [4.4777, 51.9244],
      "Singapore": [103.8198, 1.3521],
      "Los Angeles": [-118.1937, 33.7701],
      "Dubai": [55.2708, 25.2048],
      "Mumbai": [72.8333, 18.9667],
      "New York": [-74.0060, 40.7128],
      "Sydney": [151.2093, -33.8688],
      "Santos": [-46.3322, -23.9618],
      "Hamburg": [9.9937, 53.5511]
    };

    // Use default coordinates if the location isn't in our map
    const defaultCoords: Coordinates = [0, 0];
    
    // Safely get coordinates with proper typing
    const originCoords = coordinates[origin] || defaultCoords;
    const destCoords = coordinates[destination] || defaultCoords;
    
    // Draw maritime route
    drawMaritimeRoute(originCoords, destCoords);
    
    // Add markers
    const originMarker = new mapboxgl.Marker({ color: '#22c55e' })
      .setLngLat(originCoords)
      .setPopup(new mapboxgl.Popup().setText(origin))
      .addTo(map.current);

    const destMarker = new mapboxgl.Marker({ color: '#ef4444' })
      .setLngLat(destCoords)
      .setPopup(new mapboxgl.Popup().setText(destination))
      .addTo(map.current);

    // Fit bounds to show both markers
    const bounds = new mapboxgl.LngLatBounds();
    bounds.extend(originCoords);
    bounds.extend(destCoords);
    
    map.current.fitBounds(bounds, {
      padding: 50,
      duration: 1000
    });

    return () => {
      originMarker.remove();
      destMarker.remove();
    };
  }, [origin, destination, mapInitialized]);
  
  const drawMaritimeRoute = (originCoords: Coordinates, destCoords: Coordinates) => {
    if (!map.current) return;
    
    // Maritime route is often not a straight line but follows shipping lanes
    // For a simple approximation, we'll create a curved line for visualization
    // In a real app, you would use maritime routing APIs
    
    // Generate waypoints along a curve for maritime route
    const waypoints = generateMaritimeRouteWaypoints(originCoords, destCoords);
    
    // Add route to map
    if (map.current.getSource('route')) {
      // Update existing source
      (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData({
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: waypoints
        }
      });
    } else {
      // Add new source and layer
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: waypoints
          }
        }
      });
      
      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#0ea5e9',
          'line-width': 3,
          'line-dasharray': [1, 1]
        }
      });
    }
  };
  
  const generateMaritimeRouteWaypoints = (start: Coordinates, end: Coordinates) => {
    // Simple algorithm to generate a curved maritime route
    const points: Coordinates[] = [];
    const numPoints = 50;
    
    // Check if route crosses the antimeridian (180/-180 longitude)
    let adjustedEnd: Coordinates = [...end] as Coordinates;
    if (Math.abs(start[0] - end[0]) > 180) {
      // Adjust longitude to avoid sudden jumps
      if (start[0] < 0) {
        adjustedEnd[0] -= 360;
      } else {
        adjustedEnd[0] += 360;
      }
    }
    
    // Generate a curved path
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      
      // Straight interpolation for latitude
      const lat = start[1] + t * (adjustedEnd[1] - start[1]);
      
      // Curved interpolation for longitude
      // Add a curve factor based on distance
      const dist = Math.abs(adjustedEnd[1] - start[1]);
      const curveFactor = dist * 0.3;
      const curveOffset = Math.sin(Math.PI * t) * curveFactor;
      
      // Calculate longitude with curve
      const lng = start[0] + t * (adjustedEnd[0] - start[0]);
      
      // Add point to path
      let finalLng = lng;
      
      // Handle wrapping around the world
      if (finalLng < -180) finalLng += 360;
      if (finalLng > 180) finalLng -= 360;
      
      points.push([finalLng, lat + curveOffset]);
    }
    
    return points;
  };
  
  if (showTokenInput) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-card/30 rounded-lg border border-dashed p-6">
        <h3 className="text-lg font-medium mb-4">Mapbox Token Required</h3>
        <p className="text-sm text-muted-foreground mb-4 text-center">
          To display interactive maps, please enter your Mapbox public token.
          <br />You can get one from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
        </p>
        <form onSubmit={handleTokenSubmit} className="w-full max-w-md space-y-2">
          <input
            type="text"
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            placeholder="Enter your Mapbox public token"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Load Map
          </button>
        </form>
      </div>
    );
  }

  return <div ref={mapContainer} className="w-full h-full rounded-lg" />;
}
