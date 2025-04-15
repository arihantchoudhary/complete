import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SupplyChainDisruptions from "./pages/SupplyChainDisruptions";
import EconomicImpact from "./pages/EconomicImpact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout><Index /></PageLayout>} />
          <Route path="/supply-chain-disruptions" element={<PageLayout><SupplyChainDisruptions /></PageLayout>} />
          <Route path="/economic-impact" element={<PageLayout><EconomicImpact /></PageLayout>} />
          <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
