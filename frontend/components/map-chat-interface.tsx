"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Send, Bot, User, MapPin, AlertTriangle, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import mapboxgl, { LngLatBounds } from "mapbox-gl"; // Import LngLatBounds
import { OptionButtons } from "@/components/option-buttons";
import type { InteractiveMapRef } from "./interactive-map";
import { Globe, Map as MapIcon } from "lucide-react"; // Import icons for toggle button

// Types
type ChatMessage = {
  role: "assistant" | "user";
  content: string;
  animate?: boolean;
};

type MapChatInterfaceProps = {
  // Allow the ref to potentially be null initially
  mapRef: React.RefObject<InteractiveMapRef | null>;
};

// Example Data (Ensure coordinates match Point type)
const EXAMPLE_ROUTES = {
  "Shanghai -> Rotterdam": {
    id: "shanghai-rotterdam",
    coordinates: [[121.47, 31.23], [4.47, 51.92]] as [number, number][], // Ensure type
    markers: [
      { lngLat: [121.47, 31.23] as [number, number], popup: "Shanghai" },
      { lngLat: [4.47, 51.92] as [number, number], popup: "Rotterdam" },
    ],
    paint: {}, // Add default empty paint object
  },
  "LA -> Tokyo": {
    id: "la-tokyo",
    coordinates: [[-118.24, 34.05], [139.69, 35.68]] as [number, number][], // Ensure type
    markers: [
      { lngLat: [-118.24, 34.05] as [number, number], popup: "Los Angeles" },
      { lngLat: [139.69, 35.68] as [number, number], popup: "Tokyo" },
    ],
    paint: {}, // Add default empty paint object
  },
   "Santos -> Hamburg": {
    id: "santos-hamburg",
    coordinates: [[-46.33, -23.96], [9.99, 53.55]] as [number, number][], // Ensure type
    markers: [
      { lngLat: [-46.33, -23.96] as [number, number], popup: "Santos" },
      { lngLat: [9.99, 53.55] as [number, number], popup: "Hamburg" },
    ],
    paint: {}, // Add default empty paint object
  },
  // Add more routes, potentially multiple between same points
  "Shanghai -> Rotterdam (Alt 1)": {
    id: "shanghai-rotterdam-alt1",
    coordinates: [[121.47, 31.23], [103.8, 1.35], [4.47, 51.92]] as [number, number][], // Via Singapore
    markers: [
      { lngLat: [121.47, 31.23] as [number, number], popup: "Shanghai" },
      { lngLat: [4.47, 51.92] as [number, number], popup: "Rotterdam" },
    ],
    paint: { "line-color": "#facc15", "line-dasharray": [2, 2] } // Yellow dashed
  },
   "Shanghai -> Rotterdam (Alt 2)": {
    id: "shanghai-rotterdam-alt2",
    coordinates: [[121.47, 31.23], [-74.00, 40.71], [4.47, 51.92]] as [number, number][], // Via NYC (unrealistic, for demo)
    markers: [
      { lngLat: [121.47, 31.23] as [number, number], popup: "Shanghai" },
      { lngLat: [4.47, 51.92] as [number, number], popup: "Rotterdam" },
    ],
    paint: { "line-color": "#22c55e", "line-dasharray": [4, 2] } // Green dotted
  },
};

const EXAMPLE_RISKS = {
  "Red Sea": { id: "risk-red-sea", center: [38, 15] as [number, number], radius: 500, color: "#ffcc00" }, // Ensure type
  "Suez Canal": { id: "risk-suez", center: [32.5, 30.5] as [number, number], radius: 100, color: "#ff8800" },
  "Malacca Strait": { id: "risk-malacca", center: [100, 4] as [number, number], radius: 300, color: "#ffcc00" },
};

const INITIAL_OPTIONS = [
  "Show route: Shanghai -> Rotterdam",
  "Show route: LA -> Tokyo",
  "Show route: Santos -> Hamburg",
  "Show ALL Shanghai -> Rotterdam routes", // New option
  "Highlight risks: Red Sea",
  "Highlight risks: Suez Canal",
  "Highlight risks: Malacca Strait",
  "Toggle Map/Globe View", // New option
  "Clear Map", // New option
];

