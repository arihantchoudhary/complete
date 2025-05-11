"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlayCircle, FileText, Phone, User, LogOut, ChevronDown, FormInput, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  isCollapsed: boolean;
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const routes = [
    {
      label: "Home",
      icon: Home,
      href: "/",
      color: "text-sky-500",
    },
    {
      label: "Demo",
      icon: PlayCircle,
      href: "/demo",
      color: "text-violet-500",
    },
    {
      label: "Input Demo",
      icon: FormInput,
      href: "/input-demo",
      color: "text-amber-500",
    },
    {
      label: "World Ports",
      icon: Globe,
      href: "/world-ports",
      color: "text-blue-600",
    },
    {
      label: "Documents",
      icon: FileText,
      href: "/document-upload",
      color: "text-emerald-600",
    },
    {
      label: "Report",
      icon: FileText,
      color: "text-pink-700",
      href: "/report",
    },
    {
      label: "Call",
      icon: Phone,
      href: "tel:+12087478900",
      color: "text-green-600",
    },
  ];

  return (
    <div className="flex h-full flex-col justify-between py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div>
        <div className="px-3 py-2">
          <h2 className={cn("text-lg font-semibold", isCollapsed ? "text-center" : "")}>
            {isCollapsed ? "CA" : "City AI"}
          </h2>
          <p className={cn("text-xs text-muted-foreground", isCollapsed ? "hidden" : "")}>Supply Chain AI Solutions</p>
        </div>
        <nav className="space-y-2 px-2 mt-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-primary/10 rounded-lg transition",
                pathname === route.href ? "bg-primary/10" : "transparent",
                isCollapsed ? "justify-center" : ""
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5", route.color)} />
                {!isCollapsed && <span className="ml-3">{route.label}</span>}
              </div>
            </Link>
          ))}
        </nav>

        {/* Demo dropdown */}
        {!isCollapsed && (
          <div className="mt-6 px-3">
            <p className="text-xs font-medium text-muted-foreground mb-2">DEMO VERSIONS</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span>Aditya Demo</span> <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem asChild>
                  <Link href="/demo" className="cursor-pointer">Aditya Demo</Link>
                </DropdownMenuItem>
                {/* Commented code for future demo options
                <DropdownMenuItem>
                  <Link href="#">Adam Demo</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#">Arihant Demo</Link>
                </DropdownMenuItem>
                */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* Auth section */}
      <div className="px-3 pt-2 mt-auto border-t">
        {isAuthenticated ? (
          <div>
            {!isCollapsed && (
              <div className="flex items-center gap-2 mb-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  {session?.user?.image ? (
                    <Image 
                      src={session.user.image} 
                      alt={session.user.name || "User"} 
                      fill
                      sizes="32px"
                      style={{ objectFit: "cover" }}
                      className="rounded-full"
                    />
                  ) : (
                    <User className="h-8 w-8 p-1 bg-primary/10 rounded-full" />
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{session?.user?.name?.split(' ')[0]}</p>
                  <p className="text-xs text-muted-foreground truncate w-[180px]">{session?.user?.email}</p>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Link href="/profile" className={cn(
                "text-sm group flex p-2 w-full justify-start font-medium cursor-pointer hover:bg-primary/10 rounded-lg transition",
                isCollapsed ? "justify-center" : ""
              )}>
                <User className="h-5 w-5 text-primary/80" />
                {!isCollapsed && <span className="ml-2">Profile</span>}
              </Link>
              
              <Button 
                variant="ghost" 
                className={cn(
                  "text-sm p-2 w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700",
                  isCollapsed ? "justify-center" : ""
                )}
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="h-5 w-5" />
                {!isCollapsed && <span className="ml-2">Sign out</span>}
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            variant="default" 
            className="w-full"
            onClick={() => signIn()}
          >
            {isCollapsed ? <User className="h-5 w-5" /> : "Sign in"}
          </Button>
        )}

        {!isCollapsed && (
          <div className="mt-4 px-2 pb-4 text-xs text-center text-muted-foreground">
            <p>City AI © 2025</p>
            <p>Version 1.0.0</p>
          </div>
        )}
      </div>
    </div>
  );
}
