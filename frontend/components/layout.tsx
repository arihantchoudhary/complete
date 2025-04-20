"use client";

import type React from "react";
import { Navbar } from "@/components/navbar";
import { useTheme } from "next-themes";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <Navbar />
      <main className="flex-1 flex flex-col overflow-auto">{children}</main>
    </div>
  );
}
