"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function EthicalProfessionalStandardsFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "Why is Ethics such a large part of the CFA exam?",
      answer: "Ethics & Professional Standards represents 15-20% of CFA Level 1, the largest single topic weight. The CFA Institute prioritizes ethical conduct as fundamental to the investment profession and public trust."
    },
    {
      question: "What's the difference between the Code and the Standards?",
      answer: "The Code of Ethics provides general principles for ethical behavior. The Standards of Professional Conduct are specific rules with detailed guidance. Both must be followed by CFA members and candidates."
    },
    {
      question: "Do I need to memorize all the Standards?",
      answer: "You need to understand and apply all seven Standards and their subsections. Focus on understanding the principles and being able to identify violations in scenario-based questions."
    },
    {
      question: "What are the most commonly tested Standards?",
      answer: "Standards I (Professionalism), II (Integrity of Capital Markets), III (Duties to Clients), and IV (Duties to Employers) appear most frequently. Conflicts of interest and material nonpublic information are heavily tested."
    },
    {
      question: "How should I study for Ethics?",
      answer: "Read the Standards of Practice Handbook thoroughly, then practice with case studies. AnalystTrainer offers 300+ ethics questions with real-world scenarios to test your understanding."
    },
    {
      question: "Can strong Ethics performance help my overall exam score?",
      answer: "Yes! CFA Institute has indicated that borderline candidates with strong Ethics scores may receive favorable consideration. It's worth investing extra study time in this topic."
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
          <span className="text-[#13343B]">Ethical & Professional Standards</span>
        </div>
      </div>

      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-[960px] mx-auto">
          <h1 className="text-4xl font-bold text-[#13343B] mb-4">Ethical & Professional Standards FAQs</h1>
          <p className="text-xl text-[#5f6368]">Common questions about CFA Level 1 Ethics topic area.</p>
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
            <h2 className="text-2xl font-bold mb-4">Ready to master Ethics?</h2>
            <p className="text-lg mb-6 opacity-90">Access 300+ ethics scenario questions with detailed explanations.</p>
            <Link href="/signup?plan=basic" className="inline-block bg-white text-[#1FB8CD] px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Start Practicing Now
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
