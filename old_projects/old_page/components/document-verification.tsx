"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

export function DocumentVerification() {
  const verificationItems = [
    {
      id: 1,
      title: "Bill of Lading Number",
      value: "BL-87654321",
      status: "verified",
      details: "Matches carrier records"
    },
    {
      id: 2,
      title: "Container Number",
      value: "MSCU7654321",
      status: "verified",
      details: "Valid container ID format"
    },
    {
      id: 3,
      title: "Carrier",
      value: "Maersk Line",
      status: "verified",
      details: "Registered ocean carrier"
    },
    {
      id: 4,
      title: "Cargo Description",
      value: "Cotton Apparel",
      status: "caution",
      details: "Generic description, may require more specificity"
    },
    {
      id: 5,
      title: "Digital Signature",
      value: "Not Present",
      status: "error",
      details: "Missing electronic signature"
    },
  ];

  // Status icon mapping
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "caution":
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  // Status background color mapping
  const getStatusBg = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-50";
      case "caution":
        return "bg-amber-50";
      case "error":
        return "bg-red-50";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-xl">Document Verification</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {verificationItems.map((item) => (
            <div 
              key={item.id} 
              className={`p-3 rounded-lg border ${getStatusBg(item.status)}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm font-medium mt-1">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.details}</p>
                </div>
                <div>{getStatusIcon(item.status)}</div>
              </div>
            </div>
          ))}
          
          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Document Validity Score</h3>
              <span className="text-lg font-bold">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-amber-500 h-2.5 rounded-full" 
                style={{ width: '78%' }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default DocumentVerification;
