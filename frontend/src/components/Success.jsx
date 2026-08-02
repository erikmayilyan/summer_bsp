import React, { useEffect } from 'react'
import { useSearchParams } from "react-router-dom"
import Navbar from './Navbar'
import Footer from './Footer'
import "./Success.css"

const Success = () => {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");

  const successPayment = async () => {
    try {
      if (!session_id) {
        console.log("Missing payment session!");
        return;
      };
      const response = await fetch("http://localhost:3000/finalize-payment", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          session_id
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    successPayment();
  }, [session_id]);

  return (
    <div>
      <Navbar />
        <div className="success">
          <h1>Your Payment Has Been Successful</h1>
          <h3>You can now view your purchased product in the dashboard</h3>
          <h4>See you Soon!</h4>
        </div>
      <Footer />
    </div>
  )
}

export default Success
