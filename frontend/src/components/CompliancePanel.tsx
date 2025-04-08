import React from 'react';
import { CheckCircle, AlertTriangle, Calendar } from 'lucide-react';

export const CompliancePanel: React.FC = () => {
  // Hardcoded data for demo
  const complianceIssues = [
    { id: 1, title: 'Missing customs form 123', severity: 'high', status: 'open' },
    { id: 2, title: 'Expired supplier certification', severity: 'medium', status: 'resolved' },
    { id: 3, title: 'Incomplete safety documentation', severity: 'low', status: 'open' },
  ];

  const upcomingRegulations = [
    { id: 1, title: 'New import restrictions on electronic components', deadline: '2025-06-01' },
    { id: 2, title: 'Updated labor standards for textile suppliers', deadline: '2025-07-15' },
  ];

  return (
    <div className="glass-card p-4 shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Compliance Tracker</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Compliance Issues</h3>
        <div className="space-y-2">
          {complianceIssues.map((issue) => (
            <div key={issue.id} className="flex items-center space-x-2 p-2 rounded-md bg-white dark:bg-gray-800 shadow">
              {issue.status === 'open' ? (
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              <span className="text-sm">{issue.title}</span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ml-auto ${
                issue.severity === 'high' ? 'bg-red-100 text-red-800' :
                issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-green-100 text-green-800'
              }`}>
                {issue.severity}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Upcoming Regulations</h3>
        <div className="space-y-2">
          {upcomingRegulations.map((reg) => (
            <div key={reg.id} className="flex items-center space-x-2 p-2 rounded-md bg-white dark:bg-gray-800 shadow">
              <Calendar className="h-5 w-5 text-blue-500" />
              <span className="text-sm">{reg.title}</span>
              <span className="text-xs text-gray-500 ml-auto">{reg.deadline}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
