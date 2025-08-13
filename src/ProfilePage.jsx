import React, { useState } from 'react';
import './App.css';

function ProfilePage({ onBack }) {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Apt 4B, New York, NY 10001",
    paymentMethods: [
      { id: 1, type: "Credit Card", last4: "4242", expiry: "05/26" },
      { id: 2, type: "PayPal", email: "john.doe@example.com" }
    ]
  });

  return (
    <div className="profile-page app-container">
      <nav className="navbar profile-navbar">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h1>My Profile</h1>
        <div></div> {/* Empty div for flex spacing */}
      </nav>
      
      <main className="profile-main">
        <div className="profile-header">
          <div className="profile-avatar">
            {profileData.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h2>{profileData.name}</h2>
          <p className="profile-since">Customer since August 2025</p>
        </div>
        
        <div className="profile-section">
          <h3 className="section-title">Personal Information</h3>
          <div className="profile-card">
            <div className="profile-field">
              <span className="field-label">Name</span>
              <span className="field-value">{profileData.name}</span>
            </div>
            <div className="profile-field">
              <span className="field-label">Email</span>
              <span className="field-value">{profileData.email}</span>
            </div>
            <div className="profile-field">
              <span className="field-label">Phone</span>
              <span className="field-value">{profileData.phone}</span>
            </div>
            <div className="profile-field">
              <span className="field-label">Default Address</span>
              <span className="field-value">{profileData.address}</span>
            </div>
            <button className="edit-btn">Edit Information</button>
          </div>
        </div>
        
        <div className="profile-section">
          <h3 className="section-title">Payment Methods</h3>
          <div className="profile-card">
            {profileData.paymentMethods.map(method => (
              <div key={method.id} className="payment-method">
                <div className="payment-icon">
                  {method.type === "Credit Card" ? "💳" : "🔐"}
                </div>
                <div className="payment-details">
                  <div className="payment-type">{method.type}</div>
                  {method.last4 && (
                    <div className="payment-info">•••• {method.last4} | Expires {method.expiry}</div>
                  )}
                  {method.email && (
                    <div className="payment-info">{method.email}</div>
                  )}
                </div>
                <button className="remove-payment-btn">Remove</button>
              </div>
            ))}
            <button className="add-payment-btn">Add Payment Method</button>
          </div>
        </div>
        
        <div className="profile-actions">
          <button className="primary-btn">Save Changes</button>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
