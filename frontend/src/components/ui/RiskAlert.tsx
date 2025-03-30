
import React from 'react';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export type RiskLevel = 'low' | 'medium' | 'high';

interface RiskAlertProps {
  level: RiskLevel;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const RiskAlert: React.FC<RiskAlertProps> = ({
  level,
  title,
  description,
  action,
  className,
}) => {
  const getIcon = () => {
    switch (level) {
      case 'high':
        return <AlertCircle className="h-5 w-5" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5" />;
      case 'low':
        return <Info className="h-5 w-5" />;
    }
  };

  const getBgColor = () => {
    switch (level) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800 [&_svg]:text-red-600';
      case 'medium':
        return 'bg-amber-50 border-amber-200 text-amber-800 [&_svg]:text-amber-600';
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-800 [&_svg]:text-blue-600';
    }
  };

  const getActionColor = () => {
    switch (level) {
      case 'high':
        return 'text-red-600 hover:text-red-800';
      case 'medium':
        return 'text-amber-600 hover:text-amber-800';
      case 'low':
        return 'text-blue-600 hover:text-blue-800';
    }
  };

  return (
    <div
      className={cn(
        'p-4 rounded-lg flex items-start border',
        getBgColor(),
        className
      )}
    >
      <div className="mr-3 flex-shrink-0 mt-0.5">{getIcon()}</div>
      <div className="flex-1">
        <h4 className="font-medium text-sm">{title}</h4>
        <p className="text-sm mt-1 opacity-90">{description}</p>
        {action && (
          <Button
            variant="link"
            className={cn("p-0 h-auto mt-2 font-medium", getActionColor())}
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RiskAlert;
