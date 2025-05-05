
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  showAIAssistant: boolean;
  setShowAIAssistant: (show: boolean) => void;
}

export function Navbar({ showAIAssistant, setShowAIAssistant }: NavbarProps) {
  return (
    <header className="border-b bg-white py-3 px-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-gray-700 hover:text-gray-900" />
            <nav>
              <ul className="flex items-center space-x-1">
                <li>
                  <a 
                    href="/" 
                    className="text-sm text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-sm text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-sm text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              size="sm"
              className={`gap-2 ${showAIAssistant ? 'bg-accent text-accent-foreground' : ''}`}
              onClick={() => setShowAIAssistant(!showAIAssistant)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
              RiskBot Assistant
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
