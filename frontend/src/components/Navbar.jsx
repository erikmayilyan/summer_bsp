import React from 'react';
import { useState } from 'react';
import "./Navbar.css"

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState("");

  const signedIn = localStorage.getItem("signedIn") === "true";

  const toggleNavbar = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-container-two">
          <div className="navbar-container-three">
            <h1 className="nav-logo">
              <a href="/">Clean<strong>Belval</strong></a>
            </h1>
          </div>
          <ul className="navbar-options">
            <li key="">
              <a href="/">Home</a>
            </li>
            <li key="">
              <a href="/#about">About</a>
            </li>
            <li key="">
              <a href="/#options">Options</a>
            </li>
            <li key="">
              <a href="/#contact">Contact</a>
            </li>
          </ul>
          {signedIn ? (
            <div className="navbar-signin">
              <a href="/dashboard" className="signin-btn">
                DASHBOARD
              </a>
            </div>
          ) : (
            <div className="navbar-signin">
              <a href="/sign-in" className="signin-btn">
                Sign In
              </a>
            </div>
          )}
          
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
                <a href="/" onClick={() => setMobileOpen(false)}>Home</a>
              </li>
              <li key="">
                <a href="/#about" onClick={() => setMobileOpen(false)}>About</a>
              </li>
              <li key="">
                <a href="/#options" onClick={() => setMobileOpen(false)}>Options</a>
              </li>
              <li key="">
                <a href="/#contact" onClick={() => setMobileOpen(false)}>Contact</a>
              </li>
            </ul>
            {signedIn ? (
              <div className="navbar-version-signin">
                <a href="/dashboard" className="signin-btn">
                  DASHBOARD
                </a>
              </div>
            ) : (
              <div className="mobile-version-signin">
                <a href="/sign-in">
                  SIGN IN
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
