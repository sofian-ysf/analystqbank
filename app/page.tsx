'use client'

import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { useState, useRef } from "react";
import Navigation from "./components/Navigation";

const testimonials = [
  { initials: "JC", name: "James C.", role: "Investment Analyst, London", quote: "The question bank mirrors the actual CFA exam remarkably well. I felt genuinely prepared walking into the testing centre." },
  { initials: "SK", name: "Sarah K.", role: "Portfolio Manager, Manchester", quote: "After struggling with other prep materials, this platform gave me the structure and confidence I needed. Passed on my first attempt." },
  { initials: "ML", name: "Michael L.", role: "Financial Analyst, Birmingham", quote: "The mock exams are exceptionally thorough. They prepared me for scenarios even more challenging than the real assessment." },
  { initials: "AP", name: "Aisha P.", role: "Risk Analyst, Leeds", quote: "The detailed explanations for each question helped me understand not just the what, but the why. Invaluable for deep learning." },
  { initials: "RB", name: "Richard B.", role: "Equity Research, Bristol", quote: "I appreciated the calm, structured approach. No pressure tactics, just quality content that speaks for itself." },
  { initials: "EH", name: "Emily H.", role: "Credit Analyst, Edinburgh", quote: "The quantitative methods section alone was worth the subscription. Complex formulas broken down beautifully." },
];

