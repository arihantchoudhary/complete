
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { Globe, TrendingUp, TrendingDown, CloudRain, Flag, Anchor } from "lucide-react";

interface RiskScorecardProps {
  title: string;
  score: number;
  trend: "up" | "down" | "stable";
  type: "low" | "medium" | "high";
  description?: string;
  category?: "geopolitical" | "port" | "weather" | "economic";
}

export function RiskScorecard({ title, score, trend, type, description, category = "geopolitical" }: RiskScorecardProps) {
  const getBgColor = () => {
    switch (type) {
      case "low":
        return "bg-risk-low/10 text-risk-low";
      case "medium":
        return "bg-risk-medium/10 text-risk-medium";
      case "high":
        return "bg-risk-high/10 text-risk-high";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "low":
        return "border-risk-low/30";
      case "medium":
        return "border-risk-medium/30";
      case "high":
        return "border-risk-high/30";
      default:
        return "border-primary/30";
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return (
          <TrendingUp className="h-4 w-4 text-risk-high" />
        );
      case "down":
        return (
          <TrendingDown className="h-4 w-4 text-risk-low" />
        );
      default:
        return (
          <svg className="h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        );
    }
  };

  const getCategoryIcon = () => {
    switch (category) {
      case "geopolitical":
        return <Flag className="h-4 w-4 mr-2" />;
      case "port":
        return <Anchor className="h-4 w-4 mr-2" />;
      case "weather":
        return <CloudRain className="h-4 w-4 mr-2" />;
      case "economic":
        return <TrendingUp className="h-4 w-4 mr-2" />;
      default:
        return <Globe className="h-4 w-4 mr-2" />;
    }
  };

  // Ensure score is a valid number between 0-100
  const formattedScore = Math.min(Math.max(Math.round(score), 0), 100);

  return (
    <Card className={cn("border", getBorderColor(), "hover-scale")}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          {getCategoryIcon()}
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className={cn("text-2xl font-bold px-3 py-1 rounded-md", getBgColor())}>
            {formattedScore}%
          </div>
          <div className="flex items-center gap-1">
            {getTrendIcon()}
            <span className={cn(
              trend === "up" ? "text-risk-high" : 
              trend === "down" ? "text-risk-low" : 
              "text-muted-foreground"
            )}>
              {trend === "up" ? "Increasing" : trend === "down" ? "Decreasing" : "Stable"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
