"use client";

import { useState } from "react";
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
import {
  ArrowRight,
  Brain,
  Shield,
  Target,
  TrendingUp,
  MapPin,
  Globe,
  Lightbulb,
  Users,
  BarChart,
  Rocket,
  Phone,
} from "lucide-react";
import { ClientLayout } from "@/components/client-layout";

export default function Home() {
  return (
    <ClientLayout>
      <div className="min-h-screen pt-16 bg-gradient-to-b from-background to-background/95">
        <div className="flex flex-col gap-6 p-6 overflow-auto">
          {/* Hero Panel */}
          <Card className="w-full max-w-4xl mx-auto relative overflow-hidden group shadow-2xl hover:shadow-primary/20 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex flex-col items-center text-center p-12 space-y-8">
              <div className="space-y-4">
                <h2 className="text-5xl font-semibold leading-tight">
                  Upgrade Your Supply Chain with AI Agents
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Deploy intelligent agents that monitor, analyze, and optimize
                  your supply chain 24/7
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-primary/20 transition-all"
                  onClick={() => window.location.href = '/demo'}
                  asChild
                >
                  <Link href="/demo">
                    Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 shadow-lg hover:shadow-primary/20 transition-all"
                  onClick={() => window.location.href = '/report'}
                  asChild
                >
                  <Link href="/report">
                    Report
                  </Link>
                </Button>
                
                <Button
                  size="lg"
                  variant="secondary"
                  className="shadow-lg transition-all"
                  onClick={() => window.location.href = 'tel:+12087478900'}
                  asChild
                >
                  <a href="tel:+12087478900">
                    <Phone className="mr-2 h-5 w-5" />
                    Call
                  </a>
                </Button>
              </div>
            </div>
          </Card>

          {/* Microsoft Logo */}
          <div className="w-full max-w-4xl mx-auto">
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

          {/* Feature Cards */}
          <div className="flex gap-6 mt-6 pb-12 overflow-x-auto">
            {[
              {
                title: "AI-Powered Risk Prediction",
                description:
                  "Transform supply chain management with predictive analytics",
                icon: Brain,
                details: [
                  {
                    icon: Shield,
                    text: "Predict and prevent supply chain disruptions",
                  },
                  {
                    icon: Target,
                    text: "Real-time geopolitical and climate risk tracking",
                  },
                  {
                    icon: TrendingUp,
                    text: "$1.5T annual cost reduction potential",
                  },
                ],
                market: "$3.48B Supply Chain Risk Management",
              },
              {
                title: "Interactive Trade Route Mapping",
                description: "Visualize and optimize your global supply chain",
                icon: MapPin,
                details: [
                  {
                    icon: Globe,
                    text: "Customizable trade routes across land, sea, and air",
                  },
                  {
                    icon: Lightbulb,
                    text: "Intuitive map-first UI with risk modeling",
                  },
                  {
                    icon: Users,
                    text: "Collaborative planning tools for teams",
                  },
                ],
                market: "$8.4B AI in Logistics Market",
              },
              {
                title: "Comprehensive Analytics",
                description:
                  "Data-driven insights for informed decision making",
                icon: BarChart,
                details: [
                  {
                    icon: Rocket,
                    text: "Customizable reports and targeted predictions",
                  },
                  {
                    icon: Brain,
                    text: "Advanced AI models for risk scoring",
                  },
                  {
                    icon: TrendingUp,
                    text: "Proactive disruption prevention",
                  },
                ],
                market: "$25.2M SOM by 2026",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="h-auto min-h-[600px] w-[400px] flex-shrink-0 group hover:border-primary transition-all relative overflow-hidden shadow-xl hover:shadow-primary/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                  <CardDescription className="text-lg">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {feature.details.map((detail, j) => (
                      <div
                        key={j}
                        className="flex items-start gap-4 group/item"
                      >
                        <div className="h-8 w-8 rounded-lg bg-primary/5 flex items-center justify-center group-hover/item:bg-primary/10 transition-colors shadow-md">
                          <detail.icon className="h-4 w-4 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1.5">
                          {detail.text}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm font-medium text-muted-foreground">
                      Market Size
                    </p>
                    <p className="text-lg font-semibold mt-1">
                      {feature.market}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Supply Chain Process & Key Risk Areas */}
          <div className="w-full max-w-6xl mx-auto pt-16 pb-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Supply Chain Process & Key Risk Areas</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Understanding the end-to-end supply chain and its vulnerabilities
              </p>
            </div>
            
            {/* Process Stages */}
            <Card className="mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">1. Process Stages</CardTitle>
                <CardDescription>
                  The end-to-end supply chain is typically divided into five core stages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-primary/10">
                        <th className="p-3 text-left border">Stage</th>
                        <th className="p-3 text-left border">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border font-medium">Suppliers</td>
                        <td className="p-3 border">Raw-material sourcing and procurement</td>
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Logistics</td>
                        <td className="p-3 border">Transportation of parts/materials to warehouses</td>
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Inventory</td>
                        <td className="p-3 border">Warehousing, storage, and stock management</td>
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Manufacturing</td>
                        <td className="p-3 border">Conversion of parts into finished goods</td>
                      </tr>
                      <tr>
                        <td className="p-3 border font-medium">Customer</td>
                        <td className="p-3 border">Delivery to and fulfillment for end users</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
            
            {/* Risk & Performance Issues */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Upstream Risks */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">2. Upstream Risks</CardTitle>
                  <CardDescription>
                    Top-row issues and their impacts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-primary/10">
                          <th className="p-2 text-left border">Stage</th>
                          <th className="p-2 text-left border">Top‐row Issue</th>
                          <th className="p-2 text-left border">Impact</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr>
                          <td className="p-2 border font-medium">Suppliers</td>
                          <td className="p-2 border">Price variances</td>
                          <td className="p-2 border">Budget overruns, margin erosion</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-medium"></td>
                          <td className="p-2 border">Supplier issues</td>
                          <td className="p-2 border">Quality defects, delayed shipments</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-medium">Logistics</td>
                          <td className="p-2 border">Order delays</td>
                          <td className="p-2 border">Missed production schedules</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-medium"></td>
                          <td className="p-2 border">Logistic bottlenecks</td>
                          <td className="p-2 border">Congestion, higher freight costs</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-medium">Inventory</td>
                          <td className="p-2 border">Part stock-outs</td>
                          <td className="p-2 border">Line stoppages, expedited freight fees</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-medium"></td>
                          <td className="p-2 border">Excess inventory</td>
                          <td className="p-2 border">Increased holding costs, obsolescence</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-medium">Manufacturing</td>
                          <td className="p-2 border">Schedule conflicts</td>
                          <td className="p-2 border">Under-or over-utilized capacity</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-medium"></td>
                          <td className="p-2 border">Unplanned downtime</td>
                          <td className="p-2 border">Yield losses, overtime expenses</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-medium">Customer</td>
                          <td className="p-2 border">Poor OTIF (On-Time In-Full)</td>
                          <td className="p-2 border">Customer dissatisfaction, penalties</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-medium"></td>
                          <td className="p-2 border">Order cancellations</td>
                          <td className="p-2 border">Demand-supply mismatch, lost revenue</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              {/* Downstream Risks */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">2. Downstream Risks</CardTitle>
                  <CardDescription>
                    Bottom-row issues and their impacts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-primary/10">
                          <th className="p-2 text-left border">Stage</th>
                          <th className="p-2 text-left border">Bottom-row Issue</th>
                          <th className="p-2 text-left border">Impact</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        <tr>
                          <td className="p-2 border font-medium">Suppliers</td>
                          <td className="p-2 border">Supplier issues</td>
                          <td className="p-2 border">(same as above)</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-medium">Logistics</td>
                          <td className="p-2 border">Logistic bottlenecks</td>
                          <td className="p-2 border">(same as above)</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-medium">Inventory</td>
                          <td className="p-2 border">Excess inventory</td>
                          <td className="p-2 border">(same as above)</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-medium">Manufacturing</td>
                          <td className="p-2 border">Unplanned downtime</td>
                          <td className="p-2 border">(same as above)</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-medium">Logistics→Customer</td>
                          <td className="p-2 border">Transit delays</td>
                          <td className="p-2 border">Delivery tardiness, stockouts at point of sale</td>
                        </tr>
                        <tr>
                          <td className="p-2 border font-medium">Customer</td>
                          <td className="p-2 border">Demand uncertainties</td>
                          <td className="p-2 border">Forecast errors, bullwhip effect</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Interdependencies */}
            <Card className="mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">3. Summary of Interdependencies</CardTitle>
                <CardDescription>
                  How risks cascade through the supply chain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-muted-foreground">
                  <p>Supplier fluctuations (price & availability) cascade into logistics and inventory, leading to production hiccups.</p>
                  <p>Logistic bottlenecks increase lead times, forcing either excess inventory or stock-outs.</p>
                  <p>Inventory imbalances drive schedule conflicts and downtime on the shop floor.</p>
                  <p>Finally, manufacturing delays and transit issues degrade OTIF, resulting in order cancellations or customer churn.</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Pricing Plans */}
          <div className="w-full max-w-6xl mx-auto pt-16 pb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Flexible AI Solutions for Your Supply Chain</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                You only pay for the hours your AI agent is active. Start with our free tools or scale with intelligent automation.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Tier */}
              <Card className="flex flex-col border-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-500"></div>
                <CardHeader>
                  <CardTitle className="text-xl">Free Tools</CardTitle>
                  <CardDescription className="text-2xl font-bold mt-2">$0</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-6">
                    Essential tools to optimize your supply chain manually
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Route Visualization</p>
                        <p className="text-sm text-muted-foreground">Compare trade routes by time, cost, and risk</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Tariff Checker</p>
                        <p className="text-sm text-muted-foreground">Check current tariffs using HS code or product name</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-green-100 p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Supplier Finder</p>
                        <p className="text-sm text-muted-foreground">Find suppliers and their public contact information</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-4 border-t">
                  <Button className="w-full" variant="outline">Get Started Free</Button>
                </CardFooter>
              </Card>
              
              {/* Pro Tier */}
              <Card className="flex flex-col border-2 border-primary relative overflow-hidden scale-105 shadow-xl z-10">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>
                <CardHeader>
                  <CardTitle className="text-xl">Pro Agent</CardTitle>
                  <CardDescription className="text-2xl font-bold mt-2">From $29/mo</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-6">
                    AI-powered automation with real-time monitoring
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="rounded-full bg-primary/20 p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Intelligent Route Optimization</p>
                        <p className="text-sm text-muted-foreground">Real-time shipment tracking and alternative routing</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-primary/20 p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Automated Tariff Monitoring</p>
                        <p className="text-sm text-muted-foreground">Get alerts when tariffs change for your products</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-primary/20 p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Bidirectional Translation Agent</p>
                        <p className="text-sm text-muted-foreground">Communicate seamlessly with suppliers in any language</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-primary/20 p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Personalized Risk Assessment</p>
                        <p className="text-sm text-muted-foreground">AI calculated risk specific to your business needs</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-4 border-t">
                  <Button className="w-full">Start Pro Trial</Button>
                </CardFooter>
              </Card>
              
              {/* Enterprise Tier */}
              <Card className="flex flex-col border-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-600 to-gray-800"></div>
                <CardHeader>
                  <CardTitle className="text-xl">Enterprise</CardTitle>
                  <CardDescription className="text-2xl font-bold mt-2">Custom</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-6">
                    Advanced solutions with dedicated support and SLAs
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="rounded-full bg-gray-100 p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">All Pro features</p>
                        <p className="text-sm text-muted-foreground">Everything in the Pro tier included</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-gray-100 p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Service Level Agreement</p>
                        <p className="text-sm text-muted-foreground">Guaranteed uptime and performance</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-gray-100 p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">API Integration</p>
                        <p className="text-sm text-muted-foreground">Connect with your existing systems</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full bg-gray-100 p-1 mr-3 mt-0.5">
                        <svg className="h-3 w-3 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Dedicated Account Manager</p>
                        <p className="text-sm text-muted-foreground">Personalized support and consultation</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-4 border-t">
                  <Button variant="outline" className="w-full">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="text-center mt-10">
              <p className="text-sm text-muted-foreground">
                Can't afford a paid plan yet? Try our voice bot and chat bot for free.
              </p>
              <p className="text-sm font-medium mt-2">
                Coming soon to help you optimize your supply chain at no cost.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
