import React, { useRef, useEffect, useState } from 'react';
import { BarChart, Clock, Anchor, DollarSign, TrendingUp, Package } from 'lucide-react';
import { TariffPanel } from '../components/TariffPanel';
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
                
                {/* Real-time Tariff Information from Grok-3 API */}
                <TariffPanel 
                  origin={route.origin || "China"}
                  destination={route.destination || "United States"}
                  itemType={selectedItemType.type}
                  hsCode={selectedItemType.type === 'Fashion' ? '6204.44' :
                          selectedItemType.type === 'Electronics' ? '8517.12' :
                          selectedItemType.type === 'Food' ? '2106.90' :
                          selectedItemType.type === 'Automotive' ? '8708.99' : '3004.90'}
                />
                
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

const SupplyChainDisruptions: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const sourceRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle smooth scrolling to sources
  const scrollToSource = (sourceId: string) => {
    const source = sourceRefs.current[sourceId];
    if (source) {
      source.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      // Find the current section
      let currentSection = '';
      Object.keys(sectionRefs.current).forEach((sectionId) => {
        const section = sectionRefs.current[sectionId];
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = sectionId;
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  // Scroll to top button
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScrollVisibility = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Table of Contents - Left Side */}
      <aside className="md:w-64 p-6 md:h-[calc(100vh-64px)] md:sticky md:top-0 overflow-y-auto border-r border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4">Supply Chain Disruptions</h2>
        <nav className="space-y-1">
          <div 
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${activeSection === 'overview' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : ''}`}
            onClick={() => scrollToSection('overview')}
          >
            Overview
          </div>
          <div 
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${activeSection === 'types' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : ''}`}
            onClick={() => scrollToSection('types')}
          >
            Types of Disruptions
          </div>
          <div 
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${activeSection === 'current' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : ''}`}
            onClick={() => scrollToSection('current')}
          >
            Current Disruptions
          </div>
          <div 
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${activeSection === 'case-studies' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : ''}`}
            onClick={() => scrollToSection('case-studies')}
          >
            Case Studies
          </div>
          <div 
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${activeSection === 'mitigation' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : ''}`}
            onClick={() => scrollToSection('mitigation')}
          >
            Mitigation Strategies
          </div>
          <div 
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${activeSection === 'future' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : ''}`}
            onClick={() => scrollToSection('future')}
          >
            Future Trends
          </div>
          <div 
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${activeSection === 'sources' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : ''}`}
            onClick={() => scrollToSection('sources')}
          >
            Sources
          </div>
        </nav>
      </aside>
      
      {/* Main Content - Right Side */}
      <main className="flex-1 p-6">
        {/* Overview Section */}
        <section ref={(el) => {sectionRefs.current['overview'] = el}} id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Overview of Supply Chain Disruptions</h2>
          <p className="mb-4">
            Supply chain disruptions are interruptions to the normal flow of goods and services within a supply network. These disruptions can have significant impacts on businesses, economies, and consumers worldwide. According to the World Economic Forum, supply chain disruptions cost organizations an average of 45% of one year's profits over a decade<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('1')}} className="text-blue-500 hover:underline">[1]</a>.
          </p>
          <p className="mb-4">
            In recent years, global supply chains have faced unprecedented challenges, from the COVID-19 pandemic to geopolitical conflicts, extreme weather events, and cyberattacks. The increasing complexity and interconnectedness of global supply networks have made them more vulnerable to cascading failures when disruptions occur<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('2')}} className="text-blue-500 hover:underline">[2]</a>.
          </p>
        </section>
        
        {/* Types of Disruptions Section */}
        <section ref={(el) => {sectionRefs.current['types'] = el}} id="types" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Types of Supply Chain Disruptions</h2>
          <p className="mb-4">
            Supply chain disruptions can be categorized into several main types, each with different causes, impacts, and mitigation strategies.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Geopolitical Disruptions</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Trade wars and tariffs</li>
                <li>Military conflicts</li>
                <li>Regional instability</li>
                <li>Policy and regulatory changes</li>
                <li>Sanctions and embargoes</li>
              </ul>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Natural Disasters & Climate Events</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Hurricanes and floods</li>
                <li>Earthquakes and tsunamis</li>
                <li>Wildfires</li>
                <li>Extreme weather patterns</li>
                <li>Pandemics and health crises</li>
              </ul>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Operational & Infrastructure</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Port congestion</li>
                <li>Transportation network failures</li>
                <li>Warehouse and distribution issues</li>
                <li>Labor shortages and strikes</li>
                <li>Quality control failures</li>
              </ul>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Technology & Cyber Risks</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Ransomware attacks</li>
                <li>Data breaches</li>
                <li>IT system failures</li>
                <li>Third-party software vulnerabilities</li>
                <li>Critical infrastructure attacks</li>
              </ul>
            </div>
          </div>
          <p>
            According to research by Gartner, external risk events that significantly impacted supply chains have increased by 42% since 2020<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('3')}} className="text-blue-500 hover:underline">[3]</a>. The average organization now experiences 4-5 significant disruptions per year, up from 2-3 in the pre-pandemic period.
          </p>
        </section>
        
        {/* Current Disruptions Section */}
        <section ref={(el) => {sectionRefs.current['current'] = el}} id="current" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Current Major Disruptions</h2>
          <p className="mb-4">
            Several ongoing disruptions are currently affecting global supply chains and causing significant challenges for logistics and trade operations.
          </p>
          <div className="space-y-4 mb-6">
            <div className="border border-red-200 dark:border-red-900 p-4 rounded-lg">
              <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">Red Sea/Suez Canal Crisis</h3>
              <p className="mb-2">
                Attacks on commercial vessels in the Red Sea by Houthi militants have forced shipping companies to reroute vessels around the Cape of Good Hope, adding 7-10 days to transit times and significantly increasing costs<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('4')}} className="text-blue-500 hover:underline">[4]</a>.
              </p>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="mr-2">Impact:</span>
                <span className="flex items-center">
                  <span className="h-2 w-8 bg-gradient-to-r from-red-500 to-red-500 rounded mr-1"></span>
                  <span className="h-2 w-8 bg-gradient-to-r from-gray-300 to-gray-300 dark:from-gray-700 dark:to-gray-700 rounded mr-1"></span>
                  <span className="h-2 w-8 bg-gradient-to-r from-gray-300 to-gray-300 dark:from-gray-700 dark:to-gray-700 rounded mr-1"></span>
                  <span className="ml-2">High</span>
                </span>
              </div>
            </div>
            <div className="border border-amber-200 dark:border-amber-900 p-4 rounded-lg">
              <h3 className="font-semibold text-amber-600 dark:text-amber-400 mb-2">Panama Canal Drought</h3>
              <p className="mb-2">
                Severe drought has reduced water levels in the Panama Canal, limiting the number of vessel transits and forcing ships to reduce cargo loads to navigate through shallower waters<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('5')}} className="text-blue-500 hover:underline">[5]</a>.
              </p>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="mr-2">Impact:</span>
                <span className="flex items-center">
                  <span className="h-2 w-8 bg-gradient-to-r from-amber-500 to-amber-500 rounded mr-1"></span>
                  <span className="h-2 w-8 bg-gradient-to-r from-amber-500 to-amber-500 rounded mr-1"></span>
                  <span className="h-2 w-8 bg-gradient-to-r from-gray-300 to-gray-300 dark:from-gray-700 dark:to-gray-700 rounded mr-1"></span>
                  <span className="ml-2">Medium</span>
                </span>
              </div>
            </div>
            <div className="border border-blue-200 dark:border-blue-900 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Semiconductor Shortages</h3>
              <p className="mb-2">
                While improving from the peak shortages of 2021-2022, semiconductor supply constraints continue to affect multiple industries, particularly automotive and consumer electronics<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('6')}} className="text-blue-500 hover:underline">[6]</a>.
              </p>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span className="mr-2">Impact:</span>
                <span className="flex items-center">
                  <span className="h-2 w-8 bg-gradient-to-r from-blue-500 to-blue-500 rounded mr-1"></span>
                  <span className="h-2 w-8 bg-gradient-to-r from-blue-500 to-blue-500 rounded mr-1"></span>
                  <span className="h-2 w-8 bg-gradient-to-r from-gray-300 to-gray-300 dark:from-gray-700 dark:to-gray-700 rounded mr-1"></span>
                  <span className="ml-2">Medium</span>
                </span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Case Studies Section */}
        <section ref={(el) => {sectionRefs.current['case-studies'] = el}} id="case-studies" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Case Studies</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Ever Given Suez Canal Blockage (2021)</h3>
              <p className="mb-2">
                When the container ship Ever Given became lodged in the Suez Canal for six days in March 2021, it blocked one of the world's most vital shipping lanes, disrupting an estimated $9.6 billion worth of trade each day<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('7')}} className="text-blue-500 hover:underline">[7]</a>.
              </p>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded mb-3">
                <h4 className="font-medium mb-1">Key Impacts:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Over 400 vessels were delayed</li>
                  <li>Cost global trade approximately $400 million per hour</li>
                  <li>Created port congestion that lasted for months</li>
                  <li>Triggered insurance claims exceeding $1 billion</li>
                </ul>
              </div>
              <p>
                The incident highlighted the vulnerability of global shipping to single points of failure and accelerated efforts to diversify transportation routes.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Global Semiconductor Shortage (2020-2022)</h3>
              <p className="mb-2">
                The semiconductor shortage that began during the COVID-19 pandemic cost the global automotive industry alone an estimated $210 billion in lost revenue in 2021<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('8')}} className="text-blue-500 hover:underline">[8]</a>. Multiple factors contributed to this crisis:
              </p>
              <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded mb-3">
                <h4 className="font-medium mb-1">Contributing Factors:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Pandemic-driven surge in demand for consumer electronics</li>
                  <li>Auto manufacturers' initial cancellation of chip orders</li>
                  <li>Concentration of advanced semiconductor manufacturing in a few facilities</li>
                  <li>Extreme weather events affecting production in Texas and Japan</li>
                  <li>Fire at a major Japanese chip factory (Renesas)</li>
                </ul>
              </div>
              <p>
                This disruption has led to major strategic shifts, including increased government investments in domestic semiconductor manufacturing capacity.
              </p>
            </div>
          </div>
        </section>
        
        {/* Mitigation Strategies Section */}
        <section ref={(el) => {sectionRefs.current['mitigation'] = el}} id="mitigation" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Mitigation Strategies</h2>
          <p className="mb-4">
            Organizations are implementing various strategies to build more resilient supply chains capable of withstanding and recovering from disruptions.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="border border-gray-200 dark:border-gray-700 p-3 text-left">Strategy</th>
                  <th className="border border-gray-200 dark:border-gray-700 p-3 text-left">Description</th>
                  <th className="border border-gray-200 dark:border-gray-700 p-3 text-left">Implementation Difficulty</th>
                  <th className="border border-gray-200 dark:border-gray-700 p-3 text-left">ROI Timeline</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 p-3 font-medium">Supplier Diversification</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-3">Expanding supplier base across multiple regions to reduce dependency on single sources</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-3">Medium</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-3">Medium-term</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-200 dark:border-gray-700 p-3 font-medium">Buffer Inventory</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-3">Increasing safety stock of critical components and finished goods</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-3">Low</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-3">Immediate</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 p-3 font-medium">Nearshoring/Reshoring</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-3">Moving production closer to end markets to reduce transportation dependencies</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-3">High</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-3">Long-term</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="border border-gray-200 dark:border-gray-700 p-3 font-medium">Digital Twins & Simulation</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-3">Using digital replicas to model potential disruptions and test response strategies</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-3">High</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-3">Medium-term</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 dark:border-gray-700 p-3 font-medium">Enhanced Visibility</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-3">Implementing technologies for real-time tracking and monitoring across the supply chain</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-3">Medium</td>
                  <td className="border border-gray-200 dark:border-gray-700 p-3">Short-term</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            According to McKinsey, companies that invest in supply chain resilience can reduce disruption-related losses by up to 60%<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('9')}} className="text-blue-500 hover:underline">[9]</a>. While building resilience often requires upfront investment, the long-term benefits typically outweigh the costs.
          </p>
        </section>
        
        {/* Future Trends Section */}
        <section ref={(el) => {sectionRefs.current['future'] = el}} id="future" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Future Trends</h2>
          <p className="mb-4">
            The landscape of supply chain management is evolving rapidly in response to recent disruptions. Several key trends are expected to shape the future of supply chain resilience:
          </p>
          <div className="space-y-4 mb-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">AI-Powered Predictive Risk Management</h3>
                <p className="text-gray-600 dark:text-gray-400">Advanced AI systems will increasingly predict potential disruptions before they occur, allowing for proactive rather than reactive management<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('10')}} className="text-blue-500 hover:underline">[10]</a>.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Automation and Robotics</h3>
                <p className="text-gray-600 dark:text-gray-400">Increased automation in warehousing, transportation, and manufacturing will reduce dependency on labor and increase operational flexibility during disruptions.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Supply Chain Stress Testing</h3>
                <p className="text-gray-600 dark:text-gray-400">Similar to financial stress tests, supply chains will undergo regular simulations of extreme disruption scenarios to identify vulnerabilities<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('11')}} className="text-blue-500 hover:underline">[11]</a>.</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center text-red-600 dark:text-red-400 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Climate-Resilient Infrastructure</h3>
                <p className="text-gray-600 dark:text-gray-400">As climate change increases the frequency of extreme weather events, investment in climate-resilient ports, roads, and facilities will become a priority.</p>
              </div>
            </div>
          </div>
          <p>
            According to Deloitte's research, 82% of supply chain executives are prioritizing developing "shock-resistant" supply chains over pure efficiency as a strategic goal<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('12')}} className="text-blue-500 hover:underline">[12]</a>.
          </p>
        </section>
        
        {/* Sources Section */}
        <section ref={(el) => {sectionRefs.current['sources'] = el}} id="sources" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Sources and References</h2>
          <div className="space-y-2">
            <p ref={(el) => {sourceRefs.current['1'] = el}} id="source-1" className="text-sm">
              [1] World Economic Forum, "Supply Chain Resilience Initiative," 2024.
            </p>
            <p ref={(el) => {sourceRefs.current['2'] = el}} id="source-2" className="text-sm">
              [2] McKinsey & Company, "Global Supply Chain Disruptions: Navigating the New Normal," 2023.
            </p>
            <p ref={(el) => {sourceRefs.current['3'] = el}} id="source-3" className="text-sm">
              [3] Gartner, "Supply Chain Risk Report," 2024.
            </p>
            <p ref={(el) => {sourceRefs.current['4'] = el}} id="source-4" className="text-sm">
              [4] Maritime Security Center, "Red Sea Shipping Crisis Analysis," 2024.
            </p>
            <p ref={(el) => {sourceRefs.current['5'] = el}} id="source-5" className="text-sm">
              [5] Panama Canal Authority, "Water Level and Transit Report," 2024.
            </p>
            <p ref={(el) => {sourceRefs.current['6'] = el}} id="source-6" className="text-sm">
              [6] Semiconductor Industry Association, "Global Semiconductor Market Outlook," 2024.
            </p>
            <p ref={(el) => {sourceRefs.current['7'] = el}} id="source-7" className="text-sm">
              [7] Lloyd's Maritime Intelligence, "Ever Given Incident: Impact Assessment," 2022.
            </p>
            <p ref={(el) => {sourceRefs.current['8'] = el}} id="source-8" className="text-sm">
              [8] AlixPartners, "Global Semiconductor Shortage Analysis," 2022.
            </p>
            <p ref={(el) => {sourceRefs.current['9'] = el}} id="source-9" className="text-sm">
              [9] McKinsey & Company, "Supply Chain Resilience Report," 2023.
            </p>
            <p ref={(el) => {sourceRefs.current['10'] = el}} id="source-10" className="text-sm">
              [10] MIT Technology Review, "AI in Supply Chain Management," 2024.
            </p>
            <p ref={(el) => {sourceRefs.current['11'] = el}} id="source-11" className="text-sm">
              [11] Harvard Business Review, "Supply Chain Stress Testing in Practice," 2023.
            </p>
            <p ref={(el) => {sourceRefs.current['12'] = el}} id="source-12" className="text-sm">
              [12] Deloitte, "Supply Chain Resilience Survey," 2024.
            </p>
          </div>
        </section>
      </main>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SupplyChainDisruptions;
