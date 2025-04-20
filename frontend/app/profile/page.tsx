"use client";

import { useSession } from "next-auth/react";
import { Layout } from "@/components/layout";
import { ProtectedRoute } from "@/components/protected-route";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { User } from "lucide-react";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session } = useSession();
  
  return (
    <Layout>
      <ProtectedRoute>
        <div className="container mx-auto py-10 px-6 pt-8">
          <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Your personal details</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100 mb-4 flex items-center justify-center">
                  {session?.user?.image ? (
                    <Image 
                      src={session.user.image} 
                      alt={session.user.name || "User"} 
                      fill
                      sizes="128px"
                      style={{ objectFit: "cover" }}
                      className="rounded-full"
                      priority
                    />
                  ) : (
                    <User className="h-16 w-16 text-gray-400" />
                  )}
                </div>
                
                <h2 className="text-xl font-semibold mb-1">{session?.user?.name}</h2>
                <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  This is a protected page only accessible to authenticated users. You're 
                  currently signed in with your Google account.
                </p>
                <div className="mt-4 p-4 bg-primary/5 rounded-md">
                  <h3 className="font-medium mb-2">Account Details</h3>
                  <ul className="space-y-2 text-sm">
                    <li><span className="font-medium">Name:</span> {session?.user?.name}</li>
                    <li><span className="font-medium">Email:</span> {session?.user?.email}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
}
