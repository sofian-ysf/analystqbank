import { MetadataRoute } from 'next'
import { cfaLevel1Curriculum } from '@/lib/curriculum-data'
import { createAdminClient } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.analysttrainer.com'

  // Static pages (same for all environments)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/flashcards`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/question-bank`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mock-exams`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/formula-sheets`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/try-free`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
  // Note: /login, /signup, /forgot-password excluded (noindex)
  // Note: /features, /resources, /study-guides removed (redirected to homepage - legacy URLs)

  // Topics hub page
  const topicsHub: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/topics`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Topic landing pages (10 pages)
  const topicPages: MetadataRoute.Sitemap = cfaLevel1Curriculum.map((topic) => ({
    url: `${baseUrl}/topics/${topic.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Note: Subtopic pages (/topics/:topic/:subtopic) removed - routes redirect to parent topic
  // Note: Free questions pages (/free-questions/:topic) removed - routes redirect to /free-cfa-questions

  // FAQ topic-specific pages
  const faqPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/faq/alternative-investments`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq/corporate-issuers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq/economics`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq/equity-investments`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq/ethical-professional-standards`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq/fixed-income`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq/portfolio-management`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq/quantitative-methods`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  // Tools pages
  const toolsPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/tools/financial-ratios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/study-estimator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/portfolio-variance`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Compare pages
  const comparePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/compare/cfa-vs-frm`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // SEO landing pages
  const landingPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/cfa-level-1-practice-questions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/cfa-level-1-mock-exam`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/free-cfa-questions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]


  // Blog posts - only fetch if admin client is available
  let blogPages: MetadataRoute.Sitemap = []
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createAdminClient()
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('slug, updated_at, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })

      if (posts) {
        blogPages = [
          {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
          },
          ...posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updated_at || post.published_at),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          })),
        ]
      }
    } else {
      // Env vars not set during build - return just the blog index
      blogPages = [
        {
          url: `${baseUrl}/blog`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.8,
        },
      ]
    }
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error)
    blogPages = [
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      },
    ]
  }

  return [
    ...staticPages,
    ...faqPages,
    ...toolsPages,
    ...comparePages,
    ...topicsHub,
    ...topicPages,
    ...landingPages,
    ...blogPages,
  ]
}
