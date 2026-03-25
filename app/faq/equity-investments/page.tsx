"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function EquityInvestmentsFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What does Equity Investments cover in CFA Level 1?",
      answer: "Equity Investments covers market organization and structure, security market indices, market efficiency, equity valuation models (DDM, free cash flow), and industry/company analysis frameworks."
    },
    {
      question: "How important is Equity Investments for the CFA exam?",
      answer: "Equity Investments represents 10-12% of the CFA Level 1 exam, making it one of the more heavily weighted topics. It's fundamental to the CFA charter and builds on FRA knowledge."
    },
    {
      question: "What equity valuation models do I need to know?",
      answer: "Key models include dividend discount models (Gordon growth, multi-stage), free cash flow to equity (FCFE), free cash flow to firm (FCFF), and price multiples (P/E, P/B, P/S, EV/EBITDA)."
    },
    {
      question: "Is market efficiency theory still tested?",
      answer: "Yes! Understanding weak, semi-strong, and strong form efficiency is crucial. You'll need to know how market anomalies, behavioral biases, and different information types affect price discovery."
    },
    {
      question: "What's the hardest part of Equity Investments?",
      answer: "Most candidates struggle with multi-stage dividend discount models, understanding the relationships between valuation multiples, and applying Porter's Five Forces to industry analysis."
    },
    {
      question: "How many practice questions should I do for Equity?",
      answer: "AnalystTrainer recommends completing at least 300+ equity practice questions given the topic's weight and complexity. Our platform offers 400+ questions with detailed explanations."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/">
              <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#product" className="text-[#5f6368] hover:text-[#13343B] transition-colors">Features</Link>
              <Link href="/pricing" className="text-[#5f6368] hover:text-[#13343B] transition-colors">Pricing</Link>
              <Link href="/blog" className="text-[#5f6368] hover:text-[#13343B] transition-colors">Blog</Link>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-[#5f6368] hover:text-[#13343B] transition-colors">Login</Link>
              <Link href="/signup?plan=basic" className="bg-[#1FB8CD] text-white px-5 py-2 rounded-lg hover:bg-[#1A6872] transition-all font-medium">Get Started</Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-[#5f6368]">
          <Link href="/faq" className="hover:text-[#1FB8CD]">FAQs</Link>
          <span>/</span>
          <span className="text-[#13343B]">Equity Investments</span>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-[960px] mx-auto">
          <h1 className="text-4xl font-bold text-[#13343B] mb-4">Equity Investments FAQs</h1>
          <p className="text-xl text-[#5f6368]">Common questions about CFA Level 1 Equity Investments topic area.</p>
        </div>
      </section>

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
                  <svg className={`w-5 h-5 text-[#5f6368] flex-shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && <div className="px-6 pb-4 text-[#5f6368]">{faq.answer}</div>}
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-[#1FB8CD] to-[#1A6872] rounded-2xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to practice Equity Investments?</h2>
            <p className="text-lg mb-6 opacity-90">Access 400+ equity practice questions with detailed explanations.</p>
            <Link href="/signup?plan=basic" className="inline-block bg-white text-[#1FB8CD] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Practicing Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
