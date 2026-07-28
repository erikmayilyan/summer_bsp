import React from 'react'
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <h1 className="hero-content">
        A CLEANER BELVAL <span className="starts-here">STARTS HERE</span>
      </h1>
      <p>
        Reliable cleaning solutions for homes, businesses, and public spaces across Belval, Luxembourg. 
        Professional cleaning services with a commitment to sustainability and a healthier environment.
      </p>
      <div>
        <a href="#" className="hero-more">
          SEE THE OPTIONS
        </a>
      </div>
    </div>
  )
}

export default Hero
