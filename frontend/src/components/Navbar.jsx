import React from 'react';
import { useState } from 'react';
import "./Navbar.css"

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState("");

  const toggleNavbar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-container-two">
          <div className="navbar-container-three">
            <h1 className="nav-logo">Clean<strong>Belval</strong></h1>
          </div>
          <ul className="navbar-options">
            <li key="">
              <a href="">Home</a>
            </li>
            <li key="">
              <a href="">About</a>
            </li>
            <li key="">
              <a href="">Options</a>
            </li>
            <li key="">
              <a href="">Contact</a>
            </li>
          </ul>
          <div className="navbar-signin">
            <a href="/sign-in" className="signin-btn">
              Sign In
            </a>
          </div>
          <div className="hamburger">
            <button onClick={toggleNavbar}>
              {mobileOpen ? "X" : "☰"}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="mobile-version-active">
            <ul>
              <li key="">
                <a href="">Home</a>
              </li>
              <li key="">
                <a href="">About</a>
              </li>
              <li key="">
                <a href="">Options</a>
              </li>
              <li key="">
                <a href="">Contact</a>
              </li>
            </ul>
            <div className="mobile-version-signin">
              <a href="/sign-in">
                SIGN IN
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
