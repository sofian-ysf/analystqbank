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
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Understanding Time Value of Money: A Complete Guide",
      excerpt: "Master the foundational concept of TVM with practical examples and step-by-step calculations for CFA exam questions.",
      category: "Quantitative Methods",
      date: "December 15, 2024",
      readTime: "12 min read"
    },
    {
      id: 3,
      title: "Ethics and Professional Standards: Key Concepts",
      excerpt: "A comprehensive breakdown of the CFA Institute's Code of Ethics and Standards of Professional Conduct.",
      category: "Ethics",
      date: "December 10, 2024",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "How to Use Practice Questions Effectively",
      excerpt: "Learn the optimal way to practice with question banks to maximize retention and exam readiness.",
      category: "Study Tips",
      date: "December 5, 2024",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "Financial Statement Analysis: Red Flags to Watch",
      excerpt: "Identify warning signs in financial statements that could indicate accounting manipulation or financial distress.",
      category: "Financial Reporting",
      date: "November 28, 2024",
      readTime: "9 min read"
    },
    {
      id: 6,
      title: "Portfolio Management Basics for CFA Candidates",
      excerpt: "Build a strong foundation in portfolio theory, including MPT, CAPM, and efficient frontier concepts.",
      category: "Portfolio Management",
      date: "November 20, 2024",
      readTime: "11 min read"
    }
  ];

  const categories = ["All", "Study Tips", "Ethics", "Quantitative Methods", "Financial Reporting", "Portfolio Management", "Economics"];

  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      {/* Header / Navigation - Same as homepage */}
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-[#13343B]">
              AnalystTrainer
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

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-[960px] mx-auto">
          <h1 className="text-4xl font-bold text-[#13343B] mb-4">AnalystTrainer Blog</h1>
          <p className="text-xl text-[#5f6368] max-w-2xl">
            Expert insights, study tips, and in-depth guides to help you succeed in your CFA exam journey.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 pb-8">
        <div className="max-w-[960px] mx-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-[#1FB8CD] text-white"
                    : "bg-white text-[#5f6368] hover:bg-[#F3F3EE] border border-[#EAEEEF]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-[960px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl border border-[#EAEEEF] overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-40 bg-gradient-to-br from-[#1FB8CD]/10 to-[#1A6872]/10 flex items-center justify-center">
                  <svg className="w-12 h-12 text-[#1FB8CD]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-[#1FB8CD]/10 text-[#1A6872] text-xs font-medium rounded">
                      {post.category}
                    </span>
                    <span className="text-[#9aa0a6] text-xs">{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-bold text-[#13343B] mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-[#5f6368] text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#9aa0a6] text-sm">{post.date}</span>
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
            <h3 className="text-xl font-bold text-[#13343B] mb-2">More Content Coming Soon!</h3>
            <p className="text-[#5f6368] mb-6">
              We&apos;re working on more in-depth articles and study guides. Subscribe to get notified when new content is published.
            </p>
            <div className="flex justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-[#EAEEEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB8CD] focus:border-transparent"
              />
              <button className="px-6 py-2 bg-[#1FB8CD] text-white rounded-lg hover:bg-[#1A6872] transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#EAEEEF]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="text-xl font-bold text-[#13343B]">
                AnalystTrainer
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
