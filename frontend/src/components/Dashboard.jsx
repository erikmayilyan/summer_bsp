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
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);

  const getClients = async () => {
    const response = await fetch("http://localhost:3000/clients");
    const data = await response.json();
    setClients(data);
  }

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

  useEffect(() => {
    if (client?.role === "admin") {
      getClients();
    }
  }, [client]);

  const getContacts = async () => {
    const response = await fetch("http://localhost:3000/contacts");
    const data = await response.json();
    setContacts(data);
  };

  useEffect(() => {
    getContacts();
  }, []);

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

    const payload = {
        email: client.email,
        name: editName,
        address: editAddress,
        city: editCity,
        zip: editZip,
      };

    if (newPassword) {
      payload.password = newPassword;
    }

    const response = await fetch("http://localhost:3000/edit-profile", {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(payload)
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
  };

  const deleteClient = async (id) => {
    await fetch(`http://localhost:3000/clients/${id}`, {
      method: "DELETE",
    });

    setClients(clients.filter(client => client._id !== id));
    alert("Account Deleted Successfully!");
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        {client.role === "admin" ? (
          <div className="dashboard-container">
            <section className="dashboard-sidebar">
              <button 
                type="button"
                className={activeSection === "purchases" ? "active" : ""}
                onClick={() => setActiveSection("purchases")}
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
                  {contacts.map(contact => (
                    <div key={contact._id} className="dashboard-messages">
                      <h3>{contact.name}</h3>
                      <p>{contact.email}</p>
                      <div className="dashboard-message">
                        <h3>Message:</h3>
                        <p>{contact.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeSection === "users" && client.role === "admin" && (
                <div className="dashboard-card">
                  <h2>Registered Users</h2>
                  <div>
                    {clients.filter((user) => user.role !== "admin").map((user) => (
                      <div key={user._id} className="dashboard-clients">
                        <h2>{user.name}</h2>
                        <p>Email: {user.email}</p>
                        <p>Address: {user.address}</p>
                        <p>City: {user.city}</p>
                        <p>Zip Code: {user.zip}</p>
                        <button className="client-delete" onClick={() => deleteClient(user._id)}>
                          DELETE
                        </button>
                      </div>
                    ))}
                  </div>
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
                  <div className="edit-group">
                    <label>Name</label>
                    <input 
                      value={editName}
                      onChange={(event) => setEditName(event.target.value)}
                    />
                  </div>
                  <div className="edit-group">
                    <label>Address</label>
                    <input 
                      value={editAddress}
                      onChange={(event) => setEditAddress(event.target.value)}
                    />
                  </div>
                  <div className="edit-group">
                    <label>City</label>
                    <input 
                      value={editCity}
                      onChange={(event) => setEditCity(event.target.value)}
                    />
                  </div>
                  <div className="edit-group">
                    <label>ZIP Code</label>
                    <input 
                      value={editZip}
                      onChange={(event) => setEditZip(event.target.value)}
                    />
                  </div>
                  <div className="edit-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e)=>setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="edit-group">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button onClick={uploadData} className="save-btn">
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
