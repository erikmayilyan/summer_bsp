import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Footer from './Footer'
import Navbar from './Navbar'
import "./SignIn.css"

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("signedIn") === "true") {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Sign in failed. Please try again.");
        return;
      }

      if (data.message === "Signin was Successful!" && data.client) {
        localStorage.setItem("signedIn", "true");
        localStorage.setItem("clientEmail", data.client.email);
        localStorage.setItem("user", JSON.stringify(data.client));
        navigate("/dashboard", { replace: true });
        return;
      }

      if (data === "Signin was Successful!") {
        localStorage.setItem("signedIn", "true");
        localStorage.setItem("clientEmail", email.trim());
        navigate("/dashboard", { replace: true });
        return;
      }

      setMessage(typeof data === "string" ? data : "Sign in failed. Please try again.");
    } catch (error) {
      console.error(error);
      setMessage("Could not reach the server. Make sure the backend is running.");
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <h2 className="sign-up-title">SIGN IN</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit} className="sign-up">
          <div className="sign-up-form">
            <div className="sign-up-group">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="Enter Email" 
                name="email" 
                value={email}
                onChange={(event) => setEmail(event.target.value)} 
              />
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
            <button type="submit" className="sign-up-btn">Sign In</button>
            <p>If you don't have an account you can create one below!</p>
            <a href="/sign-up">Create Account</a>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default SignIn
