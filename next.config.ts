import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  images: {
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
