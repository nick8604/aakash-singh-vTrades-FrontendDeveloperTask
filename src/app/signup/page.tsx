"use client";

import dynamic from 'next/dynamic';
import { Suspense } from "react";

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen h-screen flex items-center justify-center">
    <div className="animate-spin h-10 w-10 border-4 border-[--primary] rounded-full border-t-transparent"></div>
  </div>
);

// Dynamically import the SignUp content with SSR disabled
const SignUpContent = dynamic(
  () => import('@/components/auth/SignUpContent'),
  { 
    ssr: false,
    loading: () => <LoadingSpinner />
  }
);

export default function SignUpPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SignUpContent />
    </Suspense>
  );
} 