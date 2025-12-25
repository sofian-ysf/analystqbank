"use client";

import Link from "next/link";
import { useState } from "react";

export default function FormulaSheets() {
  const [selectedLevel, setSelectedLevel] = useState("Level I");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [searchTerm, setSearchTerm] = useState("");

  const formulaSheets = [
    {
      id: 1,
      title: "Time Value of Money",
      level: "Level I",
      topic: "Quantitative Methods",
      formulas: 15,
      description: "Present value, future value, annuities, and perpetuities",
      downloadSize: "0.8 MB",
      popular: true
    },
    {
      id: 2,
      title: "Financial Ratios",
      level: "Level I",
      topic: "Financial Reporting",
      formulas: 28,
      description: "Liquidity, activity, leverage, profitability, and valuation ratios",
      downloadSize: "1.2 MB",
      popular: true
    },
    {
      id: 3,
      title: "Statistics and Probability",
      level: "Level I",
      topic: "Quantitative Methods",
      formulas: 22,
      description: "Descriptive statistics, probability distributions, confidence intervals",
      downloadSize: "1.0 MB",
      popular: false
    },
    {
      id: 4,
      title: "Corporate Finance",
      level: "Level I",
      topic: "Corporate Finance",
      formulas: 18,
      description: "NPV, IRR, WACC, dividend discount models",
      downloadSize: "0.9 MB",
      popular: true
    },
    {
      id: 5,
      title: "Portfolio Theory",
      level: "Level I",
      topic: "Portfolio Management",
      formulas: 12,
      description: "Expected return, variance, covariance, beta calculations",
      downloadSize: "0.7 MB",
      popular: false
    },
    {
      id: 6,
      title: "Fixed Income Valuation",
      level: "Level II",
      topic: "Fixed Income",
      formulas: 35,
      description: "Bond pricing, yield measures, duration, convexity",
      downloadSize: "1.8 MB",
      popular: true
    },
    {
      id: 7,
      title: "Equity Valuation",
      level: "Level II",
      topic: "Equity Investments",
      formulas: 42,
      description: "DDM, DCF, relative valuation, residual income",
      downloadSize: "2.1 MB",
      popular: true
    },
    {
      id: 8,
      title: "Derivatives Pricing",
      level: "Level II",
      topic: "Derivatives",
      formulas: 31,
      description: "Options pricing, futures, forwards, swaps",
      downloadSize: "1.6 MB",
      popular: false
    },
    {
      id: 9,
      title: "Portfolio Management",
      level: "Level III",
      topic: "Portfolio Management",
      formulas: 28,
      description: "Asset allocation, optimization, performance measurement",
      downloadSize: "1.5 MB",
      popular: true
    },
    {
      id: 10,
      title: "Risk Management",
      level: "Level III",
      topic: "Risk Management",
      formulas: 24,
      description: "VaR, risk budgeting, hedge ratios",
      downloadSize: "1.3 MB",
      popular: false
    }
  ];

  const topics = ["All Topics", "Quantitative Methods", "Financial Reporting", "Corporate Finance", 
                  "Portfolio Management", "Fixed Income", "Equity Investments", "Derivatives", "Risk Management"];

  const filteredSheets = formulaSheets.filter(sheet => {
    const levelMatch = sheet.level === selectedLevel;
    const topicMatch = selectedTopic === "All Topics" || sheet.topic === selectedTopic;
    const searchMatch = searchTerm === "" || 
      sheet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sheet.description.toLowerCase().includes(searchTerm.toLowerCase());
    return levelMatch && topicMatch && searchMatch;
  });

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
            CFA Formula Sheets
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Quick reference formula sheets for all CFA levels. Essential formulas organized by topic for efficient studying.
          </p>
          <Link href="/signup" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Download All Formula Sheets
          </Link>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#5f6368] mb-2">Search Formulas</label>
              <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

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
          </div>
        </div>
      </section>

      {/* Formula Sheets Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredSheets.length} formula sheets for {selectedLevel}
              {selectedTopic !== "All Topics" && ` - ${selectedTopic}`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSheets.map((sheet) => (
              <div key={sheet.id} className="bg-white rounded-xl border border-[#EAEEEF] hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{sheet.title}</h3>
                    {sheet.popular && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full ml-2">
                        Popular
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{sheet.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-gray-100 text-[#5f6368] text-xs rounded">
                      {sheet.level}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-[#5f6368] text-xs rounded">
                      {sheet.topic}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-sm text-[#9aa0a6] mb-6">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      {sheet.formulas} formulas
                    </span>
                    <span>{sheet.downloadSize}</span>
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
              </div>
            ))}
          </div>

          {filteredSheets.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No formula sheets found</h3>
              <p className="text-gray-600">Try adjusting your search or filters to find more formula sheets.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Download All Formula Sheets
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get instant access to our complete collection of CFA formula sheets for all levels.
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