
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { DemoController, PersonaConfig } from './components/DemoController';
import MapTest from './components/MapTest';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [selectedPersona, setSelectedPersona] = useState<PersonaConfig | null>(null);

  const handlePersonaChange = (persona: PersonaConfig) => {
    setSelectedPersona(persona);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <DemoController onPersonaChange={handlePersonaChange} />
          <Routes>
            <Route path="/" element={<MapTest />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
