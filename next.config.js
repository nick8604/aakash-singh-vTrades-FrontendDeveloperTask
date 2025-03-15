/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'graph.microsoft.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
      },
    ],
  },
  eslint: {
    // This will allow production builds to successfully complete even if your project has ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: ['next-auth'],
  },
  // Don't attempt to statically optimize these pages
  unstable_excludeFiles: [
    '**/api/auth/[...nextauth]/**',
    '**/verify-otp/**',
    '**/create-new-password/**',
    '**/login/**',
    '**/forgot-password/**'
  ],
}

module.exports = nextConfig 