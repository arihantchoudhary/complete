
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useHotel } from '@/contexts/HotelContext';
import { Bed, Calendar, Hash, DollarSign } from 'lucide-react';

interface HotelDetailsProps {
  className?: string;
}

const HotelDetails: React.FC<HotelDetailsProps> = ({ className }) => {
  const { selectedHotel } = useHotel();
  
  const formatPeakMonths = (months?: string[]) => {
    if (!months || months.length === 0) return 'N/A';
    
    if (months.length <= 3) {
      return months.join(', ');
    } else {
      // Group consecutive months
      return `${months[0]} to ${months[months.length - 1]}`;
    }
  };
  
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="sm:w-56 mb-4 sm:mb-0 flex-shrink-0">
            <div className="rounded-md overflow-hidden h-36 sm:h-32 bg-gray-100">
              {selectedHotel.image ? (
                <img src={selectedHotel.image} alt={selectedHotel.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1 sm:ml-6">
            <h2 className="text-xl font-bold mb-2">{selectedHotel.name}</h2>
            <p className="text-gray-600 mb-4">{selectedHotel.location} • {selectedHotel.type} Property</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center">
                <Bed className="h-5 w-5 text-indigo-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Room Count</p>
                  <p className="font-medium">{selectedHotel.rooms || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-indigo-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Avg. Rate</p>
                  <p className="font-medium">{selectedHotel.averageRate || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-indigo-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Peak Season</p>
                  <p className="font-medium">{formatPeakMonths(selectedHotel.peakMonths)}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Hash className="h-5 w-5 text-indigo-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Seasonality</p>
                  <p className="font-medium">{selectedHotel.seasonality?.split(',')[0] || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelDetails;
