import { useState } from 'react';
import styles from './ChatInterface.module.css';
import MessageList from './MessageList';

const ChatInterface = ({ messages, onSendMessage, loading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !loading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  // Handle Ctrl+Enter to submit
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && inputValue.trim() && !loading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className={styles.container}>
      <MessageList messages={messages} />
      <form className={styles.inputForm} onSubmit={handleSubmit}>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Ctrl+Enter to send)"
          className={styles.input}
          disabled={loading}
          rows={3}
        />
        <button 
          type="submit" 
          className={styles.button}
          disabled={loading || !inputValue.trim()}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface; 