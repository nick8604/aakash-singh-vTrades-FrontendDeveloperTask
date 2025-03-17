"use client";

import dynamic from 'next/dynamic';
import { Suspense } from "react";

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen h-screen flex items-center justify-center">
    <div className="animate-spin h-10 w-10 border-4 border-[--primary] rounded-full border-t-transparent"></div>
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