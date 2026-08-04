import React, { useState } from 'react'
import "./Chatbot.css"

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const sendMessage = async () => {
    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        message: message
      })
    });
    const data = await response.json();
    setMessages([
      ...messages, 
      { sender: "user", text: message },
      { sender: "bot", text: data.reply }
    ]);
    setMessage("");
  };

  return (
    <div>
      <button 
        className="open-close"
        onClick={() => setOpen(!open)}
      >
        <span>💬 Chat</span>
        <span>❌ Close</span>
      </button>
      {open && (
        <div className="chatbot">
          <div className="chatbot-title">
            <h2>Clean<strong>ChatBot</strong></h2>
          </div>
          <ul className="chatbot-chat">
            {messages.map((message, index) => (
              <li
                key={index}
                className={message.sender === "bot" ? "chat-question" : "chat-answer"}
              >
                <p>{message.text}</p>
              </li>
            ))}
          </ul>
          <div className="chat-textarea">
            <textarea 
              placeholder="Send a message..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}></textarea>
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chatbot
