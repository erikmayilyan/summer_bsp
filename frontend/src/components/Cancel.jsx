import React from 'react'
import { useNavigate } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'
import "./Cancel.css"

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="cancel">
        <h1>The purchase has been canceled!</h1>
        <button onClick={() => navigate("/")}>
          BACK TO HOME
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Cancel
