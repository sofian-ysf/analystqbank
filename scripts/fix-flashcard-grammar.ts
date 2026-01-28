/**
 * One-time script to fix grammar/spelling in all flashcards using OpenAI
 *
 * Usage: npx tsx scripts/fix-flashcard-grammar.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import OpenAI from 'openai'

// =============================================================================
// CONFIGURATION
// =============================================================================

const BATCH_SIZE = 10  // Process cards in batches
const DELAY_BETWEEN_BATCHES = 1000  // ms delay to avoid rate limits

// =============================================================================
// CLIENTS
// =============================================================================

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing Supabase env vars')
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })
}

function getOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY')
  return new OpenAI({ apiKey })
}

// =============================================================================
// GRAMMAR FIXING
// =============================================================================

async function fixGrammar(openai: OpenAI, text: string): Promise<string> {
  // Skip if text is very short or just HTML/formatting
  const strippedText = text.replace(/<[^>]*>/g, '').trim()
  if (strippedText.length < 10) return text

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a grammar and spelling correction assistant. Your task is to fix grammar, spelling, and punctuation errors in flashcard content.

IMPORTANT RULES:
- ONLY fix grammar, spelling, and punctuation errors
- DO NOT change the meaning or add new information
- DO NOT remove or add content
- PRESERVE all HTML tags exactly as they are (e.g., <span>, <div>, <b>, etc.)
- PRESERVE all LaTeX/math notation (e.g., \\(, \\), \\[, \\], $, etc.)
- PRESERVE special formatting like cloze deletions (e.g., {{c1::answer}})
- If the text is already correct, return it unchanged
- Keep the same capitalization style
- Use UK English spelling (e.g., "analyse" not "analyze", "behaviour" not "behavior")

Return ONLY the corrected text with no explanation.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.1,  // Low temperature for consistent corrections
      max_tokens: 2000
    })

    return response.choices[0]?.message?.content?.trim() || text
  } catch (error) {
    console.error('OpenAI error:', error)
    return text  // Return original on error
  }
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  console.log('='.repeat(60))
  console.log('Flashcard Grammar Fixer')
  console.log('='.repeat(60))

  const supabase = getSupabase()
  const openai = getOpenAI()

  // Fetch all flashcards (handle pagination - Supabase limits to 1000 by default)
  console.log('\nFetching all flashcards...')
  let flashcards: { id: string; front: string; back: string }[] = []
  let page = 0
  const pageSize = 1000

  while (true) {
    const { data, error } = await supabase
      .from('flashcards')
      .select('id, front, back')
      .order('id')
      .range(page * pageSize, (page + 1) * pageSize - 1)

    if (error) {
      console.error('Error fetching flashcards:', error)
      process.exit(1)
    }

    if (!data || data.length === 0) break

    flashcards = [...flashcards, ...data]
    page++

    if (data.length < pageSize) break
  }

  console.log(`Found ${flashcards.length} flashcards to process\n`)

  let processed = 0
  let updated = 0
  let errors = 0

  // Process in batches
  for (let i = 0; i < flashcards.length; i += BATCH_SIZE) {
    const batch = flashcards.slice(i, i + BATCH_SIZE)

    console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(flashcards.length / BATCH_SIZE)} (cards ${i + 1}-${Math.min(i + BATCH_SIZE, flashcards.length)})...`)

    // Process each card in the batch concurrently
    const updates = await Promise.all(
      batch.map(async (card) => {
        try {
          const [fixedFront, fixedBack] = await Promise.all([
            fixGrammar(openai, card.front),
            fixGrammar(openai, card.back)
          ])

          // Only update if something changed
          if (fixedFront !== card.front || fixedBack !== card.back) {
            return {
              id: card.id,
              front: fixedFront,
              back: fixedBack,
              changed: true
            }
          }
          return { id: card.id, changed: false }
        } catch (err) {
          console.error(`  Error processing card ${card.id}:`, err)
          errors++
          return { id: card.id, changed: false, error: true }
        }
      })
    )

    // Update changed cards in database
    for (const update of updates) {
      processed++
      if (update.changed && 'front' in update) {
        const { error: updateError } = await supabase
          .from('flashcards')
          .update({ front: update.front, back: update.back })
          .eq('id', update.id)

        if (updateError) {
          console.error(`  Failed to update card ${update.id}:`, updateError)
          errors++
        } else {
          updated++
        }
      }
    }

    // Progress update
    const progress = ((processed / flashcards.length) * 100).toFixed(1)
    console.log(`  Progress: ${progress}% | Updated: ${updated} | Errors: ${errors}`)

    // Delay between batches to avoid rate limits
    if (i + BATCH_SIZE < flashcards.length) {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES))
    }
  }

  console.log('\n' + '='.repeat(60))
  console.log('COMPLETE!')
  console.log('='.repeat(60))
  console.log(`Total processed: ${processed}`)
  console.log(`Cards updated: ${updated}`)
  console.log(`Errors: ${errors}`)
}

main().catch(console.error)
