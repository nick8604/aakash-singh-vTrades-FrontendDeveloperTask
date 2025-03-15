"use client";

import dynamic from 'next/dynamic';
import { Suspense } from "react";

// Loading component
const LoadingSpinner = () => (
  <div className="flex h-screen items-center justify-center bg-[#171923]">
    <div className="animate-spin h-10 w-10 border-4 border-purple-500 rounded-full border-t-transparent"></div>
  </div>
);

// Dynamically import the ForgotPassword content with SSR disabled
const ForgotPasswordContent = dynamic(
  () => import('@/components/auth/ForgotPasswordContent'),
  { 
    ssr: false,
    loading: () => <LoadingSpinner />
  }
);

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ForgotPasswordContent />
    </Suspense>
  );
} 