'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface SuccessNotificationProps {
  title: string;
  message: string;
  buttonText?: string;
  onClose?: () => void;
}

export function SuccessNotification({ 
  title, 
  message, 
  buttonText = 'Okay', 
  onClose 
}: SuccessNotificationProps) {
  const router = useRouter();
  
  const handleClick = () => {
    if (onClose) {
      onClose();
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1A202C] rounded-xl w-full max-w-md p-8 text-center shadow-2xl">
        <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-8 h-8 text-white"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" 
            />
          </svg>
        </div>
        
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-[#DADADA] mb-8">{message}</p>
        
        <button
          onClick={handleClick}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
} 