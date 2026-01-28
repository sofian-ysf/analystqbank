import { NextResponse } from 'next/server'
import { createClient } from '@/app/lib/supabase/server'

/**
 * GET /api/flashcards/progress
 * Returns user's overall flashcard statistics
 */
export async function GET() {
  try {
    const supabase = await createClient()

    // Auth required
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    // Get total cards in active decks
    const { count: totalCards } = await supabase
      .from('flashcards')
      .select('*, flashcard_decks!inner(is_active)', { count: 'exact', head: true })
      .eq('flashcard_decks.is_active', true)

    // Get user's progress records
    const { data: progress } = await supabase
      .from('user_flashcard_progress')
      .select('*')
      .eq('user_id', user.id)

    const cardsStudied = progress?.length || 0
    const cardsDueToday = progress?.filter(p =>
      p.repetitions > 0 && new Date(p.due_date) <= today
    ).length || 0

    const cardsMastered = progress?.filter(p => p.interval_days >= 21).length || 0

    // Calculate average ease factor
    const avgEaseFactor = progress && progress.length > 0
      ? progress.reduce((sum, p) => sum + (p.ease_factor || 2.5), 0) / progress.length
      : 2.5

    // Get reviews today
    const todayStart = new Date(today)
    const { count: reviewsToday } = await supabase
      .from('flashcard_review_history')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('reviewed_at', todayStart.toISOString())

    // Get reviews this week
    const weekStart = new Date(today)
    weekStart.setDate(weekStart.getDate() - 7)
    const { count: reviewsThisWeek } = await supabase
      .from('flashcard_review_history')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('reviewed_at', weekStart.toISOString())

    // Calculate streak (consecutive days with reviews)
    let streakDays = 0
    let checkDate = new Date(today)

    // If no reviews today yet, start checking from yesterday
    if (!reviewsToday || reviewsToday === 0) {
      checkDate.setDate(checkDate.getDate() - 1)
    }

    // Check up to 365 days back
    for (let i = 0; i < 365; i++) {
      const dayStart = new Date(checkDate)
      dayStart.setUTCHours(0, 0, 0, 0)
      const dayEnd = new Date(dayStart)
      dayEnd.setDate(dayEnd.getDate() + 1)

      const { count } = await supabase
        .from('flashcard_review_history')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('reviewed_at', dayStart.toISOString())
        .lt('reviewed_at', dayEnd.toISOString())

      if (!count || count === 0) break
      streakDays++
      checkDate.setDate(checkDate.getDate() - 1)
    }

    return NextResponse.json({
      totalCards: totalCards || 0,
      cardsStudied,
      cardsDueToday,
      newCards: (totalCards || 0) - cardsStudied,
      cardsMastered,
      averageEaseFactor: Math.round(avgEaseFactor * 100) / 100,
      streakDays,
      reviewsToday: reviewsToday || 0,
      reviewsThisWeek: reviewsThisWeek || 0,
      masteryPercentage: totalCards && totalCards > 0
        ? Math.round((cardsMastered / totalCards) * 100)
        : 0
    })

  } catch (error) {
    console.error('Error in flashcards/progress:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
