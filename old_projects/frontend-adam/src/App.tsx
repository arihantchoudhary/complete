
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes as RouterRoutes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import TradeRoutes from "./pages/Routes";
import Risks from "./pages/Risks";
import Teams from "./pages/Teams";
import ApiIntegration from "./pages/ApiIntegration";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Set up theme switcher from localStorage or system preference
  useEffect(() => {
    const isDarkMode = localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && 
        window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouterRoutes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/routes" element={<TradeRoutes />} />
            <Route path="/dashboard/risks" element={<Risks />} />
            <Route path="/dashboard/teams" element={<Teams />} />
            <Route path="/dashboard/api" element={<ApiIntegration />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
