/**
 * Generate high-quality CFA Level 1 flashcards using RAG
 *
 * This script:
 * 1. Clears existing flashcards
 * 2. For each topic, retrieves relevant content via RAG
 * 3. Generates flashcards using OpenAI based on learning objectives
 * 4. Inserts flashcards into the database
 *
 * Usage: npx tsx scripts/generate-flashcards-rag.ts
 */

import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { createClient } from '@supabase/supabase-js'
import { Pinecone } from '@pinecone-database/pinecone'
import OpenAI from 'openai'
import { cfaLevel1Curriculum } from '../lib/curriculum'
import { CFA_2026_LEARNING_OBJECTIVES } from '../lib/learning-objectives-2026'

// =============================================================================
// CONFIGURATION
// =============================================================================

const CARDS_PER_TOPIC = 150 // Target cards per topic
const BATCH_SIZE = 10 // Cards to generate per API call
const DELAY_BETWEEN_BATCHES = 2000 // ms delay to avoid rate limits

// Map curriculum topic IDs to learning objectives topic names
const TOPIC_ID_TO_NAME: Record<string, string> = {
  'ethical-professional-standards': 'Ethical and Professional Standards',
  'quantitative-methods': 'Quantitative Methods',
  'economics': 'Economics',
  'financial-statement-analysis': 'Financial Statement Analysis',
  'corporate-issuers': 'Corporate Issuers',
  'equity-investments': 'Equity Investments',
  'fixed-income': 'Fixed Income',
  'derivatives': 'Derivatives',
  'alternative-investments': 'Alternative Investments',
  'portfolio-management': 'Portfolio Management',
}

// Map topic names to Pinecone metadata (handles folder name mismatches)
const TOPIC_NAME_TO_PINECONE: Record<string, string> = {
  'Ethical and Professional Standards': 'Ethical and professional Standards',
  'Fixed Income': 'Fixed Income ',
  'Portfolio Management': 'Portfolio Management ',
}

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

function getPinecone() {
  const apiKey = process.env.PINECONE_API_KEY
  if (!apiKey) throw new Error('Missing PINECONE_API_KEY')
  return new Pinecone({ apiKey })
}

// =============================================================================
// RAG CONTEXT RETRIEVAL
// =============================================================================

async function generateEmbedding(openai: OpenAI, text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text
  })
  return response.data[0].embedding
}

async function retrieveContext(
  pinecone: Pinecone,
  openai: OpenAI,
  topicName: string,
  query: string,
  topK: number = 5
): Promise<string> {
  const index = pinecone.index('cfa-materials')
  const pineconeTopicName = TOPIC_NAME_TO_PINECONE[topicName] || topicName

  const embedding = await generateEmbedding(openai, query)

  const results = await index.query({
    vector: embedding,
    topK,
    includeMetadata: true,
    filter: { topicName: pineconeTopicName }
  })

  if (!results.matches || results.matches.length === 0) {
    return ''
  }

  return results.matches
    .map((match, idx) => `[Source ${idx + 1}]\n${match.metadata?.text || ''}`)
    .join('\n\n---\n\n')
}

// =============================================================================
// FLASHCARD GENERATION PROMPT
// =============================================================================

