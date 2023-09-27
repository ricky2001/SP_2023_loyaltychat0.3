import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineMessage } from 'react-icons/ai';

import './ChatBox.css';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const botName = 'Your Bot';

  const chatMessagesRef = useRef(null); // Ref for chat messages container

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    const userMessage = { text: input, isUser: true, timestamp: new Date() };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const response = await axios.post('/api/send-message', { message: input }); // Send the message to your Express backend
      const botMessage = { text: response.data.message, isUser: false, timestamp: new Date() };
      setMessages([...messages, botMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat messages when a new message is added or chat is opened
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  return (
    <div className="chat-container">
      {isOpen ? (
        // Render the chat box when it's open
        <div>
          <div className={`chat-box ${isOpen ? 'open' : ''}`}>
            <div className="chat-header" onClick={toggleChat}>
              <div className="bot-info">
                <img src="bot-icon.png" alt="Bot Icon" className="bot-icon" />
                <span className="bot-name">{botName}</span>
              </div>
              <div className="close-button" onClick={toggleChat}>
                <span>&times;</span>
              </div>
            </div>
            <div className="chat-content">
              <div className="chat-messages" ref={chatMessagesRef}>
                {messages
                  .sort((a, b) => a.timestamp - b.timestamp)
                  .map((message, index) => (
                    <div
                      key={index}
                      className={`message ${message.isUser ? 'user' : 'bot'}`}
                    >
                      {message.text}
                    </div>
                  ))}
              </div>
              <form onSubmit={handleSubmit} className="message-input">
                <input
                  type="text"
                  value={input}
                  onChange={handleChange}
                  placeholder="Type a message..."
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        // Render the circular icon button when it's closed
        <div className="chat-button" onClick={toggleChat}>
          <AiOutlineMessage className="chat-icon" />
        </div>
      )}
    </div>
  );
};

export default ChatBox;
