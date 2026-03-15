import React, { useState, useEffect } from 'react';
import { FiSearch, FiTrash2, FiMail, FiUser, FiShield, FiEdit, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import userService from '../../services/userService';
import './AdminUsersPage.scss';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userFormData, setUserFormData] = useState({
    email: '',
    displayName: '',
    role: 'user',
    password: '',
    phone: '',
    city: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      alert('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId, username) => {
    if (window.confirm(`Are you sure you want to delete user "${username}"?`)) {
      try {
        await userService.deleteUser(userId);
        alert(`User "${username}" deleted successfully`);
        fetchUsers();
      } catch (error) {
        console.error('Failed to delete user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const handleOpenAddDialog = () => {
    setEditingUser(null);
    setUserFormData({
      email: '',
      displayName: '',
      role: 'user',
      password: '',
      phone: '',
      city: ''
    });
    setFormErrors({});
    setShowUserDialog(true);
  };

  const handleOpenEditDialog = (user) => {
    setEditingUser(user);
    setUserFormData({
      email: user.email || '',
      displayName: user.displayName || user.username || '',
      role: user.role || 'user',
      password: '',
      phone: user.phone || '',
      city: user.city || ''
    });
    setFormErrors({});
    setShowUserDialog(true);
  };

  const handleCloseDialog = () => {
    setShowUserDialog(false);
    setEditingUser(null);
    setUserFormData({
      email: '',
      displayName: '',
      role: 'user',
      password: '',
      phone: '',
      city: ''
    });
    setFormErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUserFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!userFormData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userFormData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!editingUser && !userFormData.password) {
      errors.password = 'Password is required for new users';
    }
    if (!userFormData.displayName) {
      errors.displayName = 'Name is required';
    }
    return errors;
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      const userData = {
        email: userFormData.email,
        displayName: userFormData.displayName,
        role: userFormData.role,
        phone: userFormData.phone,
        city: userFormData.city
      };
      if (userFormData.password) {
        userData.password = userFormData.password;
      }

      if (editingUser) {
        await userService.updateUser(editingUser._id || editingUser.id, userData);
        alert('User updated successfully');
      } else {
        await userService.createUser(userData);
        alert('User created successfully');
      }
      handleCloseDialog();
      fetchUsers();
    } catch (error) {
      console.error('Failed to save user:', error);
      alert(error.response?.data?.message || 'Failed to save user');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-users-page">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="admin-users-page">
      <div className="page-container">
        <div className="page-header">
          <div className="header-left">
            <h1><FiUser /> User Management</h1>
            <button className="btn-add-user" onClick={handleOpenAddDialog}>
              <FiPlus /> Add New User
            </button>
          </div>
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search users by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="username">
                      <FiUser style={{ marginRight: '8px' }} />
                      {user.username}
                    </td>
                    <td>
                      <FiMail style={{ marginRight: '8px', color: 'rgba(255, 255, 255, 0.5)' }} />
                      {user.email}
                    </td>
                    <td>
                      <span className={`role-badge ${user.role}`}>
                        {user.role === 'admin' && <FiShield style={{ marginRight: '6px' }} />}
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleOpenEditDialog(user)}
                        >
                          <FiEdit /> Edit
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(user._id, user.username)}
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="stats-summary">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-number">{users.length}</p>
          </div>
          <div className="stat-card">
            <h3>Admins</h3>
            <p className="stat-number orange">{users.filter(u => u.role === 'admin').length}</p>
          </div>
          <div className="stat-card">
            <h3>Regular Users</h3>
            <p className="stat-number">{users.filter(u => u.role === 'user').length}</p>
          </div>
        </div>

        {/* User Add/Edit Dialog */}
        {showUserDialog && (
          <div className="modal-overlay" onClick={handleCloseDialog}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="user-dialog"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="dialog-header">
                <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
                <button className="close-btn" onClick={handleCloseDialog}>×</button>
              </div>
              <form onSubmit={handleSubmitUser} className="user-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="displayName">Name *</label>
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      value={userFormData.displayName}
                      onChange={handleFormChange}
                      placeholder="Enter full name"
                    />
                    {formErrors.displayName && (
                      <span className="error-text">{formErrors.displayName}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={userFormData.email}
                      onChange={handleFormChange}
                      placeholder="Enter email"
                    />
                    {formErrors.email && (
                      <span className="error-text">{formErrors.email}</span>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="password">Password {!editingUser && '*'}</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={userFormData.password}
                      onChange={handleFormChange}
                      placeholder={editingUser ? 'Leave blank to keep current' : 'Enter password'}
                    />
                    {formErrors.password && (
                      <span className="error-text">{formErrors.password}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select
                      id="role"
                      name="role"
                      value={userFormData.role}
                      onChange={handleFormChange}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={userFormData.phone}
                      onChange={handleFormChange}
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={userFormData.city}
                      onChange={handleFormChange}
                      placeholder="Enter city"
                    />
                  </div>
                </div>
                <div className="dialog-actions">
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={handleCloseDialog}
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
                        {editingUser ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      editingUser ? 'Update User' : 'Create User'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsersPage;
