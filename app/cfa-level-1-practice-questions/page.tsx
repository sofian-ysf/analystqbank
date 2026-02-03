import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'CFA Level 1 Practice Questions 2026 | 2,500+ Exam-Style Questions',
  description: '2,500+ CFA Level 1 practice questions written by charterholders. Every question has step-by-step explanations. 100 free questions included — no credit card needed.',
  keywords: 'CFA Level 1 practice questions, CFA practice questions, CFA Level 1 questions, CFA question bank, CFA exam questions, CFA Level 1 practice test, CFA Level 1 sample questions',
  alternates: {
    canonical: 'https://www.analysttrainer.com/cfa-level-1-practice-questions',
  },
  openGraph: {
    title: 'CFA Level 1 Practice Questions 2026 | 2,500+ Exam-Style Questions',
    description: '2,500+ CFA Level 1 practice questions written by charterholders. Every question has step-by-step explanations. Try 100 free questions today.',
    url: 'https://www.analysttrainer.com/cfa-level-1-practice-questions',
    type: 'website',
  },
}

const topics = [
  { name: 'Ethical & Professional Standards', questions: 250, weight: '15-20%' },
  { name: 'Quantitative Methods', questions: 200, weight: '6-9%' },
  { name: 'Economics', questions: 200, weight: '6-9%' },
  { name: 'Financial Statement Analysis', questions: 350, weight: '11-14%' },
  { name: 'Corporate Issuers', questions: 200, weight: '6-9%' },
  { name: 'Equity Investments', questions: 300, weight: '11-14%' },
  { name: 'Fixed Income', questions: 300, weight: '11-14%' },
  { name: 'Derivatives', questions: 200, weight: '5-8%' },
  { name: 'Alternative Investments', questions: 150, weight: '5-8%' },
  { name: 'Portfolio Management', questions: 350, weight: '8-12%' },
]

export default function CFALevel1PracticeQuestions() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'CFA Level 1 Practice Questions',
    description: '2,500+ CFA Level 1 practice questions with detailed explanations',
    brand: { '@type': 'Brand', name: 'AnalystTrainer' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'GBP',
      lowPrice: '0',
      highPrice: '75',
      offerCount: '3',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#13343B] to-[#1a4a54] text-white py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-[#1FB8CD]/20 rounded-full text-[#1FB8CD] text-sm font-medium mb-6">
              Updated for 2026 CFA Exam
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              CFA Level 1 Practice Questions
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Master the CFA Level 1 exam with <strong className="text-white">2,500+ practice questions</strong> covering all 10 topic areas. Detailed explanations for every question.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/signup"
                className="px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
              >
                Start Free Trial - No Card Required
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                View Pricing
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>2,500+ Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Detailed Explanations</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>All 10 Topics</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Performance Analytics</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Practice Questions Matter */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Why CFA Level 1 Practice Questions Are Essential
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              The CFA Level 1 exam tests your ability to apply knowledge under pressure. Practice questions are the most effective way to prepare.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-[#1FB8CD]/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Exam-Realistic Format</h3>
                <p className="text-gray-600">Our questions mirror the actual CFA exam format, difficulty, and topic weighting so you know exactly what to expect.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-[#1FB8CD]/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Learn from Mistakes</h3>
                <p className="text-gray-600">Every question includes a detailed explanation showing exactly why the correct answer is right and others are wrong.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-[#1FB8CD]/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Your Progress</h3>
                <p className="text-gray-600">Identify weak areas with our performance analytics and focus your study time where it matters most.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Topic Coverage */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Complete CFA Level 1 Topic Coverage
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Our question bank covers all 10 CFA Level 1 topic areas with questions weighted to match the actual exam.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {topics.map((topic) => (
                <div key={topic.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-900">{topic.name}</h3>
                    <p className="text-sm text-gray-500">{topic.questions}+ questions</p>
                  </div>
                  <span className="px-3 py-1 bg-[#1FB8CD]/10 text-[#1FB8CD] rounded-full text-sm font-medium">
                    {topic.weight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-[#13343B]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Practising CFA Level 1 Questions Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of candidates who passed their CFA Level 1 exam using our practice questions.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
            >
              Start Your Free Trial Now
            </Link>
            <p className="mt-4 text-gray-400 text-sm">No credit card required. 100 free questions included.</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How many CFA Level 1 practice questions are included?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Our question bank includes over 2,500 CFA Level 1 practice questions covering all 10 topic areas. Questions are regularly updated to reflect the latest CFA curriculum.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Are the questions similar to the actual CFA exam?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Yes! Our questions are written to mirror the actual CFA Level 1 exam format, difficulty level, and topic weighting. Many candidates report our questions are slightly harder than the actual exam, which helps them feel more prepared.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Do practice questions include explanations?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Every single question includes a detailed explanation showing why the correct answer is right and why the other options are incorrect. This helps you learn from mistakes and understand the underlying concepts.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Can I practice by topic area?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Absolutely! You can filter questions by any of the 10 CFA Level 1 topic areas, or practice mixed questions to simulate the real exam experience. Our analytics show you which topics need the most attention.</p>
              </details>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-12 px-4 bg-gray-50 border-t">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 mb-4">Ready to pass your CFA Level 1 exam?</p>
            <Link
              href="/signup"
              className="text-[#1FB8CD] font-semibold hover:underline"
            >
              Start your free trial today →
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
