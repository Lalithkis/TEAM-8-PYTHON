import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import BookingModal from '../components/BookingModal';
import StatusBadge from '../components/StatusBadge';
import { bookingsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getAll();
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await bookingsAPI.approve(id);
      fetchBookings();
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await bookingsAPI.reject(id);
      fetchBookings();
    } catch (error) {
      console.error('Error rejecting booking:', error);
    }
  };

  // Check for Admin privileges 
  // Should match the logic in Dashboard.js
  const role = user?.role?.toLowerCase();
  const isSystemAdmin = role === 'admin' || user?.email === 'admin123@gmail.com';

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
            <p className="text-gray-600">Manage resource bookings</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            + New Booking
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : (
          <>
            {/* Desktop View - Table */}
            <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Resource</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time Slot</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    {isSystemAdmin && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.resource_details?.name || 'Unknown Resource'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {booking.user_details?.name || 'Unknown User'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.user_details?.role === 'STAFF' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                          {booking.user_details?.role || 'STUDENT'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{booking.booking_date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{booking.time_slot}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={booking.status} />
                      </td>
                      {isSystemAdmin && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {booking.status === 'PENDING' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleApprove(booking.id)}
                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleReject(booking.id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View - Cards */}
            <div className="md:hidden space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-lg shadow p-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <h3 className="font-bold text-gray-900">{booking.resource_details?.name}</h3>
                    <StatusBadge status={booking.status} />
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">User:</span>
                      <span className="font-medium text-gray-800">{booking.user_details?.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Role:</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${booking.user_details?.role === 'STAFF' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                        {booking.user_details?.role || 'STUDENT'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="text-gray-800">{booking.booking_date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time:</span>
                      <span className="text-gray-800">{booking.time_slot}</span>
                    </div>
                  </div>

                  {isSystemAdmin && booking.status === 'PENDING' && (
                    <div className="flex space-x-2 pt-2">
                      <button
                        onClick={() => handleApprove(booking.id)}
                        className="flex-1 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(booking.id)}
                        className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchBookings}
      />
    </Layout>
  );
};

export default Bookings;
