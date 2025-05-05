"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// This would typically come from your API after document processing
const mockVerificationResults = {
  session_id: "session_12345",
  timestamp: new Date().toISOString(),
  documents: {
    bill_of_lading: {
      document_type: "Bill of Lading",
      is_valid: true,
      verification_score: 92,
      extracted_data: {
        bl_number: "BL-87654321",
        date: "2025-03-15",
        shipper: "ACME Corporation",
        consignee: "Global Imports Ltd.",
        vessel: "MSC GAIA",
        voyage: "AE539",
        port_of_loading: "Shanghai",
        port_of_discharge: "Los Angeles",
        container_numbers: ["MSCU1234567", "MSCU7654321"],
        goods_description: "200 CTNS of General Merchandise",
      },
      verification_items: [
        {
          field: "Bill of Lading Number",
          value: "BL-87654321",
          status: "verified",
          details: "Matches carrier records",
        },
        {
          field: "Container Numbers",
          value: "MSCU1234567, MSCU7654321",
          status: "verified",
          details: "Valid container ID format",
        },
        {
          field: "Vessel",
          value: "MSC GAIA",
          status: "verified",
          details: "Registered ocean carrier",
        },
        {
          field: "Goods Description",
          value: "200 CTNS of General Merchandise",
          status: "caution",
          details: "Generic description, may require more specificity",
        },
        {
          field: "Digital Signature",
          value: "Not Present",
          status: "error",
          details: "Missing electronic signature",
        },
      ],
    },
    packing_list: {
      document_type: "Packing List",
      is_valid: true,
      verification_score: 95,
      extracted_data: {
        pl_number: "PL-12345678",
        date: "2025-03-10",
        shipper: "ACME Corporation",
        consignee: "Global Imports Ltd.",
        packages: [
          {
            package_no: "1",
            dimensions: "100x80x120cm",
            weight: "250kg",
            contents: "Widget A x 100",
          },
          {
            package_no: "2",
            dimensions: "80x60x100cm",
            weight: "175kg",
            contents: "Widget B x 50",
          },
        ],
        total_packages: 2,
        total_weight: "425kg",
      },
      verification_items: [
        {
          field: "Packing List Number",
          value: "PL-12345678",
          status: "verified",
          details: "Valid format",
        },
        {
          field: "Package Count",
          value: "2",
          status: "verified",
          details: "Matches declared total packages",
        },
        {
          field: "Total Weight",
          value: "425kg",
          status: "verified",
          details: "Matches sum of package weights",
        },
        {
          field: "Package Contents",
          value: "Widget A x 100, Widget B x 50",
          status: "verified",
          details: "Clear, specific description",
        },
        {
          field: "Dimensions Format",
          value: "Standard (LxWxH)",
          status: "verified",
          details: "Compliant with industry standards",
        },
      ],
    },
    commercial_invoice: {
      document_type: "Commercial Invoice",
      is_valid: true,
      verification_score: 88,
      extracted_data: {
        invoice_number: "INV-87654321",
        date: "2025-03-08",
        seller: "ACME Corporation",
        buyer: "Global Imports Ltd.",
        items: [
          {
            description: "Widget A",
            quantity: 100,
            unit_price: 25.99,
            total: 2599.0,
          },
          {
            description: "Widget B",
            quantity: 50,
            unit_price: 34.99,
            total: 1749.5,
          },
        ],
        total_value: 4348.5,
        currency: "USD",
      },
      verification_items: [
        {
          field: "Invoice Number",
          value: "INV-87654321",
          status: "verified",
          details: "Valid format",
        },
        {
          field: "Invoice Date",
          value: "2025-03-08",
          status: "verified",
          details: "Recent and valid date",
        },
        {
          field: "Seller/Buyer Information",
          value: "ACME Corporation / Global Imports Ltd.",
          status: "verified",
          details: "Matches other documents",
        },
        {
          field: "Item Descriptions",
          value: "Widget A, Widget B",
          status: "caution",
          details: "Generic descriptions, consider adding HS codes",
        },
        {
          field: "Total Value Calculation",
          value: "$4,348.50",
          status: "verified",
          details: "Matches sum of line items",
        },
      ],
    },
  },
  cross_document_verification: {
    is_valid: true,
    verification_items: [
      {
        field: "Company Names",
        status: "verified",
        details: "Consistent across all documents",
      },
      {
        field: "Dates",
        status: "verified",
        details: "All documents within 30-day period",
      },
      {
        field: "Item Descriptions",
        status: "caution",
        details: "Minor inconsistencies in wording but generally matching",
      },
    ],
  },
};

