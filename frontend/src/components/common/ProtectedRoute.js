import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  // AdminLogin stores under 'token'/'user'
  // AuthContext (regular + Google login) stores under 'authToken'/'currentUser'
  // Resolve whichever is present
  const token = localStorage.getItem('token') || localStorage.getItem('authToken');
  const userStr = localStorage.getItem('user') || localStorage.getItem('currentUser');

  if (!token || !userStr) {
    return <Navigate to="/" replace />;
  }

  let user;
  try {
    user = JSON.parse(userStr);
  } catch (_) {
    return <Navigate to="/" replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
