
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHotel } from '@/contexts/HotelContext';

// Base forecast data template
const baseForecastData = [
  {
    name: 'Week 1',
    current: 120,
    projected: 110,
  },
  {
    name: 'Week 2',
    current: 100,
    projected: 90,
  },
  {
    name: 'Week 3',
    current: 80,
    projected: 75,
  },
  {
    name: 'Week 4',
    current: 60,
    projected: 50,
  },
  {
    name: 'Week 5',
    current: 30,
    projected: 20,
  },
  {
    name: 'Week 6',
    current: 10,
    projected: 0,
  },
];

// Hotel-specific inventory items
const hotelInventoryItems = {
  'taj-palace-delhi': [
    { value: 'premium-linens', label: 'Premium Linens (SKU-D124)' },
    { value: 'toiletry-kits', label: 'Luxury Toiletry Kits (SKU-D238)' },
    { value: 'mineral-water', label: 'Mineral Water Bottles (SKU-D345)' },
  ],
  'taj-mahal-palace': [
    { value: 'heritage-soaps', label: 'Heritage Soaps (SKU-M721)' },
    { value: 'welcome-gifts', label: 'Welcome Gift Boxes (SKU-M432)' },
    { value: 'specialty-teas', label: 'Specialty Tea Collection (SKU-M267)' },
  ],
  'taj-lake-palace': [
    { value: 'boat-fuel', label: 'Boat Transfer Fuel (SKU-U123)' },
    { value: 'royal-amenities', label: 'Royal Suite Amenities (SKU-U456)' },
    { value: 'flower-decor', label: 'Fresh Flower Decorations (SKU-U789)' },
  ],
  'taj-exotica-goa': [
    { value: 'beach-towels', label: 'Premium Beach Towels (SKU-G321)' },
    { value: 'sunscreen-kits', label: 'Sunscreen Kits (SKU-G654)' },
    { value: 'coconut-water', label: 'Fresh Coconut Water (SKU-G987)' },
  ],
};

// Hotel-specific alerts
const hotelAlerts = {
  'taj-palace-delhi': "Based on upcoming conferences, you should place a linen order within 7 days to avoid stockout.",
  'taj-mahal-palace': "Heritage soap supplier has reported production delays. Order within 5 days to maintain stock.",
  'taj-lake-palace': "Flower supply chain affected by recent weather. Consider alternative decorations for next week.",
  'taj-exotica-goa': "Due to monsoon season, increase beach towel stock by 20% to account for longer drying times.",
};

interface InventoryForecastProps {
  className?: string;
}

const InventoryForecast: React.FC<InventoryForecastProps> = ({ className }) => {
  const { selectedHotel } = useHotel();
  const inventoryItems = hotelInventoryItems[selectedHotel.id as keyof typeof hotelInventoryItems] || hotelInventoryItems['taj-palace-delhi'];
  
  const [selectedItem, setSelectedItem] = React.useState(inventoryItems[0].value);
  
  // Generate hotel-specific forecast data with some variations
  const getForecastData = () => {
    const multiplier = {
      'taj-palace-delhi': 1,
      'taj-mahal-palace': 1.2,
      'taj-lake-palace': 0.7,
      'taj-exotica-goa': 0.9
    }[selectedHotel.id as keyof typeof multiplier] || 1;

    return baseForecastData.map(item => ({
      ...item,
      current: Math.round(item.current * multiplier),
      projected: Math.round(item.projected * multiplier)
    }));
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Inventory Forecast</CardTitle>
        <Select value={selectedItem} onValueChange={setSelectedItem}>
          <SelectTrigger className="w-[260px]">
            <SelectValue placeholder="Select item" />
          </SelectTrigger>
          <SelectContent>
            {inventoryItems.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={getForecastData()}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" name="Current Stock" fill="#0F52BA" />
              <Bar dataKey="projected" name="Projected Usage" fill="#FF8C00" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-sm">
          <p className="font-medium text-amber-800">Reorder Point Alert</p>
          <p className="text-amber-700 mt-1">
            {hotelAlerts[selectedHotel.id as keyof typeof hotelAlerts] || hotelAlerts['taj-palace-delhi']}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryForecast;
