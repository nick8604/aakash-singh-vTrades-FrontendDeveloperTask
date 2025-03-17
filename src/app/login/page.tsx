"use client";

import dynamic from 'next/dynamic';
import { Suspense } from "react";

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen h-screen flex items-center justify-center">
    <div className="animate-spin h-10 w-10 border-4 border-[--primary] rounded-full border-t-transparent"></div>
  </div>
);

// Dynamically import the login content with SSR disabled
const LoginContent = dynamic(
  () => import('../../components/auth/LoginContent'),
  { 
    ssr: false,
    loading: () => <LoadingSpinner />
  }
);

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LoginContent />
    </Suspense>
  );
} 