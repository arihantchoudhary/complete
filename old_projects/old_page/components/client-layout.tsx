"use client";

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// No longer importing GradientBg here

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative min-h-screen max-w-full overflow-x-hidden">
      <div className="fixed top-4 left-4 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="shrink-0"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <div className="flex">
        <div
          className={`fixed left-0 top-0 h-screen overflow-y-auto transition-all duration-300 bg-background z-10 border-r ${
            isCollapsed ? "w-[68px]" : "w-[240px]"
          }`}
        >
          <Sidebar isCollapsed={isCollapsed} />
        </div>
        {/* Removed relative positioning and gradient layers */}
        <main
          className={`flex-1 min-h-screen w-full transition-all duration-300 overflow-x-hidden ${
            isCollapsed ? "ml-[68px]" : "ml-[240px]"
          }`}
        >
          {/* Removed gradient layers and content wrapper */}
          {children}
        </main>
      </div>
    </div>
  );
}
