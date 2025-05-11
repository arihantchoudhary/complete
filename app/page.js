'use client';
import { useState, useEffect } from 'react';
import ModelSelector from '../components/ModelSelector';
import ChatInterface from '../components/ChatInterface';
import styles from './page.module.css';

export default function Home() {
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

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
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

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>AI Chat App</h1>
        {messages.length > 0 && (
          <button 
            onClick={clearChat} 
            className={styles.clearButton}
            disabled={loading}
          >
            Clear Chat
          </button>
        )}
      </div>
      
      <ModelSelector 
        selectedModel={selectedModel}
        onModelChange={handleModelChange}
      />
      
      {error && <div className={styles.errorAlert}>{error}</div>}
      
      <ChatInterface
        messages={messages}
        onSendMessage={sendMessage}
        loading={loading}
      />
    </main>
  );
} 