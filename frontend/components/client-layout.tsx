"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-20 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="shrink-0"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
        <div className="flex flex-1 items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>
      </div>
      <div className="flex pt-16">
        <div
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300 bg-background z-10 border-r ${
            isCollapsed ? "w-[68px]" : "w-[240px]"
          }`}
        >
          <Sidebar isCollapsed={isCollapsed} />
        </div>
        <main
          className={`flex-1 min-h-[calc(100vh-4rem)] transition-all duration-300 ${
            isCollapsed ? "ml-[68px]" : "ml-[240px]"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
