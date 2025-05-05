
import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Navbar showAIAssistant={showAIAssistant} setShowAIAssistant={setShowAIAssistant} />
          <main className="flex-grow p-6 relative">
            <div className="container mx-auto">
              <div className="flex justify-between gap-6">
                <div className={`transition-all duration-300 ${showAIAssistant ? 'w-2/3' : 'w-full'}`}>
                  {children}
                </div>
                {showAIAssistant && (
                  <div className="w-1/3 animate-fade-in">
                    <div className="sticky top-6">
                      <AIAssistant />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AIAssistant() {
  const sampleQuestions = [
    "What are the top risk factors for my shipments?",
    "How can I mitigate tariff classification risks?",
    "Explain the impact of current port delays"
  ];

  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm RiskBot, your shipping risk assistant. How can I help you today?" }
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { role: "user", content: inputValue }]);
    
    // Simulate assistant response
    setTimeout(() => {
      let response = "I'm analyzing your question. Let me provide some insights on this topic.";
      
      if (inputValue.toLowerCase().includes("risk")) {
        response = "Based on your current shipments, the top risk factors include tariff misclassification (34% of cases), port congestion in Shanghai, and incomplete documentation. I recommend reviewing the detailed risk report for actionable mitigation steps.";
      } else if (inputValue.toLowerCase().includes("tariff")) {
        response = "To mitigate tariff classification risks, ensure you have proper product documentation, use consistent HS codes across all paperwork, and consider a pre-clearance review for high-value shipments. Would you like me to explain any of these strategies in more detail?";
      } else if (inputValue.toLowerCase().includes("delay") || inputValue.toLowerCase().includes("port")) {
        response = "Current port delays are affecting 23% of global routes, with Shanghai and Rotterdam experiencing the most significant congestion. For your upcoming shipments, I recommend building in 3-5 extra days of lead time and considering alternative routing through Ningbo or Antwerp.";
      }
      
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    }, 1000);
    
    // Clear input
    setInputValue("");
  };

  return (
    <div className="bg-white border border-border rounded-lg shadow-sm h-[calc(100vh-6rem)] flex flex-col overflow-hidden">
      <div className="bg-shipsafe-navy p-4 text-white flex items-center">
        <div className="bg-shipsafe-teal rounded-full p-2 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        </div>
        <h2 className="font-semibold">RiskBot Assistant</h2>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-3">
        {messages.map((msg, idx) => (
          <div 
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`rounded-lg px-4 py-2 max-w-[85%] ${
              msg.role === "user" 
                ? "bg-shipsafe-navy text-white" 
                : "bg-gray-100 text-gray-800"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t">
        <h3 className="text-sm font-medium mb-2 text-gray-500">Suggested Questions</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {sampleQuestions.map((question, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputValue(question);
              }}
              className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-700"
            >
              {question}
            </button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            className="flex-grow rounded-full border border-gray-300 px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-shipsafe-teal"
            placeholder="Ask RiskBot a question..."
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-shipsafe-teal hover:bg-shipsafe-teal/90 text-white rounded-full p-2 disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
