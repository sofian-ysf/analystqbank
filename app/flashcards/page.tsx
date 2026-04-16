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
import FloatingGetStartedButton from '../components/FloatingGetStartedButton'

// SVG icons for each topic (cleaner than emojis)
const topicIcons: Record<string, React.ReactNode> = {
  'ethical-professional-standards': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  ),
  'quantitative-methods': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  'economics': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'financial-statement-analysis': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  'corporate-issuers': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  'equity-investments': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  'fixed-income': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'derivatives': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
  ),
  'alternative-investments': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  'portfolio-management': (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
    </svg>
  ),
}

// Map topic_area IDs to curriculum data
const getTopicMeta = (topicId: string) => {
  const topic = cfaLevel1Curriculum.find(t => t.id === topicId)
  return topic || { icon: '', color: 'bg-gray-500', examWeight: '' }
}

// Get SVG icon for topic
const getTopicIcon = (topicId: string) => {
  return topicIcons[topicId] || (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  )
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
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
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
                      <div className={`w-10 h-10 ${meta.color} rounded-xl flex items-center justify-center text-white`}>
                        {getTopicIcon(deck.topic_area)}
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

        <FloatingGetStartedButton />
      </main>
    </div>
  )
}
