"use client";

import Link from "next/link";
import { useState } from "react";

export default function Help() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const helpArticles = [
    {
      id: 1,
      title: "Getting Started with Finance Exam Prep",
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
            Help Center
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Find answers to your questions and get the most out of your CFA preparation.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pr-12 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
              <svg className="absolute right-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Categories and Articles */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
                      : "bg-white text-[#5f6368] hover:text-[#13343B] border border-gray-300"
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
              <div key={article.id} className="bg-white rounded-xl p-6 border border-[#EAEEEF] hover:shadow-lg transition-shadow cursor-pointer">
                <div className="mb-3">
                  <span className="px-2 py-1 bg-gray-100 text-[#5f6368] text-xs rounded">
                    {article.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{article.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#9aa0a6]">{article.readTime}</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600">Try adjusting your search or browse different categories.</p>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#13343B] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to the most common questions.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#FBFAF4] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#13343B] mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Still Need Help?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Contact Support
            </Link>
            <a href="mailto:support@financeexamprep.com" className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors">
              Email Us
            </a>
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
            <p className="text-gray-600">© 2024 Finance Exam Prep. All rights reserved.</p>
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