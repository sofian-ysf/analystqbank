"use client";

import Link from "next/link";
import Image from "next/image";

export default function Privacy() {
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
              <Link href="/blog" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Blog
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
        <div className="bg-white rounded-xl p-8 sm:p-12 border border-[#EAEEEF]">
          <h1 className="text-4xl font-bold text-[#13343B] mb-4">Privacy Policy</h1>
          <p className="text-sm text-[#9aa0a6] mb-8">
            <strong>Last updated:</strong> January 1, 2024
          </p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">1. Introduction</h2>
              <p className="text-[#5f6368] mb-4">
                AnalystTrainer (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <p className="text-[#5f6368]">
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our website or use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-[#13343B] mb-3">2.1 Personal Information</h3>
              <p className="text-[#5f6368] mb-4">
                We may collect personal information that you provide directly to us, such as:
              </p>
              <ul className="list-disc pl-6 mb-4 text-[#5f6368]">
                <li>Name and email address</li>
                <li>Account credentials</li>
                <li>Payment information</li>
                <li>Study preferences and progress</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-[#13343B] mb-3">2.2 Usage Information</h3>
              <p className="text-[#5f6368] mb-4">
                We automatically collect certain information when you use our services:
              </p>
              <ul className="list-disc pl-6 mb-4 text-[#5f6368]">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Study session data and performance metrics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">3. How We Use Your Information</h2>
              <p className="text-[#5f6368] mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 mb-4 text-[#5f6368]">
                <li>Providing and maintaining our services</li>
                <li>Processing transactions and managing subscriptions</li>
                <li>Personalizing your learning experience</li>
                <li>Sending important notifications and updates</li>
                <li>Improving our platform and developing new features</li>
                <li>Providing customer support</li>
                <li>Analyzing usage patterns and performance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-[#5f6368] mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 text-[#5f6368]">
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist in operating our platform</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights</li>
                <li><strong>Business Transfers:</strong> Information may be transferred in connection with a merger, sale, or acquisition</li>
                <li><strong>With Your Consent:</strong> We may share information when you give us explicit permission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">5. Data Security</h2>
              <p className="text-[#5f6368] mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 mb-4 text-[#5f6368]">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure data centers and infrastructure</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">6. Your Rights and Choices</h2>
              <p className="text-[#5f6368] mb-4">
                You have certain rights regarding your personal information:
              </p>
              <ul className="list-disc pl-6 mb-4 text-[#5f6368]">
                <li><strong>Access:</strong> You can request access to your personal information</li>
                <li><strong>Correction:</strong> You can request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> You can request deletion of your personal information</li>
                <li><strong>Portability:</strong> You can request a copy of your data in a portable format</li>
                <li><strong>Opt-out:</strong> You can opt out of marketing communications</li>
              </ul>
              <p className="text-[#5f6368]">
                To exercise these rights, please contact us at <a href="mailto:support@analysttrainer.com" className="text-[#1FB8CD] hover:underline">support@analysttrainer.com</a>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">7. Cookies and Tracking Technologies</h2>
              <p className="text-[#5f6368]">
                We use cookies and similar tracking technologies to enhance your experience on our platform. You can manage your cookie preferences through your browser settings. However, disabling cookies may affect the functionality of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">8. Children&apos;s Privacy</h2>
              <p className="text-[#5f6368]">
                Our services are not intended for children under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16, we will take steps to delete such information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">9. Changes to This Privacy Policy</h2>
              <p className="text-[#5f6368]">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">10. Contact Information</h2>
              <p className="text-[#5f6368] mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul className="list-none text-[#5f6368]">
                <li><strong>Email:</strong> <a href="mailto:support@analysttrainer.com" className="text-[#1FB8CD] hover:underline">support@analysttrainer.com</a></li>
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
            <p>© 2026 AnalystTrainer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
