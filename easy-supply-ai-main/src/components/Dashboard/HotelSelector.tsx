
import React from 'react';
import { useHotel, HotelLocation } from '@/contexts/HotelContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Bed } from "lucide-react";

const HotelSelector: React.FC = () => {
  const { hotels, selectedHotel, setSelectedHotel } = useHotel();

  const handleHotelChange = (hotelId: string) => {
    const hotel = hotels.find(h => h.id === hotelId);
    if (hotel) {
      setSelectedHotel(hotel);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="hidden md:flex items-center">
        <Avatar className="h-10 w-10 mr-2 border-2 border-white">
          {selectedHotel.image ? (
            <AvatarImage src={selectedHotel.image} alt={selectedHotel.name} />
          ) : (
            <AvatarFallback>{selectedHotel.name.substring(0, 2)}</AvatarFallback>
          )}
        </Avatar>
        <div className="hidden lg:block">
          <p className="text-sm font-medium">{selectedHotel.name}</p>
          <p className="text-xs text-muted-foreground">{selectedHotel.location}</p>
        </div>
      </div>

      <Select value={selectedHotel.id} onValueChange={handleHotelChange}>
        <SelectTrigger className="w-[180px] md:w-[250px]">
          <SelectValue placeholder="Select a hotel" />
        </SelectTrigger>
        <SelectContent>
          {hotels.map((hotel) => (
            <SelectItem key={hotel.id} value={hotel.id} className="py-3">
              <div className="flex items-center">
                <Avatar className="h-6 w-6 mr-2">
                  {hotel.image ? (
                    <AvatarImage src={hotel.image} alt={hotel.name} />
                  ) : (
                    <AvatarFallback>{hotel.name.substring(0, 2)}</AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{hotel.name}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span>{hotel.location}</span>
                    {hotel.rooms && (
                      <>
                        <span className="mx-1">•</span>
                        <Bed className="h-3 w-3 mr-1" />
                        <span>{hotel.rooms} rooms</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default HotelSelector;
