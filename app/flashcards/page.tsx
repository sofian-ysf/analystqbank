'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { DeckWithStats } from '@/lib/flashcards/types'
import { cfaLevel1Curriculum } from '@/lib/curriculum'
import { QuestionBankUpsell } from '@/components/flashcards'

// Map topic_area IDs to curriculum data
const getTopicMeta = (topicId: string) => {
  const topic = cfaLevel1Curriculum.find(t => t.id === topicId)
  return topic || { icon: '📚', color: 'bg-gray-500', examWeight: '' }
}

export default function FlashcardsPage() {
  const router = useRouter()
  const supabase = createClient()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [decks, setDecks] = useState<DeckWithStats[]>([])
  const [progress, setProgress] = useState<{
    totalCards: number
    cardsStudied: number
    cardsDueToday: number
    streakDays: number
    reviewsToday: number
  } | null>(null)

  // Fetch user and data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check auth
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)

        // Fetch decks (public - no auth required)
        const decksRes = await fetch('/api/flashcards/decks')
        if (decksRes.ok) {
          const data = await decksRes.json()
          setDecks(data.decks || [])
        }

        // Fetch progress if logged in
        if (user) {
          const progressRes = await fetch('/api/flashcards/progress')
          if (progressRes.ok) {
            const data = await progressRes.json()
            setProgress(data)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [supabase.auth])

  // Calculate total cards to study
  const totalDue = decks.reduce((sum, d) => sum + (d.stats?.due || 0), 0)
  const totalNew = decks.reduce((sum, d) => sum + (d.stats?.new || 0), 0)
  const totalToStudy = totalDue + Math.min(totalNew, 20) // Limit new cards

  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#EAEEEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                href="/flashcards"
                className="text-sm font-medium text-[#13343B]"
              >
                Flashcards
              </Link>
              <Link
                href="/question-bank"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Question Bank
              </Link>
              {user ? (
                <Link
                  href="/dashboard"
                  className="px-4 py-2 bg-[#13343B] text-white rounded-full text-sm font-medium hover:bg-[#13343B]/90"
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-[#13343B] text-white rounded-full text-sm font-medium hover:bg-[#13343B]/90"
                >
                  Start Free
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            100% FREE
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#13343B] mb-3">
            CFA Level 1 Flashcards
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master key concepts with spaced repetition. Free flashcards for all 10 CFA topics.
          </p>
        </div>

        {/* Stats Cards (if logged in) */}
        {user && progress && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white rounded-xl border border-[#EAEEEF] p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">{progress.cardsDueToday}</div>
              <div className="text-sm text-gray-600">Due Today</div>
            </div>
            <div className="bg-white rounded-xl border border-[#EAEEEF] p-4 text-center">
              <div className="text-2xl font-bold text-[#1FB8CD]">{totalNew}</div>
              <div className="text-sm text-gray-600">New Cards</div>
            </div>
            <div className="bg-white rounded-xl border border-[#EAEEEF] p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{progress.streakDays}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
            <div className="bg-white rounded-xl border border-[#EAEEEF] p-4 text-center">
              <div className="text-2xl font-bold text-purple-500">{progress.reviewsToday}</div>
              <div className="text-sm text-gray-600">Today&apos;s Reviews</div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1FB8CD]"></div>
          </div>
        )}

        {/* No Decks State */}
        {!loading && decks.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Flashcard Decks Yet</h2>
            <p className="text-gray-600">Check back soon - we&apos;re adding flashcards!</p>
          </div>
        )}

        {/* Deck Grid */}
        {!loading && decks.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {decks.map((deck) => {
              const meta = getTopicMeta(deck.topic_area)
              const cardsToStudy = (deck.stats?.due || 0) + (deck.stats?.new || 0)

              return (
                <div
                  key={deck.id}
                  className="bg-white rounded-2xl border border-[#EAEEEF] p-5 hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${meta.color} rounded-xl flex items-center justify-center text-white text-lg`}>
                        {meta.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                          {deck.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {deck.card_count} cards
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  {user && deck.stats && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{deck.stats.masteryPercentage}% mastered</span>
                        <span>{deck.stats.mastered}/{deck.card_count}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all duration-300"
                          style={{ width: `${deck.stats.masteryPercentage}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Study Info */}
                  {user && (
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                      {deck.stats && deck.stats.due > 0 && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          {deck.stats.due} due
                        </span>
                      )}
                      {deck.stats && deck.stats.new > 0 && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 bg-[#1FB8CD] rounded-full"></span>
                          {deck.stats.new} new
                        </span>
                      )}
                    </div>
                  )}

                  {/* Study Button */}
                  <Link
                    href={user ? `/flashcards/study/${deck.id}` : '/login?redirect=/flashcards'}
                    className={`block w-full text-center py-2.5 rounded-full text-sm font-medium transition-colors ${
                      cardsToStudy > 0 || !user
                        ? 'bg-[#13343B] text-white hover:bg-[#13343B]/90'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {!user
                      ? 'Sign in to Study'
                      : cardsToStudy > 0
                        ? `Study (${cardsToStudy})`
                        : 'All Caught Up!'
                    }
                  </Link>
                </div>
              )
            })}
          </div>
        )}

        {/* Upsell Banner */}
        {!loading && decks.length > 0 && (
          <div className="mt-12">
            <QuestionBankUpsell variant="banner" />
          </div>
        )}

        {/* Sign-in prompt for non-logged-in users */}
        {!loading && !user && (
          <div className="mt-10 text-center">
            <div className="inline-flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-[#EAEEEF]">
              <p className="text-gray-600">
                Sign in to track your progress and unlock spaced repetition
              </p>
              <Link
                href="/signup"
                className="px-6 py-2.5 bg-[#1FB8CD] text-white rounded-full font-medium hover:bg-[#1FB8CD]/90 transition-colors"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
