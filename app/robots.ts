import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/practice/',
          '/profile/',
          '/settings/',
          '/admin/',
          '/api/',
          '/auth/',
        ],
      },
      // Explicitly allow AI crawlers
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/dashboard/', '/practice/', '/profile/', '/settings/', '/admin/', '/api/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/dashboard/', '/practice/', '/profile/', '/settings/', '/admin/', '/api/'],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/dashboard/', '/practice/', '/profile/', '/settings/', '/admin/', '/api/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/dashboard/', '/practice/', '/profile/', '/settings/', '/admin/', '/api/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
        disallow: ['/dashboard/', '/practice/', '/profile/', '/settings/', '/admin/', '/api/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/dashboard/', '/practice/', '/profile/', '/settings/', '/admin/', '/api/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/dashboard/', '/practice/', '/profile/', '/settings/', '/admin/', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/dashboard/', '/practice/', '/profile/', '/settings/', '/admin/', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/dashboard/', '/practice/', '/profile/', '/settings/', '/admin/', '/api/'],
      },
    ],
    sitemap: 'https://financeexamprep.co.uk/sitemap.xml',
  }
}
