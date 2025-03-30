
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RiskAlert from '../UI/RiskAlert';
import { useToast } from '@/components/ui/use-toast';
import { useHotel } from '@/contexts/HotelContext';

// Define property-specific alerts for each hotel
const hotelAlerts = {
  'taj-palace-delhi': [
    {
      level: "high" as const,
      title: "Linen supply shortage predicted",
      description: "Current stock will be insufficient for predicted occupancy. Order needed within 48 hours.",
      action: "Order now"
    },
    {
      level: "medium" as const,
      title: "Housekeeping staff shortage on Friday",
      description: "Based on booking patterns, you'll need 3 additional staff members for efficient turnaround.",
      action: "View staffing options"
    },
    {
      level: "low" as const,
      title: "Preventive maintenance due for AC units",
      description: "7 AC units in north wing are due for maintenance. Schedule before summer occupancy spike.",
      action: "Schedule maintenance"
    }
  ],
  'taj-mahal-palace': [
    {
      level: "high" as const,
      title: "Heritage tour guide shortage",
      description: "Predicted spike in heritage tour bookings. Need 2 additional guides for next week.",
      action: "Schedule guides"
    },
    {
      level: "medium" as const,
      title: "Presidential suite maintenance required",
      description: "Minor repairs needed in Presidential suite before VIP arrival on Saturday.",
      action: "View maintenance details"
    },
    {
      level: "low" as const,
      title: "Seafood supplier price increase",
      description: "Your primary seafood supplier has announced 5% price increase starting next month.",
      action: "Review alternatives"
    }
  ],
  'taj-lake-palace': [
    {
      level: "high" as const,
      title: "Boat transport service disruption",
      description: "Lake maintenance will affect boat transfers on Tuesday. 14 guest arrivals affected.",
      action: "View affected bookings"
    },
    {
      level: "medium" as const,
      title: "Special event conflict detected",
      description: "Two wedding bookings requesting same lakeside venue on May 15th.",
      action: "Resolve scheduling"
    },
    {
      level: "low" as const,
      title: "Spa product inventory low",
      description: "Luxury massage oils running low (30%). Reorder recommended within 2 weeks.",
      action: "Order supplies"
    }
  ],
  'taj-exotica-goa': [
    {
      level: "high" as const,
      title: "Weather alert: Heavy rainfall predicted",
      description: "Heavy rainfall predicted for next weekend. Beach activities will need contingency plans.",
      action: "View weather forecast"
    },
    {
      level: "medium" as const,
      title: "Pool maintenance schedule conflict",
      description: "Scheduled pool maintenance overlaps with peak usage time. Consider rescheduling.",
      action: "Adjust schedule"
    },
    {
      level: "low" as const,
      title: "Beach villa furniture aging",
      description: "Beach villa outdoor furniture showing signs of wear. Replace within next quarter.",
      action: "Review furniture options"
    }
  ]
};

const RiskOverview: React.FC = () => {
  const { toast } = useToast();
  const { selectedHotel } = useHotel();
  
  const handleActionClick = (action: string) => {
    toast({
      title: "Action triggered",
      description: `You clicked on: ${action}`,
    });
  };
  
  // Get alerts for the selected hotel or fallback to default
  const alerts = hotelAlerts[selectedHotel.id as keyof typeof hotelAlerts] || hotelAlerts['taj-palace-delhi'];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Operational Alerts for {selectedHotel.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => (
          <RiskAlert 
            key={index}
            level={alert.level}
            title={alert.title}
            description={alert.description}
            action={{
              label: alert.action,
              onClick: () => handleActionClick(alert.action),
            }}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default RiskOverview;
