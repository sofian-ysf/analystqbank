import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import { Check } from '@phosphor-icons/react'

export const metadata: Metadata = {
  title: 'Try 15 Free CFA Questions (2026) - No Signup Required',
  description: 'Try 15 FREE CFA Level 1 practice questions instantly. No signup, no credit card. Written by charterholders with detailed explanations. Start now.',
  keywords: 'free CFA questions, free CFA Level 1 practice questions, free CFA practice test, CFA questions free, CFA Level 1 free questions, CFA sample questions free, try CFA questions',
  alternates: {
    canonical: 'https://www.analysttrainer.com/free-cfa-questions',
  },
  openGraph: {
    title: 'Try 15 Free CFA Questions (2026) - No Signup Required',
    description: 'Try 15 FREE CFA Level 1 demo questions. No signup needed. Start practising in 10 seconds.',
    url: 'https://www.analysttrainer.com/free-cfa-questions',
    type: 'website',
  },
}

export default function FreeCFAQuestions() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Free CFA Level 1 Demo Questions',
    description: '15 free CFA Level 1 practice questions with detailed explanations (no signup required)',
    brand: { '@type': 'Brand', name: 'AnalystTrainer' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      price: '0',
      availability: 'https://schema.org/InStock',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do I need to sign up to try?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No! Use /try-free to practice 15 questions instantly with no signup required. To access more, choose a paid plan.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do free CFA questions include explanations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Every free question includes the same detailed explanations as our paid content. We explain why the correct answer is right and why each incorrect option is wrong.',
        },
      },
      {
        '@type': 'Question',
        name: 'What topics do the free questions cover?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Free questions cover all 10 CFA Level 1 topic areas: Ethics, Quantitative Methods, Economics, Financial Statement Analysis, Corporate Issuers, Equity Investments, Fixed Income, Derivatives, Alternative Investments, and Portfolio Management.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are free CFA questions enough to pass?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While 100 questions are a great start, most successful candidates practice between 1,500-3,000 questions. For comprehensive preparation, we recommend upgrading to access our full 2,500+ question bank.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#1FB8CD] to-[#18a3b5] text-white pt-28 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-white text-sm font-medium mb-6">
              Try Without Signing Up
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Try 15 Free CFA Level 1 Questions
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8">
              Experience our question quality with <strong>15 free demo questions</strong> (no login required). Detailed explanations included.
            </p>
            <Link
              href="/try-free"
              className="inline-block px-8 py-4 bg-white text-[#1FB8CD] rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Demo Now
            </Link>
            <p className="mt-4 text-white/70 text-sm">No signup required. Start in 10 seconds.</p>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              What's Included in the Free Demo
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Try our platform risk-free before committing to a paid plan.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-b from-[#1FB8CD]/5 to-white p-8 rounded-2xl border border-[#1FB8CD]/20">
                <div className="text-4xl font-bold text-[#1FB8CD] mb-2">15</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Demo Questions</h3>
                <p className="text-gray-600">Access to 15 CFA Level 1 sample questions with detailed explanations. No login required.</p>
              </div>
              <div className="bg-gradient-to-b from-[#1FB8CD]/5 to-white p-8 rounded-2xl border border-[#1FB8CD]/20">
                <div className="text-4xl font-bold text-[#1FB8CD] mb-2">∞</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Access</h3>
                <p className="text-gray-600">Start practicing immediately with no signup, no credit card, and no time limit.</p>
              </div>
              <div className="bg-gradient-to-b from-[#1FB8CD]/5 to-white p-8 rounded-2xl border border-[#1FB8CD]/20">
                <div className="text-[#1FB8CD] mb-2 flex justify-center"><Check size={40} weight="bold" /></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Full Explanations</h3>
                <p className="text-gray-600">Same quality as paid content - detailed explanations for every answer choice.</p>
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
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                  <span className="font-medium">C.</span> £570,000 <Check size={16} weight="bold" className="text-green-600" />
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
            <p className="text-center text-gray-500 mt-6">This is just one of 15 demo questions you can try for free (no signup).</p>
          </div>
        </section>

        {/* Why Free */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Offer a Free Demo?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              We believe in our product. Try 15 questions to experience the quality of our content before purchasing a plan.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">No Signup Required</h3>
                  <p className="text-gray-600 text-sm">Start practicing instantly. No email, no credit card, no account needed.</p>
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
                  <p className="text-gray-600 text-sm">Demo questions are the same quality as our paid content - no watered-down samples.</p>
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
                  <p className="text-gray-600 text-sm">Every demo question includes full explanations - learn from every answer choice.</p>
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
                  <p className="text-gray-600 text-sm">Ready for more? Choose from Basic (2,000 questions) or Premium (unlimited).</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-[#13343B]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Try Our Demo?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Experience our question quality instantly - no signup required.
            </p>
            <Link
              href="/try-free"
              className="inline-block px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
            >
              Start Free Demo Now
            </Link>
            <p className="mt-4 text-gray-400 text-sm">15 questions. No signup. No credit card.</p>
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

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Free CFA Questions FAQ
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Do I need to sign up to try?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">No! Use /try-free to practice 15 questions instantly with no signup, no email, and no credit card required. To access more questions, choose a paid plan (Basic or Premium).</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Do demo questions include explanations?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Absolutely. Every demo question includes the same detailed explanations as our paid content. We explain why the correct answer is right and why each incorrect option is wrong, referencing CFA curriculum concepts.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  What topics do the demo questions cover?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Demo questions cover a variety of CFA Level 1 topic areas including Ethics, Quantitative Methods, Economics, Financial Statement Analysis, and more, giving you a representative sample of our content quality.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How do I access more questions?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">After trying the 15 demo questions, you can choose a paid plan. Basic (£50) includes 2,000 questions and 5 mock exams. Premium (£75) includes unlimited questions and mock exams, both with lifetime access.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Are 15 demo questions enough to pass?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">No - the demo is designed to showcase our question quality. Most successful candidates practice between 1,500-3,000 questions. For comprehensive preparation, we recommend a paid plan: Basic (2,000 questions) or Premium (unlimited questions).</p>
              </details>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 px-4 bg-gray-50 border-t">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">More CFA Level 1 Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/cfa-level-1-practice-questions" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Full Question Bank</h3>
                <p className="text-gray-600 text-sm">2,500+ CFA Level 1 practice questions with explanations</p>
              </Link>
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Full 180-question mock exams in real exam format</p>
              </Link>
              <Link href="/flashcards" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Free Flashcards</h3>
                <p className="text-gray-600 text-sm">1,600+ flashcards covering all CFA Level 1 topics</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <Link href="/" className="text-xl font-bold text-gray-900">AnalystTrainer</Link>
                <p className="mt-4 text-sm text-gray-600">
                  The leading platform for CFA Level 1 exam preparation.
                </p>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-gray-900">Product</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link href="/cfa-level-1-practice-questions" className="hover:text-gray-900">Practice Questions</Link></li>
                  <li><Link href="/cfa-level-1-mock-exam" className="hover:text-gray-900">Mock Exams</Link></li>
                  <li><Link href="/flashcards" className="hover:text-gray-900">Free Flashcards</Link></li>
                  <li><Link href="/pricing" className="hover:text-gray-900">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-gray-900">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link href="/blog" className="hover:text-gray-900">Blog</Link></li>
                  <li><Link href="/topics" className="hover:text-gray-900">Study Topics</Link></li>
                  <li><Link href="/free-cfa-questions" className="hover:text-gray-900">Free Questions</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-gray-900">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-gray-900">Terms of Service</Link></li>
                  <li><Link href="/refund" className="hover:text-gray-900">Refund Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
              <p>© 2026 AnalystTrainer. All rights reserved.</p>
              <p className="mt-2">Not affiliated with or endorsed by the CFA Institute.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
