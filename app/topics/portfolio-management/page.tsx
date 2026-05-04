import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'CFA Level 1 Portfolio Management Questions & Study Guide 2026 | Free Practice',
  description: 'Master Portfolio Management for CFA Level 1 (8-12% of exam) with 180+ practice questions. Learn CAPM, efficient frontier, behavioral finance, and risk management. Start free.',
  keywords: 'cfa level 1 portfolio management questions, portfolio management cfa practice, capm cfa, efficient frontier cfa, cfa portfolio management study guide',
  alternates: {
    canonical: 'https://www.analysttrainer.com/topics/portfolio-management',
  },
  openGraph: {
    title: 'CFA Level 1 Portfolio Management Questions & Study Guide 2026',
    description: '180+ portfolio management practice questions for CFA Level 1. Master CAPM, portfolio theory, and risk management.',
    url: 'https://www.analysttrainer.com/topics/portfolio-management',
    type: 'article',
  },
}

export default function PortfolioManagementTopicPage() {
  const topicBreakdown = [
    { title: 'Portfolio Risk & Return', questions: 50, percentage: '28%' },
    { title: 'Portfolio Management Overview', questions: 40, percentage: '22%' },
    { title: 'Risk Management', questions: 35, percentage: '19%' },
    { title: 'Planning & Construction', questions: 30, percentage: '17%' },
    { title: 'Behavioral Finance', questions: 25, percentage: '14%' },
  ]

  const commonConcepts = [
    {
      title: 'CAPM & Beta',
      description: 'Calculating expected returns using beta and risk premiums',
      difficulty: 'High',
    },
    {
      title: 'Efficient Frontier',
      description: 'Understanding risk-return tradeoff and optimal portfolios',
      difficulty: 'High',
    },
    {
      title: 'Systematic vs Unsystematic Risk',
      description: 'Diversification and the role of correlation',
      difficulty: 'Medium',
    },
    {
      title: 'Behavioral Biases',
      description: 'Loss aversion, overconfidence, and their investment impact',
      difficulty: 'Medium',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much of the CFA Level 1 exam is Portfolio Management?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Portfolio Management represents 8-12% of the CFA Level 1 exam, translating to approximately 14-22 questions out of 180 total questions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the most important Portfolio Management topic?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'CAPM and portfolio risk/return calculations are most heavily tested. Understanding systematic vs unsystematic risk and the efficient frontier is essential.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Portfolio Management hard for CFA Level 1?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many candidates find it moderate difficulty. The math is less complex than Fixed Income or Quant, but the concepts require careful understanding, especially around risk measurement.',
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
        { name: 'Portfolio Management', url: '/topics/portfolio-management' }
      ]} />

      <main className="min-h-screen bg-white">
        <Navigation />

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <BreadcrumbNavigation
            items={[
              { name: 'Home', url: '/' },
              { name: 'Topics', url: '/topics' },
              { name: 'Portfolio Management', url: '/topics/portfolio-management' }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-teal-900 to-teal-800 text-white pt-16 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-teal-700/50 rounded-full text-teal-200 text-sm font-medium mb-6">
              8-12% of Exam • 14-22 Questions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CFA Level 1 Portfolio Management Study Guide
            </h1>
            <p className="text-xl text-teal-100 mb-8">
              Master portfolio theory, CAPM, risk management, and behavioral finance with 180+ practice questions and detailed explanations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cfa-level-1-practice-questions?topic=portfolio-management"
                className="px-8 py-4 bg-white text-teal-900 rounded-full font-semibold text-lg hover:bg-teal-50 transition-colors"
              >
                Practice Portfolio Questions
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
              Portfolio Management Topic Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {topicBreakdown.map((topic) => (
                <div key={topic.title} className="p-6 border border-gray-200 rounded-xl hover:border-teal-500 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{topic.title}</h3>
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                      {topic.percentage}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{topic.questions} practice questions</p>
                  <Link
                    href="/cfa-level-1-practice-questions?topic=portfolio-management"
                    className="text-teal-600 hover:text-teal-700 font-medium inline-flex items-center gap-2"
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
              Key Portfolio Management Concepts
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
              How to Ace CFA Level 1 Portfolio Management
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Understand Beta and CAPM</h3>
                  <p className="text-gray-600">
                    CAPM is heavily tested. Know how to calculate expected return, understand the security market line (SML), and interpret beta values.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Know Your Risk Types</h3>
                  <p className="text-gray-600">
                    Systematic risk (market, beta) cannot be diversified away. Unsystematic risk (specific) can be reduced through diversification. This distinction is crucial.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn Diversification Math</h3>
                  <p className="text-gray-600">
                    Portfolio variance depends on weights and correlations. At minimum, understand how adding a negatively correlated asset affects overall portfolio risk.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Behavioral Biases Memorization</h3>
                  <p className="text-gray-600">
                    Know the key biases: loss aversion, overconfidence, anchoring, confirmation bias. Be ready to identify which bias is at play in a given scenario.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-teal-900 to-teal-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Practicing Portfolio Management
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Access 180+ portfolio management practice questions with detailed explanations. All paid plans include access to our full question bank.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-teal-900 rounded-full font-semibold text-lg hover:bg-teal-50 transition-colors"
            >
              Get Started Free
            </Link>
            <p className="mt-4 text-teal-200 text-sm">No credit card required • Start practicing in 30 seconds</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Portfolio Management FAQs
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How much of the CFA Level 1 exam is Portfolio Management?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Portfolio Management represents 8-12% of the CFA Level 1 exam, translating to approximately 14-22 questions out of 180 total questions.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  What is the most important Portfolio Management topic?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  CAPM and portfolio risk/return calculations are most heavily tested. Understanding systematic vs unsystematic risk and the efficient frontier is essential.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Is Portfolio Management hard for CFA Level 1?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Many candidates find it moderate difficulty. The math is less complex than Fixed Income or Quant, but the concepts require careful understanding, especially around risk measurement.
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
              <Link href="/cfa-level-1-practice-questions" className="p-6 bg-white rounded-xl border hover:border-teal-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-600">All Practice Questions</h3>
                <p className="text-gray-600 text-sm">2,500+ questions across all 10 topics</p>
              </Link>
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-teal-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-600">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Full 180-question practice exams</p>
              </Link>
              <Link href="/flashcards" className="p-6 bg-white rounded-xl border hover:border-teal-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-teal-600">Portfolio Flashcards</h3>
                <p className="text-gray-600 text-sm">90+ flashcards for quick review</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
