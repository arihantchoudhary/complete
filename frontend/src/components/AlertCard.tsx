
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface AlertCardProps {
  title: string;
  region: string;
  severity: "low" | "medium" | "high";
  time: string;
  description: string;
}

export function AlertCard({ title, region, severity, time, description }: AlertCardProps) {
  const getSeverityColor = () => {
    switch (severity) {
      case "low":
        return "text-risk-low bg-risk-low/10 hover:bg-risk-low/20";
      case "medium":
        return "text-risk-medium bg-risk-medium/10 hover:bg-risk-medium/20";
      case "high":
        return "text-risk-high bg-risk-high/10 hover:bg-risk-high/20";
      default:
        return "text-primary bg-primary/10 hover:bg-primary/20";
    }
  };

  const getBorderColor = () => {
    switch (severity) {
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

  return (
    <Card className={cn("border", getBorderColor())}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <Badge variant="outline" className={cn(getSeverityColor())}>
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
          </Badge>
        </div>
        <CardDescription>{region} • {time}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
