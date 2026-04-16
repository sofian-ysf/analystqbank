"use client";

import Link from "next/link";
import Image from "next/image";
import { Check } from "@phosphor-icons/react";
import FloatingGetStartedButton from "../../components/FloatingGetStartedButton";

export default function CFAVsFRM() {
  const comparisonData = [
    {
      category: "Focus",
      cfa: "Broad investment management and analysis",
      frm: "Financial risk management and derivatives"
    },
    {
      category: "Career Path",
      cfa: "Portfolio management, equity research, investment banking",
      frm: "Risk management, derivatives trading, regulatory compliance"
    },
    {
      category: "Levels",
      cfa: "3 levels (takes 2.5-4 years)",
      frm: "2 levels (can complete in 1 year)"
    },
    {
      category: "Time Commitment",
      cfa: "300+ hours per level (900+ total)",
      frm: "240-300 hours per level (480-600 total)"
    },
    {
      category: "Cost",
      cfa: "£1,500-2,500 total (exam fees + materials)",
      frm: "£1,200-1,800 total (exam fees + materials)"
    },
    {
      category: "Exam Format",
      cfa: "Multiple choice (L1), constructed response (L2, L3)",
      frm: "Multiple choice (both levels)"
    },
    {
      category: "Topics Covered",
      cfa: "Ethics, Economics, FRA, Equity, Fixed Income, Derivatives, Alternatives, Portfolio Management, Quant",
      frm: "Market Risk, Credit Risk, Operational Risk, Valuation Models, Quantitative Analysis, Regulations"
    },
    {
      category: "Global Recognition",
      cfa: "Gold standard for investment management worldwide",
      frm: "Standard for risk management professionals"
    },
  ];

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
              <Link href="/pricing" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Pricing
              </Link>
              <Link href="/blog" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Blog
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Login
              </Link>
              <Link href="/signup?plan=basic" className="bg-[#1FB8CD] text-white px-5 py-2 rounded-lg hover:bg-[#1A6872] transition-all font-medium">
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-[960px] mx-auto text-center">
          <h1 className="text-4xl font-bold text-[#13343B] mb-4">
            CFA vs FRM: Which Certification is Right for You?
          </h1>
          <p className="text-xl text-[#5f6368] max-w-2xl mx-auto">
            Compare the CFA (Chartered Financial Analyst) and FRM (Financial Risk Manager) certifications to choose the best path for your career
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-[960px] mx-auto">
          <div className="bg-white rounded-xl border border-[#EAEEEF] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F3F3EE]">
                    <th className="px-6 py-4 text-left font-bold text-[#13343B]">Aspect</th>
                    <th className="px-6 py-4 text-left font-bold text-[#1FB8CD]">CFA</th>
                    <th className="px-6 py-4 text-left font-bold text-[#13343B]">FRM</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-t border-[#EAEEEF]">
                      <td className="px-6 py-4 font-medium text-[#13343B]">{row.category}</td>
                      <td className="px-6 py-4 text-[#5f6368]">{row.cfa}</td>
                      <td className="px-6 py-4 text-[#5f6368]">{row.frm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Which to Choose */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-[960px] mx-auto grid md:grid-cols-2 gap-8">
          {/* Choose CFA If */}
          <div className="bg-white rounded-xl border border-[#EAEEEF] p-8">
            <h2 className="text-2xl font-bold text-[#1FB8CD] mb-4">Choose CFA If:</h2>
            <ul className="space-y-3 text-[#5f6368]">
              <li className="flex items-start">
                <Check size={16} weight="bold" className="text-[#1FB8CD] mr-2 flex-shrink-0" />
                You want to become a portfolio manager or investment analyst
              </li>
              <li className="flex items-start">
                <Check size={16} weight="bold" className="text-[#1FB8CD] mr-2 flex-shrink-0" />
                You're interested in broad investment topics (equity, fixed income, alternatives)
              </li>
              <li className="flex items-start">
                <Check size={16} weight="bold" className="text-[#1FB8CD] mr-2 flex-shrink-0" />
                You want the most globally recognized finance certification
              </li>
              <li className="flex items-start">
                <Check size={16} weight="bold" className="text-[#1FB8CD] mr-2 flex-shrink-0" />
                You're committed to a multi-year study program
              </li>
              <li className="flex items-start">
                <Check size={16} weight="bold" className="text-[#1FB8CD] mr-2 flex-shrink-0" />
                Ethics and professional standards are important to your career
              </li>
            </ul>
          </div>

          {/* Choose FRM If */}
          <div className="bg-white rounded-xl border border-[#EAEEEF] p-8">
            <h2 className="text-2xl font-bold text-[#13343B] mb-4">Choose FRM If:</h2>
            <ul className="space-y-3 text-[#5f6368]">
              <li className="flex items-start">
                <Check size={16} weight="bold" className="text-[#13343B] mr-2 flex-shrink-0" />
                You want to specialize in risk management
              </li>
              <li className="flex items-start">
                <Check size={16} weight="bold" className="text-[#13343B] mr-2 flex-shrink-0" />
                You're interested in derivatives, hedging, and quantitative methods
              </li>
              <li className="flex items-start">
                <Check size={16} weight="bold" className="text-[#13343B] mr-2 flex-shrink-0" />
                You want a faster certification (1 year vs 2.5-4 years)
              </li>
              <li className="flex items-start">
                <Check size={16} weight="bold" className="text-[#13343B] mr-2 flex-shrink-0" />
                You work or want to work in banking risk departments
              </li>
              <li className="flex items-start">
                <Check size={16} weight="bold" className="text-[#13343B] mr-2 flex-shrink-0" />
                Regulatory compliance and operational risk interest you
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl font-bold text-[#13343B] mb-6 text-center">Common Questions</h2>

          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-[#EAEEEF] p-6">
              <h3 className="font-bold text-[#13343B] mb-2">Can I do both CFA and FRM?</h3>
              <p className="text-[#5f6368]">
                Yes! Many professionals pursue both certifications. The FRM can be completed faster and complements CFA's broader investment focus. Some candidates do FRM first, then pursue CFA, or vice versa.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#EAEEEF] p-6">
              <h3 className="font-bold text-[#13343B] mb-2">Which is harder, CFA or FRM?</h3>
              <p className="text-[#5f6368]">
                CFA is generally considered more challenging due to its breadth (10 topics), length (3 levels), and lower pass rates (historically 40-45%). FRM is more focused but highly quantitative. Both require significant dedication.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-[#EAEEEF] p-6">
              <h3 className="font-bold text-[#13343B] mb-2">Which has better career prospects?</h3>
              <p className="text-[#5f6368]">
                It depends on your career goals. CFA opens doors to portfolio management, equity research, and broader investment roles. FRM is essential for risk management positions in banks and financial institutions. CFA has broader global recognition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-[800px] mx-auto bg-gradient-to-br from-[#1FB8CD] to-[#1A6872] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to start your CFA journey?</h2>
          <p className="text-lg mb-6 opacity-90">
            Try 15 free demo questions or access our full CFA Level 1 question bank.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/try-free"
              className="bg-white text-[#1FB8CD] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Try Free Demo
            </Link>
            <Link
              href="/signup?plan=basic"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <FloatingGetStartedButton />
    </div>
  );
}
