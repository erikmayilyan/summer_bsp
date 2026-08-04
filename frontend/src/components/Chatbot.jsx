import React, { useState } from 'react'
import "./Chatbot.css"

const Chatbot = () => {
  const [open, setOpen] = useState(false);

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
            <li className="chat-question">
              <p>Hi there, How can I help you today?</p>
            </li>
            <li className="chat-answer">
              <p>How much does the basic package cost?</p>
            </li>
            <li className="chat-question">
              <p>Hi there, How can I help you today?</p>
            </li>
            <li className="chat-answer">
              <p>How much does the basic package cost?</p>
            </li>
            <li className="chat-question">
              <p>Hi there, How can I help you today?</p>
            </li>
          </ul>
          <div className="chat-textarea">
            <textarea placeholder="Send a message..."></textarea>
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Chatbot
