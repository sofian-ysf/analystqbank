"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const generalFaqs = [
    {
      question: "What is AnalystTrainer?",
      answer: "AnalystTrainer is a comprehensive CFA Level 1 exam preparation platform with over 2,000+ practice questions, mock exams, flashcards, and formula sheets designed to help you pass the CFA exam."
    },
    {
      question: "How do I get started?",
      answer: "Try 15 free demo questions at /try-free with no signup required. When you're ready, choose between our Basic (£50) or Premium (£75) plans to access the full question bank and mock exams."
    },
    {
      question: "What's the difference between Basic and Premium plans?",
      answer: "Basic plan gives you access to 2,000 practice questions and 2 mock exams. Premium plan offers unlimited questions, unlimited mock exams, priority support, and advanced analytics."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 7-day money-back guarantee. If you're not satisfied with AnalystTrainer, contact us within 7 days for a full refund. See our refund policy for details."
    },
    {
      question: "Is the content up to date with the latest CFA curriculum?",
      answer: "Yes! Our content is regularly updated to reflect the latest CFA Institute curriculum changes. All questions follow the official CFA Level 1 exam format and topic weights."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel anytime from your account settings. Your access continues until the end of your current billing period."
    },
    {
      question: "Do you offer study plans or guidance?",
      answer: "Yes! Our platform includes recommended study plans, progress tracking, performance analytics, and topic-specific guidance to help you prepare efficiently."
    },
    {
      question: "How long do I have access to the platform?",
      answer: "Access depends on your plan. Basic and Premium plans are billed monthly. We also offer lifetime access plans for one-time payment."
    }
  ];

  const topicSpecificFaqs = [
    { name: "Alternative Investments", slug: "alternative-investments" },
    { name: "Corporate Issuers", slug: "corporate-issuers" },
    { name: "Derivatives", slug: "derivatives" },
    { name: "Economics", slug: "economics" },
    { name: "Equity Investments", slug: "equity-investments" },
    { name: "Ethical & Professional Standards", slug: "ethical-professional-standards" },
    { name: "Financial Statement Analysis", slug: "financial-statement-analysis" },
    { name: "Fixed Income", slug: "fixed-income" },
    { name: "Portfolio Management", slug: "portfolio-management" },
    { name: "Quantitative Methods", slug: "quantitative-methods" }
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
          <h1 className="text-4xl font-bold text-[#13343B] mb-4">
            CFA Level 1 FAQs
          </h1>
          <p className="text-xl text-[#5f6368] max-w-2xl mx-auto">
            Get answers to frequently asked questions about AnalystTrainer and CFA Level 1 exam preparation.
          </p>
        </div>
      </section>

      {/* General FAQs */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl font-bold text-[#13343B] mb-8 text-center">
            General Questions
          </h2>

          <div className="space-y-3">
            {generalFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-[#EAEEEF] overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#F3F3EE]/50 transition-colors"
                >
                  <span className="font-medium text-[#13343B]">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-[#5f6368] transition-transform ${openFaq === index ? "rotate-180" : ""}`}
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
        </div>
      </section>

      {/* Topic-Specific FAQs */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl font-bold text-[#13343B] mb-6 text-center">
            Topic-Specific FAQs
          </h2>
          <p className="text-center text-[#5f6368] mb-8">
            Browse FAQs by CFA Level 1 topic area:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topicSpecificFaqs.map((topic) => (
              <Link
                key={topic.slug}
                href={`/faq/${topic.slug}`}
                className="bg-white rounded-xl border border-[#EAEEEF] px-6 py-4 hover:bg-[#F3F3EE]/50 hover:border-[#1FB8CD] transition-all"
              >
                <h3 className="font-medium text-[#13343B]">{topic.name}</h3>
                <p className="text-sm text-[#5f6368] mt-1">Common questions about {topic.name.toLowerCase()}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-[800px] mx-auto bg-gradient-to-br from-[#1FB8CD] to-[#1A6872] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-lg mb-6 opacity-90">
            Try 15 free questions with no signup required, or contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/try-free"
              className="bg-white text-[#1FB8CD] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Try Free Demo
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
