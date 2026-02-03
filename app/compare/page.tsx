import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../components/Navigation'

export const metadata: Metadata = {
  title: 'AnalystTrainer vs Kaplan vs AnalystPrep | CFA Prep Comparison 2026',
  description: 'Compare CFA Level 1 prep providers: AnalystTrainer (£50) vs Kaplan Schweser (£600+) vs AnalystPrep (£200+). See features, pricing, and why candidates switch.',
  keywords: 'CFA prep comparison, AnalystTrainer vs Kaplan, CFA Schweser alternative, cheap CFA prep, best CFA question bank, CFA prep cost',
  alternates: {
    canonical: 'https://www.analysttrainer.com/compare',
  },
  openGraph: {
    title: 'CFA Prep Comparison 2026 | AnalystTrainer vs Kaplan vs AnalystPrep',
    description: 'Compare CFA Level 1 prep providers by price, features, and value. Find the best option for your budget.',
    url: 'https://www.analysttrainer.com/compare',
    type: 'website',
  },
}

const competitors = [
  {
    name: 'AnalystTrainer',
    highlight: true,
    price: '£50-75',
    priceNote: 'one-time, lifetime',
    questions: '2,500+',
    mockExams: '5-Unlimited',
    videoLessons: 'No',
    flashcards: '1,600+ (Free)',
    analytics: 'Yes',
    mobileApp: 'Web (Mobile-friendly)',
    support: 'Email + Chat',
    guarantee: 'Pass Guarantee',
    bestFor: 'Budget-conscious candidates who want quality practice questions',
  },
  {
    name: 'Kaplan Schweser',
    highlight: false,
    price: '£600-1,200+',
    priceNote: 'per level',
    questions: '4,000+',
    mockExams: '6+',
    videoLessons: 'Yes (100+ hours)',
    flashcards: 'Yes',
    analytics: 'Yes',
    mobileApp: 'Yes',
    support: 'Email + Phone',
    guarantee: 'No',
    bestFor: 'Candidates who want comprehensive video instruction',
  },
  {
    name: 'AnalystPrep',
    highlight: false,
    price: '£200-400',
    priceNote: 'per level',
    questions: '3,000+',
    mockExams: '4+',
    videoLessons: 'Yes (40+ hours)',
    flashcards: 'Yes',
    analytics: 'Yes',
    mobileApp: 'Yes',
    support: 'Email',
    guarantee: 'No',
    bestFor: 'Candidates who want video + questions at mid-range price',
  },
  {
    name: 'UWorld (Wiley)',
    highlight: false,
    price: '£400-600',
    priceNote: 'per level',
    questions: '3,000+',
    mockExams: '3+',
    videoLessons: 'Yes',
    flashcards: 'Yes',
    analytics: 'Advanced',
    mobileApp: 'Yes',
    support: 'Email + Chat',
    guarantee: 'No',
    bestFor: 'Candidates who prioritize detailed explanations',
  },
]

