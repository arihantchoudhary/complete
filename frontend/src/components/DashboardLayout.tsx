
import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  BarChart, 
  Globe, 
  AlertTriangle, 
  Settings, 
  Users,
  Layers,
  LogOut,
  Menu,
  X
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart },
    { name: "Routes", href: "/dashboard/routes", icon: Globe },
    { name: "Risks", href: "/dashboard/risks", icon: AlertTriangle },
    { name: "Teams", href: "/dashboard/teams", icon: Users },
    { name: "API Integration", href: "/dashboard/api", icon: Layers },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    // In a real app, you would handle logout functionality here
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0 md:w-16'} flex-shrink-0 border-r bg-card/50 transition-all duration-300 overflow-hidden flex flex-col`}>
        <div className="flex h-16 items-center justify-between px-4">
          <Link to="/" className={`flex items-center gap-2 ${!sidebarOpen && 'md:hidden'}`}>
            <Globe className="h-6 w-6 text-primary" />
            <span className="font-semibold tracking-tight">LogiTrade</span>
          </Link>
          <button
            className="md:hidden"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="py-4 flex-grow">
          <nav className="space-y-2 px-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href) 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className={sidebarOpen ? "" : "md:hidden"}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Fixed logout button at bottom */}
        <div className="px-2 py-4 mt-auto border-t">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-sm font-medium"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className={sidebarOpen ? "" : "md:hidden"}>Log out</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <button className="hidden md:block" onClick={toggleSidebar}>
            <Menu size={20} />
          </button>
          <div className="ml-auto flex items-center gap-4">
            <ThemeToggle />
            <Button asChild variant="outline" size="sm">
              <Link to="/">Back to Website</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/#demo">Book a Demo</Link>
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
