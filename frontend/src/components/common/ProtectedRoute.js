import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  // Check both authentication systems
  // Admin authentication (from AdminLogin)
  const adminToken = localStorage.getItem('token');
  const adminUserStr = localStorage.getItem('user');
  
  // Regular user authentication (from AuthContext)
  const authToken = localStorage.getItem('authToken');
  const currentUserStr = localStorage.getItem('currentUser');

  console.log('🔒 ProtectedRoute check:', {
    requireAdmin,
    adminToken: !!adminToken,
    authToken: !!authToken,
    adminUserStr: !!adminUserStr,
    currentUserStr: !!currentUserStr
  });

  // If admin route is required
  if (requireAdmin) {
    console.log('🔐 Admin route - checking credentials...');
    
    // Check if admin is logged in
    if (!adminToken || !adminUserStr) {
      console.log('❌ No admin token/user - redirecting to home');
      // Redirect to home where user can open login modal
      return <Navigate to="/" replace />;
    }
    
    try {
      const user = JSON.parse(adminUserStr);
      console.log('👤 User parsed:', user);
      console.log('🎯 User role:', user.role);
      
      if (user.role !== 'admin') {
        console.log('❌ User is not admin - redirecting to home');
        return <Navigate to="/" replace />;
      }
      
      console.log('✅ Admin verified - allowing access');
    } catch (error) {
      console.error('❌ Failed to parse admin user data:', error);
      return <Navigate to="/" replace />;
    }
    
    return children;
  }

  // For regular user routes, check both authentication methods
  // (Regular user auth OR admin auth)
  const isAuthenticated = (authToken && currentUserStr) || (adminToken && adminUserStr);
  
  if (!isAuthenticated) {
    // Redirect to home - the login modal will open
    return <Navigate to="/" replace />;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;
