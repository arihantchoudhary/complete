"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { DocumentUploadDashboard } from "@/components/document-upload-dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocumentUploadPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Document Management</h1>
      
      <div className="mb-8">
        <Card className="bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Upload & Verify Trade Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Upload your Bill of Lading, Packing List, and Commercial Invoice to verify
              document consistency and extract key information for your shipment.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <DocumentUploadDashboard 
        onComplete={() => {
          console.log("Document processing completed");
        }}
      />
    </div>
  );
}
