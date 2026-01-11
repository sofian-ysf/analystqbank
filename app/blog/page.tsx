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
  const { data: postsData } = await supabase
    .from('blog_posts')
    .select(`
      id,
      slug,
      title,
      excerpt,
      featured_image,
      author_name,
      read_time_minutes,
      tags,
      featured,
      published_at,
      blog_categories (id, slug, name)
    `)
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  // Transform posts to flatten blog_categories (Supabase returns it as array)
  const posts = (postsData || []).map(post => ({
    ...post,
    blog_categories: Array.isArray(post.blog_categories)
      ? post.blog_categories[0] || null
      : post.blog_categories
  }))

  // Fetch categories
  const { data: categories } = await supabase
    .from('blog_categories')
    .select('id, slug, name')
    .order('sort_order')

  return <BlogClient posts={posts} categories={categories || []} />
}
