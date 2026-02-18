import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { resourcesAPI, bookingsAPI } from '../services/api'; // Import bookingsAPI
import { useAuth } from '../context/AuthContext';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resourcesRes, bookingsRes] = await Promise.all([
        resourcesAPI.getAll(),
        bookingsAPI.getAll()
      ]);
      setResources(resourcesRes.data);
      setUserBookings(bookingsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getResourceStatus = (resource) => {
    // 1. Check Global Operational Status (Backend field: 'status')
    if (resource.status === 'UNAVAILABLE') {
      return { label: 'Maintenance', color: 'bg-red-100 text-red-800' };
    }

    // 2. Check User's Personal Booking Status
    // Filter bookings for this resource made by the current user
    const myBooking = userBookings.find(b =>
      b.resource === resource.id &&
      b.user === user?.id &&
      (b.status === 'PENDING' || b.status === 'APPROVED')
    );

    if (myBooking) {
      if (myBooking.status === 'APPROVED') {
        return { label: 'Booked', color: 'bg-indigo-100 text-indigo-800' };
      }
      return { label: 'Pending Approval', color: 'bg-yellow-100 text-yellow-800' };
    }

    // 3. Check Global Booking Status (For Staff/Admin who can see all bookings)
    // If anyone has an APPROVED booking, mark as "Booked" or "Occupied"
    // Since bookings are time-slotted, this is a general indicator that "Activity Exists"
    const hasApproved = userBookings.find(b => b.resource === resource.id && b.status === 'APPROVED');
    if (hasApproved) {
      return { label: 'Booked', color: 'bg-indigo-100 text-indigo-800' };
    }

    const hasPending = userBookings.find(b => b.resource === resource.id && b.status === 'PENDING');
    if (hasPending) {
      return { label: 'Requested', color: 'bg-orange-100 text-orange-800' };
    }

    // 4. Default Available
    return { label: 'Available', color: 'bg-green-100 text-green-800' };
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Resources</h1>
            <p className="text-gray-600">Browse available campus resources</p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{resource.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                  </div>
                  {(() => {
                    const status = getResourceStatus(resource);
                    return (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                        {status.label}
                      </span>
                    );
                  })()}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Type:</span>
                    <span className="font-medium text-gray-700">{resource.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-medium text-gray-700">{resource.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Resources;
