
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, ArrowRight, Clock, Ship } from "lucide-react";

interface RouteCardProps {
  origin: string;
  destination: string;
  etaStatus: "on-time" | "delayed" | "early";
  etaDays: number;
  etaHours: number;
  riskScore: number;
  volume: number;
  cost: string;
}

export function RouteCard({
  origin,
  destination,
  etaStatus,
  etaDays,
  etaHours,
  riskScore,
  volume,
  cost,
}: RouteCardProps) {
  const getStatusColor = () => {
    switch (etaStatus) {
      case "on-time":
        return "text-risk-low bg-risk-low/10 hover:bg-risk-low/20";
      case "early":
        return "text-risk-low bg-risk-low/10 hover:bg-risk-low/20";
      case "delayed":
        return "text-risk-high bg-risk-high/10 hover:bg-risk-high/20";
      default:
        return "text-primary bg-primary/10 hover:bg-primary/20";
    }
  };

  const getStatusIcon = () => {
    switch (etaStatus) {
      case "on-time":
        return <ArrowRight className="h-3 w-3 mr-1" />;
      case "early":
        return <ArrowUp className="h-3 w-3 mr-1" />;
      case "delayed":
        return <ArrowDown className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  const getRiskColor = () => {
    if (riskScore < 40) return "bg-risk-low";
    if (riskScore < 70) return "bg-risk-medium";
    return "bg-risk-high";
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>{origin} to {destination}</span>
          <Badge variant="outline" className={cn(getStatusColor(), "flex items-center")}>
            {getStatusIcon()} {etaStatus.charAt(0).toUpperCase() + etaStatus.slice(1)}
          </Badge>
        </CardTitle>
        <CardDescription>
          <div className="flex items-center">
            <Ship className="h-4 w-4 mr-1" />
            <span>Maritime Shipping • {volume.toLocaleString()} TEU</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Risk Score</span>
              <span className="font-medium">{riskScore}/100</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className={cn("h-full rounded-full", getRiskColor())} 
                style={{ width: `${riskScore}%` }} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div>
              <p className="text-xs text-muted-foreground mb-1">ETA</p>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-primary" />
                <p className="font-medium">{etaDays}d {etaHours}h</p>
              </div>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground mb-1">Cost</p>
              <p className="font-medium">{cost}</p>
            </div>
            
            <div>
              <p className="text-xs text-muted-foreground mb-1">Volume</p>
              <p className="font-medium">{volume.toLocaleString()} TEU</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
