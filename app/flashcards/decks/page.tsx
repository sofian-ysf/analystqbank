'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { DeckWithStats, FlashcardWithProgress, ReviewRating } from '@/lib/flashcards/types'
import {
  Scales,
  ChartBar,
  Globe,
  ClipboardText,
  Buildings,
  ChartLineUp,
  Bank,
  ArrowsClockwise,
  Hammer,
  Briefcase,
  Cards,
  CaretDown,
  ArrowLeft,
  Confetti,
} from '@phosphor-icons/react'
import Sidebar from '@/components/dashboard/Sidebar'

// Map topic IDs to Phosphor icons
const topicIcons: { [key: string]: typeof Scales } = {
  'ethical-professional-standards': Scales,
  'quantitative-methods': ChartBar,
  'economics': Globe,
  'financial-statement-analysis': ClipboardText,
  'corporate-issuers': Buildings,
  'equity-investments': ChartLineUp,
  'fixed-income': Bank,
  'derivatives': ArrowsClockwise,
  'alternative-investments': Hammer,
  'portfolio-management': Briefcase,
}

export default function FlashcardsDecksPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [decks, setDecks] = useState<DeckWithStats[]>([])
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  // Study session state
  const [studyingDeck, setStudyingDeck] = useState<DeckWithStats | null>(null)
  const [studyCards, setStudyCards] = useState<FlashcardWithProgress[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [sessionStats, setSessionStats] = useState({ again: 0, hard: 0, good: 0, easy: 0 })
  const [studyLoading, setStudyLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/flashcards')
          return
        }
        setUser(user)

        // Fetch decks from API
        const decksRes = await fetch('/api/flashcards/decks')
        if (decksRes.ok) {
          const data = await decksRes.json()
          setDecks(data.decks || [])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase.auth, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const startStudySession = async (deck: DeckWithStats) => {
    setStudyLoading(true)
    setStudyingDeck(deck)
    setSessionComplete(false)
    setCurrentIndex(0)
    setShowAnswer(false)
    setSessionStats({ again: 0, hard: 0, good: 0, easy: 0 })
    setDecks([]) // Hide deck grid when studying

    try {
      const res = await fetch(`/api/flashcards/decks/${deck.id}/study?limit=20`)
      if (res.ok) {
        const data = await res.json()
        console.log('Cards received:', data.cards.length)
        console.log('First card:', data.cards[0]?.front.substring(0, 50))
        if (data.cards.length === 0) {
          setSessionComplete(true)
        } else {
          setStudyCards(data.cards)
          console.log('studyCards state updated, count:', data.cards.length)
        }
      }
    } catch (e) {
      console.error('Error loading study session:', e)
    } finally {
      setStudyLoading(false)
    }
  }

  const handleReview = async (rating: ReviewRating) => {
    if (!studyCards[currentIndex]) return

    try {
      await fetch('/api/flashcards/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flashcardId: studyCards[currentIndex].id,
          rating
        })
      })

      setSessionStats(prev => ({ ...prev, [rating]: prev[rating] + 1 }))

      const nextIndex = currentIndex + 1
      if (nextIndex >= studyCards.length) {
        setSessionComplete(true)
      } else {
        setCurrentIndex(nextIndex)
        setShowAnswer(false)
      }
    } catch (e) {
      console.error('Error submitting review:', e)
    }
  }

  const exitStudySession = async () => {
    setStudyingDeck(null)
    setStudyCards([])
    setCurrentIndex(0)
    setShowAnswer(false)
    setSessionComplete(false)
    // Refetch decks to show them again
    const decksRes = await fetch('/api/flashcards/decks')
    if (decksRes.ok) {
      const data = await decksRes.json()
      setDecks(data.decks || [])
    }
  }

  const getTopicIcon = (topicId: string) => {
    const Icon = topicIcons[topicId] || Cards
    return <Icon size={20} className="text-white" />
  }

  const getTopicColor = (topicId: string) => {
    const colors: { [key: string]: string } = {
      'ethical-professional-standards': 'bg-blue-500',
      'quantitative-methods': 'bg-purple-500',
      'economics': 'bg-green-500',
      'financial-statement-analysis': 'bg-yellow-500',
      'corporate-issuers': 'bg-pink-500',
      'equity-investments': 'bg-indigo-500',
      'fixed-income': 'bg-orange-500',
      'derivatives': 'bg-cyan-500',
      'alternative-investments': 'bg-teal-500',
      'portfolio-management': 'bg-rose-500',
    }
    return colors[topicId] || 'bg-gray-500'
  }

  if (loading) {
    return (
      <div className="h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FB8CD]"></div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-[#F8F9FA] flex">
      <Sidebar user={user!} onSignOut={handleSignOut} />

      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200 flex-shrink-0">
          <div className="px-4 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Cards size={20} className="text-gray-700" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Flashcards</h1>
                  <span className="text-xs text-green-600 font-medium">100% FREE</span>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1FB8CD] flex items-center justify-center text-white font-semibold text-sm">
                    {user?.email?.[0]?.toUpperCase() || "U"}
                  </div>
                  <CaretDown size={16} className="text-gray-400" />
                </button>
                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                      <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Dashboard
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Hero - only show when not studying */}
            {!studyingDeck && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="text-center">
                  <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    CFA Level 1 Flashcards
                  </h1>
                  <p className="text-gray-500">
                    Master key concepts with spaced repetition. Free flashcards for all 10 CFA topics.
                  </p>
                </div>
              </div>
            )}

            {/* Deck Grid - shown when not studying */}
            {!studyingDeck && decks.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                  <Cards size={28} className="text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No Flashcard Decks Yet</h2>
                <p className="text-gray-600">Check back soon - we&apos;re adding flashcards!</p>
              </div>
            )}

            {/* Deck Grid */}
            {!studyingDeck && decks.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {decks.map((deck) => {
                  const cardsToStudy = (deck.stats?.due || 0) + (deck.stats?.new || 0)
                  return (
                    <div key={deck.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`w-12 h-12 ${getTopicColor(deck.topic_area)} rounded-xl flex items-center justify-center`}>
                          {getTopicIcon(deck.topic_area)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-sm">{deck.name}</h3>
                          <p className="text-xs text-gray-500">{deck.card_count} cards</p>
                        </div>
                      </div>
                      {deck.stats && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>{deck.stats.masteryPercentage}% mastered</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${deck.stats.masteryPercentage}%` }} />
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() => startStudySession(deck)}
                        disabled={cardsToStudy === 0}
                        className={`w-full py-2.5 rounded-xl text-sm font-medium ${
                          cardsToStudy > 0 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {cardsToStudy > 0 ? `Study (${cardsToStudy})` : 'All Caught Up!'}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Study Session View - shown when studying */}
            {studyingDeck && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                {/* Study Header */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={exitStudySession}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                  >
                    <ArrowLeft size={18} />
                    Back to Decks
                  </button>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">
                      Card {currentIndex + 1} of {studyCards.length}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1FB8CD] rounded-full transition-all duration-300"
                      style={{ width: `${((currentIndex + 1) / studyCards.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Session Complete */}
                {sessionComplete ? (
                  <div className="text-center py-8">
                    <div className="mb-4 flex justify-center">
                      <Confetti size={64} className="text-[#1FB8CD]" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Session Complete!</h2>
                    <p className="text-gray-600 mb-6">
                      You reviewed {sessionStats.again + sessionStats.hard + sessionStats.good + sessionStats.easy} cards.
                    </p>

                    {/* Session Stats */}
                    <div className="grid grid-cols-4 gap-3 mb-8 max-w-md mx-auto">
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
                      <div className="bg-blue-50 rounded-xl p-3 text-center">
                        <div className="text-xl font-bold text-blue-500">{sessionStats.easy}</div>
                        <div className="text-xs text-gray-600">Easy</div>
                      </div>
                    </div>

                    <button
                      onClick={exitStudySession}
                      className="px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                    >
                      Back to Decks
                    </button>
                  </div>
                ) : studyLoading ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1FB8CD] mb-4"></div>
                    <p className="text-gray-600">Loading cards...</p>
                  </div>
                ) : (
                  <>
                    {/* Flashcard */}
                    <div className="min-h-[280px] flex flex-col items-center justify-center mb-6">
                      <div className={`w-14 h-14 ${getTopicColor(studyingDeck.topic_area)} rounded-xl flex items-center justify-center mb-4`}>
                        {getTopicIcon(studyingDeck.topic_area)}
                      </div>
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
                        {studyingDeck.name}
                      </span>
                      <p className="text-lg text-gray-900 text-center mb-4">
                        {studyCards[currentIndex]?.front}
                      </p>
                      {!showAnswer && (
                        <button
                          onClick={() => setShowAnswer(true)}
                          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          Show Answer
                        </button>
                      )}
                    </div>

                    {/* Answer */}
                    {showAnswer && (
                      <div className="border-t border-gray-100 pt-6 mb-6">
                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                          <p className="text-sm font-medium text-gray-500 mb-2">Answer:</p>
                          <div className="text-gray-900 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: studyCards[currentIndex]?.back || '' }} />
                        </div>

                        {/* Rating Buttons */}
                        <div className="grid grid-cols-4 gap-3">
                          <button
                            onClick={() => handleReview('again')}
                            className="py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors"
                          >
                            Again
                          </button>
                          <button
                            onClick={() => handleReview('hard')}
                            className="py-3 bg-orange-50 text-orange-600 rounded-xl font-medium hover:bg-orange-100 transition-colors"
                          >
                            Hard
                          </button>
                          <button
                            onClick={() => handleReview('good')}
                            className="py-3 bg-green-50 text-green-600 rounded-xl font-medium hover:bg-green-100 transition-colors"
                          >
                            Good
                          </button>
                          <button
                            onClick={() => handleReview('easy')}
                            className="py-3 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors"
                          >
                            Easy
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}