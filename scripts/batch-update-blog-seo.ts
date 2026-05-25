/**
 * Batch Update Blog Post SEO Meta Fields
 *
 * This script:
 * 1. Fetches all published blog posts from Supabase
 * 2. For each post, generates improved meta_title/meta_description via OpenAI
 * 3. Updates the post in the database
 * 4. Adds delay between API calls to avoid rate limits
 * 5. Logs all changes
 *
 * Usage: npx tsx scripts/batch-update-blog-seo.ts
 */

import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Initialize OpenAI
import OpenAI from 'openai'
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

// Delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// =============================================================================
// SEO OPTIMIZATION PROMPT
// =============================================================================

function buildSEOPrompt(post: {
  title: string
  meta_title: string | null
  meta_description: string | null
  excerpt: string | null
  content: string
  tags: string[] | null
}): string {
  const primaryKeyword = post.tags?.[0] || extractPrimaryKeyword(post.title)

  return `You are an SEO expert specializing in finance education content.

Given this blog post, generate improved meta_title and meta_description that will maximize click-through rates from Google search results.

CURRENT POST INFO:
- Title: "${post.title}"
- Current meta_title: "${post.meta_title || 'none'}"
- Current meta_description: "${post.meta_description || 'none'}"
- Excerpt: "${post.excerpt || 'none'}"
- Primary suggested keyword: "${primaryKeyword}"
- Tags: "${post.tags?.join(', ') || 'none'}"

CRITICAL REQUIREMENTS:

META TITLE (under 55 characters):
- START with primary keyword for SEO
- END with a benefit/hook to drive clicks
- Use ONE of these high-CTR patterns:
  * "[Keyword] (2026): [Benefit]" e.g. "CFA Level 1 Study Guide (2026): Pass First Time"
  * "[Number] [Keyword] [Promise]" e.g. "10 CFA Ethics Questions Every Candidate Gets Wrong"
  * "[How to/What] [Keyword] - [Free/Complete/Ultimate] Guide" e.g. "How to Pass CFA Fixed Income (2026) - Free Guide"
- Add urgency/benefit words: Free, Complete, Ultimate, Essential, Proven, Fast
- NEVER use: "Understanding X", "A Guide to Y", "Introduction to Z"
- DO NOT include site name (it's added automatically)

META DESCRIPTION (under 155 characters):
- Start with primary keyword
- Include year 2026 for freshness
- Add a HOOK that creates curiosity or addresses pain point
- End with CTA: "Learn more", "Get started free", "Practice now", etc.
- Structure: "[Primary keyword] (2026): [Hook]. [Benefit]. [CTA]"

IMPORTANT: Return ONLY a JSON object with this exact structure:
{
  "meta_title": "Your new optimized title (under 55 chars, no site name)",
  "meta_description": "Your new optimized description (under 155 chars)"
}

Do NOT include any text outside the JSON object.`
}

function extractPrimaryKeyword(title: string): string {
  // Simple extraction - remove common words and get main topic
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'to', 'how', 'what', 'why', 'when', 'where']
  const words = title.split(' ')
    .filter(w => !stopWords.includes(w.toLowerCase()))
    .filter(w => w.length > 2)

  // Get first 2-3 meaningful words
  return words.slice(0, 3).join(' ')
}

// =============================================================================
// MAIN UPDATE FUNCTION
// =============================================================================

interface UpdateResult {
  postId: string
  slug: string
  oldMetaTitle: string | null
  newMetaTitle: string
  oldMetaDescription: string | null
  newMetaDescription: string
  status: 'success' | 'error'
  error?: string
}

async function updatePostSEO(post: {
  id: string
  slug: string
  title: string
  meta_title: string | null
  meta_description: string | null
  excerpt: string | null
  content: string
  tags: string[] | null
}): Promise<UpdateResult> {
  try {
    const prompt = buildSEOPrompt(post)

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an SEO expert specializing in finance education content.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: 'json_object' }
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('Empty response from OpenAI')
    }

    const seoData = JSON.parse(content)

    // Update the post
    const { error } = await supabase
      .from('blog_posts')
      .update({
        meta_title: seoData.meta_title,
        meta_description: seoData.meta_description
      })
      .eq('id', post.id)

    if (error) {
      throw error
    }

    return {
      postId: post.id,
      slug: post.slug,
      oldMetaTitle: post.meta_title,
      newMetaTitle: seoData.meta_title,
      oldMetaDescription: post.meta_description,
      newMetaDescription: seoData.meta_description,
      status: 'success'
    }
  } catch (error) {
    return {
      postId: post.id,
      slug: post.slug,
      oldMetaTitle: post.meta_title,
      newMetaTitle: post.meta_title || '',
      oldMetaDescription: post.meta_description,
      newMetaDescription: post.meta_description || '',
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

async function main() {
  console.log('🚀 Starting batch SEO update for blog posts...\n')

  // Fetch all published blog posts
  console.log('📥 Fetching all published blog posts...')
  const { data: posts, error: fetchError } = await supabase
    .from('blog_posts')
    .select('id, slug, title, meta_title, meta_description, excerpt, content, tags')
    .eq('status', 'published')

  if (fetchError) {
    console.error('❌ Failed to fetch posts:', fetchError)
    process.exit(1)
  }

  if (!posts || posts.length === 0) {
    console.log('No published posts found.')
    process.exit(0)
  }

  console.log(`Found ${posts.length} published posts\n`)

  const results: UpdateResult[] = []
  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    const postNum = i + 1

    console.log(`[${postNum}/${posts.length}] Processing: "${post.title}"`)

    const result = await updatePostSEO(post)
    results.push(result)

    if (result.status === 'success') {
      successCount++
      console.log(`  ✅ Updated: "${result.newMetaTitle}"`)
    } else {
      errorCount++
      console.log(`  ❌ Error: ${result.error}`)
    }

    // Delay between API calls to avoid rate limits
    if (i < posts.length - 1) {
      await delay(1500) // 1.5 second delay
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 BATCH UPDATE SUMMARY')
  console.log('='.repeat(60))
  console.log(`Total posts processed: ${posts.length}`)
  console.log(`✅ Successful updates: ${successCount}`)
  console.log(`❌ Failed updates: ${errorCount}`)

  if (successCount > 0) {
    console.log('\n📝 SUCCESSFUL UPDATES:')
    console.log('-'.repeat(60))
    results
      .filter(r => r.status === 'success')
      .forEach(r => {
        console.log(`\nPost: ${r.slug}`)
        console.log(`  Old meta_title: "${r.oldMetaTitle || '(none)'}"`)
        console.log(`  New meta_title: "${r.newMetaTitle}"`)
        console.log(`  Old meta_description: "${r.oldMetaDescription || '(none)'}"`)
        console.log(`  New meta_description: "${r.newMetaDescription}"`)
      })
  }

  if (errorCount > 0) {
    console.log('\n❌ FAILED UPDATES:')
    console.log('-'.repeat(60))
    results
      .filter(r => r.status === 'error')
      .forEach(r => {
        console.log(`Post ID ${r.postId} (${r.slug}): ${r.error}`)
      })
  }

  console.log('\n✨ Batch update complete!')
}

main().catch(console.error)