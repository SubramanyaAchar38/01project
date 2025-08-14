const API_BASE = 'http://localhost:3001';

// Helper function to get auth token
const getAuthToken = () => localStorage.getItem('token');

// Helper function to make authenticated requests
const authFetch = (url, options = {}) => {
  const token = getAuthToken();
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
};

// Unified request helper used by `api` below
const apiRequest = async (path, { requiresAuth = false, ...options } = {}) => {
  const url = path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  let fetchFn = fetch;
  let finalOptions = { ...options, headers };
  if (requiresAuth) {
    // Use authFetch to inject bearer token
    return authFetch(url, finalOptions).then(async (res) => {
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Request failed');
      return data;
    });
  }
  const res = await fetchFn(url, finalOptions);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
};

export const api = {
  auth: {
    register: (userData) => apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),
    
    login: (email, password) => apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
  },
  
  providers: {
    getAll: (service_type) => {
      const url = service_type 
        ? `/api/providers?service_type=${encodeURIComponent(service_type)}`
        : '/api/providers';
      return apiRequest(url).then(response => response.providers || []);
    },
    
    createProfile: (profileData) => apiRequest('/api/provider-profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
      requiresAuth: true
    }),
    
    getProfile: () => apiRequest('/api/provider-profile', {
      requiresAuth: true
    })
  },
  
  bookings: {
    create: (bookingData) => apiRequest('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
      requiresAuth: true
    }),
    
    getMyBookings: () => apiRequest('/api/my-bookings', {
      requiresAuth: true
    }),
    
    updateStatus: (bookingId, status) => apiRequest(`/api/bookings/${bookingId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      requiresAuth: true
    })
  },
  
  user: {
    getProfile: () => apiRequest('/api/user/profile', {
      requiresAuth: true
    }),
    
    updateProfile: (profileData) => apiRequest('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
      requiresAuth: true
    })
  }
};

// Auth utilities used by AuthContext
export const authAPI = {
  getCurrentUser: () => {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  login: async (email, password) => {
    const res = await api.auth.login(email, password);
    if (res?.token && res?.user) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
    }
    return res;
  },
  register: async (userData) => {
    // Do not auto-persist on register; components/context can decide to login next
    return api.auth.register(userData);
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const providersAPI = {
  getAll: async (serviceType = '') => {
    const url = serviceType 
      ? `${API_BASE}/api/providers?service_type=${encodeURIComponent(serviceType)}`
      : `${API_BASE}/api/providers`;
    
    const response = await fetch(url);
    return response.json();
  },

  createProfile: async (profileData) => {
  const response = await authFetch(`${API_BASE}/api/provider-profile`, {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
    return response.json();
  },
};

export const bookingsAPI = {
  create: async (bookingData) => {
  const response = await authFetch(`${API_BASE}/api/bookings`, {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
    return response.json();
  },

  getMyBookings: async () => {
  const response = await authFetch(`${API_BASE}/api/my-bookings`);
    return response.json();
  },
};
