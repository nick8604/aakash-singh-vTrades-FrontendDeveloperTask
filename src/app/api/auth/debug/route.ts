import { NextRequest, NextResponse } from "next/server";

// Safe method to get environment variables without exposing secrets
export async function GET(req: NextRequest) {
  return NextResponse.json({
    baseUrl: process.env.NEXTAUTH_URL || "Not set",
    nodeEnv: process.env.NODE_ENV || "Not set",
    vercelEnv: process.env.VERCEL_ENV || null,
    vercelUrl: process.env.VERCEL_URL || null,
    // Don't include sensitive info like client secrets
    time: new Date().toISOString(),
  });
} 