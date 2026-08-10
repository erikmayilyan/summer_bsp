import React, { useState } from 'react'
import "./Contact.css"

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:3000/contacts", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message
      })
    });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact" id="contact">
      <h2>Contact Us</h2>
      <div className="contact-section">
        <div className="contact-form">
          <p>Leave A Message & We Will Respond As Soon As Possible</p>
          <form onSubmit={submitForm}>
            <div className="contact-group">
              <input 
                type="text" 
                name="name" 
                placeholder="Full Name" 
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="contact-group">
              <input 
                type="text" 
                name="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="contact-group">
              <textarea 
                name="message" 
                placeholder="Leave A Message Here" 
                value={message} 
                onChange={(event) => setMessage(event.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="contact-btn">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
