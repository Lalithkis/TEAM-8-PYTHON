import React from 'react';
import { Link } from 'react-router-dom';

const StudentWelcome = ({ userName }) => {
  const quickActions = [
    {
      title: 'Browse Resources',
      description: 'Explore active labs and halls',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      link: '/resources',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'My Bookings',
      description: 'Track your reservation status',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      link: '/bookings',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'New Request',
      description: 'Book a resource instantly',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: '/bookings',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4">
      {/* Professional Header */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-gray-500 mt-2 text-lg">Welcome back, {userName}. Manage your campus activities.</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Current Session</p>
            <div className="flex items-center mt-1">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-900">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-200 overflow-hidden flex flex-col p-6"
          >
            <div className={`w-14 h-14 rounded-xl ${action.bgColor} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200`}>
              <div className={`${action.color}`}>
                {action.icon}
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{action.title}</h3>
            <p className="text-gray-500 leading-relaxed">{action.description}</p>
          </Link>
        ))}
      </div>

      {/* Information Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-blue-50 text-blue-600 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Booking Guidelines
          </h3>
          <div className="space-y-4">
            {[
              "Check resource availability before requesting.",
              "Requests must be made at least 24 hours in advance.",
              "Provide a clear academic purpose for approval.",
              "Cancellations should be done promptly."
            ].map((item, idx) => (
              <div key={idx} className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-green-50 text-green-600 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Quick Tips
          </h3>
          <div className="space-y-4">
            {[
              "Use the 'Resources' tab to view lab capacities.",
              "Approved bookings will appear in your 'My Bookings'.",
              "Contact admin for urgent same-day requests.",
              "Keep your profile updated for notifications."
            ].map((item, idx) => (
              <div key={idx} className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentWelcome;
