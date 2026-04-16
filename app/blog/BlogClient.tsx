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

export default function BlogClient({ posts }: BlogClientProps) {
  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

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
