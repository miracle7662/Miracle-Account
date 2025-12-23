import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001/api'

// Login user with email (for SuperAdmin)
export const loginUserWithEmail = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed')
  }
}

// Login user with username (for Hotel Admin)
export const loginUserWithUsername = async (username: string, password: string, company?: string, year?: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      username,
      password,
      company,
      year
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Login failed')
  }
}

// Login user (backward compatibility)
export const loginUser = async (email: string, password: string) => {
  return loginUserWithEmail(email, password)
}

// Get current user info
export const getCurrentUser = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get user info')
  }
}

// Logout user (client-side only)
export const logoutUser = () => {
  localStorage.removeItem('WINDOW_AUTH_SESSION')
}

// Refresh JWT token
export const refreshToken = async (token: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to refresh token')
  }
}

// Get companies
export const getCompanies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/companies`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to get companies')
  }
}
