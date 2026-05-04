import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'CFA Level 1 Equity Investments Questions & Study Guide 2026 | Free Practice',
  description: 'Master Equity Investments for CFA Level 1 (11-14% of exam) with 230+ practice questions. Learn market organization, valuation models, and industry analysis. Start free.',
  keywords: 'cfa level 1 equity investments questions, equity cfa practice, ddm cfa, p/e ratio cfa, cfa equity study guide',
  alternates: {
    canonical: 'https://www.analysttrainer.com/topics/equity-investments',
  },
  openGraph: {
    title: 'CFA Level 1 Equity Investments Questions & Study Guide 2026',
    description: '230+ equity investments practice questions for CFA Level 1. Master market structure, valuation, and industry analysis.',
    url: 'https://www.analysttrainer.com/topics/equity-investments',
    type: 'article',
  },
}

export default function EquityInvestmentsTopicPage() {
  const topicBreakdown = [
    { title: 'Market Organization & Structure', questions: 50, percentage: '22%' },
    { title: 'Equity Valuation Models', questions: 55, percentage: '24%' },
    { title: 'Security Market Indexes', questions: 40, percentage: '17%' },
    { title: 'Market Efficiency', questions: 35, percentage: '15%' },
    { title: 'Industry Analysis', questions: 30, percentage: '13%' },
    { title: 'Company Analysis', questions: 20, percentage: '9%' },
  ]

  const commonConcepts = [
    {
      title: 'Dividend Discount Models',
      description: 'Gordon growth and multi-stage DDM calculations',
      difficulty: 'High',
    },
    {
      title: 'Market Efficiency',
      description: 'Weak, semi-strong, and strong form efficiency',
      difficulty: 'High',
    },
    {
      title: 'P/E Ratios & Multiples',
      description: 'Price multiples and their determinants',
      difficulty: 'Medium',
    },
    {
      title: 'Industry Analysis',
      description: "Porter's Five Forces and competitive analysis",
      difficulty: 'Medium',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much of the CFA Level 1 exam is Equity Investments?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Equity Investments represents 11-14% of the CFA Level 1 exam, making it one of the most heavily weighted topics. This translates to approximately 20-25 questions out of 180 total questions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What equity valuation methods do I need to know?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Focus on dividend discount models (Gordon growth, multi-stage), free cash flow to equity, and price multiples (P/E, P/B, EV/EBITDA). Understand when each is appropriate.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the most difficult Equity topic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most candidates find multi-stage dividend discount models and the relationships between different valuation multiples challenging.',
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
        { name: 'Equity Investments', url: '/topics/equity-investments' }
      ]} />

      <main className="min-h-screen bg-white">
        <Navigation />

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <BreadcrumbNavigation
            items={[
              { name: 'Home', url: '/' },
              { name: 'Topics', url: '/topics' },
              { name: 'Equity Investments', url: '/topics/equity-investments' }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-red-700 to-red-600 text-white pt-16 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-red-600/50 rounded-full text-red-200 text-sm font-medium mb-6">
              11-14% of Exam • 20-25 Questions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CFA Level 1 Equity Investments Study Guide
            </h1>
            <p className="text-xl text-red-100 mb-8">
              Master market organization, equity valuation models, and industry analysis with 230+ practice questions and detailed explanations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cfa-level-1-practice-questions?topic=equity-investments"
                className="px-8 py-4 bg-white text-red-700 rounded-full font-semibold text-lg hover:bg-red-50 transition-colors"
              >
                Practice Equity Questions
              </Link>
              <Link
                href="/signup"
                className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>

        {/* Topic Breakdown */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Equity Investments Topic Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {topicBreakdown.map((topic) => (
                <div key={topic.title} className="p-6 border border-gray-200 rounded-xl hover:border-red-500 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{topic.title}</h3>
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      {topic.percentage}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{topic.questions} practice questions</p>
                  <Link
                    href="/cfa-level-1-practice-questions?topic=equity-investments"
                    className="text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-2"
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
              Key Equity Investments Concepts
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
              How to Ace CFA Level 1 Equity Investments
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Master Valuation Model Hierarchy</h3>
                  <p className="text-gray-600">
                    DDM builds from Gordon growth to multi-stage. FCFE and FCFF models are alternatives. Know when to apply each and understand the assumptions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Understand Market Efficiency</h3>
                  <p className="text-gray-600">
                    The three forms of market efficiency are heavily tested. Know what type of information each form incorporates and be ready to identify anomalies.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Practice Multi-Stage Models</h3>
                  <p className="text-gray-600">
                    Multi-stage DDM questions are common. Practice calculating terminal value, normalizing earnings, and transitioning between growth stages.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Porter's Five Forces</h3>
                  <p className="text-gray-600">
                    Industry analysis questions often use Porter's framework. Understand each force's impact on industry profitability and be ready to apply it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-red-700 to-red-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Practicing Equity Questions
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Access 230+ equity investments practice questions with detailed explanations. All paid plans include access to our full question bank.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-red-700 rounded-full font-semibold text-lg hover:bg-red-50 transition-colors"
            >
              Get Started Free
            </Link>
            <p className="mt-4 text-red-200 text-sm">No credit card required • Start practicing in 30 seconds</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Equity Investments FAQs
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How much of the CFA Level 1 exam is Equity Investments?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Equity Investments represents 11-14% of the CFA Level 1 exam, making it one of the most heavily weighted topics. This translates to approximately 20-25 questions out of 180 total questions.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  What equity valuation methods do I need to know?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Focus on dividend discount models (Gordon growth, multi-stage), free cash flow to equity, and price multiples (P/E, P/B, EV/EBITDA). Understand when each is appropriate.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  What is the most difficult Equity topic?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Most candidates find multi-stage dividend discount models and the relationships between different valuation multiples challenging.
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
              <Link href="/cfa-level-1-practice-questions" className="p-6 bg-white rounded-xl border hover:border-red-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600">All Practice Questions</h3>
                <p className="text-gray-600 text-sm">2,500+ questions across all 10 topics</p>
              </Link>
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-red-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Full 180-question practice exams</p>
              </Link>
              <Link href="/flashcards" className="p-6 bg-white rounded-xl border hover:border-red-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600">Equity Flashcards</h3>
                <p className="text-gray-600 text-sm">120+ flashcards for quick review</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
