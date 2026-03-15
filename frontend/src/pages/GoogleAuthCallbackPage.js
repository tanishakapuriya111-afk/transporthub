import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SetPasswordModal from '../components/auth/SetPasswordModal';

const GoogleAuthCallbackPage = () => {
  const navigate = useNavigate();
  const { loginWithGoogleCallback } = useAuth();
  const [status, setStatus] = useState('processing'); // 'processing' | 'set-password' | 'error'
  const [errorMsg, setErrorMsg] = useState('');
  const [pendingRedirect, setPendingRedirect] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get('data');
    const error = params.get('error');

    if (error) {
      setStatus('error');
      setErrorMsg('Google login failed. Please try again.');
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    if (!data) {
      setStatus('error');
      setErrorMsg('No authentication data received.');
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    try {
      const parsed = JSON.parse(decodeURIComponent(data));
      const { token, user, returnUrl } = parsed;

      if (!token || !user) {
        throw new Error('Incomplete auth data');
      }

      // Store in localStorage (same as normal login)
      loginWithGoogleCallback({ token, user });

      // Determine where to go after auth
      const destination = user.role === 'admin' ? '__admin__' : (returnUrl || '/');

      // If Google user hasn't set a password yet, prompt them first
      if (!user.hasPassword) {
        setPendingRedirect(destination);
        setStatus('set-password');
        return;
      }

      // Otherwise redirect immediately
      if (destination === '__admin__') {
        window.location.replace('/admin');
      } else {
        navigate(destination);
      }
    } catch (e) {
      setStatus('error');
      setErrorMsg('Failed to process authentication. Please try again.');
      setTimeout(() => navigate('/'), 3000);
    }
  }, [navigate, loginWithGoogleCallback]);

  const handlePasswordDone = useCallback(() => {
    if (pendingRedirect === '__admin__') {
      window.location.replace('/admin');
    } else {
      navigate(pendingRedirect || '/');
    }
  }, [navigate, pendingRedirect]);

  const handlePasswordSkip = useCallback(() => {
    handlePasswordDone();
  }, [handlePasswordDone]);

  if (status === 'set-password') {
    return <SetPasswordModal onDone={handlePasswordDone} onSkip={handlePasswordSkip} />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins, sans-serif',
        color: '#ffffff',
        gap: '1.5rem',
      }}
    >
      {status === 'processing' ? (
        <>
          {/* Spinner */}
          <div
            style={{
              width: '56px',
              height: '56px',
              border: '4px solid rgba(255, 107, 53, 0.2)',
              borderTop: '4px solid #ff6b35',
              borderRadius: '50%',
              animation: 'spin 0.9s linear infinite',
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)' }}>
            Signing you in with Google...
          </p>
        </>
      ) : (
        <>
          <span style={{ fontSize: '3rem' }}>⚠️</span>
          <p style={{ fontSize: '1.1rem', color: '#ff6b6b' }}>{errorMsg}</p>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
            Redirecting to home...
          </p>
        </>
      )}
    </div>
  );
};

export default GoogleAuthCallbackPage;
