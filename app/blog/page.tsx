"use client";

import Link from "next/link";

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Study Strategies for CFA Level 1 Success",
      excerpt: "Discover proven study techniques that have helped thousands of candidates pass the CFA Level 1 exam on their first attempt.",
      category: "Study Tips",
      date: "December 20, 2024",
      readTime: "8 min read",
      image: "/blog/study-strategies.jpg"
    },
    {
      id: 2,
      title: "Understanding Time Value of Money: A Complete Guide",
      excerpt: "Master the foundational concept of TVM with practical examples and step-by-step calculations for CFA exam questions.",
      category: "Quantitative Methods",
      date: "December 15, 2024",
      readTime: "12 min read",
      image: "/blog/tvm-guide.jpg"
    },
    {
      id: 3,
      title: "Ethics and Professional Standards: Key Concepts",
      excerpt: "A comprehensive breakdown of the CFA Institute's Code of Ethics and Standards of Professional Conduct.",
      category: "Ethics",
      date: "December 10, 2024",
      readTime: "10 min read",
      image: "/blog/ethics.jpg"
    },
    {
      id: 4,
      title: "How to Use Practice Questions Effectively",
      excerpt: "Learn the optimal way to practice with question banks to maximize retention and exam readiness.",
      category: "Study Tips",
      date: "December 5, 2024",
      readTime: "6 min read",
      image: "/blog/practice-questions.jpg"
    },
    {
      id: 5,
      title: "Financial Statement Analysis: Red Flags to Watch",
      excerpt: "Identify warning signs in financial statements that could indicate accounting manipulation or financial distress.",
      category: "Financial Reporting",
      date: "November 28, 2024",
      readTime: "9 min read",
      image: "/blog/fsa-red-flags.jpg"
    },
    {
      id: 6,
      title: "Portfolio Management Basics for CFA Candidates",
      excerpt: "Build a strong foundation in portfolio theory, including MPT, CAPM, and efficient frontier concepts.",
      category: "Portfolio Management",
      date: "November 20, 2024",
      readTime: "11 min read",
      image: "/blog/portfolio-mgmt.jpg"
    }
  ];

  const categories = ["All", "Study Tips", "Ethics", "Quantitative Methods", "Financial Reporting", "Portfolio Management", "Economics"];

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

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AnalystTrainer Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Expert insights, study tips, and in-depth guides to help you succeed in your CFA exam journey.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === "All"
                  ? "bg-[#1FB8CD] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-[#1FB8CD]/20 to-[#1A6872]/20 flex items-center justify-center">
                <svg className="w-16 h-16 text-[#1FB8CD]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-[#1FB8CD]/10 text-[#1A6872] text-xs font-medium rounded">
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-xs">{post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{post.date}</span>
                  <button className="text-[#1FB8CD] text-sm font-medium hover:underline">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-12 bg-[#1FB8CD]/5 border border-[#1FB8CD]/20 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">More Content Coming Soon!</h3>
          <p className="text-gray-600 mb-4">
            We&apos;re working on more in-depth articles and study guides. Subscribe to get notified when new content is published.
          </p>
          <div className="flex justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB8CD] focus:border-transparent"
            />
            <button className="px-6 py-2 bg-[#1FB8CD] text-white rounded-lg hover:bg-[#1A6872] transition-colors font-medium">
              Subscribe
            </button>
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
                <li><Link href="/study-guides" className="text-gray-600 hover:text-gray-900">Study Guides</Link></li>
                <li><Link href="/formula-sheets" className="text-gray-600 hover:text-gray-900">Formula Sheets</Link></li>
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
              <Link href="/disclaimer" className="text-gray-600 hover:text-gray-900">Disclaimer</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
