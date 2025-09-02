/**
 * Server Status API utilities
 */
import { API_ENDPOINTS, SERVER_STATUS_CONFIG } from './config';

/**
 * Check server status by calling the /api/server-status endpoint
 * @param {number} timeoutOverride - Override the default timeout
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const checkServerStatus = async (timeoutOverride = null) => {
  try {
    const controller = new AbortController();
    const timeout = timeoutOverride || SERVER_STATUS_CONFIG.CHECK_TIMEOUT;
    const timeoutId = setTimeout(() => controller.abort(), timeout);

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
 * Check server status with automatic retries for wake-up scenarios
 * @param {Function} onProgress - Callback for progress updates
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export const checkServerStatusWithWakeup = async (onProgress = null) => {
  const maxRetries = SERVER_STATUS_CONFIG.MAX_RETRIES;
  const baseDelay = SERVER_STATUS_CONFIG.RETRY_INTERVAL;
  const delayIncrement = SERVER_STATUS_CONFIG.RETRY_DELAY_INCREMENT;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    if (onProgress) {
      onProgress({
        attempt,
        maxRetries,
        message: attempt === 1 
          ? 'Checking server status...' 
          : `Waking up server... (${attempt}/${maxRetries})`
      });
    }

    // Use longer timeout for first attempt in production to handle initial wake-up
    const timeout = import.meta.env.PROD && attempt === 1 
      ? SERVER_STATUS_CONFIG.WAKE_UP_TIMEOUT 
      : SERVER_STATUS_CONFIG.CHECK_TIMEOUT;

    const result = await checkServerStatus(timeout);
    
    if (result.success) {
      return result;
    }

    // If this is the last attempt, return the error
    if (attempt === maxRetries) {
      return result;
    }

    // Wait before next retry with progressive delay
    const delay = baseDelay + (delayIncrement * (attempt - 1));
    if (onProgress) {
      onProgress({
        attempt,
        maxRetries,
        message: `Server not responding. Retrying in ${delay/1000} seconds...`
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, delay));
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
