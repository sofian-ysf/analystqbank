import { Metadata } from 'next'
import Link from "next/link"
import Image from "next/image"
import Navigation from "../components/Navigation"

export const metadata: Metadata = {
  title: 'CFA Exam Prep Refund Policy - 100% Money Back Guarantee | AnalystTrainer',
  description: 'AnalystTrainer offers a 100% money-back guarantee on CFA Level 1 prep. Full refund within 7 days if you\'re not satisfied. Read our fair refund policy.',
  keywords: 'CFA refund policy, CFA exam prep refund, AnalystTrainer refund, CFA course refund, money back guarantee CFA',
  alternates: {
    canonical: 'https://www.analysttrainer.com/refund',
  },
  openGraph: {
    title: 'CFA Exam Prep Refund Policy - 100% Money Back Guarantee',
    description: 'Full refund within 7 days if you\'re not satisfied with AnalystTrainer CFA prep.',
    url: 'https://www.analysttrainer.com/refund',
    type: 'website',
  },
}

export default function Refund() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is AnalystTrainer\'s refund policy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AnalystTrainer offers a 7-day money-back guarantee on all new subscriptions. If you\'re not satisfied within the first 7 days of purchase, you may request a full refund subject to our eligibility requirements.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I request a refund?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To request a refund, email support@analysttrainer.com with your registered email, order ID, government-issued ID for verification, and reason for the refund. Requests are processed within 5-7 business days.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I get a refund after the 7-day period?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Refunds are only available within the 7-day guarantee period. After this window, subscriptions are non-refundable but you can cancel to prevent future charges.',
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

      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#13343B] to-[#1a4a54] text-white pt-28 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full text-green-300 text-sm font-medium mb-6">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100% Money-Back Guarantee
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              CFA Prep Refund Policy
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We stand behind our CFA Level 1 preparation materials. If you're not completely satisfied, we offer a hassle-free refund within your guarantee period.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Guarantee Box */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 mb-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">7-Day Money-Back Guarantee</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Try AnalystTrainer risk-free. If our CFA Level 1 practice questions don't meet your expectations within the first 7 days, we'll refund your purchase in full.
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-400 mb-8">
              <strong>Effective Date:</strong> 1 January 2026 &nbsp;|&nbsp; <strong>Last Updated:</strong> 1 January 2026
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility for Refunds</h2>
              <p className="text-gray-600 mb-4">
                To qualify for our money-back guarantee, all of the following conditions must be met:
              </p>
              <div className="bg-gray-50 rounded-xl p-6 mb-4">
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Timing:</strong> Request must be submitted within 7 calendar days of your original purchase date (not the date you first logged in)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span><strong>First Purchase Only:</strong> Refunds are available only on your first purchase with AnalystTrainer. Repeat purchases, renewals, and upgrades are non-refundable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Usage Limit:</strong> You must have answered fewer than 50 practice questions in total (across all topics and mock exams)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span><strong>No Completed Mock Exams:</strong> You must not have completed any full mock exam (partial attempts are permitted)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Account in Good Standing:</strong> Your account must not have any Terms of Service violations or chargebacks</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Request a Refund</h2>
              <p className="text-gray-600 mb-4">
                To initiate a refund request, please email us with the following information:
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-4">
                <ol className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">1</span>
                    <span>Send an email to <strong>support@analysttrainer.com</strong> with subject line: <em>"Refund Request - [Your Order ID]"</em></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">2</span>
                    <span>Include your registered email address and order/transaction ID from your purchase confirmation email</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">3</span>
                    <span>Attach a clear photo of a government-issued ID (passport or driver's licence) matching the name on the account for identity verification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">4</span>
                    <span>Provide a detailed explanation (minimum 100 words) of why our product did not meet your expectations</span>
                  </li>
                </ol>
              </div>
              <p className="text-sm text-gray-500">
                Incomplete requests will not be processed. You will receive a confirmation within 2 business days that your request has been received.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Processing</h2>
              <p className="text-gray-600 mb-4">
                Once your refund request is approved:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li>Refunds are processed within <strong>5-7 business days</strong> of approval</li>
                <li>Funds will be returned to your original payment method only</li>
                <li>Credit card refunds may take an additional 5-10 business days to appear on your statement depending on your bank</li>
                <li>Your account access will be terminated immediately upon refund approval</li>
                <li>You will receive email confirmation when the refund has been processed</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Non-Refundable Items</h2>
              <p className="text-gray-600 mb-4">
                The following are expressly excluded from our refund policy:
              </p>
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Purchases made more than 7 days ago
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Subscription renewals or upgrades
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Accounts that have exceeded usage limits (50+ questions or completed mock exams)
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Second or subsequent purchases from the same individual
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Promotional or discounted purchases (unless explicitly stated)
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Accounts terminated for Terms of Service violations
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Purchases with pending or completed chargebacks
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellation vs Refund</h2>
              <p className="text-gray-600 mb-4">
                If you don't qualify for a refund but wish to stop your subscription:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>You can cancel anytime from your account settings</li>
                <li>Access continues until the end of your current billing period</li>
                <li>No further charges will occur after cancellation</li>
                <li>Cancellation does not entitle you to a refund for the current period</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Exceptions</h2>
              <p className="text-gray-600 mb-4">
                In rare cases, we may consider refunds outside our standard policy for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                <li><strong>Technical Issues:</strong> Persistent platform issues that prevent access and cannot be resolved by our support team within 48 hours</li>
                <li><strong>Duplicate Charges:</strong> Accidental double billing (automatically refunded upon verification)</li>
                <li><strong>Billing Errors:</strong> Incorrect amounts charged due to system errors</li>
              </ul>
              <p className="text-sm text-gray-500">
                Exception requests require documented evidence and are reviewed on a case-by-case basis. Our decision is final.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-600 mb-4">
                Questions about our refund policy? We're here to help.
              </p>
              <div className="bg-gray-50 rounded-xl p-6">
                <ul className="space-y-2 text-gray-700">
                  <li><strong>Email:</strong> <a href="mailto:support@analysttrainer.com" className="text-[#1FB8CD] hover:underline">support@analysttrainer.com</a></li>
                  <li><strong>Response Time:</strong> Within 2 business days</li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gray-50 border-t">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your CFA Journey?</h2>
            <p className="text-gray-600 mb-6">
              Try our <Link href="/cfa-level-1-practice-questions" className="text-[#1FB8CD] hover:underline">2,500+ practice questions</Link> with confidence. Our 7-day guarantee means you can explore risk-free.
            </p>
            <Link
              href="/free-cfa-questions"
              className="inline-block px-8 py-3 bg-[#1FB8CD] text-white rounded-full font-semibold hover:bg-[#18a3b5] transition-colors"
            >
              Get Started
            </Link>
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
                </ul>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-gray-900">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link href="/blog" className="hover:text-gray-900">Blog</Link></li>
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
