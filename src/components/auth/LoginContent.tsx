"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AuthLayout } from '@/components/layouts';
import { Input, Checkbox, Divider } from '@/components/ui';

export default function LoginContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');
  const success = searchParams?.get('success');
  
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check for success message in URL
    if (success === 'google') {
      setShowLoginSuccess(true);
    }

    if (error) {
      setErrorMessage('Authentication failed. Please try again.');
      setShowLoginError(true);
    }
  }, [status, session, error, success]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form fields
    if (!emailValue || !password) {
      setErrorMessage('Please enter both email and password.');
      setShowLoginError(true);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to login
    setTimeout(() => {
      setIsSubmitting(false);
      setShowLoginSuccess(true);
    }, 1000);
  };

  const handleGoogleSignIn = async () => {
    try {
      console.log('Starting Google sign-in process');
      
      // Use redirect: false to get the result and diagnose issues
      const result = await signIn('google', { 
        callbackUrl: '/login?success=google',
        redirect: false
      });
      
      console.log('Google sign-in result:', result);
      
      if (result?.error) {
        console.error('Google sign-in error:', result.error);
        setErrorMessage(`Authentication failed: ${result.error}`);
        setShowLoginError(true);
      } else if (result?.url) {
        // Manually redirect to the URL
        window.location.href = result.url;
      }
    } catch (error) {
      console.error('Google sign-in exception:', error);
      setErrorMessage('Google sign-in failed. Please try again.');
      setShowLoginError(true);
    }
  };

  const handleMicrosoftSignIn = async () => {
    try {
      console.log('Starting Microsoft sign-in process');
      
      // Use redirect: false to get the result and diagnose issues
      const result = await signIn('microsoft', { 
        callbackUrl: '/login',
        redirect: false
      });
      
      console.log('Microsoft sign-in result:', result);
      
      if (result?.error) {
        console.error('Microsoft sign-in error:', result.error);
        setErrorMessage(`Authentication failed: ${result.error}`);
        setShowLoginError(true);
      } else if (result?.url) {
        // Manually redirect to the URL
        window.location.href = result.url;
      }
    } catch (error) {
      console.error('Microsoft sign-in exception:', error);
      setErrorMessage('Microsoft sign-in failed. Please try again.');
      setShowLoginError(true);
    }
  };

  const handleClosePopup = () => {
    setShowLoginSuccess(false);
    setShowLoginError(false);
  };

  const bulletPoints = [
    'Employee Management: View detailed profiles, track performance, and manage attendance.',
    'Performance Insights: Analyze team goals, progress, and achievements.',
    'Attendance & Leaves: Track attendance patterns and manage leave requests effortlessly.'
  ];

  const passwordToggleButton = (
    <button
      type="button"
      className="text-gray-400"
      onClick={togglePasswordVisibility}
    >
      <Image 
        src="/eye-icon.svg" 
        alt={showPassword ? "Hide password" : "Show password"} 
        width={20} 
        height={20}
      />
    </button>
  );

  if (status === 'loading') {
    return <div className="flex h-screen items-center justify-center bg-[#171923]">
      <div className="animate-spin h-10 w-10 border-4 border-purple-500 rounded-full border-t-transparent"></div>
    </div>
  }

  return (
    <AuthLayout 
      title="Sign In"
      description="Manage your workspace seamlessly. Sign in to continue."
      bulletPoints={bulletPoints}
    >
      {showLoginSuccess && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-[#171923] p-8 rounded-lg max-w-md w-full shadow-xl">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Login Successful!</h2>
              <p className="text-gray-400 text-center mb-6">
                {success === 'google' 
                  ? 'You have successfully signed in with Google.' 
                  : 'You have successfully signed in to your account.'}
              </p>
              <button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg focus:outline-none transition-colors"
                onClick={handleClosePopup}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {showLoginError && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-[#171923] p-8 rounded-lg max-w-md w-full shadow-xl">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Login Failed</h2>
              <p className="text-gray-400 text-center mb-6">
                {errorMessage}
              </p>
              <button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg focus:outline-none transition-colors"
                onClick={handleClosePopup}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          placeholder="navinash@workhive.com"
          required
        />
        
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••••"
          rightElement={passwordToggleButton}
          required
        />
        
        <div className="flex items-center justify-between">
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            label="Remember me"
          />
          <div className="text-sm">
            <Link href="/forgot-password" className="text-purple-400 hover:text-purple-300">
              Forgot Password?
            </Link>
          </div>
        </div>
        
        <button
          type="submit"
          className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg focus:outline-none transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
      
      <Divider text="or" className="my-6" />
      
      <div className="space-y-4">
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-transparent hover:bg-[#2D3748] text-white font-medium py-3 px-4 border border-[#4A5568] rounded-lg focus:outline-none transition-colors"
        >
          <Image src="/google-icon.svg" width={24} height={24} alt="Google logo" />
          Sign in with Google
        </button>
        
        <button
          onClick={handleMicrosoftSignIn}
          className="w-full flex items-center justify-center gap-3 bg-transparent hover:bg-[#2D3748] text-white font-medium py-3 px-4 border border-[#4A5568] rounded-lg focus:outline-none transition-colors"
        >
          <Image src="/microsoft-icon.svg" width={24} height={24} alt="Microsoft logo" />
          Sign in with Microsoft
        </button>
      </div>
      
      <p className="mt-8 text-center text-sm text-gray-400">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
} 