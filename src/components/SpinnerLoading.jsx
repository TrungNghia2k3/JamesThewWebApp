import React from 'react';

const SpinnerLoading = ({ message = "Checking server status..." }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-lg text-gray-700 font-medium">{message}</p>
    </div>
  );
};

export default SpinnerLoading;
