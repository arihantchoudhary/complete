"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Supply Chain Document Analysis
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-3xl mx-auto">
            Upload your supply chain documents and get instant insights. We support Bill of Lading (B/L),
            Packing Lists, and Commercial Invoices.
          </p>
          <div className="mt-10 flex items-center justify-center gap-6">
            <Button size="lg" asChild>
              <Link href="/demo">
                <Upload className="mr-2 h-4 w-4" />
                Try Demo
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/map-chat">
                Interactive Map
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
