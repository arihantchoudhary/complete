'use client';

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Shipment } from '@/data/mockData';

interface ShipmentNavigationProps {
  currentIndex: number;
  totalShipments: number;
  shipment: Shipment;
  onPrevious: () => void;
  onNext: () => void;
  onSliderChange: (value: number[]) => void;
}

const ShipmentNavigation: React.FC<ShipmentNavigationProps> = ({
  currentIndex,
  totalShipments,
  shipment,
  onPrevious,
  onNext,
  onSliderChange,
}) => {
  // Generate risk badge based on risk level
  const getRiskBadge = () => {
    const colors = {
      low: 'bg-green-500',
      medium: 'bg-amber-500',
      high: 'bg-red-500',
    };

    return (
      <Badge className={`${colors[shipment.riskLevel]} text-white`}>
        Risk: {shipment.riskScore}/100
      </Badge>
    );
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Basic shipment details */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
        <div>
          <h3 className="text-lg font-semibold">{shipment.vesselName}</h3>
          <p className="text-sm text-gray-600">Cargo: {shipment.cargoType}</p>
        </div>
        <div className="flex items-center gap-2 md:mt-0">
          {getRiskBadge()}
        </div>
      </div>

      {/* Navigation controls */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onPrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <div className="text-sm font-medium">
            {currentIndex + 1} of {totalShipments}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onNext}
            disabled={currentIndex === totalShipments - 1}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <Slider
          defaultValue={[currentIndex + 1]}
          max={totalShipments}
          min={1}
          step={1}
          value={[currentIndex + 1]}
          onValueChange={(value) => onSliderChange([value[0] - 1])}
          className="py-2"
        />
      </div>
    </div>
  );
};

export default ShipmentNavigation;
