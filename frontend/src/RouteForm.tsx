
import React, { useState } from 'react';
import { Ship, Navigation, ArrowRight, Package } from 'lucide-react';

interface RouteFormProps {
  onAnalyze: (start: string, end: string, itemType: string) => void;
  isAnalyzing: boolean;
}

// Item type options
const itemTypes = [
  'Fashion', 'Electronics', 'Food', 'Automotive', 'Pharmaceuticals'
];

export const RouteForm: React.FC<RouteFormProps> = ({ onAnalyze, isAnalyzing }) => {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [selectedItemType, setSelectedItemType] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startLocation || !endLocation) {
      setError('Please enter both start and end locations');
      return;
    }
    
    setError('');
    onAnalyze(startLocation, endLocation, selectedItemType);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Route Analysis</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          {/* Start location */}
          <div className="relative">
            <label htmlFor="start-location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Origin Port / Location
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Ship className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="start-location"
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 sm:text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Dubai, UAE"
                disabled={isAnalyzing}
              />
            </div>
          </div>
          
          {/* Divider with arrow */}
          <div className="flex items-center justify-center">
            <ArrowRight className="h-5 w-5 text-gray-400" />
          </div>
          
          {/* End location */}
          <div className="relative">
            <label htmlFor="end-location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Destination Port / Location
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Navigation className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="end-location"
                type="text"
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 sm:text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., San Francisco, USA"
                disabled={isAnalyzing}
              />
            </div>
          </div>
          
          {/* Item Type Selection */}
          <div className="relative mt-4">
            <label htmlFor="item-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Item Type (Optional)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Package className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="item-type"
                value={selectedItemType}
                onChange={(e) => setSelectedItemType(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 sm:text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isAnalyzing}
              >
                <option value="">Select Item Type</option>
                {itemTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* Error message */}
        {error && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-2">{error}</p>
        )}
        
        {/* Submit button */}
        <button
          type="submit"
          className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                      ${isAnalyzing ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Route...
            </>
          ) : (
            'Analyze Route'
          )}
        </button>
        
        {/* Suggestion examples */}
        <div className="pt-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setStartLocation('Dubai');
                setEndLocation('San Francisco');
              }}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Dubai → San Francisco
            </button>
            <button
              type="button"
              onClick={() => {
                setStartLocation('Singapore');
                setEndLocation('Rotterdam');
              }}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Singapore → Rotterdam
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
