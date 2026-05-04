'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import { Check } from '@phosphor-icons/react'

const sampleQuestion = {
  topic: 'Fixed Income',
  question: 'A bond with a par value of $1,000 and a coupon rate of 6% paid semi-annually is priced at $1,050. If the bond has 5 years to maturity, which of the following best describes the relationship between the bond\'s coupon rate and its yield to maturity (YTM)?',
  options: [
    'The coupon rate is greater than the YTM',
    'The coupon rate is equal to the YTM',
    'The coupon rate is less than the YTM',
  ],
  correctAnswer: 0,
  explanation: 'When a bond is trading at a premium (price > par value), it means the coupon rate is higher than the current market yield (YTM). Investors are willing to pay more than par value because the bond\'s coupon payments are more attractive than current market rates.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the CFA Question of the Day?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The CFA Question of the Day is a free daily practice question delivered to your email inbox each morning. It covers topics from the CFA Level 1 curriculum with a detailed explanation to help you learn and retain key concepts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the Question of the Day really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, the CFA Question of the Day is completely free. Simply subscribe with your email address and receive one question every morning. No credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What topics are covered in the Question of the Day?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Questions rotate through all 10 CFA Level 1 topic areas: Ethics, Quantitative Methods, Economics, Financial Statement Analysis, Corporate Issuers, Equity Investments, Fixed Income, Derivatives, Alternative Investments, and Portfolio Management.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I unsubscribe at any time?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, every email includes an unsubscribe link at the bottom. You can cancel your subscription at any time with just one click.',
      },
    },
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Subscribe to CFA Question of the Day',
  description: 'Subscribe to receive a free daily CFA Level 1 practice question delivered to your email inbox each morning.',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Enter your email address',
      text: 'Type your email address into the subscription form on this page.',
    },
    {
      '@type': 'HowToStep',
      name: 'Click Subscribe',
      text: 'Click the "Subscribe Free" button to submit your subscription.',
    },
    {
      '@type': 'HowToStep',
      name: 'Confirm your email',
      text: 'Check your inbox for a confirmation email and click the confirmation link to activate your subscription.',
    },
    {
      '@type': 'HowToStep',
      name: 'Receive daily questions',
      text: 'Starting tomorrow, you will receive one CFA practice question each morning with a detailed explanation.',
    },
  ],
}

export default function DailyQuestionPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    try {
      // TODO: Integrate with email service
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
    } catch (error) {
      console.error('Failed to submit:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index)
    setShowAnswer(true)
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <div className="min-h-screen bg-white">
        <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-b from-purple-900 to-purple-800 text-white pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-purple-700/50 rounded-full text-purple-200 text-sm font-medium mb-6">
            FREE - Delivered Daily to Your Inbox
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            CFA Question of the Day
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto mb-8">
            One CFA Level 1 question every morning with a detailed explanation. Build your knowledge one question at a time.
          </p>

          {/* Email Signup */}
          <div className="max-w-md mx-auto">
            {isSubmitted ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">You're subscribed!</h3>
                <p className="text-purple-200">
                  Check your inbox tomorrow morning for your first question.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-5 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-purple-400 outline-none text-lg"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#1FB8CD] text-white rounded-xl font-semibold text-lg hover:bg-[#18a3b5] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe Free'}
                </button>
                <p className="text-purple-300 text-sm">
                  Join 5,000+ CFA candidates. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Sample Question */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Try Today's Sample Question
            </h2>
            <p className="text-gray-600">
              Here's an example of what you'll receive every morning.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
            {/* Question Header */}
            <div className="bg-gray-50 px-6 py-4 border-b flex items-center justify-between">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {sampleQuestion.topic}
              </span>
              <span className="text-sm text-gray-500">CFA Level 1</span>
            </div>

            {/* Question Body */}
            <div className="p-6">
              <p className="text-lg text-gray-900 mb-6">
                {sampleQuestion.question}
              </p>

              <div className="space-y-3">
                {sampleQuestion.options.map((option, index) => {
                  const isCorrect = index === sampleQuestion.correctAnswer
                  const isSelected = selectedAnswer === index

                  let bgColor = 'bg-gray-50 hover:bg-gray-100'
                  if (showAnswer) {
                    if (isCorrect) bgColor = 'bg-green-50 border-green-500'
                    else if (isSelected && !isCorrect) bgColor = 'bg-red-50 border-red-500'
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={showAnswer}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${bgColor} ${
                        showAnswer ? '' : 'border-gray-200'
                      }`}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                      {option}
                      {showAnswer && isCorrect && (
                        <span className="float-right text-green-600"><Check size={16} weight="bold" /> Correct</span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              {showAnswer && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Explanation</h4>
                  <p className="text-blue-800 text-sm">{sampleQuestion.explanation}</p>
                </div>
              )}

              {!showAnswer && (
                <p className="text-center text-gray-500 text-sm mt-6">
                  Click an answer to see the explanation
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Subscribe?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Build a Daily Habit</h3>
              <p className="text-gray-600">
                Consistent practice beats cramming. One question a day keeps your knowledge fresh.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn from Explanations</h3>
              <p className="text-gray-600">
                Every question includes a detailed explanation to deepen your understanding.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Cover All Topics</h3>
              <p className="text-gray-600">
                Questions rotate through all 10 CFA Level 1 topic areas systematically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-purple-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Start Tomorrow Morning
          </h2>
          <p className="text-purple-200 mb-8">
            Subscribe now and get your first CFA question delivered to your inbox tomorrow.
          </p>

          {!isSubmitted && (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="flex-1 px-5 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-400 outline-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#1FB8CD] text-white rounded-lg font-semibold hover:bg-[#18a3b5] transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe Free'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Upsell */}
      <section className="py-16 px-4 bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Want More Than One Question a Day?
          </h3>
          <p className="text-gray-600 mb-6">
            Get unlimited access to 2,500+ practice questions with our full question bank.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-3 bg-[#13343B] text-white rounded-lg font-semibold hover:bg-[#1a4a54] transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-7xl text-center text-sm text-gray-600">
          <p>© 2026 AnalystTrainer. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}
