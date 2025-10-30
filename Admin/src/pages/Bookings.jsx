import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import {
  FaSearch,
  FaTrash,
  FaEye,
  FaFilter,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaDollarSign,
  FaSpinner,
  FaChevronLeft,
  FaChevronRight,
  FaIdCard,
  FaUser,
  FaPlane,
  FaCreditCard,
  FaCheckCircle,
  FaTimes
} from 'react-icons/fa';

const Bookings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [totalBookings, setTotalBookings] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState('');
  const [onConfirmAction, setOnConfirmAction] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/admin/bookings?limit=100000`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setBookings(response.data.bookings || []);
        setTotalBookings(response.data.bookings?.length || 0);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });



  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleDeleteBooking = (bookingId) => {
    setConfirmMessage('Are you sure you want to delete this booking? This action cannot be undone.');
    setOnConfirmAction(() => async () => {
      try {
        const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
        await axios.delete(`${import.meta.env.VITE_BACKEND_BASEURL}/admin/bookings/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookings(bookings.filter(booking => booking.id !== bookingId));
        setSuccessMessage('Booking deleted successfully.');
        setShowSuccessModal(true);
        setShowConfirmModal(false);
      } catch (err) {
        console.error('Error deleting booking:', err);
        setErrorMessage('Failed to delete booking. Please try again.');
        setShowErrorModal(true);
        setShowConfirmModal(false);
      }
    });
    setShowConfirmModal(true);
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    setUpdatingStatus(bookingId);
    try {
      const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_BACKEND_BASEURL}/admin/bookings/${bookingId}/status`, {
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update local state
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
      setSuccessMessage('Booking status updated successfully.');
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Error updating booking status:', err);
      setErrorMessage('Failed to update booking status. Please try again.');
      setShowErrorModal(true);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'refunded': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Booking Management</h1>
                <p className="text-gray-600 dark:text-gray-400">Manage travel bookings and reservations</p>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Revenue: <span className="font-semibold text-green-600">₹{bookings.reduce((total, booking) => total + booking.totalAmount, 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredBookings.length} of {totalBookings} bookings
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <main className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <FaSpinner className="animate-spin text-4xl text-blue-500" />
              <span className="ml-2 text-gray-600 dark:text-gray-400">Loading bookings...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-red-600 dark:text-red-400">{error}</div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Booking</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Destination</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Travel Date</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredBookings.map((booking, index) => (
                      <tr key={booking.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">#{booking.id}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                              <FaCalendarAlt className="mr-1" size={12} />
                              {booking.bookingDate}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{booking.user}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <FaUsers className="mr-1" size={12} />
                            {booking.travelers} traveler{booking.travelers > 1 ? 's' : ''}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="text-gray-400 mr-2" size={14} />
                            <span className="text-sm text-gray-900 dark:text-white">{booking.destination}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {booking.travelDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <div className="flex flex-col items-center space-y-1">
                              <select
                                value={booking.status}
                                onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                                disabled={updatingStatus === booking.id}
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border-0 ${getStatusColor(booking.status)}`}
                              >
                                <option value="pending">pending</option>
                                <option value="confirmed">confirmed</option>
                                <option value="cancelled">cancelled</option>
                              </select>
                              <span className="text-xs text-gray-500 dark:text-gray-400">Status</span>
                            </div>
                            <div className="h-8 w-px bg-gray-300 dark:bg-gray-600"></div>
                            <div className="flex flex-col items-center space-y-1">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentStatusColor('paid')}`}>
                                paid
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">Payment</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                            <span className="text-green-500 mr-1">₹</span>
                            {booking.totalAmount.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewBooking(booking)}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                              title="View Details"
                            >
                              <FaEye size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteBooking(booking.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              title="Delete Booking"
                            >
                              <FaTrash size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>


            </div>
          )}
        </main>
      </div>

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-blue-600 to-purple-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaIdCard className="text-white text-2xl" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Booking Details</h3>
                    <p className="text-blue-100 text-sm">Booking #{selectedBooking.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Booking Information Card */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 h-full">
                    <div className="flex items-center space-x-2 mb-6">
                      <FaUser className="text-blue-600 dark:text-blue-400" />
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Booking Information</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <FaIdCard className="text-gray-400 w-5 h-5 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Booking ID</p>
                          <p className="font-medium text-gray-900 dark:text-white truncate">#{selectedBooking.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaUser className="text-gray-400 w-5 h-5 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Customer</p>
                          <p className="font-medium text-gray-900 dark:text-white truncate">{selectedBooking.user}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaPlane className="text-gray-400 w-5 h-5 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Package</p>
                          <p className="font-medium text-gray-900 dark:text-white truncate">{selectedBooking.packageName}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaMapMarkerAlt className="text-gray-400 w-5 h-5 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Destination</p>
                          <p className="font-medium text-gray-900 dark:text-white truncate">{selectedBooking.destination}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaUsers className="text-gray-400 w-5 h-5 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Travelers</p>
                          <p className="font-medium text-gray-900 dark:text-white">{selectedBooking.travelers} traveler{selectedBooking.travelers > 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaCalendarAlt className="text-gray-400 w-5 h-5 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Travel Date</p>
                          <p className="font-medium text-gray-900 dark:text-white">{selectedBooking.travelDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FaCalendarAlt className="text-gray-400 w-5 h-5 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Booking Date</p>
                          <p className="font-medium text-gray-900 dark:text-white">{selectedBooking.bookingDate}</p>
                        </div>
                      </div>
                    </div>
                    {selectedBooking.specialRequests && (
                      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Special Requests</p>
                        <p className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-600 p-3 rounded-lg text-sm leading-relaxed">{selectedBooking.specialRequests}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status & Payment Cards */}
                <div className="space-y-6">
                  {/* Booking Status */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FaCheckCircle className="text-green-600 dark:text-green-400" />
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Booking Status</h4>
                    </div>
                    <div className="flex items-center justify-center mb-4">
                      <span className={`px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(selectedBooking.status)}`}>
                        {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status updated</p>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedBooking.bookingDate}</p>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FaCreditCard className="text-blue-600 dark:text-blue-400" />
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Payment Details</h4>
                    </div>
                    <div className="text-center space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Amount</p>
                        <p className="text-3xl font-bold text-green-600 dark:text-green-400">₹{selectedBooking.totalAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Payment Status</p>
                        <span className={`px-4 py-2 text-sm font-semibold rounded-full ${getPaymentStatusColor('paid')}`}>
                          Paid
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-1 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Confirm Action</h3>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{confirmMessage}</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={onConfirmAction}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-red-600 dark:text-red-400">Error</h3>
              <button
                onClick={() => setShowErrorModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{errorMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-green-600 dark:text-green-400">Success</h3>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{successMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
