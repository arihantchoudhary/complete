
import React from 'react';
import { AlertTriangle, Shield, AlertCircle, TrendingUp, Info } from 'lucide-react';

interface RiskPanelProps {
  riskScore: number;
}

export const RiskPanel: React.FC<RiskPanelProps> = ({ riskScore }) => {
  // Determine risk level and color based on score
  const getRiskLevel = () => {
    if (riskScore < 25) return { level: 'Low', color: 'green' };
    if (riskScore < 50) return { level: 'Moderate', color: 'yellow' };
    if (riskScore < 75) return { level: 'High', color: 'orange' };
    return { level: 'Very High', color: 'red' };
  };
  
  const { level, color } = getRiskLevel();
  
  // Determine factors based on risk level (mock data)
  const getRiskFactors = () => {
    const commonFactors = [
      { icon: AlertTriangle, text: 'Geopolitical stability factors', value: riskScore > 40 ? 'Unstable' : 'Stable' },
      { icon: TrendingUp, text: 'Market volatility', value: riskScore > 30 ? 'High' : 'Low' },
      { icon: AlertCircle, text: 'Regulatory compliance', value: riskScore > 50 ? 'Complex' : 'Standard' },
    ];
    
    if (riskScore > 60) {
      commonFactors.push({ icon: Shield, text: 'Security concerns', value: 'Significant' });
    }
    
    return commonFactors;
  };
  
  const riskFactors = getRiskFactors();
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Risk Assessment</h2>
      
      {/* Risk score visualization */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Risk Score</span>
          <span className={`text-sm font-semibold ${
            color === 'green' ? 'text-green-600 dark:text-green-400' :
            color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
            color === 'orange' ? 'text-orange-600 dark:text-orange-400' :
            'text-red-600 dark:text-red-400'
          }`}>
            {level} ({riskScore}/100)
          </span>
        </div>
        
        <div className="h-2.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              color === 'green' ? 'bg-green-500' :
              color === 'yellow' ? 'bg-yellow-500' :
              color === 'orange' ? 'bg-orange-500' :
              'bg-red-500'
            }`}
            style={{ width: `${riskScore}%` }}
          ></div>
        </div>
      </div>
      
      {/* Risk factors */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Risk Factors</h3>
        
        <div className="space-y-2">
          {riskFactors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <factor.icon className={`h-4 w-4 mr-2 ${
                  factor.value === 'Unstable' || factor.value === 'High' || factor.value === 'Complex' || factor.value === 'Significant'
                    ? 'text-orange-500 dark:text-orange-400'
                    : 'text-green-500 dark:text-green-400'
                }`} />
                <span className="text-gray-700 dark:text-gray-300">{factor.text}</span>
              </div>
              <span className={`font-medium ${
                factor.value === 'Unstable' || factor.value === 'High' || factor.value === 'Complex' || factor.value === 'Significant'
                  ? 'text-orange-600 dark:text-orange-400'
                  : 'text-green-600 dark:text-green-400'
              }`}>
                {factor.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recommendation */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <Info className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Recommendation</h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-200">
              <p>
                {riskScore < 40 
                  ? "This route appears to have acceptable risk levels. Standard precautions are sufficient."
                  : riskScore < 70
                    ? "Additional documentation and insurance recommended. Review compliance requirements."
                    : "Consider alternative routes or enhanced security measures. Full risk assessment advised before proceeding."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
