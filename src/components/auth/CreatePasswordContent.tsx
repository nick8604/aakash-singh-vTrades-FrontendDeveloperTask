"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/layouts";
import { Input, StatusModal } from "@/components/ui";

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
      className="text-white"
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

  const confirmPasswordToggleButton = (
    <button
      type="button"
      className="text-white"
      onClick={toggleConfirmPasswordVisibility}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {showConfirmPassword ? (
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

  return (
    <AuthLayout
      title="Create New Password"
      description="Choose a strong and secure password to keep your account safe. Make sure it&apos;s easy for you to remember, but hard for others to guess!"
      bulletPoints={bulletPoints}
    >
      {/* Success Modal */}
      <StatusModal
        isOpen={showSuccess}
        onClose={handleOkay}
        title="Password Created!"
        message="Your password has been successfully updated. You can now use your new password to log in."
        buttonText="Okay"
        status="success"
      />

      {!showSuccess && (
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-[--error] bg-opacity-10 border border-[--error] text-[--error] px-4 py-3 rounded-lg text-sm mb-4">
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
            className="mt-2 w-full text-white font-medium py-3 rounded-lg focus:outline-none transition-colors"
            style={{ backgroundColor: 'var(--primary)' }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
    </AuthLayout>
  );
} 