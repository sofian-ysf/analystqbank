'use client'

import Link from 'next/link'
import ArticleSVG from './ArticleSVG'
import Navigation from '../components/Navigation'
import { BlogCTABox } from '@/components/BlogCTA'
import FloatingGetStartedButton from '../components/FloatingGetStartedButton'
import './blog-styles.css'

interface Category {
  id: string
  slug: string
  name: string
}

interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  featured_image?: string
  author_name: string
  read_time_minutes: number
  tags: string[]
  featured: boolean
  published_at: string
  blog_categories: { id: string; slug: string; name: string } | null
}

interface BlogClientProps {
  posts: Post[]
  categories: Category[]
  currentPage: number
  totalPages: number
}

// Format date helper
function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return ''
  }
}

export default function BlogClient({ posts, currentPage, totalPages }: BlogClientProps) {
  const featuredPost = currentPage === 1 ? posts[0] : null
  const remainingPosts = currentPage === 1 ? posts.slice(1) : posts

  return (
    <>
      <Navigation />
      <main className="blog-page">
        <div className="blog-container">
        {posts.length === 0 ? (
          <div className="empty-state">
            <h3>No Articles Found</h3>
            <p>Check back soon for new CFA exam insights and study tips.</p>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <section className="featured-post">
                <Link href={`/blog/${featuredPost.slug}`} className="featured-post-link">
                  <div className="featured-post-image-wrapper">
                    {featuredPost.featured_image ? (
                      <img
                        src={featuredPost.featured_image}
                        alt={featuredPost.title}
                      />
                    ) : (
                      <ArticleSVG index={0} />
                    )}
                  </div>
                  <div className="featured-post-content">
                    <h2 className="featured-post-title">{featuredPost.title}</h2>
                    <p className="featured-post-description">{featuredPost.excerpt}</p>
                    <p className="featured-post-meta">
                      {formatDate(featuredPost.published_at)} &middot; {featuredPost.read_time_minutes} min read
                    </p>
                    <span className="featured-post-button">READ MORE &rarr;</span>
                  </div>
                </Link>
              </section>
            )}

            {/* CTA Section */}
            <BlogCTABox />

            {/* Blog Grid */}
            {remainingPosts.length > 0 && (
              <section className="blog-grid-section">
                <div className="blog-grid">
                  {remainingPosts.map((post, index) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="blog-card"
                    >
                      <div className="blog-card-image-wrapper">
                        {post.featured_image ? (
                          <img
                            src={post.featured_image}
                            alt={post.title}
                          />
                        ) : (
                          <ArticleSVG index={index + 1} />
                        )}
                      </div>
                      <div className="blog-card-content">
                        <h3 className="blog-card-title">{post.title}</h3>
                        <p className="blog-card-date">{formatDate(post.published_at)}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-1 mt-8">
                    {currentPage > 1 && (
                      <Link
                        href={`/blog?page=${currentPage - 1}`}
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                      >
                        ← Previous
                      </Link>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1).reduce((acc: (number | 'ellipsis')[], page) => {
                      // Always show first page
                      if (page === 1) {
                        acc.push(page)
                        return acc
                      }
                      // Always show last page
                      if (page === totalPages) {
                        acc.push(page)
                        return acc
                      }
                      // Show page if within 1 of current
                      if (page <= currentPage + 1 && page >= currentPage - 1) {
                        acc.push(page)
                        return acc
                      }
                      // Add ellipsis if we haven't already and this is a gap
                      const lastItem = acc[acc.length - 1]
                      if (lastItem !== 'ellipsis' && (page === currentPage + 2 || page === currentPage - 2)) {
                        acc.push('ellipsis')
                      }
                      return acc
                    }, []).map((item, idx) =>
                      item === 'ellipsis' ? (
                        <span key={`ellipsis-${idx}`} className="px-2 py-2 text-gray-400">…</span>
                      ) : (
                        <Link
                          key={item}
                          href={`/blog?page=${item}`}
                          className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg transition-colors text-sm font-medium ${
                            item === currentPage
                              ? 'bg-[#1FB8CD] text-white'
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {item}
                        </Link>
                      )
                    )}

                    {currentPage < totalPages && (
                      <Link
                        href={`/blog?page=${currentPage + 1}`}
                        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                      >
                        Next →
                      </Link>
                    )}
                  </div>
                )}
              </section>
            )}

            {/* Resources Section */}
            <section className="py-12 border-t border-gray-200 mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">CFA Level 1 Study Resources</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link href="/cfa-level-1-practice-questions" className="p-5 bg-white rounded-xl border border-gray-200 hover:border-[#1FB8CD] transition-colors group">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#1FB8CD]">Practice Questions</h3>
                  <p className="text-gray-600 text-sm">2,500+ exam-style questions</p>
                </Link>
                <Link href="/cfa-level-1-mock-exam" className="p-5 bg-white rounded-xl border border-gray-200 hover:border-[#1FB8CD] transition-colors group">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#1FB8CD]">Mock Exams</h3>
                  <p className="text-gray-600 text-sm">Full 180-question mocks</p>
                </Link>
                <Link href="/flashcards" className="p-5 bg-white rounded-xl border border-gray-200 hover:border-[#1FB8CD] transition-colors group">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#1FB8CD]">Free Flashcards</h3>
                  <p className="text-gray-600 text-sm">1,600+ cards - 100% free</p>
                </Link>
              </div>
            </section>

          <FloatingGetStartedButton />
        </>
      )}
      </div>
    </main>
  </>
)
}
