/**
 * Authentication utilities for reverse quantity mode
 */

export interface ReverseQtyAuthConfig {
  username: string;
  password: string;
  requireAuth: boolean;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: {
    name: string;
    role: string;
  };
}

// Default configuration - in production, this should come from environment variables
const DEFAULT_AUTH_CONFIG: ReverseQtyAuthConfig = {
  username: 'admin',
  password: 'password',
  requireAuth: true
};

// Get authentication configuration from environment or use defaults
export const getAuthConfig = (): ReverseQtyAuthConfig => {
  return {
    username: process.env.REACT_APP_REVERSE_QTY_USERNAME || DEFAULT_AUTH_CONFIG.username,
    password: process.env.REACT_APP_REVERSE_QTY_PASSWORD || DEFAULT_AUTH_CONFIG.password,
    requireAuth: process.env.REACT_APP_REVERSE_QTY_REQUIRE_AUTH !== 'false'
  };
};

// Validate user credentials for reverse quantity mode
export const validateReverseQtyCredentials = (
  username: string,
  password: string,
  user?: { name?: string; role_level?: string }
): AuthResult => {
  const config = getAuthConfig();

  // If authentication is disabled, allow access
  if (!config.requireAuth) {
    return {
      success: true,
      message: 'Authentication disabled',
      user: {
        name: user?.name || 'User',
        role: user?.role_level || 'user'
      }
    };
  }

  // Validate credentials
  if (username === config.username && password === config.password) {
    return {
      success: true,
      message: 'Authentication successful',
      user: {
        name: user?.name || 'Admin',
        role: user?.role_level || 'admin'
      }
    };
  }

  return {
    success: false,
    message: 'Invalid credentials'
  };
};

// Check if user has permission to use reverse quantity mode
export const hasReverseQtyPermission = (userRole?: string): boolean => {
  // Allow admin and manager roles, or if auth is disabled
  const config = getAuthConfig();
  if (!config.requireAuth) return true;

  const role = userRole?.toLowerCase();
  return role === 'admin' || role === 'manager';
};
