import { useState, useEffect, useCallback } from 'react';
import { checkServerStatusWithWakeup } from '../utils/serverStatus';

/**
 * Custom hook for checking server status
 * @param {Object} options - Configuration options
 * @param {boolean} options.autoCheck - Whether to automatically check on mount (default: true)
 * @param {number} options.retryInterval - Retry interval in milliseconds for failed checks
 * @param {boolean} options.useWakeup - Whether to use wake-up retry logic (default: true)
 * @returns {Object} - Server status state and actions
 */
export const useServerStatus = ({ 
  autoCheck = true, 
  retryInterval = null, 
  useWakeup = true 
} = {}) => {
  const [status, setStatus] = useState('idle'); // 'idle', 'checking', 'running', 'error'
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [progressInfo, setProgressInfo] = useState(null);

  const checkStatus = useCallback(async () => {
    setStatus('checking');
    setError(null);
    setProgressInfo(null);

    const result = useWakeup 
      ? await checkServerStatusWithWakeup((progress) => {
          setProgressInfo(progress);
        })
      : await checkServerStatusWithWakeup(); // Still use wake-up but without progress callback

    if (result.success) {
      setStatus('running');
      setData(result.data);
      setError(null);
    } else {
      setStatus('error');
      setError(result.error);
      setData(null);
    }
    
    setProgressInfo(null);
    return result;
  }, [useWakeup]);

  useEffect(() => {
    if (autoCheck) {
      checkStatus();
    }
  }, [autoCheck, checkStatus]);

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
  }, [status, retryInterval, checkStatus]);

  return {
    status,
    error,
    data,
    progressInfo,
    checkStatus,
    isChecking: status === 'checking',
    isRunning: status === 'running',
    hasError: status === 'error'
  };
};
