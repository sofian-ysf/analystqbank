'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import { DeckWithStats } from '@/lib/flashcards/types'
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
            {/* Hero */}
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

            {/* Deck Grid */}
            {decks.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                  <Cards size={28} className="text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No Flashcard Decks Yet</h2>
                <p className="text-gray-600">Check back soon - we&apos;re adding flashcards!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {decks.map((deck) => {
                  const cardsToStudy = (deck.stats?.due || 0) + (deck.stats?.new || 0)

                  return (
                    <div
                      key={deck.id}
                      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 ${getTopicColor(deck.topic_area)} rounded-xl flex items-center justify-center`}>
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
                      {deck.stats && (
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

                      {/* Study Button */}
                      <Link
                        href={`/flashcards/study/${deck.id}`}
                        className={`block w-full text-center py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          cardsToStudy > 0
                            ? 'bg-gray-900 text-white hover:bg-gray-800'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {cardsToStudy > 0
                          ? `Study (${cardsToStudy})`
                          : 'All Caught Up!'
                        }
                      </Link>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}