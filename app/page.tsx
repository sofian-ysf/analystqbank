'use client'

import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import ScrollReveal from "./components/ScrollReveal";
import { PassGuaranteeFull } from "@/components/PassGuarantee";
import DemoQuestion from "@/components/DemoQuestion";
import PromoBanner from "@/components/PromoBanner";
import FloatingGetStartedButton from "./components/FloatingGetStartedButton";

const testimonials = [
  { initials: "OL", name: "Oluwaseun L.", role: "Final Year, University of Lagos", quote: "Sorted my exam prep in no time. Questions are exactly what you need to practice." },
  { initials: "MW", name: "Marcus W.", role: "Second Year, University of Dundee", quote: "Dead good. Helped me loads during summer revision." },
  { initials: "SK", name: "Sophie K.", role: "Masters, University of Exeter", quote: "Way better than the expensive books. Makes actual sense." },
  { initials: "YT", name: "Yuki T.", role: "Second Year, University of Toronto", quote: "Brilliant question bank. The explanations actually make sense unlike some of the textbooks." },
  { initials: "NM", name: "Nia M.", role: "Final Year, University of Cape Town", quote: "Really helped with my exam prep. Good value for a student budget." },
  { initials: "JR", name: "James R.", role: "Second Year, University of Lincoln", quote: "The mock exams are spot on. Felt fully prepared on the day." },
];

