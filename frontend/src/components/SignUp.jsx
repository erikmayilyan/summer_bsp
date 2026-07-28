import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import "./SignIn.css"

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
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
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <h2>SIGN UP</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="Enter Full Name" 
              name="name" 
              onChange={(event) => setName(event.target.value)} 
            />
          </div>
          <div>
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter Email" 
              name="email" 
              onChange={(event) => setEmail(event.target.value)} 
            />
          </div>
          <div>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter Password" 
              name="password" 
              onChange={(event) => setPassword(event.target.value)} 
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input 
              type="password" 
              placeholder="Enter Password" 
              name="password" 
              onChange={(event) => setPassword(event.target.value)} 
            />
          </div>
          <div>
            <label>Address</label>
            <input 
              type="text" 
              placeholder="Enter Address" 
              name="address" 
              onChange={(event) => setAddress(event.target.value)} 
            />
          </div>
          <div>
            <label>City</label>
            <select
              name="address"
              onChange={(event) => setCity(event.target.value)}
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
          <div>
            <label>Zip</label>
            <input 
              type="text" 
              placeholder="Enter ZIP Code" 
              name="zip" 
              onChange={(event) => setZip(event.target.value)} 
            />
          </div>
          <button type="submit">Sign Up</button>
          <p>If you alreadt have an account you can sign in below!</p>
          <button>Sign In to Your Acccount</button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default SignUp
