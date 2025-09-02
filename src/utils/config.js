/**
 * API Configuration
 */

// Base API URL - can be configured for different environments
export const API_BASE_URL = import.meta.env.PROD 
  ? 'https://jamesthewwebapi.onrender.com'
  : '';

// API endpoints
export const API_ENDPOINTS = {
  SERVER_STATUS: '/api/server-status',
  LOGIN: '/api/login',
  REGISTER: '/api/register',
  // Add other endpoints as needed
};

// Server status configuration
export const SERVER_STATUS_CONFIG = {
  CHECK_TIMEOUT: 10000, // 10 seconds timeout
  RETRY_INTERVAL: 5000, // 5 seconds retry interval
  MAX_RETRIES: 3
};
