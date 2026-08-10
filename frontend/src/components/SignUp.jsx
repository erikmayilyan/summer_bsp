import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import "./SignIn.css"

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [message, setMessage] = useState('')
  const [emailError, setEmailError] = useState('')
  const [zipError, setZipError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    };
    
    if (!name || !email || !password || !address || !city || !zip) {
      alert("Please fill up all the field!");
      return;
    };
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    
    if (!/^\d{4}$/.test(zip)) {
      setZipError("ZIP code must contain 4 digits");
      return;
    };

    const payload = {
      name: name,
      email: email.trim(),
      password,
      address: address,
      city: city,
      zip: zip
    };

    console.log("Sending payload:", payload);
    try {
      console.log("About to call fetch");

      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Fetch finished");
      console.log("HTTP status:", response.status);
      console.log("Response ok:", response.ok);

      const data = await response.json();
      console.log("Response data:", data);
      if (typeof data === "string") {
        setMessage(data);
      } else {
        setMessage("Account Created Successfully!");
        alert("Account Created Successfully!");
      };

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setAddress('');
      setCity('');
      setZip('');
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <h2 className="sign-up-title">SIGN UP</h2>
        {message && <p className="success-message">{message}</p>}
        <form onSubmit={handleSubmit} className="sign-up">
          <div className="sign-up-form">
            <div className="sign-up-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Enter Full Name" 
                name="name" 
                value={name}
                onChange={(event) => setName(event.target.value)} 
              />
            </div>
            <div className="sign-up-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="Enter Email" 
                name="email" 
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setEmailError('')
                }} 
              />
              {emailError && <p className="input-error">{emailError}</p>}
            </div>
            <div className="sign-up-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Enter Password" 
                name="password" 
                value={password}
                onChange={(event) => setPassword(event.target.value)} 
              />
            </div>
            <div className="sign-up-group">
              <label>Confirm Password</label>
              <input 
                type="password" 
                placeholder="Confirm Password" 
                name="password" 
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)} 
              />
            </div>
            <div className="sign-up-group">
              <label>Address</label>
              <input 
                type="text" 
                placeholder="Enter Address" 
                name="address" 
                value={address}
                onChange={(event) => setAddress(event.target.value)} 
              />
            </div>
            <div className="sign-up-group">
              <label>City</label>
              <select
                name="address"
                onChange={(event) => setCity(event.target.value)}
                value={city}
                defaultValue=""
              >
                <option value="" disabled>Select a city</option>
                <option value="Luxembourg City">Luxembourg City</option>
                <option value="Esch-sur-Alzette">Esch-sur-Alzette</option>
                <option value="Differdange">Differdange</option>
                <option value="Dudelange">Dudelange</option>
                <option value="Pétange">Pétange</option>
                <option value="Ettelbruck">Ettelbruck</option>
                <option value="Diekirch">Diekirch</option>
                <option value="Wiltz">Wiltz</option>
                <option value="Echternach">Echternach</option>
                <option value="Grevenmacher">Grevenmacher</option>
                <option value="Remich">Remich</option>
                <option value="Clervaux">Clervaux</option>
                <option value="Vianden">Vianden</option>
                <option value="Mersch">Mersch</option>
                <option value="Bettembourg">Bettembourg</option>
                <option value="Strassen">Strassen</option>
                <option value="Bertrange">Bertrange</option>
                <option value="Hesperange">Hesperange</option>
                <option value="Schifflange">Schifflange</option>
                <option value="Sanem">Sanem</option>
              </select>
            </div>
            <div className="sign-up-group">
              <label>Zip</label>
              <input 
                type="text" 
                placeholder="Enter ZIP Code" 
                value={zip}
                maxLength={4}
                name="zip" 
                onChange={(event) => {
                  if (/^\d*$/.test(event.target.value)) {
                    setZip(event.target.value)
                    setZipError('')
                  }
                }} 
              />
              {zipError && <p className="input-error">{zipError}</p>}
            </div>
            <button type="submit" className="sign-up-btn">Sign Up</button>
            <p>If you already have an account you can sign in below!</p>
            <a href="/sign-in">Sign In to Your Acccount</a>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default SignUp