export default function DocumentVerificationResults() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [generatingCertificate, setGeneratingCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState<any>(null);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [generatingInstructions, setGeneratingInstructions] = useState(false);
  const [instructionsData, setInstructionsData] = useState<any>(null);
  const [instructionsSent, setInstructionsSent] = useState(false);
  const [insuranceRecommendations, setInsuranceRecommendations] = useState<any>(null);
  const [dangerousGoodsInfo, setDangerousGoodsInfo] = useState<any>(null);
  const [licenseApplied, setLicenseApplied] = useState(false);
  const [showRouteMap, setShowRouteMap] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // In a real implementation, this would fetch results from your API
    // const fetchResults = async () => {
    //   try {
    //     const response = await fetch('/api/document-verification/results?session_id=...');
    //     const data = await response.json();
    //     setResults(data);
    //   } catch (error) {
    //     console.error('Error fetching verification results:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // Simulate API call with mock data
    setTimeout(() => {
      setResults(mockVerificationResults);
      setLoading(false);
      
      // Generate insurance recommendations and dangerous goods compliance info
      if (mockVerificationResults) {
        generateInsuranceRecommendations(mockVerificationResults);
        checkDangerousGoodsCompliance(mockVerificationResults);
      }
    }, 1000);

    // fetchResults();
  }, []);
  
  // Function to analyze shipment and recommend insurance policies
  const generateInsuranceRecommendations = (results: any) => {
    // Extract relevant data
    const invoiceData = results.documents.commercial_invoice.extracted_data;
    const bolData = results.documents.bill_of_lading.extracted_data;
    
    // Determine origin and destination
    const origin = bolData.port_of_loading;
    const destination = bolData.port_of_discharge;
    const totalValue = invoiceData.total_value;
    
    // Analyze cargo for risks
    const hasFragileItems = invoiceData.items.some((item: any) => 
      item.description.toLowerCase().includes("widget b")
    );
    const isHighValue = totalValue > 3000;
    const isInternationalShipment = origin !== destination;
    
    // Generate recommendations
    const recommendations = {
      policies: [
        {
          name: "Basic Cargo Insurance",
          coverage: "Covers loss or damage during transit",
          risk_level: "Low",
          recommended: true,
          premium_estimate: `$${(totalValue * 0.015).toFixed(2)}`,
          details: "Provides coverage against physical loss or damage to goods during transportation"
        },
        {
          name: "All-Risk Insurance",
          coverage: "Comprehensive coverage for all risks",
          risk_level: hasFragileItems ? "High" : "Medium",
          recommended: hasFragileItems || isHighValue,
          premium_estimate: `$${(totalValue * 0.035).toFixed(2)}`,
          details: "Covers all risks of physical loss or damage from any external cause"
        },
        {
          name: "War & Strikes Insurance",
          coverage: "Protection against political risks",
          risk_level: "Medium",
          recommended: isInternationalShipment,
          premium_estimate: `$${(totalValue * 0.01).toFixed(2)}`,
          details: "Covers loss due to war, strikes, riots, and civil commotions"
        }
      ],
      risks: [
        {
          type: "Transit Risk",
          level: hasFragileItems ? "High" : "Medium",
          mitigation: "Use proper packaging and secure loading protocols"
        },
        {
          type: "Value Risk",
          level: isHighValue ? "High" : "Low",
          mitigation: "Consider using a security escort or tracked containers"
        },
        {
          type: "Regional Risk",
          level: isInternationalShipment ? "Medium" : "Low",
          mitigation: "Ensure compliance with all customs regulations"
        }
      ]
    };
    
    setInsuranceRecommendations(recommendations);
  };
  
  // Function to check for dangerous goods and compliance requirements
  const checkDangerousGoodsCompliance = (results: any) => {
    // Extract relevant data
    const invoiceData = results.documents.commercial_invoice.extracted_data;
    const bolData = results.documents.bill_of_lading.extracted_data;
    
    // Check if any items might be classified as dangerous goods
    // For this demo, let's assume Widget B contains batteries which are regulated
    const hasDangerousGoods = invoiceData.items.some((item: any) => 
      item.description.toLowerCase().includes("widget b")
    );
    
    if (hasDangerousGoods) {
      // Generate compliance information
      const dangerousInfo = {
        classification: {
          un_class: "Class 9",
          un_number: "UN3481",
          proper_shipping_name: "Lithium-ion batteries contained in equipment",
          packing_group: "II"
        },
        compliance_requirements: [
          {
            requirement: "Hazardous Materials Documentation",
            status: "Required",
            details: "Shipper's Declaration for Dangerous Goods must be completed"
          },
          {
            requirement: "Packaging Requirements",
            status: "Required",
            details: "Must use UN-certified packaging with proper markings"
          },
          {
            requirement: "Labeling",
            status: "Required",
            details: "Class 9 hazard labels must be affixed to all packages"
          },
          {
            requirement: "Emergency Response Information",
            status: "Required",
            details: "Emergency contact info and response procedures must be included"
          }
        ],
        regulatory_updates: [
          {
            date: "2025-01-15",
            agency: "IATA",
            update: "New restrictions on state of charge for lithium batteries during air transport",
            impact: "Medium"
          },
          {
            date: "2024-11-30",
            agency: "IMO",
            update: "Updated documentation requirements for maritime shipments",
            impact: "Low"
          }
        ]
      };
      
      setDangerousGoodsInfo(dangerousInfo);
    }
  };

  // Helper function to get status icon
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

  // Helper function to get status background color
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

  // Calculate overall verification score
  const calculateOverallScore = () => {
    if (!results) return 0;

    const scores = Object.values(results.documents).map(
      (doc: any) => doc.verification_score
    );
    return Math.round(
      scores.reduce((a: number, b: number) => a + b, 0) / scores.length
    );
  };
  
  // Function to determine if a shipment is international
  const isInternational = (results: any) => {
    // Check if bill of lading has different countries for loading and discharge
    if (
      results.documents.bill_of_lading && 
      results.documents.bill_of_lading.extracted_data
    ) {
      const { port_of_loading, port_of_discharge } = results.documents.bill_of_lading.extracted_data;
      
      // This is a simplified check - in a real system, would use a country lookup service
      // For this example, we'll consider Shanghai->Los Angeles as international
      if (port_of_loading === "Shanghai" && port_of_discharge === "Los Angeles") {
        return true;
      }
    }
    return false;
  };
  
  // Function to check if licenses are required
  const getLicenseRequirements = (results: any) => {
    if (!isInternational(results)) return null;
    
    const bolData = results.documents.bill_of_lading.extracted_data;
    const invoiceData = results.documents.commercial_invoice.extracted_data;
    
    // This is a simplified check - in a real system, would use a regulatory database
    // to check specific requirements based on country, product type, and HS codes
    
    const originCountry = bolData.port_of_loading === "Shanghai" ? "China" : "Unknown";
    const destinationCountry = bolData.port_of_discharge === "Los Angeles" ? "United States" : "Unknown";
    
    // Determine if the user is an importer or exporter based on the shipper information
    // For this example, we'll assume if the user's company (ACME Corporation) is the shipper, they're the exporter
    // If they're the consignee (Global Imports Ltd.), they're the importer
    const userCompany = bolData.shipper; // In a real app, this would come from user profile
    const userRole = userCompany === bolData.shipper ? "exporter" : "importer";
    
    // License requirements based on user's role
    let licenseDetails = {
      required: false,
      name: "",
      issuer: "",
      details: ""
    };
    
    if (userRole === "exporter") {
      licenseDetails = {
        required: originCountry === "China",
        name: "Export License",
        issuer: "Chinese Ministry of Commerce",
        details: "Required for exporting goods from China"
      };
    } else { // User is importer
      licenseDetails = {
        required: false,
        name: "Import License",
        issuer: "U.S. Customs and Border Protection",
        details: "Not required for general merchandise, but may be required for specific goods categories"
      };
      
      // Check if any products require special import licenses
      if (invoiceData.items.some((item: any) => 
        item.description.toLowerCase().includes("widget"))) {
        licenseDetails = {
          required: true,
          name: "Import License for Widgets",
          issuer: "U.S. Department of Commerce",
          details: "Required for importing widgets into the United States"
        };
      }
    }
    
    return {
      userRole,
      licenseDetails,
      originCountry,
      destinationCountry
    };
  };
  
  // Function to detect cargo type that needs special handling
  const needsSpecialHandling = (results: any) => {
    // Check invoice or packing list for special cargo types
    const invoiceData = results.documents.commercial_invoice.extracted_data;
    
    // Look for perishable goods or items needing special care
    // For demo purposes, let's say any Widget B items need special handling
    return invoiceData.items.some((item: any) => 
      item.description.toLowerCase().includes("widget b")
    );
  };
  
  // Function to generate cargo-specific handling instructions
  const generateHandlingInstructions = () => {
    setGeneratingInstructions(true);
    
    // Simulate API call to generate instructions
    setTimeout(() => {
      // Get data from verified documents
      const invoiceData = results.documents.commercial_invoice.extracted_data;
      const bolData = results.documents.bill_of_lading.extracted_data;
      
      // Find special cargo item
      const specialItem = invoiceData.items.find((item: any) => 
        item.description.toLowerCase().includes("widget b")
      );
      
      // In a real system, we would look up handling requirements from a database
      // based on the cargo type, origin, destination, and other factors
      
      // Create instructions data
      const instructions = {
        reference_number: `INST-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        date: new Date().toISOString().split('T')[0],
        shipper: bolData.shipper,
        carrier: bolData.vessel,
        cargo_description: specialItem ? specialItem.description : "Special Cargo",
        container_numbers: bolData.container_numbers,
        
        // Special handling requirements specific to cargo type
        // In a real system, these would be generated based on cargo type and regulations
        handling_requirements: [
          {
            category: "Temperature Control",
            requirements: "Maintain temperature between 10-15°C (50-59°F) at all times",
            importance: "critical"
          },
          {
            category: "Humidity Control",
            requirements: "Maintain relative humidity between 85-95%",
            importance: "high"
          },
          {
            category: "Ventilation",
            requirements: "Ensure adequate air circulation within container",
            importance: "medium"
          },
          {
            category: "Stacking",
            requirements: "Do not stack more than 4 cartons high",
            importance: "high"
          },
          {
            category: "Inspection",
            requirements: "Inspect cargo daily for any signs of damage or deterioration",
            importance: "medium"
          }
        ],
        
        additional_notes: "Handle with extra care. Report any temperature deviations immediately to shipper."
      };
      
      setInstructionsData(instructions);
      setGeneratingInstructions(false);
      setShowInstructionsModal(true);
    }, 1500);
  };
  
  // Function to generate Certificate of Origin
  const generateCertificateOfOrigin = () => {
    setGeneratingCertificate(true);
    
    // Simulate API call to generate certificate
    setTimeout(() => {
      // Get data from verified documents
      const invoiceData = results.documents.commercial_invoice.extracted_data;
      const bolData = results.documents.bill_of_lading.extracted_data;
      
      // Create certificate data
      const certificate = {
        certificate_number: `COO-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        date: new Date().toISOString().split('T')[0],
        exporter: invoiceData.seller,
        consignee: invoiceData.buyer,
        country_of_origin: "China", // In a real system, this would be determined by rules
        departure: bolData.port_of_loading,
        destination: bolData.port_of_discharge,
        transport: `Vessel: ${bolData.vessel}, Voyage: ${bolData.voyage}`,
        goods: invoiceData.items.map((item: any) => ({
          description: item.description,
          quantity: item.quantity,
          value: item.total
        })),
        total_value: invoiceData.total_value,
        currency: invoiceData.currency
      };
      
      setCertificateData(certificate);
      setGeneratingCertificate(false);
      setShowCertificateModal(true);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Loading verification results...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl py-8">
      <Button variant="outline" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      {/* International Shipping Notification */}
      {results && isInternational(results) && (
        <>
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">International Shipment Detected</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>A Certificate of Origin can be automatically generated based on the verified documents.</p>
                </div>
                <div className="mt-3">
                  <Button 
                    onClick={generateCertificateOfOrigin}
                    disabled={generatingCertificate}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {generatingCertificate ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : "Generate Certificate of Origin"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* License Requirements Card */}
        <Card className="mb-6 border-yellow-200">
          <CardHeader className="bg-yellow-50 border-b border-yellow-200 pb-3">
            <CardTitle className="text-lg text-yellow-800">
              License Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {(() => {
              const licenseReqs = getLicenseRequirements(results);
              return (
                <div className="space-y-4">
                  <p className="text-sm text-gray-700">
                    This international shipment from <span className="font-medium">{licenseReqs?.originCountry}</span> to <span className="font-medium">{licenseReqs?.destinationCountry}</span> may require the following licenses:
                  </p>
                  
                  <div className="flex items-center mb-4">
                    <span className="text-sm font-medium mr-2">Your role:</span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 capitalize">
                      {licenseReqs?.userRole}
                    </span>
                  </div>
                  
                  {/* Single License Card Based on User Role */}
                  <div className={`p-3 rounded-md border ${licenseReqs?.licenseDetails.required ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">
                        {licenseReqs?.userRole === "exporter" ? "Export" : "Import"} License
                      </h3>
                      {licenseReqs?.licenseDetails.required ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                          Required
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Not Required
                        </span>
                      )}
                    </div>
                    
                    {licenseReqs?.licenseDetails.required && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-700">{licenseReqs.licenseDetails.name}</p>
                        <p className="text-xs text-gray-600 mt-1">Issuer: {licenseReqs.licenseDetails.issuer}</p>
                        <p className="text-xs text-gray-600 mt-1">{licenseReqs.licenseDetails.details}</p>
                        {licenseApplied ? (
                          <div className="mt-3 flex items-center text-green-700">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            <span className="text-sm font-medium">License Application Submitted</span>
                          </div>
                        ) : (
                          <Button 
                            className="mt-3 bg-red-600 hover:bg-red-700 text-white" 
                            size="sm"
                            onClick={() => setLicenseApplied(true)}
                          >
                            Apply for License
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>

        {/* Trade Route Map */}
        {results && isInternational(results) && showRouteMap && (
          <Card className="mb-6 border-blue-200">
            <CardHeader className="bg-blue-50 border-b border-blue-200 pb-3">
              <CardTitle className="text-lg text-blue-800 flex justify-between items-center">
                <span>Trade Route Visualization</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => setShowRouteMap(false)}
                >
                  Hide Map
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full h-[400px] relative rounded-b-lg overflow-hidden">
                {/* In a real implementation, this would be an actual Mapbox map */}
                <div className="absolute inset-0 bg-blue-50">
                  {/* Placeholder map with ocean color */}
                  <div className="bg-blue-300 w-full h-full relative">
                    
                    {/* Origin: Shanghai */}
                    <div className="absolute left-[75%] top-[40%] flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
                      <div className="text-xs font-bold bg-white px-2 py-1 rounded shadow mt-1">Shanghai</div>
                    </div>
                    
                    {/* Destination: Los Angeles */}
                    <div className="absolute left-[15%] top-[38%] flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                      <div className="text-xs font-bold bg-white px-2 py-1 rounded shadow mt-1">Los Angeles</div>
                    </div>
                    
                    {/* Ship along the route */}
                    <div className="absolute left-[45%] top-[39%] flex flex-col items-center">
                      <div className="text-2xl transform -rotate-12">🚢</div>
                      <div className="text-xs font-bold bg-white px-2 py-1 rounded shadow mt-1">
                        MSC GAIA
                      </div>
                    </div>
                    
                    {/* Trade route line */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path 
                        d="M 75,40 C 60,35 40,45 15,38" 
                        stroke="#2563eb" 
                        strokeWidth="1" 
                        strokeDasharray="2,1" 
                        fill="none"
                      />
                    </svg>
                    
                    {/* Distance and time info */}
                    <div className="absolute bottom-2 right-2 bg-white rounded p-2 shadow text-xs">
                      <div className="font-bold">Distance: ~6,500 nautical miles</div>
                      <div>Est. Transit Time: 14-18 days</div>
                      <div className="text-blue-600 font-medium">Status: In Transit</div>
                    </div>
                  </div>
                </div>
                
                {/* Message that this would typically be a Mapbox map */}
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-2 text-center">
                  In a production environment, this would be rendered using Mapbox GL with real-time tracking
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Shipper's Letter of Instructions Card */}
        {results && needsSpecialHandling(results) && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">Special Cargo Detected</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>This shipment contains items that require special handling. Generate a Shipper's Letter of Instructions.</p>
                  </div>
                  <div className="mt-3 flex items-center">
                    {instructionsSent ? (
                      <div className="flex items-center text-green-700">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        <span className="text-sm font-medium">Shipper's Letter of Instructions sent</span>
                      </div>
                    ) : (
                      <Button 
                        onClick={generateHandlingInstructions}
                        disabled={generatingInstructions}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {generatingInstructions ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                          </>
                        ) : "Generate Shipper's Letter of Instructions"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        </>
      )}
      
      {/* Shipper's Letter of Instructions Modal */}
      {showInstructionsModal && instructionsData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Shipper's Letter of Instructions</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowInstructionsModal(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="border border-gray-300 rounded-lg p-6 mb-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold uppercase text-gray-900">Shipper's Letter of Instructions</h3>
                  <p className="text-sm text-gray-600 mt-1">Reference: {instructionsData.reference_number}</p>
                  <p className="text-sm text-gray-600 mt-1">Date: {instructionsData.date}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Shipper</h4>
                    <p className="p-2 border rounded-md bg-gray-50 text-gray-900">{instructionsData.shipper}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Carrier</h4>
                    <p className="p-2 border rounded-md bg-gray-50 text-gray-900">{instructionsData.carrier}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Cargo Description</h4>
                  <p className="p-2 border rounded-md bg-gray-50 text-gray-900">{instructionsData.cargo_description}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Container Numbers</h4>
                  <p className="p-2 border rounded-md bg-gray-50 text-gray-900">{instructionsData.container_numbers.join(", ")}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Special Handling Requirements</h4>
                  <div className="space-y-3">
                    {instructionsData.handling_requirements.map((req: any, index: number) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg border ${
                          req.importance === 'critical' ? 'bg-red-50 border-red-200' : 
                          req.importance === 'high' ? 'bg-amber-50 border-amber-200' : 
                          'bg-blue-50 border-blue-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{req.category}</h3>
                            <p className="text-sm text-gray-700 mt-1">{req.requirements}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            req.importance === 'critical' ? 'bg-red-100 text-red-800' : 
                            req.importance === 'high' ? 'bg-amber-100 text-amber-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {req.importance}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Additional Notes</h4>
                  <p className="p-2 bg-gray-50 rounded-md text-sm text-gray-800">
                    {instructionsData.additional_notes}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowInstructionsModal(false)}
                >
                  Close
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    setInstructionsSent(true);
                    setShowInstructionsModal(false);
                  }}
                >
                  Send to Shipper
                </Button>
                <Button>
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Certificate of Origin Modal */}
      {showCertificateModal && certificateData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Certificate of Origin</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setShowCertificateModal(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="border border-gray-300 rounded-lg p-6 mb-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold uppercase text-gray-900">Certificate of Origin</h3>
                  <p className="text-sm text-gray-600 mt-1">No: {certificateData.certificate_number}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">1. Exporter</h4>
                    <p className="p-2 border rounded-md bg-gray-50 text-gray-900">{certificateData.exporter}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">2. Consignee</h4>
                    <p className="p-2 border rounded-md bg-gray-50 text-gray-900">{certificateData.consignee}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">3. Country of Origin</h4>
                    <p className="p-2 border rounded-md bg-gray-50 text-gray-900">{certificateData.country_of_origin}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">4. Date of Issue</h4>
                    <p className="p-2 border rounded-md bg-gray-50 text-gray-900">{certificateData.date}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">5. Transport Details</h4>
                    <p className="p-2 border rounded-md bg-gray-50 text-gray-900">{certificateData.transport}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">6. Port of Loading/Discharge</h4>
                    <p className="p-2 border rounded-md bg-gray-50 text-gray-900">
                      From: {certificateData.departure}<br />
                      To: {certificateData.destination}
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">7. Goods Description</h4>
                  <div className="border rounded-md">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                          <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {certificateData.goods.map((item: any, index: number) => (
                          <tr key={index}>
                            <td className="px-3 py-2 text-sm font-medium text-gray-900">{item.description}</td>
                            <td className="px-3 py-2 text-sm text-gray-700 text-right">{item.quantity}</td>
                            <td className="px-3 py-2 text-sm text-gray-700 text-right">${item.value.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={2} className="px-3 py-2 text-sm font-medium text-gray-900 text-right">Total Value:</td>
                          <td className="px-3 py-2 text-sm font-medium text-gray-900 text-right">${certificateData.total_value.toFixed(2)} {certificateData.currency}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">8. Declaration</h4>
                  <p className="p-2 bg-gray-50 rounded-md text-sm text-gray-800">
                    The undersigned hereby declares that the above details and statements are correct; that all the goods were produced in <span className="font-bold">{certificateData.country_of_origin}</span>.
                  </p>
                  
                  <div className="mt-6 flex justify-end">
                    <div className="text-center">
                      <div className="h-12 border-b border-gray-400 w-56"></div>
                      <p className="mt-1 text-sm text-gray-600">Authorized Signature</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCertificateModal(false)}
                >
                  Close
                </Button>
                <Button>
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {/* Overall Summary Card */}
        <Card className="shadow-md">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-xl">
              Document Verification Results
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold">
                  Overall Verification Score
                </h2>
                <p className="text-muted-foreground mt-1">
                  Processed on {new Date(results?.timestamp).toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative">
                  <svg className="w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke={
                        calculateOverallScore() > 90
                          ? "#22c55e"
                          : calculateOverallScore() > 75
                          ? "#f59e0b"
                          : "#ef4444"
                      }
                      strokeWidth="16"
                      strokeDasharray="352"
                      strokeDashoffset={
                        352 - (352 * calculateOverallScore()) / 100
                      }
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">
                      {calculateOverallScore()}%
                    </span>
                  </div>
                </div>
                <span className="text-sm font-medium mt-2">
                  {calculateOverallScore() > 90
                    ? "Excellent"
                    : calculateOverallScore() > 75
                    ? "Good"
                    : "Needs Review"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Tabs */}
        <Tabs defaultValue="bill_of_lading" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="bill_of_lading">Bill of Lading</TabsTrigger>
            <TabsTrigger value="packing_list">Packing List</TabsTrigger>
            <TabsTrigger value="commercial_invoice">
              Commercial Invoice
            </TabsTrigger>
          </TabsList>

          {results &&
            Object.entries(results.documents).map(
              ([docType, docData]: [string, any]) => (
                <TabsContent key={docType} value={docType} className="mt-0">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between">
                        <span>{docData.document_type}</span>
                        <span
                          className={`text-sm font-medium px-3 py-1 rounded-full ${
                            docData.verification_score > 90
                              ? "bg-green-100 text-green-800"
                              : docData.verification_score > 75
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          Score: {docData.verification_score}/100
                        </span>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Extracted Data */}
                        <div>
                          <h3 className="font-medium text-lg mb-4">
                            Extracted Information
                          </h3>
                          <div className="bg-gray-50 p-4 rounded-lg text-gray-800">
                            {docType === "bill_of_lading" && (
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      B/L Number
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {docData.extracted_data.bl_number}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      Date
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {docData.extracted_data.date}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Shipper
                                  </p>
                                  <p className="font-medium text-gray-900">
                                    {docData.extracted_data.shipper}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Consignee
                                  </p>
                                  <p className="font-medium text-gray-900">
                                    {docData.extracted_data.consignee}
                                  </p>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      Vessel
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {docData.extracted_data.vessel}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      Voyage
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {docData.extracted_data.voyage}
                                    </p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      Port of Loading
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {docData.extracted_data.port_of_loading}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      Port of Discharge
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {docData.extracted_data.port_of_discharge}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Container Numbers
                                  </p>
                                  <p className="font-medium text-gray-900">
                                    {docData.extracted_data.container_numbers.join(
                                      ", "
                                    )}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Goods Description
                                  </p>
                                  <p className="font-medium text-gray-900">
                                    {docData.extracted_data.goods_description}
                                  </p>
                                </div>
                              </div>
                            )}

                            {docType === "packing_list" && (
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      P/L Number
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {docData.extracted_data.pl_number}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      Date
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {docData.extracted_data.date}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Shipper
                                  </p>
                                  <p className="font-medium text-gray-900">
                                    {docData.extracted_data.shipper}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Consignee
                                  </p>
                                  <p className="font-medium text-gray-900">
                                    {docData.extracted_data.consignee}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Packages
                                  </p>
                                  <div className="mt-2 border rounded-md divide-y">
                                    {docData.extracted_data.packages.map(
                                      (pkg: any, index: number) => (
                                        <div
                                          key={index}
                                          className="p-2 grid grid-cols-4 gap-2 text-sm"
                                        >
                                          <div>
                                            <p className="text-gray-600">
                                              Package #
                                            </p>
                                            <p className="font-medium text-gray-900">
                                              {pkg.package_no}
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-gray-600">
                                              Dimensions
                                            </p>
                                            <p className="font-medium text-gray-900">
                                              {pkg.dimensions}
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-gray-600">
                                              Weight
                                            </p>
                                            <p className="font-medium text-gray-900">
                                              {pkg.weight}
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-gray-600">
                                              Contents
                                            </p>
                                            <p className="font-medium text-gray-900">
                                              {pkg.contents}
                                            </p>
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      Total Packages
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {docData.extracted_data.total_packages}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      Total Weight
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {docData.extracted_data.total_weight}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {docType === "commercial_invoice" && (
                              <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      Invoice Number
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {docData.extracted_data.invoice_number}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      Date
                                    </p>
                                    <p className="font-medium text-gray-900">
                                      {docData.extracted_data.date}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Seller
                                  </p>
                                  <p className="font-medium text-gray-900">
                                    {docData.extracted_data.seller}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Buyer</p>
                                  <p className="font-medium text-gray-900">
                                    {docData.extracted_data.buyer}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">Items</p>
                                  <div className="mt-2 border rounded-md">
                                    <table className="min-w-full divide-y divide-gray-200">
                                      <thead className="bg-gray-50">
                                        <tr>
                                          <th
                                            scope="col"
                                            className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                          >
                                            Description
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                          >
                                            Qty
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                          >
                                            Unit Price
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                          >
                                            Total
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody className="bg-white divide-y divide-gray-200">
                                        {docData.extracted_data.items.map(
                                          (item: any, index: number) => (
                                            <tr key={index}>
                                              <td className="px-3 py-2 text-sm font-medium text-gray-900">
                                                {item.description}
                                              </td>
                                              <td className="px-3 py-2 text-sm text-gray-700 text-right">
                                                {item.quantity}
                                              </td>
                                              <td className="px-3 py-2 text-sm text-gray-700 text-right">
                                                ${item.unit_price.toFixed(2)}
                                              </td>
                                              <td className="px-3 py-2 text-sm text-gray-700 text-right">
                                                ${item.total.toFixed(2)}
                                              </td>
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                      <tfoot>
                                        <tr>
                                          <td
                                            colSpan={3}
                                            className="px-3 py-2 text-sm font-medium text-gray-900 text-right"
                                          >
                                            Total:
                                          </td>
                                          <td className="px-3 py-2 text-sm font-medium text-gray-900 text-right">
                                            $
                                            {docData.extracted_data.total_value.toFixed(
                                              2
                                            )}{" "}
                                            {docData.extracted_data.currency}
                                          </td>
                                        </tr>
                                      </tfoot>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Verification Results */}
                        <div>
                          <h3 className="font-medium text-lg mb-4">
                            Verification Results
                          </h3>
                          <div className="space-y-3">
                            {docData.verification_items.map(
                              (item: any, index: number) => (
                                <div
                                  key={index}
                                  className={`p-3 rounded-lg border ${getStatusBg(
                                    item.status
                                  )}`}
                                >
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <h3 className="font-medium text-gray-900">
                                        {item.field}
                                      </h3>
                                      <p className="text-sm font-medium text-gray-800 mt-1">
                                        {item.value}
                                      </p>
                                      <p className="text-xs text-gray-700 mt-1">
                                        {item.details}
                                      </p>
                                    </div>
                                    <div>{getStatusIcon(item.status)}</div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )
            )}
        </Tabs>

        {/* Insurance Recommendations */}
        {insuranceRecommendations && (
          <Card className="shadow-md mb-6">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-lg">Insurance Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Recommended Policies</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {insuranceRecommendations.policies.map((policy: any, index: number) => (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border ${
                          policy.recommended 
                            ? 'border-blue-200 bg-blue-50' 
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-900">{policy.name}</h4>
                          {policy.recommended && (
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{policy.coverage}</p>
                        <div className="flex justify-between items-center text-sm mt-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            policy.risk_level === 'High' 
                              ? 'bg-red-100 text-red-800' 
                              : policy.risk_level === 'Medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {policy.risk_level} Risk
                          </span>
                          <span className="font-medium">{policy.premium_estimate}</span>
                        </div>
                        <p className="text-xs text-gray-600 mt-3">{policy.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Risk Assessment & Mitigation</h3>
                  <div className="space-y-3">
                    {insuranceRecommendations.risks.map((risk: any, index: number) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg border ${
                          risk.level === 'High' 
                            ? 'bg-red-50 border-red-200' 
                            : risk.level === 'Medium'
                            ? 'bg-amber-50 border-amber-200'
                            : 'bg-green-50 border-green-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{risk.type}</h3>
                            <p className="text-sm text-gray-700 mt-1">Mitigation: {risk.mitigation}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            risk.level === 'High' 
                              ? 'bg-red-100 text-red-800' 
                              : risk.level === 'Medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {risk.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Dangerous Goods Compliance */}
        {dangerousGoodsInfo && (
          <Card className="shadow-md mb-6">
            <CardHeader className="bg-red-50 border-b border-red-200">
              <CardTitle className="text-lg text-red-800">Dangerous Goods Compliance</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Classification</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-gray-50 rounded-md">
                      <p className="text-xs text-gray-500">UN Class</p>
                      <p className="text-sm font-medium">{dangerousGoodsInfo.classification.un_class}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <p className="text-xs text-gray-500">UN Number</p>
                      <p className="text-sm font-medium">{dangerousGoodsInfo.classification.un_number}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md">
                      <p className="text-xs text-gray-500">Packing Group</p>
                      <p className="text-sm font-medium">{dangerousGoodsInfo.classification.packing_group}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-md col-span-1 md:col-span-4">
                      <p className="text-xs text-gray-500">Proper Shipping Name</p>
                      <p className="text-sm font-medium">{dangerousGoodsInfo.classification.proper_shipping_name}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Compliance Requirements</h3>
                  <div className="space-y-3">
                    {dangerousGoodsInfo.compliance_requirements.map((req: any, index: number) => (
                      <div key={index} className="p-3 rounded-lg border border-red-200 bg-red-50">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{req.requirement}</h3>
                            <p className="text-sm text-gray-700 mt-1">{req.details}</p>
                          </div>
                          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                            {req.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Recent Regulatory Updates</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Agency</th>
                          <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update</th>
                          <th scope="col" className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dangerousGoodsInfo.regulatory_updates.map((update: any, index: number) => (
                          <tr key={index}>
                            <td className="px-3 py-2 text-sm text-gray-900">{update.date}</td>
                            <td className="px-3 py-2 text-sm text-gray-900 font-medium">{update.agency}</td>
                            <td className="px-3 py-2 text-sm text-gray-700">{update.update}</td>
                            <td className="px-3 py-2 text-sm text-center">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                update.impact === 'High' 
                                  ? 'bg-red-100 text-red-800' 
                                  : update.impact === 'Medium'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}>
                                {update.impact}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Cross-Document Verification */}
        <Card className="shadow-md">
          <CardHeader className="bg-primary/5">
            <CardTitle className="text-lg">
              Cross-Document Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {results?.cross_document_verification.verification_items.map(
                (item: any, index: number) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${getStatusBg(
                      item.status
                    )}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item.field}
                        </h3>
                        <p className="text-xs text-gray-700 mt-1">
                          {item.details}
                        </p>
                      </div>
                      <div>{getStatusIcon(item.status)}</div>
                    </div>
                  </div>
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
