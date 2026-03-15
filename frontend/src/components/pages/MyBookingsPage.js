import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBox, FaClock, FaCheckCircle, FaTruck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import bookingService from '../../services/bookingService';
import './MyBookingsPage.scss';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingService.getAllBookings();
      setBookings(response.bookings);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': '#f59e0b',
      'confirmed': '#3b82f6',
      'picked-up': '#8b5cf6',
      'in-transit': '#06b6d4',
      'out-for-delivery': '#10b981',
      'delivered': '#10b981',
      'cancelled': '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusIcon = (status) => {
    if (status === 'delivered') return <FaCheckCircle />;
    if (status === 'in-transit' || status === 'out-for-delivery') return <FaTruck />;
    if (status === 'pending') return <FaClock />;
    return <FaBox />;
  };

  if (loading) {
    return (
      <div className="my-bookings-page">
        <div className="loading">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="my-bookings-page">
      <div className="bookings-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <h1>My Bookings</h1>
          <p>Track and manage your transportation bookings</p>
        </motion.div>

        {bookings.length === 0 ? (
          <div className="empty-state">
            <FaBox />
            <h3>No bookings yet</h3>
            <p>Create your first booking to get started</p>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                className="booking-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="booking-header">
                  <div className="tracking-number">
                    <span className="label">Tracking No.</span>
                    <span className="number">{booking.trackingNumber}</span>
                  </div>
                  <div 
                    className="status-badge"
                    style={{ background: `${getStatusColor(booking.status)}20`, color: getStatusColor(booking.status) }}
                  >
                    {getStatusIcon(booking.status)}
                    <span>{booking.status}</span>
                  </div>
                </div>

                <div className="booking-details">
                  <div className="detail-row">
                    <span className="label">From:</span>
                    <span className="value">{booking.pickupCity}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">To:</span>
                    <span className="value">{booking.deliveryCity}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Pickup Date:</span>
                    <span className="value">{new Date(booking.pickupDate).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Package:</span>
                    <span className="value">{booking.packageType} ({booking.weight}kg)</span>
                  </div>
                </div>

                <div className="booking-footer">
                  <span className="date">Created: {new Date(booking.createdAt).toLocaleDateString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;
