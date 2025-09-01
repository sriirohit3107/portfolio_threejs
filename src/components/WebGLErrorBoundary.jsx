import React, { Component } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Error fallback component
function WebGLErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-900 text-white p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">WebGL Rendering Issue</h2>
        <p className="text-gray-300 mb-6">
          There was a problem loading the 3D graphics. This might be due to your browser's WebGL support or graphics drivers.
        </p>
        <div className="space-y-4">
          <button
            onClick={resetErrorBoundary}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
          <p className="text-sm text-gray-400">
            If the problem persists, try refreshing the page or updating your browser.
          </p>
        </div>
      </div>
    </div>
  );
}

// WebGL Error Boundary wrapper
const WebGLErrorBoundary = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={WebGLErrorFallback}
      onError={(error, errorInfo) => {
        console.error('WebGL Error:', error, errorInfo);
        // Log to external service if needed
      }}
      onReset={() => {
        // Force a page reload to reset WebGL context
        window.location.reload();
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default WebGLErrorBoundary;
