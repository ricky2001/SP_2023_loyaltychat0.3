import React, { useState } from 'react';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const openaiApiKey = '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'; // Replace with your OpenAI API key
  const modelId = 'ftjob-pXEfLCYjNWrGDjVjf7VWs2SL'; // Replace with your fine-tuned model ID

  const sendMessage = async (message) => {
    setMessages([...messages, { role: 'user', content: message }]);
    setInput('');

    try {
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
          prompt: message,
          model: modelId,
          max_tokens: 50,
        }),
      });

      const data = await response.json();

      const chatbotMessage = data.choices[0].text;
      setMessages([...messages, { role: 'chatbot', content: chatbotMessage }]);
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
    }
  };

  return (
    <div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={() => sendMessage(input)}>Send</button>
    </div>
  );
};

export default ChatBot;
