"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, FileText, Package, Ship, Truck, Building, Check, Clock, HelpCircle, FileCheck, LucideIcon } from "lucide-react";

interface Step {
  step: string;
  whatHappens: string;
  whoCreates: string;
  example: string;
  documents: string;
  icon: LucideIcon;
  color: string;
}

export function SupplyChainLifecycle() {
  const [activeStep, setActiveStep] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(false);

  // Data for the lifecycle steps
  const steps: Step[] = [
    {
      step: "1. Buyer places Purchase Order",
      whatHappens: "Buyer sends a formal order to Seller with product, quantity, price",
      whoCreates: "Buyer (or their system)",
      example: "Walmart orders 10,000 t-shirts from a manufacturer in Bangladesh",
      documents: "Purchase Order (PO)",
      icon: FileText,
      color: "bg-blue-500"
    },
    {
      step: "2. Seller accepts and prepares goods",
      whatHappens: "Seller confirms, starts production or packing goods",
      whoCreates: "Seller",
      example: "Manufacturer finishes production, starts packaging",
      documents: "Packing List",
      icon: Package,
      color: "bg-green-500"
    },
    {
      step: "3. Booking cargo with freight forwarder",
      whatHappens: "Seller (or Buyer) books shipping space (sea/air/truck)",
      whoCreates: "Seller (or Freight Forwarder)",
      example: "Seller books Maersk container to ship t-shirts",
      documents: "Booking Confirmation",
      icon: FileCheck,
      color: "bg-purple-500"
    },
    {
      step: "4. Goods handed to Carrier",
      whatHappens: "Freight Forwarder organizes pickup, creates shipment record",
      whoCreates: "Freight Forwarder/Carrier",
      example: "Truck picks up goods from factory, goes to port",
      documents: "Warehouse Receipt, Dock Receipt",
      icon: Truck,
      color: "bg-yellow-500"
    },
    {
      step: "5. Bill of Lading issued",
      whatHappens: "Carrier issues Bill of Lading once cargo is loaded",
      whoCreates: "Carrier",
      example: "Maersk issues B/L for the container shipment",
      documents: "Bill of Lading (B/L)",
      icon: FileText,
      color: "bg-red-500"
    },
    {
      step: "6. Customs paperwork prepared",
      whatHappens: "Forwarder or customs broker prepares docs for export clearance",
      whoCreates: "Customs Broker/Freight Forwarder",
      example: "Goods cleared to leave Bangladesh",
      documents: "Export Declaration, Certificate of Origin",
      icon: FileText,
      color: "bg-indigo-500"
    },
    {
      step: "7. Shipment in transit",
      whatHappens: "Vessel/plane/truck transports goods",
      whoCreates: "Carrier auto-generates tracking",
      example: "Cargo leaves port for U.S.",
      documents: "No new manual docs (Tracking updates automated)",
      icon: Ship,
      color: "bg-blue-600"
    },
    {
      step: "8. Arrival Notice & Import Clearance",
      whatHappens: "Carrier notifies importer; importer files customs entries",
      whoCreates: "Carrier + Customs Broker",
      example: "T-shirts arrive at LA port, need to clear customs",
      documents: "Arrival Notice, ISF, Entry Summary (CBP 7501)",
      icon: Building,
      color: "bg-orange-500"
    },
    {
      step: "9. Final Delivery",
      whatHappens: "After customs clearance, goods delivered to final warehouse",
      whoCreates: "Trucker arranges delivery",
      example: "Truck takes container to Walmart warehouse",
      documents: "Delivery Order, Proof of Delivery (POD)",
      icon: Check,
      color: "bg-green-600"
    }
  ];

  // Auto-advance through steps
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (autoAdvance) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoAdvance, steps.length]);

  // Function to handle step click
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setAutoAdvance(false);
  };

  return (
    <div className="py-24 px-6 lg:px-8 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          Supply Chain Document Lifecycle
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Understanding the journey of documents in the global supply chain process
        </p>

        {/* Auto-play toggle */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setAutoAdvance(!autoAdvance)}
            className={`px-4 py-2 rounded-md transition-all ${
              autoAdvance ? "bg-primary text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            {autoAdvance ? "Pause Animation" : "Auto-Play Lifecycle"}
          </button>
        </div>

        {/* Timeline Indicator */}
        <div className="relative mb-16">
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
          <div className="flex justify-between relative items-center">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center relative"
                onClick={() => handleStepClick(index)}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 cursor-pointer transition-all duration-300 ${
                    index <= activeStep ? steps[index].color : "bg-gray-300"
                  } ${index === activeStep ? "ring-4 ring-gray-200 scale-125" : ""}`}
                >
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
                <span 
                  className={`absolute -bottom-6 text-xs font-medium transition-all duration-300 ${
                    index === activeStep ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Step {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Step Details */}
        <Card className="border rounded-lg shadow-lg overflow-hidden transition-all duration-500 transform hover:shadow-xl">
          <div className={`h-2 ${steps[activeStep].color}`}></div>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step Icon and Title */}
              <div className="col-span-1">
                <div className={`inline-flex p-4 rounded-full ${steps[activeStep].color} bg-opacity-20 mb-4`}>
                  {(() => {
                    const Icon = steps[activeStep].icon;
                    return <Icon className="h-8 w-8" />
                  })()}
                </div>
                <h3 className="text-xl font-bold mb-2">{steps[activeStep].step}</h3>
                <span className="text-sm text-gray-500">
                  Step {activeStep + 1} of {steps.length}
                </span>
              </div>

              {/* Step Details */}
              <div className="col-span-3 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">What Happens</p>
                    <p>{steps[activeStep].whatHappens}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Who Creates Documents</p>
                    <p>{steps[activeStep].whoCreates}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Documents Created</p>
                    <p className="font-medium">{steps[activeStep].documents}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mt-4">
                  <p className="text-sm font-semibold text-gray-500 mb-1">Example</p>
                  <p className="italic">{steps[activeStep].example}</p>
                </div>
                
                {/* Navigation buttons */}
                <div className="flex justify-between mt-8">
                  <button 
                    onClick={() => setActiveStep(prev => prev === 0 ? steps.length - 1 : prev - 1)}
                    className="flex items-center text-gray-600 hover:text-primary transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
                    Previous
                  </button>
                  <button 
                    onClick={() => setActiveStep(prev => prev === steps.length - 1 ? 0 : prev + 1)}
                    className="flex items-center text-gray-600 hover:text-primary transition-colors"
                  >
                    Next
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SupplyChainLifecycle;
