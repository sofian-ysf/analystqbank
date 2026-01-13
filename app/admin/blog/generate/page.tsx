'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  slug: string
}

interface TopicSuggestion {
  title: string
  description: string
  keywords: string[]
}

function BlogGenerateContent() {
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [topic, setTopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const [referenceUrl, setReferenceUrl] = useState('')
  const [wordCount, setWordCount] = useState(1500)
  const [includeFaq, setIncludeFaq] = useState(true)
  const [enhanceContent, setEnhanceContent] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [suggestingTopics, setSuggestingTopics] = useState(false)
  const [suggestions, setSuggestions] = useState<TopicSuggestion[]>([])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('admin_logged_in')
    if (!isAdminLoggedIn) {
      router.push('/admin/login')
      return
    }

    fetchCategories()
  }, [router])

  useEffect(() => {
    const categoryFromUrl = searchParams.get('category')
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl)
    }
  }, [searchParams])

  async function fetchCategories() {
    try {
      const res = await fetch('/api/admin/blog/categories')
      const data = await res.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Failed to fetch categories:', error)
    }
  }

  async function handleSuggestTopics() {
    if (!selectedCategory) {
      setError('Please select a category first')
      return
    }

    setSuggestingTopics(true)
    setError('')
    setSuggestions([])

    try {
      const res = await fetch('/api/admin/blog/suggest-topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category_id: selectedCategory }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to suggest topics')
      }

      setSuggestions(data.topics || [])
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to suggest topics')
    } finally {
      setSuggestingTopics(false)
    }
  }

  function selectSuggestion(suggestion: TopicSuggestion) {
    setTopic(suggestion.title)
    setKeywords(suggestion.keywords.join(', '))
  }

  async function handleGenerate() {
    if (!selectedCategory || !topic) {
      setError('Please select a category and enter a topic')
      return
    }

    setGenerating(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/admin/blog/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category_id: selectedCategory,
          topic,
          keywords: keywords.split(',').map(k => k.trim()).filter(k => k),
          word_count: wordCount,
          include_faq: includeFaq,
          enhance_content: enhanceContent,
          reference_url: referenceUrl || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate blog post')
      }

      setSuccess(`Blog post "${data.post.title}" generated successfully!`)
      setTopic('')
      setKeywords('')
      setReferenceUrl('')
      setSuggestions([])

      // Redirect to the post edit page after a short delay
      setTimeout(() => {
        router.push(`/admin/blog/posts/${data.post.id}`)
      }, 2000)

    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate blog post')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Generate Blog Post</h1>
            <p className="text-gray-400 mt-1">AI-powered SEO-optimized content generation</p>
          </div>
          <Link
            href="/admin/blog"
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Blog
          </Link>
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

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                setSuggestions([])
              }}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Topic Suggestions */}
          {selectedCategory && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Topic Suggestions
                </label>
                <button
                  onClick={handleSuggestTopics}
                  disabled={suggestingTopics}
                  className="text-sm text-blue-400 hover:text-blue-300 disabled:opacity-50"
                >
                  {suggestingTopics ? 'Generating...' : 'Get AI Suggestions'}
                </button>
              </div>

              {suggestions.length > 0 && (
                <div className="space-y-2 mb-4">
                  {suggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectSuggestion(suggestion)}
                      className="w-full text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <p className="font-medium text-white">{suggestion.title}</p>
                      <p className="text-sm text-gray-400 mt-1">{suggestion.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {suggestion.keywords.map((kw, i) => (
                          <span key={i} className="text-xs bg-gray-600 text-gray-300 px-2 py-0.5 rounded">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Topic Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Topic / Title
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., How to Calculate Time Value of Money for CFA Level 1"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Target Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., time value of money, present value, future value, CFA exam"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Reference URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Reference URL (optional)
            </label>
            <input
              type="url"
              value={referenceUrl}
              onChange={(e) => setReferenceUrl(e.target.value)}
              placeholder="e.g., https://example.com/article-to-use-as-inspiration"
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Provide a URL to use as inspiration. The AI will create original content based on the structure and topics covered.
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Word Count
              </label>
              <select
                value={wordCount}
                onChange={(e) => setWordCount(parseInt(e.target.value))}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value={1000}>~1,000 words</option>
                <option value={1500}>~1,500 words</option>
                <option value={2000}>~2,000 words</option>
                <option value={2500}>~2,500 words</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFaq}
                  onChange={(e) => setIncludeFaq(e.target.checked)}
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600"
                />
                <span className="text-sm text-gray-300">Include FAQ Section</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enhanceContent}
                  onChange={(e) => setEnhanceContent(e.target.checked)}
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600"
                />
                <span className="text-sm text-gray-300">Enhance with GPT-4o-mini</span>
              </label>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={generating || !selectedCategory || !topic}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
          >
            {generating ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating... (this may take 30-60 seconds)
              </span>
            ) : (
              'Generate Blog Post'
            )}
          </button>

          {/* Info */}
          <div className="p-4 bg-gray-700 rounded-lg">
            <h4 className="font-medium text-white mb-2">How it works:</h4>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>1. Select a CFA topic category</li>
              <li>2. Get AI-suggested topics or enter your own</li>
              <li>3. Add target keywords for SEO optimization</li>
              <li>4. Generate a full blog post with FAQs and meta data</li>
              <li>5. Review, edit, and publish when ready</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BlogGeneratePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <BlogGenerateContent />
    </Suspense>
  )
}
