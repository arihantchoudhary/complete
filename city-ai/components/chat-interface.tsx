"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import type { ShipmentDetails } from "@/types"
import { OptionButtons } from "@/components/option-buttons"

interface ChatMessage {
  role: "assistant" | "user"
  content: string
  animate?: boolean
}

interface ChatInterfaceProps {
  onShipmentComplete: (details: ShipmentDetails, showAlternative: boolean) => void
  resetChat: boolean
}

export function ChatInterface({ onShipmentComplete, resetChat }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [currentStep, setCurrentStep] = useState(0)
  const [shipmentDetails, setShipmentDetails] = useState<Partial<ShipmentDetails>>({})
  const [isTyping, setIsTyping] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [options, setOptions] = useState<string[]>([])
  const [isOneTime, setIsOneTime] = useState(true)
  const [showAlternativeRoute, setShowAlternativeRoute] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const prompts = [
    "Hi there! I'm your City AI logistics assistant — let's plan your shipment and check for risks together.\n\nWhat is the origin city and port for your shipment?",
    "Got it — shipping out from Jebel Ali. Now, what's the destination city and port?",
    "Great — heading to Houston. What type of product are you shipping?",
    "Perfect. What's the shipment value in USD?",
    "Thanks — and who's your supplier name?",
    "Thanks — quick check before I pull up your risk report:\nIs this a one-time shipment or part of a recurring supply route?",
    "Would you like me to flag alternate port options in case of disruptions?",
  ]

  const productOptions = [
    "Consumer Electronics",
    "Food & Beverage",
    "Apparel",
    "Industrial Equipment",
    "Pharmaceuticals",
    "Other",
  ]

  const shipmentTypeOptions = ["One-Time", "Recurring"]
  const alternativeOptions = ["Yes", "No"]

  useEffect(() => {
    if (resetChat) {
      setMessages([])
      setCurrentStep(0)
      setShipmentDetails({})
      setShowOptions(false)
      setOptions([])
      setIsOneTime(true)
      setShowAlternativeRoute(false)
      addBotMessage(prompts[0])
    }
  }, [resetChat])

  useEffect(() => {
    if (messages.length === 0 && !resetChat) {
      addBotMessage(prompts[0])
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const addBotMessage = (content: string) => {
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content, animate: true }])
      setIsTyping(false)
    }, 500)
  }

  const handleSend = () => {
    if (!input.trim() && !showOptions) return

    let userMessage = input

    if (showOptions) {
      userMessage = input || "Consumer Electronics" // Default if somehow nothing is selected
    }

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: userMessage, animate: true }])

    // Update shipment details based on current step
    const updatedDetails = { ...shipmentDetails }

    switch (currentStep) {
      case 0:
        updatedDetails.origin = "Jebel Ali, UAE" // Hardcoded for demo
        break
      case 1:
        updatedDetails.destination = "Houston, US" // Hardcoded for demo
        break
      case 2:
        updatedDetails.productType = "Consumer Electronics" // Hardcoded for demo
        break
      case 3:
        updatedDetails.value = "500,000" // Hardcoded for demo
        break
      case 4:
        updatedDetails.supplier = "Alpha Electronics" // Hardcoded for demo
        break
      case 5:
        setIsOneTime(userMessage === "One-Time")
        break
      case 6:
        setShowAlternativeRoute(userMessage === "Yes")
        break
    }

    setShipmentDetails(updatedDetails)
    setInput("")
    setShowOptions(false)

    // Move to next step
    const nextStep = currentStep + 1
    setCurrentStep(nextStep)

    if (nextStep < prompts.length) {
      // Set options for product type selection
      if (nextStep === 2) {
        setShowOptions(true)
        setOptions(productOptions)
      }
      // Set options for shipment type
      else if (nextStep === 5) {
        setShowOptions(true)
        setOptions(shipmentTypeOptions)
      }
      // Set options for alternative route
      else if (nextStep === 6) {
        setShowOptions(true)
        setOptions(alternativeOptions)
      }

      addBotMessage(prompts[nextStep])
    } else {
      // All questions answered, complete the shipment
      const finalMessage = showAlternativeRoute
        ? "Great — I'll include optimized alternatives if risk levels are high.\nGenerating your shipment dashboard now…"
        : "No problem — I'll focus just on this planned route.\nGenerating your shipment dashboard now…"

      addBotMessage(finalMessage)

      // Complete the shipment with hardcoded data for demo
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
                description: "Port congestion index increased 15% at Jebel Ali this week",
                severity: "medium",
              },
            ],
          },
          showAlternativeRoute,
        )
      }, 1500)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !showOptions) {
      handleSend()
    }
  }

  const handleOptionSelect = (option: string) => {
    setInput(option)
    handleSend()
  }

  return (
    <Card className="h-full flex flex-col shadow-md">
      <CardContent className="flex flex-col h-full p-0">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-semibold flex items-center">
            <Bot className="mr-2 h-5 w-5" />
            City AI Assistant
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} ${message.animate ? "animate-message-fade-in" : ""}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-tr-none"
                    : "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 rounded-tl-none"
                }`}
              >
                <div className="flex items-start">
                  {message.role === "assistant" && <Bot className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />}
                  <p className="whitespace-pre-line">{message.content}</p>
                  {message.role === "user" && <User className="h-5 w-5 ml-2 mt-0.5 flex-shrink-0" />}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-message-fade-in">
              <div className="bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <div className="flex items-center space-x-1">
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {showOptions && !isTyping && (
            <div className="flex justify-start animate-message-fade-in">
              <div className="max-w-[80%] w-full">
                <OptionButtons options={options} onSelect={handleOptionSelect} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={showOptions ? "Or type your response..." : "Type your message..."}
              className="flex-1"
              disabled={isTyping || currentStep >= prompts.length}
            />
            <Button
              onClick={handleSend}
              disabled={(!input.trim() && !showOptions) || isTyping || currentStep >= prompts.length}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
