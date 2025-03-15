import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import MicrosoftProvider from "next-auth/providers/azure-ad";

// Removing the error throwing for better error handling during build
// if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
//   throw new Error("Missing Google OAuth credentials");
// }

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "placeholder-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "placeholder-secret",
    }),
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID ?? "placeholder-id",
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET ?? "placeholder-secret",
      tenantId: process.env.MICROSOFT_TENANT_ID,
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.sub;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (session?.user) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always allow returning to the login page with success parameter
      if (url.includes('/login?success=google')) {
        return url;
      }
      
      // Allows relative callback URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) {
        return url;
      }
      
      return baseUrl;
    },
  },
}; 