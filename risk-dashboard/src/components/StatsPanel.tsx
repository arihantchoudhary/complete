
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

interface StatsPanelProps {
  route: any | null;
  riskScore: number | null;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ route, riskScore }) => {
  if (!route) return null;
  
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
          </div>
        </div>
      </div>
    </div>
  );
};
