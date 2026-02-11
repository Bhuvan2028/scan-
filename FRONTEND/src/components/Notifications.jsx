// src/components/Notifications.jsx
import React, { useState, useRef, useEffect } from 'react';
import notificationService from '../services/notificationService';
import './Notifications.css';

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add an error state
  const notificationRef = useRef(null);

  // --- MODIFIED EFFECT FOR DATA FETCHING ---
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      setError(null); // Clear any previous errors
      try {
        const fetchedNotifications = await notificationService.getNotifications();
        console.log('Fetched notifications:', fetchedNotifications);
        setNotifications(fetchedNotifications);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError(err.message || 'Failed to fetch notifications'); // Set the error message
      } finally {
        setLoading(false);
      }
    };

    // Fetch immediately on component mount
    fetchNotifications();
  }, []); // Empty dependency array means this runs only once on mount

  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const markAsRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      // Optimistically update the UI
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === id ? { ...notification, read: true } : notification
        )
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
      setError(err.message || 'Failed to mark notification as read');
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      // Optimistically update the UI
      setNotifications(prevNotifications =>
        prevNotifications.map(notification => ({ ...notification, read: true }))
      );
    } catch (err) {
      console.error('Failed to mark all as read:', err);
      setError(err.message || 'Failed to mark all as read');
    }
  };

  const clearAll = async () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      try {
        await notificationService.clearAll();
        setNotifications([]); // Clear the UI immediately
        setError(null); // Clear any errors
      } catch (err) {
        console.error('Failed to clear notifications:', err);
        setError(err.message || 'Failed to clear notifications');
      }
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return 'fas fa-check-circle';
      case 'danger': return 'fas fa-exclamation-triangle';
      case 'warning': return 'fas fa-exclamation-circle';
      case 'info': return 'fas fa-info-circle';
      default: return 'fas fa-bell';
    }
  };

  const retryFetch = () => {
    setError(null);
    fetchNotifications();
  };

  // --- SIMPLIFIED RENDER LOGIC ---
  if (loading) {
    return (
      <div className="notifications-container loading">
        <div className="notification-spinner"></div>
        <p>Loading notifications...</p>
      </div>
    );
  }

  // --- ADD ERROR DISPLAY ---
  if (error) {
    return (
      <div className="notifications-container">
        <button 
          className="notification-trigger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Notifications"
        >
          <i className="fas fa-bell"></i>
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </button>
        
        {isOpen && (
          <div className="notifications-dropdown">
            <div className="notifications-header">
              <h3>Notifications</h3>
              <div className="notification-actions">
                {unreadCount > 0 && (
                  <button className="mark-read-btn" onClick={markAllAsRead}>
                    Mark all as read
                  </button>
                )}
                <button className="clear-btn" onClick={clearAll}>
                  Clear all
                </button>
                {/* Add a retry button */}
                <button className="retry-btn" onClick={retryFetch} title="Retry">
                  <i className="fas fa-redo"></i>
                </button>
              </div>
            </div>
          
            <div className="notifications-list">
              <div className="error-message">
                <i className="fas fa-exclamation-triangle"></i>
                <p>{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="notifications-container" ref={notificationRef}>
      <button 
        className="notification-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <i className="fas fa-bell"></i>
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </button>
      
      {isOpen && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <div className="notification-actions">
              {unreadCount > 0 && (
                <button className="mark-read-btn" onClick={markAllAsRead}>
                  Mark all as read
                </button>
              )}
              <button className="clear-btn" onClick={clearAll}>
                Clear all
              </button>
            </div>
          </div>
          
          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-icon">
                    <i className={getNotificationIcon(notification.type)}></i>
                  </div>
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="notification-time">{notification.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-notifications">
                <i className="fas fa-check-circle"></i>
                <p>No notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;