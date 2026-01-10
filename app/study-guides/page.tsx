"use client";

import Link from "next/link";
import { useState } from "react";

export default function StudyGuides() {
  const [selectedLevel, setSelectedLevel] = useState("Level I");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");

  const studyGuides = [
    {
      id: 1,
      title: "Ethics and Professional Standards",
      level: "Level I",
      topic: "Ethics",
      description: "Comprehensive guide covering the Code of Ethics and Standards of Professional Conduct",
      pages: 45,
      difficulty: "Beginner",
      downloadSize: "2.3 MB",
      updated: "2024-01-15",
      popular: true
    },
    {
      id: 2,
      title: "Quantitative Methods Fundamentals",
      level: "Level I",
      topic: "Quantitative Methods",
      description: "Statistical concepts, time value of money, and probability distributions",
      pages: 62,
      difficulty: "Intermediate",
      downloadSize: "3.1 MB",
      updated: "2024-01-10",
      popular: false
    },
    {
      id: 3,
      title: "Financial Statement Analysis",
      level: "Level I",
      topic: "Financial Reporting",
      description: "Complete guide to understanding and analyzing financial statements",
      pages: 78,
      difficulty: "Intermediate",
      downloadSize: "4.2 MB",
      updated: "2024-01-20",
      popular: true
    },
    {
      id: 4,
      title: "Corporate Finance Essentials",
      level: "Level I",
      topic: "Corporate Finance",
      description: "Capital budgeting, cost of capital, and corporate governance",
      pages: 56,
      difficulty: "Intermediate",
      downloadSize: "2.8 MB",
      updated: "2024-01-12",
      popular: false
    },
    {
      id: 5,
      title: "Portfolio Management Theory",
      level: "Level I",
      topic: "Portfolio Management",
      description: "Modern portfolio theory, CAPM, and portfolio construction",
      pages: 52,
      difficulty: "Advanced",
      downloadSize: "2.5 MB",
      updated: "2024-01-18",
      popular: true
    },
    {
      id: 6,
      title: "Equity Valuation Methods",
      level: "Level II",
      topic: "Equity Investments",
      description: "Advanced equity valuation techniques and industry analysis",
      pages: 89,
      difficulty: "Advanced",
      downloadSize: "5.1 MB",
      updated: "2024-01-22",
      popular: true
    },
    {
      id: 7,
      title: "Fixed Income Securities",
      level: "Level II",
      topic: "Fixed Income",
      description: "Bond valuation, duration, convexity, and credit analysis",
      pages: 94,
      difficulty: "Advanced",
      downloadSize: "4.8 MB",
      updated: "2024-01-14",
      popular: false
    },
    {
      id: 8,
      title: "Derivatives and Risk Management",
      level: "Level II",
      topic: "Derivatives",
      description: "Options, futures, swaps, and risk management strategies",
      pages: 76,
      difficulty: "Advanced",
      downloadSize: "3.7 MB",
      updated: "2024-01-16",
      popular: true
    },
    {
      id: 9,
      title: "Portfolio Management and Wealth Planning",
      level: "Level III",
      topic: "Portfolio Management",
      description: "Individual and institutional portfolio management",
      pages: 112,
      difficulty: "Expert",
      downloadSize: "6.2 MB",
      updated: "2024-01-25",
      popular: true
    },
    {
      id: 10,
      title: "Trading and Performance Evaluation",
      level: "Level III",
      topic: "Trading",
      description: "Trading strategies, market microstructure, and performance measurement",
      pages: 67,
      difficulty: "Expert",
      downloadSize: "3.4 MB",
      updated: "2024-01-19",
      popular: false
    }
  ];

  const topics = ["All Topics", "Ethics", "Quantitative Methods", "Financial Reporting", "Corporate Finance", "Portfolio Management", "Equity Investments", "Fixed Income", "Derivatives", "Trading"];

  const filteredGuides = studyGuides.filter(guide => {
    const levelMatch = guide.level === selectedLevel;
    const topicMatch = selectedTopic === "All Topics" || guide.topic === selectedTopic;
    return levelMatch && topicMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-orange-100 text-orange-800";
      case "Expert": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
            CFA Study Guides
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Comprehensive study guides created by CFA charterholders to help you master every topic.
          </p>
          <Link href="/signup" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Access All Study Guides
          </Link>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-[#5f6368] mb-2">CFA Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="Level I">Level I</option>
                <option value="Level II">Level II</option>
                <option value="Level III">Level III</option>
              </select>
            </div>

            {/* Topic Filter */}
            <div>
              <label className="block text-sm font-medium text-[#5f6368] mb-2">Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                {topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <p className="text-gray-600">
                Showing {filteredGuides.length} study guides for {selectedLevel}
                {selectedTopic !== "All Topics" && ` - ${selectedTopic}`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Study Guides Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => (
              <div key={guide.id} className="bg-white rounded-xl border border-[#EAEEEF] hover:shadow-lg transition-shadow overflow-hidden">
                {/* Guide Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{guide.title}</h3>
                    {guide.popular && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full ml-2 flex-shrink-0">
                        Popular
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{guide.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-[#5f6368] text-xs rounded">
                      {guide.level}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-[#5f6368] text-xs rounded">
                      {guide.topic}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(guide.difficulty)}`}>
                      {guide.difficulty}
                    </span>
                  </div>

                  {/* Guide Stats */}
                  <div className="flex justify-between text-sm text-[#9aa0a6] mb-6">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {guide.pages} pages
                    </span>
                    <span>{guide.downloadSize}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                      Download PDF
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-[#5f6368] rounded-lg text-sm font-medium hover:bg-[#FBFAF4] transition-colors">
                      Preview
                    </button>
                  </div>
                </div>

                {/* Guide Footer */}
                <div className="px-6 py-3 bg-[#FBFAF4] border-t border-gray-200">
                  <p className="text-xs text-[#9aa0a6]">
                    Updated: {new Date(guide.updated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredGuides.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No study guides found</h3>
              <p className="text-gray-600">Try adjusting your filters to find more study guides.</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#13343B] mb-4">
              What Makes Our Study Guides Special?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Created by CFA charterholders with years of experience in finance and education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Authored</h3>
              <p className="text-gray-600 text-sm">Written by CFA charterholders and finance professionals</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Downloadable</h3>
              <p className="text-gray-600 text-sm">Study offline with high-quality PDF downloads</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Updated Regularly</h3>
              <p className="text-gray-600 text-sm">Content updated to reflect latest CFA curriculum</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Comprehensive</h3>
              <p className="text-gray-600 text-sm">Complete coverage of all exam topics and LOS</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Download All Study Guides?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get instant access to our complete library of CFA study guides and accelerate your preparation.
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