import React, { useState, useEffect } from 'react';

export interface PersonaConfig {
  id: string;
  name: string;
  description: string;
  defaultRoute: {
    start: string;
    end: string;
  };
  visiblePanels: string[]; 
  panelOrder: string[];
  emphasisMetrics: string[];
  defaultRiskThresholds: {
    low: number;
    medium: number;
    high: number;
  };
}

const personaConfigs: PersonaConfig[] = [
  {
    id: 'supply-chain-manager',
    name: 'Supply Chain Manager',
    description: 'Overall risk assessment and route optimization',
    defaultRoute: {
      start: 'Shanghai',
      end: 'Rotterdam',
    },
    visiblePanels: ['RiskPanel', 'StatsPanel', 'PredictiveAnalyticsPanel'],
    panelOrder: ['RiskPanel', 'StatsPanel', 'PredictiveAnalyticsPanel'],
    emphasisMetrics: ['riskScore', 'routeDistance', 'routeDuration'],
    defaultRiskThresholds: {
      low: 70,
      medium: 40,
      high: 0,
    },
  },
  {
    id: 'compliance-officer',
    name: 'Compliance Officer',
    description: 'Compliance tracking and regulatory updates',
    defaultRoute: {
      start: 'Los Angeles',
      end: 'Tokyo',  
    },
    visiblePanels: ['CompliancePanel', 'RiskPanel', 'InternetIntelligencePanel'],
    panelOrder: ['CompliancePanel', 'RiskPanel', 'InternetIntelligencePanel'], 
    emphasisMetrics: ['complianceIssues', 'upcomingRegulations'],
    defaultRiskThresholds: {
      low: 80,
      medium: 50, 
      high: 0,
    },
  },
  // Add more persona configs here...
];

interface DemoControllerProps {
  onPersonaChange: (config: PersonaConfig) => void;
}

export const DemoController: React.FC<DemoControllerProps> = ({ onPersonaChange }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<PersonaConfig | null>(null);

  useEffect(() => {
    const storedPersona = localStorage.getItem('selectedPersona');
    console.log('Stored persona:', storedPersona);
    if (storedPersona) {
      const personaConfig = personaConfigs.find((config) => config.id === storedPersona);
      console.log('Persona config:', personaConfig);
      if (personaConfig) {
        setSelectedPersona(personaConfig);
        onPersonaChange(personaConfig);
      }
    }
  }, [onPersonaChange]);

  const handlePersonaChange = (persona: PersonaConfig) => {
    console.log('Selected persona:', persona);
    setSelectedPersona(persona);
    onPersonaChange(persona);
    localStorage.setItem('selectedPersona', persona.id);
  };

  const handleAdminToggle = () => {
    setIsAdminMode(!isAdminMode);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === 'a') {
        setIsAdminMode(!isAdminMode);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdminMode]);

  if (!isAdminMode) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 p-4 bg-white border-b border-gray-200 flex items-center justify-between">
      <div className="flex space-x-4">
        {personaConfigs.map((persona) => (
          <button
            key={persona.id}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedPersona?.id === persona.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => handlePersonaChange(persona)}
          >
            {persona.name}
          </button>
        ))}
      </div>
      <button
        className="px-4 py-2 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-red-600"
        onClick={handleAdminToggle}
      >
        Hide Controls
      </button>
    </div>
  );
}
