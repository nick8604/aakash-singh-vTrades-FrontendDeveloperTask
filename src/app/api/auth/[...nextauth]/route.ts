import NextAuth from "next-auth/next";
import { authOptions } from "./authOptions";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth credentials");
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 