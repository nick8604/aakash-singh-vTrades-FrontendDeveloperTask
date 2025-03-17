"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Input, Checkbox } from "@/components/ui";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("navinash@workhive.com");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Just redirect to the login page as requested
    setTimeout(() => {
      router.push("/login");
    }, 500);
  };

  const handleGoogleSignIn = () => {
    router.push("/login");
  };

  const handleMicrosoftSignIn = () => {
    router.push("/login");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

  const bulletPoints = [
    'Employee Management: View detailed profiles, track performance, and manage attendance.',
    'Performance Insights: Analyze team goals, progress, and achievements.',
    'Attendance & Leaves: Track attendance patterns and manage leave requests effortlessly.'
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left Panel with Image and Features */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image 
          src="/images/team-collaboration.png"
          alt="Team collaboration"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex flex-col justify-end p-12 text-white">
          <h1 className="text-4xl font-bold mb-8">Welcome to WORKHIVE!</h1>
          <ul className="space-y-4">
            {bulletPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2">•</span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Panel with Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center  px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Sign In</h2>
            <p className="mt-2 text-[#DADADA]">
              Manage your workspace seamlessly. Sign in to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
              type={showPassword ? "text" : "password"}
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
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg focus:outline-none transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
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
              Sign In with Google
            </button>
            
            <button
              onClick={handleMicrosoftSignIn}
              className="w-full flex items-center justify-center gap-3 bg-transparent hover:bg-[#2D3748] text-white font-medium py-3 px-4 border border-[#4A5568] rounded-lg focus:outline-none transition-colors"
            >
              <Image src="/microsoft-icon.svg" width={24} height={24} alt="Microsoft logo" />
              Sign In with Microsoft
            </button>
          </div>
          
          <p className="mt-8 text-center text-sm text-[#DADADA]">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
