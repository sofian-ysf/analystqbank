import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/app/lib/supabase/server'
import { buildBlogContext } from '@/lib/blog-rag'
import { suggestBlogTopics } from '@/lib/openai'

// POST - Suggest blog topics for a category
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const { category_id } = await request.json()

    if (!category_id) {
      return NextResponse.json({ error: 'category_id is required' }, { status: 400 })
    }

    // Get category info
    const { data: category } = await supabase
      .from('blog_categories')
      .select('name')
      .eq('id', category_id)
      .single()

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    // Get existing post titles to avoid duplicates
    const { data: existingPosts } = await supabase
      .from('blog_posts')
      .select('title')
      .eq('category_id', category_id)

    const existingTopics = existingPosts?.map(p => p.title) || []

    // Build context from resources
    const context = await buildBlogContext(supabase, category_id, category.name)

    // If no context, use CFA-specific default context
    const finalContext = context || `CFA Level 1 ${category.name} exam preparation content.
This includes topics relevant to candidates studying for the CFA Level 1 exam.
Focus areas include exam strategies, key concepts, common mistakes, and study tips.`

    // Get topic suggestions
    const suggestions = await suggestBlogTopics(
      category.name,
      finalContext,
      existingTopics
    )

    return NextResponse.json(suggestions)

  } catch (error) {
    console.error('Suggest topics error:', error)
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Failed to suggest topics'
    }, { status: 500 })
  }
}
