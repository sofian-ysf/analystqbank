import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'
import { buildBlogContext } from '@/lib/blog-rag'
import { generateEnhancedBlogPost, suggestBlogTopics } from '@/lib/openai'

// CFA Level 1 topic areas for automatic blog generation
const CFA_TOPICS = [
  { name: 'Ethical and Professional Standards', keywords: ['CFA ethics', 'standards of practice', 'code of conduct'] },
  { name: 'Quantitative Methods', keywords: ['time value of money', 'statistics', 'probability'] },
  { name: 'Economics', keywords: ['microeconomics', 'macroeconomics', 'monetary policy'] },
  { name: 'Financial Statement Analysis', keywords: ['financial ratios', 'balance sheet', 'income statement'] },
  { name: 'Corporate Issuers', keywords: ['corporate governance', 'capital structure', 'dividends'] },
  { name: 'Equity Investments', keywords: ['stock valuation', 'equity markets', 'industry analysis'] },
  { name: 'Fixed Income', keywords: ['bond valuation', 'interest rates', 'yield curve'] },
  { name: 'Derivatives', keywords: ['options', 'futures', 'forwards', 'swaps'] },
  { name: 'Alternative Investments', keywords: ['private equity', 'real estate', 'hedge funds'] },
  { name: 'Portfolio Management', keywords: ['asset allocation', 'risk management', 'portfolio theory'] },
]

// Verify the cron secret
function verifyCronSecret(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (!cronSecret) {
    console.error('CRON_SECRET not configured')
    return false
  }

  return authHeader === `Bearer ${cronSecret}`
}

export async function GET(request: NextRequest) {
  // Verify cron secret for security
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createAdminClient()

    // Get all categories
    const { data: categories, error: catError } = await supabase
      .from('blog_categories')
      .select('*')
      .order('sort_order', { ascending: true })

    if (catError) throw catError

    // If no categories exist, create them from CFA topics
    if (!categories || categories.length === 0) {
      console.log('No blog categories found, creating from CFA topics...')

      for (let i = 0; i < CFA_TOPICS.length; i++) {
        const topic = CFA_TOPICS[i]
        const slug = topic.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

        await supabase.from('blog_categories').insert({
          name: topic.name,
          slug,
          description: `CFA Level 1 ${topic.name} exam preparation articles`,
          sort_order: i + 1,
        })
      }

      // Re-fetch categories
      const { data: newCategories } = await supabase
        .from('blog_categories')
        .select('*')
        .order('sort_order', { ascending: true })

      if (!newCategories || newCategories.length === 0) {
        return NextResponse.json({ error: 'Failed to create categories' }, { status: 500 })
      }

      // Use the newly created categories
      return await generateBlogForCategory(supabase, newCategories[0], CFA_TOPICS[0].keywords)
    }

    // Find the category with the fewest recent posts
    const { data: postCounts } = await supabase
      .from('blog_posts')
      .select('category_id')
      .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

    const countMap = new Map<string, number>()
    categories.forEach(cat => countMap.set(cat.id, 0))
    postCounts?.forEach(p => {
      countMap.set(p.category_id, (countMap.get(p.category_id) || 0) + 1)
    })

    // Sort categories by post count and pick the one with fewest
    const sortedCategories = [...categories].sort((a, b) =>
      (countMap.get(a.id) || 0) - (countMap.get(b.id) || 0)
    )

    const targetCategory = sortedCategories[0]

    // Find matching CFA topic for keywords
    const cfaTopic = CFA_TOPICS.find(t =>
      t.name.toLowerCase() === targetCategory.name.toLowerCase()
    )
    const keywords = cfaTopic?.keywords || []

    return await generateBlogForCategory(supabase, targetCategory, keywords)

  } catch (error) {
    console.error('Cron blog generation error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Failed to generate blog'
    }, { status: 500 })
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function generateBlogForCategory(supabase: any, category: any, defaultKeywords: string[]) {
  try {
    // Get existing post titles
    const { data: existingPosts } = await supabase
      .from('blog_posts')
      .select('title')
      .eq('category_id', category.id)

    const existingTopics = existingPosts?.map((p: { title: string }) => p.title) || []

    // Build context from resources
    let context = await buildBlogContext(supabase, category.id, category.name)

    // If no context, use default
    if (!context || context.length < 100) {
      context = `CFA Level 1 ${category.name} exam preparation.
This covers key concepts, exam strategies, and study tips for the ${category.name} section of the CFA Level 1 exam.
Focus on providing actionable advice and clear explanations of complex topics.`
    }

    // Get topic suggestions
    const suggestions = await suggestBlogTopics(category.name, context, existingTopics)

    if (!suggestions.topics || suggestions.topics.length === 0) {
      return NextResponse.json({
        message: 'No new topics to generate',
        category: category.name
      })
    }

    // Pick the first suggested topic
    const topicToGenerate = suggestions.topics[0]

    // Create generation job
    const { data: job, error: jobError } = await supabase
      .from('blog_generation_jobs')
      .insert({
        category_id: category.id,
        topic: topicToGenerate.title,
        keywords: topicToGenerate.keywords || defaultKeywords,
        status: 'processing',
      })
      .select()
      .single()

    if (jobError) throw jobError

    // Generate the blog post
    const generatedPost = await generateEnhancedBlogPost(
      context,
      category.name,
      topicToGenerate.title,
      topicToGenerate.keywords || defaultKeywords,
      1500,
      true,
      true
    )

    // Create the post
    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .insert({
        category_id: category.id,
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
        status: 'published',
        published_at: new Date().toISOString(),
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

    return NextResponse.json({
      success: true,
      category: category.name,
      topic: topicToGenerate.title,
      post_id: post.id,
      slug: post.slug
    })

  } catch (error) {
    console.error('Generate for category error:', error)
    throw error
  }
}