const faqs = [
  {
    question: 'Why is AnalystTrainer so much cheaper?',
    answer: 'We focus exclusively on what matters most: high-quality practice questions and mock exams. We don\'t produce expensive video courses (the CFA curriculum itself is comprehensive). This allows us to offer premium question quality at a fraction of the price.',
  },
  {
    question: 'Are your questions as good as Kaplan or AnalystPrep?',
    answer: 'Yes. Our questions are written by CFA charterholders and mirror the actual exam format, difficulty, and topic weighting. Many candidates report our questions are slightly harder than the real exam, which helps them feel more prepared.',
  },
  {
    question: 'Should I use AnalystTrainer alongside another provider?',
    answer: 'Absolutely. Many candidates use AnalystTrainer as a supplement to their primary study materials. Our affordable pricing makes it easy to add thousands of extra practice questions to your preparation.',
  },
  {
    question: 'What if I need video lessons?',
    answer: 'We recommend free resources like Mark Meldrum\'s YouTube channel for video instruction, combined with AnalystTrainer for practice questions. This combination often costs less than a single premium provider while delivering excellent results.',
  },
]

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-[#1FB8CD]/10 rounded-full text-[#1FB8CD] text-sm font-medium mb-6">
            Honest Comparison
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            CFA Level 1 Prep Provider Comparison
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compare AnalystTrainer with Kaplan Schweser, AnalystPrep, and UWorld.
            Find the right fit for your budget and learning style.
          </p>
        </div>
      </section>

      {/* Price Comparison Highlight */}
      <section className="py-12 px-4 bg-[#13343B]">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <p className="text-gray-400 text-sm mb-2">Average competitor price</p>
              <p className="text-4xl font-bold text-white">£500+</p>
            </div>
            <div className="p-6 bg-[#1FB8CD]/20 rounded-xl">
              <p className="text-[#1FB8CD] text-sm mb-2">AnalystTrainer price</p>
              <p className="text-4xl font-bold text-[#1FB8CD]">£50</p>
            </div>
            <div className="p-6">
              <p className="text-gray-400 text-sm mb-2">You save</p>
              <p className="text-4xl font-bold text-green-400">90%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Feature-by-Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-4 bg-gray-50 border-b-2 border-gray-200">Feature</th>
                  {competitors.map((c) => (
                    <th
                      key={c.name}
                      className={`p-4 border-b-2 text-center ${
                        c.highlight
                          ? 'bg-[#1FB8CD]/10 border-[#1FB8CD]'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <span className={c.highlight ? 'text-[#1FB8CD] font-bold' : 'text-gray-900'}>
                        {c.name}
                      </span>
                      {c.highlight && (
                        <span className="block text-xs text-[#1FB8CD] mt-1">Recommended</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b font-medium text-gray-900">Price</td>
                  {competitors.map((c) => (
                    <td
                      key={c.name}
                      className={`p-4 border-b text-center ${c.highlight ? 'bg-[#1FB8CD]/5' : ''}`}
                    >
                      <span className={`font-bold ${c.highlight ? 'text-[#1FB8CD] text-xl' : 'text-gray-900'}`}>
                        {c.price}
                      </span>
                      <span className="block text-xs text-gray-500">{c.priceNote}</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium text-gray-900">Practice Questions</td>
                  {competitors.map((c) => (
                    <td key={c.name} className={`p-4 border-b text-center ${c.highlight ? 'bg-[#1FB8CD]/5' : ''}`}>
                      {c.questions}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium text-gray-900">Mock Exams</td>
                  {competitors.map((c) => (
                    <td key={c.name} className={`p-4 border-b text-center ${c.highlight ? 'bg-[#1FB8CD]/5' : ''}`}>
                      {c.mockExams}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium text-gray-900">Video Lessons</td>
                  {competitors.map((c) => (
                    <td key={c.name} className={`p-4 border-b text-center ${c.highlight ? 'bg-[#1FB8CD]/5' : ''}`}>
                      {c.videoLessons}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium text-gray-900">Flashcards</td>
                  {competitors.map((c) => (
                    <td key={c.name} className={`p-4 border-b text-center ${c.highlight ? 'bg-[#1FB8CD]/5' : ''}`}>
                      {c.flashcards}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium text-gray-900">Performance Analytics</td>
                  {competitors.map((c) => (
                    <td key={c.name} className={`p-4 border-b text-center ${c.highlight ? 'bg-[#1FB8CD]/5' : ''}`}>
                      {c.analytics}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium text-gray-900">Pass Guarantee</td>
                  {competitors.map((c) => (
                    <td key={c.name} className={`p-4 border-b text-center ${c.highlight ? 'bg-[#1FB8CD]/5' : ''}`}>
                      {c.guarantee === 'Pass Guarantee' ? (
                        <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Yes
                        </span>
                      ) : (
                        <span className="text-gray-400">No</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 border-b font-medium text-gray-900">Best For</td>
                  {competitors.map((c) => (
                    <td key={c.name} className={`p-4 border-b text-center text-sm text-gray-600 ${c.highlight ? 'bg-[#1FB8CD]/5' : ''}`}>
                      {c.bestFor}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Choose AnalystTrainer */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Candidates Choose AnalystTrainer
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">10x More Affordable</h3>
              <p className="text-gray-600">
                Why pay £600+ when you can get quality practice questions for £50? We cut the fluff, not the quality.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pass Guarantee</h3>
              <p className="text-gray-600">
                Complete our questions and don't pass? We extend your access for free. No other provider offers this at our price point.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Flashcards</h3>
              <p className="text-gray-600">
                1,600+ flashcards covering all topics — completely free. Other providers charge extra for flashcard access.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Lifetime Access</h3>
              <p className="text-gray-600">
                Pay once, access forever. No annual renewals, no expiring subscriptions. Retake the exam? You're still covered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Common Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  {faq.question}
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[#13343B]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Try AnalystTrainer Free
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            100 free questions + 1 mock exam. No credit card required. See why candidates are switching.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-7xl text-center text-sm text-gray-600">
          <p>© 2026 AnalystTrainer. All rights reserved.</p>
          <p className="mt-2">Not affiliated with or endorsed by the CFA Institute, Kaplan, or any other provider mentioned.</p>
        </div>
      </footer>
    </div>
  )
}
