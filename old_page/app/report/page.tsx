"use client";

import React from "react";
import { ClientLayout } from "@/components/client-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  BarChart,
  DollarSign,
  Globe,
  Ship,
  Clock,
  Waves,
  Cloud,
  Shield,
  Briefcase,
} from "lucide-react";

interface ImpactData {
  title: string;
  impact: string;
  description: string;
  year: string;
  icon: React.ReactNode;
}

const impactData: Record<string, ImpactData[]> = {
  "Tariff Impacts": [
    {
      title: "U.S. Metal Tariffs",
      impact: "$750M - $1B Loss",
      description:
        "Ford and GM reported significant revenue drops due to steel and aluminum tariffs affecting UAE imports",
      year: "2018",
      icon: <DollarSign className="h-6 w-6" />,
    },
    {
      title: "Agricultural Export Impact",
      impact: "$380M Loss",
      description:
        "American pistachio growers faced losses due to retaliatory tariffs affecting UAE market",
      year: "2018-2019",
      icon: <BarChart className="h-6 w-6" />,
    },
  ],
  "Port Congestion": [
    {
      title: "West Coast Port Crisis",
      impact: "$2B/day Loss",
      description:
        "Port disruptions cost the U.S. economy up to $2 billion per day at peak congestion",
      year: "2014-2015",
      icon: <Ship className="h-6 w-6" />,
    },
    {
      title: "Container Backlog",
      impact: "$15.7B Loss",
      description:
        "U.S. containerized exports fell 24.5%, resulting in massive export sales losses",
      year: "2021",
      icon: <AlertTriangle className="h-6 w-6" />,
    },
  ],
  "Geopolitical Events": [
    {
      title: "Red Sea Conflict",
      impact: "59% Profit Drop",
      description:
        "DP World's profit fell from $651M to $265M due to shipping disruptions",
      year: "2023-2024",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      title: "Suez Canal Blockage",
      impact: "$416M/hour Loss",
      description:
        "Ever Given incident caused massive trade disruption affecting UAE-USA routes",
      year: "2021",
      icon: <Clock className="h-6 w-6" />,
    },
  ],
  "Climate & Weather": [
    {
      title: "Hurricane Impact",
      impact: "$5B/day Risk",
      description:
        "Combined disruption of major hurricane and port strike could cost economy $5B daily",
      year: "2024",
      icon: <Cloud className="h-6 w-6" />,
    },
    {
      title: "Gulf Tensions",
      impact: "$15B/month Risk",
      description:
        "Potential losses if Strait of Hormuz shipping lanes face major disruption",
      year: "2019",
      icon: <Waves className="h-6 w-6" />,
    },
  ],
  "Security & Compliance": [
    {
      title: "Post-9/11 Changes",
      impact: "24hr+ Delays",
      description:
        "New security measures caused significant cargo screening delays and compliance costs",
      year: "2001-2002",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      title: "Supply Chain Visibility",
      impact: "94% Blind Spots",
      description:
        "Only 6% of companies claim full visibility over their supply chain operations",
      year: "2023",
      icon: <Briefcase className="h-6 w-6" />,
    },
  ],
};

export default function ReportPage() {
  return (
    <ClientLayout>
      <div className="container mx-auto px-4 pt-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Advancing Your Supply Chain to 2030
          </h1>
          <p className="text-xl text-muted-foreground">
            AI-Driven Solutions for UAE-USA Trade
          </p>
        </div>

        <div className="grid gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Executive Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Over the past 25 years, UAE-USA trade has faced significant
                disruptions from tariffs, port congestion, geopolitical events,
                and climate challenges. Traditional reactive approaches have led
                to billions in losses, while modern AI-driven solutions offer
                proactive risk management and cost optimization.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Financial Impacts</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="Tariff Impacts" className="w-full">
                <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full">
                  {Object.keys(impactData).map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {Object.entries(impactData).map(([category, data]) => (
                  <TabsContent key={category} value={category}>
                    <div className="grid gap-6 md:grid-cols-2">
                      {data.map((item, index) => (
                        <Card
                          key={index}
                          className="p-4 hover:bg-accent transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                              {item.icon}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{item.title}</h3>
                                <span className="text-sm text-muted-foreground">
                                  ({item.year})
                                </span>
                              </div>
                              <p className="text-lg font-bold text-primary mt-1">
                                {item.impact}
                              </p>
                              <p className="text-sm text-muted-foreground mt-2">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>AI-Driven Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Real-Time Monitoring</h3>
                  <p className="text-sm text-muted-foreground">
                    AI systems continuously track tariffs, weather, geopolitical
                    events, and port conditions to predict and prevent
                    disruptions before they impact operations.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Route Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced algorithms suggest alternative routes and transport
                    modes in response to predicted disruptions, minimizing
                    delays and costs.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Risk Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    Machine learning models evaluate multiple risk factors to
                    provide comprehensive supply chain vulnerability assessments
                    and mitigation strategies.
                  </p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Cost Forecasting</h3>
                  <p className="text-sm text-muted-foreground">
                    Predictive analytics calculate potential financial impacts
                    of disruptions and compare costs of different mitigation
                    strategies.
                  </p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ClientLayout>
  );
}
