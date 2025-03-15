'use client';

import React from 'react';

interface DividerProps {
  text?: string;
  className?: string;
}

export function Divider({ text, className = '' }: DividerProps) {
  if (!text) {
    return <hr className={`border-t border-gray-700 ${className}`} />;
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-700"></div>
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="px-2 text-gray-500 bg-[#171923]">{text}</span>
      </div>
    </div>
  );
} 