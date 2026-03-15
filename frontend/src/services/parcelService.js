import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}/api`;

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const parcelService = {
  // Get all parcels (Admin)
  getAllParcels: async () => {
    const response = await axios.get(`${API_BASE_URL}/parcels`, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Track parcel by tracking number (Public)
  trackParcel: async (trackNo) => {
    const response = await axios.get(`${API_BASE_URL}/parcels/track/${trackNo}`);
    return response.data;
  },

  // Create new parcel (Admin)
  createParcel: async (parcelData) => {
    const response = await axios.post(`${API_BASE_URL}/parcels`, parcelData, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Update parcel (Admin)
  updateParcel: async (id, parcelData) => {
    const response = await axios.put(`${API_BASE_URL}/parcels/${id}`, parcelData, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Delete parcel (Admin)
  deleteParcel: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/parcels/${id}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Get dashboard statistics (Admin)
  getDashboardStats: async () => {
    const response = await axios.get(`${API_BASE_URL}/parcels/stats/dashboard`, {
      headers: getAuthHeaders()
    });
    return response.data;
  }
};

export default parcelService;
