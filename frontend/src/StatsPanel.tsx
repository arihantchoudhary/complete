
import React from 'react';
import { BarChart, Clock, Anchor, DollarSign, TrendingUp, Package } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart as RechartsBarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Mock data for shipping providers and tracking availability
const shippingProviders = [
  { name: 'Maersk', trackingAvailable: true },
  { name: 'MSC', trackingAvailable: true },
  { name: 'CMA CGM', trackingAvailable: true },
  { name: 'COSCO', trackingAvailable: false },
  { name: 'Hapag-Lloyd', trackingAvailable: true },
  { name: 'ONE', trackingAvailable: true },
  { name: 'Evergreen', trackingAvailable: false },
];

// Mock data for item types and subtypes
const itemTypes = [
  { type: 'Fashion', subtypes: ['Purses', 'Clothing', 'Shoes', 'Accessories'] },
  { type: 'Electronics', subtypes: ['Smartphones', 'Computers', 'Components', 'Appliances'] },
  { type: 'Food', subtypes: ['Perishables', 'Dry Goods', 'Frozen', 'Beverages'] },
  { type: 'Automotive', subtypes: ['Parts', 'Vehicles', 'Accessories'] },
  { type: 'Pharmaceuticals', subtypes: ['Medications', 'Medical Devices', 'Supplements'] },
];

