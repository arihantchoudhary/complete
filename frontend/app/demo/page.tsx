"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import DocumentAnalyzer from "@/components/document-analyzer";
import RouteMap from "@/components/route-map";
import RiskAssessment from "@/components/risk-assessment";
import DocumentVerification from "@/components/document-verification";

export default function DemoPage() {
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzed(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-8">
            Document Analysis Demo
          </h1>
          
          {!isAnalyzed ? (
            <DocumentAnalyzer onAnalyze={handleAnalyze} />
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              <RouteMap />
              <RiskAssessment />
              <DocumentVerification />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
