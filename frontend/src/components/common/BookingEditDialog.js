import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './BookingEditDialog.scss';

const BookingEditDialog = ({ booking, onClose, onSubmit, submitting }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    pickupAddress: '',
    pickupCity: '',
    pickupDate: '',
    deliveryAddress: '',
    deliveryCity: '',
    packageType: 'document',
    weight: '',
    description: '',
    serviceType: 'standard',
    status: 'pending',
    estimatedCost: '',
    actualCost: '',
    paymentStatus: 'pending',
    notes: '',
    adminNotes: ''
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        customerName: booking.customerName || '',
        email: booking.email || '',
        phone: booking.phone || '',
        pickupAddress: booking.pickupAddress || '',
        pickupCity: booking.pickupCity || '',
        pickupDate: booking.pickupDate ? new Date(booking.pickupDate).toISOString().split('T')[0] : '',
        deliveryAddress: booking.deliveryAddress || '',
        deliveryCity: booking.deliveryCity || '',
        packageType: booking.packageType || 'document',
        weight: booking.weight || '',
        description: booking.description || '',
        serviceType: booking.serviceType || 'standard',
        status: booking.status || 'pending',
        estimatedCost: booking.estimatedCost || '',
        actualCost: booking.actualCost || '',
        paymentStatus: booking.paymentStatus || 'pending',
        notes: booking.notes || '',
        adminNotes: booking.adminNotes || ''
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="booking-edit-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialog-header">
          <h2>Edit Booking</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="booking-form">
          {/* Customer Information */}
          <div className="form-section">
            <h3>Customer Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Customer Name *</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Pickup Details */}
          <div className="form-section">
            <h3>Pickup Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Pickup Address *</label>
                <input
                  type="text"
                  name="pickupAddress"
                  value={formData.pickupAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Pickup City *</label>
                <input
                  type="text"
                  name="pickupCity"
                  value={formData.pickupCity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Pickup Date *</label>
                <input
                  type="date"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="form-section">
            <h3>Delivery Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Delivery Address *</label>
                <input
                  type="text"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Delivery City *</label>
                <input
                  type="text"
                  name="deliveryCity"
                  value={formData.deliveryCity}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Package Details */}
          <div className="form-section">
            <h3>Package Details</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Package Type *</label>
                <select
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                  required
                >
                  <option value="document">Document</option>
                  <option value="parcel">Parcel</option>
                  <option value="freight">Freight</option>
                  <option value="express">Express</option>
                </select>
              </div>
              <div className="form-group">
                <label>Weight (kg) *</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="form-section">
            <h3>Booking Status & Service</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Service Type *</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="standard">Standard</option>
                  <option value="express">Express</option>
                  <option value="overnight">Overnight</option>
                  <option value="international">International</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="picked-up">Picked Up</option>
                  <option value="in-transit">In Transit</option>
                  <option value="out-for-delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cost & Payment */}
          <div className="form-section">
            <h3>Cost & Payment</h3>
            <div className="form-row">
              <div className="form-group">
                <label>Estimated Cost</label>
                <input
                  type="number"
                  name="estimatedCost"
                  value={formData.estimatedCost}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label>Actual Cost</label>
                <input
                  type="number"
                  name="actualCost"
                  value={formData.actualCost}
                  onChange={handleChange}
                  step="0.01"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Payment Status</label>
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="form-section">
            <h3>Notes</h3>
            <div className="form-row">
              <div className="form-group full-width">
                <label>Customer Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="2"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group full-width">
                <label>Admin Notes</label>
                <textarea
                  name="adminNotes"
                  value={formData.adminNotes}
                  onChange={handleChange}
                  rows="2"
                />
              </div>
            </div>
          </div>

          <div className="dialog-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="btn-spinner"></span>
                  Updating...
                </>
              ) : (
                'Update Booking'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default BookingEditDialog;
