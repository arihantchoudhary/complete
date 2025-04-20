"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  DollarSign,
  AlertTriangle,
  Clock,
  Ship,
  Globe,
} from "lucide-react";

interface ResearchDataPoint {
  title: string;
  impact: string;
  description: string;
  year: string;
  icon: React.ReactNode;
}

const researchData: Record<string, ResearchDataPoint[]> = {
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
};

export function SupplyChainResearch() {
  const [activeCategory, setActiveCategory] = useState("Tariff Impacts");

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Supply Chain Impact Research
        </h2>
        <p className="text-muted-foreground">
          Analysis of major disruptions in UAE-USA trade over 25 years
        </p>
      </div>

      <Tabs
        defaultValue="Tariff Impacts"
        className="w-full"
        onValueChange={setActiveCategory}
      >
        <TabsList className="grid w-full grid-cols-3">
          {Object.keys(researchData).map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(researchData).map(([category, data]) => (
          <TabsContent key={category} value={category} className="mt-6">
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
    </Card>
  );
}
