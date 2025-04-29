"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { ClientLayout } from "@/components/client-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { InteractiveMap, InteractiveMapRef } from "@/components/interactive-map";
import { AlertTriangle, CheckCircle, MessageSquare, Send, Bot, User, Flag, Ship, CloudRain, Database, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Type definitions
type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

type RiskLevel = "high" | "medium" | "low";

// Map coordinates
const JEBEL_ALI_COORDS: [number, number] = [55.0271, 24.9796];
const HOUSTON_COORDS: [number, number] = [-95.3698, 29.7604];
const SUEZ_CANAL_COORDS: [number, number] = [32.3498, 30.6681];
const KHALIFA_PORT_COORDS: [number, number] = [54.6397, 24.8135];

// Pre-defined hardcoded chat conversation
const DEMO_CHAT: ChatMessage[] = [
  {
    role: "user",
    content: "Hi, this is Sarah from Gulf PetroChem. Our shipment of polyethylene from Jebel Ali to Houston is stuck in Dubai Customs. They're threatening fines, and we don't know why!"
  },
  {
    role: "assistant",
    content: "I've identified the issue. There's an incomplete HS code on your Bill of Lading. It's listed as `3901.10` instead of the required 8-digit code for UAE and 10-digit HTS code for U.S. This has triggered a customs compliance flag with a risk score of 72/100."
  },
  {
    role: "user",
    content: "Can you help fix this? What should the correct codes be?"
  },
  {
    role: "assistant",
    content: "For your linear low-density polyethylene:\n\n• Jebel Ali requires 8-digit code: `3901.1030`\n• Houston requires 10-digit code: `3901.10.0010`\n\nI'm generating an amended BOL and submitting it electronically to Dubai Customs. Your risk score will reduce to 65/100 once we fix this issue."
  },
  {
    role: "assistant",
    content: "I also recommend rerouting through Khalifa Port to avoid Jebel Ali's post-flood delays. This would reduce your risk score further by avoiding the port congestion."
  },
  {
    role: "user",
    content: "That would be great. What about future shipments?"
  },
  {
    role: "assistant",
    content: "Good news! Dubai Customs has accepted the amended HS codes. Your risk score is now 55/100.\n\nFor future shipments, I recommend using our HS Code Automated Classification system to prevent these issues."
  },
  {
    role: "assistant",
    content: "I've confirmed your route change to Khalifa Port. Your vessel has been granted priority berthing. Risk score now at 45/100."
  },
  {
    role: "user",
    content: "Fantastic! What was our total cost and time savings?"
  },
  {
    role: "assistant",
    content: "Your final risk score is 35/100 - within our 'low risk' threshold. Here's the impact of our changes:\n\n• Time saved: 12+ hours of manual corrections\n• Days saved: 4 days transit time\n• Cost avoided: $50,000 in fines + $15,000 in demurrage fees\n\nYour shipment will now arrive in Houston 4 days earlier than originally scheduled, with full compliance."
  }
];

export default function InputDemo() {
  const { status } = useSession();
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatStep, setChatStep] = useState(0);
  const [riskScore, setRiskScore] = useState(72);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>("high");
  const [showLowRiskRoute, setShowLowRiskRoute] = useState(false);
  const [isAutoPlayOn, setIsAutoPlayOn] = useState(false);
  const [isConnectedToERP, setIsConnectedToERP] = useState(false);
  const [isScrapingBOLs, setIsScrapingBOLs] = useState(false);
  
  // Refs
  const mapRef = useRef<InteractiveMapRef>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize with first message
  useEffect(() => {
    setChatMessages(DEMO_CHAT.slice(0, 1));
  }, []);
  
  // Set up risk scores based on chat progress
  useEffect(() => {
    if (chatStep >= 8) {
      setRiskScore(35);
      setRiskLevel("low");
      setShowLowRiskRoute(true);
    } else if (chatStep >= 6) {
      setRiskScore(45);
      setRiskLevel("medium");
      setShowLowRiskRoute(true);
    } else if (chatStep >= 4) {
      setRiskScore(55);
      setRiskLevel("medium");
    } else if (chatStep >= 2) {
      setRiskScore(65);
      setRiskLevel("high");
    }
  }, [chatStep]);
  
  // Set up map
  useEffect(() => {
    if (mapRef.current) {
      // Clear previous markers/routes
      mapRef.current.clearAllMarkers();
      mapRef.current.clearAllRoutes();
      
      // Add markers
      mapRef.current.addMarker(
        HOUSTON_COORDS, 
        { color: "#ef4444" }, 
        "<strong>Houston</strong><br>Destination"
      );
      
      if (showLowRiskRoute) {
        // Add alternative route markers/routes
        mapRef.current.addMarker(
          KHALIFA_PORT_COORDS, 
          { color: "#10b981" }, 
          "<strong>Khalifa Port</strong><br>Alternative Origin"
        );
        
        mapRef.current.addRoute(
          "alt-route", 
          [KHALIFA_PORT_COORDS, HOUSTON_COORDS], 
          { "line-color": "#10b981", "line-width": 3 }
        );
      } else {
        // Add original route markers/routes
        mapRef.current.addMarker(
          JEBEL_ALI_COORDS, 
          { color: "#3b82f6" }, 
          "<strong>Jebel Ali</strong><br>Origin"
        );
        
        mapRef.current.addRoute(
          "main-route", 
          [JEBEL_ALI_COORDS, SUEZ_CANAL_COORDS, HOUSTON_COORDS], 
          { "line-color": "#ef4444", "line-width": 3 }
        );
      }
      
      // Fit map to show all markers
      mapRef.current.fitBounds([
        [Math.min(JEBEL_ALI_COORDS[0], HOUSTON_COORDS[0]), Math.min(JEBEL_ALI_COORDS[1], HOUSTON_COORDS[1])],
        [Math.max(JEBEL_ALI_COORDS[0], HOUSTON_COORDS[0]), Math.max(JEBEL_ALI_COORDS[1], HOUSTON_COORDS[1])]
      ]);
    }
  }, [showLowRiskRoute]);
  
  // Auto advance chat in auto-play mode
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isAutoPlayOn && chatStep < DEMO_CHAT.length - 1) {
      timeoutId = setTimeout(() => {
        setChatStep(prev => {
          const newStep = prev + 1;
          setChatMessages(DEMO_CHAT.slice(0, newStep + 1));
          return newStep;
        });
      }, 2500);
    }
    
    return () => clearTimeout(timeoutId);
  }, [isAutoPlayOn, chatStep]);
  
  // Scroll to bottom of chat when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);
  
  // Input handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    setChatMessages(prev => [...prev, { role: "user", content: inputValue }]);
    setInputValue("");
    
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev, 
        {
          role: "assistant",
          content: "This is a demo showing how our system can identify and fix Bills of Lading issues. Please use the auto-play button to see the full scenario."
        }
      ]);
    }, 1000);
  };
  
  const handleNextMessage = () => {
    if (chatStep < DEMO_CHAT.length - 1) {
      const newStep = chatStep + 1;
      setChatStep(newStep);
      setChatMessages(DEMO_CHAT.slice(0, newStep + 1));
    }
  };
  
  const handleAutoPlay = () => {
    setIsAutoPlayOn(prev => !prev);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  const handleConnectToERP = () => {
    setIsConnectedToERP(true);
    setTimeout(() => {
      setIsScrapingBOLs(true);
      setTimeout(() => {
        setIsScrapingBOLs(false);
        setChatMessages([
          {
            role: "user",
            content: "Can you scan my Salesforce BOLs for risks?"
          },
          {
            role: "assistant",
            content: "I've found 4 Bills of Lading in your Salesforce. The polyethylene shipment from Jebel Ali to Houston needs immediate attention due to incomplete HS codes."
          }
        ]);
      }, 2000);
    }, 1000);
  };
  
  // Helper functions
  const getRiskColor = (level: RiskLevel) => {
    switch (level) {
      case "high": return "text-red-500";
      case "medium": return "text-amber-500";
      case "low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  return (
    <ClientLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Supply Chain Risk Assessment</h1>
        
        {/* ERP Integration */}
        <Card className="mb-6">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              One-Click ERP Integration
            </CardTitle>
            <CardDescription className="text-indigo-100">
              Connect to Salesforce to scan all your Bills of Lading
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Button 
              className={isConnectedToERP ? "bg-green-600 hover:bg-green-700" : ""}
              onClick={handleConnectToERP} 
              disabled={isConnectedToERP || isScrapingBOLs}
              size="lg"
            >
              {isConnectedToERP ? (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  {isScrapingBOLs ? "Scanning BOLs..." : "4 BOLs Found"}
                </>
              ) : (
                <>
                  <Database className="mr-2 h-5 w-5" />
                  Connect to Salesforce & Scan BOLs
                </>
              )}
            </Button>
            
            {isScrapingBOLs && (
              <div className="flex items-center mt-4">
                <RefreshCw className="h-5 w-5 animate-spin mr-2" />
                <span>Scanning and analyzing BOLs...</span>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Main Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-7">
            <Card className="h-[600px] flex flex-col shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-t-lg flex flex-row justify-between items-center">
                <div className="flex items-center">
                  <Bot className="mr-2 h-5 w-5" />
                  <h2 className="text-xl font-semibold">City AI Logistics Assistant</h2>
                </div>
                <div>
                  <Button 
                    variant={isAutoPlayOn ? "destructive" : "secondary"} 
                    size="sm" 
                    onClick={handleAutoPlay}
                    className="text-xs mr-2"
                  >
                    {isAutoPlayOn ? "Stop" : "Auto-Play"}
                  </Button>
                  {!isAutoPlayOn && (
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={handleNextMessage}
                      disabled={chatStep >= DEMO_CHAT.length - 1}
                      className="text-xs"
                    >
                      Next
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-[450px] px-4 py-3">
                  <div className="space-y-4">
                    {chatMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === "user"
                              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-tr-none"
                              : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 rounded-tl-none"
                          }`}
                        >
                          <div className="flex items-start">
                            {message.role === "assistant" && (
                              <Bot className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                            )}
                            <p className="whitespace-pre-line">{message.content}</p>
                            {message.role === "user" && (
                              <User className="h-5 w-5 ml-2 mt-0.5 flex-shrink-0" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-4 border-t">
                <div className="flex space-x-2 w-full">
                  <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          {/* Risk Score & Map */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Risk Score Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Shipment Risk Score</span>
                  <Badge 
                    variant={riskLevel === "high" ? "destructive" : "outline"}
                    className={riskLevel !== "high" ? "bg-amber-100 text-amber-700 border-amber-200" : ""}
                  >
                    {showLowRiskRoute ? "After Correction" : "Before Correction"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Score display */}
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="absolute inset-0 transform -rotate-90 w-full h-full">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        strokeWidth="12"
                        stroke="#e5e7eb"
                        fill="none"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        strokeWidth="12"
                        stroke={
                          riskLevel === "high" 
                            ? "#ef4444" 
                            : riskLevel === "medium" 
                              ? "#f97316" 
                              : "#10b981"
                        }
                        strokeDasharray={`${2 * Math.PI * 56 * (riskScore / 100)} ${2 * Math.PI * 56}`}
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                    <div className="text-center">
                      <span className={`text-4xl font-bold ${getRiskColor(riskLevel)}`}>
                        {riskScore}
                      </span>
                      <span className="text-lg text-muted-foreground block">Risk Score</span>
                    </div>
                  </div>
                </div>
                
                {/* Risk factors */}
                <h3 className="text-lg font-semibold mb-2 text-left">Risk Factors</h3>
                <div className="space-y-2">
                  <div className={`flex items-center justify-between p-3 rounded-md ${chatStep >= 3 ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex items-start space-x-2">
                      <Flag className={`h-5 w-5 ${chatStep >= 3 ? 'text-green-500' : 'text-red-500'}`} />
                      <span>Incomplete HS Code</span>
                    </div>
                    {chatStep >= 3 && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                  
                  <div className={`flex items-center justify-between p-3 rounded-md ${chatStep >= 6 ? 'bg-green-50' : 'bg-amber-50'}`}>
                    <div className="flex items-start space-x-2">
                      <Ship className={`h-5 w-5 ${chatStep >= 6 ? 'text-green-500' : 'text-amber-500'}`} />
                      <span>Port Congestion</span>
                    </div>
                    {chatStep >= 6 && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                  
                  <div className={`flex items-center justify-between p-3 rounded-md ${chatStep >= 7 ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex items-start space-x-2">
                      <AlertTriangle className={`h-5 w-5 ${chatStep >= 7 ? 'text-green-500' : 'text-red-500'}`} />
                      <span>Route Risk</span>
                    </div>
                    {chatStep >= 7 && <CheckCircle className="h-5 w-5 text-green-500" />}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Map Card */}
            <Card>
              <CardHeader>
                <CardTitle>Shipment Route</CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-[280px]">
                <InteractiveMap
                  ref={mapRef}
                  initialProjection="mercator"
                  mapStyle="mapbox://styles/mapbox/dark-v11"
                  height="280px"
                  className="rounded-b-lg"
                  initialZoom={1.5}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
