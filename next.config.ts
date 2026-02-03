import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy 404 pages - all redirect to homepage
      // Subtopic pages
      { source: '/topics/:topic/:subtopic', destination: '/', permanent: true },
      // Free questions by topic
      { source: '/free-questions/:topic', destination: '/', permanent: true },
      // Compare subpages
      { source: '/compare/:slug', destination: '/', permanent: true },
      // Legacy URLs from old site
      { source: '/month', destination: '/', permanent: true },
      { source: '/lifetime', destination: '/', permanent: true },
      { source: '/testimonials', destination: '/', permanent: true },
      { source: '/resources', destination: '/', permanent: true },
      { source: '/study-guides', destination: '/', permanent: true },
      { source: '/pricing', destination: '/', permanent: true },
      { source: '/features', destination: '/', permanent: true },
    ]
  },
};

export default nextConfig;
