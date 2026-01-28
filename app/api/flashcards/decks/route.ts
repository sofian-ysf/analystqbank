import { NextResponse } from 'next/server'
import { createClient } from '@/app/lib/supabase/server'
import { DeckWithStats, DeckStats } from '@/lib/flashcards/types'

/**
 * GET /api/flashcards/decks
 * Returns all flashcard decks with user progress stats (if authenticated)
 * Flashcards are FREE - no authentication required to view decks
 */
export async function GET() {
  try {
    const supabase = await createClient()

    // Get user (optional - flashcards are free)
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch all active decks
    const { data: decks, error: decksError } = await supabase
      .from('flashcard_decks')
      .select('*')
      .eq('is_active', true)
      .order('name')

    if (decksError) {
      console.error('Error fetching decks:', decksError)
      return NextResponse.json({ error: 'Failed to fetch decks' }, { status: 500 })
    }

    if (!decks || decks.length === 0) {
      return NextResponse.json({ decks: [] })
    }

    // Calculate stats for each deck
    const decksWithStats: DeckWithStats[] = await Promise.all(
      decks.map(async (deck) => {
        const stats: DeckStats = {
          total: deck.card_count || 0,
          new: deck.card_count || 0,
          learning: 0,
          due: 0,
          mastered: 0,
          masteryPercentage: 0
        }

        // If user is logged in, get their progress
        if (user) {
          // Get all flashcard IDs in this deck
          const { data: flashcardIds } = await supabase
            .from('flashcards')
            .select('id')
            .eq('deck_id', deck.id)

          if (flashcardIds && flashcardIds.length > 0) {
            const ids = flashcardIds.map(f => f.id)

            // Get user's progress for these cards
            const { data: progress } = await supabase
              .from('user_flashcard_progress')
              .select('*')
              .eq('user_id', user.id)
              .in('flashcard_id', ids)

            if (progress && progress.length > 0) {
              const today = new Date()
              today.setUTCHours(0, 0, 0, 0)

              const studiedIds = new Set(progress.map(p => p.flashcard_id))

              for (const p of progress) {
                if (p.interval_days >= 21) {
                  stats.mastered++
                } else if (new Date(p.due_date) <= today && p.repetitions > 0) {
                  stats.due++
                } else if (p.repetitions > 0) {
                  stats.learning++
                }
              }

              stats.new = deck.card_count - studiedIds.size
              stats.masteryPercentage = deck.card_count > 0
                ? Math.round((stats.mastered / deck.card_count) * 100)
                : 0
            }
          }
        }

        return {
          ...deck,
          stats
        }
      })
    )

    return NextResponse.json({ decks: decksWithStats })

  } catch (error) {
    console.error('Error in flashcards/decks:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
