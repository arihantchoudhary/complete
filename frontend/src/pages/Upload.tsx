
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

export default function Upload() {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      
      if (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".csv")) {
        setFile(droppedFile);
      } else {
        toast({
          title: "Invalid file format",
          description: "Please upload a CSV file.",
          variant: "destructive"
        });
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (selectedFile.type === "text/csv" || selectedFile.name.endsWith(".csv")) {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid file format",
          description: "Please upload a CSV file.",
          variant: "destructive"
        });
      }
    }
  };

  const uploadFile = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append("file", file); // "file" is a common key, adjust if backend expects different

    fetch('/api/upload', { // <-- Placeholder URL, please confirm/change if needed
      method: 'POST',
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        // Throw an error to be caught by the .catch block
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Or response.text() if backend sends plain text
    })
    .then(data => {
      console.log('Upload successful:', data); // Log backend response
      toast({
        title: "Upload successful",
        description: `${file.name} has been processed successfully.`
      });
      // Redirect to dashboard after successful upload
      window.location.href = "/dashboard";
    })
    .catch(error => {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "An error occurred during upload.",
        variant: "destructive"
      });
    })
    .finally(() => {
      setIsUploading(false);
    });
  };

  const downloadSampleFile = () => {
    // Create sample CSV content
    const csvContent = `shipment_id,origin,destination,hs_code,product_description,value,weight,carrier,eta
SHP-001,Shanghai,Los Angeles,8471.30.01,Laptop computers,45000,250,Maersk,2023-06-15
SHP-002,Rotterdam,New York,6402.99.31,Sports footwear,28500,320,MSC,2023-06-18
SHP-003,Busan,Long Beach,8517.12.00,Mobile phones,67000,180,CMA CGM,2023-06-12
SHP-004,Hamburg,Miami,9503.00.00,Toys,15000,400,Hapag-Lloyd,2023-06-20
SHP-005,Ningbo,Seattle,8528.72.64,Television sets,31000,550,COSCO,2023-06-17`;

    // Create a Blob from the CSV String
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a download link and trigger the download
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'shipment-manifest-sample.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Shipment Manifest</h1>
          <p className="text-muted-foreground mt-2">Import your shipment data to analyze potential risks and compliance issues.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Upload File</CardTitle>
              <CardDescription>
                Upload a CSV file containing your shipment manifest data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-10 text-center transition-colors ${
                  isDragging 
                    ? 'border-primary bg-primary/5' 
                    : file 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-300 hover:border-primary'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {file ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 text-green-700 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-check"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
                    </div>
                    <div>
                      <p className="text-lg font-medium">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <div className="space-x-3">
                      <Button 
                        variant="default" 
                        onClick={uploadFile}
                        disabled={isUploading}
                      >
                        {isUploading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          'Upload and Analyze'
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setFile(null)}
                      >
                        Change File
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-gray-400 mx-auto flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                    </div>
                    <div>
                      <p className="text-lg font-medium">
                        Drag and drop your file here, or 
                        <label className="text-primary cursor-pointer ml-1">
                          browse
                          <input
                            type="file"
                            accept=".csv"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </label>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Supports CSV files up to 10MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>
                Use our templates or get assistance with your data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-accent/50 p-4 rounded-lg border border-accent">
                <h3 className="font-medium flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text mr-2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                  Download Sample File
                </h3>
                <p className="text-sm mt-2 text-muted-foreground">
                  Not sure about the format? Download our sample file to see the required structure.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 w-full"
                  onClick={downloadSampleFile}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  Download Template
                </Button>
              </div>

              <div>
                <h3 className="font-medium text-sm mb-2">Required Fields</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Shipment ID</li>
                  <li>Origin & Destination</li>
                  <li>HS Code</li>
                  <li>Product Description</li>
                  <li>Value & Weight</li>
                  <li>Carrier & ETA</li>
                </ul>
              </div>

              <div>
                <Button variant="secondary" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-help-circle mr-2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
