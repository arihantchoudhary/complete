'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import MapComponent from '@/components/MapComponent';
import ShipmentNavigation from '@/components/ShipmentNavigation';
import InfoPanel from '@/components/InfoPanel';
import ShipmentList from '@/components/ShipmentList';
import { shipments, ports, getTotalActiveShipments, getHighRiskShipments, getTotalBillsOfLading } from '@/data/mockData';

export default function Home() {
  // State to track the currently selected shipment
  const [currentShipmentIndex, setCurrentShipmentIndex] = useState(0);
  const currentShipment = shipments[currentShipmentIndex];

  // Navigation handlers
  const handlePreviousShipment = () => {
    if (currentShipmentIndex > 0) {
      setCurrentShipmentIndex(currentShipmentIndex - 1);
    }
  };

  const handleNextShipment = () => {
    if (currentShipmentIndex < shipments.length - 1) {
      setCurrentShipmentIndex(currentShipmentIndex + 1);
    }
  };

  const handleSliderChange = (value: number[]) => {
    setCurrentShipmentIndex(value[0]);
  };

  const handleSelectShipment = (shipmentId: string) => {
    const index = shipments.findIndex(s => s.id === shipmentId);
    if (index !== -1) {
      setCurrentShipmentIndex(index);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">Global Shipping Risk Dashboard</h1>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Active Shipments: {getTotalActiveShipments()}
          </Badge>
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            High-Risk Shipments: {getHighRiskShipments()}
          </Badge>
          <Badge variant="outline" className="bg-purple-100 text-purple-800 hover:bg-purple-100">
            Bills of Lading: {getTotalBillsOfLading()}
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)]">
        {/* Left Section - Map */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full">
          <div className="h-[calc(100%-120px)]">
            <MapComponent 
              shipment={currentShipment}
              allPorts={ports}
            />
          </div>
          <div className="p-2">
            <ShipmentNavigation
              currentIndex={currentShipmentIndex}
              totalShipments={shipments.length}
              shipment={currentShipment}
              onPrevious={handlePreviousShipment}
              onNext={handleNextShipment}
              onSliderChange={handleSliderChange}
            />
          </div>
        </div>

        {/* Middle Section - Information Panel */}
        <div className="h-full">
          <ScrollArea className="h-full rounded-lg">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <InfoPanel shipment={currentShipment} />
            </div>
          </ScrollArea>
        </div>

        {/* Right Section - All Shipments */}
        <div className="h-full">
          <ShipmentList
            shipments={shipments}
            currentShipmentId={currentShipment.id}
            onSelectShipment={handleSelectShipment}
          />
        </div>
      </div>
    </main>
  );
}
