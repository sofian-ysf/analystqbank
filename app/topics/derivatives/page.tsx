import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'CFA Level 1 Derivatives Questions & Study Guide 2026 | Free Practice',
  description: 'Master Derivatives for CFA Level 1 (5-8% of exam) with 108+ practice questions. Learn forwards, futures, options, swaps, and arbitrage strategies. Start free.',
  keywords: 'cfa level 1 derivatives questions, derivatives cfa practice, forwards futures options, cfa derivatives study guide, option pricing cfa',
  alternates: {
    canonical: 'https://www.analysttrainer.com/topics/derivatives',
  },
  openGraph: {
    title: 'CFA Level 1 Derivatives Questions & Study Guide 2026',
    description: '108+ derivatives practice questions for CFA Level 1. Master forwards, futures, options, and swaps.',
    url: 'https://www.analysttrainer.com/topics/derivatives',
    type: 'article',
  },
}

export default function DerivativesTopicPage() {
  const topicBreakdown = [
    { title: 'Forward Commitments', questions: 25, percentage: '23%' },
    { title: 'Option Features & Strategies', questions: 30, percentage: '28%' },
    { title: 'Pricing & Valuation', questions: 25, percentage: '23%' },
    { title: 'Put-Call Parity', questions: 15, percentage: '14%' },
    { title: 'Derivative Benefits & Risks', questions: 13, percentage: '12%' },
  ]

  const commonConcepts = [
    {
      title: 'Forward Pricing',
      description: 'Understanding forward contract pricing using cost of carry model',
      difficulty: 'High',
    },
    {
      title: 'Option Payoffs',
      description: 'Calculating profit/loss for call and put options at expiration',
      difficulty: 'High',
    },
    {
      title: 'Put-Call Parity',
      description: 'The fundamental relationship between call, put, and forward prices',
      difficulty: 'Medium',
    },
    {
      title: 'Binomial Pricing',
      description: 'Valuing options using one and two-step binomial models',
      difficulty: 'Medium',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much of the CFA Level 1 exam is Derivatives?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Derivatives represents 5-8% of the CFA Level 1 exam, translating to approximately 9-14 questions out of 180 total questions. While smaller than some topics, it provides essential foundation for Level 2.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the most difficult part of Derivatives?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most candidates find option pricing (binomial model) and put-call parity the most challenging. Focus on understanding the logic rather than memorizing formulas.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I master Derivatives for CFA Level 1?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Start with forwards and futures (simpler), then move to options. Practice payoff diagrams until you can draw them instantly. Understand put-call parity - it connects everything.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Topics', url: '/topics' },
        { name: 'Derivatives', url: '/topics/derivatives' }
      ]} />

      <main className="min-h-screen bg-white">
        <Navigation />

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <BreadcrumbNavigation
            items={[
              { name: 'Home', url: '/' },
              { name: 'Topics', url: '/topics' },
              { name: 'Derivatives', url: '/topics/derivatives' }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-pink-900 to-pink-800 text-white pt-16 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-pink-700/50 rounded-full text-pink-200 text-sm font-medium mb-6">
              5-8% of Exam • 9-14 Questions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CFA Level 1 Derivatives Study Guide
            </h1>
            <p className="text-xl text-pink-100 mb-8">
              Master forwards, futures, options, and swaps with 108+ practice questions, payoff diagrams, and proven strategies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cfa-level-1-practice-questions?topic=derivatives"
                className="px-8 py-4 bg-white text-pink-900 rounded-full font-semibold text-lg hover:bg-pink-50 transition-colors"
              >
                Practice Derivatives Questions
              </Link>
              <Link
                href="/signup"
                className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>

        {/* Topic Breakdown */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Derivatives Topic Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {topicBreakdown.map((topic) => (
                <div key={topic.title} className="p-6 border border-gray-200 rounded-xl hover:border-pink-500 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{topic.title}</h3>
                    <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
                      {topic.percentage}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{topic.questions} practice questions</p>
                  <Link
                    href="/cfa-level-1-practice-questions?topic=derivatives"
                    className="text-pink-600 hover:text-pink-700 font-medium inline-flex items-center gap-2"
                  >
                    Practice Now
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Concepts */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Key Derivatives Concepts
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Master these fundamental concepts that appear regularly on the CFA Level 1 exam
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {commonConcepts.map((concept) => (
                <div key={concept.title} className="p-6 bg-white rounded-xl shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{concept.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      concept.difficulty === 'High'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {concept.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-600">{concept.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Study Tips */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              How to Ace CFA Level 1 Derivatives
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Start with Forwards, Then Options</h3>
                  <p className="text-gray-600">
                    Forwards are simpler - master forward pricing first using cost of carry. Then move to options where the payoff diagrams make concepts clearer.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Practice Payoff Diagrams</h3>
                  <p className="text-gray-600">
                    Draw payoff diagrams for every option strategy. Being able to sketch calls, puts, spreads, and straddles instantly is essential for exam success.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Master Put-Call Parity</h3>
                  <p className="text-gray-600">
                    Put-call parity is the most important concept in derivatives. It connects calls, puts, forwards, and underlying asset prices. Memorize: C - P = S - PV(K).
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Understand Binomial Model Intuition</h3>
                  <p className="text-gray-600">
                    Don't just memorize the binomial formula - understand how hedging creates a riskless portfolio. This foundation makes pricing intuitive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-pink-900 to-pink-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Practicing Derivatives Questions
            </h2>
            <p className="text-xl text-pink-100 mb-8">
              Access 108+ derivatives practice questions with detailed explanations. Free trial includes 20 derivatives questions.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-pink-900 rounded-full font-semibold text-lg hover:bg-pink-50 transition-colors"
            >
              Get Started Free
            </Link>
            <p className="mt-4 text-pink-200 text-sm">No credit card required • Start practicing in 30 seconds</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Derivatives FAQs
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How much of the CFA Level 1 exam is Derivatives?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Derivatives represents 5-8% of the CFA Level 1 exam, translating to approximately 9-14 questions out of 180 total questions. While smaller than some topics, it provides essential foundation for Level 2.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  What is the most difficult part of Derivatives?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Most candidates find option pricing (binomial model) and put-call parity the most challenging. Focus on understanding the logic rather than memorizing formulas.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How do I master Derivatives for CFA Level 1?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Start with forwards and futures (simpler), then move to options. Practice payoff diagrams until you can draw them instantly. Understand put-call parity - it connects everything.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Related Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/cfa-level-1-practice-questions" className="p-6 bg-white rounded-xl border hover:border-pink-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-pink-600">All Practice Questions</h3>
                <p className="text-gray-600 text-sm">2,500+ questions across all 10 topics</p>
              </Link>
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-pink-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-pink-600">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Full 180-question practice exams</p>
              </Link>
              <Link href="/flashcards" className="p-6 bg-white rounded-xl border hover:border-pink-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-pink-600">Derivatives Flashcards</h3>
                <p className="text-gray-600 text-sm">80+ flashcards for quick review</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
