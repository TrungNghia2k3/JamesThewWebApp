import React from 'react';
import { useServerStatus } from '../hooks/useServerStatus';
import ServerStatusIndicator from './ServerStatusIndicator';

const ServerStatusTest = () => {
  const { status, error, data, checkStatus, isChecking, isRunning, hasError } = useServerStatus({
    autoCheck: false
  });

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Server Status Test Panel</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <ServerStatusIndicator showText={true} />
          <button 
            onClick={checkStatus}
            disabled={isChecking}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-4 py-2 rounded transition-colors"
          >
            {isChecking ? 'Checking...' : 'Check Server Status'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-3 rounded border">
            <div className="font-medium text-gray-700">Status</div>
            <div className={`font-mono ${isRunning ? 'text-green-600' : hasError ? 'text-red-600' : 'text-yellow-600'}`}>
              {status}
            </div>
          </div>

          <div className="bg-white p-3 rounded border">
            <div className="font-medium text-gray-700">Server Running</div>
            <div className={`font-mono ${isRunning ? 'text-green-600' : 'text-red-600'}`}>
              {isRunning ? 'Yes' : 'No'}
            </div>
          </div>

          <div className="bg-white p-3 rounded border">
            <div className="font-medium text-gray-700">Has Error</div>
            <div className={`font-mono ${hasError ? 'text-red-600' : 'text-green-600'}`}>
              {hasError ? 'Yes' : 'No'}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 p-3 rounded">
            <div className="font-medium text-red-800">Error Details:</div>
            <div className="text-red-600 font-mono text-sm">{error}</div>
          </div>
        )}

        {data && (
          <div className="bg-green-50 border border-green-200 p-3 rounded">
            <div className="font-medium text-green-800">Server Response:</div>
            <pre className="text-green-600 font-mono text-sm bg-green-100 p-2 rounded mt-2 overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        <div className="text-xs text-gray-600">
          <strong>Expected Response:</strong> The server should return exactly: 
          <code className="bg-gray-100 px-1 rounded">
            {`{"success": true, "status": 200, "message": "Server is running", "data": "OK"}`}
          </code>
        </div>
      </div>
    </div>
  );
};

export default ServerStatusTest;
