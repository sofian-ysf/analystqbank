/**
 * Import Anki .apkg file into AnalystQBank flashcards
 *
 * Usage: npx tsx scripts/import-anki.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import { createClient } from '@supabase/supabase-js'
import JSZip from 'jszip'
import initSqlJs from 'sql.js'

// Load environment variables from .env.local
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// =============================================================================
// CONFIGURATION
// =============================================================================

const APKG_PATH = path.join(__dirname, '../ankifolders/CFA_Level_1_2024.apkg')

// CFA Level 1 Topics with keywords for matching
const CFA_TOPICS = [
  {
    id: 'ethical-professional-standards',
    name: 'Ethical and Professional Standards',
    slug: 'ethics',
    keywords: [
      'ethics', 'ethical', 'professional conduct', 'code of ethics', 'standards of practice',
      'fiduciary', 'integrity', 'gips', 'performance standards', 'disclosure',
      'misrepresentation', 'material nonpublic', 'insider', 'conflict of interest',
      'duty of loyalty', 'fair dealing', 'suitability', 'soft dollar', 'referral fee'
    ]
  },
  {
    id: 'quantitative-methods',
    name: 'Quantitative Methods',
    slug: 'quantitative',
    keywords: [
      'quantitative', 'statistics', 'probability', 'regression', 'hypothesis',
      'standard deviation', 'variance', 'correlation', 'covariance', 'normal distribution',
      'confidence interval', 't-test', 'p-value', 'time value', 'present value',
      'future value', 'npv', 'irr', 'annuity', 'perpetuity', 'compounding',
      'monte carlo', 'simulation', 'sampling', 'central limit'
    ]
  },
  {
    id: 'economics',
    name: 'Economics',
    slug: 'economics',
    keywords: [
      'economics', 'gdp', 'inflation', 'monetary policy', 'fiscal policy',
      'supply and demand', 'elasticity', 'market structure', 'oligopoly', 'monopoly',
      'perfect competition', 'business cycle', 'recession', 'expansion',
      'exchange rate', 'currency', 'trade balance', 'current account',
      'central bank', 'interest rate', 'aggregate demand', 'aggregate supply'
    ]
  },
  {
    id: 'financial-statement-analysis',
    name: 'Financial Statement Analysis',
    slug: 'fsa',
    keywords: [
      'financial statement', 'income statement', 'balance sheet', 'cash flow',
      'ratio analysis', 'liquidity ratio', 'profitability ratio', 'leverage ratio',
      'roe', 'roa', 'dupont', 'inventory', 'fifo', 'lifo', 'depreciation',
      'amortization', 'goodwill', 'impairment', 'deferred tax', 'lease',
      'revenue recognition', 'earnings quality', 'accrual', 'working capital'
    ]
  },
  {
    id: 'corporate-issuers',
    name: 'Corporate Issuers',
    slug: 'corporate',
    keywords: [
      'corporate governance', 'board of directors', 'stakeholder', 'shareholder',
      'capital structure', 'wacc', 'cost of capital', 'cost of equity', 'cost of debt',
      'dividend policy', 'share repurchase', 'capital budgeting', 'npv', 'irr',
      'payback period', 'working capital management', 'modigliani', 'miller',
      'agency', 'principal agent', 'leverage', 'debt-to-equity'
    ]
  },
  {
    id: 'equity-investments',
    name: 'Equity Investments',
    slug: 'equity',
    keywords: [
      'equity', 'stock', 'share', 'common stock', 'preferred stock',
      'dividend discount', 'ddm', 'gordon growth', 'free cash flow', 'fcfe', 'fcff',
      'price-to-earnings', 'p/e', 'price-to-book', 'p/b', 'eps',
      'market efficiency', 'efficient market', 'emh', 'index', 'benchmark',
      'active management', 'passive management', 'security analysis', 'valuation'
    ]
  },
  {
    id: 'fixed-income',
    name: 'Fixed Income',
    slug: 'fixed-income',
    keywords: [
      'fixed income', 'bond', 'coupon', 'yield', 'yield to maturity', 'ytm',
      'duration', 'convexity', 'interest rate risk', 'credit risk', 'spread',
      'treasury', 'corporate bond', 'municipal bond', 'zero coupon',
      'callable', 'putable', 'convertible', 'term structure', 'yield curve',
      'spot rate', 'forward rate', 'mortgage-backed', 'mbs', 'abs', 'securitization'
    ]
  },
  {
    id: 'derivatives',
    name: 'Derivatives',
    slug: 'derivatives',
    keywords: [
      'derivative', 'option', 'call option', 'put option', 'futures', 'forward',
      'swap', 'interest rate swap', 'currency swap', 'strike price', 'exercise',
      'black-scholes', 'binomial', 'option pricing', 'delta', 'gamma', 'vega',
      'theta', 'hedge', 'hedging', 'arbitrage', 'put-call parity',
      'long position', 'short position', 'margin', 'expiration'
    ]
  },
  {
    id: 'alternative-investments',
    name: 'Alternative Investments',
    slug: 'alternatives',
    keywords: [
      'alternative investment', 'hedge fund', 'private equity', 'venture capital',
      'real estate', 'reit', 'commodity', 'infrastructure', 'collectible',
      'fund of funds', 'leverage buyout', 'lbo', 'carried interest', 'hurdle rate',
      'j-curve', 'due diligence', 'illiquidity', 'digital asset', 'cryptocurrency'
    ]
  },
  {
    id: 'portfolio-management',
    name: 'Portfolio Management',
    slug: 'portfolio',
    keywords: [
      'portfolio', 'diversification', 'asset allocation', 'modern portfolio theory',
      'mpt', 'efficient frontier', 'capital market line', 'cml', 'capm',
      'beta', 'alpha', 'systematic risk', 'unsystematic risk', 'sharpe ratio',
      'treynor ratio', 'information ratio', 'risk-adjusted', 'benchmark',
      'rebalancing', 'strategic allocation', 'tactical allocation', 'ips'
    ]
  }
]

// =============================================================================
// TYPES
// =============================================================================

interface ParsedCard {
  noteId: number
  front: string
  back: string
  tags: string[]
}

// =============================================================================
// PARSING FUNCTIONS
// =============================================================================

const FIELD_SEPARATOR = '\x1f'

async function parseApkgFile(filePath: string): Promise<{ name: string; cards: ParsedCard[] }> {
  console.log(`Reading file: ${filePath}`)
  const fileBuffer = fs.readFileSync(filePath)

  const zip = await JSZip.loadAsync(fileBuffer)

  // Find database file
  let dbFile = zip.file('collection.anki21') || zip.file('collection.anki2')
  if (!dbFile) {
    throw new Error('Invalid .apkg file: No collection database found')
  }

  // Initialize SQL.js with local WASM
  const SQL = await initSqlJs()

  const dbBuffer = await dbFile.async('arraybuffer')
  const db = new SQL.Database(new Uint8Array(dbBuffer))

  try {
    // Get collection info
    const colResult = db.exec('SELECT models, decks FROM col')
    const models = JSON.parse(colResult[0].values[0][0] as string)
    const decks = JSON.parse(colResult[0].values[0][1] as string)

    // Get deck name
    let deckName = 'CFA Level 1 Flashcards'
    for (const [id, deck] of Object.entries(decks) as [string, { name: string }][]) {
      if (id !== '1' && deck.name && deck.name !== 'Default') {
        deckName = deck.name
        break
      }
    }

    // Get notes
    const notesResult = db.exec('SELECT id, flds, mid, tags FROM notes')
    const notes = notesResult[0]?.values.map(row => ({
      id: row[0] as number,
      flds: row[1] as string,
      mid: row[2] as number,
      tags: ((row[3] as string) || '').trim().split(/\s+/).filter(t => t.length > 0)
    })) || []

    // Get cards
    const cardsResult = db.exec('SELECT id, nid, ord FROM cards')
    const cards = cardsResult[0]?.values.map(row => ({
      id: row[0] as number,
      nid: row[1] as number,
      ord: row[2] as number
    })) || []

    // Build note map
    const notesById = new Map(notes.map(n => [n.id, n]))

    // Process cards
    const parsedCards: ParsedCard[] = []

    for (const card of cards) {
      const note = notesById.get(card.nid)
      if (!note) continue

      const model = models[note.mid.toString()]
      if (!model) continue

      const fieldValues = note.flds.split(FIELD_SEPARATOR)
      const fieldMap: Record<string, string> = {}
      model.flds.forEach((fieldDef: { name: string }, index: number) => {
        fieldMap[fieldDef.name] = fieldValues[index] || ''
      })

      let front: string
      let back: string

      if (model.type === 1) {
        // Cloze
        const clozeNum = card.ord + 1
        const template = model.tmpls[0]
        front = renderCloze(template?.qfmt || '', fieldMap, clozeNum, true)
        back = renderCloze(template?.afmt || '', fieldMap, clozeNum, false)
        back = back.replace(/\{\{FrontSide\}\}/gi, front)
      } else {
        // Standard
        const template = model.tmpls[card.ord]
        if (!template) continue
        front = renderStandard(template.qfmt, fieldMap)
        back = renderStandard(template.afmt, fieldMap)
        back = back.replace(/\{\{FrontSide\}\}/gi, front)
      }

      front = cleanHtml(front)
      back = cleanHtml(back)

      if (front.trim() || back.trim()) {
        parsedCards.push({
          noteId: note.id,
          front,
          back,
          tags: note.tags
        })
      }
    }

    return { name: deckName, cards: parsedCards }
  } finally {
    db.close()
  }
}

function renderStandard(template: string, fields: Record<string, string>): string {
  let result = template

  // Conditionals
  for (let i = 0; i < 5; i++) {
    const before = result
    result = result.replace(/\{\{#([^}]+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (_, field, content) => {
      return fields[field.trim()]?.trim() ? content : ''
    })
    result = result.replace(/\{\{\^([^}]+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (_, field, content) => {
      return !fields[field.trim()]?.trim() ? content : ''
    })
    if (before === result) break
  }

  // Field replacements
  result = result.replace(/\{\{([^#/^}]+?)\}\}/g, (match, field) => {
    const name = field.trim()
    if (name === 'FrontSide') return match
    if (name.includes(':')) {
      const [filter, actualField] = name.split(':')
      if (filter === 'text') return stripHtml(fields[actualField] || '')
      return fields[actualField] || fields[name] || ''
    }
    return fields[name] || ''
  })

  return result.replace(/\{\{\/[^}]+\}\}/g, '').replace(/\{\{[#^][^}]+\}\}/g, '')
}

function renderCloze(template: string, fields: Record<string, string>, clozeNum: number, isQuestion: boolean): string {
  let result = template

  // Conditionals
  for (let i = 0; i < 5; i++) {
    const before = result
    result = result.replace(/\{\{#c(\d+)\}\}([\s\S]*?)\{\{\/c\1\}\}/g, (_, num, content) =>
      parseInt(num) === clozeNum ? content : ''
    )
    result = result.replace(/\{\{#([^}]+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (_, field, content) => {
      if (/^c\d+$/.test(field.trim())) return _
      return fields[field.trim()]?.trim() ? content : ''
    })
    if (before === result) break
  }

  // Cloze field
  result = result.replace(/\{\{cloze:([^}]+)\}\}/g, (_, field) => {
    const value = fields[field.trim()] || ''
    return value.replace(/\{\{c(\d+)::([^:}]+?)(?:::([^}]+))?\}\}/g, (_, num, answer, hint) => {
      const thisNum = parseInt(num)
      if (thisNum === clozeNum) {
        return isQuestion
          ? `<span class="cloze-blank">[${hint || '...'}]</span>`
          : `<span class="cloze-answer">${answer}</span>`
      }
      return answer
    })
  })

  // Regular fields
  result = result.replace(/\{\{([^#/^}]+?)\}\}/g, (match, field) => {
    const name = field.trim()
    if (name === 'FrontSide') return match
    return fields[name] || ''
  })

  return result.replace(/\{\{\/[^}]+\}\}/g, '').replace(/\{\{[#^][^}]+\}\}/g, '')
}

function cleanHtml(html: string): string {
  return html
    .replace(/<(div|span)[^>]*>\s*<\/\1>/gi, '')
    .replace(/class="[^"]*"/gi, '')
    .replace(/\[sound:([^\]]+)\]/gi, '<span class="audio-indicator">Audio: $1</span>')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/<hr[^>]*id=["']?answer["']?[^>]*>/gi, '<hr class="answer-divider">')
    .trim()
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

// =============================================================================
// TOPIC DETECTION
// =============================================================================

function detectTopic(card: ParsedCard): string {
  const content = `${card.front} ${card.back}`.toLowerCase()
  const tags = card.tags.map(t => t.toLowerCase())

  // First try matching by tags
  for (const topic of CFA_TOPICS) {
    for (const tag of tags) {
      if (tag.includes(topic.slug) || topic.keywords.some(kw => tag.includes(kw))) {
        return topic.id
      }
    }
  }

  // Then try keyword matching in content
  const scores: Record<string, number> = {}

  for (const topic of CFA_TOPICS) {
    scores[topic.id] = 0
    for (const keyword of topic.keywords) {
      // Count occurrences of each keyword
      const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      const matches = content.match(regex)
      if (matches) {
        scores[topic.id] += matches.length
      }
    }
  }

  // Find topic with highest score
  let bestTopic = CFA_TOPICS[0].id
  let bestScore = 0

  for (const [topicId, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score
      bestTopic = topicId
    }
  }

  return bestTopic
}

// =============================================================================
// DATABASE OPERATIONS
// =============================================================================

async function importToDatabase(parsedDeck: { name: string; cards: ParsedCard[] }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })

  // Clear existing flashcards and decks
  console.log('\nClearing existing flashcards...')
  await supabase.from('flashcard_review_history').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('user_flashcard_progress').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('flashcards').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('flashcard_decks').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  console.log('Cleared existing data.')

  console.log(`\nParsed ${parsedDeck.cards.length} cards from "${parsedDeck.name}"`)

  // Group cards by topic
  const cardsByTopic: Record<string, ParsedCard[]> = {}

  for (const card of parsedDeck.cards) {
    const topicId = detectTopic(card)
    if (!cardsByTopic[topicId]) {
      cardsByTopic[topicId] = []
    }
    cardsByTopic[topicId].push(card)
  }

  console.log('\nCards by topic:')
  for (const [topicId, cards] of Object.entries(cardsByTopic)) {
    const topic = CFA_TOPICS.find(t => t.id === topicId)
    console.log(`  ${topic?.name || topicId}: ${cards.length} cards`)
  }

  // Create decks and insert cards for each topic
  for (const topic of CFA_TOPICS) {
    const cards = cardsByTopic[topic.id] || []

    if (cards.length === 0) {
      console.log(`\nSkipping ${topic.name} (no cards)`)
      continue
    }

    console.log(`\nProcessing ${topic.name}...`)

    // Check if deck exists
    const { data: existingDeck } = await supabase
      .from('flashcard_decks')
      .select('id')
      .eq('topic_area', topic.id)
      .single()

    let deckId: string

    if (existingDeck) {
      console.log(`  Deck exists, updating...`)
      deckId = existingDeck.id

      // Delete existing cards
      await supabase
        .from('flashcards')
        .delete()
        .eq('deck_id', deckId)
    } else {
      console.log(`  Creating new deck...`)

      const { data: newDeck, error: deckError } = await supabase
        .from('flashcard_decks')
        .insert({
          name: topic.name,
          slug: topic.slug,
          description: `CFA Level 1 ${topic.name} flashcards`,
          topic_area: topic.id,
          card_count: 0, // Will be updated by trigger
          is_active: true
        })
        .select('id')
        .single()

      if (deckError) {
        console.error(`  Error creating deck: ${deckError.message}`)
        continue
      }

      deckId = newDeck.id
    }

    // Insert cards in batches
    const BATCH_SIZE = 100
    let insertedCount = 0

    for (let i = 0; i < cards.length; i += BATCH_SIZE) {
      const batch = cards.slice(i, i + BATCH_SIZE)

      const flashcardData = batch.map((card, idx) => ({
        deck_id: deckId,
        front: card.front,
        back: card.back,
        topic_area: topic.id,
        anki_note_id: card.noteId,
        sort_order: i + idx
      }))

      const { error: insertError } = await supabase
        .from('flashcards')
        .insert(flashcardData)

      if (insertError) {
        console.error(`  Error inserting batch: ${insertError.message}`)
      } else {
        insertedCount += batch.length
      }
    }

    console.log(`  Inserted ${insertedCount} cards`)

    // Manually update card count (in case trigger doesn't fire for batch inserts)
    await supabase
      .from('flashcard_decks')
      .update({ card_count: insertedCount })
      .eq('id', deckId)
  }

  console.log('\nImport complete!')
}

// =============================================================================
// MAIN
// =============================================================================

async function main() {
  console.log('='.repeat(60))
  console.log('CFA Level 1 Anki Flashcard Importer')
  console.log('='.repeat(60))

  // Check if file exists
  if (!fs.existsSync(APKG_PATH)) {
    console.error(`\nError: File not found: ${APKG_PATH}`)
    console.error('Please ensure CFA_L1.apkg is in the ankifolders directory.')
    process.exit(1)
  }

  try {
    // Parse the .apkg file
    const parsedDeck = await parseApkgFile(APKG_PATH)

    // Import to database
    await importToDatabase(parsedDeck)

  } catch (error) {
    console.error('\nError:', error)
    process.exit(1)
  }
}

main()
