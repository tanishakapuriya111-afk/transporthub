// Real API-backed auth service using fetch
// Routes expected on backend:
// POST   /api/auth/register        -> { user, token }
// POST   /api/auth/login           -> { user, token }
// POST   /api/auth/reset           -> { success }
// GET    /api/users/me             -> { user }
// PUT    /api/users/me             -> { user }
// DELETE /api/users/me             -> { success }

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const jsonHeaders = () => ({
  "Content-Type": "application/json",
});

const authHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const registerUser = async (email, password, username) => {
  try {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { ...jsonHeaders() },
      body: JSON.stringify({ email, password, username }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, error: data.message || "Registration failed" };
    return { success: true, user: data.user, token: data.token };
  } catch (error) {
    return { success: false, error: "Network error. Please try again." };
  }
};

export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { ...jsonHeaders() },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, error: data.message || "Login failed" };
    return { success: true, user: data.user, token: data.token };
  } catch (error) {
    return { success: false, error: "Network error. Please try again." };
  }
};

export const logoutUser = async () => {
  // Optional backend call; nothing needed here
  return { success: true };
};

export const resetPassword = async (email) => {
  try {
    const res = await fetch(`${API_BASE}/api/auth/reset`, {
      method: "POST",
      headers: { ...jsonHeaders() },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { success: false, error: data.message || "Reset failed" };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: "Network error. Please try again." };
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/users/me`, {
      method: "GET",
      headers: { ...authHeaders() },
    });
    if (!res.ok) return null;
    const data = await res.json().catch(() => ({}));
    return data.user || null;
  } catch (error) {
    return null;
  }
};

export const getUserData = async (uid) => {
  try {
    const me = await getCurrentUser();
    if (!me) return { success: false, error: "User not found" };
    return { success: true, user: me };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateUserProfile = async (uid, profileData) => {
  try {
    const res = await fetch(`${API_BASE}/api/users/me`, {
      method: "PUT",
      headers: { ...jsonHeaders(), ...authHeaders() },
      body: JSON.stringify(profileData),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, error: data.message || "Update failed" };
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const resetPasswordWithToken = async (token, password) => {
  try {
    const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
      method: 'POST',
      headers: { ...jsonHeaders() },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, error: data.message || 'Reset failed' };
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Network error. Please try again.' };
  }
};

export const setUserPassword = async (password) => {
  try {
    const res = await fetch(`${API_BASE}/api/users/me/password`, {
      method: 'PATCH',
      headers: { ...jsonHeaders(), ...authHeaders() },
      body: JSON.stringify({ password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, error: data.message || 'Failed to set password' };
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Network error. Please try again.' };
  }
};

export const deleteUserAccount = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/users/me`, {
      method: "DELETE",
      headers: { ...authHeaders() },
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { success: false, error: data.message || "Delete failed" };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: "Network error. Please try again." };
  }
};

