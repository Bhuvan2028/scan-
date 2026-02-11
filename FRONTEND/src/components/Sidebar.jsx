// src/components/Sidebar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ collapsed }) => {
  const location = useLocation();
  
const menuItems = [
  { path: '/', icon: 'fas fa-th-large', label: 'Dashboard', color: '#7c3aed' },

  // ✅ FIXED ICON HERE
  { path: '/scan', icon: 'fas fa-crosshairs', label: 'New Scan', color: '#ec4899' },

  { path: '/scans', icon: 'fas fa-history', label: 'Scan History', color: '#3b82f6' },
  { path: '/assessment', icon: 'fas fa-clipboard-check', label: 'Assessment', color: '#10b981' },
  { path: '/assessment-history', icon: 'fas fa-chart-bar', label: 'Assessment History', color: '#f59e0b' },
  { path: '/profile', icon: 'fas fa-user', label: 'Profile', color: '#8b5cf6' },
  { path: '/settings', icon: 'fas fa-cog', label: 'Settings', color: '#6b7280' }
];


  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <i className="fas fa-shield-alt"></i>
          </div>
          {!collapsed && (
            <div className="logo-text">
              <h2>SecureScan</h2>
              <p>Security Dashboard</p>
            </div>
          )}
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <NavLink
                to={item.path}
                className={({ isActive }) => `
                  nav-link ${isActive ? 'active' : ''}
                `}
                style={({ isActive }) => ({
                  borderLeftColor: isActive ? item.color : 'transparent'
                })}
              >
                <div className="nav-icon" style={{ color: item.color }}>
                  <i className={item.icon}></i>
                </div>
                {!collapsed && (
                  <span className="nav-text">{item.label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* {!collapsed && (
        <div className="sidebar-footer">
          <div className="footer-card">
            <div className="footer-icon">
              <i className="fas fa-rocket"></i>
            </div>
            <div className="footer-content">
              <h4>Pro Version</h4>
              <p>Unlock advanced features</p>
              <button className="btn btn-sm btn-primary">Upgrade</button>
            </div>
          </div>
        </div>
      )} */}
    </aside>
  );
};

export default Sidebar;