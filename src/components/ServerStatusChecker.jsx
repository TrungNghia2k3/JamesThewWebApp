import React, { useState, useEffect } from 'react';
import SpinnerLoading from './SpinnerLoading';
import { checkServerStatus } from '../utils/serverStatus';

const ServerStatusChecker = ({ children }) => {
  const [serverStatus, setServerStatus] = useState('checking'); // 'checking', 'running', 'error'
  const [error, setError] = useState(null);

  const handleServerStatusCheck = async () => {
    setServerStatus('checking');
    setError(null);

    const result = await checkServerStatus();

    if (result.success) {
      setServerStatus('running');
    } else {
      setError(result.error);
      setServerStatus('error');
    }
  };

  useEffect(() => {
    handleServerStatusCheck();
  }, []);

  if (serverStatus === 'checking') {
    return <SpinnerLoading message="Checking server status..." />;
  }

  if (serverStatus === 'error') {
    return (
      <div className="fixed inset-0 bg-red-50 flex flex-col items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4 border border-red-200">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-800 mb-2">Website Unavailable</h2>
            <p className="text-red-600 mb-4">
              The server is currently experiencing issues and the website cannot be accessed.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Error: {error}
            </p>
            <button 
              onClick={handleServerStatusCheck}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Server is running, render the application
  return children;
};

export default ServerStatusChecker;
