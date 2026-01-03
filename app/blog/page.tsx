import Link from "next/link";
import Image from "next/image";
import { getAllPosts, getAllCategories, formatDate } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | AnalystTrainer - CFA Exam Prep Tips & Guides",
  description: "Expert insights, study tips, and in-depth guides to help you succeed in your CFA exam journey. Learn from experienced CFA charterholders.",
  openGraph: {
    title: "AnalystTrainer Blog - CFA Exam Prep Tips & Guides",
    description: "Expert insights, study tips, and in-depth guides to help you succeed in your CFA exam journey.",
    type: "website",
  },
};

export default function Blog() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/">
              <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#product" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Features
              </Link>
              <Link href="/#pricing" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Pricing
              </Link>
              <Link href="/blog" className="text-[#13343B] font-medium transition-colors">
                Blog
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Login
              </Link>
              <Link href="/signup" className="bg-[#1FB8CD] text-white px-5 py-2 rounded-lg hover:bg-[#1A6872] transition-all font-medium">
                Start Free Trial
              </Link>
            </div>

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
      {categories.length > 1 && (
        <section className="px-4 sm:px-6 pb-8">
          <div className="max-w-[960px] mx-auto">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    category === "All"
                      ? "bg-[#1FB8CD] text-white"
                      : "bg-white text-[#5f6368] border border-[#EAEEEF]"
                  }`}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="px-4 sm:px-6 pb-20">
        <div className="max-w-[960px] mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.slug}>
                  <article className="bg-white rounded-xl border border-[#EAEEEF] overflow-hidden hover:shadow-md transition-shadow h-full">
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
                        <span className="text-[#9aa0a6] text-sm">{formatDate(post.date)}</span>
                        <span className="text-[#1FB8CD] text-sm font-medium">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <svg className="w-16 h-16 text-[#9aa0a6] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <h3 className="text-xl font-bold text-[#13343B] mb-2">Coming Soon!</h3>
              <p className="text-[#5f6368] max-w-md mx-auto">
                We&apos;re working on in-depth articles and study guides. Check back soon for expert CFA exam preparation content.
              </p>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 bg-[#13343B] rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Ready to Start Practicing?</h3>
            <p className="text-white/80 mb-6">
              Access thousands of CFA practice questions and mock exams.
            </p>
            <Link
              href="/signup"
              className="inline-block px-6 py-3 bg-[#1FB8CD] text-white rounded-lg hover:bg-[#1A6872] transition-colors font-medium"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

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
                <li><Link href="/help" className="hover:text-[#13343B] transition-colors">Help Centre</Link></li>
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
            <p>© 2025 AnalystTrainer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
