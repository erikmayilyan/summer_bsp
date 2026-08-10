import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import Success from './components/Success'
import Cancel from './components/Cancel'
import Chatbot from './components/Chatbot'
import './App.css'

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        const getId = document.getElementById(id);
        if (getId) {
          getId.scrollIntoView();
        } else {
          window.scrollTo(0, 0);
        }
      })
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Routes className="app">
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
      <Chatbot />
    </div>
  )
}

export default App
