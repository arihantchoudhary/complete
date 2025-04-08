import React, { useState } from 'react';
import { Map } from './Map';
import { RouteForm } from './RouteForm';
import { RiskPanel } from './RiskPanel';
import { DashboardLayout } from './DashboardLayout';

const Dashboard: React.FC = () => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [route, setRoute] = useState<any | null>(null);
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeRoute = async (start: string, end: string) => {
    setIsAnalyzing(true);
    setStartLocation(start);
    setEndLocation(end);

    // Simulate API call with a delay
    setTimeout(() => {
      // Mock route data and risk score
      const mockRoute = {
        startCoords: getRandomCoords(start),
        endCoords: getRandomCoords(end),
        distance: Math.floor(Math.random() * 10000) + 5000,
        estimatedTime: Math.floor(Math.random() * 14) + 7,
      };
      setRoute(mockRoute);

      // Calculate mock risk score (0-100)
      const mockRiskScore = Math.floor(Math.random() * 100);
      setRiskScore(mockRiskScore);

      setIsAnalyzing(false);
    }, 2000);
  };

  // Helper to generate random coordinates for demo
  const getRandomCoords = (location: string): [number, number] => {
    if (location.toLowerCase().includes('dubai')) {
      return [
        55.2708 + (Math.random() * 0.1 - 0.05),
        25.2048 + (Math.random() * 0.1 - 0.05),
      ];
    } else if (location.toLowerCase().includes('san francisco')) {
      return [
        -122.4194 + (Math.random() * 0.1 - 0.05),
        37.7749 + (Math.random() * 0.1 - 0.05),
      ];
    } else {
      // Random locations for any other input
      return [-180 + Math.random() * 360, -90 + Math.random() * 180];
    }
  };

  return (
    <DashboardLayout
      leftPanel={<div>Left Panel Content</div>}
      map={
        <Map
          startLocation={startLocation}
          endLocation={endLocation}
          route={route}
          riskScore={riskScore}
          isAnalyzing={isAnalyzing}
        />
      }
      topBar={
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-white ${
                riskScore === null
                  ? 'bg-gray-300'
                  : riskScore > 75
                  ? 'bg-red-500'
                  : riskScore > 50
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
            >
              {riskScore ?? '-'}
            </div>
            <div>
              <div className="text-sm text-gray-500">Start</div>
              <div className="font-medium">{startLocation}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">End</div>
              <div className="font-medium">{endLocation}</div>
            </div>
          </div>
          <RouteForm onAnalyze={analyzeRoute} isAnalyzing={isAnalyzing} />
        </div>
      }
      bottomPanel={<RiskPanel riskScore={riskScore || 0} />}
    />
  );
};

export default Dashboard;
