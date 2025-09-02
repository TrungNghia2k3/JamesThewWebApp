import { useState, useEffect } from 'react';
import { checkServerStatus } from '../utils/serverStatus';

/**
 * Custom hook for checking server status
 * @param {Object} options - Configuration options
 * @param {boolean} options.autoCheck - Whether to automatically check on mount (default: true)
 * @param {number} options.retryInterval - Retry interval in milliseconds for failed checks
 * @returns {Object} - Server status state and actions
 */
export const useServerStatus = ({ autoCheck = true, retryInterval = null } = {}) => {
  const [status, setStatus] = useState('idle'); // 'idle', 'checking', 'running', 'error'
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const checkStatus = async () => {
    setStatus('checking');
    setError(null);

    const result = await checkServerStatus();

    if (result.success) {
      setStatus('running');
      setData(result.data);
      setError(null);
    } else {
      setStatus('error');
      setError(result.error);
      setData(null);
    }

    return result;
  };

  useEffect(() => {
    if (autoCheck) {
      checkStatus();
    }
  }, [autoCheck]);

  useEffect(() => {
    let intervalId;

    if (retryInterval && status === 'error') {
      intervalId = setInterval(() => {
        checkStatus();
      }, retryInterval);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [status, retryInterval]);

  return {
    status,
    error,
    data,
    checkStatus,
    isChecking: status === 'checking',
    isRunning: status === 'running',
    hasError: status === 'error'
  };
};
