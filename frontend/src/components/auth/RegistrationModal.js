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

          {/* Divider */}
          <div className="auth-divider">
            <span>or</span>
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            className="google-btn"
            onClick={() => {
              window.location.href = 'http://localhost:5000/api/auth/google';
            }}
          >
            <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
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
