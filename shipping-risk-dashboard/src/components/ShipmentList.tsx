'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shipment } from '@/data/mockData';

interface ShipmentListProps {
  shipments: Shipment[];
  currentShipmentId: string;
  onSelectShipment: (shipmentId: string) => void;
}

const ShipmentList: React.FC<ShipmentListProps> = ({
  shipments,
  currentShipmentId,
  onSelectShipment,
}) => {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  // Generate risk badge based on risk level
  const getRiskBadge = (riskLevel: 'low' | 'medium' | 'high', score: number) => {
    const colors = {
      low: 'bg-green-500',
      medium: 'bg-amber-500',
      high: 'bg-red-500',
    };

    return (
      <Badge className={`${colors[riskLevel]} text-white text-xs`}>
        {score}/100
      </Badge>
    );
  };

  return (
    <div className="border rounded-lg h-full bg-white">
      <div className="p-3 border-b">
        <h2 className="text-lg font-semibold">All Active Shipments</h2>
        <p className="text-sm text-gray-500">{shipments.length} shipments currently active</p>
      </div>

      <ScrollArea className="h-[calc(100%-60px)]">
        <div className="p-2 space-y-2">
          {shipments.map((shipment) => (
            <Card 
              key={shipment.id}
              className={`cursor-pointer transition-colors ${
                shipment.id === currentShipmentId 
                  ? 'bg-blue-50 border-blue-200' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onSelectShipment(shipment.id)}
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{shipment.vesselName}</h3>
                    <p className="text-sm text-gray-600">{shipment.cargoType}</p>
                  </div>
                  <div>
                    {getRiskBadge(shipment.riskLevel, shipment.riskScore)}
                  </div>
                </div>
                
                <div className="mt-2 text-xs text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Origin:</span>
                    <span>{shipment.originPort.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Destination:</span>
                    <span>{shipment.destinationPort.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Departure:</span>
                    <span>{formatDate(shipment.departureDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Arrival:</span>
                    <span>{formatDate(shipment.arrivalDate)}</span>
                  </div>
                  <div className="border-t pt-1 mt-1">
                    <span className="font-medium">BoL:</span>{' '}
                    <span className="font-mono">{shipment.billOfLading.documentNumber}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ShipmentList;
