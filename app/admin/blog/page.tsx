'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Category {
  id: string
  name: string
  slug: string
  resource_count: number
  post_count: number
  published_count: number
  draft_count: number
}

interface Post {
  id: string
  title: string
  slug: string
  status: string
  created_at: string
  blog_categories: { name: string }
}

interface Job {
  id: string
  topic: string
  status: string
  created_at: string
  blog_categories: { name: string }
}

export default function BlogDashboardPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [recentPosts, setRecentPosts] = useState<Post[]>([])
  const [recentJobs, setRecentJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('admin_logged_in')
    if (!isAdminLoggedIn) {
      router.push('/admin/login')
      return
    }

    fetchData()
  }, [router])

  async function fetchData() {
    try {
      const [categoriesRes, postsRes, jobsRes] = await Promise.all([
        fetch('/api/admin/blog/categories'),
        fetch('/api/admin/blog/posts?limit=5'),
        fetch('/api/admin/blog/generate'),
      ])

      const [categoriesData, postsData, jobsData] = await Promise.all([
        categoriesRes.json(),
        postsRes.json(),
        jobsRes.json(),
      ])

      setCategories(categoriesData.categories || [])
      setRecentPosts(postsData.posts || [])
      setRecentJobs(jobsData.jobs || [])
    } catch (error) {
      console.error('Failed to fetch blog data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  const totalPosts = categories.reduce((sum, c) => sum + c.post_count, 0)
  const totalPublished = categories.reduce((sum, c) => sum + c.published_count, 0)
  const totalDrafts = categories.reduce((sum, c) => sum + c.draft_count, 0)
  const totalResources = categories.reduce((sum, c) => sum + c.resource_count, 0)

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Blog Management</h1>
            <p className="text-gray-400 mt-1">Create and manage SEO-optimized CFA exam prep articles</p>
          </div>
          <Link
            href="/admin/dashboard"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <p className="text-sm font-medium text-gray-400">Total Posts</p>
            <p className="text-3xl font-bold text-white mt-1">{totalPosts}</p>
          </div>
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <p className="text-sm font-medium text-gray-400">Published</p>
            <p className="text-3xl font-bold text-green-400 mt-1">{totalPublished}</p>
          </div>
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <p className="text-sm font-medium text-gray-400">Drafts</p>
            <p className="text-3xl font-bold text-yellow-400 mt-1">{totalDrafts}</p>
          </div>
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <p className="text-sm font-medium text-gray-400">Resources</p>
            <p className="text-3xl font-bold text-blue-400 mt-1">{totalResources}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4">
          <Link
            href="/admin/blog/generate"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Generate New Post
          </Link>
          <Link
            href="/admin/blog/posts"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            All Posts
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Posts */}
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
              <h2 className="font-semibold text-white">Recent Posts</h2>
              <Link href="/admin/blog/posts" className="text-sm text-gray-400 hover:text-white">
                View all
              </Link>
            </div>
            <div className="divide-y divide-gray-700">
              {recentPosts.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-500">
                  No posts yet. Generate your first blog post!
                </div>
              ) : (
                recentPosts.map((post) => (
                  <div key={post.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <Link href={`/admin/blog/posts/${post.id}`} className="font-medium text-white hover:text-blue-400">
                        {post.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {post.blog_categories?.name} &middot; {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      post.status === 'published' ? 'bg-green-900 text-green-300' :
                      post.status === 'draft' ? 'bg-gray-700 text-gray-300' :
                      'bg-yellow-900 text-yellow-300'
                    }`}>
                      {post.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Generation Jobs */}
          <div className="bg-gray-800 rounded-xl border border-gray-700">
            <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
              <h2 className="font-semibold text-white">Recent Generations</h2>
              <Link href="/admin/blog/generate" className="text-sm text-gray-400 hover:text-white">
                Generate new
              </Link>
            </div>
            <div className="divide-y divide-gray-700">
              {recentJobs.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-500">
                  No generation jobs yet.
                </div>
              ) : (
                recentJobs.slice(0, 5).map((job) => (
                  <div key={job.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">{job.topic}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {job.blog_categories?.name} &middot; {new Date(job.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      job.status === 'completed' ? 'bg-green-900 text-green-300' :
                      job.status === 'processing' ? 'bg-blue-900 text-blue-300' :
                      job.status === 'failed' ? 'bg-red-900 text-red-300' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Categories Overview */}
        <div className="bg-gray-800 rounded-xl border border-gray-700">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="font-semibold text-white">Blog Categories</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Resources</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Posts</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Published</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-white">{category.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {category.resource_count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {category.post_count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {category.published_count}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <Link
                        href={`/admin/blog/generate?category=${category.id}`}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Generate
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
