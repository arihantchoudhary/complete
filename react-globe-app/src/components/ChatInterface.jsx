import React, { useState, useRef, useEffect } from 'react';

const ChatInterface = ({ messages, onSendMessage, loading }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="chat-interface">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.role === 'user' ? 'user-message' : 'ai-message'}`}
          >
            <div className="message-content">
              {message.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="message ai-message">
            <div className="message-content loading">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="message-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
          className="message-input"
        />
        <button 
          type="submit" 
          disabled={loading || !input.trim()} 
          className="send-button"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface; 