import React from 'react';
import { Link } from 'react-router-dom';

const AdminWelcome = ({ userName, stats }) => {
  const systemModules = [
    {
      title: 'User Management',
      description: 'Manage students and staff accounts',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      link: '/users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      stats: [
        { label: 'Total Users', value: stats.totalUsers || 0 },
        { label: 'Active', value: stats.totalUsers || 0 }
      ]
    },
    {
      title: 'Resource Control',
      description: 'Oversee campus labs and halls',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      link: '/resources',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      stats: [
        { label: 'Total Resources', value: stats.totalResources || 0 },
        { label: 'Available', value: stats.totalResources || 0 }
      ]
    },
    {
      title: 'Booking Oversight',
      description: 'Review and approve reservations',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      link: '/bookings',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      stats: [
        { label: 'Total Bookings', value: stats.totalBookings || 0 },
        { label: 'Pending Requests', value: stats.pendingBookings || 0 }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4 md:space-y-8 p-3 md:p-4">
      {/* Professional Header */}
      <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 mt-2 text-lg">Good day, {userName}. Overview of your system status.</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">System Status</p>
            <div className="flex items-center mt-1">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-900">Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {systemModules.map((module, index) => (
          <Link
            key={index}
            to={module.link}
            className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 overflow-hidden flex flex-col"
          >
            <div className="p-8 flex-1">
              <div className={`w-14 h-14 rounded-xl ${module.bgColor} flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-200`}>
                <div className={`${module.color}`}>
                  {module.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{module.title}</h3>
              <p className="text-gray-500 leading-relaxed">{module.description}</p>
            </div>

            <div className="bg-gray-50 px-8 py-5 flex justify-between items-center border-t border-gray-100">
              {module.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                  <span className="text-xl font-bold text-gray-800 mt-1">{stat.value}</span>
                </div>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminWelcome;
