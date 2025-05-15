
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <Card className="border bg-card/50 hover:bg-card/80 transition-colors duration-300 h-full">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
