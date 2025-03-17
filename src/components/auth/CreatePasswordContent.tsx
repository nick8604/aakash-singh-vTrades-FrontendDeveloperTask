"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { AuthLayout } from "@/components/layouts";
import { Input } from "@/components/ui";

export default function CreatePasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams?.get('email') || '';
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Validate passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setShowSuccess(true);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleOkay = () => {
    router.push("/login");
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

  return (
    <AuthLayout
      title="Create New Password"
      description="Choose a strong and secure password to keep your account safe. Make sure it&apos;s easy for you to remember, but hard for others to guess!"
      bulletPoints={bulletPoints}
    >
      {showSuccess ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-[#171923] p-8 rounded-lg max-w-md w-full shadow-xl">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Password Created!</h2>
              <p className="text-gray-400 text-center mb-6">
                Your password has been successfully updated. You can now use your new password to log in.
              </p>
              <button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg focus:outline-none transition-colors"
                onClick={handleOkay}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 text-white px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="•••••••••••••"
            rightElement={passwordToggleButton}
            required
          />
          
          <Input
            label="Re-enter your new password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="•••••••••••••"
            rightElement={confirmPasswordToggleButton}
            required
          />

          <button
            type="submit"
            className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg focus:outline-none transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
    </AuthLayout>
  );
} 
