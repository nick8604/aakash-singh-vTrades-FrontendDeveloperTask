"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layouts";
import { Input, StatusModal } from "@/components/ui";

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
      {/* Success Modal */}
      <StatusModal
        isOpen={showEmailSent}
        onClose={handleConfirmEmail}
        title="Email Sent!"
        message="We've sent an OTP to your email address. Please check your inbox and enter the code on the next screen."
        buttonText="Okay"
        status="success"
      />

      {!showEmailSent && (
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