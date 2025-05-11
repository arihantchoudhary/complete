"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Hash, 
  Globe, 
  FileText, 
  AlertTriangle, 
  Info, 
  Layers, 
  ChevronRight,
  ChevronsRight,
  CircleDot,
  Droplet,
  Factory,
  Ship,
  Check,
  Search
} from "lucide-react";

export function HSCodeExplanation() {
  // Example HS code breakdown for petrochemicals
  const exampleCode = "3901.10.0010";
  const codeParts = [
    { 
      digits: "39", 
      meaning: "Chapter (Plastics and articles thereof)",
      color: "bg-blue-500"
    },
    { 
      digits: "01", 
      meaning: "Heading (Polymers of ethylene, in primary forms)",
      color: "bg-green-500"
    },
    { 
      digits: "10", 
      meaning: "Subheading (Polyethylene having a specific gravity < 0.94)",
      color: "bg-purple-500"
    },
    { 
      digits: "00", 
      meaning: "UAE suffix (Industrial use)",
      color: "bg-yellow-500"
    },
    { 
      digits: "10", 
      meaning: "US statistics suffix (LLDPE)",
      color: "bg-red-500"
    }
  ];

  // Common petrochemical HS codes table data
  const petrochemicalCodes = [
    {
      product: "Linear LLDPE (Industrial)",
      uaeCode: "3901.1030",
      usCode: "3901.10.0010",
      dutyRate: "2.5%"
    },
    {
      product: "Polyethylene (SG ≥0.94)",
      uaeCode: "3901.2000",
      usCode: "3901.20.0000",
      dutyRate: "6.5%"
    },
    {
      product: "Catalysts (3815.9000)",
      uaeCode: "3815.9000",
      usCode: "3815.90.0000",
      dutyRate: "3.7%"
    }
  ];

  return (
    <div className="py-24 px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          HS Code Classification for Petrochemicals: Jebel Ali to Houston
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Understanding how globally standardized Harmonized System (HS) codes are used for petrochemical shipments between UAE and USA
        </p>

        {/* Introduction to Classification */}
        <Card className="mb-8 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
            <div className="flex items-center">
              <Hash className="h-6 w-6 text-blue-500 mr-2" />
              <CardTitle>What is Classification?</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">
              <span className="font-medium">Classification</span> assigns petrochemical products a numeric code for global customs authorities to:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <CircleDot className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Determine duties/taxes</strong> - Essential for calculating import costs</span>
              </li>
              <li className="flex items-start">
                <CircleDot className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Track trade statistics</strong> - For monitoring global petrochemical flows</span>
              </li>
              <li className="flex items-start">
                <CircleDot className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Enforce safety/environmental regulations</strong> - Critical for hazardous materials</span>
              </li>
              <li className="flex items-start">
                <CircleDot className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Prevent illegal trade</strong> - Stopping prohibited chemical transfers</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* The Harmonized System */}
        <Card className="mb-8 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-green-50 to-green-100 border-b">
            <div className="flex items-center">
              <Globe className="h-6 w-6 text-green-500 mr-2" />
              <CardTitle>The Harmonized System (HS)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Droplet className="h-10 w-10 text-green-600 mr-3" />
              <div>
                <p className="font-medium">Global Standard for Petrochemicals</p>
                <p className="text-sm text-gray-600">First 6 digits are universal (e.g., <span className="font-mono">3901</span> = polyethylene)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <Ship className="h-5 w-5 text-green-500 mr-2" />
                  Jebel Ali (UAE)
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                    <span>Uses <strong>8-digit HS codes</strong></span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                    <span>Mandatory on Bills of Lading per Dubai Customs</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                    <span>Example: <span className="font-mono bg-green-100 px-1 rounded">3901.1030</span> (LLDPE, industrial use)</span>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <Factory className="h-5 w-5 text-blue-500 mr-2" />
                  Houston (USA)
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-blue-500 mr-1 flex-shrink-0 mt-0.5" />
                    <span>Uses <strong>10-digit HTS codes</strong> (HTSUS)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-blue-500 mr-1 flex-shrink-0 mt-0.5" />
                    <span>Required for US Customs and Border Protection clearance</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-blue-500 mr-1 flex-shrink-0 mt-0.5" />
                    <span>Example: <span className="font-mono bg-blue-100 px-1 rounded">3901.10.0010</span> (LLDPE, specific gravity &lt;0.94)</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Petrochemical HS Code Structure */}
        <Card className="mb-8 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 border-b">
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-purple-500 mr-2" />
              <CardTitle>Petrochemical HS Code Structure: UAE vs. USA</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Code Structure Table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Code Segment</th>
                    <th className="border p-2 text-left">UAE (Jebel Ali)</th>
                    <th className="border p-2 text-left">USA (Houston)</th>
                    <th className="border p-2 text-left">Example: Linear Low-Density Polyethylene (LLDPE)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-medium">Global HS</td>
                    <td className="border p-2 font-mono">3901.10</td>
                    <td className="border p-2 font-mono">3901.10</td>
                    <td className="border p-2">Polyethylene in primary forms</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2 font-medium">Country</td>
                    <td className="border p-2 font-mono">3901.10.<span className="font-mono bg-yellow-100 p-0.5 rounded">30</span></td>
                    <td className="border p-2 font-mono">3901.10.<span className="font-mono bg-red-100 p-0.5 rounded">0010</span></td>
                    <td className="border p-2">UAE: LLDPE for industrial use <br /> USA: LLDPE, specific gravity &lt;0.94</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <h4 className="font-medium mb-2 text-purple-700">Key Differences</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ChevronsRight className="h-5 w-5 text-purple-500 mr-1 flex-shrink-0 mt-0.5" />
                  <span>UAE's 8th digit often reflects product variants (e.g., industrial vs. medical grade)</span>
                </li>
                <li className="flex items-start">
                  <ChevronsRight className="h-5 w-5 text-purple-500 mr-1 flex-shrink-0 mt-0.5" />
                  <span>USA's 8th–10th digits specify duty rates, trade programs, and regulatory controls</span>
                </li>
              </ul>
            </div>
            
            {/* Visual breakdown of the 10-digit code */}
            <h4 className="font-medium text-lg mb-3 text-purple-700">Understanding the Petrochemical HS Code Structure</h4>
            <div className="mb-6 overflow-x-auto">
              <div className="flex items-center">
                {codeParts.map((part, index) => (
                  <div key={index} className="flex flex-col items-center mr-1">
                    <div className={`px-3 py-2 ${part.color} text-white font-bold rounded-t-md`}>
                      {part.digits}
                    </div>
                    <div className="bg-gray-100 p-2 text-xs w-40 h-24 flex items-center text-center rounded-b-md">
                      {part.meaning}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Declaration Requirements */}
        <Card className="mb-8 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b">
            <div className="flex items-center">
              <Info className="h-6 w-6 text-yellow-500 mr-2" />
              <CardTitle>Declaration Requirements</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3 flex items-center text-yellow-700">
                  <Ship className="h-5 w-5 text-yellow-600 mr-2" />
                  Jebel Ali Exports
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-yellow-600 mr-1 flex-shrink-0 mt-0.5" />
                    <span><strong>Mandatory 8-digit HS code</strong> on BOLs and manifests</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-yellow-600 mr-1 flex-shrink-0 mt-0.5" />
                    <span>Example: <span className="font-mono bg-yellow-100 p-0.5 rounded">3901.1030</span> (LLDPE, industrial)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-yellow-600 mr-1 flex-shrink-0 mt-0.5" />
                    <span><strong>Unit of Measure</strong>: Typically metric tons (MT) for bulk petrochemicals</span>
                  </li>
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3 flex items-center text-blue-700">
                  <Factory className="h-5 w-5 text-blue-600 mr-2" />
                  Houston Imports
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-blue-600 mr-1 flex-shrink-0 mt-0.5" />
                    <span><strong>10-digit HTS code</strong> required for CBP clearance</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-blue-600 mr-1 flex-shrink-0 mt-0.5" />
                    <span>Example: <span className="font-mono bg-blue-100 p-0.5 rounded">3901.10.0010</span> (LLDPE, specific gravity &lt;0.94)</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight className="h-4 w-4 text-blue-600 mr-1 flex-shrink-0 mt-0.5" />
                    <span><strong>Unit of Measure</strong>: Kilograms (KG) or liters (L), depending on form</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risks and Consequences */}
        <Card className="mb-8 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-red-50 to-red-100 border-b">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
              <CardTitle>Why Accuracy Matters for Petrochemicals</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Risk of Errors</th>
                    <th className="border p-2 text-left">Consequences</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2 font-medium">Misclassification</td>
                    <td className="border p-2">Delays, penalties (up to <strong>10% of shipment value</strong>), or seizure by CBP</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2 font-medium">Missing/Incomplete Codes</td>
                    <td className="border p-2">Dubai Customs holds shipments until resolved</td>
                  </tr>
                  <tr>
                    <td className="border p-2 font-medium">Duty Evasion</td>
                    <td className="border p-2">Legal action, loss of trade privileges</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Case Scenario */}
        <Card className="mb-8 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-b">
            <div className="flex items-center">
              <Search className="h-6 w-6 text-indigo-500 mr-2" />
              <CardTitle>Scenario: Supply Chain Expert Mitigates Risk</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="mb-4 bg-indigo-50 p-4 rounded-lg">
              <p className="font-medium text-indigo-700 mb-2">Background:</p>
              <p>A UAE supplier ships <strong>polyethylene (3901.10.30)</strong> to Houston. The carrier's BOL lists only a 6-digit HS code, risking delays.</p>
            </div>

            <h4 className="font-medium text-indigo-700 mb-3">Expert Actions:</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <div className="bg-indigo-100 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-indigo-700 font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium">Verify UAE Code</p>
                  <p className="text-sm text-gray-600">Confirms <span className="font-mono">3901.1030</span> aligns with Dubai Customs' 8-digit requirement</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-indigo-100 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-indigo-700 font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium">Map to HTSUS</p>
                  <p className="text-sm text-gray-600">Cross-references with U.S. HTS Chapter 39, identifying <span className="font-mono">3901.10.0010</span> for LLDPE</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-indigo-100 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-indigo-700 font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium">Update BOL</p>
                  <p className="text-sm text-gray-600">Adds both codes and clarifies unit of measure (MT for UAE, KG for USA)</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-indigo-100 rounded-full h-6 w-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-indigo-700 font-bold">4</span>
                </div>
                <div>
                  <p className="font-medium">Compliance Check</p>
                  <p className="text-sm text-gray-600">Ensures SDS and invoices match HS code descriptions to avoid "misdeclaration" penalties</p>
                </div>
              </li>
            </ul>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-700 mb-2 flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Outcome
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                  <span><strong>Jebel Ali</strong>: Customs clears shipment swiftly</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                  <span><strong>Houston</strong>: CBP approves entry with correct duty rate (2.5% for <span className="font-mono">3901.10.0010</span>)</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-green-500 mr-1 flex-shrink-0 mt-0.5" />
                  <span><strong>Importer Saves</strong>: Avoids $25,000 penalty for incomplete coding</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Common HS Codes */}
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-cyan-50 to-cyan-100 border-b">
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-cyan-500 mr-2" />
              <CardTitle>Common Petrochemical HS Codes</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Product</th>
                    <th className="border p-2 text-left">UAE HS Code</th>
                    <th className="border p-2 text-left">U.S. HTS Code</th>
                    <th className="border p-2 text-left">Duty Rate (USA)</th>
                  </tr>
                </thead>
                <tbody>
                  {petrochemicalCodes.map((code, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border p-2">{code.product}</td>
                      <td className="border p-2 font-mono">{code.uaeCode}</td>
                      <td className="border p-2 font-mono">{code.usCode}</td>
                      <td className="border p-2">{code.dutyRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200 mt-6">
              <p className="text-sm text-cyan-700">
                <span className="font-bold">Key Takeaway:</span> Harmonizing Jebel Ali's 8-digit codes with U.S. HTS requirements ensures seamless petrochemical trade. Supply chain experts bridge gaps in classification, reducing delays and legal exposure.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HSCodeExplanation;
