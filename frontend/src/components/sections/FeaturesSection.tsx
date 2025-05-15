
import { 
  AlertTriangle,
  BarChart2,
  Globe,
  Plug
} from "lucide-react";
import { FeatureCard } from "@/components/FeatureCard";

const features = [
  {
    title: "Real-time Alerts",
    description: "Receive instant notifications about emerging risks across your global trade routes, enabling proactive decision-making before disruptions occur.",
    icon: AlertTriangle
  },
  {
    title: "Risk Intelligence",
    description: "AI-powered analysis of geopolitical, economic, weather, and social factors to predict potential supply chain disruptions with high accuracy.",
    icon: BarChart2
  },
  {
    title: "Route Visualization",
    description: "Interactive mapping of global trade routes with color-coded risk indicators, allowing for intuitive monitoring of worldwide logistics operations.",
    icon: Globe
  },
  {
    title: "API Integration",
    description: "Seamlessly connect LogiTrade with your existing systems through our robust API, ensuring data consistency across your entire tech stack.",
    icon: Plug
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/40">
      <div className="container px-4 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Powerful Features for Global Trade Risk Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform offers the tools you need to navigate the complexities of global trade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
