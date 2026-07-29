import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from "./Navbar"
import Footer from "./Footer"
import "./Dashboard.css"

const Dashboard = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    if (client) {
      return;
    }

    const email = localStorage.getItem("clientEmail") || "";

    fetch(`http://localhost:3000/client?email=${encodeURIComponent(email)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }

        localStorage.setItem("user", JSON.stringify(data));
        setClient(data);
      })
      .catch(() => {
        setError("Could not load your profile. Make sure the backend is running.");
      });
  }, [client]);

  const handleLogout = () => {
    localStorage.removeItem("signedIn");
    localStorage.removeItem("clientEmail");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        {client.role === "admin" ? (
          
          <div className="dashboard-container">
            <section className="dashboard-sidebar">
              <button
                className={activeSection === "edit" ? "active" : ""}
                onClick={() => setActiveSection("edit")}
                type="button"
              >
                Edit Profile
              </button>
              <button 
                type="button"
                className={activeSection === "edit" ? "active" : ""}
                onClick={() => setActiveSection("edit")}
              >
                All Purchases
              </button>
              <button
                className={activeSection === "messages" ? "active" : ""}
                onClick={() => setActiveSection("messages")}
              >
                Messages
              </button>
              <button
                className={activeSection === "users" ? "active" : ""}
                onClick={() => setActiveSection("users")}
              >
                Users
              </button>
            </section>
          </div>
        ) : (
          <div>
            <button 
              type="button"
              className={activeSection === "purchases" ? "active" : ""}
              onClick={() => setActiveSection("purchases")}
            >
              View Purchases
            </button>
            <button
              className={activeSection === "account" ? "active" : ""}
              onClick={() => setActiveSection("account")}
            >
              Edit Account
            </button>
          </div>
        )}
        <button 
          type="button" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <main className="dashboard-content">
        {activeSection === "dashboard" && (
          <div>
            <h1>
              Welcome, {client.name}
            </h1>
            <p>
              You are logged in as {client.role}.
            </p>
          </div>
        )}
        {activeSection === "edit" && client.role === "admin" && (
          <div className="dashboard-card">
            <h2>Edit Website</h2>
            <p>
              Modify services, prices and company information.
            </p>
            <button>Edit</button>
          </div>
        )}
        {activeSection === "purchases" && (
          <div className="dashboard-card">
            <h2>
              {client.role === "admin"
                ? "All Purchases"
                : "My Purchases"}
            </h2>
            <p>
              Purchase history will appear here.
            </p>
          </div>
        )}
        {activeSection === "messages" && client.role === "admin" && (
          <div className="dashboard-card">
            <h2>Customer Messages</h2>
            <p>
              Messages from customers will appear here.
            </p>
          </div>
        )}
        {activeSection === "users" && client.role === "admin" && (
          <div className="dashboard-card">
            <h2>Registered Users</h2>
            <p>
              User management will appear here.
            </p>
          </div>
        )}
        {activeSection === "account" && client.role === "user" && (
          <div className="dashboard-card">
            <h2>Edit Account</h2>
            <p>
              Update your personal information.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Dashboard
