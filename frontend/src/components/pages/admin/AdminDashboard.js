import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  MdLocalShipping, MdPeople, MdAttachMoney, MdPendingActions,
  MdCheckCircle, MdCancel, MdTrendingUp
} from 'react-icons/md';
import bookingService from '../../../services/bookingService';
import './AdminDashboard.scss';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await bookingService.getStats();
      setStats(response.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="admin-dashboard">
        <div className="error-container">
          <p>Failed to load dashboard data</p>
          <button onClick={fetchDashboardStats}>Retry</button>
        </div>
      </div>
    );
  }

  // Colors for charts
  const COLORS = ['#ff6b35', '#ff8555', '#ffa575', '#ffc095'];
  const STATUS_COLORS = {
    pending: '#ffa500',      // Orange
    confirmed: '#2196f3',    // Blue
    'in-transit': '#9c27b0', // Purple
    delivered: '#4caf50',    // Green
    cancelled: '#f44336'     // Red
  };

  // Prepare status distribution data for pie chart
  const statusData = Object.entries(stats.statusDistribution || {}).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1).replace('-', ' '),
    value: value,
    color: STATUS_COLORS[key] || '#999'
  }));

  return (
    <div className="admin-dashboard">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-header"
      >
        <h1>Admin Dashboard</h1>
        <p className="subtitle">Overview of your transportation business</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="stat-card primary"
        >
          <div className="stat-icon">
            <MdLocalShipping />
          </div>
          <div className="stat-content">
            <h3>Total Bookings</h3>
            <p className="stat-number">{stats.totalBookings || 0}</p>
            <span className="stat-label">All time</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="stat-card success"
        >
          <div className="stat-icon">
            <MdPeople />
          </div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers || 0}</p>
            <span className="stat-label">Registered</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="stat-card warning"
        >
          <div className="stat-icon">
            <MdAttachMoney />
          </div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-number">₹{stats.totalRevenue?.toLocaleString() || 0}</p>
            <span className="stat-label">Estimated</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="stat-card info"
        >
          <div className="stat-icon">
            <MdPendingActions />
          </div>
          <div className="stat-content">
            <h3>Active Bookings</h3>
            <p className="stat-number">{stats.activeBookings || 0}</p>
            <span className="stat-label">In progress</span>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        {/* Bookings Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="chart-card full-width"
        >
          <div className="chart-header">
            <h3><MdTrendingUp /> Bookings Trend (Last 7 Days)</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stats.bookingsTrend || []}>
              <defs>
                <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ff6b35" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.7)' }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.7)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10, 10, 10, 0.95)',
                  border: '1px solid rgba(255, 107, 53, 0.5)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Area
                type="monotone"
                dataKey="bookings"
                stroke="#ff6b35"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorBookings)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Status Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="chart-card"
        >
          <div className="chart-header">
            <h3><MdCheckCircle /> Status Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={false}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10, 10, 10, 0.95)',
                  border: '1px solid rgba(255, 107, 53, 0.5)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                itemStyle={{ color: '#fff' }}
                formatter={(value, name) => [`${value} bookings`, name]}
              />
              <Legend
                verticalAlign="bottom"
                height={50}
                iconType="circle"
                formatter={(value, entry) => {
                  const item = statusData.find(d => d.name === value);
                  return `${value}: ${item?.value || 0}`;
                }}
                wrapperStyle={{
                  paddingTop: '20px',
                  fontSize: '13px',
                  color: '#fff'
                }}
                iconSize={10}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Service Types Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="chart-card"
        >
          <div className="chart-header">
            <h3><MdLocalShipping /> Service Types</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.serviceTypes || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name"
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.7)' }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.5)"
                tick={{ fill: 'rgba(255,255,255,0.7)' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(10, 10, 10, 0.95)',
                  border: '1px solid rgba(255, 107, 53, 0.5)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="value" fill="#ff6b35" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="recent-bookings"
      >
        <h3>Recent Bookings</h3>
        <div className="bookings-list">
          {stats.recentBookings && stats.recentBookings.length > 0 ? (
            stats.recentBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="booking-item"
              >
                <div className="booking-info">
                  <span className="tracking-number">{booking.trackingNumber}</span>
                  <span className="customer-name">{booking.customerName}</span>
                </div>
                <div className="booking-meta">
                  <span className={`status-badge ${booking.status}`}>
                    {booking.status}
                  </span>
                  <span className="service-type">{booking.serviceType}</span>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="no-data">No recent bookings</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
