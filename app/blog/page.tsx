import { createAdminClient } from '@/lib/supabase'
import BlogClient from './BlogClient'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'CFA Level 1 Blog | Study Tips & Exam Strategies 2026',
  description: 'Free CFA Level 1 study tips, exam strategies, and topic guides written by charterholders. Learn how to pass CFA Level 1 on your first attempt.',
  keywords: 'CFA exam blog, CFA study tips, CFA Level 1 advice, how to pass CFA Level 1, CFA exam strategies, CFA preparation tips',
  openGraph: {
    title: 'CFA Level 1 Blog | Free Study Tips & Exam Strategies',
    description: 'Free CFA Level 1 study tips and exam strategies written by charterholders. Updated for 2026.',
    type: 'website',
  },
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  const supabase = createAdminClient()

  // Fetch published posts
  const { data: postsData, error: postsError } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (postsError) {
    console.error('Blog posts fetch error:', postsError)
  }
  console.log('Posts fetched:', postsData?.length || 0, 'posts')

  // Transform posts
  const posts = (postsData || []).map(post => ({
    ...post,
    blog_categories: null
  }))

  // Fetch categories
  const { data: categories } = await supabase
    .from('blog_categories')
    .select('id, slug, name')
    .order('sort_order')

  return <BlogClient posts={posts} categories={categories || []} />
}
