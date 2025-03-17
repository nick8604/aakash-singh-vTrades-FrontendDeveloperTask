"use client";

import React from 'react';

type StatusType = 'success' | 'error' | 'info' | 'warning';

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText: string;
  status: StatusType;
}

const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText,
  status
}) => {
  if (!isOpen) return null;

  const getStatusColors = (status: StatusType) => {
    switch (status) {
      case 'success':
        return { 
          bg: 'bg-green-500',
          icon: (
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          )
        };
      case 'error':
        return { 
          bg: 'bg-[--error]',
          icon: (
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )
        };
      case 'warning':
        return { 
          bg: 'bg-yellow-500',
          icon: (
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )
        };
      case 'info':
      default:
        return { 
          bg: 'bg-blue-500',
          icon: (
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
    }
  };

  const { bg, icon } = getStatusColors(status);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black/50">
      <div className="p-8 rounded-lg max-w-md w-full shadow-xl" style={{ backgroundColor: 'var(--background)' }}>
        <div className="flex flex-col items-center">
          <div className={`h-16 w-16 ${bg} rounded-full flex items-center justify-center mb-4`}>
            {icon}
          </div>
          <h2 className="text-xl font-semibold text-[--heading] mb-2">{title}</h2>
          <p className="text-[--paragraph] text-center mb-6">
            {message}
          </p>
          <button
            className="w-full text-white font-medium py-3 rounded-lg focus:outline-none transition-colors"
            style={{ backgroundColor: 'var(--primary)' }}
            onClick={onClose}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusModal; 