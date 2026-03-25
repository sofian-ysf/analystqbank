"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CorporateIssuersFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What does Corporate Issuers cover in CFA Level 1?",
      answer: "Corporate Issuers covers corporate governance, stakeholder management, business models, capital investments, working capital management, and capital structure decisions."
    },
    {
      question: "How important is Corporate Issuers for the CFA exam?",
      answer: "Corporate Issuers represents 8-12% of the CFA Level 1 exam. It's a mid-weight topic that connects to financial statement analysis and provides context for equity investments."
    },
    {
      question: "What's the difference between stakeholders and shareholders?",
      answer: "Shareholders own equity in the company, while stakeholders include all parties affected by the company's actions (employees, customers, suppliers, community, environment, plus shareholders)."
    },
    {
      question: "Do I need to memorize corporate governance models?",
      answer: "Yes, you should understand different governance systems (one-tier vs two-tier boards), stakeholder vs shareholder models, and the role of board committees in oversight."
    },
    {
      question: "What calculations are important for Corporate Issuers?",
      answer: "Key calculations include NPV and IRR for capital budgeting, working capital metrics (operating cycle, cash conversion cycle), and basic leverage ratios for capital structure analysis."
    },
    {
      question: "How do I practice Corporate Issuers effectively?",
      answer: "AnalystTrainer offers 200+ practice questions on corporate issuers, covering governance scenarios, capital budgeting calculations, and working capital management with step-by-step solutions."
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
          <span className="text-[#13343B]">Corporate Issuers</span>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-[960px] mx-auto">
          <h1 className="text-4xl font-bold text-[#13343B] mb-4">Corporate Issuers FAQs</h1>
          <p className="text-xl text-[#5f6368]">Common questions about CFA Level 1 Corporate Issuers topic area.</p>
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
            <h2 className="text-2xl font-bold mb-4">Ready to practice Corporate Issuers?</h2>
            <p className="text-lg mb-6 opacity-90">Access 200+ practice questions on corporate issuers with detailed explanations.</p>
            <Link href="/signup?plan=basic" className="inline-block bg-white text-[#1FB8CD] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Practicing Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
