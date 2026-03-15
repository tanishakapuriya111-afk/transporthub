import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Create axios instance with auth
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const bookingService = {
  // Create new booking (User)
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  // Get all bookings (Admin gets all, User gets own)
  getAllBookings: async () => {
    const response = await api.get('/bookings');
    return response.data;
  },

  // Get single booking by ID
  getBookingById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  // Track booking by tracking number (Public)
  trackBooking: async (trackingNumber) => {
    const response = await axios.get(`${API_URL}/bookings/track/${trackingNumber}`);
    return response.data;
  },

  // Update booking (Admin only)
  updateBooking: async (id, bookingData) => {
    const response = await api.put(`/bookings/${id}`, bookingData);
    return response.data;
  },

  // Update booking status (Admin only)
  updateStatus: async (id, status) => {
    const response = await api.patch(`/bookings/${id}/status`, { status });
    return response.data;
  },

  // Delete booking (Admin only)
  deleteBooking: async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },

  // Get booking statistics (Admin only)
  getStats: async () => {
    const response = await api.get('/bookings/stats/dashboard');
    return response.data;
  }
};

export default bookingService;
