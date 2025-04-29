'use client';

import React from 'react';
import { Port, Shipment } from '@/data/mockData';

// Risk level colors
const riskColors = {
  low: '#4ade80', // green
  medium: '#fbbf24', // amber
  high: '#ef4444', // red
};

interface MapComponentProps {
  shipment: Shipment;
  allPorts: Port[];
}

const MapComponent: React.FC<MapComponentProps> = ({ shipment, allPorts }) => {
  // Function to determine risk color
  const getRiskColor = (riskLevel: 'low' | 'medium' | 'high') => {
    return riskColors[riskLevel];
  };

  return (
    <div className="h-full w-full rounded-lg overflow-hidden relative bg-gray-100 flex flex-col">
      <div className="p-4 bg-white border-b">
        <h3 className="font-medium text-lg">Shipping Route Map</h3>
        <p className="text-sm text-gray-600">
          {shipment.originPort.name} → {shipment.destinationPort.name}
        </p>
      </div>
      
      <div className="flex-1 flex items-center justify-center relative p-8">
        <div className="w-full max-w-md relative">
          {/* Static map visualization */}
          <div className="relative bg-blue-50 rounded-lg p-6 border border-blue-200 shadow-inner min-h-[300px]">
            {/* Origin port */}
            <div className="absolute left-[20%] top-[40%] flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow-md mb-1" />
              <span className="text-xs font-medium bg-white px-2 py-1 rounded shadow-sm">
                {shipment.originPort.name}
              </span>
            </div>
            
            {/* Destination port */}
            <div className="absolute right-[20%] top-[40%] flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-md mb-1" />
              <span className="text-xs font-medium bg-white px-2 py-1 rounded shadow-sm">
                {shipment.destinationPort.name}
              </span>
            </div>
            
            {/* Route line */}
            <div 
              className="absolute left-1/4 right-1/4 top-[calc(40%+2px)] h-[3px]" 
              style={{ backgroundColor: getRiskColor(shipment.riskLevel) }}
            />
            
            {/* Ship position if available */}
            {shipment.currentPosition && (
              <div className="absolute left-[45%] top-[38%] flex flex-col items-center">
                <div className="text-xl mb-1">🚢</div>
                <span className="text-xs bg-white px-2 py-1 rounded shadow-sm">
                  Current Position
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md text-xs">
        <h4 className="font-bold mb-1">Risk Level</h4>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: riskColors.low }}></div>
          <span>Low Risk</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: riskColors.medium }}></div>
          <span>Medium Risk</span>
        </div>
        <div className="flex items-center mb-3">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: riskColors.high }}></div>
          <span>High Risk</span>
        </div>
        <h4 className="font-bold mb-1">Ports</h4>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: riskColors.low }}></div>
          <span>Origin</span>
        </div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: riskColors.high }}></div>
          <span>Destination</span>
        </div>
      </div>
      
      {/* Info text */}
      <div className="absolute top-4 right-4 bg-white p-3 rounded-md shadow-md text-xs max-w-[200px]">
        <p>
          Map integration requires environment setup. This is a simplified visualization of the shipping route.
        </p>
      </div>
    </div>
  );
};

export default MapComponent;
