'use client';

import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  bulletPoints?: string[];
}

export function AuthLayout({ children, title, description, bulletPoints = [] }: AuthLayoutProps) {
  return (
    <div className="min-h-screen h-screen flex items-stretch">
      {/* Left side - Image with content - Fixed */}
      <div className="hidden md:block md:w-1/2 relative p-6">
        <div 
          className="absolute inset-0 rounded-2xl overflow-hidden m-6"
          style={{
            backgroundImage: 'url(/images/team-collaboration.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-black/70 to-black/30">
            <h1 className="text-4xl font-bold mb-8 text-white">Welcome to WORKHIVE!</h1>
            
            <ul className="space-y-4 mb-8 font-medium text-sm">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start text-white">
                  <span className="mr-2">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Right side - Dynamic content */}
      <div className="w-full md:w-1/2 overflow-y-auto">
        <div className="flex flex-col justify-center px-8 lg:px-12 py-8 min-h-full">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
              {description && (
                <p className="mt-2 text-[--paragraph]">{description}</p>
              )}
            </div>
            
            {/* Dynamic content rendered here */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 