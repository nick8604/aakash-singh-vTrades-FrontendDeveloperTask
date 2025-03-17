'use client';

import React, { forwardRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, checked, onChange, className = '', ...props }, ref) => {
    return (
      <div className="flex items-center">
        <input
          id={id}
          type="checkbox"
          className={`
            h-4 w-4 rounded border-gray-600 text-purple-600 
            focus:ring-purple-500 bg-gray-700
            ${className}
          `}
          checked={checked}
          onChange={onChange}
          ref={ref}
          {...props}
        />
        {label && (
          <label htmlFor={id} className="ml-2 block text-sm text-[#FFFFFF]">
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox'; 