import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (user) {
      const role = user.role?.toUpperCase();
      if (role === 'STUDENT' || role === 'STAFF') {
        const start = parseInt(localStorage.getItem('sessionStart') || '0', 10);
        const duration = 15 * 60 * 1000;

        const timer = setInterval(() => {
          const now = Date.now();
          const remaining = duration - (now - start);

          if (remaining <= 0) {
            setTimeLeft('00:00');
            clearInterval(timer);
            // AuthContext handles actual logout
          } else {
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            setTimeLeft(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
          }
        }, 1000);

        return () => clearInterval(timer);
      }
    }
  }, [user]);

  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Side: Hamburger + Title */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden mr-4 text-gray-500 hover:text-gray-700 focus:outline-none p-2 rounded-md hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Welcome, {user?.name || 'User'}
            </h2>
            <p className="text-sm text-gray-500 capitalize">{user?.role} Dashboard</p>
          </div>
        </div>

        {/* Right Side: Timer + User Profile + Logout */}
        <div className="flex items-center space-x-4">
          {/* Session Timer */}
          {timeLeft && (
            <div className="hidden md:flex bg-red-50 px-3 py-1 rounded-full border border-red-100 items-center">
              <svg className="w-4 h-4 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-red-600 font-mono">{timeLeft}</span>
            </div>
          )}

          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-700">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
