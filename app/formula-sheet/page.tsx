'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'

const formulaCategories = [
  { name: 'Time Value of Money', count: 12 },
  { name: 'Statistics & Probability', count: 15 },
  { name: 'Fixed Income', count: 18 },
  { name: 'Equity Valuation', count: 14 },
  { name: 'Corporate Finance', count: 10 },
  { name: 'Portfolio Management', count: 8 },
  { name: 'Derivatives', count: 12 },
  { name: 'Economics', count: 11 },
]

export default function FormulaSheetPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    setError('')

    try {
      // TODO: Integrate with your email service
      // For now, simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#13343B] to-[#1a4a54] text-white pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1 bg-green-500/20 rounded-full text-green-300 text-sm font-medium mb-6">
            FREE DOWNLOAD - No Credit Card Required
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            CFA Level 1 Formula Sheet
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8">
            100+ essential formulas organized by topic. Print it, save it, ace your exam.
          </p>

          {/* Email Form */}
          <div className="max-w-md mx-auto">
            {isSubmitted ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Check Your Email!</h3>
                <p className="text-gray-300">
                  Your formula sheet is on its way. Check your inbox (and spam folder) for the download link.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-5 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#1FB8CD] outline-none text-lg"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-[#1FB8CD] text-white rounded-xl font-semibold text-lg hover:bg-[#18a3b5] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Get My Free Formula Sheet'}
                </button>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <p className="text-gray-400 text-sm">
                  No spam. Unsubscribe anytime. By signing up you agree to our privacy policy.
                </p>
              </form>
            )}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Downloaded 15,000+ times
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Updated for 2026 exam
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              PDF format
            </span>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What's Inside the Formula Sheet
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every formula you need, organized by topic area and ready to print.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {formulaCategories.map((category, index) => (
              <div
                key={category.name}
                className="p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">Topic {index + 1}</span>
                  <span className="text-xs font-semibold text-[#1FB8CD] bg-[#1FB8CD]/10 px-2 py-0.5 rounded-full">{category.count}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-2xl font-bold text-[#1FB8CD]">100+ Total Formulas</p>
            <p className="text-gray-600">All in one printable PDF</p>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sample Formulas Preview
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border">
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Time Value of Money</h3>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  <p className="mb-2"><strong>Future Value:</strong> FV = PV × (1 + r)ⁿ</p>
                  <p className="mb-2"><strong>Present Value:</strong> PV = FV / (1 + r)ⁿ</p>
                  <p><strong>Annuity PV:</strong> PV = PMT × [(1 - (1 + r)⁻ⁿ) / r]</p>
                </div>
              </div>

              <div className="border-b pb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Fixed Income</h3>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  <p className="mb-2"><strong>Duration:</strong> D = Σ[t × PV(CFₜ)] / Price</p>
                  <p><strong>Convexity:</strong> C = Σ[t(t+1) × PV(CFₜ)] / [Price × (1+y)²]</p>
                </div>
              </div>

              <div className="text-center pt-4">
                <p className="text-gray-500 italic">+ 95 more formulas in the full sheet...</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Candidates Say
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                "I printed this and kept it on my desk throughout my studies. Having all formulas in one place saved me so much time."
              </p>
              <p className="font-medium text-gray-900">— Sarah K., Passed CFA L1</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <p className="text-gray-700 mb-4">
                "The organization by topic is perfect. I used this as my quick reference during mock exams."
              </p>
              <p className="font-medium text-gray-900">— James M., CFA Candidate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-[#13343B]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Get Your Free Formula Sheet Now
          </h2>
          <p className="text-gray-300 mb-8">
            Join 15,000+ CFA candidates who've downloaded this formula sheet.
          </p>

          {!isSubmitted && (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-[#1FB8CD] outline-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#1FB8CD] text-white rounded-lg font-semibold hover:bg-[#18a3b5] transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                {isSubmitting ? 'Sending...' : 'Get Free PDF'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Upsell */}
      <section className="py-16 px-4 bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Ready for More? Try Our Full Question Bank
          </h3>
          <p className="text-gray-600 mb-6">
            2,500+ practice questions with detailed explanations. 100 free questions included.
          </p>
          <Link
            href="/signup"
            className="inline-block px-8 py-3 bg-[#13343B] text-white rounded-lg font-semibold hover:bg-[#1a4a54] transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-7xl text-center text-sm text-gray-600">
          <p>© 2026 AnalystTrainer. All rights reserved.</p>
          <p className="mt-2">Not affiliated with or endorsed by the CFA Institute.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
