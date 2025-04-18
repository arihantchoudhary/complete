import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, AlertTriangle, Clock, FileText } from 'lucide-react';

interface TariffInfo {
  tariff_rate: number;
  additional_fees: Array<{ name: string; rate: number }>;
  trade_agreements: string[];
  recent_changes: string;
  future_changes: string;
  last_updated: string;
  error?: string;
}

interface TariffPanelProps {
  origin: string;
  destination: string;
  itemType: string;
  hsCode?: string;
}

export const TariffPanel: React.FC<TariffPanelProps> = ({ origin, destination, itemType, hsCode }) => {
  const [tariffData, setTariffData] = useState<TariffInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTariffData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // For local testing without API calls, use the mock endpoint
        // In production, this would be the real endpoint
        const useMockData = !process.env.USE_REAL_API;
        
        let url = useMockData 
          ? '/api/mock-tariffs'
          : `/api/tariffs?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&item_type=${encodeURIComponent(itemType)}`;
          
        if (hsCode && !useMockData) {
          url += `&hs_code=${encodeURIComponent(hsCode)}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          setError(data.error);
          setTariffData(null);
        } else {
          setTariffData(data);
        }
      } catch (err) {
        console.error('Error fetching tariff data:', err);
        setError('Failed to fetch tariff information. Using estimated data instead.');
        
        // Fallback to mock data on error
        setTariffData({
          tariff_rate: Math.floor(Math.random() * 20) + 5,
          additional_fees: [
            { name: "Processing Fee", rate: 0.5 }
          ],
          trade_agreements: ["Estimated data"],
          recent_changes: "Unable to fetch latest changes",
          future_changes: "Unable to fetch predictions",
          last_updated: new Date().toISOString().split('T')[0]
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTariffData();
  }, [origin, destination, itemType, hsCode]);

  if (loading) {
    return (
      <div className="glass-panel rounded-lg p-4 border border-gray-200 dark:border-gray-800 animate-pulse">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Loading Tariff Information...
        </h3>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error && !tariffData) {
    return (
      <div className="glass-panel rounded-lg p-4 border border-red-200 dark:border-red-900">
        <div className="flex items-center mb-3">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Tariff Information Unavailable
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-lg p-4 border border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Real-Time Tariff Information
        </h3>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Clock className="h-3 w-3 mr-1" />
          <span>Updated: {tariffData?.last_updated || 'Unknown'}</span>
        </div>
      </div>

      {error && (
        <div className="mb-3 p-2 bg-amber-50 dark:bg-amber-900/20 rounded text-xs text-amber-800 dark:text-amber-400">
          <div className="flex items-center">
            <AlertTriangle className="h-3 w-3 mr-1 flex-shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Main tariff rate */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel rounded-lg p-3 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-2 bg-green-50 dark:bg-green-900/20 rounded-md">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tariff Rate</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {tariffData?.tariff_rate}%
                </p>
              </div>
            </div>
          </div>
          
          <div className="glass-panel rounded-lg p-3 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <FileText className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">HS Code</p>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {hsCode || '—'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional fees and trade agreements */}
        <div className="glass-panel rounded-lg p-4 border border-gray-200 dark:border-gray-800">
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Additional Fees & Taxes
          </h4>
          
          <div className="space-y-2 mb-3">
            {tariffData?.additional_fees && tariffData.additional_fees.length > 0 ? (
              tariffData.additional_fees.map((fee, index) => (
                <div key={index} className="flex justify-between items-center pb-1 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-xs text-gray-600 dark:text-gray-400">{fee.name}</span>
                  <span className="text-xs font-medium text-gray-900 dark:text-gray-100">
                    {fee.rate}%
                  </span>
                </div>
              ))
            ) : (
              <div className="text-xs text-gray-600 dark:text-gray-400">No additional fees found</div>
            )}
          </div>
          
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 mt-4">
            Applicable Trade Agreements
          </h4>
          
          <div className="flex flex-wrap gap-2">
            {tariffData?.trade_agreements && tariffData.trade_agreements.length > 0 ? (
              tariffData.trade_agreements.map((agreement, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                >
                  {agreement}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-600 dark:text-gray-400">No trade agreements found</span>
            )}
          </div>
        </div>

        {/* Recent and future changes */}
        <div className="glass-panel rounded-lg p-4 border border-gray-200 dark:border-gray-800">
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Recent Policy Changes
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
            {tariffData?.recent_changes || 'No recent changes reported'}
          </p>
          
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
            Predicted Future Changes
          </h4>
          <div className="flex items-start">
            <TrendingUp className="h-4 w-4 text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {tariffData?.future_changes || 'No future changes predicted'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TariffPanel;
