import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await api.bookings.getMyBookings();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await api.bookings.updateStatus(bookingId, newStatus);
      // Refresh bookings
      fetchBookings();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update booking status.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not scheduled';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-200 border-solid rounded-full border-t-purple-500 animate-spin"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl px-4 py-10 mx-auto text-center">
        <div className="p-6 text-red-700 bg-red-100 border border-red-400 rounded-lg">
          <h2 className="mb-2 text-xl font-semibold">Error Loading Bookings</h2>
          <p>{error}</p>
          <button
            onClick={fetchBookings}
            className="px-4 py-2 mt-4 font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          My Bookings
        </h1>
        <p className="text-gray-600 mt-2">
          {user?.user_type === 'customer' 
            ? 'Your service requests and their status' 
            : 'Services booked with you'}
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-500 mb-2">No bookings yet</h3>
          <p className="text-gray-400 mb-6">
            {user?.user_type === 'customer' 
              ? 'Book your first service to see it here.' 
              : 'Customers will book your services and appear here.'}
          </p>
          {user?.user_type === 'customer' && (
            <button
              onClick={() => window.location.href = '/FindServices'}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Find Services
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {user?.user_type === 'customer' 
                      ? `${booking.provider_name} - ${booking.service_type || booking.provider_service}`
                      : `${booking.customer_name} - ${booking.service_type}`
                    }
                  </h3>
                  <p className="text-gray-600">
                    📍 {user?.user_type === 'customer' 
                      ? booking.provider_location 
                      : booking.customer_location
                    }
                  </p>
                </div>
                
                <div className="flex items-center gap-3 mt-3 md:mt-0">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Contact:</p>
                  <p className="text-gray-800">
                    📞 {user?.user_type === 'customer' 
                      ? booking.provider_phone 
                      : booking.customer_phone
                    }
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Scheduled:</p>
                  <p className="text-gray-800">
                    🗓️ {formatDate(booking.scheduled_date)}
                  </p>
                </div>
              </div>

              {booking.description && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Description:</p>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded">{booking.description}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Booked on {new Date(booking.created_at).toLocaleDateString()}
                </p>
                
                {/* Status Update Buttons (for providers) */}
                {user?.user_type === 'provider' && booking.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(booking.id, 'accepted')}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(booking.id, 'cancelled')}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                    >
                      Decline
                    </button>
                  </div>
                )}

                {user?.user_type === 'provider' && booking.status === 'accepted' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(booking.id, 'in_progress')}
                      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                    >
                      Start Work
                    </button>
                  </div>
                )}

                {user?.user_type === 'provider' && booking.status === 'in_progress' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(booking.id, 'completed')}
                      className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                    >
                      Complete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
