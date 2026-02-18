import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, closeMobile }) => {
  const location = useLocation();
  const { user } = useAuth(); // Assuming useAuth is available here

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊', roles: ['student', 'staff', 'admin'] },
    { path: '/users', label: 'Users', icon: '👥', roles: ['staff', 'admin'] }, // Only Staff/Admin see Users
    { path: '/resources', label: 'Resources', icon: '📚', roles: ['student', 'staff', 'admin'] },
    { path: '/bookings', label: 'Bookings', icon: '📅', roles: ['student', 'staff', 'admin'] },
  ];

  // Filter menu items based on user role
  const filteredMenu = menuItems.filter(item =>
    !item.roles || (user && item.roles.includes(user.role ? user.role.toLowerCase() : ''))
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobile}
        ></div>
      )}

      {/* Sidebar Container */}
      <div className={`
        bg-gray-900 text-white w-64 flex-shrink-0 
        fixed md:static inset-y-0 left-0 z-50
        transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        transition-transform duration-200 ease-in-out
        flex flex-col h-full
      `}>
        <div className="p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Campus Resource</h1>
            <p className="text-sm text-gray-400 mt-1">Management System</p>
          </div>
          {/* Close button for mobile */}
          <button onClick={closeMobile} className="md:hidden text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="mt-6 flex-1 overflow-y-auto">
          {filteredMenu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMobile} // Close sidebar on navigate (mobile)
              className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${location.pathname === item.path ? 'bg-gray-800 text-white border-l-4 border-blue-500' : ''
                }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Info / Logout could go here at bottom if needed responsiveness */}
      </div>
    </>
  );
};

export default Sidebar;