const FLASHCARD_GENERATION_PROMPT = `You are creating high-quality CFA Level 1 flashcards based on official training materials.

EQUATION FORMATTING (CRITICAL):
- For inline equations, use: \\( equation \\)
- For display/block equations, use: \\[ equation \\]
- NEVER use single $ for math (conflicts with currency)
- Currency amounts should NOT have math delimiters: "$2,000" not "\\($2,000\\)"
- Examples:
  - Inline: "The formula \\( r = \\frac{FV - PV}{PV} \\) calculates simple return"
  - Block equation:
    \\[ NPV = \\sum_{t=0}^{n} \\frac{CF_t}{(1+r)^t} \\]
  - Fraction: \\( \\frac{numerator}{denominator} \\)
  - Subscript: \\( P_0 \\) for price at time 0
  - Superscript: \\( (1+r)^n \\)
  - Greek letters: \\( \\sigma \\) for standard deviation, \\( \\beta \\) for beta
  - Square root: \\( \\sqrt{variance} \\)

FLASHCARD TYPES TO CREATE:
1. DEFINITION CARDS - "What is [term]?" → Clear, concise definition
2. FORMULA CARDS - State the formula name → Show formula with variable definitions
3. CONCEPT CARDS - "Explain [concept]" → Key points and relationships
4. COMPARISON CARDS - "Compare X vs Y" → Key differences in a clear format
5. APPLICATION CARDS - "When would you use [concept]?" → Practical application

QUALITY GUIDELINES:
- Front should be a clear question or prompt
- Back should be a complete but concise answer
- Include the key formula where relevant
- Explain variable meanings for formulas
- Focus on exam-relevant content
- Avoid overly long answers (aim for 1-3 sentences for definitions, more for complex topics)

OUTPUT FORMAT:
Return a JSON array of flashcard objects:
[
  {
    "front": "What is the time value of money?",
    "back": "The concept that money available today is worth more than the same amount in the future due to its potential earning capacity. This is the foundation for discounting future cash flows."
  },
  {
    "front": "Present Value Formula",
    "back": "\\\\[ PV = \\\\frac{FV}{(1+r)^n} \\\\]\\n\\nWhere:\\n- PV = Present Value\\n- FV = Future Value\\n- r = discount rate per period\\n- n = number of periods"
  }
]

IMPORTANT:
- Generate exactly the requested number of unique flashcards
- Each card must be based on the provided source material
- Double-escape backslashes in JSON (use \\\\ for a single backslash in output)
- No duplicate concepts within a batch
`

// =============================================================================
// GENERATE FLASHCARDS FOR A TOPIC
// =============================================================================

interface Flashcard {
  front: string
  back: string
}