export default function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (userInteracted) return;

    let index = 0;
    const sequence = [2, 0, null, 2, 0, null];
    const delays = [2500, 5000, 4000, 2500, 5000, 4000];

    const runSequence = () => {
      if (userInteracted) return;
      setSelectedOption(sequence[index]);
      index = (index + 1) % sequence.length;
      setTimeout(runSequence, delays[index]);
    };

    setTimeout(runSequence, 1000);
  }, [userInteracted]);

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
      "highPrice": "75",
      "offerCount": "2",
      "offers": [
        {
          "@type": "Offer",
          "name": "Basic Plan",
          "price": "50",
          "priceCurrency": "GBP",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Premium Plan",
          "price": "75",
          "priceCurrency": "GBP",
          "availability": "https://schema.org/InStock"
        }
      ]
    }
  };

  // Review Schema for testimonials
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AnalystTrainer CFA Level 1 Exam Prep",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500"
    },
    "review": testimonials.map(t => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      },
      "reviewBody": t.quote
    }))
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
      <Script
        id="review-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        strategy="beforeInteractive"
      />

      <main className="min-h-screen bg-white">
        <PromoBanner />
        <Navigation />

        {/* Hero Section */}
        <section className="hero-section relative pt-24 pb-16 sm:pt-32 sm:pb-24 bg-gradient-to-b from-[#fbfaf4] to-white px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Text Content */}
              <div className="text-center lg:text-left">
                <div className="pill-badge mb-6 inline-block">
                  Trusted by finance professionals worldwide
                </div>

                <h1 className="mb-6 text-4xl font-normal tracking-tight text-gray-900 sm:text-5xl lg:text-6xl hover-target">
                  Pass <span className="inline-block transition-transform duration-300"><span className="underline decoration-3 decoration-gray-900 underline-offset-4">CFA Level 1</span></span> <span className="inline-block transition-transform duration-300"><span className="underline decoration-3 decoration-gray-900 underline-offset-4">First Time</span></span> — <em>2,500+ Questions</em> by Charterholders
                </h1>

                <p className="mb-8 max-w-xl text-lg text-gray-600 mx-auto lg:mx-0">
                  Start with our <Link href="/try-free" className="text-[#1FB8CD] hover:underline font-medium">free CFA Level 1 practice questions</Link> with detailed explanations. Join thousands of candidates who passed using AnalystTrainer.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start mb-10">
                  <Link
                    href="/signup?plan=6month"
                    className="pill-btn pill-btn-primary pill-btn-lg"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/try-free"
                    className="pill-btn pill-btn-secondary pill-btn-lg"
                  >
                    Take Demo
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-medium text-gray-900">4.8/5</div>
                    <div className="flex justify-center lg:justify-start mt-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-3 w-3 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="text-xs text-gray-600">User Rating</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-medium text-gray-900">2,500+</div>
                    <div className="text-xs text-gray-600">Questions</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-medium text-gray-900">10</div>
                    <div className="text-xs text-gray-600">Topic Areas</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-medium text-gray-900">Lifetime</div>
                    <div className="text-xs text-gray-600">Access</div>
                  </div>
                </div>
              </div>

              {/* Right: Interactive Demo Question */}
              <div className="lg:pl-8">
                <DemoQuestion />
              </div>
            </div>
          </div>
        </section>

        {/* Results Stats Section */}
        <section className="px-4 py-16 sm:px-6 lg:px-8 bg-[#13343B]">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-10">
              <p className="text-[#1FB8CD] text-sm uppercase tracking-widest mb-2">Proven Results</p>
              <h2 className="text-2xl md:text-3xl font-medium text-white">
                Candidates See Real Improvement
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-medium text-[#1FB8CD] mb-2">89%</div>
                <div className="text-gray-300 text-sm">of users report feeling more prepared</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-medium text-[#1FB8CD] mb-2">+27%</div>
                <div className="text-gray-300 text-sm">average mock exam score improvement</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-medium text-[#1FB8CD] mb-2">100%</div>
                <div className="text-gray-300 text-sm">checked by Charterholders</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-medium text-[#1FB8CD] mb-2">4.8</div>
                <div className="text-gray-300 text-sm">average user rating out of 5</div>
              </div>
            </div>
            <p className="text-center text-white/60 text-xs mt-8">
              Based on self-reported user data and feedback surveys. Individual results may vary.
            </p>
          </div>
        </section>

        {/* App Screenshots Section */}
        <section className="px-4 py-24 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#fbfaf4]">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="text-center mb-16">
                <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">See It In Action</p>
                <h2 className="text-3xl font-medium text-gray-900 sm:text-4xl">
                  A Platform Built for Success
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                  Experience an intuitive, distraction-free environment designed to maximise your study efficiency.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="flex flex-col items-center">
                {/* Video-style demo - light mode */}
                <div className="relative w-full max-w-2xl">
                  <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-xl">
                    {/* Question */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-[#1FB8CD]/10 text-[#1FB8CD] text-xs rounded font-medium">Ethics</span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">Q.42</span>
                      </div>
                      <p className="text-gray-900 text-lg leading-relaxed">
                        A CFA Charterholder discovers their firm is about to recommend a stock they own personally. According to the Code of Ethics, what is the <span className="text-[#1FB8CD] font-medium">required action</span> before proceeding?
                      </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3 mb-6">
                      {['A. Disclose the conflict to compliance', 'B. Sell the personal position immediately', 'C. Obtain client approval to proceed', 'D. Inform the regulator'].map((opt, i) => (
                        <div
                          key={i}
                          onClick={() => { setSelectedOption(i); setUserInteracted(true); }}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                            selectedOption === i
                              ? i === 0
                                ? 'border-green-500 bg-green-50'
                                : 'border-red-500 bg-red-50'
                              : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${
                            selectedOption === i
                              ? i === 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                              : 'bg-gray-200 text-gray-600'
                          }`}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className={selectedOption === i ? (i === 0 ? 'text-green-700' : 'text-red-700') : 'text-gray-700'}>{opt}</span>
                          {selectedOption === i && i === 0 && (
                            <svg className="w-5 h-5 text-green-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                          {selectedOption === i && i !== 0 && (
                            <svg className="w-5 h-5 text-red-500 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Answer reveal */}
                    {selectedOption === 0 && (
                      <div className="rounded-xl bg-green-50 border-2 border-green-500 p-4 animate-fadeIn">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-green-700 font-medium">Correct!</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          <strong className="text-gray-900">Answer: A — Disclose the conflict to compliance</strong><br/><br/>
                          Under <strong>Standard VI(A) Conflicts of Interest</strong>, when a member discovers a potential conflict — such as owning a personal position in a stock about to be recommended — they must <strong>disclose the conflict in writing to their employer</strong> and obtain written consent before proceeding with the recommendation. This ensures the employer can review and manage the conflict appropriately. Simply selling the position (B) doesn't satisfy the requirement to disclose. The conflict disclosure must happen before any recommendation is made.
                        </p>
                      </div>
                    )}
                    {selectedOption === 1 && (
                      <div className="rounded-xl bg-red-50 border-2 border-red-500 p-4 animate-fadeIn">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-red-700 font-medium">Incorrect</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          <strong className="text-gray-900">Answer: B is not correct.</strong> Selling the personal position might appear to resolve the conflict, but it doesn't satisfy the ethical obligation under <strong>Standard VI(A)</strong>. The member must <strong>disclose the conflict in writing to their employer</strong> before proceeding with any recommendation. Selling without disclosure could be seen as front-running or concealing a conflict. The requirement is disclosure and written approval — not simply liquidating the position.
                        </p>
                      </div>
                    )}
                    {selectedOption === 2 && (
                      <div className="rounded-xl bg-red-50 border-2 border-red-500 p-4 animate-fadeIn">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-red-700 font-medium">Incorrect</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          <strong className="text-gray-900">Answer: C is not correct.</strong> While client approval is valuable in some contexts, <strong>Standard VI(A)</strong> specifically requires disclosure to your <strong>employer</strong> — not the client — when a personal conflict exists. The member must inform their firm so compliance can review and approve the recommendation. Client approval is not the primary mechanism for managing employer-level conflicts of interest under the Standards.
                        </p>
                      </div>
                    )}
                    {selectedOption === 3 && (
                      <div className="rounded-xl bg-red-50 border-2 border-red-500 p-4 animate-fadeIn">
                        <div className="flex items-center gap-2 mb-2">
                          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-red-700 font-medium">Incorrect</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          <strong className="text-gray-900">Answer: D is not correct.</strong> Informing the regulator is not the required first step. Under <strong>Standard VI(A)</strong>, the member must first <strong>disclose the conflict to their employer</strong> and obtain written consent. Regulators are not the appropriate first contact for internal conflict resolution. Only after employer disclosure and approval should the member consider whether additional reporting obligations apply.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Video indicator */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-lg">
                    <div className="w-3 h-3 rounded-full bg-[#1FB8CD] relative">
                      <span className="absolute inset-0 rounded-full bg-[#1FB8CD] animate-ping opacity-75"></span>
                    </div>
                    <span className="text-gray-700 text-sm font-medium">Interactive Demo</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Feature highlights below screenshot */}
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <ScrollReveal delay={400} direction="up">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white shadow-md flex items-center justify-center">
                    <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Clear Explanations</h3>
                  <p className="text-gray-600 text-sm">Every question includes detailed rationales to deepen your understanding.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={500} direction="up">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white shadow-md flex items-center justify-center">
                    <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Instant Feedback</h3>
                  <p className="text-gray-600 text-sm">Know immediately whether you're on the right track with real-time results.</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={600} direction="up">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white shadow-md flex items-center justify-center">
                    <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Customisable Practice</h3>
                  <p className="text-gray-600 text-sm">Filter by topic, difficulty, or focus on your weakest areas.</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* FREE Flashcards Section */}
        <section className="px-4 py-24 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-[#fbfaf4] border-y border-green-100">
          <div className="mx-auto max-w-7xl">
            <ScrollReveal>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100% FREE — No Credit Card Required
                </div>
                <h2 className="text-3xl font-medium text-gray-900 sm:text-4xl mb-4">
                  Master CFA Concepts with Free Flashcards
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                  Over 1,600 flashcards covering all 10 CFA Level 1 topics. Use our spaced repetition system to retain key concepts and formulas — completely free.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid gap-6 md:grid-cols-3 mb-12">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-green-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">1,600+ Flashcards</h3>
                  <p className="text-gray-600 text-sm">Comprehensive coverage of all CFA Level 1 topics, from Ethics to Portfolio Management.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-blue-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Spaced Repetition</h3>
                  <p className="text-gray-600 text-sm">Our SM-2 algorithm schedules reviews at optimal intervals to maximise long-term retention.</p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-purple-50 flex items-center justify-center">
                    <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Track Progress</h3>
                  <p className="text-gray-600 text-sm">See your mastery percentage for each topic and maintain your study streak.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <div className="text-center">
                <Link
                  href="/flashcards"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors text-lg shadow-lg shadow-green-200"
                >
                  Start Studying Free
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <p className="mt-4 text-sm text-gray-500">
                  Create a free account to track your progress and unlock spaced repetition
                </p>
              </div>
            </ScrollReveal>

            {/* Upsell hint */}
            <ScrollReveal delay={500}>
              <div className="mt-16 pt-12 border-t border-gray-100">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[#13343B] flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900 mb-1">Ready to test yourself?</p>
                    <p className="text-gray-600 text-sm max-w-md">
                      Once you've mastered the concepts, put your knowledge to the test with our <Link href="/cfa-level-1-practice-questions" className="text-[#1FB8CD] hover:underline font-medium">free CFA Level 1 sample questions</Link> featuring 2,500+ practice questions with detailed explanations.
                    </p>
                  </div>
                  <Link
                    href="/cfa-level-1-practice-questions"
                    className="flex-shrink-0 px-6 py-3 bg-[#13343B] text-white rounded-full font-medium hover:bg-[#13343B]/90 transition-colors"
                  >
                    Explore Question Bank
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Why Preparation Matters */}
        <section className="bg-[#fbfaf4] px-4 py-24 sm:px-6 lg:px-8 border-y border-gray-100">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-medium text-gray-900 sm:text-4xl">
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

            {/* CTA */}
            <div className="mt-12 text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="pill-btn pill-btn-primary pill-btn-lg"
                >
                  Start Your Prep
                </Link>
                <Link
                  href="/try-free"
                  className="pill-btn pill-btn-secondary pill-btn-lg"
                >
                  Take Demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-medium text-gray-900 sm:text-4xl">
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
                <p className="text-gray-600 text-sm leading-relaxed">Take our <Link href="/cfa-level-1-mock-exam" className="text-[#1FB8CD] hover:underline font-medium">free CFA Level 1 mock exam</Link> with 180 questions that mirror the actual exam format, difficulty, and topic weighting for authentic practice.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-16 text-center">
              <p className="text-gray-600 mb-6">See how our questions and explanations help you learn</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/try-free"
                  className="pill-btn pill-btn-primary pill-btn-lg"
                >
                  Take Demo
                </Link>
                <Link
                  href="/signup"
                  className="pill-btn pill-btn-secondary pill-btn-lg"
                >
                  Start Your Prep
                </Link>
              </div>
            </div>

            {/* Testimonials */}
            <div className="border-t border-gray-100 pt-20">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500 mb-3">Voices from Our Community</p>
                  <h2 className="text-2xl font-medium text-gray-900">Stories of Success</h2>
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
              <h2 className="text-3xl font-medium text-gray-900 sm:text-4xl">
                Choose Your Plan
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Try 15 free demo questions at{' '}
                <a href="https://www.analysttrainer.com/try-free" className="text-[#1FB8CD] hover:underline font-medium">
                  analysttrainer.com/try-free
                </a>
                . Choose your plan when you're ready.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* 2 Month */}
              <div className="pill-card">
                <div className="text-center pb-6 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">2 Month</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-light text-gray-900">£25</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">one-time</p>
                  <p className="mt-1 text-xs text-green-600 font-medium">£0.42/day</p>
                </div>

                <div className="py-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">2,000+ practice questions</span>
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
                    <span className="text-gray-700 text-sm">Detailed explanations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Performance analytics</span>
                  </div>
                </div>

                <Link
                  href="/signup?plan=2month"
                  className="block w-full text-center pill-btn pill-btn-secondary"
                >
                  Get Started
                </Link>
              </div>

              {/* 6 Month - Most Popular */}
              <div className="pill-card relative ring-2 ring-green-500">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </div>
                <div className="text-center pb-6 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">6 Month</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-light text-gray-900">£40</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">one-time</p>
                  <p className="mt-1 text-xs text-green-600 font-medium">£0.22/day</p>
                </div>

                <div className="py-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">2,000+ practice questions</span>
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
                    <span className="text-gray-700 text-sm">Detailed explanations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Performance analytics</span>
                  </div>
                </div>

                <Link
                  href="/signup?plan=6month"
                  className="block w-full text-center pill-btn pill-btn-primary"
                >
                  Get Started
                </Link>
              </div>

              {/* Lifetime */}
              <div className="pill-card">
                <div className="text-center pb-6 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Lifetime</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-light text-gray-900">£70</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">one-time</p>
                  <p className="mt-1 text-xs text-green-600 font-medium">Best value</p>
                </div>

                <div className="py-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">2,000+ practice questions</span>
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
                    <span className="text-gray-700 text-sm">Detailed explanations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">Priority email support</span>
                  </div>
                </div>

                <Link
                  href="/signup?plan=lifetime"
                  className="block w-full text-center pill-btn pill-btn-secondary"
                >
                  Get Started
                </Link>
              </div>
            </div>

            <p className="mt-8 text-center text-xs text-gray-400">
              Secure payment via Stripe. All cards accepted.
            </p>

            {/* Pass Guarantee */}
            <div className="mt-12">
              <PassGuaranteeFull />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-medium text-gray-900 sm:text-4xl">
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
            <h2 className="mb-6 text-3xl font-medium text-gray-900 sm:text-4xl">
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
                Start Your Prep
              </Link>
              <Link
                href="/try-free"
                className="pill-btn pill-btn-secondary pill-btn-lg"
              >
                Take Demo
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
                  A leading platform for CFA Level 1 exam preparation.
                </p>
              </div>

              <div>
                <h4 className="mb-4 font-medium text-gray-900">Product</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><a href="#features" className="hover:text-gray-900">Features</a></li>
                  <li><a href="#pricing" className="hover:text-gray-900">Pricing</a></li>
                  <li><Link href="/flashcards" className="hover:text-gray-900">Free Flashcards</Link></li>
                  <li><Link href="/question-bank" className="hover:text-gray-900">Question Bank</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-medium text-gray-900">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link href="/blog" className="hover:text-gray-900">Blog</Link></li>
                  <li><Link href="/help" className="hover:text-gray-900">Help Center</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-medium text-gray-900">Legal</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-gray-900">Terms of Service</Link></li>
                  <li><Link href="/refund" className="hover:text-gray-900">Refund Policy</Link></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
              <p>© 2026 AnalystTrainer. All rights reserved.</p>
              <p className="mt-2">CFA Institute does not endorse, promote, or warrant the accuracy or quality of AnalystTrainer. CFA® and Chartered Financial Analyst® are registered trademarks owned by CFA Institute.</p>
            </div>
          </div>
        </footer>

        <FloatingGetStartedButton />
      </main>
    </>
  );
}
