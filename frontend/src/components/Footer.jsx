import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-info">
        <div className="footer-links">
          <h3>Clean<strong>Belval</strong></h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#options">Options</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-about">
          <h3>About</h3>
          <p>
            CleanBelval provides reliable and eco-friendly cleaning services
            for homes and businesses throughout Belval. Our goal is to deliver
            professional results while creating cleaner and healthier spaces
            for our community.
          </p>
        </div>
        <div className="footer-contact">
          <h3>Contact</h3>
          <p>2, Place de l'Université</p>
          <p>L-4365 Esch-sur-Alzette</p>
          <p>Luxembourg</p>
          <p>+352 777 777 777</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
