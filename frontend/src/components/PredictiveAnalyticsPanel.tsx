import React from 'react';
import { BarChart2, TrendingUp, AlertTriangle } from 'lucide-react';

export const PredictiveAnalyticsPanel: React.FC = () => {
  // Hardcoded data for demo
  const disruptionForecast = [
    { id: 1, month: 'Apr', severity: 'high', reason: 'Port Congestion' },
    { id: 2, month: 'May', severity: 'medium', reason: 'Labor Strike' }, 
    { id: 3, month: 'Jun', severity: 'low', reason: 'Monsoon Season' },
    { id: 4, month: 'Jul', severity: 'high', reason: 'Hurricane Season' },
    { id: 5, month: 'Aug', severity: 'medium', reason: 'Supplier Bankruptcy' },
    { id: 6, month: 'Sep', severity: 'low', reason: 'Demand Slowdown' },
  ];

  return (
    <div className="glass-card p-4 shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Predictive Analytics</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-blue-500" /> 
          Disruption Forecast (Next 6 Months)
        </h3>
        
        <div className="space-y-2">
          {disruptionForecast.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-2 rounded-md bg-white dark:bg-gray-800 shadow">
              <div className="flex-shrink-0 w-12 text-center">
                <div className="text-xs uppercase text-gray-500 font-semibold">{item.month}</div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.reason}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.severity === 'high' ? 'bg-red-100 text-red-800' :
                    item.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.severity}
                  </span>
                </div>
                <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      item.severity === 'high' ? 'bg-red-500' :
                      item.severity === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${
                      item.severity === 'high' ? '90%' :
                      item.severity === 'medium' ? '60%' : 
                      '30%'
                    }` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2 flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
          Cost Impact Analysis
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase text-gray-500 dark:text-gray-400 border-b">
                <th className="py-2">Route</th>
                <th className="py-2">Baseline</th>
                <th className="py-2">Predicted</th>
                <th className="py-2">Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b last:border-0">
                <td className="py-2">Shanghai - Rotterdam</td>
                <td className="py-2">$12,500</td>
                <td className="py-2">$18,750</td>
                <td className="py-2 font-medium text-red-600">+$6,250 (+50%)</td>
              </tr>
              <tr className="border-b last:border-0">
                <td className="py-2">Los Angeles - Tokyo</td>
                <td className="py-2">$8,200</td>
                <td className="py-2">$9,840</td>
                <td className="py-2 font-medium text-yellow-600">+$1,640 (+20%)</td>
              </tr>
              <tr className="border-b last:border-0">
                <td className="py-2">Hamburg - Singapore</td>
                <td className="py-2">$14,300</td>
                <td className="py-2">$15,730</td>
                <td className="py-2 font-medium text-green-600">+$1,430 (+10%)</td>  
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
