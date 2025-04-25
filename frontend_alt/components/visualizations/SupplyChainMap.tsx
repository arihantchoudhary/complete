import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTheme } from '../../utils/theme';
import Container from '../ui/Container';
import FadeIn from '../animations/FadeIn';

// Initialize Mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiYXJpaGFudGNob3VkaGFyeSIsImEiOiJjbThvNmZtdWgwOG5iMmlwemJpcnRudjd3In0.JmygHU07dAryo96ZLH3uAA';

// Route coordinates
const ORIGIN = [103.8198, 1.3521]; // Singapore
const DESTINATION = [4.4792, 51.9225]; // Rotterdam

// Risk hotspots
const RISK_HOTSPOTS = [
  {
    name: 'Red Sea',
    coordinates: [38.5, 20.0],
    riskLevel: 'high',
    description: 'Geopolitical tensions and piracy risks'
  },
  {
    name: 'Suez Canal',
    coordinates: [32.5, 30.0],
    riskLevel: 'medium',
    description: 'Traffic congestion and operational delays'
  },
  {
    name: 'Mediterranean',
    coordinates: [20.0, 35.0],
    riskLevel: 'low',
    description: 'Seasonal weather patterns'
  }
];

// Route coordinates (simplified for demonstration)
const ROUTE_COORDINATES = [
  ORIGIN,
  [100.0, 10.0], // Gulf of Thailand
  [90.0, 15.0], // Bay of Bengal
  [70.0, 20.0], // Arabian Sea
  [50.0, 25.0], // Red Sea
  [30.0, 30.0], // Suez Canal
  [20.0, 35.0], // Mediterranean
  [10.0, 40.0], // Western Mediterranean
  DESTINATION
];

export default function SupplyChainMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: isDarkMode 
        ? 'mapbox://styles/mapbox/dark-v11'
        : 'mapbox://styles/mapbox/light-v11',
      center: [50.0, 25.0],
      zoom: 3,
      projection: 'mercator'
    });

    map.current.on('load', () => {
      if (!map.current) return;

      // Add route line
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: ROUTE_COORDINATES
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
          'line-color': isDarkMode ? '#60A5FA' : '#2563EB',
          'line-width': 3,
          'line-dasharray': [2, 2]
        }
      });

      // Add animated dots
      map.current.addSource('dots', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      map.current.addLayer({
        id: 'dots',
        type: 'circle',
        source: 'dots',
        paint: {
          'circle-radius': 6,
          'circle-color': isDarkMode ? '#60A5FA' : '#2563EB',
          'circle-opacity': 0.8
        }
      });

      // Add risk hotspots
      RISK_HOTSPOTS.forEach((hotspot, index) => {
        const color = {
          high: '#EF4444',
          medium: '#F59E0B',
          low: '#10B981'
        }[hotspot.riskLevel];

        map.current?.addSource(`hotspot-${index}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: hotspot.coordinates
            },
            properties: {
              name: hotspot.name,
              riskLevel: hotspot.riskLevel,
              description: hotspot.description
            }
          }
        });

        map.current?.addLayer({
          id: `hotspot-${index}`,
          type: 'circle',
          source: `hotspot-${index}`,
          paint: {
            'circle-radius': 8,
            'circle-color': color,
            'circle-opacity': 0.8,
            'circle-stroke-width': 2,
            'circle-stroke-color': isDarkMode ? '#1F2937' : '#F9FAFB'
          }
        });
      });

      setLoading(false);

      // Animate dots along the route
      let currentIndex = 0;
      const animateDots = () => {
        if (!map.current) return;

        const coordinates = ROUTE_COORDINATES.slice(
          currentIndex,
          currentIndex + 3
        );

        map.current.getSource('dots').setData({
          type: 'FeatureCollection',
          features: coordinates.map((coord, i) => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: coord
            },
            properties: {}
          }))
        });

        currentIndex = (currentIndex + 1) % (ROUTE_COORDINATES.length - 2);
        requestAnimationFrame(animateDots);
      };

      animateDots();
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [isDarkMode]);

  return (
    <Container>
      <FadeIn>
        <div className="relative h-[600px] w-full rounded-xl overflow-hidden shadow-lg">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-dark-50 dark:bg-dark-900 z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          )}
          <div ref={mapContainer} className="w-full h-full" />
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-dark-800 p-4 rounded-lg shadow-lg z-10">
            <h3 className="text-sm font-semibold mb-2 text-dark-900 dark:text-dark-100">
              Risk Indicators
            </h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm text-dark-700 dark:text-dark-300">High Risk</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm text-dark-700 dark:text-dark-300">Medium Risk</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-dark-700 dark:text-dark-300">Low Risk</span>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  );
} 