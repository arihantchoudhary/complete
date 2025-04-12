
import React, { useState } from 'react';
import { Map } from './Map';
import { RouteForm } from './RouteForm';
import { RiskPanel } from './RiskPanel';
import { StatsPanel } from './StatsPanel';
import { ChatPanel } from './ChatPanel';

const Dashboard = () => {
  const [startLocation, setStartLocation] = useState<string>('');
  const [endLocation, setEndLocation] = useState<string>('');
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
      return [55.2708 + (Math.random() * 0.1 - 0.05), 25.2048 + (Math.random() * 0.1 - 0.05)];
    } else if (location.toLowerCase().includes('san francisco')) {
      return [-122.4194 + (Math.random() * 0.1 - 0.05), 37.7749 + (Math.random() * 0.1 - 0.05)];
    } else {
      // Random locations for any other input
      return [
        -180 + Math.random() * 360,
        -90 + Math.random() * 180
      ];
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Map Panel */}
                <div className="glass-card p-4 min-h-[500px]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Trade Route Map</h2>
                  </div>
                  <Map 
                    startLocation={startLocation}
                    endLocation={endLocation}
                    route={route}
                    riskScore={riskScore}
                    isAnalyzing={isAnalyzing}
                  />
                </div>
                
                {/* Stats Panel */}
                <StatsPanel route={route} riskScore={riskScore} />
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* Route Form */}
                <div className="glass-card p-4">
                  <RouteForm onAnalyze={analyzeRoute} isAnalyzing={isAnalyzing} />
                </div>
                
                {/* Risk Panel */}
                {riskScore !== null && (
                  <div className="glass-card p-4 animate-fade-in">
                    <RiskPanel riskScore={riskScore} />
                  </div>
                )}
                
                {/* Chat Panel */}
                {route && (
                  <div className="glass-card p-4 animate-fade-in">
                    <ChatPanel 
                      startLocation={startLocation} 
                      endLocation={endLocation}
                      riskScore={riskScore}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
