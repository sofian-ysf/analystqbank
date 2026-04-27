import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'CFA Level 1 Economics Questions & Study Guide 2026 | Free Practice',
  description: 'Master Economics for CFA Level 1 (6-9% of exam) with 140+ practice questions. Learn micro/macroeconomics, monetary policy, and exchange rates. Start free.',
  keywords: 'cfa level 1 economics questions, economics cfa practice, monetary policy cfa, gdp cfa, cfa economics study guide',
  alternates: {
    canonical: 'https://www.analysttrainer.com/topics/economics',
  },
  openGraph: {
    title: 'CFA Level 1 Economics Questions & Study Guide 2026',
    description: '140+ economics practice questions for CFA Level 1. Master micro, macro, monetary policy, and exchange rates.',
    url: 'https://www.analysttrainer.com/topics/economics',
    type: 'article',
  },
}

export default function EconomicsTopicPage() {
  const topicBreakdown = [
    { title: 'Microeconomics', questions: 40, percentage: '29%' },
    { title: 'Macroeconomics', questions: 40, percentage: '29%' },
    { title: 'Monetary & Fiscal Policy', questions: 30, percentage: '21%' },
    { title: 'International Trade & FX', questions: 30, percentage: '21%' },
  ]

  const commonConcepts = [
    {
      title: 'Supply & Demand',
      description: 'Market equilibrium, elasticity, and market structures',
      difficulty: 'High',
    },
    {
      title: 'GDP & Business Cycles',
      description: 'Understanding economic growth and cyclical fluctuations',
      difficulty: 'High',
    },
    {
      title: 'Monetary Policy',
      description: 'How central banks control money supply and interest rates',
      difficulty: 'Medium',
    },
    {
      title: 'Exchange Rate Calculations',
      description: 'FX quotes, cross rates, and interest rate parity',
      difficulty: 'Medium',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much of the CFA Level 1 exam is Economics?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Economics represents 6-9% of the CFA Level 1 exam, translating to approximately 11-16 questions out of 180 total questions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the hardest part of Economics for CFA candidates?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most candidates struggle with exchange rate calculations (direct vs indirect quotes) and understanding the different market structures (monopoly, oligopoly, perfect competition).',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Economics more micro or macro for CFA?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Both are equally weighted. Microeconomics covers market structures and supply/demand. Macroeconomics covers business cycles, monetary policy, and international economics.',
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
        { name: 'Economics', url: '/topics/economics' }
      ]} />

      <main className="min-h-screen bg-white">
        <Navigation />

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <BreadcrumbNavigation
            items={[
              { name: 'Home', url: '/' },
              { name: 'Topics', url: '/topics' },
              { name: 'Economics', url: '/topics/economics' }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-green-900 to-green-800 text-white pt-16 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-green-700/50 rounded-full text-green-200 text-sm font-medium mb-6">
              6-9% of Exam • 11-16 Questions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CFA Level 1 Economics Study Guide
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Master micro and macroeconomics, monetary policy, and exchange rates with 140+ practice questions and detailed explanations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cfa-level-1-practice-questions?topic=economics"
                className="px-8 py-4 bg-white text-green-900 rounded-full font-semibold text-lg hover:bg-green-50 transition-colors"
              >
                Practice Economics Questions
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
              Economics Topic Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {topicBreakdown.map((topic) => (
                <div key={topic.title} className="p-6 border border-gray-200 rounded-xl hover:border-green-500 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{topic.title}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {topic.percentage}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{topic.questions} practice questions</p>
                  <Link
                    href="/cfa-level-1-practice-questions?topic=economics"
                    className="text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-2"
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
              Key Economics Concepts
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
              How to Ace CFA Level 1 Economics
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Master Supply and Demand First</h3>
                  <p className="text-gray-600">
                    Economics builds on supply and demand. Understand equilibrium, elasticity, and how shifts in curves affect prices. This foundation makes everything else easier.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Practice FX Calculations</h3>
                  <p className="text-gray-600">
                    Exchange rate questions are calculation-heavy. Practice direct vs indirect quotes, cross rate calculations, and interest rate parity until they're automatic.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Understand Policy Interaction</h3>
                  <p className="text-gray-600">
                    Monetary and fiscal policy effects on interest rates, inflation, and GDP are heavily tested. Know the transmission mechanism for each policy tool.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn Market Structures</h3>
                  <p className="text-gray-600">
                    Perfect competition, monopoly, oligopoly, monopolistic competition - know characteristics, pricing, and output decisions for each. Porter's Five Forces often appears too.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-green-900 to-green-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Practicing Economics Questions
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Access 140+ economics practice questions with detailed explanations. Free trial includes 25 economics questions.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-green-900 rounded-full font-semibold text-lg hover:bg-green-50 transition-colors"
            >
              Get Started Free
            </Link>
            <p className="mt-4 text-green-200 text-sm">No credit card required • Start practicing in 30 seconds</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Economics FAQs
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How much of the CFA Level 1 exam is Economics?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Economics represents 6-9% of the CFA Level 1 exam, translating to approximately 11-16 questions out of 180 total questions.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  What is the hardest part of Economics for CFA candidates?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Most candidates struggle with exchange rate calculations (direct vs indirect quotes) and understanding the different market structures (monopoly, oligopoly, perfect competition).
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Is Economics more micro or macro for CFA?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Both are equally weighted. Microeconomics covers market structures and supply/demand. Macroeconomics covers business cycles, monetary policy, and international economics.
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
              <Link href="/cfa-level-1-practice-questions" className="p-6 bg-white rounded-xl border hover:border-green-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600">All Practice Questions</h3>
                <p className="text-gray-600 text-sm">2,500+ questions across all 10 topics</p>
              </Link>
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-green-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Full 180-question practice exams</p>
              </Link>
              <Link href="/flashcards" className="p-6 bg-white rounded-xl border hover:border-green-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600">Economics Flashcards</h3>
                <p className="text-gray-600 text-sm">100+ flashcards for quick review</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
