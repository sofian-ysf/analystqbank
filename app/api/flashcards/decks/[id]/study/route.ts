import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/app/lib/supabase/server'
import { FlashcardWithProgress } from '@/lib/flashcards/types'

/**
 * GET /api/flashcards/decks/[id]/study
 * Returns cards for a study session with smart ordering (due first, then new)
 * Requires authentication to track progress
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: deckId } = await params
    const supabase = await createClient()

    // Auth required for study sessions
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Please sign in to study flashcards' }, { status: 401 })
    }

    // Get query params
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '20')
    const includeNew = searchParams.get('includeNew') !== 'false'

    // Get deck info
    const { data: deck, error: deckError } = await supabase
      .from('flashcard_decks')
      .select('*')
      .eq('id', deckId)
      .eq('is_active', true)
      .single()

    if (deckError || !deck) {
      return NextResponse.json({ error: 'Deck not found' }, { status: 404 })
    }

    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    // Get all flashcards in this deck
    const { data: allFlashcards, error: flashcardsError } = await supabase
      .from('flashcards')
      .select('*')
      .eq('deck_id', deckId)
      .order('sort_order')

    if (flashcardsError || !allFlashcards) {
      return NextResponse.json({ error: 'Failed to fetch flashcards' }, { status: 500 })
    }

    // Get user's progress for all cards in this deck
    const flashcardIds = allFlashcards.map(f => f.id)
    const { data: progressData } = await supabase
      .from('user_flashcard_progress')
      .select('*')
      .eq('user_id', user.id)
      .in('flashcard_id', flashcardIds)

    // Create progress map
    const progressMap = new Map(
      (progressData || []).map(p => [p.flashcard_id, p])
    )

    // Categorize cards
    const dueCards: FlashcardWithProgress[] = []
    const newCards: FlashcardWithProgress[] = []
    const learningCards: FlashcardWithProgress[] = []

    for (const card of allFlashcards) {
      const progress = progressMap.get(card.id)

      const cardWithProgress: FlashcardWithProgress = {
        ...card,
        progress: progress || undefined,
        isNew: !progress || progress.repetitions === 0,
        isDue: false
      }

      if (!progress || progress.repetitions === 0) {
        // New card (never studied or failed immediately)
        newCards.push(cardWithProgress)
      } else if (new Date(progress.due_date) <= today) {
        // Due for review
        cardWithProgress.isDue = true
        dueCards.push(cardWithProgress)
      } else {
        // Learning but not due yet
        learningCards.push(cardWithProgress)
      }
    }

    // Build study queue: due cards first, then new cards
    const studyQueue: FlashcardWithProgress[] = []

    // Add due cards (up to limit)
    for (const card of dueCards) {
      if (studyQueue.length >= limit) break
      studyQueue.push(card)
    }

    // Fill remaining slots with new cards
    if (includeNew && studyQueue.length < limit) {
      for (const card of newCards) {
        if (studyQueue.length >= limit) break
        studyQueue.push(card)
      }
    }

    // Shuffle the queue for variety (but keep some due cards first)
    const shuffled = shuffleArray(studyQueue)

    return NextResponse.json({
      cards: shuffled,
      deck: {
        id: deck.id,
        name: deck.name,
        slug: deck.slug,
        topic_area: deck.topic_area,
        card_count: deck.card_count
      },
      stats: {
        totalInDeck: allFlashcards.length,
        dueCount: dueCards.length,
        newCount: newCards.length,
        learningCount: learningCards.length,
        studyingCount: shuffled.length
      }
    })

  } catch (error) {
    console.error('Error in flashcards/decks/[id]/study:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

/**
 * Fisher-Yates shuffle
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
