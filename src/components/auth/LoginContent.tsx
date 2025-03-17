"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AuthLayout } from '@/components/layouts';
import { Input, Checkbox, Divider, StatusModal } from '@/components/ui';

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
      className="text-[--paragraph]"
      onClick={togglePasswordVisibility}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {showPassword ? (
          // Eye off icon
          <path 
            d="M14.12 14.12C13.8454 14.4147 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003L17.94 17.94ZM9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19L9.9 4.24002Z" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        ) : (
          // Eye icon
          <>
            <path 
              d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </>
        )}
      </svg>
    </button>
  );

  if (status === 'loading') {
    return <div className="flex h-screen items-center justify-center ">
      <div className="animate-spin h-10 w-10 border-4 border-purple-500 rounded-full border-t-transparent"></div>
    </div>
  }

  return (
    <AuthLayout 
      title="Sign In"
      description="Manage your workspace seamlessly. Sign in to continue."
      bulletPoints={bulletPoints}
    >
      {/* Success Modal */}
      <StatusModal
        isOpen={showLoginSuccess}
        onClose={handleClosePopup}
        title="Login Successful!"
        message={success === 'google' 
          ? 'You have successfully signed in with Google.' 
          : 'You have successfully signed in to your account.'}
        buttonText="Continue"
        status="success"
      />

      {/* Error Modal */}
      <StatusModal
        isOpen={showLoginError}
        onClose={handleClosePopup}
        title="Login Failed"
        message={errorMessage}
        buttonText="Try Again"
        status="error"
      />

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
      
      <p className="mt-8 text-center text-sm text-[#DADADA]">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
          Sign Up
        </Link>
      </p>
    </AuthLayout>
  );
} 