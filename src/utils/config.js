/**
 * API Configuration
 */

// Base API URL - can be configured for different environments
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://jamesthewwebapi.onrender.com'
  : '';

// Helper function to create API URLs
export const createApiUrl = (endpoint) => {
  if (import.meta.env.PROD) {
    return `${API_BASE_URL}${endpoint}`;
  }
  return endpoint; // Use relative URL in development (handled by Vite proxy)
};

// API endpoints - use helper function for consistent URL creation
export const API_ENDPOINTS = {
  SERVER_STATUS: createApiUrl('/api/server-status'),
  LOGIN: createApiUrl('/api/login'),
  REGISTER: createApiUrl('/api/register'),
  // Add other endpoints as needed
};

// Server status configuration
export const SERVER_STATUS_CONFIG = {
  CHECK_TIMEOUT: import.meta.env.PROD ? 180000 : 10000, // 3 minutes in prod, 10 seconds in dev
  RETRY_INTERVAL: 5000, // 5 seconds retry interval
  MAX_RETRIES: import.meta.env.PROD ? 5 : 3, // More retries in production
  WAKE_UP_TIMEOUT: 300000, // 5 minutes total for wake-up process
  RETRY_DELAY_INCREMENT: 2000 // Increase delay between retries
};
