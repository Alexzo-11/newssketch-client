import axios from 'axios';
import { getCookie } from 'cookies-next';

// Use localhost for development
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 30000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    try {
      const token = getCookie('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    console.log(`🚀 API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('⏰ API Timeout:', error.config.url);
      return Promise.reject(new Error('Request timed out. Please try again.'));
    }
    
    if (error.response) {
      console.error(`❌ API Error ${error.response.status}:`, {
        url: error.config.url,
        data: error.response.data,
      });
    } else if (error.request) {
      console.error('❌ No response from server:', {
        url: error.config?.url,
        message: error.message,
      });
    } else {
      console.error('❌ API Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;
