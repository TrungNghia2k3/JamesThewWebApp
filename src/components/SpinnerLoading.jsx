import React from 'react';

const SpinnerLoading = ({ 
  message = "Checking server status...", 
  showProgress = false, 
  progress = null 
}) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center z-50">
      <div className="text-center max-w-md mx-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-6 mx-auto"></div>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {showProgress && progress ? 'Waking Up Server' : 'Checking Server'}
        </h2>
        
        <p className="text-lg text-gray-700 font-medium mb-4">{message}</p>
        
        {showProgress && progress && (
          <div className="space-y-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(progress.attempt / progress.maxRetries) * 100}%` 
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              Attempt {progress.attempt} of {progress.maxRetries}
            </p>
          </div>
        )}
        
        <div className="mt-6 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="font-medium text-blue-800 mb-1">What's happening?</p>
          <p>
            {showProgress 
              ? "The server is currently sleeping and needs time to wake up. This can take 2-3 minutes on first access."
              : "Verifying that the server is running and ready to serve requests."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpinnerLoading;
