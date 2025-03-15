"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

export interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>;
} 