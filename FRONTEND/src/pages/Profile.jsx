import React, { useState } from "react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="page-container">
      <div className="profile-card">

        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <span>A</span>
          </div>

          <div className="profile-info">
            <h1>Admin User</h1>
            <p className="role-badge">Security Analyst</p>
            <span className="email">admin@securitydashboard.com</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          {["personal", "security", "preferences"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="profile-content">
          {activeTab === "personal" && (
            <div className="form-grid">
              <div className="form-group">
                <label>First Name</label>
                <input defaultValue="Admin" />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input defaultValue="User" />
              </div>

              <div className="form-group">
                <label>Department</label>
                <input defaultValue="IT Security" />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input defaultValue="San Francisco, CA" />
              </div>

              <div className="form-group full">
                <label>Bio</label>
                <textarea
                  rows="4"
                  defaultValue="Experienced security analyst with expertise in vulnerability assessment and penetration testing."
                />
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="security-section">
              <p><b>Role:</b> Security Analyst</p>
              <p><b>Last Login:</b> 2 hours ago</p>
              <p><b>2FA:</b> Enabled</p>
              <button className="btn btn-secondary">
                Change Password
              </button>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="preferences-section">
              <label className="toggle">
                <input type="checkbox" defaultChecked />
                <span /> Dark Mode
              </label>

              <label className="toggle">
                <input type="checkbox" />
                <span /> Email Notifications
              </label>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="profile-actions">
          <button className="btn btn-secondary">Cancel</button>
          <button className="btn btn-primary">Save Changes</button>
        </div>

      </div>
    </div>
  );
}
