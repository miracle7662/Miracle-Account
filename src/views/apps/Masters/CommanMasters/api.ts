import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // You can set your base URL here
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  config => {
    // Assuming you store the token in localStorage
    const token = localStorage.getItem('authToken'); // IMPORTANT: Use the correct key for your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;