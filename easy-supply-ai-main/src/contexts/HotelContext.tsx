
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface HotelLocation {
  id: string;
  name: string;
  location: string;
  type: string;
  image?: string;
  rooms?: number;
  seasonality?: string;
  averageRate?: string;
  peakMonths?: string[];
}

// Enhanced data for Taj Group hotels with more realistic details
export const tajHotels: HotelLocation[] = [
  {
    id: 'taj-palace-delhi',
    name: 'Taj Palace',
    location: 'New Delhi',
    type: 'Luxury',
    image: 'https://www.tajhotels.com/content/dam/luxury/hotels/taj-palace-delhi/images/at_a_glance/16x7/Facade16x7.jpg',
    rooms: 403,
    seasonality: 'Business travel and winter tourism',
    averageRate: '₹12,500',
    peakMonths: ['October', 'November', 'December', 'January', 'February']
  },
  {
    id: 'taj-mahal-palace',
    name: 'The Taj Mahal Palace',
    location: 'Mumbai',
    type: 'Heritage',
    image: 'https://www.tajhotels.com/content/dam/luxury/hotels/Taj_Mahal_Mumbai/images/images2021/16x7/TMHM-Exterior-16x7.jpg',
    rooms: 560,
    seasonality: 'Year-round business hub with monsoon slowdown',
    averageRate: '₹18,000',
    peakMonths: ['September', 'October', 'November', 'December', 'January']
  },
  {
    id: 'taj-lake-palace',
    name: 'Taj Lake Palace',
    location: 'Udaipur',
    type: 'Palace',
    image: 'https://www.tajhotels.com/content/dam/luxury/hotels/taj-lake-palace-udaipur/images/16x7/LSW_1035-16x7.jpg',
    rooms: 83,
    seasonality: 'Winter tourism and wedding season',
    averageRate: '₹32,000',
    peakMonths: ['October', 'November', 'December', 'January', 'February', 'March']
  },
  {
    id: 'taj-exotica-goa',
    name: 'Taj Exotica Resort & Spa',
    location: 'Goa',
    type: 'Resort',
    image: 'https://www.tajhotels.com/content/dam/luxury/hotels/taj-exotica-goa/images/16x7/PoolSunset_master.jpg',
    rooms: 140,
    seasonality: 'Peak during winter and holiday seasons, slow during monsoon',
    averageRate: '₹24,000',
    peakMonths: ['October', 'November', 'December', 'January', 'February', 'March']
  }
];

interface HotelContextType {
  hotels: HotelLocation[];
  selectedHotel: HotelLocation;
  setSelectedHotel: (hotel: HotelLocation) => void;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedHotel, setSelectedHotel] = useState<HotelLocation>(tajHotels[0]);

  return (
    <HotelContext.Provider
      value={{
        hotels: tajHotels,
        selectedHotel,
        setSelectedHotel
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
