import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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

        {/* Right Side: User Profile + Logout */}
        <div className="flex items-center space-x-4">
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
