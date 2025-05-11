"use client";

import { ClientLayout } from "@/components/client-layout";
import Hero from "@/components/hero";
import SupplyChainFlow from "@/components/supply-chain-flow";
import SupplyChainLifecycle from "@/components/supply-chain-lifecycle";
import HSCodeExplanation from "@/components/hs-code-explanation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function Home() {
  return (
    <ClientLayout>
      <div className="min-h-screen">
        <div className="flex flex-col gap-6 overflow-auto">
          {/* Hero Section */}
          <Hero />

          {/* How It Works Section */}
          <SupplyChainFlow />

          {/* Supply Chain Lifecycle Section */}
          <SupplyChainLifecycle />

          {/* HS Code Explanation Section */}
          <HSCodeExplanation />

          {/* Microsoft Logo */}
          <div className="w-full max-w-4xl mx-auto mt-12">
            <p className="text-center text-sm text-muted-foreground mb-4">
              Trusted by industry leaders
            </p>
            <div className="flex justify-center">
              <div className="grayscale hover:grayscale-0 transition-all">
                <Image
                  src="/logos/microsoft.svg"
                  alt="Microsoft"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
            </div>
          </div>

          {/* Partners & Accreditations */}
          <div className="w-full max-w-4xl mx-auto pt-16 pb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Our Partners & Accreditations</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We collaborate with leading organizations to provide the best supply chain solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Stanford */}
              <Card className="flex flex-col overflow-hidden transition-all group">
                <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
                  <Image
                    src="/logos/stanford.svg"
                    alt="Stanford"
                    width={160}
                    height={40}
                    className="max-h-16 w-auto grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Research partnership with Stanford University Supply Chain Initiative
                  </p>
                </CardContent>
              </Card>

              {/* Microsoft */}
              <Card className="flex flex-col overflow-hidden transition-all group">
                <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
                  <Image
                    src="/logos/microsoft.svg"
                    alt="Microsoft"
                    width={160}
                    height={40}
                    className="max-h-16 w-auto grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Microsoft for Startups member with cloud and AI resources
                  </p>
                </CardContent>
              </Card>

              {/* Placeholder for future partner */}
              <Card className="flex flex-col overflow-hidden transition-all group">
                <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">SC</span>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Supply Chain Risk Management Association certified analytics provider
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-primary/5 py-16">
            <div className="max-w-4xl mx-auto text-center px-6">
              <h2 className="text-3xl font-bold mb-4">
                Ready to optimize your supply chain?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Try our interactive demo to see how our tools can help you analyze shipping documents and assess risks.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/demo">Try Interactive Demo</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/report">View Sample Report</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-blue-50" asChild>
                  <Link href="/world-ports">Explore World Ports Map</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
