"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { OptionButtons } from "@/components/option-buttons";
import type { ShipmentDetails } from "@/types";

// Constants
const PROMPTS = [
  "Hi there! I'm your City AI logistics assistant — let's plan your shipment and check for risks together.\n\nWhat is the origin city and port for your shipment?",
  "Got it — shipping out from Jebel Ali. Now, what's the destination city and port?",
  "Great — heading to Houston. What type of product are you shipping?",
  "Perfect. What's the shipment value in USD?",
  "Thanks — and who's your supplier name?",
  "Thanks — quick check before I pull up your risk report:\nIs this a one-time shipment or part of a recurring supply route?",
  "Would you like me to flag alternate port options in case of disruptions?",
];

const PRODUCT_OPTIONS = [
  "Consumer Electronics", 
  "Food & Beverage", 
  "Apparel", 
  "Industrial Equipment", 
  "Pharmaceuticals", 
  "Other"
];

const SHIPMENT_TYPE_OPTIONS = ["One-Time", "Recurring"];
const ALTERNATIVE_OPTIONS = ["Yes", "No"];

// Maximum number of messages to display
const MAX_VISIBLE_MESSAGES = 10;

// Types
type ChatMessage = {
  role: "assistant" | "user";
  content: string;
  animate?: boolean;
};

type ChatInterfaceProps = {
  onShipmentComplete: (details: ShipmentDetails, showAlternative: boolean) => void;
  resetChat: boolean;
};

