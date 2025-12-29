"use client";

import Link from "next/link";
import Image from "next/image";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      {/* Header / Navigation - Same as homepage */}
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/">
              <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#product" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Features
              </Link>
              <Link href="/#pricing" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Pricing
              </Link>
              <Link href="/#proof" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Testimonials
              </Link>
              <Link href="/#faq" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                FAQ
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Login
              </Link>
              <Link href="/signup" className="bg-[#1FB8CD] text-white px-5 py-2 rounded-lg hover:bg-[#1A6872] transition-all font-medium">
                Start Free Trial
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg text-[#5f6368] hover:text-[#13343B] hover:bg-[#F3F3EE]" aria-label="Open menu">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-xl p-8 border border-[#EAEEEF]">
          <h1 className="text-4xl font-bold text-[#13343B] mb-8">Terms of Service</h1>

          <div className="prose prose-lg max-w-none text-[#5f6368]">
            <p className="text-sm text-[#9aa0a6] mb-8">
              <strong>Last updated:</strong> January 1, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">1. Agreement to Terms</h2>
              <p className="mb-4">
                By accessing or using AnalystTrainer (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you disagree with any part of the terms, you may not access the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">2. Description of Service</h2>
              <p className="mb-4">
                AnalystTrainer provides an online platform for CFA and financial certification exam preparation, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Practice questions and question banks</li>
                <li>Mock examinations</li>
                <li>Study materials and resources</li>
                <li>Performance analytics and progress tracking</li>
                <li>AI-powered learning tools</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">3. User Accounts</h2>
              <p className="mb-4">
                When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
                <li>Ensuring your account information remains accurate</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">4. Subscription and Payments</h2>
              <p className="mb-4">
                Some features of the Service require a paid subscription. By subscribing, you agree to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Pay all fees associated with your selected plan</li>
                <li>Provide valid payment information</li>
                <li>Automatic renewal unless cancelled before the renewal date</li>
                <li>Price changes with reasonable notice</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">5. Acceptable Use</h2>
              <p className="mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Share your account credentials with others</li>
                <li>Copy, distribute, or reproduce our content without permission</li>
                <li>Use the Service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any part of the Service</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Use automated systems to access the Service without permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">6. Intellectual Property</h2>
              <p className="mb-4">
                The Service and its original content, features, and functionality are owned by AnalystTrainer and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="mb-4">
                Our content includes but is not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Practice questions and explanations</li>
                <li>Study materials and guides</li>
                <li>Mock exams and assessments</li>
                <li>Software and platform design</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">7. Disclaimer</h2>
              <p className="mb-4">
                The Service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We make no warranties, expressed or implied, regarding:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>The accuracy or completeness of any content</li>
                <li>Exam success or specific outcomes</li>
                <li>Uninterrupted or error-free service</li>
                <li>Fitness for a particular purpose</li>
              </ul>
              <p className="mb-4">
                <strong>Note:</strong> AnalystTrainer is not affiliated with, endorsed by, or connected to CFA Institute. CFA® and Chartered Financial Analyst® are trademarks owned by CFA Institute.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">8. Limitation of Liability</h2>
              <p className="mb-4">
                To the maximum extent permitted by law, AnalystTrainer shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Loss of profits or revenue</li>
                <li>Loss of data</li>
                <li>Exam failure or poor performance</li>
                <li>Any other intangible losses</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">9. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Your right to use the Service will immediately cease</li>
                <li>You remain liable for any outstanding fees</li>
                <li>Provisions that should survive termination will remain in effect</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">10. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date. Continued use of the Service after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">11. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of England and Wales, without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">12. Contact Information</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <ul className="list-none mb-4">
                <li><strong>Email:</strong> legal@analysttrainer.com</li>
                <li><strong>Website:</strong> <Link href="/contact" className="text-[#1FB8CD] hover:underline">Contact Us</Link></li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-[#EAEEEF]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link href="/">
                <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
              </Link>
              <p className="mt-4 text-[#5f6368] text-sm">
                The leading platform for finance certification exam preparation.
              </p>
            </div>

            <div>
              <h4 className="font-medium text-[#13343B] mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-[#9aa0a6]">
                <li><Link href="/#product" className="hover:text-[#13343B] transition-colors">Features</Link></li>
                <li><Link href="/#pricing" className="hover:text-[#13343B] transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-[#13343B] mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-[#9aa0a6]">
                <li><Link href="/blog" className="hover:text-[#13343B] transition-colors">Blog</Link></li>
                <li><Link href="/help" className="hover:text-[#13343B] transition-colors">Help Center</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-[#13343B] mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#9aa0a6]">
                <li><Link href="/privacy" className="hover:text-[#13343B] transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-[#13343B] transition-colors">Terms</Link></li>
                <li><Link href="/refund" className="hover:text-[#13343B] transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#EAEEEF] mt-8 pt-8 text-center text-sm text-[#9aa0a6]">
            <p>© 2024 AnalystTrainer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
