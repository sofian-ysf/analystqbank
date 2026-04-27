"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function AlternativeInvestmentsFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What alternative investment topics are covered in CFA Level 1?",
      answer: "CFA Level 1 covers hedge funds, private equity, real estate, infrastructure, natural resources, and digital assets. You'll learn about their characteristics, valuation methods, and role in portfolios."
    },
    {
      question: "How much of the CFA exam focuses on Alternative Investments?",
      answer: "Alternative Investments represents 5-8% of the CFA Level 1 exam, making it one of the smaller topic areas but still important for comprehensive coverage."
    },
    {
      question: "What are the main types of alternative investments I need to know?",
      answer: "Key categories include: hedge funds (various strategies), private equity (venture capital, buyouts), real estate (direct and indirect), infrastructure, commodities, and digital assets like cryptocurrencies."
    },
    {
      question: "How do I practice Alternative Investments questions?",
      answer: "AnalystTrainer offers 100+ practice questions specifically on alternative investments, covering all subtopics with detailed explanations. Our mock exams also include questions weighted according to CFA Institute guidelines."
    },
    {
      question: "What's the hardest part of Alternative Investments for most candidates?",
      answer: "Most candidates find hedge fund strategies and performance measurement (hurdle rates, high-water marks) challenging. Understanding private equity valuation methods and fee structures also requires careful study."
    },
    {
      question: "Are there formulas I need to memorize for Alternative Investments?",
      answer: "Yes! Key formulas include net asset value calculations, partnership fee structures (management fees, carried interest), real estate valuation metrics (cap rates, NOI), and various return calculations."
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': { '@type': 'Answer', 'text': faq.answer }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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

      {/* Breadcrumb */}
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-[#5f6368]">
          <Link href="/faq" className="hover:text-[#1FB8CD]">FAQs</Link>
          <span>/</span>
          <span className="text-[#13343B]">Alternative Investments</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-[960px] mx-auto">
          <h1 className="text-4xl font-bold text-[#13343B] mb-4">
            Alternative Investments FAQs
          </h1>
          <p className="text-xl text-[#5f6368]">
            Common questions about CFA Level 1 Alternative Investments topic area.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-[800px] mx-auto">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-[#EAEEEF] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#F3F3EE]/50 transition-colors"
                >
                  <span className="font-medium text-[#13343B]">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-[#5f6368] flex-shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-[#5f6368]">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Practice CTA */}
          <div className="mt-12 bg-gradient-to-br from-[#1FB8CD] to-[#1A6872] rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to practice Alternative Investments?</h2>
            <p className="text-lg mb-6 opacity-90">
              Access 100+ practice questions on alternative investments with detailed explanations.
            </p>
            <Link
              href="/signup?plan=basic"
              className="inline-block bg-white text-[#1FB8CD] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start Practicing Now
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