export function MapChatInterface({ mapRef }: MapChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [options, setOptions] = useState<string[]>(INITIAL_OPTIONS);
  const [currentProjection, setCurrentProjection] = useState<'globe' | 'map'>('globe'); // Track projection state
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeMapElements = useRef<{ routes: string[], risks: string[], markers: mapboxgl.Marker[] }>({ routes: [], risks: [], markers: [] });

  // Add bot message with typing effect
  const handleAddBotMessage = useCallback((content: string, showOptions = true) => {
    setIsTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setMessages(prev => [...prev, { role: "assistant", content, animate: true }]);
      setIsTyping(false);
      setOptions(showOptions ? INITIAL_OPTIONS : []); // Show options only if requested
      typingTimeoutRef.current = null;
    }, 300);
  }, []);

  // Clear existing map elements using new methods
  const clearMap = useCallback(() => {
    if (!mapRef.current) return;
    mapRef.current.clearAllRoutes();
    mapRef.current.clearAllMarkers();
    // Assuming risk zones should also be cleared, add clearAllRiskZones if implemented in InteractiveMap
    activeMapElements.current.risks.forEach(id => mapRef.current?.removeRiskZone(id)); // Keep manual risk clear for now
    activeMapElements.current = { routes: [], risks: [], markers: [] }; // Reset tracking
  }, [mapRef]);

  // Process user input/selection
  const handleProcessInput = useCallback((userInput: string) => {
    if (!mapRef.current) {
      handleAddBotMessage("Map is not ready yet. Please wait.", false);
      return;
    }

    clearMap(); // Clear previous elements before adding new ones

    let botResponse = `Okay, processing: "${userInput}"`;
    let processed = false;
    const bounds = new LngLatBounds(); // Initialize bounds

    // Helper to add markers and extend bounds
    const addMarkersAndFit = (markers: { lngLat: [number, number], popup: string }[]) => {
        markers.forEach(m => {
           const marker = mapRef.current?.addMarker(m.lngLat, undefined, m.popup);
           if(marker) activeMapElements.current.markers.push(marker);
           bounds.extend(m.lngLat);
        });
        if (!bounds.isEmpty()) {
            mapRef.current?.fitBounds(bounds, { padding: 60, duration: 1000 });
        }
    };

    // Check for route commands
    if (userInput.startsWith("Show route:")) {
      const routeKey = userInput.replace("Show route: ", "").trim() as keyof typeof EXAMPLE_ROUTES;
      const routeData = EXAMPLE_ROUTES[routeKey];
      if (routeData) {
        mapRef.current.addRoute(routeData.id, routeData.coordinates, routeData.paint);
        activeMapElements.current.routes.push(routeData.id);
        addMarkersAndFit(routeData.markers);
        botResponse = `Showing route: ${routeKey}`;
        processed = true;
      }
    }
    // Show multiple routes
    else if (userInput === "Show ALL Shanghai -> Rotterdam routes") {
        const keysToShow: (keyof typeof EXAMPLE_ROUTES)[] = [
            "Shanghai -> Rotterdam",
            "Shanghai -> Rotterdam (Alt 1)",
            "Shanghai -> Rotterdam (Alt 2)"
        ];
        let addedMarkers = false;
        keysToShow.forEach(key => {
            const routeData = EXAMPLE_ROUTES[key];
            if (routeData) {
                mapRef.current?.addRoute(routeData.id, routeData.coordinates, routeData.paint);
                activeMapElements.current.routes.push(routeData.id);
                // Add markers only once for the base route to avoid duplicates
                if (!addedMarkers) {
                    addMarkersAndFit(routeData.markers);
                    addedMarkers = true;
                } else {
                     // Still extend bounds for subsequent routes
                     routeData.markers.forEach(m => bounds.extend(m.lngLat));
                }
            }
        });
         if (!bounds.isEmpty()) {
            mapRef.current?.fitBounds(bounds, { padding: 80, duration: 1000 }); // Slightly more padding
         }
        botResponse = `Showing all routes for Shanghai -> Rotterdam.`;
        processed = true;
    }
    // Check for risk commands
    else if (userInput.startsWith("Highlight risks:")) {
      const riskKey = userInput.replace("Highlight risks: ", "").trim() as keyof typeof EXAMPLE_RISKS;
      const riskData = EXAMPLE_RISKS[riskKey];
      if (riskData) {
        mapRef.current.addRiskZone(riskData.id, riskData.center, riskData.radius, { 'fill-color': riskData.color });
        activeMapElements.current.risks.push(riskData.id);
        mapRef.current.flyTo({ center: riskData.center, zoom: 5, duration: 1000 });
        botResponse = `Highlighting potential risk zone: ${riskKey}`;
        processed = true;
      }
    }
    // Toggle projection
    else if (userInput === "Toggle Map/Globe View") {
        mapRef.current.toggleProjection();
        const nextProjection = currentProjection === 'globe' ? 'map' : 'globe';
        setCurrentProjection(nextProjection); // Update local state
        botResponse = `Switched to ${nextProjection} view.`;
        processed = true;
    }
    // Clear map
    else if (userInput === "Clear Map") {
        clearMap();
        botResponse = "Map cleared.";
        processed = true;
    }


    if (!processed) {
      botResponse = "Sorry, I didn't understand that command. Please choose an option or try phrasing differently.";
    }

    handleAddBotMessage(botResponse);

  }, [mapRef, handleAddBotMessage, clearMap]);

  // Send message handler
  const handleSend = useCallback(() => {
    if (!input.trim() || isTyping) return;
    const userMessage = input;

    setMessages(prev => [...prev, { role: "user", content: userMessage, animate: true }]);
    setInput("");
    setOptions([]); // Hide options after sending

    handleProcessInput(userMessage);

  }, [input, isTyping, handleProcessInput]);

  // Option button handler
  const handleOptionSelect = useCallback((option: string) => {
    setMessages(prev => [...prev, { role: "user", content: option, animate: true }]);
    setInput(""); // Clear input field
    setOptions([]); // Hide options after selection
    handleProcessInput(option);
  }, [handleProcessInput]);

  // Keyboard handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  }, [handleSend]);

  // Initial message
  useEffect(() => {
    handleAddBotMessage("Hi! I can show trade routes and risk zones on the map. Choose an option or type a command.", true);
  }, [handleAddBotMessage]); // Run only once

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  return (
    // Removed backdrop-blur-sm
    <Card className="h-full flex flex-col shadow-lg bg-card/90">
      <CardContent className="flex flex-col h-full p-0">
        <header className="bg-primary/80 text-primary-foreground p-3 rounded-t-lg">
          <h2 className="text-lg font-semibold flex items-center">
            <Bot className="mr-2 h-5 w-5" />
            Map Interaction Demo
          </h2>
        </header>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} ${message.animate ? "animate-message-fade-in" : ""}`}
            >
              <div
                className={`max-w-[85%] p-2 px-3 rounded-lg shadow-sm ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted text-muted-foreground rounded-tl-none"
                }`}
              >
                 <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          ))}

          {isTyping && (
             <div className="flex justify-start animate-message-fade-in">
              <div className="bg-muted text-muted-foreground p-2 px-3 rounded-lg rounded-tl-none max-w-[85%]">
                <div className="flex items-center space-x-1 h-5">
                  {[0, 150, 300].map((delay) => (
                    <div key={delay} className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }}/>
                  ))}
                </div>
              </div>
            </div>
          )}

          {options.length > 0 && !isTyping && (
            <div className="pt-2 animate-message-fade-in">
              <OptionButtons options={options} onSelect={handleOptionSelect} className="justify-start"/>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <footer className="p-3 border-t bg-background/50 rounded-b-lg">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask to show a route or risk..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </footer>
      </CardContent>
    </Card>
  );
}