interface StatsPanelProps {
  route: any | null;
  riskScore: number | null;
  itemType?: string;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ route, riskScore, itemType }) => {
  if (!route) return null;
  
  // Select item type based on prop or random if not provided
  let selectedItemType;
  let selectedSubtype;
  
  if (itemType && itemTypes.find(item => item.type === itemType)) {
    selectedItemType = itemTypes.find(item => item.type === itemType);
    const randomSubtypeIndex = Math.floor(Math.random() * selectedItemType.subtypes.length);
    selectedSubtype = selectedItemType.subtypes[randomSubtypeIndex];
  } else {
    const randomItemTypeIndex = Math.floor(Math.random() * itemTypes.length);
    selectedItemType = itemTypes[randomItemTypeIndex];
    const randomSubtypeIndex = Math.floor(Math.random() * selectedItemType.subtypes.length);
    selectedSubtype = selectedItemType.subtypes[randomSubtypeIndex];
  }
  
  // Generate random tariff rate (between 5% and 25%)
  const tariffRate = Math.floor(Math.random() * 20) + 5;
  
  // Mock data for charts
  const generateMockData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(now);
      date.setMonth(now.getMonth() - 11 + i);
      
      // Create some seasonality and trend
      const baseValue = 800 + (i * 20); // Increasing trend
      const seasonality = Math.sin((i / 11) * Math.PI * 2) * 200; // Seasonal pattern
      const random = Math.random() * 100 - 50; // Random noise
      
      const value = Math.max(100, Math.round(baseValue + seasonality + random));
      
      data.push({
        name: date.toLocaleString('default', { month: 'short' }),
        value,
        volume: Math.round(value * 0.8 + Math.random() * 100),
        cost: Math.round(value * 1.2 + Math.random() * 150),
      });
    }
    
    return data;
  };
  
  const timeSeriesData = generateMockData();
  
  // Calculate estimated shipping costs (mock)
  const estimatedCost = Math.round(300 + (route.distance * 0.03));
  
  // Calculate estimated carbon footprint (mock)
  const carbonFootprint = Math.round(route.distance * 0.02);
  
  return (
    <div className="glass-card p-4 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Route Statistics & Market Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Route stats */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2 border-gray-200 dark:border-gray-700">
            Route Details
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Stats */}
            <div className="glass-panel rounded-lg p-3 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                  <Anchor className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Distance</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {route.distance.toLocaleString()} km
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-panel rounded-lg p-3 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-md">
                  <Clock className="h-5 w-5 text-indigo-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {route.estimatedTime} days
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-panel rounded-lg p-3 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                  <DollarSign className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Est. Cost</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    ${estimatedCost.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-panel rounded-lg p-3 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                  <Package className="h-5 w-5 text-amber-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Carbon</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {carbonFootprint} tons
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Market trends */}
          <div className="glass-panel rounded-lg p-4 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Historical Trade Volumes
              </h4>
              <TrendingUp className="h-4 w-4 text-indigo-500" />
            </div>
            
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10 }}
                    stroke="#9ca3af"
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }}
                    stroke="#9ca3af"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Economic impact */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium border-b pb-2 border-gray-200 dark:border-gray-700">
            Economic Indicators
          </h3>
          
          <div className="glass-panel rounded-lg p-4 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Market Comparison
              </h4>
              <BarChart className="h-4 w-4 text-purple-500" />
            </div>
            
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={timeSeriesData.slice(-6)}
                  margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10 }}
                    stroke="#9ca3af"
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }}
                    stroke="#9ca3af"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 0, 0, 0.1)',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }} 
                  />
                  <Bar dataKey="volume" name="Volume" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cost" name="Cost" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Trade insights */}
          <div className="glass-panel rounded-lg p-4 border border-gray-200 dark:border-gray-800">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Trade Route Insights
            </h4>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-600 dark:text-gray-400">Market Stability</span>
                <div className="flex items-center">
                  <span className="font-medium text-gray-900 dark:text-gray-100 mr-1">
                    {Math.max(20, 100 - riskScore)}%
                  </span>
                  <div className={`h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden`}>
                    <div
                      className={`h-full bg-blue-500 rounded-full`}
                      style={{ width: `${Math.max(20, 100 - riskScore)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-600 dark:text-gray-400">Growth Trend</span>
                <div className="flex items-center">
                  <span className="font-medium text-gray-900 dark:text-gray-100 mr-1">
                    +{Math.max(2, Math.floor((100 - riskScore) / 10))}%
                  </span>
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
              </div>
              
              <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-600 dark:text-gray-400">Trade Volume</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {Math.floor(Math.random() * 150) + 50}M tons/year
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Major Commodities</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  Electronics, Textiles
                </span>
              </div>
            </div>
            
            {/* Trade Item Information - NEW SECTION */}
            <div className="glass-panel rounded-lg p-4 border border-gray-200 dark:border-gray-800 mt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Trade Item Information
              </h4>
              
              <div className="space-y-3 text-sm">
                {/* Item Type and Subtype */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-panel rounded-lg p-3 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-md">
                        <Package className="h-5 w-5 text-purple-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Item Type</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {selectedItemType.type}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-panel rounded-lg p-3 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 p-2 bg-pink-50 dark:bg-pink-900/20 rounded-md">
                        <Package className="h-5 w-5 text-pink-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Item Subtype</p>
                        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {selectedSubtype}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tax and Tariff Information */}
                <div className="glass-panel rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tax & Tariff Information
                  </h5>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-gray-600 dark:text-gray-400">Tariff Rate</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {tariffRate}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                      <span className="text-gray-600 dark:text-gray-400">HS Code</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {selectedItemType.type === 'Fashion' ? '6204.44' :
                         selectedItemType.type === 'Electronics' ? '8517.12' :
                         selectedItemType.type === 'Food' ? '2106.90' :
                         selectedItemType.type === 'Automotive' ? '8708.99' : '3004.90'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Import Duty</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        ${Math.floor(estimatedCost * (tariffRate / 100)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Tax Compliance Facts */}
                <div className="glass-panel rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tax Compliance Facts
                  </h5>
                  
                  <div className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
                    {selectedItemType.type === 'Fashion' && (
                      <>
                        <p>• Luxury goods may be subject to additional import taxes in certain regions</p>
                        <p>• Country of origin labeling required for all textile products</p>
                        <p>• Proof of material composition needed for customs clearance</p>
                      </>
                    )}
                    
                    {selectedItemType.type === 'Electronics' && (
                      <>
                        <p>• Requires certification of compliance with safety standards</p>
                        <p>• Battery-containing devices subject to special shipping regulations</p>
                        <p>• May require proof of encryption compliance for certain markets</p>
                      </>
                    )}
                    
                    {selectedItemType.type === 'Food' && (
                      <>
                        <p>• Requires health certificates and phytosanitary documentation</p>
                        <p>• Shelf-life and expiration date must be clearly labeled</p>
                        <p>• May be subject to inspection at port of entry</p>
                      </>
                    )}
                    
                    {selectedItemType.type === 'Automotive' && (
                      <>
                        <p>• Must comply with safety and emissions standards of destination country</p>
                        <p>• May require certification of parts compatibility</p>
                        <p>• Special documentation needed for hazardous materials</p>
                      </>
                    )}
                    
                    {selectedItemType.type === 'Pharmaceuticals' && (
                      <>
                        <p>• Requires import licenses and regulatory approval</p>
                        <p>• Temperature-controlled shipping documentation mandatory</p>
                        <p>• Batch testing certificates may be required at customs</p>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Tracking Information */}
                <div className="glass-panel rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Shipping & Tracking
                  </h5>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {shippingProviders.map((provider, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <span className="font-medium">{provider.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          provider.trackingAvailable
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                        }`}>
                          {provider.trackingAvailable ? 'Tracking Available' : 'No Tracking'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
