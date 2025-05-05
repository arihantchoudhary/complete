"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  FileUp, FileText, CheckCircle, AlertTriangle, 
  FileCheck, ClipboardCheck, FileSpreadsheet 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface DocumentUploadProps {
  onComplete?: () => void;
}

export function DocumentUploadDashboard({ onComplete }: DocumentUploadProps) {
  const [documents, setDocuments] = useState({
    "bill_of_lading": null as File | null,
    "packing_list": null as File | null,
    "commercial_invoice": null as File | null
  });
  
  const [uploadStatus, setUploadStatus] = useState({
    "bill_of_lading": "pending" as "pending" | "uploaded" | "processed" | "verified" | "error",
    "packing_list": "pending" as "pending" | "uploaded" | "processed" | "verified" | "error",
    "commercial_invoice": "pending" as "pending" | "uploaded" | "processed" | "verified" | "error"
  });
  
  const [processing, setProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [completedUpload, setCompletedUpload] = useState(false);
  
  const { toast } = useToast();
  const router = useRouter();

  const documentTypes = {
    "bill_of_lading": { 
      title: "Bill of Lading", 
      description: "Official shipping document issued by carrier",
      icon: <ClipboardCheck className="h-6 w-6 text-blue-500" />
    },
    "packing_list": { 
      title: "Packing List", 
      description: "Detailed list of packaged items",
      icon: <FileCheck className="h-6 w-6 text-green-500" />
    },
    "commercial_invoice": { 
      title: "Commercial Invoice", 
      description: "Commercial document for customs declaration",
      icon: <FileSpreadsheet className="h-6 w-6 text-amber-500" />
    }
  };

  const handleFileChange = (docType: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setDocuments(prev => ({ ...prev, [docType]: selectedFile }));
      setUploadStatus(prev => ({ ...prev, [docType]: "uploaded" }));
      
      toast({
        title: `${documentTypes[docType as keyof typeof documentTypes].title} uploaded`,
        description: "File ready for processing",
      });
    }
  };

  const allFilesUploaded = Object.values(documents).every(file => file !== null);
  
  const processDocuments = async () => {
    if (!allFilesUploaded) return;
    
    setProcessing(true);
    setProcessingProgress(0);
    
    // Simulate OCR and verification process with progress
    const simulateProgress = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setProcessingProgress(progress);
        
        if (progress >= 100) {
          clearInterval(interval);
          completeProcessing();
        }
      }, 200);
    };
    
    const completeProcessing = () => {
      // Update all document statuses to verified
      setUploadStatus({
        "bill_of_lading": "verified",
        "packing_list": "verified",
        "commercial_invoice": "verified"
      });
      
      setProcessing(false);
      setCompletedUpload(true);
      
      toast({
        title: "Document processing complete",
        description: "All documents have been verified",
      });
      
      // In a real implementation, we would send the files to the backend for processing
      // and store the results in a database
    };
    
    // Start simulation
    simulateProgress();
  };
  
  const viewResults = () => {
    // In a real implementation, we would navigate to the verification results page
    // with the document IDs or a session ID to retrieve results from the database
    router.push("/document-verification-results");
    if (onComplete) onComplete();
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "uploaded":
        return <FileUp className="h-5 w-5 text-blue-500" />;
      case "processing":
      case "pending":
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-xl">Document Upload & Verification</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          {!completedUpload ? (
            <>
              <p className="text-muted-foreground mb-6">
                Upload the required documents to proceed with shipment verification. All documents must
                be in PDF format and clearly legible.
              </p>
              
              <Tabs defaultValue="bill_of_lading" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="bill_of_lading">Bill of Lading</TabsTrigger>
                  <TabsTrigger value="packing_list">Packing List</TabsTrigger>
                  <TabsTrigger value="commercial_invoice">Commercial Invoice</TabsTrigger>
                </TabsList>
                
                {Object.entries(documentTypes).map(([docType, { title, description, icon }]) => (
                  <TabsContent key={docType} value={docType} className="mt-0">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4 mb-4">
                          {icon}
                          <div>
                            <h3 className="font-semibold">{title}</h3>
                            <p className="text-sm text-muted-foreground">{description}</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg hover:border-primary/50 transition-colors">
                          <input
                            type="file"
                            id={`file-upload-${docType}`}
                            className="hidden"
                            onChange={(e) => handleFileChange(docType, e)}
                            accept=".pdf"
                            disabled={processing}
                          />
                          <label
                            htmlFor={`file-upload-${docType}`}
                            className="flex flex-col items-center cursor-pointer w-full"
                          >
                            {documents[docType as keyof typeof documents] ? (
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                  <FileUp className="h-5 w-5 mr-2 text-blue-500" />
                                  <span className="text-sm font-medium">
                                    {documents[docType as keyof typeof documents]?.name}
                                  </span>
                                </div>
                                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                  Uploaded
                                </span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center">
                                <FileUp className="h-8 w-8 mb-2 text-gray-400" />
                                <span className="text-sm font-medium text-gray-700">
                                  Upload {title}
                                </span>
                                <span className="text-xs text-muted-foreground mt-1">
                                  PDF format, up to 10MB
                                </span>
                              </div>
                            )}
                          </label>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
              
              {processing && (
                <div className="mt-6">
                  <p className="text-sm font-medium mb-2">Processing documents...</p>
                  <Progress value={processingProgress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Performing OCR and verification
                  </p>
                </div>
              )}
              
              <div className="flex justify-center mt-6">
                <Button 
                  onClick={processDocuments}
                  disabled={!allFilesUploaded || processing}
                  className="w-full max-w-md"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {processing ? "Processing..." : "Process Documents"}
                </Button>
              </div>
            </>
          ) : (
            <div className="py-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">All Documents Processed</h3>
              <p className="text-muted-foreground mb-6">
                Your documents have been successfully processed and verified.
              </p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                {Object.entries(documentTypes).map(([docType, { title, icon }]) => (
                  <Card key={docType} className="p-4">
                    <div className="flex flex-col items-center">
                      {icon}
                      <h4 className="font-medium mt-2">{title}</h4>
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 mt-2">
                        Verified
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
              
              <Button onClick={viewResults} className="min-w-[200px]">
                View Verification Results
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default DocumentUploadDashboard;
