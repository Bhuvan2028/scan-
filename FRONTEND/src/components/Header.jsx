// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import Notifications from './Notifications.jsx';
import Profile from './Profile.jsx';
import './Header.css';



const Header = ({ toggleSidebar, sidebarCollapsed }) => {
    const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/scan': return 'New Scan';
      case '/scans': return 'Scan History';
      case '/assessment': return 'Security Assessment';
      case '/assessment-history': return 'Assessment History';
      default: 
        if (location.pathname.startsWith('/scans/')) return 'Scan Details';
        if (location.pathname.startsWith('/assessment/')) return 'Assessment Details';
        return 'Security Dashboard';
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="menu-toggle"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <i className={`fas fa-${sidebarCollapsed ? 'bars' : 'times'}`}></i>
        </button>
        <div className="header-title">
          <h1>{getPageTitle()}</h1>
          <p className="breadcrumb">
            <span>Security Dashboard</span>
            <i className="fas fa-chevron-right"></i>
            <span>{getPageTitle()}</span>
          </p>
        </div>
      </div>
      
      <div className="header-right">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search..." />
        </div>
        
        <div className="header-actions">
  <button
    onClick={() =>
      setTheme(prev => (prev === "light" ? "dark" : "light"))
    }
    className="btn btn-outline btn-sm"
    aria-label="Toggle theme"
    title="Toggle dark mode"
  >
    {theme === "light" ? "🌙" : "☀️"}
  </button>

  <Notifications />
  <Profile />
</div>

      </div>
    </header>
  );
};

export default Header;