"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AuthLayout } from '@/components/layouts';
import { Input } from '@/components/ui';

export default function SignUpContent() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const bulletPoints = [
    'Employee Management: View detailed profiles, track performance, and manage attendance.',
    'Performance Insights: Analyze team goals, progress, and achievements.',
    'Attendance & Leaves: Track attendance patterns and manage leave requests effortlessly.'
  ];

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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

  const confirmPasswordToggleButton = (
    <button
      type="button"
      className="text-gray-400"
      onClick={toggleConfirmPasswordVisibility}
    >
      <Image 
        src="/eye-icon.svg" 
        alt={showConfirmPassword ? "Hide password" : "Show password"} 
        width={20} 
        height={20}
      />
    </button>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form fields
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    // Simulate API call to register
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to login page after successful registration
      router.push('/login');
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    // Will redirect to Google OAuth
    router.push('/login');
  };

  const handleMicrosoftSignIn = () => {
    // Will redirect to Microsoft OAuth
    router.push('/login');
  };

  return (
    <AuthLayout
      title="Sign Up"
      description="Manage your workspace seamlessly. Sign up to continue."
      bulletPoints={bulletPoints}
    >
      {error && (
        <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••••••••"
          rightElement={confirmPasswordToggleButton}
          required
        />
        
        <button
          type="submit"
          className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg focus:outline-none transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      
      <div className="mt-6 flex items-center justify-center">
        <div className="border-t border-gray-700 flex-grow"></div>
        <span className="mx-4 text-sm text-gray-500">or</span>
        <div className="border-t border-gray-700 flex-grow"></div>
      </div>
      
      <div className="mt-6 space-y-4">
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-transparent hover:bg-[#2D3748] text-white font-medium py-3 px-4 border border-[#4A5568] rounded-lg focus:outline-none transition-colors"
        >
          <Image src="/google-icon.svg" width={24} height={24} alt="Google logo" />
          Sign Up with Google
        </button>
        
        <button
          onClick={handleMicrosoftSignIn}
          className="w-full flex items-center justify-center gap-3 bg-transparent hover:bg-[#2D3748] text-white font-medium py-3 px-4 border border-[#4A5568] rounded-lg focus:outline-none transition-colors"
        >
          <Image src="/microsoft-icon.svg" width={24} height={24} alt="Microsoft logo" />
          Sign Up with Microsoft
        </button>
      </div>
      
      <p className="mt-8 text-center text-sm text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
} 