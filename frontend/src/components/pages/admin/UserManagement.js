import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { MdDelete, MdAdminPanelSettings, MdPerson, MdEmail, MdCalendarToday, MdEdit, MdAdd } from 'react-icons/md';
import userService from '../../../services/userService';
import { useAuth } from '../../../context/AuthContext';
import './UserManagement.scss';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const { currentUser } = useAuth();
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
      const response = await userService.getAllUsers();
      setUsers(response.users);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
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
        toast.success('User updated successfully');
      } else {
        await userService.createUser(userData);
        toast.success('User created successfully');
      }
      handleCloseDialog();
      fetchUsers();
    } catch (error) {
      console.error('Failed to save user:', error);
      toast.error(error.response?.data?.message || 'Failed to save user');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    if (currentUser?.email && users.find(u => u.id === userId)?.email === currentUser.email) {
      toast.error('You cannot change your own role');
      return;
    }

    try {
      await userService.updateUserRole(userId, newRole);
      toast.success('User role updated successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error(error.response?.data?.message || 'Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (currentUser?.email && users.find(u => u.id === userId)?.email === currentUser.email) {
      toast.error('You cannot delete your own account');
      setDeleteConfirm(null);
      return;
    }

    try {
      setDeleting(true);
      await userService.deleteUser(userId);
      toast.success('User deleted successfully');
      setDeleteConfirm(null);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(error.response?.data?.message || 'Failed to delete user');
      setDeleteConfirm(null);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="user-management">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-management">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="page-header"
      >
        <div className="header-top">
          <div>
            <h1>User Management</h1>
            <p className="subtitle">Manage all registered users</p>
          </div>
          <button className="add-user-btn" onClick={handleOpenAddDialog}>
            <MdAdd /> Add New User
          </button>
        </div>
        <div className="stats">
          <div className="stat-card">
            <span className="stat-number">{users.length}</span>
            <span className="stat-label">Total Users</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{users.filter(u => u.role === 'admin').length}</span>
            <span className="stat-label">Admins</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{users.filter(u => u.role === 'user').length}</span>
            <span className="stat-label">Regular Users</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="users-table-container"
      >
        {users.length === 0 ? (
          <div className="no-users">
            <MdPerson className="no-users-icon" />
            <p>No users found</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Display Name</th>
                  <th>Role</th>
                  <th>Registered</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={user.email === currentUser?.email ? 'current-user' : ''}
                  >
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">
                          {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                        </div>
                        <span className="user-id">#{user.id.slice(-6)}</span>
                      </div>
                    </td>
                    <td>
                      <div className="email-cell">
                        <MdEmail className="cell-icon" />
                        {user.email}
                      </div>
                    </td>
                    <td>
                      <div className="name-cell">
                        <MdPerson className="cell-icon" />
                        {user.displayName || 'Not set'}
                      </div>
                    </td>
                    <td>
                      <select
                        className={`role-select ${user.role}`}
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        disabled={user.email === currentUser?.email}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td>
                      <div className="date-cell">
                        <MdCalendarToday className="cell-icon" />
                        {formatDate(user.createdAt)}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {user.email === currentUser?.email ? (
                          <span className="current-user-badge">You</span>
                        ) : (
                          <>
                            <button
                              className="edit-btn"
                              onClick={() => handleOpenEditDialog(user)}
                              title="Edit user"
                            >
                              <MdEdit />
                            </button>
                            <button
                              className="delete-btn"
                              onClick={() => setDeleteConfirm(user.id)}
                              title="Delete user"
                            >
                              <MdDelete />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

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
                    {...(!userFormData.displayName ? { placeholder: 'Enter full name' } : {})}
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
                    {...(!userFormData.email ? { placeholder: 'Enter email' } : {})}
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
                    {...(!userFormData.password ? {
                      placeholder: editingUser ? 'Leave blank to keep current' : 'Enter password'
                    } : {})}
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
                    {...(!userFormData.phone ? { placeholder: 'Enter phone number' } : {})}
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
                    {...(!userFormData.city ? { placeholder: 'Enter city' } : {})}
                  />
                </div>
              </div>
              <div className="dialog-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCloseDialog}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="submit-btn"
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
            <p>Are you sure you want to delete this user? This action cannot be undone.</p>
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
                onClick={() => handleDeleteUser(deleteConfirm)}
                disabled={deleting}
              >
                {deleting ? (
                  <>
                    <span className="btn-spinner"></span>
                    Deleting...
                  </>
                ) : (
                  'Delete User'
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
