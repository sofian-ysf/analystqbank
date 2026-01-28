import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/app/lib/supabase/server'
import { calculateSM2, ratingToQuality, getDefaultProgress } from '@/lib/flashcards/sm2'
import { ReviewRating } from '@/lib/flashcards/types'

/**
 * POST /api/flashcards/review
 * Submit a flashcard review and update SM-2 progress
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Auth required
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { flashcardId, rating } = body as { flashcardId: string; rating: ReviewRating }

    // Validate rating
    if (!['again', 'hard', 'good', 'easy'].includes(rating)) {
      return NextResponse.json({ error: 'Invalid rating' }, { status: 400 })
    }

    if (!flashcardId) {
      return NextResponse.json({ error: 'Missing flashcardId' }, { status: 400 })
    }

    // Verify flashcard exists
    const { data: flashcard, error: flashcardError } = await supabase
      .from('flashcards')
      .select('id')
      .eq('id', flashcardId)
      .single()

    if (flashcardError || !flashcard) {
      return NextResponse.json({ error: 'Flashcard not found' }, { status: 404 })
    }

    // Get current progress (or use defaults)
    const { data: currentProgress } = await supabase
      .from('user_flashcard_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('flashcard_id', flashcardId)
      .single()

    const current = currentProgress || getDefaultProgress()

    // Calculate new SM-2 values
    const quality = ratingToQuality(rating)
    const result = calculateSM2({
      quality,
      repetitions: current.repetitions || 0,
      easeFactor: current.ease_factor || 2.5,
      interval: current.interval_days || 0
    })

    // Upsert progress
    const { data: updatedProgress, error: upsertError } = await supabase
      .from('user_flashcard_progress')
      .upsert({
        user_id: user.id,
        flashcard_id: flashcardId,
        repetitions: result.repetitions,
        ease_factor: result.easeFactor,
        interval_days: result.interval,
        due_date: result.nextDueDate.toISOString(),
        last_reviewed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,flashcard_id'
      })
      .select()
      .single()

    if (upsertError) {
      console.error('Error upserting progress:', upsertError)
      return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
    }

    // Insert review history
    await supabase.from('flashcard_review_history').insert({
      user_id: user.id,
      flashcard_id: flashcardId,
      quality,
      ease_factor_before: current.ease_factor || 2.5,
      ease_factor_after: result.easeFactor,
      interval_before: current.interval_days || 0,
      interval_after: result.interval
    })

    return NextResponse.json({
      success: true,
      nextDueDate: result.nextDueDate.toISOString(),
      updatedProgress
    })

  } catch (error) {
    console.error('Error in flashcards/review:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
