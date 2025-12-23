import axios from 'axios';

// Function to get the token from wherever you store it (e.g., localStorage)
const getAuthToken = (): string | null => {
  // Replace 'authToken' with the actual key you use to store the token
  return localStorage.getItem('authToken');
};

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api', // Your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Use an interceptor to automatically add the auth token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;