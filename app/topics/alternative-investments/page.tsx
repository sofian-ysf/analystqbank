import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'CFA Level 1 Alternative Investments Questions & Study Guide 2026 | Free Practice',
  description: 'Master Alternative Investments for CFA Level 1 (7-10% of exam) with 162+ practice questions. Learn hedge funds, private equity, real estate, and commodities. Start free.',
  keywords: 'cfa level 1 alternative investments questions, hedge funds cfa, private equity cfa, real estate cfa, cfa alternative investments study guide',
  alternates: {
    canonical: 'https://www.analysttrainer.com/topics/alternative-investments',
  },
  openGraph: {
    title: 'CFA Level 1 Alternative Investments Questions & Study Guide 2026',
    description: '162+ alternative investments practice questions for CFA Level 1. Master hedge funds, private equity, and real estate.',
    url: 'https://www.analysttrainer.com/topics/alternative-investments',
    type: 'article',
  },
}

export default function AlternativeInvestmentsTopicPage() {
  const topicBreakdown = [
    { title: 'Hedge Funds', questions: 40, percentage: '25%' },
    { title: 'Private Equity', questions: 35, percentage: '22%' },
    { title: 'Real Estate & Infrastructure', questions: 35, percentage: '22%' },
    { title: 'Natural Resources', questions: 25, percentage: '15%' },
    { title: 'Digital Assets', questions: 27, percentage: '16%' },
  ]

  const commonConcepts = [
    {
      title: 'Hedge Fund Strategies',
      description: 'Long/short equity, global macro, event-driven strategies',
      difficulty: 'High',
    },
    {
      title: 'Private Equity Structures',
      description: 'Venture capital, buyouts, and fund structures',
      difficulty: 'High',
    },
    {
      title: 'NAV Calculations',
      description: 'Net asset value for private equity and hedge funds',
      difficulty: 'Medium',
    },
    {
      title: 'Fee Structures',
      description: 'Management fees, carried interest, and hurdle rates',
      difficulty: 'Medium',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much of the CFA Level 1 exam is Alternative Investments?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Alternative Investments represents 7-10% of the CFA Level 1 exam, translating to approximately 13-18 questions out of 180 total questions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What hedge fund strategies should I know?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Focus on long/short equity, global macro, event-driven (merger arbitrage), and relative value strategies. Know the characteristics and risk/return profiles of each.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the hardest part of Alternative Investments?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most candidates find hedge fund performance measurement (hurdle rates, high-water marks) and private equity fee structures challenging.',
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
        { name: 'Alternative Investments', url: '/topics/alternative-investments' }
      ]} />

      <main className="min-h-screen bg-white">
        <Navigation />

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <BreadcrumbNavigation
            items={[
              { name: 'Home', url: '/' },
              { name: 'Topics', url: '/topics' },
              { name: 'Alternative Investments', url: '/topics/alternative-investments' }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-orange-700 to-orange-600 text-white pt-16 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-orange-600/50 rounded-full text-orange-200 text-sm font-medium mb-6">
              7-10% of Exam • 13-18 Questions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CFA Level 1 Alternative Investments Study Guide
            </h1>
            <p className="text-xl text-orange-100 mb-8">
              Master hedge funds, private equity, real estate, and commodities with 162+ practice questions and detailed explanations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cfa-level-1-practice-questions?topic=alternative-investments"
                className="px-8 py-4 bg-white text-orange-700 rounded-full font-semibold text-lg hover:bg-orange-50 transition-colors"
              >
                Practice Alternative Investments Questions
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
              Alternative Investments Topic Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {topicBreakdown.map((topic) => (
                <div key={topic.title} className="p-6 border border-gray-200 rounded-xl hover:border-orange-500 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{topic.title}</h3>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      {topic.percentage}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{topic.questions} practice questions</p>
                  <Link
                    href="/cfa-level-1-practice-questions?topic=alternative-investments"
                    className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center gap-2"
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
              Key Alternative Investments Concepts
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
              How to Ace CFA Level 1 Alternative Investments
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Understand Hedge Fund Basics</h3>
                  <p className="text-gray-600">
                    Know the difference between hedge funds and mutual funds. Focus on strategies, fee structures (2/20), and performance measurement (Sharpe ratio, Sortino ratio).
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Master Private Equity Structures</h3>
                  <p className="text-gray-600">
                    Understand venture capital vs buyout distinctions, fund structures (LP/GP), and the capital call schedule. Private equity has unique cash flow patterns.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn Fee Calculations</h3>
                  <p className="text-gray-600">
                    Carried interest, management fees, hurdle rates, and high-water marks are formula-heavy. Practice calculating hedge fund returns after fees.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Real Estate Valuation</h3>
                  <p className="text-gray-600">
                    Cap rates and net operating income (NOI) are key. Understand direct capitalization vs DCF approaches for real estate valuation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-orange-700 to-orange-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Practicing Alternative Investments
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Access 162+ alternative investments practice questions with detailed explanations. Free trial includes 20 alternative investments questions.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-orange-700 rounded-full font-semibold text-lg hover:bg-orange-50 transition-colors"
            >
              Get Started Free
            </Link>
            <p className="mt-4 text-orange-200 text-sm">No credit card required • Start practicing in 30 seconds</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Alternative Investments FAQs
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How much of the CFA Level 1 exam is Alternative Investments?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Alternative Investments represents 7-10% of the CFA Level 1 exam, translating to approximately 13-18 questions out of 180 total questions.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  What hedge fund strategies should I know?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Focus on long/short equity, global macro, event-driven (merger arbitrage), and relative value strategies. Know the characteristics and risk/return profiles of each.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  What is the hardest part of Alternative Investments?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Most candidates find hedge fund performance measurement (hurdle rates, high-water marks) and private equity fee structures challenging.
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
              <Link href="/cfa-level-1-practice-questions" className="p-6 bg-white rounded-xl border hover:border-orange-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600">All Practice Questions</h3>
                <p className="text-gray-600 text-sm">2,500+ questions across all 10 topics</p>
              </Link>
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-orange-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Full 180-question practice exams</p>
              </Link>
              <Link href="/flashcards" className="p-6 bg-white rounded-xl border hover:border-orange-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600">Alternative Flashcards</h3>
                <p className="text-gray-600 text-sm">70+ flashcards for quick review</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
