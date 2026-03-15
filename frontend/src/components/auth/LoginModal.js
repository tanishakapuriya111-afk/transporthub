import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth as useAuthContext } from "../../context/AuthContext";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import "../../styles/AuthModals.scss";

const LoginModal = ({ onClose, onSwitchToRegister, onSwitchToForgotPassword }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
    setLoading(true);
    setError("");

    const result = await login(formData.email, formData.password);

    if (result.success) {
      console.log('✅ Login successful, user:', result.user);
      console.log('✅ User role:', result.user?.role);
      
      // Check role and redirect immediately for admin
      if (result.user?.role === 'admin') {
        console.log('🔥 ADMIN DETECTED!');
        
        // Ensure localStorage has the data (backup)
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        
        console.log('📦 localStorage token:', localStorage.getItem('authToken'));
        console.log('📦 localStorage user:', localStorage.getItem('currentUser'));
        
        // Try multiple redirect methods
        console.log('🚀 Attempting redirect to /admin...');
        
        // Method 1: Replace current history entry
        window.location.replace('/admin');
        
        // Fallback method 2 (in case replace doesn't work)
        setTimeout(() => {
          window.location.href = '/admin';
        }, 100);
        
        return; // Stop execution
      }
      
      // For regular users, close modal and stay
      console.log('👤 Regular user, closing modal');
      onClose();
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-btn" onClick={onClose}>
          ×
        </span>
        <h2 className="modal-title">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="form-group" style={{ position: "relative" }}>
            <input
              type="email"
              id="loginEmail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="loginEmail">Email</label>
            <i className="icon-email"><MdEmail /></i>
          </div>

          {/* Password Field */}
          <div className="form-group" style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="loginPassword"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label htmlFor="loginPassword">Password</label>
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
          </div>

          {/* Forgot Password */}
          <button type="button" className="forgot-password" onClick={onSwitchToForgotPassword}>
            Forgot Password?
          </button>
          {/* </div> */}
          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Login Button */}
          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="btn-spinner"></span>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {/* Register Link */}
          <p className="need-account">
            Don't have an account?{" "}
            <button type="button" className="link-button" onClick={onSwitchToRegister}>
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
