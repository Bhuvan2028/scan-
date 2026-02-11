// src/services/notificationService.js
import axios from 'axios';

const API_URL = 'http://localhost:3330/api'; // Or use '/api' if you have a proxy

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('Notification API Error:', error);
    return Promise.reject(error);
  }
);

const notificationService = {
  // Fetch all notifications for the current user
  getNotifications: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },

  // Mark a specific notification as read
  markAsRead: async (notificationId) => {
    const response = await api.put(`/notifications/${notificationId}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all');
    return response.data;
  },

  // Clear all notifications
  clearAll: async () => {
    const response = await api.delete('/notifications');
    return response.data;
  }
};

export default notificationService;