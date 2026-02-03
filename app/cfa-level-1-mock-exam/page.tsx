import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CFA Level 1 Mock Exam 2026 | 180 Questions, Real Exam Format',
  description: 'Full-length CFA Level 1 mock exams — 180 questions, 4.5 hours, exact exam format. See where you stand before exam day. 1 free mock included with trial.',
  keywords: 'CFA Level 1 mock exam, CFA mock test, CFA practice exam, CFA Level 1 practice test, CFA exam simulator, CFA Level 1 full exam, CFA mock questions',
  alternates: {
    canonical: 'https://www.analysttrainer.com/cfa-level-1-mock-exam',
  },
  openGraph: {
    title: 'CFA Level 1 Mock Exam 2026 | Full 180-Question Practice Test',
    description: 'Full-length CFA Level 1 mock exams in exact exam format. See where you stand before the real thing. 1 free mock included.',
    url: 'https://www.analysttrainer.com/cfa-level-1-mock-exam',
    type: 'website',
  },
}

export default function CFALevel1MockExam() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'CFA Level 1 Mock Exams',
    description: 'Realistic CFA Level 1 mock exams with 180 questions and detailed scoring',
    brand: { '@type': 'Brand', name: 'AnalystTrainer' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'GBP',
      lowPrice: '0',
      highPrice: '75',
      offerCount: '3',
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
              Exam Format 2026
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              CFA Level 1 Mock Exams
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Experience the real CFA exam with our <strong className="text-white">180-question mock tests</strong>. Timed sessions, realistic difficulty, and comprehensive score reports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/signup"
                className="px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
              >
                Start Free Mock Exam
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                View All Plans
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>180 Questions Per Exam</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Timed Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Detailed Scoring</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Topic Analysis</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mock Exam Features */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Why Take CFA Mock Exams?
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Mock exams are the closest thing to the real CFA experience. They build confidence, improve time management, and reveal weak areas.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#1FB8CD]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real Exam Timing</h3>
                <p className="text-gray-600 text-sm">Practice with the same 4.5-hour time limit as the actual CFA Level 1 exam</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#1FB8CD]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Detailed Score Report</h3>
                <p className="text-gray-600 text-sm">Get topic-by-topic breakdown showing exactly where to focus</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#1FB8CD]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Realistic Difficulty</h3>
                <p className="text-gray-600 text-sm">Questions calibrated to match actual CFA exam difficulty</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#1FB8CD]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Full Explanations</h3>
                <p className="text-gray-600 text-sm">Review every question with detailed answer explanations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Exam Structure */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Mock Exam Structure
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Session 1</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#1FB8CD]/10 rounded-lg flex items-center justify-center text-[#1FB8CD] font-semibold">90</span>
                    <span className="text-gray-700">Questions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#1FB8CD]/10 rounded-lg flex items-center justify-center text-[#1FB8CD] font-semibold">2h</span>
                    <span className="text-gray-700">15 minutes time limit</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#1FB8CD]/10 rounded-lg flex items-center justify-center text-[#1FB8CD] font-semibold">5</span>
                    <span className="text-gray-700">Topic areas covered</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Session 2</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#1FB8CD]/10 rounded-lg flex items-center justify-center text-[#1FB8CD] font-semibold">90</span>
                    <span className="text-gray-700">Questions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#1FB8CD]/10 rounded-lg flex items-center justify-center text-[#1FB8CD] font-semibold">2h</span>
                    <span className="text-gray-700">15 minutes time limit</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#1FB8CD]/10 rounded-lg flex items-center justify-center text-[#1FB8CD] font-semibold">5</span>
                    <span className="text-gray-700">Topic areas covered</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-[#13343B]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Test Yourself?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Take your first CFA Level 1 mock exam today and see where you stand.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
            >
              Start Free Mock Exam
            </Link>
            <p className="mt-4 text-gray-400 text-sm">1 free mock exam included with trial. No credit card required.</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Mock Exam FAQs
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How many mock exams are included?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Free trial includes 1 mock exam. Basic plan includes 5 mock exams. Premium plan includes unlimited mock exams for lifetime access.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How long is each mock exam?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Each mock exam contains 180 questions split into two sessions of 90 questions each. You have 2 hours 15 minutes per session, just like the real CFA exam.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Can I pause and resume a mock exam?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Yes, you can save your progress and return later. However, we recommend completing each session in one sitting to simulate real exam conditions and build stamina.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  When should I start taking mock exams?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">We recommend taking your first mock exam 6-8 weeks before your exam date to establish a baseline. Then take additional mocks every 1-2 weeks to track improvement and build stamina.</p>
              </details>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
