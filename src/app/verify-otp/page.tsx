"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/layouts";

export default function VerifyOTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get('email') || 'companyadmin@gmail.com';
  
  const [otpValues, setOtpValues] = useState(['', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const bulletPoints = [
    'Employee Management: View detailed profiles, track performance, and manage attendance.',
    'Performance Insights: Analyze team goals, progress, and achievements.',
    'Attendance & Leaves: Track attendance patterns and manage leave requests effortlessly.'
  ];

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 5);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value.slice(0, 1); // Only take the first character
    setOtpValues(newOtpValues);

    // Auto focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!otpValues[index] && index > 0) {
        const newOtpValues = [...otpValues];
        newOtpValues[index - 1] = '';
        setOtpValues(newOtpValues);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 5).split('');
    const newOtpValues = [...otpValues];
    
    digits.forEach((digit, index) => {
      if (index < 5) {
        newOtpValues[index] = digit;
      }
    });
    
    setOtpValues(newOtpValues);
    
    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtpValues.findIndex(val => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[4]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    const otpString = otpValues.join('');
    
    // Check if OTP is one of the hardcoded values (00000 or 11111)
    if (otpString === "00000" || otpString === "11111") {
      // Valid OTP, redirect to create new password page
      router.push("/create-new-password?email=" + encodeURIComponent(email));
    } else {
      // Invalid OTP
      setError("Invalid OTP. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleChangeEmail = () => {
    router.push("/forgot-password");
  };

  const handleResendOTP = () => {
    // Simulate resending OTP
    setError("");
    // You could add a success message here
  };

  return (
    <AuthLayout
      title="Enter OTP"
      description={`Enter the OTP that we have sent to your email address ${email}.`}
      bulletPoints={bulletPoints}
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm mb-4">
            {error}
          </div>
        )}
        
        <div>
          <button 
            type="button" 
            onClick={handleChangeEmail}
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            Change Email Address
          </button>
        </div>

        <div className="flex justify-between gap-2 my-6">
          {otpValues.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-14 h-14 text-center text-2xl bg-[#1A202C] border border-[#4A5568] rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          ))}
        </div>

        <div>
          <button 
            type="button" 
            onClick={handleResendOTP}
            className="text-purple-400 hover:text-purple-300 text-sm"
          >
            Resend OTP
          </button>
        </div>

        <button
          type="submit"
          className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg focus:outline-none transition-colors"
          disabled={isSubmitting || otpValues.some(v => !v)}
        >
          {isSubmitting ? "Processing..." : "Continue"}
        </button>
      </form>
    </AuthLayout>
  );
} 