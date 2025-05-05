"use client";

import { useEffect, useRef } from "react";
import { ClientLayout } from "@/components/client-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveMap, InteractiveMapRef } from "@/components/interactive-map";
import mapboxgl from 'mapbox-gl';

// Major ports of the world with their coordinates
const MAJOR_PORTS = [
  // Asia
  { name: "Shanghai, China", coordinates: [121.4737, 31.2304] },
  { name: "Singapore", coordinates: [103.8198, 1.3521] },
  { name: "Shenzhen, China", coordinates: [114.0579, 22.5431] },
  { name: "Ningbo-Zhoushan, China", coordinates: [121.8122, 29.9988] },
  { name: "Busan, South Korea", coordinates: [129.0403, 35.1142] },
  { name: "Hong Kong, China", coordinates: [114.1694, 22.3193] },
  { name: "Qingdao, China", coordinates: [120.3826, 36.0671] },
  { name: "Guangzhou, China", coordinates: [113.2644, 23.1291] },
  { name: "Dubai, UAE", coordinates: [55.2708, 25.2048] },
  { name: "Jebel Ali, UAE", coordinates: [55.0271, 24.9796] },
  { name: "Port Klang, Malaysia", coordinates: [101.3554, 3.0008] },
  { name: "Tianjin, China", coordinates: [117.1993, 39.0850] },
  { name: "Kaohsiung, Taiwan", coordinates: [120.2811, 22.6273] },
  { name: "Jawaharlal Nehru, India", coordinates: [72.9752, 18.9490] },
  { name: "Colombo, Sri Lanka", coordinates: [79.8612, 6.9271] },
  { name: "Laem Chabang, Thailand", coordinates: [100.8895, 13.0700] },
  { name: "Ho Chi Minh City, Vietnam", coordinates: [106.6355, 10.8231] },
  { name: "Tanjung Pelepas, Malaysia", coordinates: [103.5510, 1.3652] },
  { name: "Tokyo, Japan", coordinates: [139.6917, 35.6895] },
  { name: "Yokohama, Japan", coordinates: [139.6380, 35.4437] },
  { name: "Nagoya, Japan", coordinates: [136.9066, 35.1815] },
  { name: "Kobe, Japan", coordinates: [135.1973, 34.6900] },
  
  // Europe
  { name: "Rotterdam, Netherlands", coordinates: [4.4000, 51.9164] },
  { name: "Antwerp, Belgium", coordinates: [4.4026, 51.2993] },
  { name: "Hamburg, Germany", coordinates: [9.9937, 53.5511] },
  { name: "Piraeus, Greece", coordinates: [23.6260, 37.9428] },
  { name: "Valencia, Spain", coordinates: [-0.3229, 39.4699] },
  { name: "Algeciras, Spain", coordinates: [-5.4531, 36.1408] },
  { name: "Felixstowe, UK", coordinates: [1.3357, 51.9634] },
  { name: "Marsaxlokk, Malta", coordinates: [14.5401, 35.8410] },
  { name: "Genoa, Italy", coordinates: [8.9252, 44.4056] },
  { name: "Le Havre, France", coordinates: [0.1079, 49.4944] },
  { name: "Gothenburg, Sweden", coordinates: [11.9746, 57.7089] },
  { name: "St. Petersburg, Russia", coordinates: [30.3351, 59.9343] },
  { name: "Gdansk, Poland", coordinates: [18.6466, 54.3520] },
  
  // North America
  { name: "Los Angeles, USA", coordinates: [-118.2437, 33.7288] },
  { name: "Long Beach, USA", coordinates: [-118.1937, 33.7701] },
  { name: "New York/New Jersey, USA", coordinates: [-74.0060, 40.7128] },
  { name: "Savannah, USA", coordinates: [-81.0912, 32.0836] },
  { name: "Seattle/Tacoma, USA", coordinates: [-122.3321, 47.6062] },
  { name: "Vancouver, Canada", coordinates: [-123.1207, 49.2827] },
  { name: "Houston, USA", coordinates: [-95.3698, 29.7604] },
  { name: "Manzanillo, Mexico", coordinates: [-104.3349, 19.0332] },
  { name: "Charleston, USA", coordinates: [-79.9311, 32.7765] },
  { name: "Norfolk, USA", coordinates: [-76.2859, 36.8507] },
  { name: "Miami, USA", coordinates: [-80.1918, 25.7617] },
  { name: "Oakland, USA", coordinates: [-122.2711, 37.8044] },
  { name: "Montreal, Canada", coordinates: [-73.5674, 45.5017] },
  
  // South America
  { name: "Santos, Brazil", coordinates: [-46.3011, -23.9618] },
  { name: "Colon, Panama", coordinates: [-79.9001, 9.3620] },
  { name: "Buenos Aires, Argentina", coordinates: [-58.3816, -34.6037] },
  { name: "Cartagena, Colombia", coordinates: [-75.5210, 10.3932] },
  { name: "Callao, Peru", coordinates: [-77.1167, -12.0500] },
  { name: "Guayaquil, Ecuador", coordinates: [-79.9000, -2.1900] },
  { name: "San Antonio, Chile", coordinates: [-71.6068, -33.5922] },
  
  // Africa
  { name: "Durban, South Africa", coordinates: [31.0218, -29.8587] },
  { name: "Tanger Med, Morocco", coordinates: [-5.7992, 35.8877] },
  { name: "Port Said, Egypt", coordinates: [32.3019, 31.2557] },
  { name: "Alexandria, Egypt", coordinates: [29.9187, 31.2001] },
  { name: "Mombasa, Kenya", coordinates: [39.6682, -4.0435] },
  { name: "Lagos, Nigeria", coordinates: [3.3941, 6.4550] },
  { name: "Djibouti, Djibouti", coordinates: [43.1456, 11.5883] },
  { name: "Dar es Salaam, Tanzania", coordinates: [39.2083, -6.8125] },
  { name: "Cape Town, South Africa", coordinates: [18.4241, -33.9249] },
  
  // Oceania
  { name: "Melbourne, Australia", coordinates: [144.9631, -37.8136] },
  { name: "Sydney, Australia", coordinates: [151.2093, -33.8688] },
  { name: "Brisbane, Australia", coordinates: [153.0251, -27.4698] },
  { name: "Auckland, New Zealand", coordinates: [174.7633, -36.8485] },
  { name: "Tauranga, New Zealand", coordinates: [176.1651, -37.6878] },
  { name: "Port Moresby, Papua New Guinea", coordinates: [147.1802, -9.4438] }
];

