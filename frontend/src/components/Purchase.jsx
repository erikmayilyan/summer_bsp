import React from 'react'
import "./Purchase.css"

const Purchase = ({ closeModal }) => {

  return (
    <div className="purchase">
      <div className="purchase-container">
        <button className="purchase-close" onClick={() => closeModal(false)}>X</button>
        <div className="purchase-group">
          <label>Package Type:</label>
          <div>
            <input 
              type="text" 
              placeholder="Package Type" 
              name="package" 
            />
          </div>
        </div>
        <div className="purchase-group">
          <label>Name:</label>
          <div>
            <input 
              type="text" 
              placeholder="Full Name" 
              name="name" 
            />
          </div>
        </div>
        <div className="purchase-group">
          <label>Address:</label>
          <div>
            <input 
              type="text" 
              placeholder="Address" 
              name="address" 
            />
          </div>
        </div>
        <div className="purchase-group">
          <label>City:</label>
          <div>
            <input 
              type="text"
              placeholder="City"
              name="city"
            />
          </div>
        </div>
        <div className="purchase-group">
          <label>Zip:</label>
          <div>
            <input 
              type="text"
              placeholder="Zip"
              name="zip"
            />
          </div>
        </div>
        <div className="purchase-group">
          <label>Phone Number:</label>
          <div>
            <input 
              type="number"
              placeholder="Phone Number"
              name="phone"
            />
          </div>
        </div>
        <div className="purchase-group">
          <label>Select A Date:</label>
          <div>
            <input 
              type="date"
              placeholder="Select A Date"
              name="date"
            />
          </div>
        </div>
        <div className="purchase-group">
          <label>Select A Time:</label>
          <div>
            <input
              type="time"
              placeholder="Select Time"
              name="time"
            />
          </div>
        </div>
        <button className="purchase-payment">
          PROCEED TO PAYMENT
        </button>
      </div>
    </div>
  )
}

export default Purchase
