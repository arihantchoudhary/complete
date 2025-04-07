
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type MetricChangeType = 'positive' | 'negative' | 'neutral';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string | number;
    type: MetricChangeType;
  };
  icon?: React.ReactNode;
  className?: string;
  tooltip?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  icon,
  className,
  tooltip
}) => {
  const renderChangeIcon = (type: MetricChangeType) => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="h-4 w-4" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4" />;
      case 'neutral':
        return <Minus className="h-4 w-4" />;
    }
  };

  const getChangeColor = (type: MetricChangeType) => {
    switch (type) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      case 'neutral':
        return 'text-gray-600';
    }
  };

  return (
    <Card className={cn("metric-card", className)} title={tooltip}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && <div className="text-indigo-600">{icon}</div>}
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className={cn("flex items-center mt-1 text-sm", getChangeColor(change.type))}>
            {renderChangeIcon(change.type)}
            <span className="ml-1">{change.value}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
