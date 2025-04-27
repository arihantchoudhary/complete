"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface DocumentAnalyzerProps {
  onAnalyze: () => void;
}

export function DocumentAnalyzer({ onAnalyze }: DocumentAnalyzerProps) {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      toast({
        title: "File uploaded successfully",
        description: "Ready to analyze your document",
      });
    }
  };

  const handleAnalyze = () => {
    toast({
      title: "Analysis started",
      description: "Processing your Bill of Lading...",
    });
    // Simulate processing time
    setTimeout(() => {
      onAnalyze();
    }, 2000);
  };

  return (
    <Card className="p-6">
      <CardContent className="text-center p-0">
        <h2 className="text-2xl font-semibold mb-4">Upload Bill of Lading</h2>
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center justify-center w-full max-w-md p-6 border-2 border-dashed rounded-lg hover:border-primary/50 transition-colors">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center cursor-pointer"
            >
              <FileUp className="h-8 w-8 mb-2 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                {file ? file.name : "Upload your Bill of Lading"}
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                PDF, DOC up to 10MB
              </span>
            </label>
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={!file}
            className="w-full max-w-md"
          >
            <FileText className="mr-2 h-4 w-4" />
            Analyze Document
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default DocumentAnalyzer;
