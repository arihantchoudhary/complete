"use client";

import { Truck, Phone, ChevronDown, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  
  return (
    <header className={`${isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"} border-b`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-1.5 rounded-md">
            <Truck className="h-5 w-5 text-white" />
          </div>
          <span className={`font-semibold text-xl ${isDark ? "text-white" : "text-gray-900"}`}>City AI</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full flex items-center gap-1">
                  Demo <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link href="/demo" className="w-full cursor-pointer">
                    Aditya Demo
                  </Link>
                </DropdownMenuItem>
                {/* Commented code for future demo options
                <DropdownMenuItem asChild>
                  <Link href="#" className="w-full cursor-pointer">
                    Adam Demo
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#" className="w-full cursor-pointer">
                    Arihant Demo
                  </Link>
                </DropdownMenuItem>
                */}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/report">
              <Button variant="ghost" className="rounded-full">Report</Button>
            </Link>
            <a href="tel:+12087478900">
              <Button variant="ghost" className="rounded-full">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            </a>
          </nav>
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Pear VC Demo</div>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="rounded-full w-10 h-10 p-0 overflow-hidden"
                >
                  {session?.user?.image ? (
                    <Image 
                      src={session.user.image} 
                      alt={session.user.name || "User"} 
                      width={40} 
                      height={40} 
                      className="rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    {session?.user?.name && (
                      <p className="font-medium">{session.user.name}</p>
                    )}
                    {session?.user?.email && (
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {session.user.email}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-red-600 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => signIn()}
              className="rounded-full"
            >
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
