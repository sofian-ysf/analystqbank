"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Help() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const helpArticles = [
    {
      id: 1,
      title: "Getting Started with AnalystTrainer",
      category: "Getting Started",
      description: "Learn how to set up your account and begin your CFA preparation journey",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "How to Use the Question Bank",
      category: "Question Bank",
      description: "Master the question bank features to maximize your practice sessions",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Taking Mock Exams",
      category: "Mock Exams",
      description: "Complete guide to accessing and taking full-length practice exams",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "Understanding Your Performance Analytics",
      category: "Analytics",
      description: "Learn to interpret your progress reports and performance metrics",
      readTime: "8 min read"
    },
    {
      id: 5,
      title: "Managing Your Study Schedule",
      category: "Study Planning",
      description: "Tips for creating and maintaining an effective study schedule",
      readTime: "6 min read"
    },
    {
      id: 6,
      title: "Troubleshooting Login Issues",
      category: "Account",
      description: "Resolve common login and account access problems",
      readTime: "4 min read"
    },
    {
      id: 7,
      title: "Billing and Subscription Management",
      category: "Billing",
      description: "Manage your subscription, payments, and billing information",
      readTime: "5 min read"
    },
    {
      id: 8,
      title: "Downloading Study Materials",
      category: "Resources",
      description: "How to access and download PDF study guides and formula sheets",
      readTime: "3 min read"
    }
  ];

  const categories = ["All", "Getting Started", "Question Bank", "Mock Exams", "Analytics",
                     "Study Planning", "Account", "Billing", "Resources"];

  const filteredArticles = helpArticles.filter(article => {
    const categoryMatch = selectedCategory === "All" || article.category === selectedCategory;
    const searchMatch = searchTerm === "" ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email."
    },
    {
      question: "Can I download content for offline study?",
      answer: "Yes, all study guides and formula sheets can be downloaded as PDFs for offline access."
    },
    {
      question: "How often is the content updated?",
      answer: "Our content is updated regularly to reflect the latest CFA curriculum changes, typically within 30 days of official announcements."
    },
    {
      question: "Do you offer a mobile app?",
      answer: "Our platform is fully responsive and works on mobile devices. A dedicated mobile app is coming soon."
    },
    {
      question: "Can I switch between CFA levels?",
      answer: "Yes, Professional and Premium plans include access to all CFA levels. You can switch between them at any time."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for annual subscriptions."
    }
  ];

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

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-[960px] mx-auto text-center">
          <h1 className="text-4xl font-bold text-[#13343B] mb-4">Help Center</h1>
          <p className="text-xl text-[#5f6368] max-w-2xl mx-auto mb-8">
            Find answers to your questions and get the most out of your CFA preparation.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-[#EAEEEF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1FB8CD] focus:border-transparent"
              />
              <svg className="absolute right-4 top-3.5 w-5 h-5 text-[#9aa0a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Categories and Articles */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-[960px] mx-auto">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-[#1FB8CD] text-white"
                      : "bg-white text-[#5f6368] hover:bg-[#F3F3EE] border border-[#EAEEEF]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Help Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl p-6 border border-[#EAEEEF] hover:shadow-md transition-shadow cursor-pointer">
                <div className="mb-3">
                  <span className="px-2 py-1 bg-[#1FB8CD]/10 text-[#1A6872] text-xs font-medium rounded">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#13343B] mb-2">{article.title}</h3>
                <p className="text-[#5f6368] text-sm mb-4">{article.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9aa0a6]">{article.readTime}</span>
                  <svg className="w-5 h-5 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-[#9aa0a6] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-lg font-medium text-[#13343B] mb-2">No articles found</h3>
              <p className="text-[#5f6368]">Try adjusting your search or browse different categories.</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 py-16 bg-[#F3F3EE]">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#13343B] mb-4">Frequently Asked Questions</h2>
            <p className="text-[#5f6368]">Quick answers to the most common questions.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-[#EAEEEF]">
                <h3 className="text-lg font-semibold text-[#13343B] mb-2">{faq.question}</h3>
                <p className="text-[#5f6368]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="px-4 sm:px-6 py-16 bg-[#13343B]">
        <div className="max-w-[960px] mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Still Need Help?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-[#1FB8CD] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors">
              Contact Support
            </Link>
            <a href="mailto:support@analysttrainer.com" className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-[#13343B] transition-colors">
              Email Us
            </a>
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
