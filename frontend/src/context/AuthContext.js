import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, logoutUser, updateUserProfile, getCurrentUser, setUserPassword } from "../services/authService";
import { appConfig } from "../config/appConfig";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Initialize from localStorage and optionally validate with backend
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userStr = localStorage.getItem("currentUser");
    if (token && userStr) {
      try {
        const parsed = JSON.parse(userStr);
        setCurrentUser(parsed);
      } catch (_) {}
    }
    (async () => {
      try {
        const me = await getCurrentUser();
        if (me) {
          setCurrentUser(me);
          localStorage.setItem("currentUser", JSON.stringify(me));
        }
      } catch (_) {}
      setLoading(false);
    })();
  }, []);

  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success && result.user && result.token) {
      localStorage.setItem("authToken", result.token);
      localStorage.setItem("currentUser", JSON.stringify(result.user));
      setCurrentUser(result.user);
    }
    return result;
  };

  const register = async (email, password, username) => {
    const result = await registerUser(email, password, username);
    if (result.success && result.user && result.token) {
      localStorage.setItem("authToken", result.token);
      localStorage.setItem("currentUser", JSON.stringify(result.user));
      setCurrentUser(result.user);
    }
    return result;
  };

  const loginWithGoogleCallback = ({ token, user }) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentUser(user);
  };

  const logout = async () => {
    await logoutUser();
    // Clear all localStorage data
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    localStorage.clear(); // Clear any other cached data
    
    // Reset all state
    setCurrentUser(null);
    setUserData(null);
    
    // Redirect to home page
    window.location.href = '/';
  };

  const setPassword = async (password) => {
    try {
      const result = await setUserPassword(password);
      if (result.success) {
        // Mark hasPassword true in local state
        setCurrentUser((prev) => {
          const updated = { ...prev, hasPassword: true };
          localStorage.setItem('currentUser', JSON.stringify(updated));
          return updated;
        });
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (profileData) => {
    if (!currentUser) return { success: false, error: "No user logged in" };
    setUpdating(true);
    try {
      const body = {};
      if (typeof profileData?.username === 'string' && profileData.username.trim()) {
        body.displayName = profileData.username.trim();
      } else if (typeof profileData?.displayName === 'string' && profileData.displayName.trim()) {
        body.displayName = profileData.displayName.trim();
      }
      const result = await updateUserProfile(currentUser.uid, body);
      if (result.success && result.user) {
        setCurrentUser(result.user);
        localStorage.setItem("currentUser", JSON.stringify(result.user));
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setUpdating(false);
    }
  };

  const value = {
    currentUser,
    userData,
    loading,
    updating,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'admin' || currentUser?.email === appConfig.adminEmails,
    login,
    register,
    logout,
    updateProfile,
    loginWithGoogleCallback,
    setPassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
