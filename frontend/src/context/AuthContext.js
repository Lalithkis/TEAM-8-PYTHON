import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Check session expiry for Student/Staff
      const role = parsedUser.role?.toUpperCase();
      if (role === 'STUDENT' || role === 'STAFF') {
        const sessionStart = parseInt(localStorage.getItem('sessionStart') || '0', 10);
        const SESSION_DURATION = 15 * 60 * 1000; // 15 minutes
        const now = Date.now();

        if (now - sessionStart > SESSION_DURATION) {
          // Session expired
          logout();
        } else {
          // Set timeout for remaining time
          const remainingTime = SESSION_DURATION - (now - sessionStart);
          const timer = setTimeout(() => {
            logout();
            alert("Session expired. Please login again."); // Optional: Notify user
          }, remainingTime);
          return () => clearTimeout(timer);
        }
      }
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    // Set session start time
    localStorage.setItem('sessionStart', Date.now().toString());
    setUser(userData);
  };

  const logout = () => {
    // Attempt to call backend logout, but always clear local state
    authAPI.logout().catch(err => console.error("Logout API failed", err));

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('sessionStart'); // Clear session start
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
