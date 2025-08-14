const API_BASE = 'http://localhost:3001/api';

// API utility functions for the frontend
export const api = {
  // Authentication
  register: async (userData) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  getProfile: async (token) => {
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  // Providers
  createProviderProfile: async (token, profileData) => {
    const response = await fetch(`${API_BASE}/providers/profile`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profileData)
    });
    return response.json();
  },

  getProviders: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE}/providers?${params}`);
    return response.json();
  },

  getProvider: async (id) => {
    const response = await fetch(`${API_BASE}/providers/${id}`);
    return response.json();
  },

  // Bookings
  createBooking: async (token, bookingData) => {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });
    return response.json();
  },

  getBookings: async (token) => {
    const response = await fetch(`${API_BASE}/bookings`, {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },

  updateBookingStatus: async (token, bookingId, status) => {
    const response = await fetch(`${API_BASE}/bookings/${bookingId}/status`, {
      method: 'PATCH',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
    return response.json();
  },

  // Services
  getServiceTypes: async () => {
    const response = await fetch(`${API_BASE}/services/types`);
    return response.json();
  },

  // Health check
  healthCheck: async () => {
    const response = await fetch(`${API_BASE}/health`);
    return response.json();
  }
};

export default api;
