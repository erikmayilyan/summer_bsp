import React, { useState } from 'react'
import "./Purchase.css"

const Purchase = ({ closeModal, user, packageTitle }) => {
  const [packageName, setPackageName] = useState(packageTitle ?? '');
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [address, setAddress] = useState(user?.address ?? '');
  const [city, setCity] = useState(user?.city ?? '');
  const [zip, setZip] = useState(user?.zip ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [date, setDate] = useState(user?.date ?? '');
  const [time, setTime] = useState(user?.time ?? '');

  const handlePurchase = async () => {
    try {
      const response = await fetch("http://localhost:3000/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          packageName,
          name, 
          email,
          address,
          city,
          zip,
          phone,
          date,
          time,
          frontendUrl: window.location.origin
        })
      });
      const data = await response.json();
      if (!response.ok) {
        alert("There is an error: ", data.error);
        return;
      };
      window.location.href = data.url;
    } catch (error) {
      alert("Something is wrong!!!");
    }
  };

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
              value={packageName}
              onChange={(event) => setPackageName(event.target.value)}
              readOnly
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
              value={name}
              onChange={(event) => setName(event.target.value)}
              readOnly
            />
          </div>
        </div>
        <div className="purchase-group">
          <label>Email:</label>
          <div>
            <input 
              type="text" 
              placeholder="Email" 
              name="email" 
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              readOnly
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
              value={address}
              onChange={(event) => setAddress(event.target.value)}
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
              value={city}
              onChange={(event) => setCity(event.target.value)}
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
              value={zip}
              onChange={(event) => setZip(event.target.value)}
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
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
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
              value={date}
              onChange={(event) => setDate(event.target.value)}
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
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
          </div>
        </div>
        <button 
          className="purchase-payment"
          onClick={handlePurchase}
        >
          PROCEED TO PAYMENT
        </button>
      </div>
    </div>
  )
}

export default Purchase
