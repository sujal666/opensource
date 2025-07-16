import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['img.clerk.com' , 'avatars.githubusercontent.com'], // Add Clerk's image domain for user avatars
  },
  env: {
    // Explicitly expose Clerk environment variables if not already done
    // This might be redundant if they are already NEXT_PUBLIC_ prefixed,
    // but it ensures they are available.
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  },
};

export default nextConfig;