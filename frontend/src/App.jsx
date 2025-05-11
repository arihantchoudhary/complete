import { useState, useEffect } from 'react'
import './App.css'
import ModelSelector from './components/ModelSelector'
import ChatInterface from './components/ChatInterface'

function App() {
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load messages from localStorage on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem('chat-messages');
    const savedModel = localStorage.getItem('selected-model');
    
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Failed to parse saved messages:', e);
      }
    }
    
    if (savedModel) {
      setSelectedModel(savedModel);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat-messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Save selected model to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selected-model', selectedModel);
  }, [selectedModel]);

  const handleModelChange = (model) => {
    setSelectedModel(model);
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem('chat-messages');
  };

  const sendMessage = async (message) => {
    try {
      setLoading(true);
      setError(null);
      
      // Add user message to chat
      const updatedMessages = [
        ...messages,
        { role: 'user', content: message }
      ];
      setMessages(updatedMessages);
      
      // Send to API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: updatedMessages,
        }),
      });

      let data = null;
      let text = await response.text();
      try {
        data = text ? JSON.parse(text) : null;
      } catch (e) {
        throw new Error('Invalid JSON response from server');
      }

      if (!response.ok || !data || !data.message) {
        throw new Error((data && data.error) || 'Failed to get response');
      }
      
      // Add AI response to chat
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: data.message }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message);
      
      // Add error message to chat
      setMessages([
        ...messages,
        { role: 'user', content: message },
        { role: 'error', content: `Error: ${error.message}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const TrashIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="trash-icon"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
  );

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div className="logo">
            <h1>City AI</h1>
          </div>
          <div className="social-links">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener">FB</a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener">IN</a>
            <a href="https://www.twitter.com/" target="_blank" rel="noopener">X</a>
          </div>
        </header>

        <div className="globe-container">
          <iframe 
            src="https://my.spline.design/planetbw-f8f404c0bd70dfef5908d623a953d7da/" 
            style={{width: '100%', height: '100%', border: 'none'}}
            loading="lazy"
            fetchpriority="auto"
            referrerPolicy="no-referrer"
            sandbox="allow-same-origin allow-scripts allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          />
        </div>

        <div className="chat-section">
          <div className="chat-header">
            {messages.length > 0 && (
              <button 
                onClick={clearChat} 
                className="clear-button"
                disabled={loading}
                aria-label="Clear Chat"
              >
                <TrashIcon />
              </button>
            )}
          </div>
          
          {error && <div className="error-alert">{error}</div>}
          
          <ChatInterface
            messages={messages}
            onSendMessage={sendMessage}
            loading={loading}
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
          />
        </div>

        <footer className="footer">
          <div className="footer-left">
            <a href="https://www.linkedin.com/in/arihantchoudhary/" target="_blank" rel="noopener">
              © City AI
            </a>
          </div>
          <div className="footer-center">
            <a href="https://shop.swissthemes.design/buy/a3b21e43-58dc-4561-94e3-c99ae6e91327" target="_blank" rel="noopener">
              Complete Global Supply Chain Intelligence
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
