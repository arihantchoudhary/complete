"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlayCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  isCollapsed: boolean;
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  const pathname = usePathname();

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
      label: "Report",
      icon: FileText,
      color: "text-pink-700",
      href: "/report",
    },
  ];

  return (
    <div className="flex h-full flex-col space-y-4 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="space-y-2 px-2">
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
    </div>
  );
}
