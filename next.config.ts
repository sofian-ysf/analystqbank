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

      // Sub-subtopic pages → parent topic pages (SEO preservation)
      { source: '/topics/alternative-investments/:subtopic', destination: '/topics/alternative-investments', permanent: true },
      { source: '/topics/corporate-issuers/:subtopic', destination: '/topics/corporate-issuers', permanent: true },
      { source: '/topics/derivatives/:subtopic', destination: '/topics/derivatives', permanent: true },
      { source: '/topics/economics/:subtopic', destination: '/topics/economics', permanent: true },
      { source: '/topics/equity-investments/:subtopic', destination: '/topics/equity-investments', permanent: true },
      { source: '/topics/ethical-professional-standards/:subtopic', destination: '/topics/ethical-professional-standards', permanent: true },
      { source: '/topics/financial-statement-analysis/:subtopic', destination: '/topics/financial-statement-analysis', permanent: true },
      { source: '/topics/fixed-income/:subtopic', destination: '/topics/fixed-income', permanent: true },
      { source: '/topics/portfolio-management/:subtopic', destination: '/topics/portfolio-management', permanent: true },
      { source: '/topics/quantitative-methods/:subtopic', destination: '/topics/quantitative-methods', permanent: true },

      // Topic URL canonicalization (dedicated pages use different URL patterns)
      { source: '/topics/cfa-level-1-ethics', destination: '/topics/ethical-professional-standards', permanent: true },
      { source: '/topics/cfa-level-1-ethics/:subtopic', destination: '/topics/ethical-professional-standards', permanent: true },

      // Other legacy pages
      { source: '/compare/:slug', destination: '/resources', permanent: true },
      { source: '/compare', destination: '/resources', permanent: true },
      { source: '/free-questions/derivatives', destination: '/cfa-level-1-practice-questions?topic=derivatives', permanent: true },
      { source: '/free-questions/fixed-income', destination: '/cfa-level-1-practice-questions?topic=fixed-income', permanent: true },
      { source: '/free-questions/alternative-investments', destination: '/cfa-level-1-practice-questions?topic=alternative-investments', permanent: true },
      { source: '/free-questions/financial-statement-analysis', destination: '/cfa-level-1-practice-questions?topic=financial-statement-analysis', permanent: true },
      { source: '/free-questions/:topic', destination: '/cfa-level-1-practice-questions', permanent: true },
      { source: '/free-questions', destination: '/cfa-level-1-practice-questions', permanent: true },
      { source: '/study-guides', destination: '/blog', permanent: true },
    ]
  },
};

export default nextConfig;
