import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import '../../styles/AuthModals.scss';

const SetPasswordModal = ({ onDone, onSkip }) => {
  const { setPassword } = useAuth();
  const [password, setPasswordValue] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    const result = await setPassword(password);
    setLoading(false);
    if (result.success) {
      onDone();
    } else {
      setError(result.error || 'Failed to set password.');
    }
  };

  const toggleStyle = {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.7)',
    cursor: 'pointer',
    fontSize: '1.3rem',
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">Set a Password</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          Add a password so you can also sign in with your email.
        </p>
        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="form-group" style={{ position: 'relative' }}>
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPasswordValue(e.target.value); setError(''); }}
              placeholder=" "
              required
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
            />
            <label>Confirm Password</label>
            <i className="icon-lock"><MdLock /></i>
            <button type="button" style={toggleStyle} onClick={() => setShowCf(!showCf)}>
              {showCf ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? <><span className="btn-spinner" /> Saving...</> : 'Set Password'}
          </button>

          <button
            type="button"
            onClick={onSkip}
            style={{
              width: '100%',
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.9rem',
              cursor: 'pointer',
              textDecoration: 'underline',
              fontFamily: 'Poppins, sans-serif',
              padding: '0.25rem 0',
            }}
          >
            Skip for now
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPasswordModal;
