'use client';

import React from 'react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { Button } from "@/components/ui/Button";

interface SocialLoginButtonProps {
  provider: string;
  callbackUrl?: string;
}

export function SocialLoginButton({
  provider,
  callbackUrl = "/dashboard",
}: SocialLoginButtonProps) {
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`🔍 [SocialLoginButton] Button clicked for provider: ${provider}`);
    
    // Normalize provider name to lowercase
    const normalizedProvider = provider.toLowerCase();
    console.log(`🔍 [SocialLoginButton] Using normalized provider: ${normalizedProvider}`);
    
    try {
      console.log(`🔍 [SocialLoginButton] Calling signIn with provider: ${normalizedProvider}, callbackUrl: ${callbackUrl}`);
      
      // First try with redirect: false to better debug the response
      const result = await signIn(normalizedProvider, { 
        callbackUrl,
        redirect: false
      });
      
      console.log('🔍 [SocialLoginButton] Sign in result:', result);
      
      // If there's an error, log it
      if (result?.error) {
        console.error('❌ [SocialLoginButton] Error from signIn result:', result.error);
        // You might want to show an error message here
      } 
      // If there's a URL, redirect to it manually
      else if (result?.url) {
        console.log('✅ [SocialLoginButton] Redirecting to:', result.url);
        window.location.href = result.url;
      }
    } catch (error) {
      console.error(`❌ [SocialLoginButton] Error signing in with ${normalizedProvider}:`, error);
    }
  };

  const getProviderIcon = () => {
    switch (provider.toLowerCase()) {
      case "google":
        return <Image src="/google-icon.svg" width={24} height={24} alt="Google logo" className="mr-2" />;
      default:
        return null;
    }
  };

  const getProviderText = () => {
    switch (provider.toLowerCase()) {
      case "google":
        return "Continue with Google";
      default:
        return `Continue with ${provider}`;
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full flex items-center justify-center py-6"
      onClick={handleLogin}
    >
      {getProviderIcon()}
      {getProviderText()}
    </Button>
  );
} 