async function generateFlashcardsForTopic(
  openai: OpenAI,
  pinecone: Pinecone,
  topicName: string,
  learningObjectives: string[],
  targetCount: number
): Promise<Flashcard[]> {
  const allCards: Flashcard[] = []
  const generatedConcepts = new Set<string>()

  // Split learning objectives into batches
  const batchCount = Math.ceil(targetCount / BATCH_SIZE)
  const objectivesPerBatch = Math.ceil(learningObjectives.length / batchCount)

  for (let i = 0; i < batchCount && allCards.length < targetCount; i++) {
    const batchObjectives = learningObjectives.slice(
      i * objectivesPerBatch,
      (i + 1) * objectivesPerBatch
    )

    // Build query from learning objectives
    const query = `CFA Level 1 ${topicName}: ${batchObjectives.slice(0, 3).join('. ')}`

    // Retrieve relevant context
    const context = await retrieveContext(pinecone, openai, topicName, query, 5)

    if (!context) {
      console.log(`  Warning: No context found for batch ${i + 1}`)
      continue
    }

    const cardsToGenerate = Math.min(BATCH_SIZE, targetCount - allCards.length)

    const prompt = `${FLASHCARD_GENERATION_PROMPT}

TOPIC: ${topicName}

LEARNING OBJECTIVES TO COVER:
${batchObjectives.map((obj, idx) => `${idx + 1}. ${obj}`).join('\n')}

SOURCE MATERIAL:
${context}

${generatedConcepts.size > 0 ? `\nALREADY COVERED (DO NOT DUPLICATE):\n${Array.from(generatedConcepts).slice(-20).join(', ')}` : ''}

Generate ${cardsToGenerate} unique, high-quality flashcards based on the source material and learning objectives above.
Return ONLY the JSON array, no other text.`

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a CFA exam preparation expert creating flashcards. Return only valid JSON arrays.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: 'json_object' }
      })

      const content = completion.choices[0]?.message?.content
      if (!content) continue

      // Parse response - handle both array and object with array property
      let cards: Flashcard[]
      try {
        const parsed = JSON.parse(content)
        cards = Array.isArray(parsed) ? parsed : (parsed.flashcards || parsed.cards || [])
      } catch {
        console.log(`  Warning: Failed to parse response for batch ${i + 1}`)
        continue
      }

      // Validate and add cards
      for (const card of cards) {
        if (card.front && card.back && typeof card.front === 'string' && typeof card.back === 'string') {
          // Unescape the double-escaped backslashes from JSON
          const front = card.front.replace(/\\\\([(\[])/g, '\\$1').replace(/\\\\([)\]])/g, '\\$1')
          const back = card.back.replace(/\\\\([(\[])/g, '\\$1').replace(/\\\\([)\]])/g, '\\$1')

          allCards.push({ front, back })

          // Track concept to avoid duplicates
          const conceptKey = front.toLowerCase().slice(0, 50)
          generatedConcepts.add(conceptKey)
        }
      }

      console.log(`  Batch ${i + 1}/${batchCount}: Generated ${cards.length} cards (total: ${allCards.length})`)

    } catch (error) {
      console.error(`  Error in batch ${i + 1}:`, error)
    }

    // Delay between batches
    if (i < batchCount - 1) {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_BATCHES))
    }
  }

  return allCards
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  console.log('='.repeat(60))
  console.log('CFA Level 1 Flashcard Generator (RAG-Based)')
  console.log('='.repeat(60))

  const supabase = getSupabase()
  const openai = getOpenAI()
  const pinecone = getPinecone()

  // Step 1: Clear existing flashcards
  console.log('\n[1/3] Clearing existing flashcards...')

  const { error: deleteProgressError } = await supabase
    .from('user_flashcard_progress')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000')
  if (deleteProgressError) console.error('Error clearing progress:', deleteProgressError)

  const { error: deleteHistoryError } = await supabase
    .from('flashcard_review_history')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000')
  if (deleteHistoryError) console.error('Error clearing history:', deleteHistoryError)

  const { error: deleteCardsError } = await supabase
    .from('flashcards')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000')
  if (deleteCardsError) console.error('Error clearing cards:', deleteCardsError)

  const { error: deleteDecksError } = await supabase
    .from('flashcard_decks')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000')
  if (deleteDecksError) console.error('Error clearing decks:', deleteDecksError)

  console.log('Cleared existing data.')

  // Step 2: Process each topic
  console.log('\n[2/3] Generating flashcards for each topic...\n')

  let totalCards = 0
  const topicStats: { topic: string; cards: number }[] = []

  for (const topic of cfaLevel1Curriculum) {
    const topicName = TOPIC_ID_TO_NAME[topic.id] || topic.name
    console.log(`\n${'─'.repeat(50)}`)
    console.log(`Processing: ${topicName}`)
    console.log(`${'─'.repeat(50)}`)

    // Get learning objectives for this topic
    const topicObjectives = CFA_2026_LEARNING_OBJECTIVES.find(
      t => t.topicName === topicName
    )

    const learningObjectiveTexts = topicObjectives?.readings.flatMap(
      r => r.learningObjectives.map(lo => lo.text)
    ) || []

    console.log(`Found ${learningObjectiveTexts.length} learning objectives`)

    // Create deck for this topic
    const { data: deck, error: deckError } = await supabase
      .from('flashcard_decks')
      .insert({
        name: topicName,
        slug: topic.id,
        description: topic.description,
        topic_area: topic.id,
        is_active: true
      })
      .select()
      .single()

    if (deckError || !deck) {
      console.error(`Failed to create deck for ${topicName}:`, deckError)
      continue
    }

    console.log(`Created deck: ${deck.id}`)

    // Generate flashcards
    const cards = await generateFlashcardsForTopic(
      openai,
      pinecone,
      topicName,
      learningObjectiveTexts,
      CARDS_PER_TOPIC
    )

    console.log(`Generated ${cards.length} flashcards`)

    // Insert flashcards
    if (cards.length > 0) {
      const flashcardRecords = cards.map((card, idx) => ({
        deck_id: deck.id,
        front: card.front,
        back: card.back,
        card_type: 'basic',
        sort_order: idx
      }))

      // Insert in batches of 100
      for (let i = 0; i < flashcardRecords.length; i += 100) {
        const batch = flashcardRecords.slice(i, i + 100)
        const { error: insertError } = await supabase
          .from('flashcards')
          .insert(batch)

        if (insertError) {
          console.error(`Error inserting batch ${i / 100 + 1}:`, insertError)
        }
      }

      // Update deck card count
      await supabase
        .from('flashcard_decks')
        .update({ card_count: cards.length })
        .eq('id', deck.id)

      totalCards += cards.length
      topicStats.push({ topic: topicName, cards: cards.length })
    }
  }

  // Step 3: Summary
  console.log('\n' + '='.repeat(60))
  console.log('[3/3] GENERATION COMPLETE!')
  console.log('='.repeat(60))
  console.log(`\nTotal flashcards generated: ${totalCards}\n`)
  console.log('Cards per topic:')
  for (const stat of topicStats) {
    console.log(`  ${stat.topic}: ${stat.cards}`)
  }
  console.log('')
}

main().catch(console.error)
