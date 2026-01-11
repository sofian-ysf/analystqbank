import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/app/lib/supabase/server'
import { buildBlogContext } from '@/lib/blog-rag'
import { generateEnhancedBlogPost } from '@/lib/openai'

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
      enhance_content = true
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
      // Build context from uploaded resources
      const context = await buildBlogContext(supabase, category_id, topic)

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
          enhance_content
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
        enhance_content
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
