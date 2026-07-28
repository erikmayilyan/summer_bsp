import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import './App.css'

const App = () => {
  return (
    <Routes className="app">
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
