import { createAdminClient } from '@/lib/supabase'
import BlogClient from './BlogClient'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

const POSTS_PER_PAGE = 10

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

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const supabase = createAdminClient()

  const params = await searchParams
  const currentPage = Math.max(1, parseInt(params.page || '1', 10))
  const offset = (currentPage - 1) * POSTS_PER_PAGE

  // Fetch total count of published posts
  const { count } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const totalPosts = count || 0
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  // Fetch posts for current page
  const { data: postsData, error: postsError } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .range(offset, offset + POSTS_PER_PAGE - 1)

  if (postsError) {
    console.error('Blog posts fetch error:', postsError)
  }
  console.log('Posts fetched:', postsData?.length || 0, 'posts for page', currentPage)

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

  return (
    <BlogClient
      posts={posts}
      categories={categories || []}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  )
}
