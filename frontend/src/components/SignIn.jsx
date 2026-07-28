import React, { useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import "./SignIn.css"

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <h2>SIGN IN</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Sign In</button>
          <p>If you don't have an account you can create one below!</p>
          <a href="/sign-up">Create Account</a>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default SignIn
