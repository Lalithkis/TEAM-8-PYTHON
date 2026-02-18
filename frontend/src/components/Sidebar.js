import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊', roles: ['student', 'staff', 'admin'] },
    { path: '/users', label: 'Users', icon: '👥', roles: ['staff', 'admin'] },
    { path: '/resources', label: 'Resources', icon: '📚', roles: ['student', 'staff', 'admin'] },
    { path: '/bookings', label: 'Bookings', icon: '📅', roles: ['student', 'staff', 'admin'] },
  ];

  const filteredMenu = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <div className="bg-gray-900 text-white w-64 flex-shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Campus Resource</h1>
        <p className="text-sm text-gray-400 mt-1">Management System</p>
      </div>
      
      <nav className="mt-6">
        {filteredMenu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
              location.pathname === item.path ? 'bg-gray-800 text-white border-l-4 border-blue-500' : ''
            }`}
          >
            <span className="text-xl mr-3">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
