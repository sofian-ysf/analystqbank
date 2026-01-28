'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import { FlashcardWithProgress, ReviewRating, StudySession, SessionStats } from '@/lib/flashcards/types'
import { FlashcardDisplay, ReviewButtons, QuestionBankUpsell } from '@/components/flashcards'
import { cfaLevel1Curriculum } from '@/lib/curriculum'

interface DeckInfo {
  id: string
  name: string
  slug: string
  topic_area: string
  card_count: number
}

export default function StudyPage() {
  const params = useParams()
  const router = useRouter()
  const deckId = params.deckId as string
  const supabase = createClient()

  // State
  const [deck, setDeck] = useState<DeckInfo | null>(null)
  const [cards, setCards] = useState<FlashcardWithProgress[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    again: 0,
    hard: 0,
    good: 0,
    easy: 0
  })

  // Load study session
  const loadSession = useCallback(async () => {
    setLoading(true)
    setError(null)
    setSessionComplete(false)
    setCurrentIndex(0)
    setShowAnswer(false)
    setSessionStats({ again: 0, hard: 0, good: 0, easy: 0 })

    try {
      const res = await fetch(`/api/flashcards/decks/${deckId}/study?limit=20`)

      if (res.status === 401) {
        router.push(`/login?redirect=/flashcards/study/${deckId}`)
        return
      }

      if (!res.ok) {
        throw new Error('Failed to load study session')
      }

      const data = await res.json()
      setDeck(data.deck)

      if (data.cards.length === 0) {
        setSessionComplete(true)
      } else {
        setCards(data.cards)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [deckId, router])

  useEffect(() => {
    loadSession()
  }, [loadSession])

  // Handle review submission
  const handleReview = useCallback(async (rating: ReviewRating) => {
    if (submitting || currentIndex >= cards.length) return

    const currentCard = cards[currentIndex]
    setSubmitting(true)

    try {
      const res = await fetch('/api/flashcards/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flashcardId: currentCard.id,
          rating
        })
      })

      if (!res.ok) {
        throw new Error('Failed to submit review')
      }

      // Update session stats
      setSessionStats(prev => ({
        ...prev,
        [rating]: prev[rating] + 1
      }))

      // Move to next card
      const nextIndex = currentIndex + 1
      if (nextIndex >= cards.length) {
        setSessionComplete(true)
      } else {
        setCurrentIndex(nextIndex)
        setShowAnswer(false)
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error')
    } finally {
      setSubmitting(false)
    }
  }, [cards, currentIndex, submitting])

  // Get topic metadata
  const topicMeta = deck
    ? cfaLevel1Curriculum.find(t => t.id === deck.topic_area)
    : null

  const currentCard = cards[currentIndex]
  const completedCount = currentIndex
  const totalReviewed = sessionStats.again + sessionStats.hard + sessionStats.good + sessionStats.easy

  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#EAEEEF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <Link href="/flashcards" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back to Decks</span>
            </Link>

            {deck && (
              <div className="flex items-center gap-2">
                {topicMeta && (
                  <span className={`w-6 h-6 ${topicMeta.color} rounded-md flex items-center justify-center text-white text-xs`}>
                    {topicMeta.icon}
                  </span>
                )}
                <span className="text-sm font-medium text-gray-900 hidden sm:block">
                  {deck.name}
                </span>
              </div>
            )}

            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-8 px-4 sm:px-6 max-w-2xl mx-auto">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1FB8CD] mb-4"></div>
            <p className="text-gray-600">Loading flashcards...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">😕</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={loadSession}
              className="px-6 py-2 bg-[#1FB8CD] text-white rounded-full font-medium hover:bg-[#1FB8CD]/90"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Session Complete */}
        {!loading && !error && sessionComplete && (
          <div className="py-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Complete!</h2>
              <p className="text-gray-600">
                {totalReviewed > 0
                  ? `You reviewed ${totalReviewed} cards.`
                  : 'No cards to review right now. Check back later!'}
              </p>
            </div>

            {/* Session Stats */}
            {totalReviewed > 0 && (
              <div className="grid grid-cols-4 gap-3 mb-8">
                <div className="bg-red-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-red-500">{sessionStats.again}</div>
                  <div className="text-xs text-gray-600">Again</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-orange-500">{sessionStats.hard}</div>
                  <div className="text-xs text-gray-600">Hard</div>
                </div>
                <div className="bg-green-50 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-green-500">{sessionStats.good}</div>
                  <div className="text-xs text-gray-600">Good</div>
                </div>
                <div className="bg-[#1FB8CD]/10 rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-[#1FB8CD]">{sessionStats.easy}</div>
                  <div className="text-xs text-gray-600">Easy</div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={loadSession}
                className="flex-1 py-3 px-6 bg-[#13343B] text-white rounded-full font-medium hover:bg-[#13343B]/90 transition-colors"
              >
                Study More Cards
              </button>
              <Link
                href="/flashcards"
                className="flex-1 py-3 px-6 bg-white border border-[#EAEEEF] text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors text-center"
              >
                Back to Decks
              </Link>
            </div>

            {/* Upsell */}
            <QuestionBankUpsell
              variant="banner"
              topicArea={deck?.topic_area}
              topicName={deck?.name}
              masteredCount={totalReviewed}
            />
          </div>
        )}

        {/* Active Study Session */}
        {!loading && !error && !sessionComplete && currentCard && (
          <>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                <span>Card {currentIndex + 1} of {cards.length}</span>
                <span>{completedCount} completed</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1FB8CD] rounded-full transition-all duration-300"
                  style={{ width: `${(completedCount / cards.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Card Display */}
            <FlashcardDisplay
              card={currentCard}
              showAnswer={showAnswer}
              onShowAnswer={() => setShowAnswer(true)}
            />

            {/* Review Buttons */}
            {showAnswer && (
              <ReviewButtons
                onReview={handleReview}
                disabled={submitting}
                repetitions={currentCard.progress?.repetitions || 0}
                easeFactor={currentCard.progress?.ease_factor || 2.5}
                interval={currentCard.progress?.interval_days || 0}
              />
            )}

            {/* Mini Stats */}
            <div className="mt-8 flex justify-center gap-4 text-xs text-gray-500">
              {sessionStats.again > 0 && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {sessionStats.again} again
                </span>
              )}
              {sessionStats.hard > 0 && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  {sessionStats.hard} hard
                </span>
              )}
              {sessionStats.good > 0 && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {sessionStats.good} good
                </span>
              )}
              {sessionStats.easy > 0 && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#1FB8CD] rounded-full"></span>
                  {sessionStats.easy} easy
                </span>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
