import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBox, FaTruck, FaCheckCircle, FaClock, 
  FaPlus, FaEdit, FaTrash, FaUsers, FaSearch, FaSignOutAlt 
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import parcelService from '../../services/parcelService';
import './AdminDashboard.scss';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [parcels, setParcels] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    cusName: '',
    destination: '',
    email: '',
    phoneCust: '',
    phoneReceiver: '',
    weight: '',
    qty: '1',
    charge: '',
    status: 'pending',
    delivered: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [parcelsData, statsData] = await Promise.all([
        parcelService.getAllParcels(),
        parcelService.getDashboardStats()
      ]);
      setParcels(parcelsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddParcel = async (e) => {
    e.preventDefault();
    try {
      await parcelService.createParcel(formData);
      alert('Parcel created successfully!');
      setShowAddModal(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error creating parcel:', error);
      alert('Error creating parcel');
    }
  };

  const handleEditParcel = async (e) => {
    e.preventDefault();
    try {
      await parcelService.updateParcel(selectedParcel._id, formData);
      alert('Parcel updated successfully!');
      setShowEditModal(false);
      resetForm();
      fetchData();
    } catch (error) {
      console.error('Error updating parcel:', error);
      alert('Error updating parcel');
    }
  };

  const handleDeleteParcel = async (id) => {
    if (window.confirm('Are you sure you want to delete this parcel?')) {
      try {
        await parcelService.deleteParcel(id);
        alert('Parcel deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting parcel:', error);
        alert('Error deleting parcel');
      }
    }
  };

  const openEditModal = (parcel) => {
    setSelectedParcel(parcel);
    setFormData({
      cusName: parcel.cusName,
      destination: parcel.destination,
      email: parcel.email,
      phoneCust: parcel.phoneCust,
      phoneReceiver: parcel.phoneReceiver,
      weight: parcel.weight,
      qty: parcel.qty,
      charge: parcel.charge,
      status: parcel.status,
      delivered: parcel.delivered
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      cusName: '',
      destination: '',
      email: '',
      phoneCust: '',
      phoneReceiver: '',
      weight: '',
      qty: '1',
      charge: '',
      status: 'pending',
      delivered: false
    });
    setSelectedParcel(null);
  };

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      await logout();
      navigate('/');
    }
  };

  const filteredParcels = parcels.filter(parcel =>
    parcel.cusName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parcel.trackNo.toString().includes(searchTerm) ||
    parcel.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <motion.div 
      className={`stat-card ${color}`}
      whileHover={{ scale: 1.05, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="stat-icon">
        <Icon />
      </div>
      <div className="stat-info">
        <h3>{value || 0}</h3>
        <p>{title}</p>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div 
          className="loader"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FaTruck />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin <span>Dashboard</span></h1>
        <div className="header-actions">
          <motion.button 
            className="add-parcel-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus /> Add New Parcel
          </motion.button>
          <motion.button 
            className="logout-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
          >
            <FaSignOutAlt /> Logout
          </motion.button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard 
          icon={FaBox} 
          title="Total Parcels" 
          value={stats.totalParcels} 
          color="blue" 
        />
        <StatCard 
          icon={FaTruck} 
          title="In Transit" 
          value={stats.inTransit} 
          color="orange" 
        />
        <StatCard 
          icon={FaCheckCircle} 
          title="Delivered" 
          value={stats.deliveredParcels} 
          color="green" 
        />
        <StatCard 
          icon={FaClock} 
          title="Pending" 
          value={stats.pendingParcels} 
          color="red" 
        />
      </div>

      <motion.div 
        className="parcels-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="section-header">
          <h2>All Parcels</h2>
          <div className="search-box">
            <FaSearch />
            <input 
              type="text"
              placeholder="Search by name, tracking, or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="parcels-table-container">
          <table className="parcels-table">
            <thead>
              <tr>
                <th>Tracking #</th>
                <th>Customer</th>
                <th>Destination</th>
                <th>Phone</th>
                <th>Weight</th>
                <th>Qty</th>
                <th>Charge</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredParcels.map((parcel, index) => (
                  <motion.tr 
                    key={parcel._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="tracking-no">{parcel.trackNo}</td>
                    <td>{parcel.cusName}</td>
                    <td>{parcel.destination}</td>
                    <td>{parcel.phoneCust}</td>
                    <td>{parcel.weight} kg</td>
                    <td>{parcel.qty}</td>
                    <td>${parcel.charge}</td>
                    <td>
                      <span className={`status-badge ${parcel.status}`}>
                        {parcel.status}
                      </span>
                    </td>
                    <td className="actions">
                      <motion.button 
                        className="btn-icon edit"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openEditModal(parcel)}
                      >
                        <FaEdit />
                      </motion.button>
                      <motion.button 
                        className="btn-icon delete"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteParcel(parcel._id)}
                      >
                        <FaTrash />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Parcel Modal */}
      <AnimatePresence>
        {showAddModal && (
          <ParcelModal
            title="Add New Parcel"
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleAddParcel}
            onClose={() => {
              setShowAddModal(false);
              resetForm();
            }}
          />
        )}
      </AnimatePresence>

      {/* Edit Parcel Modal */}
      <AnimatePresence>
        {showEditModal && (
          <ParcelModal
            title="Edit Parcel"
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleEditParcel}
            onClose={() => {
              setShowEditModal(false);
              resetForm();
            }}
            isEdit={true}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ParcelModal = ({ title, formData, onChange, onSubmit, onClose, isEdit }) => (
  <motion.div 
    className="modal-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div 
      className="modal-content"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
    >
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Customer Name *</label>
            <input 
              type="text" 
              name="cusName" 
              value={formData.cusName} 
              onChange={onChange}
              placeholder="John Doe"
              required 
            />
          </div>
          <div className="form-group">
            <label>Destination *</label>
            <input 
              type="text" 
              name="destination" 
              value={formData.destination} 
              onChange={onChange}
              placeholder="New York, USA"
              required 
            />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={onChange}
              placeholder="john@example.com"
              required 
            />
          </div>
          <div className="form-group">
            <label>Customer Phone *</label>
            <input 
              type="tel" 
              name="phoneCust" 
              value={formData.phoneCust} 
              onChange={onChange}
              placeholder="+1 234 567 8900"
              required 
            />
          </div>
          <div className="form-group">
            <label>Receiver Phone *</label>
            <input 
              type="tel" 
              name="phoneReceiver" 
              value={formData.phoneReceiver} 
              onChange={onChange}
              placeholder="+1 987 654 3210"
              required 
            />
          </div>
          <div className="form-group">
            <label>Weight (kg) *</label>
            <input 
              type="number" 
              name="weight" 
              value={formData.weight} 
              onChange={onChange}
              step="0.1"
              placeholder="5.5"
              required 
            />
          </div>
          <div className="form-group">
            <label>Quantity *</label>
            <input 
              type="number" 
              name="qty" 
              value={formData.qty} 
              onChange={onChange}
              min="1"
              placeholder="1"
              required 
            />
          </div>
          <div className="form-group">
            <label>Charge ($) *</label>
            <input 
              type="number" 
              name="charge" 
              value={formData.charge} 
              onChange={onChange}
              step="0.01"
              placeholder="99.99"
              required 
            />
          </div>
          {isEdit && (
            <>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={onChange}>
                  <option value="pending">Pending</option>
                  <option value="in-transit">In Transit</option>
                  <option value="out-for-delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
              <div className="form-group checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    name="delivered" 
                    checked={formData.delivered} 
                    onChange={onChange}
                  />
                  Mark as Delivered
                </label>
              </div>
            </>
          )}
        </div>
        <div className="modal-actions">
          <motion.button 
            type="button" 
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
          >
            Cancel
          </motion.button>
          <motion.button 
            type="submit" 
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isEdit ? 'Update' : 'Create'} Parcel
          </motion.button>
        </div>
      </form>
    </motion.div>
  </motion.div>
);

export default AdminDashboard;
