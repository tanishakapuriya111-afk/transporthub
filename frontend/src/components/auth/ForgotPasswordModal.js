import React, { useState } from "react";
import { resetPassword } from "../../services/authService";
import { MdEmail, MdCheckCircle, MdSchedule, MdRefresh } from "react-icons/md";
import "../../styles/AuthModals.scss";

const ForgotPasswordModal = ({ onClose, onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setError("");

    const result = await resetPassword(email);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const handleBackToLogin = () => {
    onBackToLogin();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-btn" onClick={onClose}>
          ×
        </span>

        {!isSubmitted ? (
          <>
            <h2 className="modal-title">Reset Password</h2>
            <p className="modal-subtitle">Enter your email address and we'll send you a link to reset your password.</p>

            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="form-group">
                <input
                  type="email"
                  id="resetEmail"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  required
                />
                <label htmlFor="resetEmail">Email Address</label>
                <i className="icon-email"><MdEmail /></i>
              </div>

              {/* Error Message */}
              {error && <div className="error-message">{error}</div>}

              {/* Submit Button */}
              <button type="submit" className="reset-password-btn" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              {/* Back to Login */}
              <p className="back-to-login">
                Remember your password?{" "}
                <button type="button" className="link-button" onClick={handleBackToLogin}>
                  Back to Login
                </button>
              </p>
            </form>
          </>
        ) : (
          <>
            <h2 className="modal-title">Check Your Email</h2>
            <div className="success-message">
              <div className="success-icon"><MdCheckCircle /></div>
              <div className="success-text">
                <strong>Check your email!</strong>
                <p className="success-subtext">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <div className="email-instructions">
                  <p><MdEmail style={{verticalAlign: 'middle', marginRight: '8px'}} /> Check your inbox and spam folder</p>
                  <p><MdSchedule style={{verticalAlign: 'middle', marginRight: '8px'}} /> The link expires in 1 hour</p>
                  <p><MdRefresh style={{verticalAlign: 'middle', marginRight: '8px'}} /> Click the link to reset your password</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="success-actions">
              <button className="resend-btn" onClick={handleSubmit}>
                Resend Email
              </button>
              <button className="back-btn" onClick={handleBackToLogin}>
                Back to Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
