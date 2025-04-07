
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RefreshCw } from 'lucide-react';

interface ChatPanelProps {
  startLocation: string;
  endLocation: string;
  riskScore: number | null;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ startLocation, endLocation, riskScore }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Generate welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: '1',
      content: `Welcome to LogiTrade Assistant. I can help answer your questions about the trade route from ${startLocation} to ${endLocation}. What would you like to know about shipping, regulations, or risk factors?`,
      sender: 'ai' as const,
      timestamp: new Date()
    };
    
    setMessages([welcomeMessage]);
  }, [startLocation, endLocation]);
  
  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle message send
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(input, startLocation, endLocation, riskScore),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000);
  };
  
  // Generate mock AI response based on user input
  const generateResponse = (userInput: string, start: string, end: string, risk: number | null): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('regulation') || input.includes('compliance') || input.includes('document')) {
      return `For the ${start} to ${end} route, you'll need standard shipping documentation including Bill of Lading, Commercial Invoice, Packing List, and Certificate of Origin. ${risk && risk > 50 ? 'Due to the higher risk factors, additional customs inspection may be required.' : 'The customs clearance process is relatively standardized for this route.'}`;
    }
    
    if (input.includes('cost') || input.includes('price') || input.includes('expensive')) {
      const baseCost = 5000 + Math.floor(Math.random() * 10000);
      return `The estimated shipping cost from ${start} to ${end} is approximately $${baseCost.toLocaleString()} for a standard container. This includes base freight charges, port fees, and handling. ${risk && risk > 60 ? 'Note that insurance premiums might be higher due to risk factors on this route.' : 'Insurance costs are standard for this route.'}`;
    }
    
    if (input.includes('time') || input.includes('duration') || input.includes('long')) {
      const days = 7 + Math.floor(Math.random() * 30);
      return `Transit time from ${start} to ${end} typically takes ${days} days under normal conditions. ${risk && risk > 50 ? 'However, be aware that potential delays could occur due to heightened security measures or regional instability factors.' : 'This route generally experiences minimal delays.'}`;
    }
    
    if (input.includes('risk') || input.includes('danger') || input.includes('safe')) {
      if (!risk) return `I'll need to complete a risk assessment for this route. Please analyze the route first.`;
      
      if (risk < 30) {
        return `The ${start} to ${end} route has a low risk profile (score: ${risk}/100). Current geopolitical factors are favorable, and shipping lanes are well-established with strong security measures in place.`;
      } else if (risk < 60) {
        return `The ${start} to ${end} route has a moderate risk profile (score: ${risk}/100). While generally stable, there are some factors to monitor including seasonal weather patterns and occasional regulatory changes. Standard insurance coverage should be sufficient.`;
      } else {
        return `The ${start} to ${end} route has a higher risk profile (score: ${risk}/100). Key concerns include geopolitical tensions, unpredictable customs procedures, and higher-than-average piracy reports in certain segments. Enhanced security measures and comprehensive insurance are strongly recommended.`;
      }
    }
    
    if (input.includes('alternative') || input.includes('options') || input.includes('other route')) {
      return `Instead of the direct ${start} to ${end} route, you might consider: 1) Routing through Singapore for better cost efficiency, 2) Using a multimodal solution combining sea and air freight for time-sensitive cargo, or 3) Exploring railway options if available for that corridor. The optimal alternative depends on your specific timeline, budget, and cargo requirements.`;
    }
    
    // Default response
    return `Thank you for your question about the ${start} to ${end} trade route. I can provide information about shipping logistics, regulations, costs, transit times, and risk factors. Could you please clarify what specific aspect you'd like to know more about?`;
  };
  
  // Handle input submission on Enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <div className="h-[400px] flex flex-col">
      <h2 className="text-xl font-semibold mb-2">Trade Route Assistant</h2>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-1">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.sender === 'user' 
                  ? 'bg-blue-500 text-white rounded-tr-none' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.sender === 'ai' ? (
                  <Bot className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                ) : (
                  <User className="h-4 w-4 text-white" />
                )}
                <span className={`text-xs ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {message.sender === 'ai' ? 'Trade Assistant' : 'You'} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse"></div>
                  <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="mt-auto">
        <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm bg-white dark:bg-gray-800">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about trade regulations, shipping costs, or route risks..."
            className="flex-1 px-4 py-2 bg-transparent border-none focus:outline-none text-sm resize-none h-10 min-h-10 max-h-40"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className={`p-2 mx-1 rounded ${
              !input.trim() || isLoading
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700'
            }`}
          >
            {isLoading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1.5 text-center">
          Ask questions about logistics, trade risks, or regulations for this route
        </p>
      </div>
    </div>
  );
};
