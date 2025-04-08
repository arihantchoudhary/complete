import React from 'react';
import { Globe, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export const InternetIntelligencePanel: React.FC = () => {
  // Hardcoded data for demo
  const newsFeed = [
    {
      id: 1,
      title: 'Port of Shanghai Faces Congestion Amid COVID-19 Lockdowns',
      sentiment: 'negative',
      url: 'https://example.com/news/shanghai-port-congestion',
      date: '2025-04-02',
    },
    {
      id: 2,
      title: 'Electronics Suppliers in Taiwan Report Record Profits',
      sentiment: 'positive',
      url: 'https://example.com/news/taiwan-electronics-profits',
      date: '2025-04-01',
    },
    {
      id: 3,  
      title: 'New Environmental Regulations Proposed for Shipping Industry',
      sentiment: 'neutral',
      url: 'https://example.com/news/shipping-environmental-regulations',
      date: '2025-03-28',
    },
  ];

  return (
    <div className="glass-card p-4 shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Internet Intelligence</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 flex items-center">
          <Globe className="h-5 w-5 mr-2 text-blue-500" />
          Supply Chain News Feed
        </h3>
        
        <div className="space-y-4">
          {newsFeed.map((item) => (
            <div key={item.id} className="p-4 rounded-md bg-white dark:bg-gray-800 shadow">
              <div className="flex justify-between items-center mb-2">
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  {item.title}
                </a>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                    item.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'  
                  }`}>
                    {item.sentiment}
                  </span>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.sentiment === 'positive' ? (
                  <span className="mr-1">
                    <TrendingUp className="inline h-4 w-4 text-green-500" />
                  </span>
                ) : item.sentiment === 'negative' ? (
                  <span className="mr-1">
                    <AlertTriangle className="inline h-4 w-4 text-red-500" />  
                  </span>
                ) : null}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et leo et quam ultricies tincidunt sit amet ut neque.
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Regulatory Updates</h3>
        
        <div className="space-y-2">
          <div className="p-3 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  New Import Tariffs on Electronics
                </h4>
                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <p>Effective 2025-07-01, import tariffs on electronic components will increase by 15%. Potential impact on supply chains involving China, South Korea, and Japan.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 rounded-md bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-green-800 dark:text-green-200">
                  Expedited Customs Clearance for Medical Supplies
                </h4>
                <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                  <p>New regulations allow for expedited customs clearance of critical medical supplies. Potential opportunity to optimize supply chains for healthcare industry.</p>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
