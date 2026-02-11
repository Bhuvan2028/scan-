// src/components/Profile.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/login";
};


  return (
    <div className="profile-container" ref={profileRef}>
      <button 
        className="profile-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User profile"
      >
        <img src="https://picsum.photos/seed/user/40/40" alt="User" />
      </button>
      
      {isOpen && (
        <div className="profile-dropdown">
          <div className="profile-header">
            <div className="profile-info">
              <img src="https://picsum.photos/seed/user/60/60" alt="User" />
<div className="user-details">
  <h3>Admin User</h3>
  <span className="user-role">Security Analyst</span>
  <p>admin@securitydashboard.com</p>
</div>
            </div>
          </div>
          
          <div className="profile-menu">
            <Link to="/profile" className="profile-menu-item">
              <i className="fas fa-user"></i>
              My Profile
            </Link>
            <Link to="/settings" className="profile-menu-item">
              <i className="fas fa-cog"></i>
              Settings
            </Link>
            <div className="profile-divider"></div>
            <button className="profile-menu-item logout" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;