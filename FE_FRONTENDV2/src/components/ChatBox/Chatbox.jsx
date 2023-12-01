import React, { useState, useRef, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { AiOutlineMessage } from 'react-icons/ai';
import './ChatBox.css';
import {userMessage,setHistory} from '../../stores/api/index.js'
import logo from '../../assets/img/botlogo.jpg'


const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  // const [messages, setMessages] = useState([]);
  const botName = 'Help center';
  const dispatch = useDispatch();
  const messages = useSelector(state => state.apiStore.history)

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
      dispatch(setHistory(input)); //user text
      dispatch(userMessage({ userInput: input })); //bot text
      setInput("");
  };

  useEffect(() => {
    // Scroll to the bottom of the chat messages when a new message is added or chat is opened
    if (chatMessagesRef) {
      chatMessagesRef.scrollTop = chatMessagesRef.scrollHeight;
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
                <img img src={logo} alt="Bot Icon" className="bot-icon" />
                <span className="bot-name">{botName}</span>
              </div>
              <div className="close-button" onClick={toggleChat}>
                <span>&times;</span>
              </div>
            </div>
            <div className="chat-content">
              <div className="chat-messages" ref={chatMessagesRef}>
                {messages
                  // .sort((a, b) => a.timestamp - b.timestamp)
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
