// This file fixes build-time rendering issues with NextAuth
// By setting an environment variable during build that will tell Vercel
// to skip static generation for pages using useSession

process.env.NEXTAUTH_SKIP_STATIC_GEN = 'true';

// Add this line to package.json's build script:
// "build": "node src/app/BuildFix.js && next build" 