'use client';

import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', rightElement, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            className={`
              w-full px-4 py-3 bg-[#2D3748] border border-[#4A5568] rounded-lg
              text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent 
              transition-colors placeholder-gray-500
              ${error ? 'border-red-500' : ''}
              ${rightElement ? 'pr-12' : ''}
              ${className}
            `}
            ref={ref}
            {...props}
          />
          
          {rightElement && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {rightElement}
            </div>
          )}
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; 