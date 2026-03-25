import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy URLs from old site that legitimately moved
      { source: '/month', destination: '/', permanent: true },
      { source: '/lifetime', destination: '/', permanent: true },
      { source: '/testimonials', destination: '/', permanent: true },
      { source: '/resources', destination: '/', permanent: true },
      { source: '/features', destination: '/', permanent: true },
    ]
  },
};

export default nextConfig;
