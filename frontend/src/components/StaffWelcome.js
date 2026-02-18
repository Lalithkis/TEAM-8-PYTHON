import React from 'react';
import { Link } from 'react-router-dom';

const StaffWelcome = ({ userName, stats, role }) => {
  const isAdmin = role === 'admin';
  const managementCards = [
    {
      title: 'Manage Users',
      description: 'View and manage all system users',
      icon: '👥',
      link: '/users',
      color: 'from-purple-500 to-pink-500',
      count: stats.totalUsers || 0,
      label: 'Total Users'
    },
    {
      title: 'Manage Resources',
      description: 'Add, edit, and monitor resources',
      icon: '📚',
      link: '/resources',
      color: 'from-blue-500 to-cyan-500',
      count: stats.totalResources || 0,
      label: 'Total Resources'
    },
    {
      title: 'Pending Approvals',
      description: 'Review and approve bookings',
      icon: '⏳',
      link: '/bookings',
      color: 'from-orange-500 to-red-500',
      count: stats.pendingBookings || 0,
      label: 'Awaiting Action'
    }
  ];

  const recentActivity = [
    { action: 'New booking request', user: 'John Doe', time: '5 mins ago', type: 'pending' },
    { action: 'Resource added', user: 'Admin', time: '1 hour ago', type: 'success' },
    { action: 'Booking approved', user: 'Jane Smith', time: '2 hours ago', type: 'success' },
    { action: 'User registered', user: 'Mike Johnson', time: '3 hours ago', type: 'info' }
  ];

  const getActivityIcon = (type) => {
    switch(type) {
      case 'pending': return '⏳';
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      default: return '📌';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className={`bg-gradient-to-r ${isAdmin ? 'from-red-600 via-orange-600 to-yellow-600' : 'from-indigo-600 via-purple-600 to-pink-600'} rounded-2xl p-8 text-white mb-8 shadow-2xl`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {isAdmin ? 'Admin Control Panel 🔐' : 'Staff Control Panel 🎯'}
            </h1>
            <p className="text-lg opacity-90">
              Welcome back, {userName}! {isAdmin ? 'Full system access granted.' : 'Manage your campus efficiently.'}
            </p>
          </div>
          <div className="text-6xl">{isAdmin ? '👑' : '👨‍💼'}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {managementCards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className={`bg-gradient-to-r ${card.color} p-6 text-white`}>
              <div className="text-5xl mb-2">{card.icon}</div>
              <h3 className="text-2xl font-bold">{card.title}</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">{card.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-800">{card.count}</span>
                <span className="text-sm text-gray-500">{card.label}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">📊</span>
            System Overview
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Approved Bookings</p>
                  <p className="text-sm text-gray-600">This month</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-green-600">{stats.approvedBookings || 0}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  📅
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Total Bookings</p>
                  <p className="text-sm text-gray-600">All time</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-600">{stats.totalBookings || 0}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  📚
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Active Resources</p>
                  <p className="text-sm text-gray-600">Available now</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-purple-600">{stats.totalResources || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">🔔</span>
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-2xl mr-3">{getActivityIcon(activity.type)}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center">
          <span className="text-2xl mr-2">💡</span>
          Staff Quick Guide
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="flex items-start">
            <span className="text-blue-500 text-xl mr-2">1️⃣</span>
            <p className="text-sm text-gray-700">Review pending bookings daily for timely approvals</p>
          </div>
          <div className="flex items-start">
            <span className="text-blue-500 text-xl mr-2">2️⃣</span>
            <p className="text-sm text-gray-700">Keep resource information updated and accurate</p>
          </div>
          <div className="flex items-start">
            <span className="text-blue-500 text-xl mr-2">3️⃣</span>
            <p className="text-sm text-gray-700">Monitor user activity and system usage patterns</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffWelcome;
