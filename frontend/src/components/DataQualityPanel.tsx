import React from 'react';
import { CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

export const DataQualityPanel: React.FC = () => {
  // Hardcoded data for demo
  const dataSources = [
    { id: 1, name: 'Supplier Data', status: 'valid', lastUpdated: '2025-04-02T10:30:00Z' },
    { id: 2, name: 'Shipping Logs', status: 'warning', lastUpdated: '2025-04-01T14:45:00Z' },
    { id: 3, name: 'Inventory Levels', status: 'error', lastUpdated: '2025-03-29T08:15:00Z' },
    { id: 4, name: 'Order History', status: 'valid', lastUpdated: '2025-04-02T09:00:00Z' },
  ];

  return (
    <div className="glass-card p-4 shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Data Quality Dashboard</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs uppercase text-gray-500 dark:text-gray-400 border-b">
              <th className="py-2">Data Source</th>
              <th className="py-2">Status</th>
              <th className="py-2">Last Updated</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataSources.map((source) => (
              <tr key={source.id} className="border-b last:border-0">
                <td className="py-2 font-medium">{source.name}</td>
                <td className="py-2">
                  {source.status === 'valid' ? (
                    <span className="inline-flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Valid
                    </span>
                  ) : source.status === 'warning' ? (
                    <span className="inline-flex items-center text-yellow-600">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Warning
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-red-600">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Error
                    </span>
                  )}
                </td>
                <td className="py-2 text-gray-500 dark:text-gray-400">
                  {new Date(source.lastUpdated).toLocaleString()}
                </td>
                <td className="py-2">
                  <button className="inline-flex items-center text-blue-600 hover:underline">
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
