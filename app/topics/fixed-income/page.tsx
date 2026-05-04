import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'CFA Level 1 Fixed Income Questions & Study Guide 2026 | Free Practice',
  description: 'Master Fixed Income for CFA Level 1 (11-14% of exam) with 230+ practice questions. Learn bond valuation, duration, convexity, and yield curve analysis. Start free.',
  keywords: 'cfa level 1 fixed income questions, fixed income cfa practice, bond valuation cfa, duration convexity cfa, cfa level 1 fixed income study guide',
  alternates: {
    canonical: 'https://www.analysttrainer.com/topics/fixed-income',
  },
  openGraph: {
    title: 'CFA Level 1 Fixed Income Questions & Study Guide 2026',
    description: '230+ fixed income practice questions for CFA Level 1. Master bond valuation, yield measures, and interest rate risk.',
    url: 'https://www.analysttrainer.com/topics/fixed-income',
    type: 'article',
  },
}

export default function FixedIncomeTopicPage() {
  const topicBreakdown = [
    { title: 'Bond Valuation & Pricing', questions: 50, percentage: '22%' },
    { title: 'Yield Measures & Spreads', questions: 40, percentage: '17%' },
    { title: 'Interest Rate Risk (Duration/Convexity)', questions: 45, percentage: '20%' },
    { title: 'Credit Analysis', questions: 40, percentage: '17%' },
    { title: 'Securitization & ABS', questions: 35, percentage: '15%' },
    { title: 'Term Structure of Interest Rates', questions: 20, percentage: '9%' },
  ]

  const commonConcepts = [
    {
      title: 'Bond Pricing',
      description: 'Understanding the inverse relationship between bond prices and yields',
      difficulty: 'High',
    },
    {
      title: 'Duration & Convexity',
      description: 'Measuring sensitivity of bond prices to interest rate changes',
      difficulty: 'High',
    },
    {
      title: 'Yield Curve Analysis',
      description: 'Interpreting spot rates, forward rates, and yield curve shapes',
      difficulty: 'Medium',
    },
    {
      title: 'Credit Risk Assessment',
      description: 'Evaluating credit quality and spread risk in corporate bonds',
      difficulty: 'Medium',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much of the CFA Level 1 exam is Fixed Income?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fixed Income represents 11-14% of the CFA Level 1 exam, making it one of the most heavily weighted topics. This translates to approximately 20-25 questions out of 180 total questions.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the key Fixed Income topics to master?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Focus on bond valuation (pricing bonds given YTM), duration and convexity (interest rate risk), yield curve analysis, credit risk fundamentals, and securitization basics.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I calculate duration for CFA exam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Macaulay duration = (PV of cash flows × time to receipt) / Bond Price. Modified duration = Macaulay duration / (1 + YTM/m). Focus on understanding how duration changes with coupon rate, YTM, and time to maturity.',
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
        { name: 'Fixed Income', url: '/topics/fixed-income' }
      ]} />

      <main className="min-h-screen bg-white">
        <Navigation />

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <BreadcrumbNavigation
            items={[
              { name: 'Home', url: '/' },
              { name: 'Topics', url: '/topics' },
              { name: 'Fixed Income', url: '/topics/fixed-income' }
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-indigo-900 to-indigo-800 text-white pt-16 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-indigo-700/50 rounded-full text-indigo-200 text-sm font-medium mb-6">
              11-14% of Exam • 20-25 Questions
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CFA Level 1 Fixed Income Study Guide
            </h1>
            <p className="text-xl text-indigo-100 mb-8">
              Master bond valuation, yield measures, duration, convexity, and credit analysis with 230+ practice questions and detailed explanations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/cfa-level-1-practice-questions?topic=fixed-income"
                className="px-8 py-4 bg-white text-indigo-900 rounded-full font-semibold text-lg hover:bg-indigo-50 transition-colors"
              >
                Practice Fixed Income Questions
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
              Fixed Income Topic Breakdown
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {topicBreakdown.map((topic) => (
                <div key={topic.title} className="p-6 border border-gray-200 rounded-xl hover:border-indigo-500 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{topic.title}</h3>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {topic.percentage}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{topic.questions} practice questions</p>
                  <Link
                    href="/cfa-level-1-practice-questions?topic=fixed-income"
                    className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-2"
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
              Key Fixed Income Concepts
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
              How to Ace CFA Level 1 Fixed Income
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Master Bond Math</h3>
                  <p className="text-gray-600">
                    Fixed Income requires calculation speed. Practice PV/FV calculations, YTM solving, and duration until they're second nature. Use your BA II Plus calculator efficiently.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Understand Duration deeply</h3>
                  <p className="text-gray-600">
                    Duration isn't just a formula - understand how it measures price sensitivity and how it changes with coupon, YTM, and maturity. Convexity builds on this foundation.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn Yield Curve Shapes</h3>
                  <p className="text-gray-600">
                    Understand normal, inverted, and flat yield curves and what they signal about future economic conditions. Practice calculating spot rates from YTM and forward rates.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Focus on Credit Risk</h3>
                  <p className="text-gray-600">
                    Credit analysis is heavily tested. Understand credit spreads, default risk, and the difference between investment grade and high yield bonds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-indigo-900 to-indigo-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Practicing Fixed Income Questions
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Access 230+ fixed income practice questions with detailed explanations. All paid plans include access to our full question bank.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-indigo-900 rounded-full font-semibold text-lg hover:bg-indigo-50 transition-colors"
            >
              Get Started Free
            </Link>
            <p className="mt-4 text-indigo-200 text-sm">No credit card required • Start practicing in 30 seconds</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Fixed Income FAQs
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How much of the CFA Level 1 exam is Fixed Income?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Fixed Income represents 11-14% of the CFA Level 1 exam, making it one of the most heavily weighted topics. This translates to approximately 20-25 questions out of 180 total questions.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  What are the key Fixed Income topics to master?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Focus on bond valuation (pricing bonds given YTM), duration and convexity (interest rate risk), yield curve analysis, credit risk fundamentals, and securitization basics.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How do I calculate duration for the CFA exam?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">
                  Macaulay duration = (PV of cash flows × time to receipt) / Bond Price. Modified duration = Macaulay duration / (1 + YTM/m). Focus on understanding how duration changes with coupon rate, YTM, and time to maturity.
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
              <Link href="/cfa-level-1-practice-questions" className="p-6 bg-white rounded-xl border hover:border-indigo-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600">All Practice Questions</h3>
                <p className="text-gray-600 text-sm">2,500+ questions across all 10 topics</p>
              </Link>
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-indigo-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Full 180-question practice exams</p>
              </Link>
              <Link href="/flashcards" className="p-6 bg-white rounded-xl border hover:border-indigo-500 transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-indigo-600">Fixed Income Flashcards</h3>
                <p className="text-gray-600 text-sm">150+ flashcards for quick review</p>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
