import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// ✅ --- THIS IS THE FIX ---
// This line MUST be here, before the AuthProvider function.
// It creates the context that the provider will use.
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const isAuthenticated = !!token;

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token).user;
        setUser(decodedUser);
        axios.defaults.headers.common['x-auth-token'] = token;
      } catch (error) {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common['x-auth-token'];
  };

  const value = { user, token, isAuthenticated, login, logout };

  // This line USES the context. It needs the line above to exist first.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};