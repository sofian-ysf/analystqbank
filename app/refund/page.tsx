"use client";

import Link from "next/link";

export default function Refund() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                AnalystTrainer
              </Link>
              <nav className="ml-10 flex space-x-8">
                <Link href="/features" className="text-gray-600 hover:text-gray-900">
                  Features
                </Link>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
                <Link href="/resources" className="text-gray-600 hover:text-gray-900">
                  Resources
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Sign in
              </Link>
              <Link href="/signup" className="text-sm font-medium text-white bg-[#1FB8CD] px-4 py-2 rounded-lg hover:bg-[#1A6872]">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>

          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-8">
              <strong>Last updated:</strong> January 1, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
              <p className="mb-4">
                At AnalystTrainer, we are committed to your success in your CFA exam preparation journey. We want you to be completely satisfied with our services. If for any reason you are not satisfied, we offer a straightforward refund policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14-Day Money-Back Guarantee</h2>
              <p className="mb-4">
                We offer a <strong>14-day money-back guarantee</strong> on all new subscriptions. If you are not satisfied with our service within the first 14 days of your subscription, you may request a full refund.
              </p>
              <div className="bg-[#1FB8CD]/10 border border-[#1FB8CD]/20 rounded-lg p-4 mb-4">
                <p className="text-[#1A6872] font-medium">
                  To be eligible for a refund under our 14-day guarantee, you must request the refund within 14 days of your initial purchase date.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Eligibility for Refunds</h2>
              <p className="mb-4">
                Refunds are available under the following conditions:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>New subscriptions:</strong> Within 14 days of initial purchase</li>
                <li><strong>Technical issues:</strong> If persistent technical problems prevent you from using the service and we cannot resolve them</li>
                <li><strong>Duplicate charges:</strong> If you were accidentally charged multiple times</li>
                <li><strong>Billing errors:</strong> If there was an error in the amount charged</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Non-Refundable Items</h2>
              <p className="mb-4">
                The following are not eligible for refunds:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Subscriptions beyond the 14-day refund window</li>
                <li>Partial month refunds after the 14-day period</li>
                <li>Free trial conversions after 14 days</li>
                <li>Accounts terminated for Terms of Service violations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Request a Refund</h2>
              <p className="mb-4">
                To request a refund, please follow these steps:
              </p>
              <ol className="list-decimal pl-6 mb-4">
                <li className="mb-2">
                  <strong>Contact Support:</strong> Email us at <a href="mailto:support@analysttrainer.com" className="text-[#1FB8CD] hover:underline">support@analysttrainer.com</a> with the subject line &quot;Refund Request&quot;
                </li>
                <li className="mb-2">
                  <strong>Provide Details:</strong> Include your account email, order/transaction ID, and reason for the refund request
                </li>
                <li className="mb-2">
                  <strong>Wait for Confirmation:</strong> We will review your request and respond within 2-3 business days
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Refund Processing</h2>
              <p className="mb-4">
                Once your refund is approved:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Refunds are processed to the original payment method</li>
                <li>Credit card refunds may take 5-10 business days to appear on your statement</li>
                <li>Bank transfers may take 3-5 business days</li>
                <li>You will receive an email confirmation when the refund is processed</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Subscription Cancellation</h2>
              <p className="mb-4">
                If you wish to cancel your subscription without requesting a refund:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>You can cancel at any time from your account settings</li>
                <li>Your access will continue until the end of your current billing period</li>
                <li>No further charges will be made after cancellation</li>
                <li>You can resubscribe at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about our refund policy, please contact us:
              </p>
              <ul className="list-none mb-4">
                <li><strong>Email:</strong> <a href="mailto:support@analysttrainer.com" className="text-[#1FB8CD] hover:underline">support@analysttrainer.com</a></li>
                <li><strong>Support Page:</strong> <Link href="/contact" className="text-[#1FB8CD] hover:underline">Contact Us</Link></li>
                <li><strong>Help Center:</strong> <Link href="/help" className="text-[#1FB8CD] hover:underline">Help Center</Link></li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link href="/" className="text-xl font-bold text-gray-900">
                AnalystTrainer
              </Link>
              <p className="mt-4 text-gray-600">
                Your comprehensive platform for CFA exam success.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-gray-600 hover:text-gray-900">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link></li>
                <li><Link href="/question-bank" className="text-gray-600 hover:text-gray-900">Question Bank</Link></li>
                <li><Link href="/mock-exams" className="text-gray-600 hover:text-gray-900">Mock Exams</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link></li>
                <li><Link href="/help" className="text-gray-600 hover:text-gray-900">Help Center</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
                <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link></li>
                <li><Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">© 2024 AnalystTrainer. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-600 hover:text-gray-900">Privacy</Link>
              <Link href="/terms" className="text-gray-600 hover:text-gray-900">Terms</Link>
              <Link href="/refund" className="text-gray-600 hover:text-gray-900">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
