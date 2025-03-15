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
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto overflow-hidden rounded-3xl flex">
        {/* Left side - Image with content */}
        <div 
          className="hidden md:block md:w-1/2 relative h-screen max-h-[800px]"
          style={{
            backgroundImage: 'url(/images/team-collaboration.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-black/70 to-black/30">
            <h1 className="text-5xl font-bold mb-8 text-white">Welcome to WORKHIVE!</h1>
            
            <ul className="space-y-4 mb-8">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-start text-white">
                  <span className="mr-2">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Right side - Form */}
        <div className="w-full md:w-1/2 bg-[#171923] h-screen max-h-[800px] flex flex-col">
          <div className="flex-1 flex flex-col justify-center px-8 lg:px-12 py-8">
            <div className="w-full max-w-md mx-auto">
              <div className="mb-10">
                <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
                {description && (
                  <p className="mt-2 text-gray-400">{description}</p>
                )}
              </div>
              
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 