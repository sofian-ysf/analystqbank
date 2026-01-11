'use client'

import Link from 'next/link'
import ArticleSVG from './ArticleSVG'
import Navigation from '../components/Navigation'
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
          </>
        )}
        </div>
      </main>
    </>
  )
}