export default function WorldPortsMap() {
  const mapRef = useRef<InteractiveMapRef>(null);
  const mapInitialized = useRef(false);
  
  // Set up map with port markers - using InteractiveMap's methods to prevent flickering
  useEffect(() => {
    // Only initialize once to prevent flickering
    if (mapRef.current && !mapInitialized.current) {
      // Set initialization flag
      mapInitialized.current = true;
      
      // Make sure the map is loaded
      setTimeout(() => {
        if (!mapRef.current) return;

        // Add all ports using the component's marker API instead of raw Mapbox
        MAJOR_PORTS.forEach(port => {
          mapRef.current?.addMarker(
            port.coordinates as [number, number], 
            { 
              color: "#3b82f6", 
              scale: 0.7
            }, 
            `<div style='font-family: system-ui;'><strong>${port.name}</strong><br>Major Port</div>`
          );
        });
        
        // Fit bounds to show all ports
        mapRef.current.fitBounds(
          [
            [-180, -70], // Southwest corner
            [180, 70]    // Northeast corner
          ],
          {
            padding: 50,
            duration: 1000
          }
        );
      }, 500); // Brief delay to ensure map is ready
    }
    
    return () => {
      // Clean up markers if needed
      if (mapRef.current) {
        mapRef.current.clearAllMarkers();
      }
    };
  }, []);

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">World's Major Ports</h1>
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Global Port Network</CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[700px]">
            <InteractiveMap
              ref={mapRef}
              initialProjection="mercator"
              mapStyle="mapbox://styles/mapbox/dark-v11"
              height="700px"
              className="rounded-b-lg"
              initialZoom={1.5}
            />
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Map showing {MAJOR_PORTS.length} major ports around the world. Click on any marker to see port details.</p>
          <p className="mt-1">Data represents key shipping hubs by container volume and strategic importance.</p>
        </div>
      </div>
    </ClientLayout>
  );
}
