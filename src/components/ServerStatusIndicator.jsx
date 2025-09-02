import React from 'react';
import { useServerStatus } from '../hooks/useServerStatus';

const ServerStatusIndicator = ({ showText = false, className = '' }) => {
  const { status, checkStatus, error } = useServerStatus({ 
    autoCheck: false, 
    retryInterval: 30000 // Check every 30 seconds if there's an error
  });

  const getStatusConfig = () => {
    switch (status) {
      case 'running':
        return {
          color: 'bg-green-500',
          text: 'Server Online',
          icon: '✓'
        };
      case 'error':
        return {
          color: 'bg-red-500',
          text: 'Server Offline',
          icon: '✕'
        };
      case 'checking':
        return {
          color: 'bg-yellow-500 animate-pulse',
          text: 'Checking...',
          icon: '⟳'
        };
      default:
        return {
          color: 'bg-gray-500',
          text: 'Unknown',
          icon: '?'
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div 
      className={`flex items-center space-x-2 cursor-pointer ${className}`}
      onClick={checkStatus}
      title={error ? `Error: ${error}` : statusConfig.text}
    >
      <div className={`w-3 h-3 rounded-full ${statusConfig.color}`}></div>
      {showText && (
        <span className="text-sm font-medium text-gray-700">
          {statusConfig.text}
        </span>
      )}
    </div>
  );
};

export default ServerStatusIndicator;
