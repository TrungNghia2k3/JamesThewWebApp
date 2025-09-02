import React from 'react';
import { API_ENDPOINTS, API_BASE_URL } from '../utils/config';

const EnvironmentDebug = () => {
  const envInfo = {
    'Environment': import.meta.env.MODE,
    'Is Production': import.meta.env.PROD,
    'Is Development': import.meta.env.DEV,
    'Base URL': import.meta.env.BASE_URL,
    'API Base URL': API_BASE_URL,
    'Server Status URL': API_ENDPOINTS.SERVER_STATUS,
    'Login URL': API_ENDPOINTS.LOGIN,
    'Current Domain': window.location.origin,
    'User Agent': navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Other'
  };

  const testApiCall = async () => {
    try {
      console.log('Testing API call to:', API_ENDPOINTS.SERVER_STATUS);
      const response = await fetch(API_ENDPOINTS.SERVER_STATUS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add mode for CORS debugging
        mode: 'cors'
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers.entries()]);
      
      const data = await response.json();
      console.log('Response data:', data);
      
      alert(`API Test Success!\nStatus: ${response.status}\nData: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      console.error('API Test Error:', error);
      alert(`API Test Failed!\nError: ${error.message}\nCheck console for details.`);
    }
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mt-4">
      <h4 className="font-semibold text-yellow-800 mb-3">🔧 Environment Debug Info</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-4">
        {Object.entries(envInfo).map(([key, value]) => (
          <div key={key} className="flex justify-between bg-white p-2 rounded border">
            <span className="font-medium text-gray-700">{key}:</span>
            <span className="font-mono text-gray-600 break-all">
              {typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <button 
          onClick={testApiCall}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm font-medium"
        >
          🧪 Test API Call
        </button>
        
        <div className="text-xs text-yellow-700">
          <strong>Note:</strong> This component helps debug environment and API configuration issues.
          Remove this component in production.
        </div>
      </div>
    </div>
  );
};

export default EnvironmentDebug;
