'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // Disable NextAuth from loading during static generation/server-side rendering
  if (typeof window === 'undefined') {
    return <>{children}</>;
  }
  
  return <SessionProvider>{children}</SessionProvider>;
} 