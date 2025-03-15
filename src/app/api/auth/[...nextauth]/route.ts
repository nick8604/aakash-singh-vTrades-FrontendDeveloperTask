import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

// Remove the error throwing for better error handling
// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
//   throw new Error("Missing Google OAuth credentials");
// }

// Important: Export the handler directly as a GET and POST handler
// This ensures Next.js App Router properly recognizes the API route
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions); 