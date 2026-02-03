import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free CFA Level 1 Practice Questions 2026 | 100 Questions + Mock Exam',
  description: 'Get 100 free CFA Level 1 questions + 1 full mock exam. No credit card, no catch. Written by CFA charterholders with full explanations. Start in 30 seconds.',
  keywords: 'free CFA questions, free CFA Level 1 practice questions, free CFA practice test, CFA questions free, free CFA mock exam, CFA Level 1 free questions',
  alternates: {
    canonical: 'https://www.analysttrainer.com/free-cfa-questions',
  },
  openGraph: {
    title: 'Free CFA Level 1 Practice Questions 2026 | 100 Questions + Mock Exam',
    description: 'Get 100 free CFA Level 1 questions + 1 full mock exam. No credit card required. Start practising in 30 seconds.',
    url: 'https://www.analysttrainer.com/free-cfa-questions',
    type: 'website',
  },
}

export default function FreeCFAQuestions() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Free CFA Level 1 Practice Questions',
    description: '100 free CFA Level 1 practice questions with detailed explanations',
    brand: { '@type': 'Brand', name: 'AnalystTrainer' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      price: '0',
      availability: 'https://schema.org/InStock',
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
        <section className="bg-gradient-to-b from-[#1FB8CD] to-[#18a3b5] text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
              100% Free - No Credit Card Required
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Free CFA Level 1 Practice Questions
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8">
              Start your CFA exam preparation with <strong>100 free practice questions</strong> and 1 free mock exam. Detailed explanations included.
            </p>
            <Link
              href="/signup?plan=trial"
              className="inline-block px-8 py-4 bg-white text-[#1FB8CD] rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Free Questions Now
            </Link>
            <p className="mt-4 text-white/70 text-sm">No credit card required. Start in 30 seconds.</p>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              What's Included in Your Free Trial
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Everything you need to start preparing for your CFA Level 1 exam - completely free.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-b from-[#1FB8CD]/5 to-white p-8 rounded-2xl border border-[#1FB8CD]/20">
                <div className="text-4xl font-bold text-[#1FB8CD] mb-2">100</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice Questions</h3>
                <p className="text-gray-600">Full access to 100 CFA Level 1 practice questions covering all topic areas with detailed explanations.</p>
              </div>
              <div className="bg-gradient-to-b from-[#1FB8CD]/5 to-white p-8 rounded-2xl border border-[#1FB8CD]/20">
                <div className="text-4xl font-bold text-[#1FB8CD] mb-2">1</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Mock Exam</h3>
                <p className="text-gray-600">Take a full 180-question mock exam to experience the real CFA Level 1 format and timing.</p>
              </div>
              <div className="bg-gradient-to-b from-[#1FB8CD]/5 to-white p-8 rounded-2xl border border-[#1FB8CD]/20">
                <div className="text-4xl font-bold text-[#1FB8CD] mb-2">24h</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Full Access</h3>
                <p className="text-gray-600">24 hours of complete access to try all features including performance analytics and progress tracking.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Questions Preview */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Sample Question Preview
            </h2>
            <div className="bg-white p-8 rounded-2xl shadow-sm border">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                Financial Statement Analysis
              </span>
              <p className="text-lg text-gray-900 mb-6">
                A company reports the following information: Net income of £500,000, depreciation expense of £80,000, increase in accounts receivable of £30,000, and decrease in inventory of £20,000. Using the indirect method, what is the company's cash flow from operating activities?
              </p>
              <div className="space-y-3 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">A.</span> £570,000
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">B.</span> £550,000
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <span className="font-medium">C.</span> £570,000 ✓
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="font-medium text-blue-900 mb-2">Explanation:</p>
                <p className="text-blue-800 text-sm">
                  Cash flow from operations = Net income + Depreciation - Increase in receivables + Decrease in inventory
                  = £500,000 + £80,000 - £30,000 + £20,000 = £570,000
                </p>
              </div>
            </div>
            <p className="text-center text-gray-500 mt-6">This is just one of 100+ questions you'll get access to for free.</p>
          </div>
        </section>

        {/* Why Free */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Are We Giving Away Free Questions?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We believe in our product. Once you experience the quality of our questions and explanations, you'll understand why thousands of candidates choose AnalystTrainer for their CFA preparation.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">No Strings Attached</h3>
                  <p className="text-gray-600 text-sm">Your free trial is truly free. No credit card required, no automatic charges.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Real Exam Quality</h3>
                  <p className="text-gray-600 text-sm">Free questions are the same quality as our paid content - no watered-down samples.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Detailed Explanations</h3>
                  <p className="text-gray-600 text-sm">Every free question includes full explanations - learn from every answer.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Upgrade When Ready</h3>
                  <p className="text-gray-600 text-sm">If you love it, upgrade to access 2,500+ questions. If not, no pressure.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-[#13343B]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Practising for Free Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of CFA candidates who started their journey with our free questions.
            </p>
            <Link
              href="/signup?plan=trial"
              className="inline-block px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
            >
              Get 100 Free Questions Now
            </Link>
            <p className="mt-4 text-gray-400 text-sm">Takes 30 seconds. No credit card required.</p>
          </div>
        </section>

        {/* Upgrade Path */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Ready for More? Affordable Plans Available
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Basic Plan</h3>
                <p className="text-3xl font-bold text-gray-900 mb-4">£50 <span className="text-sm font-normal text-gray-500">one-time</span></p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    2,000 practice questions
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    5 mock exams
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Lifetime access
                  </li>
                </ul>
                <Link href="/signup?plan=basic" className="block text-center py-3 border-2 border-gray-900 text-gray-900 rounded-lg font-semibold hover:bg-gray-900 hover:text-white transition-colors">
                  Get Basic
                </Link>
              </div>
              <div className="p-6 border-2 border-[#1FB8CD] rounded-2xl bg-[#1FB8CD]/5">
                <span className="inline-block px-2 py-1 bg-[#1FB8CD] text-white text-xs font-medium rounded mb-2">BEST VALUE</span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Plan</h3>
                <p className="text-3xl font-bold text-[#1FB8CD] mb-4">£75 <span className="text-sm font-normal text-gray-500">one-time</span></p>
                <ul className="space-y-2 text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited questions
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited mock exams
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Lifetime access + priority support
                  </li>
                </ul>
                <Link href="/signup?plan=premium" className="block text-center py-3 bg-[#1FB8CD] text-white rounded-lg font-semibold hover:bg-[#18a3b5] transition-colors">
                  Get Premium
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
