"use client";

import dynamic from 'next/dynamic';
import { Suspense } from "react";

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen h-screen flex items-center justify-center">
    <div className="animate-spin h-10 w-10 border-4 border-[--primary] rounded-full border-t-transparent"></div>
  </div>
);

// Dynamically import the AuthDebugContent with SSR disabled
const AuthDebugContent = dynamic(
  () => import('../../components/auth/AuthDebugContent'),
  { 
    ssr: false,
    loading: () => <LoadingSpinner />
  }
);

export default function AuthDebugPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AuthDebugContent />
    </Suspense>
  );
} 