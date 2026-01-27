import { MetadataRoute } from 'next'
import { cfaLevel1Curriculum } from '@/lib/curriculum'
import { createAdminClient } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.analysttrainer.com'

  // Static public pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/study-guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/formula-sheets`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mock-exams`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/question-bank`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

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

  // Subtopic pages (77+ pages)
  const subtopicPages: MetadataRoute.Sitemap = cfaLevel1Curriculum.flatMap((topic) =>
    topic.subtopics.map((subtopic) => ({
      url: `${baseUrl}/topics/${topic.id}/${subtopic.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    }))
  )

  // Free questions pages
  const freeQuestionsPages: MetadataRoute.Sitemap = cfaLevel1Curriculum.map((topic) => ({
    url: `${baseUrl}/free-questions/${topic.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Tools pages
  const toolsPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/tools/tvm-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/financial-ratios`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/bond-calculator`,
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
    {
      url: `${baseUrl}/tools/study-estimator`,
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
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cfa-level-1-mock-exam`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/free-cfa-questions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // FAQ pages
  const faqPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...cfaLevel1Curriculum.map((topic) => ({
      url: `${baseUrl}/faq/${topic.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  // Glossary index
  const glossaryIndex: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/glossary`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Blog posts
  let blogPages: MetadataRoute.Sitemap = []
  try {
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
    ...topicsHub,
    ...topicPages,
    ...subtopicPages,
    ...freeQuestionsPages,
    ...toolsPages,
    ...landingPages,
    ...faqPages,
    ...glossaryIndex,
    ...blogPages,
  ]
}
