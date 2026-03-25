"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function FixedIncomeFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What topics are covered in Fixed Income for CFA Level 1?",
      answer: "Fixed Income covers bond valuation, yield measures, interest rate risk (duration/convexity), term structure of rates, credit analysis, securitization, and asset-backed securities."
    },
    {
      question: "How important is Fixed Income for the CFA exam?",
      answer: "Fixed Income represents 11-14% of CFA Level 1, making it one of the heaviest weighted topics alongside Ethics and FRA. Mastering fixed income is essential for passing."
    },
    {
      question: "What's the difference between duration and convexity?",
      answer: "Duration measures the linear price sensitivity to interest rate changes (first-order effect). Convexity measures the curvature - how duration itself changes with rates (second-order effect). Both are crucial for bond risk management."
    },
    {
      question: "Do I need to memorize all yield measures?",
      answer: "Yes, you should understand current yield, yield to maturity, yield to call, yield to worst, and spot rates. Know when each is appropriate and how to calculate them."
    },
    {
      question: "What's the hardest part of Fixed Income?",
      answer: "Most candidates struggle with understanding the term structure of interest rates (spot rates, forward rates), calculating effective duration for bonds with embedded options, and credit spread analysis."
    },
    {
      question: "How many Fixed Income practice questions should I do?",
      answer: "Given the topic weight and complexity, aim for 400+ practice questions. AnalystTrainer offers 500+ fixed income questions covering all subtopics with detailed calculation walkthroughs."
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
          <span className="text-[#13343B]">Fixed Income</span>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-[960px] mx-auto">
          <h1 className="text-4xl font-bold text-[#13343B] mb-4">Fixed Income FAQs</h1>
          <p className="text-xl text-[#5f6368]">Common questions about CFA Level 1 Fixed Income topic area.</p>
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
            <h2 className="text-2xl font-bold mb-4">Ready to practice Fixed Income?</h2>
            <p className="text-lg mb-6 opacity-90">Access 500+ fixed income practice questions with detailed explanations.</p>
            <Link href="/signup?plan=basic" className="inline-block bg-white text-[#1FB8CD] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Practicing Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
