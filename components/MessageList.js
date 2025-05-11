import styles from './MessageList.module.css';
import { useEffect, useRef } from 'react';

const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          Start a conversation by typing a message below.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${styles.message} ${
            message.role === 'user' ? styles.userMessage : 
            message.role === 'error' ? styles.errorMessage : styles.aiMessage
          }`}
        >
          <div className={styles.messageHeader}>
            {message.role === 'user' ? 'You' : 
             message.role === 'error' ? 'Error' : 'AI'}
          </div>
          <div className={styles.messageContent}>
            {message.content}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList; 