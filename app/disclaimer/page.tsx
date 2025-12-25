"use client";

import Link from "next/link";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-[#13343B]">
                AnalystTrainer
              </Link>
              <nav className="ml-10 flex space-x-8">
                <Link href="/features" className="text-[#5f6368] hover:text-[#13343B]">
                  Features
                </Link>
                <Link href="/pricing" className="text-[#5f6368] hover:text-[#13343B]">
                  Pricing
                </Link>
                <Link href="/resources" className="text-[#5f6368] hover:text-[#13343B]">
                  Resources
                </Link>
                <Link href="/about" className="text-[#5f6368] hover:text-[#13343B]">
                  About
                </Link>
                <Link href="/contact" className="text-[#5f6368] hover:text-[#13343B]">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-sm font-medium text-[#5f6368] hover:text-[#13343B]">
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
        <div className="bg-white rounded-xl p-8 border border-[#EAEEEF]">
          <h1 className="text-4xl font-bold text-[#13343B] mb-8">Disclaimer</h1>

          <div className="prose prose-lg max-w-none text-[#5f6368]">
            <p className="text-sm text-[#9aa0a6] mb-8">
              <strong>Last updated:</strong> January 1, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">General Disclaimer</h2>
              <p className="mb-4">
                The information provided by AnalystTrainer (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on our website and through our services is for general educational and informational purposes only. All information on the site and in our products is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">CFA Institute Disclaimer</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <p className="text-amber-800 font-medium mb-2">Important Notice:</p>
                <p className="text-amber-700">
                  AnalystTrainer is <strong>not affiliated with, endorsed by, or connected to CFA Institute</strong>. CFA®, Chartered Financial Analyst®, and CFA Institute are trademarks owned by CFA Institute.
                </p>
              </div>
              <p className="mb-4">
                Our practice questions, study materials, and mock exams are independently developed and are intended to supplement your CFA exam preparation. They do not represent actual CFA exam questions and should be used alongside official CFA Institute curriculum materials.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">No Guarantee of Results</h2>
              <p className="mb-4">
                While we strive to provide high-quality exam preparation materials, we cannot and do not guarantee:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>That you will pass the CFA or any other certification exam</li>
                <li>Any specific exam score or performance level</li>
                <li>That our questions will appear on the actual exam</li>
                <li>That our materials cover all topics on the actual exam</li>
                <li>Any particular career outcomes or professional advancement</li>
              </ul>
              <p className="mb-4">
                Exam success depends on many factors including individual effort, study habits, prior knowledge, and exam-day performance. Our materials are tools to aid your preparation, not guarantees of success.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">Educational Purpose Only</h2>
              <p className="mb-4">
                All content provided through AnalystTrainer is for educational purposes only. This includes:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Practice questions and explanations</li>
                <li>Study guides and summaries</li>
                <li>Formula sheets and reference materials</li>
                <li>Mock exams and assessments</li>
                <li>Blog posts and articles</li>
              </ul>
              <p className="mb-4">
                Our content should not be considered as professional financial, investment, legal, or tax advice. Always consult with qualified professionals for specific financial or legal matters.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">Accuracy of Information</h2>
              <p className="mb-4">
                We make reasonable efforts to ensure that our content is accurate and up-to-date. However:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Financial regulations and exam curricula change over time</li>
                <li>Errors or omissions may occur in our materials</li>
                <li>Information may become outdated between updates</li>
                <li>Third-party sources we reference may contain errors</li>
              </ul>
              <p className="mb-4">
                We recommend always cross-referencing important information with official sources and the current CFA Institute curriculum.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">External Links</h2>
              <p className="mb-4">
                Our website and materials may contain links to external websites. We are not responsible for the content, accuracy, or availability of these external sites. The inclusion of any links does not imply endorsement or recommendation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">Limitation of Liability</h2>
              <p className="mb-4">
                Under no circumstances shall AnalystTrainer be liable for any direct, indirect, special, incidental, consequential, or punitive damages arising from:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Your use of or inability to use our services</li>
                <li>Any errors or omissions in our content</li>
                <li>Exam failure or poor performance</li>
                <li>Any decisions made based on our content</li>
                <li>Loss of data or unauthorized access to your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">Changes to This Disclaimer</h2>
              <p className="mb-4">
                We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes constitutes acceptance of the modified disclaimer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-[#13343B] mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this disclaimer, please contact us:
              </p>
              <ul className="list-none mb-4">
                <li><strong>Email:</strong> <a href="mailto:legal@analysttrainer.com" className="text-[#1FB8CD] hover:underline">legal@analysttrainer.com</a></li>
                <li><strong>Website:</strong> <Link href="/contact" className="text-[#1FB8CD] hover:underline">Contact Us</Link></li>
              </ul>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-[#EAEEEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link href="/" className="text-xl font-bold text-[#13343B]">
                AnalystTrainer
              </Link>
              <p className="mt-4 text-gray-600">
                Your comprehensive platform for CFA exam success.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#13343B] mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-[#5f6368] hover:text-[#13343B]">Features</Link></li>
                <li><Link href="/pricing" className="text-[#5f6368] hover:text-[#13343B]">Pricing</Link></li>
                <li><Link href="/question-bank" className="text-[#5f6368] hover:text-[#13343B]">Question Bank</Link></li>
                <li><Link href="/mock-exams" className="text-[#5f6368] hover:text-[#13343B]">Mock Exams</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#13343B] mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-[#5f6368] hover:text-[#13343B]">Blog</Link></li>
                <li><Link href="/help" className="text-[#5f6368] hover:text-[#13343B]">Help Center</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#13343B] mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-[#5f6368] hover:text-[#13343B]">About</Link></li>
                <li><Link href="/contact" className="text-[#5f6368] hover:text-[#13343B]">Contact</Link></li>
                <li><Link href="/privacy" className="text-[#5f6368] hover:text-[#13343B]">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-[#5f6368] hover:text-[#13343B]">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#EAEEEF] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">© 2024 AnalystTrainer. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-[#5f6368] hover:text-[#13343B]">Privacy</Link>
              <Link href="/terms" className="text-[#5f6368] hover:text-[#13343B]">Terms</Link>
              <Link href="/disclaimer" className="text-[#5f6368] hover:text-[#13343B]">Disclaimer</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
