import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'CFA Level 1 Corporate Issuers Questions & Study Guide 2026 | Free Practice',
  description: 'Master Corporate Issuers for CFA Level 1 (6-9% of exam) with 140+ practice questions. Learn corporate governance, capital structure, and working capital. Start free.',
  keywords: 'cfa level 1 corporate issuers questions, corporate issuers cfa practice, capital structure cfa, corporate governance cfa, cfa corporate issuers study guide',
  alternates: {
    canonical: 'https://www.analysttrainer.com/topics/corporate-issuers',
  },
  openGraph: {
    title: 'CFA Level 1 Corporate Issuers Questions & Study Guide 2026',
    description: '140+ corporate issuers practice questions for CFA Level 1. Master governance, capital structure, and capital allocation.',
    url: 'https://www.analysttrainer.com/topics/corporate-issuers',
    type: 'article',
  },
}

export default function CorporateIssuersTopicPage() {
  const topicBreakdown = [
    { title: 'Corporate Governance', questions: 35, percentage: '25%' },
    { title: 'Capital Structure', questions: 35, percentage: '25%' },
    { title: 'Working Capital', questions: 30, percentage: '21%' },
    { title: 'Capital Investments', questions: 25, percentage: '18%' },
    { title: 'Business Models', questions: 15, percentage: '11%' },
  ]

  const commonConcepts = [
    {
      title: 'Stakeholder vs Shareholder Model',
      description: 'Understanding different corporate governance approaches',
      difficulty: 'High',
    },
    {
      title: 'Capital Structure Decisions',
      description: 'Debt vs equity tradeoffs and optimal capital structure',
      difficulty: 'High',
    },
    {
      title: 'NPV and IRR',
      description: 'Capital budgeting decision criteria',
      difficulty: 'Medium',
    },
    {
      title: 'Working Capital Management',
      description: 'Liquidity ratios and cash conversion cycle',
      difficulty: 'Medium',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much of the CFA Level 1 exam is Corporate Issuers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Corporate Issuers represents 6-9% of the CFA Level 1 exam, translating to approximately 11-16 questions out of 180 total questions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the most important Corporate Issuers topic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Capital structure (debt vs equity) and capital budgeting (NPV/IRR) are most heavily tested. Corporate governance concepts also frequently appear in scenario-based questions.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I study Corporate Issuers efficiently?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Focus on understanding the tradeoffs between debt and equity financing, practice NPV and IRR calculations, and know the key governance frameworks and stakeholder relationships.',
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
        { name: 'Corporate Issuers', url: '/topics/corporate-issuers' }
      ]} />

      <main className="min-h-screen bg-white">
        <Navigation />

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <BreadcrumbNavigation
            items={[
              { name: 'Home', url: '/' },
              { name: 'Topics', url: '/topics' },
              { name: 'Corporate Issuers', url: '/topics/corporate-issuers' }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-700 to-gray-600 text-white pt-16 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-gray-600/50 rounded-full text-gray-200 text-sm font-medium mb-6">
              6-9% of Exam • 11-16 Questions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CFA Level 1 Corporate Issuers Study Guide
            </h1>
            <p className="text-xl text-gray-100 mb-8">
              Master corporate governance, capital structure, and capital allocation with 140+ practice questions and detailed explanations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cfa-level-1-practice-questions?topic=corporate-issuers"
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors"
              >
                Practice Corporate Issuers Questions
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
              Corporate Issuers Topic Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {topicBreakdown.map((topic) => (
                <div key={topic.title} className="p-6 border border-gray-200 rounded-xl hover:border-gray-500 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{topic.title}</h3>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {topic.percentage}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{topic.questions} practice questions</p>
                  <Link
                    href="/cfa-level-1-practice-questions?topic=corporate-issuers"
                    className="text-gray-600 hover:text-gray-700 font-medium inline-flex items-center gap-2"
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
              Key Corporate Issuers Concepts
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
              How to Ace CFA Level 1 Corporate Issuers
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Understand Governance Models</h3>
                  <p className="text-gray-600">
                    Know the difference between stakeholder and shareholder models. Understand board structures (one-tier vs two-tier) and the role of audit, compensation, and nomination committees.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Master Capital Structure Theory</h3>
                  <p className="text-gray-600">
                    MM Theory is the foundation. Understand how taxes, financial distress costs, and agency costs affect the optimal capital structure decision.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Practice Capital Budgeting</h3>
                  <p className="text-gray-600">
                    NPV vs IRR conflicts are common. Know when each criterion should be used and the assumptions behind each method.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Working Capital Formulas</h3>
                  <p className="text-gray-600">
                    The cash conversion cycle (operating cycle) is frequently tested. Practice calculating days sales outstanding, days inventory outstanding, and days payables outstanding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-gray-700 to-gray-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Practicing Corporate Issuers
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Access 140+ corporate issuers practice questions with detailed explanations. Free trial includes 20 corporate issuers questions.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:bg-gray-50 transition-colors"
            >
              Get Started Free
            </Link>
            <p className="mt-4 text-gray-200 text-sm">No credit card required • Start practicing in 30 seconds</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Corporate Issuers FAQs
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How much of the CFA Level 1 exam is Corporate Issuers?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Corporate Issuers represents 6-9% of the CFA Level 1 exam, translating to approximately 11-16 questions out of 180 total questions.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  What is the most important Corporate Issuers topic?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Capital structure (debt vs equity) and capital budgeting (NPV/IRR) are most heavily tested. Corporate governance concepts also frequently appear in scenario-based questions.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How do I study Corporate Issuers efficiently?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Focus on understanding the tradeoffs between debt and equity financing, practice NPV and IRR calculations, and know the key governance frameworks and stakeholder relationships.
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
              <Link href="/cfa-level-1-practice-questions" className="p-6 bg-white rounded-xl border hover:border-gray-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-600">All Practice Questions</h3>
                <p className="text-gray-600 text-sm">2,500+ questions across all 10 topics</p>
              </Link>
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-gray-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-600">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Full 180-question practice exams</p>
              </Link>
              <Link href="/flashcards" className="p-6 bg-white rounded-xl border hover:border-gray-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-600">Corporate Flashcards</h3>
                <p className="text-gray-600 text-sm">80+ flashcards for quick review</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
