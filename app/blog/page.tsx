import { createClient } from '@/app/lib/supabase/server'
import BlogClient from './BlogClient'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'CFA Blog | Study Tips & Career Advice | AnalystTrainer',
  description: 'Expert CFA exam insights, study tips, and career guidance for CFA Level 1 exam preparation. Stay updated with the latest exam strategies and finance updates.',
  keywords: 'CFA exam blog, CFA study tips, CFA Level 1 advice, finance career guidance, exam strategies',
  openGraph: {
    title: 'CFA Blog | Study Tips & Career Advice | AnalystTrainer',
    description: 'Expert CFA exam insights, study tips, and career guidance for CFA Level 1 exam preparation.',
    type: 'website',
  },
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {
  const supabase = await createClient()

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
