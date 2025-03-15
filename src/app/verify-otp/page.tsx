"use client";

import dynamic from 'next/dynamic';
import { Suspense } from "react";

// Loading component
const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center bg-[#171923]">
    <div className="animate-spin h-10 w-10 border-4 border-purple-500 rounded-full border-t-transparent"></div>
  </div>
);

// Dynamically import the VerifyOTP content with SSR disabled
const VerifyOTPContent = dynamic(
  () => import('../../components/auth/VerifyOTPContent'),
  { 
    ssr: false,
    loading: () => <LoadingSpinner />
  }
);

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VerifyOTPContent />
    </Suspense>
  );
} 