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
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#171923] px-8 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Sign In</h2>
            <p className="mt-2 text-gray-400">
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
          
          <p className="mt-8 text-center text-sm text-gray-400">
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
