import React, { useState } from "react";
import { useAuth as useAuthContext } from "../../context/AuthContext";
import { MdEmail, MdLock, MdPerson, MdVisibility, MdVisibilityOff } from "react-icons/md";
import "../../styles/AuthModals.scss";

const tooltipStyles = {
  position: "absolute",
  right: "-220px",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  color: "#fff",
  padding: "8px 12px",
  borderRadius: "6px",
  fontSize: "14px",
  whiteSpace: "nowrap",
  zIndex: 1000,
  backdropFilter: "blur(5px)",
};

const RegistrationModal = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { register } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowCredentials(true);

    // Wait for 3 seconds before proceeding with registration
    setTimeout(async () => {
      setShowCredentials(false);
      setLoading(true);
      setError("");

      const result = await register(formData.email, formData.password, formData.username);

      if (result.success) {
        onClose();
      } else {
        setError(result.error);
      }

      setLoading(false);
    }, 3000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-btn" onClick={onClose}>
          ×
        </span>
        <h2 className="modal-title">Registration</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="form-group" style={{ position: "relative" }}>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="username">Username</label>
            <i className="icon-user"><MdPerson /></i>
            {showCredentials && <div style={tooltipStyles}>Username: {formData.username}</div>}
          </div>

          {/* Email Field */}
          <div className="form-group" style={{ position: "relative" }}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="email">Email</label>
            <i className="icon-email"><MdEmail /></i>
            {showCredentials && <div style={tooltipStyles}>Email: {formData.email}</div>}
          </div>

          {/* Password Field */}
          <div className="form-group" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="password">Password</label>
            <i className="icon-lock"><MdLock /></i>
            <button 
              type="button" 
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                fontSize: '1.3rem',
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#ff6b35'}
              onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.7)'}
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
            {showCredentials && <div style={tooltipStyles}>Password: {formData.password}</div>}
          </div>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Register Button */}
          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="btn-spinner"></span>
                Creating Account...
              </>
            ) : (
              "Register"
            )}
          </button>

          {/* Already Registered Link */}
          <p className="already-registered">
            Already have an account?{" "}
            <button type="button" className="link-button" onClick={onSwitchToLogin}>
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationModal;
