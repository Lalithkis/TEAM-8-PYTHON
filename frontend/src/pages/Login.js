import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [activeRole, setActiveRole] = useState('student'); // 'student', 'staff', 'admin'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  // Theme configurations based on role
  const roleThemes = {
    student: {
      gradient: 'from-blue-400 to-cyan-500',
      primaryColor: 'text-blue-600',
      buttonBg: 'bg-blue-500 hover:bg-blue-600',
      icon: '🎓',
      label: 'Student Portal',
      description: 'Access your courses and resources',
      demoCreds: { email: 'student@campus.edu', password: 'student123' }
    },
    staff: {
      gradient: 'from-purple-500 to-indigo-600',
      primaryColor: 'text-purple-600',
      buttonBg: 'bg-purple-500 hover:bg-purple-600',
      icon: '👨‍🏫',
      label: 'Staff Portal',
      description: 'Manage bookings and students',
      demoCreds: { email: 'staff@campus.edu', password: 'staff123' }
    },
    admin: {
      gradient: 'from-red-600 to-gray-900',
      primaryColor: 'text-red-700',
      buttonBg: 'bg-red-700 hover:bg-red-800',
      icon: '🛡️',
      label: 'Admin Portal',
      description: 'System-wide access and control',
      demoCreds: { email: 'admin123@gmail.com', password: 'admin123' } // Updated to correct admin email
    }
  };

  const currentTheme = roleThemes[activeRole];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(credentials);
      const { token, user } = response.data;
      login(token, user);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSwitch = (role) => {
    setActiveRole(role);
    setCredentials({ email: '', password: '' }); // Clear input on switch for cleaner feel
    setError('');
  };

  const prefillDemo = () => {
    setCredentials(currentTheme.demoCreds);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient} flex items-center justify-center p-4 transition-colors duration-500`}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 transform transition-all duration-300">

        {/* Role Toggles */}
        <div className="flex justify-center space-x-2 mb-8 bg-gray-100 p-1.5 rounded-xl">
          {['student', 'staff', 'admin'].map((role) => (
            <button
              key={role}
              onClick={() => handleRoleSwitch(role)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize flex-1 ${activeRole === role
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">{currentTheme.icon}</span>
          <h1 className={`text-3xl font-bold text-gray-800`}>{currentTheme.label}</h1>
          <p className="text-gray-500 mt-2 text-sm">{currentTheme.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded text-sm mb-4">
              {error}
            </div>
          )}
          {message && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded text-sm mb-4">
              {message}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </span>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all focus:border-transparent focus:ring-blue-500"
                placeholder="your.email@campus.edu"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all focus:border-transparent focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <button type="button" onClick={prefillDemo} className="text-gray-400 hover:text-gray-600 text-xs">
              Auto-fill Demo
            </button>
            <Link to="/forgot-password" className={`${currentTheme.primaryColor} hover:opacity-80 font-medium`}>
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${currentTheme.buttonBg} text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all font-bold tracking-wide transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed`}
          >
            {loading ? 'Authenticating...' : `Login as ${activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}`}
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              New here?{' '}
              <Link to="/signup" className={`${currentTheme.primaryColor} hover:opacity-80 font-bold`}>
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
