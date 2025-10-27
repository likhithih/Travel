import React from 'react';
import Sidebar from '../components/Sidebar';
import {
  FaUsers,
  FaClipboardList,
  FaMapMarkedAlt,
  FaDollarSign,
  FaChartLine,
  FaCalendarAlt
} from 'react-icons/fa';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: FaUsers,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Total Bookings',
      value: '567',
      icon: FaClipboardList,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'Destinations',
      value: '89',
      icon: FaMapMarkedAlt,
      color: 'bg-purple-500',
      change: '+5%'
    },
    {
      title: 'Revenue',
      value: '₹45,678',
      icon: FaDollarSign,
      color: 'bg-yellow-500',
      change: '+15%'
    }
  ];

  const recentBookings = [
    { id: 1, user: 'John Doe', destination: 'Paris', date: '2024-01-15', status: 'Confirmed' },
    { id: 2, user: 'Jane Smith', destination: 'Tokyo', date: '2024-01-14', status: 'Pending' },
    { id: 3, user: 'Mike Johnson', destination: 'New York', date: '2024-01-13', status: 'Confirmed' },
    { id: 4, user: 'Sarah Wilson', destination: 'London', date: '2024-01-12', status: 'Cancelled' }
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your travel platform.</p>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">{stat.change} from last month</p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <Icon className="text-white" size={20} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts and Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Bookings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <FaCalendarAlt className="mr-2 text-gray-500" />
                  Recent Bookings
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{booking.user}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{booking.destination}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 dark:text-gray-400">{booking.date}</p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          booking.status === 'Confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <FaChartLine className="mr-2 text-gray-500" />
                  Quick Actions
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-4">
                  <button className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                    <FaUsers className="text-blue-600 dark:text-blue-400 mr-3" size={20} />
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">Manage Users</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">View and edit user accounts</p>
                    </div>
                  </button>
                  <button className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors">
                    <FaClipboardList className="text-green-600 dark:text-green-400 mr-3" size={20} />
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">View Bookings</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Check recent reservations</p>
                    </div>
                  </button>
                  <button className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors">
                    <FaMapMarkedAlt className="text-purple-600 dark:text-purple-400 mr-3" size={20} />
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-white">Add Destination</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Create new travel destinations</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
