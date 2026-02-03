import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Subtopic pages → redirect to parent topic
      {
        source: '/topics/:topic/:subtopic',
        destination: '/topics/:topic',
        permanent: true,
      },
      // Free questions by topic → redirect to free CFA questions page
      {
        source: '/free-questions/:topic',
        destination: '/free-cfa-questions',
        permanent: true,
      },
      // Compare subpages → redirect to main compare page
      {
        source: '/compare/:slug',
        destination: '/compare',
        permanent: true,
      },
      // Legacy URLs from old site
      {
        source: '/month',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/lifetime',
        destination: '/pricing',
        permanent: true,
      },
      {
        source: '/testimonials',
        destination: '/#features',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
