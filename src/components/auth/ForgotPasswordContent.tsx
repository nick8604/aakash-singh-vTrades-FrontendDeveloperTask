"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layouts";
import { Input } from "@/components/ui";

export default function ForgotPasswordContent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailSent, setShowEmailSent] = useState(false);

  const bulletPoints = [
    'Employee Management: View detailed profiles, track performance, and manage attendance.',
    'Performance Insights: Analyze team goals, progress, and achievements.',
    'Attendance & Leaves: Track attendance patterns and manage leave requests effortlessly.'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setShowEmailSent(true);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleConfirmEmail = () => {
    router.push("/verify-otp?email=" + encodeURIComponent(email));
  };

  return (
    <AuthLayout
      title="Forgot Password"
      description="Enter your email and we&apos;ll send you a link to reset your password."
      bulletPoints={bulletPoints}
    >
      {showEmailSent ? (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-[#171923] p-8 rounded-lg max-w-md w-full shadow-xl">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">Email Sent!</h2>
              <p className="text-gray-400 text-center mb-6">
                We&apos;ve sent an OTP to your email address. Please check your inbox and enter the code on the next screen.
              </p>
              <button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg focus:outline-none transition-colors"
                onClick={handleConfirmEmail}
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="navinash@workhive.com"
            required
          />

          <button
            type="submit"
            className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg focus:outline-none transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      )}
    </AuthLayout>
  );
} 