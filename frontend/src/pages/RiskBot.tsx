
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RiskBot() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm RiskBot, your shipping risk assistant. How can I help you with your shipment risk management today?" }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  
  const sampleQuestions = [
    "What are the top risk factors for my shipments?",
    "How can I mitigate tariff classification risks?",
    "Explain the impact of current port delays",
    "What documents are required for electronics imports?",
    "Analyze compliance risks for my Shanghai shipments"
  ];

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
      } else if (inputValue.toLowerCase().includes("document") || inputValue.toLowerCase().includes("import")) {
        response = "For electronics imports, you'll need: Commercial Invoice, Packing List, Bill of Lading, Certificate of Origin, Importer Security Filing (ISF), and potentially FCC certifications. The most common missing document for your shipments is the detailed Certificate of Origin, which has led to 3 delayed clearances in the past month.";
      } else if (inputValue.toLowerCase().includes("shanghai") || inputValue.toLowerCase().includes("compliance")) {
        response = "For your Shanghai shipments, I've identified three primary compliance risks:\n\n1. HS code misclassification risk is high (45% confidence) for laptop components\n2. Product marking requirements may not be met for SHP-003\n3. Value declaration inconsistencies in SHP-001 could trigger customs review\n\nI recommend prioritizing a review of the HS classifications and ensuring proper value documentation.";
      }
      
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
    }, 1000);
    
    // Clear input
    setInputValue("");
  };

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">RiskBot Assistant</h1>
          <p className="text-muted-foreground mt-2">Your AI-powered shipping risk management assistant.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="h-[calc(100vh-16rem)]">
              <CardHeader className="border-b bg-muted/50">
                <div className="flex items-center">
                  <div className="bg-shipsafe-teal rounded-full p-2 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot text-white"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                  </div>
                  <div>
                    <CardTitle>RiskBot</CardTitle>
                    <CardDescription>Ask questions about shipment risks and get AI-powered insights</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-full">
                <div className="flex-grow overflow-auto p-6">
                  <div className="space-y-4">
                    {messages.map((msg, idx) => (
                      <div 
                        key={idx}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {msg.role === "assistant" && (
                          <div className="bg-shipsafe-teal rounded-full p-2 h-8 w-8 flex items-center justify-center text-white mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
                          </div>
                        )}
                        <div 
                          className={`rounded-lg px-4 py-2 max-w-[75%] ${
                            msg.role === "user" 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted border"
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.content}</p>
                        </div>
                        {msg.role === "user" && (
                          <div className="bg-foreground rounded-full p-2 h-8 w-8 flex items-center justify-center text-white ml-2">
                            JD
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendMessage();
                      }}
                      className="flex-grow border rounded-md px-3 py-2"
                      placeholder="Type your question here..."
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!inputValue.trim()}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Suggested Questions</CardTitle>
                <CardDescription>
                  Common questions to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sampleQuestions.map((question, idx) => (
                    <Button 
                      key={idx} 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => {
                        setInputValue(question);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square mr-2 flex-shrink-0"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      <span>{question}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>About RiskBot</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info text-shipsafe-teal mr-2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  <p className="text-sm">Powered by advanced risk analysis algorithms</p>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info text-shipsafe-teal mr-2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  <p className="text-sm">Analyzes your shipment data in real-time</p>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info text-shipsafe-teal mr-2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  <p className="text-sm">Provides actionable insights for risk mitigation</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
