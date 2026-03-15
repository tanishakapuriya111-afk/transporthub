import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MdLock, MdVisibility, MdVisibilityOff, MdCheckCircle, MdError } from 'react-icons/md';
import { resetPasswordWithToken } from '../services/authService';
import '../styles/AuthModals.scss';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // No token = invalid link
  useEffect(() => {
    if (!token) setError('Invalid or missing reset link.');
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }

    setLoading(true);
    const result = await resetPasswordWithToken(token, password);
    setLoading(false);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Something went wrong.');
    }
  };

  const toggleStyle = {
    position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
    background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)',
    cursor: 'pointer', fontSize: '1.3rem', display: 'flex', alignItems: 'center', padding: '0.5rem',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Poppins, sans-serif',
      padding: '1rem',
    }}>
      <div className="modal" style={{ position: 'relative', width: '100%', maxWidth: '440px' }}>

        {success ? (
          <>
            <div className="fp-success-icon-wrap">
              <MdCheckCircle className="fp-success-icon" />
            </div>
            <h2 className="modal-title">Password Reset!</h2>
            <p className="fp-subtitle">Your password has been updated successfully.</p>
            <button
              className="login-submit-btn"
              onClick={() => navigate('/')}
            >
              Go to Home
            </button>
          </>
        ) : (
          <>
            {/* Icon */}
            <div className="fp-icon-wrap">
              <MdLock className="fp-icon" />
            </div>

            <h2 className="modal-title">Set New Password</h2>
            <p className="fp-subtitle">Enter a new password for your account.</p>

            <form onSubmit={handleSubmit}>
              {/* New Password */}
              <div className="form-group" style={{ position: 'relative' }}>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  placeholder=" "
                  required
                  disabled={!token}
                />
                <label>New Password</label>
                <i className="icon-lock"><MdLock /></i>
                <button type="button" style={toggleStyle} onClick={() => setShowPw(!showPw)}>
                  {showPw ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="form-group" style={{ position: 'relative' }}>
                <input
                  type={showCf ? 'text' : 'password'}
                  value={confirm}
                  onChange={(e) => { setConfirm(e.target.value); setError(''); }}
                  placeholder=" "
                  required
                  disabled={!token}
                />
                <label>Confirm Password</label>
                <i className="icon-lock"><MdLock /></i>
                <button type="button" style={toggleStyle} onClick={() => setShowCf(!showCf)}>
                  {showCf ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>

              {error && (
                <div className="error-message" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MdError style={{ fontSize: '1.1rem', flexShrink: 0 }} />
                  {error}
                </div>
              )}

              <button type="submit" className="login-submit-btn" disabled={loading || !token}>
                {loading ? <><span className="btn-spinner" /> Saving...</> : 'Reset Password'}
              </button>
            </form>

            <p className="need-account">
              Remembered it?{' '}
              <button type="button" className="link-button" onClick={() => navigate('/')}>
                Back to Home
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
