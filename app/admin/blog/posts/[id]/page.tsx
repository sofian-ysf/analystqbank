'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  status: string
  category_id: string
  meta_title: string
  meta_description: string
  meta_keywords: string[]
  tags: string[]
  faq_items: { question: string; answer: string }[]
  read_time_minutes: number
  author_name: string
  created_at: string
  published_at: string | null
  blog_categories: { id: string; name: string }
}

interface Category {
  id: string
  name: string
}

export default function EditPostPage() {
  const [post, setPost] = useState<Post | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const router = useRouter()
  const params = useParams()
  const postId = params.id as string

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('admin_logged_in')
    if (!isAdminLoggedIn) {
      router.push('/admin/login')
      return
    }

    fetchData()
  }, [router, postId])

  async function fetchData() {
    try {
      const [postRes, catRes] = await Promise.all([
        fetch(`/api/admin/blog/posts/${postId}`),
        fetch('/api/admin/blog/categories'),
      ])

      const postData = await postRes.json()
      const catData = await catRes.json()

      if (!postRes.ok) {
        throw new Error(postData.error || 'Failed to fetch post')
      }

      setPost(postData.post)
      setCategories(catData.categories || [])
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load post')
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    if (!post) return

    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`/api/admin/blog/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category_id: post.category_id,
          meta_title: post.meta_title,
          meta_description: post.meta_description,
          meta_keywords: post.meta_keywords,
          tags: post.tags,
          faq_items: post.faq_items,
          author_name: post.author_name,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save')
      }

      setSuccess('Post saved successfully!')
      setPost(data.post)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  async function handlePublish() {
    setSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/blog/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'published' }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to publish')
      }

      setSuccess('Post published successfully!')
      setPost(data.post)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to publish')
    } finally {
      setSaving(false)
    }
  }

  async function handleUnpublish() {
    setSaving(true)
    setError('')

    try {
      const res = await fetch(`/api/admin/blog/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'draft' }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to unpublish')
      }

      setSuccess('Post unpublished successfully!')
      setPost(data.post)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to unpublish')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Post not found</h1>
          <Link href="/admin/blog/posts" className="text-blue-400 hover:text-blue-300">
            Back to posts
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Edit Post</h1>
            <p className="text-gray-400 mt-1">
              {post.status === 'published' ? (
                <span className="text-green-400">Published</span>
              ) : (
                <span className="text-yellow-400">Draft</span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {post.status === 'draft' ? (
              <button
                onClick={handlePublish}
                disabled={saving}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg"
              >
                Publish
              </button>
            ) : (
              <button
                onClick={handleUnpublish}
                disabled={saving}
                className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:opacity-50 text-white rounded-lg"
              >
                Unpublish
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <Link href="/admin/blog/posts" className="text-gray-400 hover:text-white">
              ← Back
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900/50 border border-green-700 text-green-200 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Slug</label>
                <input
                  type="text"
                  value={post.slug}
                  onChange={(e) => setPost({ ...post, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
                <textarea
                  value={post.excerpt}
                  onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Content (Markdown)</label>
                <textarea
                  value={post.content}
                  onChange={(e) => setPost({ ...post, content: e.target.value })}
                  rows={20}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg font-mono text-sm"
                />
              </div>
            </div>

            {/* FAQ Section */}
            {post.faq_items && post.faq_items.length > 0 && (
              <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">FAQ Items</h3>
                <div className="space-y-4">
                  {post.faq_items.map((faq, idx) => (
                    <div key={idx} className="bg-gray-700 p-4 rounded-lg">
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const newFaqs = [...post.faq_items]
                          newFaqs[idx].question = e.target.value
                          setPost({ ...post, faq_items: newFaqs })
                        }}
                        placeholder="Question"
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 text-white rounded mb-2"
                      />
                      <textarea
                        value={faq.answer}
                        onChange={(e) => {
                          const newFaqs = [...post.faq_items]
                          newFaqs[idx].answer = e.target.value
                          setPost({ ...post, faq_items: newFaqs })
                        }}
                        placeholder="Answer"
                        rows={3}
                        className="w-full px-3 py-2 bg-gray-600 border border-gray-500 text-white rounded"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">Settings</h3>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                <select
                  value={post.category_id}
                  onChange={(e) => setPost({ ...post, category_id: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
                <input
                  type="text"
                  value={post.author_name}
                  onChange={(e) => setPost({ ...post, author_name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={post.tags?.join(', ') || ''}
                  onChange={(e) => setPost({
                    ...post,
                    tags: e.target.value.split(',').map(t => t.trim()).filter(t => t)
                  })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
                />
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">SEO</h3>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Meta Title</label>
                <input
                  type="text"
                  value={post.meta_title || ''}
                  onChange={(e) => setPost({ ...post, meta_title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">{(post.meta_title || '').length}/60</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Meta Description</label>
                <textarea
                  value={post.meta_description || ''}
                  onChange={(e) => setPost({ ...post, meta_description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-1">{(post.meta_description || '').length}/155</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Meta Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={post.meta_keywords?.join(', ') || ''}
                  onChange={(e) => setPost({
                    ...post,
                    meta_keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                  })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg"
                />
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Info</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-400">Created</dt>
                  <dd className="text-white">{new Date(post.created_at).toLocaleDateString()}</dd>
                </div>
                {post.published_at && (
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Published</dt>
                    <dd className="text-white">{new Date(post.published_at).toLocaleDateString()}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-gray-400">Read Time</dt>
                  <dd className="text-white">{post.read_time_minutes} min</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
