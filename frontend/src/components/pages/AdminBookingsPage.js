import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import bookingService from '../../services/bookingService';
import BookingEditDialog from '../common/BookingEditDialog';
import './AdminBookingsPage.scss';

const AdminBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      setUpdatingStatus(id);
      await bookingService.updateStatus(id, newStatus);
      toast.success('Status updated successfully');
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    try {
      setDeleting(true);
      await bookingService.deleteBooking(deleteConfirm);
      toast.success('Booking deleted successfully');
      setDeleteConfirm(null);
      fetchBookings();
    } catch (error) {
      toast.error('Failed to delete booking');
    } finally {
      setDeleting(false);
    }
  };

  const handleOpenEditDialog = (booking) => {
    setEditingBooking(booking);
    setShowEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setShowEditDialog(false);
    setEditingBooking(null);
  };

  const handleUpdateBooking = async (updatedData) => {
    if (!editingBooking) return;
    
    setSubmitting(true);
    try {
      await bookingService.updateBooking(editingBooking._id, updatedData);
      toast.success('Booking updated successfully');
      handleCloseEditDialog();
      fetchBookings();
    } catch (error) {
      toast.error('Failed to update booking');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredBookings = bookings.filter(b =>
    b.trackingNumber?.toLowerCase().includes(search.toLowerCase()) ||
    b.customerName?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="admin-bookings-page"><div className="loading">Loading...</div></div>;

  return (
    <div className="admin-bookings-page">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="page-header"
        >
          <h1>Manage Bookings</h1>
          <div className="search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by tracking number or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </motion.div>

        <div className="table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Tracking No</th>
                <th>Customer</th>
                <th>From → To</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="tracking-no">{booking.trackingNumber}</td>
                  <td>{booking.customerName}</td>
                  <td>{booking.pickupCity} → {booking.deliveryCity}</td>
                  <td>
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                      className="status-select"
                      disabled={updatingStatus === booking._id}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="picked-up">Picked Up</option>
                      <option value="in-transit">In Transit</option>
                      <option value="out-for-delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    {updatingStatus === booking._id && <span className="updating-text">Updating...</span>}
                  </td>
                  <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="actions">
                      <button className="btn-edit" onClick={() => handleOpenEditDialog(booking)}>
                        <FaEdit />
                      </button>
                      <button className="btn-delete" onClick={() => setDeleteConfirm(booking._id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Booking Edit Dialog */}
        {showEditDialog && editingBooking && (
          <BookingEditDialog
            booking={editingBooking}
            onClose={handleCloseEditDialog}
            onSubmit={handleUpdateBooking}
            submitting={submitting}
          />
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="modal-overlay" onClick={() => !deleting && setDeleteConfirm(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="delete-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Confirm Delete</h3>
              <p>Are you sure you want to delete this booking? This action cannot be undone.</p>
              <div className="modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setDeleteConfirm(null)}
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  className="confirm-delete-btn"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <span className="btn-spinner"></span>
                      Deleting...
                    </>
                  ) : (
                    'Delete Booking'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookingsPage;
