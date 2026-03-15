import React, { useState } from "react";
import { resetPassword } from "../../services/authService";
import { MdEmail, MdCheckCircle, MdLockReset } from "react-icons/md";
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
      setError(result.error || "Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close-btn" onClick={onClose}>×</span>

        {!isSubmitted ? (
          <>
            {/* Icon */}
            <div className="fp-icon-wrap">
              <MdLockReset className="fp-icon" />
            </div>

            <h2 className="modal-title">Forgot Password?</h2>
            <p className="fp-subtitle">
              Enter your email and we'll send you a reset link.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ position: "relative" }}>
                <input
                  type="email"
                  id="resetEmail"
                  name="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder=" "
                  required
                />
                <label htmlFor="resetEmail">Email Address</label>
                <i className="icon-email"><MdEmail /></i>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="login-submit-btn" disabled={loading}>
                {loading ? (
                  <><span className="btn-spinner" /> Sending...</>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <p className="need-account">
              Remember your password?{" "}
              <button type="button" className="link-button" onClick={onBackToLogin}>
                Back to Login
              </button>
            </p>
          </>
        ) : (
          <>
            {/* Success Icon */}
            <div className="fp-success-icon-wrap">
              <MdCheckCircle className="fp-success-icon" />
            </div>

            <h2 className="modal-title">Check Your Email</h2>
            <p className="fp-subtitle">
              We sent a reset link to
            </p>
            <p className="fp-email-highlight">{email}</p>

            <p className="fp-hint">Check your inbox and spam folder. The link expires in 1 hour.</p>

            <button className="login-submit-btn" onClick={onBackToLogin}>
              Back to Login
            </button>

            <p className="need-account">
              Didn't receive it?{" "}
              <button
                type="button"
                className="link-button"
                onClick={() => { setIsSubmitted(false); setEmail(""); }}
              >
                Try again
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
