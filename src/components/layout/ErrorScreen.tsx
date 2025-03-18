import React, { useState } from 'react';
import { Btn } from '../ui/Button';

interface ErrorScreenProps {
  message: string;
  details?: string;
  onRetry?: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message, details, onRetry }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
      <div className="bg-red-100 border border-red-300 rounded-lg p-8 max-w-lg">
        <svg 
          className="w-16 h-16 text-red-500 mx-auto mb-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        
        <h2 className="text-xl font-bold text-red-700 mb-2">Authentication Error</h2>
        <p className="text-gray-700 mb-4">{message}</p>
        
        {details && (
          <div className="mt-4">
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              {showDetails ? 'Hide technical details' : 'Show technical details'}
            </button>
            
            {showDetails && (
              <div className="mt-2 p-3 bg-gray-100 rounded text-left overflow-auto max-h-40 text-xs">
                <pre className="whitespace-pre-wrap break-words">{details}</pre>
              </div>
            )}
          </div>
        )}
        
        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
          {onRetry && (
            <Btn 
              onClick={onRetry}
              className="bg-primary-500 text-white px-4 py-2"
            >
              Return to Sign In
            </Btn>
          )}
          
          <Btn 
            onClick={() => window.location.href = '/'}
            className="bg-gray-200 text-gray-800 px-4 py-2"
          >
            Go to Home Page
          </Btn>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;