export default function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AnalystTrainer CFA Level 1 Exam Prep",
    "description": "Online platform with CFA Level 1 exam-style question banks, mock exams, and performance analytics.",
    "brand": {
      "@type": "Brand",
      "name": "AnalystTrainer"
    },
    "url": "https://www.analysttrainer.com/",
    "image": "https://www.analysttrainer.com/og-image.jpg",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "GBP",
      "lowPrice": "0",
      "highPrice": "300",
      "offerCount": "3",
      "offers": [
        {
          "@type": "Offer",
          "name": "Free Trial",
          "price": "0",
          "priceCurrency": "GBP",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Basic Plan",
          "price": "250",
          "priceCurrency": "GBP",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Premium Plan",
          "price": "300",
          "priceCurrency": "GBP",
          "availability": "https://schema.org/InStock"
        }
      ]
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How similar are your questions to the real CFA Level 1 exam?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our question bank is written to mirror the real CFA Level 1 exam blueprint, difficulty levels, and wording. Each item includes step-by-step explanations and formula references."
        }
      },
      {
        "@type": "Question",
        "name": "How can I get the most out of AnalystTrainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Complete as many practice questions as possible, take all available mock exams, and use our analytics to focus on your weakest areas. Consistent daily practice is key to success."
        }
      },
      {
        "@type": "Question",
        "name": "What does AnalystTrainer cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We focus exclusively on CFA Level 1, with comprehensive coverage of all 10 topic areas. Our content is regularly reviewed and updated to match the latest exam format."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use AnalystTrainer on my phone or tablet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our platform is fully responsive and works seamlessly on all devices. Your progress syncs automatically across desktop, tablet, and mobile."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to install any software?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No installation required. AnalystTrainer is a web-based platform that works in any modern browser. Simply sign up and start practicing immediately."
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="product-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        strategy="beforeInteractive"
      />
      <Script
        id="faq-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        strategy="beforeInteractive"
      />

      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero Section */}
        <section className="relative h-screen flex items-center bg-gradient-to-b from-[#fbfaf4] to-white px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl w-full">
            <div className="text-center">
              <div className="pill-badge mb-6">
                Trusted by finance professionals worldwide
              </div>

              <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                Pass Your CFA Level 1
                <span className="block text-gray-900">On Your First Try</span>
              </h1>

              <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600">
                A thoughtfully designed preparation experience trusted by finance professionals across the UK. Expert-crafted questions, detailed explanations, and the confidence to succeed.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/signup"
                  className="pill-btn pill-btn-primary pill-btn-lg"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="#features"
                  className="pill-btn pill-btn-secondary pill-btn-lg"
                >
                  Explore Features
                </Link>
              </div>

              <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">2,500+</div>
                  <div className="text-sm text-gray-600">Practice Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">10</div>
                  <div className="text-sm text-gray-600">Topic Areas Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">180</div>
                  <div className="text-sm text-gray-600">Questions Per Mock</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Preparation Matters */}
        <section className="bg-[#fbfaf4] px-4 py-24 sm:px-6 lg:px-8 border-y border-gray-100">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
                Why Preparation Matters
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                The CFA Level 1 exam is a significant milestone. Thoughtful preparation ensures you approach it with clarity and confidence.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="pill-card text-center">
                <div className="text-4xl font-light text-gray-900 mb-3">6 months</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Between Exam Windows</h3>
                <p className="text-gray-600 text-sm">Each exam opportunity is valuable. Our structured approach helps you make the most of your preparation time.</p>
              </div>

              <div className="pill-card text-center">
                <div className="text-4xl font-light text-gray-900 mb-3">2,500+</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Practice Questions</h3>
                <p className="text-gray-600 text-sm">Carefully curated questions aligned with the CFA curriculum, each with detailed explanations to deepen your understanding.</p>
              </div>

              <div className="pill-card text-center">
                <div className="text-4xl font-light text-gray-900 mb-3">All 10</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Topic Areas</h3>
                <p className="text-gray-600 text-sm">Complete coverage from Ethics to Portfolio Management, with questions weighted to match the actual exam blueprint.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
                A Complete Preparation Experience
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Every element designed to support your journey to CFA certification.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-3 mb-24">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#fbfaf4] flex items-center justify-center">
                  <svg className="h-7 w-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Expert-Crafted Questions</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Over 2,500 questions developed by CFA charterholders, aligned with the curriculum and accompanied by comprehensive explanations.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#fbfaf4] flex items-center justify-center">
                  <svg className="h-7 w-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Intelligent Progress Tracking</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Understand your strengths and areas for growth with detailed analytics, allowing you to focus your time where it matters most.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#fbfaf4] flex items-center justify-center">
                  <svg className="h-7 w-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Realistic Mock Exams</h3>
                <p className="text-gray-600 text-sm leading-relaxed">180-question mock exams that mirror the actual CFA Level 1 format, difficulty, and topic weighting for authentic practice.</p>
              </div>
            </div>

            {/* Testimonials */}
            <div className="border-t border-gray-100 pt-20">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">Voices from Our Community</p>
                  <h3 className="text-2xl font-semibold text-gray-900">Stories of Success</h3>
                </div>
                <div className="hidden sm:flex gap-2">
                  <button
                    onClick={() => scrollCarousel('left')}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
                    aria-label="Previous testimonials"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scrollCarousel('right')}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-colors"
                    aria-label="Next testimonials"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                ref={carouselRef}
                className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="relative flex-shrink-0 w-[340px] snap-start">
                    <div className="absolute -top-4 left-6 text-6xl text-gray-100 font-serif select-none">"</div>
                    <div className="pill-card relative h-[220px] flex flex-col">
                      <p className="text-gray-700 leading-relaxed text-sm flex-grow">{testimonial.quote}</p>
                      <div className="flex items-center pt-4 border-t border-gray-100 mt-4">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-medium text-sm">{testimonial.initials}</div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-900 text-sm">{testimonial.name}</p>
                          <p className="text-gray-500 text-xs">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-2 mt-6 sm:hidden">
                <button
                  onClick={() => scrollCarousel('left')}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600"
                  aria-label="Previous testimonials"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollCarousel('right')}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600"
                  aria-label="Next testimonials"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-4 py-24 sm:px-6 lg:px-8 bg-[#fbfaf4]">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">Pricing</p>
              <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
                Choose Your Plan
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Start with a free trial. Upgrade when you're ready.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Free Trial */}
              <div className="pill-card">
                <div className="text-center pb-6 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Free Trial</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-light text-gray-900">Free</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">24-hour access</p>
                </div>

                <div className="py-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">100 practice questions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">1 mock exam</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Basic analytics</span>
                  </div>
                </div>

                <Link
                  href="/signup?plan=trial"
                  className="block w-full text-center pill-btn pill-btn-secondary"
                >
                  Start Free Trial
                </Link>
              </div>

              {/* Basic - Popular */}
              <div className="pill-card relative border-2 border-gray-900">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
                <div className="text-center pb-6 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Basic</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-light text-gray-900">£250</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Lifetime access</p>
                </div>

                <div className="py-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">2,000 practice questions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">5 mock exams</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Performance analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Lifetime access</span>
                  </div>
                </div>

                <Link
                  href="/signup?plan=basic"
                  className="block w-full text-center pill-btn pill-btn-primary"
                >
                  Get Started
                </Link>
              </div>

              {/* Premium */}
              <div className="pill-card">
                <div className="text-center pb-6 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Premium</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-light text-gray-900">£300</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Lifetime access</p>
                </div>

                <div className="py-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Full question bank access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Unlimited mock exams</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Direct CFA analyst support</span>
                  </div>
                </div>

                <Link
                  href="/signup?plan=premium"
                  className="block w-full text-center pill-btn pill-btn-secondary"
                >
                  Get Started
                </Link>
              </div>
            </div>

            <p className="mt-8 text-center text-xs text-gray-400">
              Secure payment via Stripe. All cards accepted.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              <details className="group rounded-2xl border border-gray-200 bg-white p-6">
                <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-900">
                  How similar are your questions to the real CFA Level 1 exam?
                  <svg className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  Our question bank is written to mirror the real CFA Level 1 exam blueprint, difficulty levels, and wording. Each item includes step-by-step explanations and formula references. Many candidates report our questions are slightly harder than the real exam, which helps them feel more prepared.
                </p>
              </details>

              <details className="group rounded-2xl border border-gray-200 bg-white p-6">
                <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-900">
                  How can I get the most out of AnalystTrainer?
                  <svg className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  Complete as many practice questions as possible, take all available mock exams, and use our analytics to focus on your weakest areas. Consistent daily practice is key to success.
                </p>
              </details>

              <details className="group rounded-2xl border border-gray-200 bg-white p-6">
                <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-900">
                  What does AnalystTrainer cover?
                  <svg className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  We focus exclusively on CFA Level 1, with comprehensive coverage of all 10 topic areas: Ethical and Professional Standards, Quantitative Methods, Economics, Financial Statement Analysis, Corporate Issuers, Equity Investments, Fixed Income, Derivatives, Alternative Investments, and Portfolio Management.
                </p>
              </details>

              <details className="group rounded-2xl border border-gray-200 bg-white p-6">
                <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-900">
                  Can I use AnalystTrainer on my phone or tablet?
                  <svg className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  Yes! Our platform is fully responsive and works seamlessly on all devices. Your progress syncs automatically across desktop, tablet, and mobile so you can study anywhere.
                </p>
              </details>

              <details className="group rounded-2xl border border-gray-200 bg-white p-6">
                <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-900">
                  Do I need to install any software?
                  <svg className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  No installation required. AnalystTrainer is a web-based platform that works in any modern browser. Simply sign up and start practicing immediately.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-[#fbfaf4] px-4 py-24 sm:px-6 lg:px-8 border-t border-gray-100">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
              Start Today
            </p>
            <h2 className="mb-6 text-3xl font-semibold text-gray-900 sm:text-4xl">
              Begin Your CFA Level 1 Journey
            </h2>
            <p className="mb-10 text-lg text-gray-600 max-w-2xl mx-auto">
              Start your preparation today. Thoughtful practice, detailed explanations, and the confidence to succeed on exam day.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/signup"
                className="pill-btn pill-btn-primary pill-btn-lg"
              >
                Start Free Trial
              </Link>
              <Link
                href="#pricing"
                className="pill-btn pill-btn-secondary pill-btn-lg"
              >
                View Pricing
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>2,500+ Practice Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Lifetime Access</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Instant Access</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <Link href="/">
                  <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
                </Link>
                <p className="mt-4 text-sm text-gray-600">
                  The leading platform for CFA Level 1 exam preparation.
                </p>
              </div>

              <div>
                <h4 className="mb-4 font-semibold text-gray-900">Product</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#features" className="hover:text-gray-900">Features</a></li>
                  <li><a href="#pricing" className="hover:text-gray-900">Pricing</a></li>
                  <li><Link href="/question-bank" className="hover:text-gray-900">Question Bank</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-semibold text-gray-900">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link href="/blog" className="hover:text-gray-900">Blog</Link></li>
                  <li><Link href="/help" className="hover:text-gray-900">Help Center</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-semibold text-gray-900">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-gray-900">Terms of Service</Link></li>
                  <li><Link href="/refund" className="hover:text-gray-900">Refund Policy</Link></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
              <p>© 2026 AnalystTrainer. All rights reserved.</p>
              <p className="mt-2">Not affiliated with or endorsed by the CFA Institute.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
