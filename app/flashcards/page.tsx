'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
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
  Check,
  Cards,
  ArrowRight,
  ArrowLeft,
  SignIn,
} from '@phosphor-icons/react'

// Sample flashcards for demo
const sampleCards = [
  {
    id: 1,
    topic: 'ethics',
    topicName: 'Ethical & Professional Standards',
    icon: Scales,
    color: 'bg-blue-500',
    question: 'What is the CFA Institute\'s definition of a "client"?',
    answer: 'An individual, institution, or corporation that has a direct or indirect relationship with the investment professional, including any prospective client.',
    flipped: false,
  },
  {
    id: 2,
    topic: 'quant',
    topicName: 'Quantitative Methods',
    icon: ChartBar,
    color: 'bg-purple-500',
    question: 'What does the Sharpe Ratio measure?',
    answer: 'Risk-adjusted return, calculated as (Portfolio Return - Risk-Free Rate) / Portfolio Standard Deviation. Higher ratio indicates better risk-adjusted performance.',
    flipped: false,
  },
  {
    id: 3,
    topic: 'economics',
    topicName: 'Economics',
    icon: Globe,
    color: 'bg-green-500',
    question: 'What is the equation of exchange in monetary economics?',
    answer: 'M × V = P × Y (Money supply × Velocity of money = Price level × Real output). This forms the basis of the quantity theory of money.',
    flipped: false,
  },
  {
    id: 4,
    topic: 'fixed-income',
    topicName: 'Fixed Income',
    icon: Bank,
    color: 'bg-orange-500',
    question: 'What is duration and how does it measure bond risk?',
    answer: 'Duration measures a bond\'s price sensitivity to interest rate changes. Modified Duration = Macaulay Duration / (1+y/m). A duration of 5 means prices rise 5% when rates fall 1%.',
    flipped: false,
  },
]

export default function FlashcardsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [cards, setCards] = useState(sampleCards)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    checkUser()
  }, [supabase.auth])

  const flipCard = () => {
    setCards(prev => prev.map((card, i) =>
      i === currentCardIndex ? { ...card, flipped: !card.flipped } : card
    ))
  }

  const nextCard = () => {
    setCards(prev => prev.map((card, i) =>
      i === currentCardIndex ? { ...card, flipped: false } : card
    ))
    setCurrentCardIndex(prev => (prev + 1) % cards.length)
  }

  const prevCard = () => {
    setCards(prev => prev.map((card, i) =>
      i === currentCardIndex ? { ...card, flipped: false } : card
    ))
    setCurrentCardIndex(prev => (prev - 1 + cards.length) % cards.length)
  }

  const currentCard = cards[currentCardIndex]
  const IconComponent = currentCard?.icon || Cards

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1FB8CD]"></div>
      </div>
    )
  }

  // If user is logged in, redirect to the decks page
  if (user) {
    router.push('/flashcards/decks')
    return null
  }

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
              <Link href="/flashcards" className="text-sm font-medium text-[#13343B]">
                Flashcards
              </Link>
              <Link href="/question-bank" className="text-sm text-gray-600 hover:text-gray-900">
                Question Bank
              </Link>
              {user ? (
                <Link href="/dashboard" className="px-4 py-2 bg-[#13343B] text-white rounded-full text-sm font-medium hover:bg-[#13343B]/90">
                  Dashboard
                </Link>
              ) : (
                <Link href="/signup" className="px-4 py-2 bg-[#13343B] text-white rounded-full text-sm font-medium hover:bg-[#13343B]/90">
                  Start Free
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              <Check size={16} weight="bold" />
              100% FREE
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#13343B] mb-4">
              Master CFA with Flashcards
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Spaced repetition flashcards covering all 10 CFA Level 1 topics. Try the demo below.
            </p>
          </div>

          {/* Interactive Demo */}
          <div className="mb-12">
            {/* Topic Pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {sampleCards.map((card, i) => {
                const PillIcon = card.icon
                return (
                  <button
                    key={card.id}
                    onClick={() => {
                      setCards(prev => prev.map((c, idx) =>
                        idx === currentCardIndex ? { ...c, flipped: false } : c
                      ))
                      setCurrentCardIndex(i)
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      i === currentCardIndex
                        ? `${card.color} text-white`
                        : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <PillIcon size={14} />
                    {card.topicName.split(' ')[0]}
                  </button>
                )
              })}
            </div>

            {/* Flashcard */}
            <div className="relative perspective-1000 mb-6" onClick={flipCard}>
              <div
                className={`relative w-full min-h-[320px] cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
                  currentCard?.flipped ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: currentCard?.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center justify-center backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className={`w-14 h-14 ${currentCard?.color} rounded-xl flex items-center justify-center mb-6`}>
                    <IconComponent size={28} className="text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
                    {currentCard?.topicName}
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">
                    {currentCard?.question}
                  </h3>
                  <p className="text-sm text-[#1FB8CD] font-medium">Click to reveal answer</p>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                    <Check size={28} className="text-white" />
                  </div>
                  <span className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
                    Answer
                  </span>
                  <p className="text-lg text-white text-center leading-relaxed">
                    {currentCard?.answer}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prevCard}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={18} />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCards(prev => prev.map((c, idx) =>
                        idx === currentCardIndex ? { ...c, flipped: false } : c
                      ))
                      setCurrentCardIndex(i)
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === currentCardIndex ? 'bg-[#1FB8CD] w-8' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextCard}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Next
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Cards size={24} className="text-blue-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">2,000+ Cards</h3>
              <p className="text-sm text-gray-500">Comprehensive coverage of all 10 CFA topics</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ArrowsClockwise size={24} className="text-green-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Spaced Repetition</h3>
              <p className="text-sm text-gray-500">Optimized learning with scientifically-proven intervals</p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Check size={24} className="text-purple-500" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-sm text-gray-500">Monitor mastery and identify weak areas</p>
            </div>
          </div>

          {/* CTA */}
          {!user && (
            <div className="bg-gradient-to-br from-[#13343B] to-[#1a5a65] rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to master the CFA curriculum?
              </h2>
              <p className="text-white/80 mb-8 max-w-lg mx-auto">
                Create a free account to access all flashcards, track your progress, and ace your exam.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#13343B] rounded-xl font-semibold hover:bg-gray-100 transition-colors"
                >
                  <SignIn size={20} />
                  Create Free Account
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          )}

          {user && (
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                You&apos;re signed in!
              </h2>
              <p className="text-gray-600 mb-6">
                Access all flashcards and track your progress from your dashboard.
              </p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#13343B] text-white rounded-xl font-semibold hover:bg-[#13343B]/90 transition-colors"
              >
                Go to Dashboard
                <ArrowRight size={20} />
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}