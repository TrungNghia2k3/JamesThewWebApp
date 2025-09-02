import React, { useState, useEffect } from 'react';
import SpinnerLoading from './SpinnerLoading';
import { checkServerStatusWithWakeup } from '../utils/serverStatus';

const ServerStatusChecker = ({ children }) => {
  const [serverStatus, setServerStatus] = useState('checking'); // 'checking', 'running', 'error'
  const [error, setError] = useState(null);
  const [progressInfo, setProgressInfo] = useState({ 
    attempt: 1, 
    maxRetries: 1, 
    message: 'Checking server status...' 
  });

  const handleServerStatusCheck = async () => {
    setServerStatus('checking');
    setError(null);
    setProgressInfo({ 
      attempt: 1, 
      maxRetries: 1, 
      message: 'Checking server status...' 
    });

    const result = await checkServerStatusWithWakeup((progress) => {
      setProgressInfo(progress);
    });

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
    return (
      <SpinnerLoading 
        message={progressInfo.message}
        showProgress={progressInfo.maxRetries > 1}
        progress={progressInfo}
      />
    );
  }

  if (serverStatus === 'error') {
    const isTimeoutError = error && (error.includes('timeout') || error.includes('fetch'));
    
    return (
      <div className="fixed inset-0 bg-red-50 flex flex-col items-center justify-center z-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full border border-red-200">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-red-800 mb-3">
              {isTimeoutError ? 'Server Wake-up Failed' : 'Website Unavailable'}
            </h2>
            
            <div className="text-left space-y-3 mb-6">
              {isTimeoutError ? (
                <>
                  <p className="text-red-700">
                    The server is taking longer than expected to wake up. This can happen when:
                  </p>
                  <ul className="list-disc list-inside text-sm text-red-600 space-y-1">
                    <li>The server has been inactive for a while</li>
                    <li>Heavy traffic is causing delays</li>
                    <li>Network connectivity issues</li>
                  </ul>
                </>
              ) : (
                <p className="text-red-700">
                  The server is currently experiencing issues and cannot respond properly.
                </p>
              )}
              
              <div className="bg-gray-50 p-3 rounded text-sm">
                <span className="font-medium text-gray-700">Error details: </span>
                <span className="text-gray-600 font-mono">{error}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={handleServerStatusCheck}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded transition-colors"
              >
                Try Again
              </button>
              
              {isTimeoutError && (
                <p className="text-xs text-gray-600">
                  💡 Tip: The server may need 2-3 minutes to fully wake up. Please be patient.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Server is running, render the application
  return children;
};

export default ServerStatusChecker;
