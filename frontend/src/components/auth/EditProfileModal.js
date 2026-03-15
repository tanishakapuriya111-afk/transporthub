import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { MdCheckCircle } from "react-icons/md";

const EditProfileModal = ({ isOpen, onClose, onSuccess }) => {
  const { userData, updateProfile, updating } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    role: "user",
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    if (isOpen && userData) {
      setFormData({
        username: userData.username || "",
        role: userData.role || "user",
      });
      setErrors({});
      setSubmitStatus("");
    }
  }, [isOpen, userData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.trim().length < 2) {
      newErrors.username = "Username must be at least 2 characters long";
    } else if (formData.username.trim().length > 50) {
      newErrors.username = "Username must be less than 50 characters";
    }

    if (!formData.role) {
      newErrors.role = "Account type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitStatus("updating");

    try {
      const result = await updateProfile({
        username: formData.username.trim(),
        role: formData.role,
      });

      if (result.success) {
        setSubmitStatus("success");
        setTimeout(() => {
          onSuccess && onSuccess();
          onClose();
        }, 1500);
      } else {
        setSubmitStatus("error");
        setErrors({ submit: result.error });
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrors({ submit: "An unexpected error occurred. Please try again." });
    }
  };

  const handleClose = () => {
    if (!updating) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content profile-edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit Profile</h2>
          <button className="modal-close-btn" onClick={handleClose} disabled={updating}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="profile-edit-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username *
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`form-input ${errors.username ? "error" : ""}`}
              placeholder="Enter your username"
              disabled={updating}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Account Type *
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={`form-select ${errors.role ? "error" : ""}`}
              disabled={updating}
            >
              <option value="user">Standard User</option>
              <option value="premium">Premium User</option>
              <option value="business">Business Account</option>
              <option value="enterprise">Enterprise Account</option>
              <option value="admin">Administrator</option>
            </select>
            {errors.role && <span className="error-message">{errors.role}</span>}
          </div>

          {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

          {submitStatus === "success" && <div className="success-message"><MdCheckCircle style={{verticalAlign: 'middle', marginRight: '8px'}} /> Profile updated successfully!</div>}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={handleClose} disabled={updating}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={updating}>
              {updating ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