export function ChatInterface({ onShipmentComplete, resetChat }: ChatInterfaceProps) {
  // Individual state items - simpler than one large state object
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [shipmentDetails, setShipmentDetails] = useState<Partial<ShipmentDetails>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [isOneTime, setIsOneTime] = useState(true);
  const [showAlternativeRoute, setShowAlternativeRoute] = useState(false);
  
  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track initial message sent
  const initialMessageSentRef = useRef(false);
  
  // Add bot message with typing effect
  const handleAddBotMessage = useCallback((content: string) => {
    setIsTyping(true);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setMessages(prev => {
        // Limit messages to the maximum number
        const newMessages = [...prev, { 
          role: "assistant" as const, 
          content, 
          animate: true 
        }];
        if (newMessages.length > MAX_VISIBLE_MESSAGES) {
          return newMessages.slice(-MAX_VISIBLE_MESSAGES);
        }
        return newMessages;
      });
      setIsTyping(false);
      typingTimeoutRef.current = null;
    }, 500);
  }, []);

  // Send message handler
  const handleSend = useCallback(() => {
    if ((!input.trim() && !showOptions) || isTyping) return;

    const userMessage = input || (showOptions ? "Consumer Electronics" : "");
    
    // Add user message
    setMessages(prev => {
      // Limit messages to the maximum number
      const newMessages = [...prev, { 
        role: "user" as const, 
        content: userMessage, 
        animate: true 
      }];
      if (newMessages.length > MAX_VISIBLE_MESSAGES) {
        return newMessages.slice(-MAX_VISIBLE_MESSAGES);
      }
      return newMessages;
    });
    
    // Update shipment details based on current step
    const updatedDetails = { ...shipmentDetails };
    
    switch (currentStep) {
      case 0: updatedDetails.origin = "Jebel Ali, UAE"; break;
      case 1: updatedDetails.destination = "Houston, US"; break;
      case 2: updatedDetails.productType = "Consumer Electronics"; break;
      case 3: updatedDetails.value = "500,000"; break;
      case 4: updatedDetails.supplier = "Alpha Electronics"; break;
      case 5: 
        setIsOneTime(userMessage === "One-Time"); 
        break;
      case 6: 
        setShowAlternativeRoute(userMessage === "Yes"); 
        break;
    }
    
    setShipmentDetails(updatedDetails);
    setInput("");
    setShowOptions(false);
    
    // Move to next step
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    
    // Handle next step
    if (nextStep < PROMPTS.length) {
      // Set options for specific steps
      if (nextStep === 2) {
        setOptions(PRODUCT_OPTIONS);
        setShowOptions(true);
      } else if (nextStep === 5) {
        setOptions(SHIPMENT_TYPE_OPTIONS);
        setShowOptions(true);
      } else if (nextStep === 6) {
        setOptions(ALTERNATIVE_OPTIONS);
        setShowOptions(true);
      }
      
      handleAddBotMessage(PROMPTS[nextStep]);
    } else {
      // Final step - complete shipment
      const finalMessage = userMessage === "Yes"
        ? "Great — I'll include optimized alternatives if risk levels are high.\nGenerating your shipment dashboard now…"
        : "No problem — I'll focus just on this planned route.\nGenerating your shipment dashboard now…";
      
      handleAddBotMessage(finalMessage);
      
      // Complete shipment with demo data
      setTimeout(() => {
        onShipmentComplete(
          {
            origin: "Jebel Ali, UAE",
            destination: "Houston, US",
            productType: "Consumer Electronics",
            value: "500,000",
            supplier: "Alpha Electronics",
            estimatedDelivery: 28,
            tariffCost: 12500,
            riskScore: 72,
            risks: [
              {
                type: "geopolitical",
                description: "Red Sea geopolitical instability",
                icon: "flag",
              },
              {
                type: "congestion",
                description: "Port congestion in Jebel Ali",
                icon: "ship",
              },
              {
                type: "weather",
                description: "Climate risk near Suez Canal",
                icon: "cloud-rain",
              },
              {
                type: "economic",
                description: "Tariff fluctuations in destination region",
                icon: "dollar-sign",
              },
            ],
            riskTrend: [
              { month: "May", value: 65 },
              { month: "Jun", value: 72 },
              { month: "Jul", value: 85 },
            ],
            alternativeRoute: {
              port: "Charleston, US",
              estimatedDelivery: 22,
              riskScore: 45,
            },
            alerts: [
              {
                title: "Red Sea Alert",
                description: "New report of delays in the Red Sea",
                severity: "high",
              },
              {
                title: "Port Congestion",
                description:
                  "Port congestion index increased 15% at Jebel Ali this week",
                severity: "medium",
              },
            ],
          },
          showAlternativeRoute
        );
      }, 1500);
    }
  }, [
    input, 
    showOptions, 
    isTyping, 
    currentStep, 
    shipmentDetails, 
    handleAddBotMessage, 
    onShipmentComplete, 
    showAlternativeRoute
  ]);
  
  // Event handlers
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !showOptions) {
      handleSend();
    }
  }, [handleSend, showOptions]);
  
  const handleOptionSelect = useCallback((option: string) => {
    setInput(option);
    setTimeout(handleSend, 0);
  }, [handleSend]);
  
  // Reset effect
  useEffect(() => {
    if (resetChat) {
      setMessages([]);
      setInput("");
      setCurrentStep(0);
      setShipmentDetails({});
      setIsTyping(false);
      setShowOptions(false);
      setOptions([]);
      setIsOneTime(true);
      setShowAlternativeRoute(false);
      initialMessageSentRef.current = false;
    }
  }, [resetChat]);
  
  // Initial message effect - only runs once on mount or reset
  useEffect(() => {
    if (!initialMessageSentRef.current || resetChat) {
      initialMessageSentRef.current = true;
      handleAddBotMessage(PROMPTS[0]);
    }
  }, [resetChat, handleAddBotMessage]);

  // Scroll to bottom effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);
  
  return (
    <Card className="h-full flex flex-col shadow-md">
      <CardContent className="flex flex-col h-full p-0">
        <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-semibold flex items-center">
            <Bot className="mr-2 h-5 w-5" />
            City AI Assistant
          </h2>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              } ${message.animate ? "animate-message-fade-in" : ""}`}
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

          {isTyping && (
            <div className="flex justify-start animate-message-fade-in">
              <div className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="flex items-center space-x-1">
                  {[0, 150, 300].map((delay) => (
                    <div
                      key={delay}
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {showOptions && !isTyping && (
            <div className="flex justify-start animate-message-fade-in">
              <div className="max-w-[80%] w-full">
                <OptionButtons
                  options={options}
                  onSelect={handleOptionSelect}
                />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <footer className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                showOptions
                  ? "Or type your response..."
                  : "Type your message..."
              }
              className="flex-1"
              disabled={isTyping || currentStep >= PROMPTS.length}
            />
            <Button
              onClick={handleSend}
              disabled={(!input.trim() && !showOptions) || isTyping || currentStep >= PROMPTS.length}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </footer>
      </CardContent>
    </Card>
  );
}
