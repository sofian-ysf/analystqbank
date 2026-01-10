"use client";

import Link from "next/link";

export default function Resources() {
  const resourceCategories = [
    {
      title: "Study Guides",
      description: "Comprehensive study guides for all CFA levels",
      icon: "📚",
      items: [
        { name: "Level I Complete Guide", type: "PDF", size: "2.3 MB" },
        { name: "Level II Advanced Topics", type: "PDF", size: "3.1 MB" },
        { name: "Level III Portfolio Management", type: "PDF", size: "1.8 MB" },
        { name: "Ethics Quick Reference", type: "PDF", size: "0.5 MB" }
      ]
    },
    {
      title: "Formula Sheets",
      description: "Essential formulas organized by topic",
      icon: "📐",
      items: [
        { name: "Quantitative Methods", type: "PDF", size: "1.2 MB" },
        { name: "Financial Reporting", type: "PDF", size: "1.5 MB" },
        { name: "Corporate Finance", type: "PDF", size: "1.1 MB" },
        { name: "Portfolio Management", type: "PDF", size: "1.3 MB" }
      ]
    },
    {
      title: "Video Tutorials",
      description: "Expert-led video explanations",
      icon: "🎥",
      items: [
        { name: "Time Value of Money", type: "Video", size: "45 min" },
        { name: "Financial Statement Analysis", type: "Video", size: "1.2 hrs" },
        { name: "Derivatives Fundamentals", type: "Video", size: "38 min" },
        { name: "Fixed Income Securities", type: "Video", size: "52 min" }
      ]
    },
    {
      title: "Research Papers",
      description: "Industry research and analysis",
      icon: "🔬",
      items: [
        { name: "Market Efficiency Studies", type: "PDF", size: "2.8 MB" },
        { name: "Alternative Investments Analysis", type: "PDF", size: "3.2 MB" },
        { name: "Risk Management Frameworks", type: "PDF", size: "2.1 MB" },
        { name: "Behavioral Finance Research", type: "PDF", size: "1.9 MB" }
      ]
    }
  ];

  const studyTips = [
    {
      title: "Create a Study Schedule",
      description: "Develop a consistent study routine that fits your lifestyle and exam timeline."
    },
    {
      title: "Practice Regularly",
      description: "Use practice questions daily to reinforce concepts and identify weak areas."
    },
    {
      title: "Focus on Ethics",
      description: "Ethics is crucial for passing. Spend extra time on this section."
    },
    {
      title: "Review Formula Sheets",
      description: "Memorize key formulas and practice applying them in different contexts."
    },
    {
      title: "Take Mock Exams",
      description: "Simulate exam conditions to build stamina and time management skills."
    },
    {
      title: "Join Study Groups",
      description: "Collaborate with other candidates to discuss complex topics and share insights."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-[#13343B]">
                Finance Exam Prep
              </Link>
              <nav className="ml-10 flex space-x-8">
                <Link href="/features" className="text-[#5f6368] hover:text-[#13343B]">
                  Features
                </Link>
                <Link href="/pricing" className="text-[#5f6368] hover:text-[#13343B]">
                  Pricing
                </Link>
                <Link href="/resources" className="text-gray-900 font-medium">
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
              <Link href="/signup" className="text-sm font-medium text-white bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-800">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            CFA Study Resources
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Access comprehensive study materials, guides, and tools to accelerate your CFA exam preparation.
          </p>
          <Link href="/signup" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Access All Resources
          </Link>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#13343B] mb-4">
              Study Materials Library
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive library contains everything you need for effective CFA preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {resourceCategories.map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-8 border border-[#EAEEEF]">
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-4">{category.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-[#13343B]">{category.title}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {category.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-[#FBFAF4] rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-[#9aa0a6]">{item.type} • {item.size}</p>
                        </div>
                      </div>
                      <button className="text-gray-900 hover:text-[#5f6368] font-medium text-sm">
                        Download
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <Link href="/signup" className="w-full block text-center bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
                    Access All {category.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Tips Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#13343B] mb-4">
              Expert Study Tips
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proven strategies from successful CFA candidates and industry experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studyTips.map((tip, index) => (
              <div key={index} className="bg-[#FBFAF4] rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-gray-900">{tip.title}</h3>
                </div>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#13343B] mb-4">
              Quick Access
            </h2>
            <p className="text-xl text-gray-600">
              Jump directly to your most-used study tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/question-bank" className="bg-white rounded-xl p-6 border border-[#EAEEEF] hover:shadow-lg transition-shadow text-center">
              <div className="text-3xl mb-4">❓</div>
              <h3 className="font-bold text-gray-900 mb-2">Question Bank</h3>
              <p className="text-gray-600 text-sm">Practice with 5,000+ questions</p>
            </Link>

            <Link href="/mock-exams" className="bg-white rounded-xl p-6 border border-[#EAEEEF] hover:shadow-lg transition-shadow text-center">
              <div className="text-3xl mb-4">📝</div>
              <h3 className="font-bold text-gray-900 mb-2">Mock Exams</h3>
              <p className="text-gray-600 text-sm">Full-length practice tests</p>
            </Link>

            <Link href="/formula-sheets" className="bg-white rounded-xl p-6 border border-[#EAEEEF] hover:shadow-lg transition-shadow text-center">
              <div className="text-3xl mb-4">📐</div>
              <h3 className="font-bold text-gray-900 mb-2">Formula Sheets</h3>
              <p className="text-gray-600 text-sm">Essential formulas by topic</p>
            </Link>

            <Link href="/study-guides" className="bg-white rounded-xl p-6 border border-[#EAEEEF] hover:shadow-lg transition-shadow text-center">
              <div className="text-3xl mb-4">📖</div>
              <h3 className="font-bold text-gray-900 mb-2">Study Guides</h3>
              <p className="text-gray-600 text-sm">Comprehensive topic guides</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Access All Resources?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get unlimited access to our complete library of CFA study materials and resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Free Trial
            </Link>
            <Link href="/pricing" className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#EAEEEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link href="/" className="text-xl font-bold text-[#13343B]">
                Finance Exam Prep
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
            <p className="text-gray-600">© 2026 Finance Exam Prep. All rights reserved.</p>
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