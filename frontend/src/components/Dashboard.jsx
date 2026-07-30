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
  const [editName, setEditName] = useState(client?.name ?? '');
  const [editAddress, setEditAddress] = useState(client?.address ?? '');
  const [editCity, setEditCity] = useState(client?.city ?? '');
  const [editZip, setEditZip] = useState(client?.zip ?? '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


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

  const uploadData = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!!!");
      return;
    };

    const response = await fetch("http://localhost:3000/edit-profile", {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        email: client.email,
        name: editName,
        address: editAddress,
        city: editCity,
        zip: editZip,
        password: newPassword
      })
    });
    const editedClient = await response.json();
    setClient(editedClient);
    localStorage.setItem("user", JSON.stringify(editedClient));
    alert("The profiel has been successfully updated!!!");
  };

  if (!client) {
    return (
      <div>
        <Navbar />
        <div className="dashboard">
          {error && <p>{error}</p>}
        </div>
        <Footer />
      </div>
    );
  }

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
              <button 
                type="button" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </section>
            <main className="dashboard-content">
              {activeSection === "dashboard" && (
                <div className="dashboard-welcome">
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
              {activeSection === "purchases" && client.role === "admin" && (
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
          </div>
        ) : (
          <div className="dashboard-container">
            <section className="dashboard-sidebar">
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
              <button 
                type="button" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </section>
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
              {activeSection === "purchases" && client.role === "admin" && (
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
              {activeSection === "account" && client.role === "user" && (
                <div className="dashboard-card">
                  <h2>Edit Website</h2>
                  <label>Name</label>
                  <input 
                    value={editName}
                    onChange={(event) => setEditName(event.target.value)}
                  />
                  <label>Address</label>
                  <input 
                    value={editAddress}
                    onChange={(event) => setEditAddress(event.target.value)}
                  />
                  <label>City</label>
                  <input 
                    value={editCity}
                    onChange={(event) => setEditCity(event.target.value)}
                  />
                  <label>ZIP Code</label>
                  <input 
                    value={editZip}
                    onChange={(event) => setEditZip(event.target.value)}
                  />
                  <label>New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                  />
                  <label>Confirm Password</label>
                  <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e)=>setConfirmPassword(e.target.value)}
                  />

                  <button onClick={uploadData}>
                      Save Changes
                  </button>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
