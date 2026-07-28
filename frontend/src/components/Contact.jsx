import React from 'react'
import "./Contact.css"

const Contact = () => {
  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <div className="contact-section">
        <div className="contact-form">
          <p>Leave A Message & We Will Respond As Soon As Possible</p>
          <form>
            <div className="contact-group">
              <input type="text" name="name" placeholder="Full Name" />
            </div>
            <div className="contact-group">
              <input type="email" name="email" placeholder="Email Address" />
            </div>
            <div className="contact-group">
              <textarea name="message" placeholder="Leave A Message Here"></textarea>
            </div>
            <button className="contact-btn">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
