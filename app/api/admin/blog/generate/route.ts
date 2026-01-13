import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/app/lib/supabase/server'
import { buildBlogContext } from '@/lib/blog-rag'
import { generateEnhancedBlogPost, InternalLinksData } from '@/lib/openai'
import { submitToSearchEngines } from '@/lib/search-indexing'

// Helper to fetch and extract text content from a URL
async function fetchUrlContent(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; AnalystTrainer/1.0)',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`)
    }

    const html = await response.text()

    // Strip HTML tags and extract text content
    let text = html
      // Remove script and style tags with content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      // Remove HTML comments
      .replace(/<!--[\s\S]*?-->/g, '')
      // Remove HTML tags
      .replace(/<[^>]+>/g, ' ')
      // Decode HTML entities
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      // Clean up whitespace
      .replace(/\s+/g, ' ')
      .trim()

    // Limit to ~10000 chars to avoid token limits
    if (text.length > 10000) {
      text = text.slice(0, 10000) + '...'
    }

    return text
  } catch (error) {
    console.error('Error fetching URL content:', error)
    throw new Error(`Failed to fetch content from URL: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// GET - List recent generation jobs
export async function GET() {
  try {
    const supabase = await createClient()

    const { data: jobs, error } = await supabase
      .from('blog_generation_jobs')
      .select(`
        *,
        blog_categories (name)
      `)
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) throw error

    return NextResponse.json({ jobs: jobs || [] })
  } catch (error) {
    console.error('Get generation jobs error:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}

// POST - Generate a new blog post
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      category_id,
      topic,
      keywords = [],
      word_count = 1500,
      include_faq = true,
      enhance_content = true,
      reference_url
    } = await request.json()

    if (!category_id || !topic) {
      return NextResponse.json({
        error: 'category_id and topic are required'
      }, { status: 400 })
    }

    // Get the category name
    const { data: category } = await supabase
      .from('blog_categories')
      .select('name')
      .eq('id', category_id)
      .single()

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    // Fetch existing published blog posts for internal linking
    const { data: existingPosts } = await supabase
      .from('blog_posts')
      .select('title, slug')
      .eq('status', 'published')
      .limit(20)

    const internalLinks: InternalLinksData = {
      blogPosts: (existingPosts || []).map(post => ({
        title: post.title,
        url: `/blog/${post.slug}`
      })),
      ctaLinks: [] // Using default CTA links from openai.ts
    }

    console.log(`[Blog Gen] Found ${internalLinks.blogPosts.length} existing posts for internal linking`)

    // Create a generation job to track progress
    const { data: job, error: jobError } = await supabase
      .from('blog_generation_jobs')
      .insert({
        category_id,
        topic,
        keywords,
        status: 'processing',
      })
      .select()
      .single()

    if (jobError) throw jobError

    try {
      // Build context from Pinecone RAG
      let context = await buildBlogContext(supabase, category_id, topic)

      // If a reference URL is provided, fetch and add its content
      let referenceContent = ''
      if (reference_url) {
        console.log(`[Blog Gen] Fetching reference URL: ${reference_url}`)
        referenceContent = await fetchUrlContent(reference_url)
        console.log(`[Blog Gen] Fetched ${referenceContent.length} chars from reference URL`)
      }

      // Combine contexts
      if (referenceContent) {
        const referenceSection = `
[REFERENCE ARTICLE - Use as inspiration for structure and topics, but create ORIGINAL content]
${referenceContent}
[END REFERENCE]`
        context = referenceSection + '\n\n' + (context || '')
      }

      if (!context || context.length < 100) {
        // If no resources, use a default context with CFA info
        const defaultContext = `This blog post is about ${topic} in the context of CFA Level 1 exam preparation.
Focus on providing valuable, accurate information for CFA candidates studying for the ${category.name} section of the exam.`

        // Generate the blog post
        const generatedPost = await generateEnhancedBlogPost(
          defaultContext,
          category.name,
          topic,
          keywords,
          word_count,
          include_faq,
          enhance_content,
          internalLinks
        )

        // Create the blog post
        const { data: post, error: postError } = await supabase
          .from('blog_posts')
          .insert({
            category_id,
            slug: generatedPost.slug,
            title: generatedPost.title,
            excerpt: generatedPost.excerpt,
            content: generatedPost.content,
            author_name: 'AnalystTrainer Team',
            read_time_minutes: generatedPost.read_time_minutes,
            tags: generatedPost.tags,
            meta_title: generatedPost.meta_title,
            meta_description: generatedPost.meta_description,
            meta_keywords: generatedPost.meta_keywords,
            faq_items: generatedPost.faq_items,
            status: 'draft',
          })
          .select()
          .single()

        if (postError) throw postError

        // Update job as completed
        await supabase
          .from('blog_generation_jobs')
          .update({
            status: 'completed',
            result_post_id: post.id,
            completed_at: new Date().toISOString()
          })
          .eq('id', job.id)

        return NextResponse.json({ job, post })
      }

      // Generate the blog post with context
      const generatedPost = await generateEnhancedBlogPost(
        context,
        category.name,
        topic,
        keywords,
        word_count,
        include_faq,
        enhance_content,
        internalLinks
      )

      // Create the blog post
      const { data: post, error: postError } = await supabase
        .from('blog_posts')
        .insert({
          category_id,
          slug: generatedPost.slug,
          title: generatedPost.title,
          excerpt: generatedPost.excerpt,
          content: generatedPost.content,
          author_name: 'AnalystTrainer Team',
          read_time_minutes: generatedPost.read_time_minutes,
          tags: generatedPost.tags,
          meta_title: generatedPost.meta_title,
          meta_description: generatedPost.meta_description,
          meta_keywords: generatedPost.meta_keywords,
          faq_items: generatedPost.faq_items,
          status: 'draft',
        })
        .select()
        .single()

      if (postError) throw postError

      // Update job as completed
      await supabase
        .from('blog_generation_jobs')
        .update({
          status: 'completed',
          result_post_id: post.id,
          completed_at: new Date().toISOString()
        })
        .eq('id', job.id)

      return NextResponse.json({ job, post })

    } catch (genError) {
      // Update job as failed
      await supabase
        .from('blog_generation_jobs')
        .update({
          status: 'failed',
          error_message: genError instanceof Error ? genError.message : 'Unknown error',
          completed_at: new Date().toISOString()
        })
        .eq('id', job.id)

      throw genError
    }

  } catch (error) {
    console.error('Blog generation error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Failed to generate blog post'
    }, { status: 500 })
  }
}
