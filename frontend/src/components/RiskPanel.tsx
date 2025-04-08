
import React from 'react';
import { AlertTriangle, Shield, AlertCircle, TrendingUp, TrendingDown, Info } from 'lucide-react';

interface RiskPanelProps {
  riskScore: number;
}

export const RiskPanel: React.FC<RiskPanelProps> = ({ riskScore }) => {
  // Hardcoded data for demo
  const riskFactors = [
    { id: 1, category: 'Geopolitical', severity: 'high', trend: 'increasing' },
    { id: 2, category: 'Economic', severity: 'medium', trend: 'stable' },
    { id: 3, category: 'Environmental', severity: 'low', trend: 'decreasing' },
    { id: 4, category: 'Operational', severity: 'high', trend: 'increasing' },
  ];

  const components = [
    { id: 1, name: 'Lithium-ion battery', risk: 85 },
    { id: 2, name: 'Display panel', risk: 67 },
    { id: 3, name: 'Microprocessor', risk: 92 },
  ];

  return (
    <div className="glass-card p-4 shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Risk Assessment</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Overall Risk Score</h3>
        <div className="flex items-center space-x-2">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold bg-gradient-to-br from-red-500 to-yellow-500 text-white shadow-lg">
            {riskScore}
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Risk level: <span className="font-medium text-red-600">High</span>
            </p>
            <p className="text-sm text-gray-500">
              Trend: <TrendingUp className="inline h-4 w-4 text-yellow-500" />
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Risk Factors</h3>
        <div className="space-y-2">
          {riskFactors.map((factor) => (
            <div key={factor.id} className="flex items-center space-x-2 p-2 rounded-md bg-white dark:bg-gray-800 shadow">
              <AlertTriangle className={`h-5 w-5 ${
                factor.severity === 'high' ? 'text-red-500' :
                factor.severity === 'medium' ? 'text-yellow-500' :
                'text-green-500'
              }`} />
              <span className="text-sm font-medium">{factor.category}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ml-auto ${
                factor.severity === 'high' ? 'bg-red-100 text-red-800' :
                factor.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'  
              }`}>
                {factor.severity}
              </span>
              <span className="text-xs text-gray-500">
                {factor.trend === 'increasing' ? <TrendingUp className="inline h-4 w-4" /> : 
                 factor.trend === 'decreasing' ? <TrendingDown className="inline h-4 w-4" /> :
                 <div className="inline-block w-4 h-4 bg-gray-400 rounded-full"></div>}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Component Risk</h3>
        <div className="space-y-2">
          {components.map((component) => (
            <div key={component.id} className="p-2 rounded-md bg-white dark:bg-gray-800 shadow">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">{component.name}</span>
                <span className="text-sm font-bold text-red-600">{component.risk}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full"
                  style={{ width: `${component.risk}%` }}  
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
