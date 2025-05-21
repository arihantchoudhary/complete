import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { useIsMobile } from "@/hooks/use-mobile";

// Types for our data
interface Arc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string;
  status: "normal" | "warning" | "danger";
}

interface Point {
  lat: number;
  lng: number;
  size: number;
  color: string;
}

export function GlobeVisualization({ height = 500 }: { height?: number }) {
  const isMobile = useIsMobile();
  const globeRef = useRef<any>();
  const [initialized, setInitialized] = useState(false);
  const [arcs, setArcs] = useState<Arc[]>([]);
  const [points, setPoints] = useState<Point[]>([]);

  // Create sample points and arcs for visualization
  useEffect(() => {
    // Major shipping ports and trade hubs
    const ports = [
      { name: "Shanghai", lat: 31.2304, lng: 121.4737 },
      { name: "Singapore", lat: 1.3521, lng: 103.8198 },
      { name: "Rotterdam", lat: 51.9244, lng: 4.4777 },
      { name: "Los Angeles", lat: 33.7701, lng: -118.1937 },
      { name: "Dubai", lat: 25.2048, lng: 55.2708 },
      { name: "Mumbai", lat: 18.9667, lng: 72.8333 },
      { name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
      { name: "New York", lat: 40.7128, lng: -74.0060 },
      { name: "Sydney", lat: -33.8688, lng: 151.2093 },
      { name: "Santos", lat: -23.9618, lng: -46.3322 },
      { name: "Hamburg", lat: 53.5511, lng: 9.9937 }
    ];

    // Generate points for each port
    const pointsData = ports.map(port => ({
      lat: port.lat,
      lng: port.lng,
      size: Math.random() * 5 + 3,
      color: "#60a5fa"
    }));

    // Generate arcs between ports
    const arcsData: Arc[] = [];

    for (let i = 0; i < ports.length; i++) {
      for (let j = i + 1; j < ports.length; j++) {
        if (Math.random() > 0.7) { // Only create some connections
          // Determine risk color
          const riskFactor = Math.random();
          let color, status: "normal" | "warning" | "danger";
          
          if (riskFactor < 0.7) {
            color = "#4ade80"; // Green for low risk
            status = "normal";
          } else if (riskFactor < 0.9) {
            color = "#facc15"; // Yellow for medium risk
            status = "warning";
          } else {
            color = "#f87171"; // Red for high risk
            status = "danger";
          }
          
          arcsData.push({
            startLat: ports[i].lat,
            startLng: ports[i].lng,
            endLat: ports[j].lat,
            endLng: ports[j].lng,
            color,
            status
          });
        }
      }
    }

    setPoints(pointsData);
    setArcs(arcsData);

  }, []);

  // Initialize globe settings once mounted with mobile-optimized values
  useEffect(() => {
    if (globeRef.current && !initialized) {
      const globe = globeRef.current;
      
      // Auto-rotate with slower speed on mobile
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = isMobile ? 0.3 : 0.5;
      
      // Adjust initial position for better mobile view
      setTimeout(() => {
        globe.pointOfView({
          lat: isMobile ? 30 : 25,
          lng: 30,
          altitude: isMobile ? 3 : 2.5
        }, 1000);
        setInitialized(true);
      }, 100);
    }
  }, [initialized, isMobile, globeRef.current]);

  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-transparent z-10" />
      
      {points.length > 0 && (
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl={null}
          width={isMobile ? window.innerWidth : height * 1.5}
          height={height}
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={isMobile ? 3000 : 2000}
          arcsData={arcs}
          arcStroke={isMobile ? 0.4 : 0.5}
          atmosphereColor="#3b82f6"
          atmosphereAltitude={0.15}
          pointsData={points}
          pointColor="color"
          pointAltitude={0}
          pointRadius={isMobile ? "size * 0.8" : "size"}
          pointsMerge={true}
          backgroundColor="rgba(0,0,0,0)"
          showGraticules={false}
        />
      )}
    </div>
  );
}
