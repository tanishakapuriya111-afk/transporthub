// Real API-backed contact service using fetch
// Routes expected on backend:
// POST /api/contacts                -> { id, message }
// GET  /api/contacts                -> [ ... ] (admin only)
// PATCH /api/contacts/:id/read      -> { success }

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const jsonHeaders = () => ({
  "Content-Type": "application/json",
});

const authHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const submitContactForm = async (formData) => {
  try {
    const res = await fetch(`${API_BASE}/api/contacts`, {
      method: "POST",
      headers: { ...jsonHeaders() },
      body: JSON.stringify(formData),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, message: data.message || "Failed to send message" };
    return { success: true, id: data.id, message: data.message || "Message sent successfully!" };
  } catch (error) {
    return { success: false, message: "Network error. Please try again." };
  }
};

export const getAllContacts = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/contacts`, {
      method: "GET",
      headers: { ...authHeaders() },
    });
    const data = await res.json().catch(() => ([]));
    if (!res.ok) return [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
};

export const replyToContact = async (contactId, replyMessage) => {
  try {
    const res = await fetch(`${API_BASE}/api/contacts/${contactId}/reply`, {
      method: 'POST',
      headers: { ...jsonHeaders(), ...authHeaders() },
      body: JSON.stringify({ replyMessage }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { success: false, message: data.message || 'Failed to send reply' };
    return { success: true, contact: data.contact };
  } catch (error) {
    return { success: false, message: 'Network error. Please try again.' };
  }
};

export const markContactAsRead = async (contactId) => {
  try {
    const res = await fetch(`${API_BASE}/api/contacts/${contactId}/read`, {
      method: "PATCH",
      headers: { ...authHeaders() },
    });
    if (!res.ok) return { success: false };
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
