
import React from 'react';
import DashboardHeader from '@/components/Dashboard/DashboardHeader';
import RiskOverview from '@/components/Dashboard/RiskOverview';
import SupplierMetrics from '@/components/Dashboard/SupplierMetrics';
import InventoryForecast from '@/components/Dashboard/InventoryForecast';
import MetricCard from '@/components/UI/MetricCard';
import { Bed, Users, Clock, AlertTriangle, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHotel } from '@/contexts/HotelContext';
import HotelDetails from '@/components/Dashboard/HotelDetails';

const Index = () => {
  const { selectedHotel } = useHotel();
  
  // Location-specific metrics based on hotel
  const getHotelMetrics = () => {
    switch(selectedHotel.id) {
      case 'taj-palace-delhi':
        return {
          occupancy: "78%",
          occupancyChange: "+5% vs last week",
          staffCount: "18",
          staffCountChange: "-3 from current",
          turnaround: "42 min",
          turnaroundChange: "+5 min from target",
          supplyRisk: "Low",
          supplyRiskChange: "2 items at risk"
        };
      case 'taj-mahal-palace':
        return {
          occupancy: "85%",
          occupancyChange: "+3% vs last week",
          staffCount: "24",
          staffCountChange: "-2 from current",
          turnaround: "38 min",
          turnaroundChange: "+3 min from target",
          supplyRisk: "Medium",
          supplyRiskChange: "5 items at risk"
        };
      case 'taj-lake-palace':
        return {
          occupancy: "92%",
          occupancyChange: "+8% vs last week",
          staffCount: "12",
          staffCountChange: "Optimal",
          turnaround: "35 min",
          turnaroundChange: "On target",
          supplyRisk: "Low",
          supplyRiskChange: "1 item at risk"
        };
      case 'taj-exotica-goa':
        return {
          occupancy: "72%",
          occupancyChange: "-3% vs last week",
          staffCount: "16",
          staffCountChange: "-4 from current",
          turnaround: "45 min",
          turnaroundChange: "+8 min from target",
          supplyRisk: "High",
          supplyRiskChange: "7 items at risk"
        };
      default:
        return {
          occupancy: "78%",
          occupancyChange: "+5% vs last week",
          staffCount: "18",
          staffCountChange: "-3 from current",
          turnaround: "42 min",
          turnaroundChange: "+5 min from target",
          supplyRisk: "Low",
          supplyRiskChange: "2 items at risk"
        };
    }
  };

  const metrics = getHotelMetrics();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DashboardHeader />
      
      <main className="flex-1 py-6">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{selectedHotel.name} Operations Dashboard</h1>
              <p className="text-gray-500 mt-1">Welcome back! Here's your {selectedHotel.location} property overview.</p>
            </div>
            <div className="flex space-x-2 mt-4 md:mt-0">
              <Button variant="outline" className="text-gray-700">
                Export Report
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                AI Insights
              </Button>
            </div>
          </div>
          
          {/* Hotel property details */}
          <HotelDetails className="mb-6" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard 
              title="Predicted Occupancy" 
              value={metrics.occupancy} 
              change={{ 
                value: metrics.occupancyChange, 
                type: metrics.occupancyChange.includes('+') ? "positive" : "negative" 
              }}
              icon={<Bed className="h-5 w-5" />}
              tooltip="AI-predicted occupancy rate for the next 7 days"
            />
            <MetricCard 
              title="Optimal Staff Count" 
              value={metrics.staffCount} 
              change={{ 
                value: metrics.staffCountChange, 
                type: metrics.staffCountChange.includes('-') || metrics.staffCountChange === "Optimal" ? "positive" : "negative" 
              }}
              icon={<Users className="h-5 w-5" />}
              tooltip="AI-recommended housekeeping staff based on predicted occupancy"
            />
            <MetricCard 
              title="Avg. Room Turnaround" 
              value={metrics.turnaround}
              change={{ 
                value: metrics.turnaroundChange, 
                type: metrics.turnaroundChange.includes('+') ? "negative" : "positive" 
              }}
              icon={<Clock className="h-5 w-5" />}
              tooltip="Average time to prepare a room for new guests"
            />
            <MetricCard 
              title="Supply Risk Level" 
              value={metrics.supplyRisk}
              change={{ 
                value: metrics.supplyRiskChange, 
                type: metrics.supplyRisk === "Low" ? "positive" : "negative" 
              }}
              icon={<AlertTriangle className="h-5 w-5" />}
              tooltip="Current risk level for critical supplies"
            />
          </div>
          
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
              <TabsTrigger value="operations">Operations</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RiskOverview />
                <Card className="bg-white rounded-lg border p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-lg font-semibold">Upcoming Demand Forecast</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                          <span className="font-medium">June 15-18, 2023</span>
                        </div>
                        <div className="text-amber-600 font-medium">{metrics.occupancy} predicted occupancy</div>
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600">AI has identified several factors affecting this forecast:</p>
                        <ul className="space-y-2">
                          <li className="text-sm flex items-start">
                            <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">+</span>
                            <span>{selectedHotel.location === "New Delhi" || selectedHotel.location === "Mumbai" ? "Tech conference in the area (15-17 June)" : 
                                   selectedHotel.location === "Udaipur" ? "Royal wedding booked for June 16-18" :
                                   "Summer vacation season starting June 15"}</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">+</span>
                            <span>{selectedHotel.location === "New Delhi" || selectedHotel.location === "Mumbai" ? "30% increase in online search volume for your hotel" : 
                                   "25% increase in booking inquiries compared to last month"}</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="bg-red-100 text-red-800 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">-</span>
                            <span>{selectedHotel.location === "Goa" ? "Monsoon forecast: heavy rain predicted on June 16-18" : 
                                   selectedHotel.location === "New Delhi" ? "Weather forecast: extreme heat wave (40°C+) on June 15-17" :
                                   selectedHotel.location === "Mumbai" ? "Minor local transportation strike expected on June 17" :
                                   "Minor renovation work in north wing may affect 3 rooms"}</span>
                          </li>
                        </ul>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" className="w-full">
                          View Detailed Forecast
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <InventoryForecast className="lg:col-span-2" />
              </div>
            </TabsContent>
            <TabsContent value="occupancy">
              <div className="bg-white rounded-lg border p-6 flex items-center justify-center h-[300px]">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Detailed occupancy analytics coming soon!</p>
                  <Button variant="outline">View Occupancy Preview</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="operations">
              <div className="bg-white rounded-lg border p-6 flex items-center justify-center h-[300px]">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Operations dashboard coming soon!</p>
                  <Button variant="outline">View Operations Preview</Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="inventory">
              <div className="bg-white rounded-lg border p-6 flex items-center justify-center h-[300px]">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Inventory management coming soon!</p>
                  <Button variant="outline">View Inventory Preview</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="bg-white rounded-lg border p-4 text-center">
            <p className="text-sm text-gray-600">
              This is a demo version of Taj Hotels AI. Real-time data and insights would be customized to your property.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
