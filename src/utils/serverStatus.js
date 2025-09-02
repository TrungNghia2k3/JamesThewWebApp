/**
 * Server Status API utilities
 */
import { API_ENDPOINTS, SERVER_STATUS_CONFIG } from './config';

/**
 * Check server status by calling the /api/server-status endpoint
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const checkServerStatus = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SERVER_STATUS_CONFIG.CHECK_TIMEOUT);

    const response = await fetch(API_ENDPOINTS.SERVER_STATUS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validate the expected response format
    if (
      data.success === true &&
      data.status === 200 &&
      data.message === "Server is running" &&
      data.data === "OK"
    ) {
      return {
        success: true,
        data: data
      };
    } else {
      throw new Error('Invalid server response format');
    }
  } catch (error) {
    console.error('Server status check failed:', error);
    return {
      success: false,
      error: error.name === 'AbortError' ? 'Request timeout' : error.message
    };
  }
};

/**
 * Expected server status response format
 */
export const EXPECTED_SERVER_RESPONSE = {
  success: true,
  status: 200,
  message: "Server is running",
  data: "OK"
};
