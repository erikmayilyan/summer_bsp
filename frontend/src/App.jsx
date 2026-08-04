import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './ProtectedRoute'
import Success from './components/Success'
import Cancel from './components/Cancel'
import Chatbot from './components/Chatbot'
import './App.css'

const App = () => {
  return (
    <div>
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
