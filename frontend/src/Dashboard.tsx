
import React, { useState } from 'react';
import { Map } from './Map';
import { RouteForm } from '../RouteForm';
import { RiskPanel } from './RiskPanel';
import { StatsPanel } from '../StatsPanel';
import { ChatPanel } from './ChatPanel';

const Dashboard = () => {
  const [startLocation, setStartLocation] = useState<string>('');
  const [endLocation, setEndLocation] = useState<string>('');
  const [itemType, setItemType] = useState<string>('');
  const [route, setRoute] = useState<any | null>(null);
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [ongoingShipments, setOngoingShipments] = useState<any[]>([]);
  const [showOngoingShipments, setShowOngoingShipments] = useState(false);
  const analyzeRoute = async (start: string, end: string, type: string) => {
    setIsAnalyzing(true);
    setStartLocation(start);
    setEndLocation(end);
    setItemType(type);
    
    
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
      
      // Add to ongoing shipments if not already analyzing
      if (!isAnalyzing) {
        const newShipment = {
          id: Date.now(),
          startLocation: start,
          endLocation: end,
          itemType: type || 'General Cargo',
          status: 'In Transit',
          departureDate: new Date().toISOString(),
          estimatedArrival: new Date(Date.now() + (mockRoute.estimatedTime * 24 * 60 * 60 * 1000)).toISOString(),
          disruptions: generateRandomDisruptions(),
        };
        setOngoingShipments(prev => [...prev, newShipment]);
      }
    }, 2000);
  };
  
  // Generate random disruptions for demo
  const generateRandomDisruptions = () => {
    const disruptionTypes = ['Weather', 'Political', 'Tax Compliance', 'Port Congestion'];
    const disruptions = [];
    
    // Randomly decide if there are disruptions
    if (Math.random() > 0.5) {
      const numDisruptions = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < numDisruptions; i++) {
        const type = disruptionTypes[Math.floor(Math.random() * disruptionTypes.length)];
        let description = '';
        
        switch (type) {
          case 'Weather':
            description = 'Storm warning in shipping lane. Potential delay of 1-2 days.';
            break;
          case 'Political':
            description = 'Trade restrictions implemented. Additional documentation required.';
            break;
          case 'Tax Compliance':
            description = 'New tariff regulations. Customs clearance may be delayed.';
            break;
          case 'Port Congestion':
            description = 'High volume at destination port. Unloading delays expected.';
            break;
        }
        
        disruptions.push({
          type,
          description,
          severity: Math.floor(Math.random() * 3) + 1, // 1-3 severity
          reportedAt: new Date().toISOString(),
        });
      }
    }
    
    return disruptions;
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
                <StatsPanel route={route} riskScore={riskScore} itemType={itemType} />
                
                {/* Ongoing Shipments Panel */}
                {ongoingShipments.length > 0 && (
                  <div className="glass-card p-4 animate-fade-in">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold">Ongoing Shipments</h2>
                      <button
                        onClick={() => setShowOngoingShipments(!showOngoingShipments)}
                        className="text-sm px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800/30"
                      >
                        {showOngoingShipments ? 'Hide Details' : 'Show Details'}
                      </button>
                    </div>
                    
                    {showOngoingShipments && (
                      <div className="space-y-4 mt-2">
                        {ongoingShipments.map((shipment) => (
                          <div key={shipment.id} className="glass-panel rounded-lg p-3 border border-gray-200 dark:border-gray-800">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                  {shipment.startLocation} → {shipment.endLocation}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Item: {shipment.itemType}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  ETA: {new Date(shipment.estimatedArrival).toLocaleDateString()}
                                </p>
                              </div>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                shipment.status === 'In Transit'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                  : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              }`}>
                                {shipment.status}
                              </span>
                            </div>
                            
                            {shipment.disruptions.length > 0 && (
                              <div className="mt-3">
                                <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Live Updates & Disruptions
                                </h4>
                                <div className="space-y-2">
                                  {shipment.disruptions.map((disruption, idx) => (
                                    <div key={idx} className={`text-xs p-2 rounded ${
                                      disruption.type === 'Weather' ? 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                                      disruption.type === 'Political' ? 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                                      disruption.type === 'Tax Compliance' ? 'bg-purple-50 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
                                      'bg-orange-50 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                                    }`}>
                                      <div className="font-medium">{disruption.type} Alert</div>
                                      <p>{disruption.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
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
