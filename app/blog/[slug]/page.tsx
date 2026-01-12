import { createAdminClient } from '@/lib/supabase'
import { createClient as createBrowserClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import ArticleSVG from '../ArticleSVG'
import { generateSVGIndex } from '../utils'
import Navigation from '../../components/Navigation'
import './article.css'

interface Props {
  params: Promise<{ slug: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = createAdminClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, meta_title, meta_description, meta_keywords, og_image, excerpt')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    keywords: post.meta_keywords?.join(', '),
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      images: post.og_image ? [post.og_image] : undefined,
      type: 'article',
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  }
}

// Revalidate pages every 60 seconds
export const revalidate = 60

// Generate static params for all published posts
export async function generateStaticParams() {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published')

  return posts?.map(post => ({ slug: post.slug })) || []
}

// Format date helper
function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return ''
  }
}

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  if (!markdown) return ''

  // Normalize line endings and remove excessive indentation
  let html = markdown
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => line.replace(/^[\t ]+/, '')) // Remove leading whitespace from each line
    .join('\n')

  html = html
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
    .replace(/^\d+\.\s+(.*$)/gim, '<li>$1</li>') // Handle numbered lists
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')

  html = '<p>' + html + '</p>'
  html = html.replace(/<p><\/p>/g, '')
  html = html.replace(/<p>(<h[123]>)/g, '$1')
  html = html.replace(/(<\/h[123]>)<\/p>/g, '$1')
  html = html.replace(/<p>(<li>)/g, '<ul>$1')
  html = html.replace(/(<\/li>)<\/p>/g, '$1</ul>')
  // Clean up any remaining empty paragraphs
  html = html.replace(/<p>\s*<\/p>/g, '')

  return html
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const supabase = createAdminClient()

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select(`
      *,
      blog_categories (id, slug, name)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !post) {
    notFound()
  }

  // Fetch related posts
  const { data: relatedPosts } = await supabase
    .from('blog_posts')
    .select('id, slug, title, featured_image, read_time_minutes')
    .eq('category_id', post.category_id)
    .neq('id', post.id)
    .eq('status', 'published')
    .limit(3)

  // Build article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.meta_description || post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author_name
    },
    "publisher": {
      "@type": "Organization",
      "name": "AnalystTrainer",
      "url": "https://www.analysttrainer.com"
    },
    "datePublished": post.published_at,
    "dateModified": post.updated_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.analysttrainer.com/blog/${post.slug}`
    },
    ...(post.featured_image && { "image": post.featured_image }),
  }

  // Parse FAQ items (may be stored as string or array)
  const faqItems: { question: string; answer: string }[] = (() => {
    if (!post.faq_items) return []
    if (Array.isArray(post.faq_items)) return post.faq_items
    if (typeof post.faq_items === 'string') {
      try {
        const parsed = JSON.parse(post.faq_items)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    }
    return []
  })()

  // FAQ schema
  const faqSchema = faqItems.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null

  // Parse tags (may be stored as string or array)
  const tags: string[] = (() => {
    if (!post.tags) return []
    if (Array.isArray(post.tags)) return post.tags
    if (typeof post.tags === 'string') {
      try {
        const parsed = JSON.parse(post.tags)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    }
    return []
  })()

  // Share URL
  const shareUrl = `https://www.analysttrainer.com/blog/${slug}`
  const svgIndex = generateSVGIndex(slug)

  return (
    <>
      <Navigation />
      <main className="blog-detail-page">
        {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Navigation */}
      <nav className="blog-detail-nav">
        <Link href="/blog" className="nav-back-link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back
        </Link>
      </nav>

      <article>
        {/* Header Image/SVG */}
        <div className="blog-detail-header-image">
          {post.featured_image ? (
            <img src={post.featured_image} alt={post.title} />
          ) : (
            <ArticleSVG index={svgIndex} />
          )}
        </div>

        <div className="blog-detail-content">
          <header className="blog-detail-header">
            {/* Meta Section */}
            <div className="blog-detail-meta">
              <div className="blog-detail-meta-info">
                <div className="blog-detail-meta-item">
                  <span className="blog-detail-meta-label">Written by</span>
                  <span className="blog-detail-meta-value">{post.author_name || 'AnalystTrainer'}</span>
                </div>
                <div className="blog-detail-meta-item">
                  <span className="blog-detail-meta-label">Published on</span>
                  <time className="blog-detail-meta-value" dateTime={post.published_at || post.created_at}>
                    {formatDate(post.published_at || post.created_at)}
                  </time>
                </div>
              </div>
              <div className="blog-detail-social-buttons">
                <a
                  href="https://www.linkedin.com/company/analysttrainer/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-detail-social-button"
                  aria-label="Follow us on LinkedIn"
                >
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
            <h1 className="blog-detail-title">{post.title}</h1>
          </header>

          {/* Article Body */}
          <div className="blog-detail-body">
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content || '') }}
            />
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="blog-tags-section">
              <h3>Tags</h3>
              <div className="blog-tags">
                {tags.map((tag) => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Section */}
          {faqItems.length > 0 && (
            <div className="faq-section">
              <h2>Frequently Asked Questions</h2>
              {faqItems.map((faq, index) => (
                <div key={index} className="faq-item">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <footer className="blog-detail-footer">
            <Link href="/blog" className="back-link">&larr; Back to Articles</Link>
          </footer>
        </div>
      </article>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="related-posts-section">
            <div className="related-posts-container">
              <h2>Related Articles</h2>
              <div className="related-posts-grid">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="related-post-card"
                  >
                    <div className="related-post-image">
                      {relatedPost.featured_image ? (
                        <img src={relatedPost.featured_image} alt={relatedPost.title} />
                      ) : (
                        <ArticleSVG index={generateSVGIndex(relatedPost.slug)} />
                      )}
                    </div>
                    <h3 className="related-post-title">{relatedPost.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}
