import Link from "next/link";
import Script from "next/script";

export default function Home() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AnalystTrainer Finance Certification Exam Prep",
    "description": "Online platform with CFA and FRM exam-style question banks, mock exams, and performance analytics.",
    "brand": {
      "@type": "Brand",
      "name": "AnalystTrainer"
    },
    "url": "https://www.analysttrainer.com/",
    "image": "https://www.analysttrainer.com/og-image.jpg",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "250"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "GBP",
      "lowPrice": "0",
      "highPrice": "999",
      "offerCount": "4",
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
          "price": "299",
          "priceCurrency": "GBP",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Standard Plan",
          "price": "599",
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
        "name": "How similar are your questions to the real CFA and FRM exams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our question bank is written to mirror real CFA and FRM exam blueprints, difficulty levels, and wording. Each item includes step-by-step explanations and formula references."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if I fail my exam after using AnalystTrainer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you complete the required percentage of questions and mock exams and still do not pass, you may qualify for an extended access period or a refund under our pass guarantee policy."
        }
      },
      {
        "@type": "Question",
        "name": "Which finance certifications do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We currently focus on CFA Level 1, with FRM and other finance certifications coming soon. Our content is regularly reviewed and updated to match the latest exam formats."
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

      <div className="min-h-screen bg-[#FBFAF4]">
        {/* Header / Navigation */}
        <header className="sticky top-0 z-50 border-b border-white/20 bg-gray-400/40 backdrop-blur-xl">
          <nav className="mx-auto max-w-[960px] px-4 sm:px-6">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="text-xl font-bold text-[#13343B]">
                AnalystTrainer
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#product" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                  Features
                </a>
                <a href="#pricing" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                  Pricing
                </a>
                <a href="#proof" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                  Testimonials
                </a>
                <a href="#faq" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                  FAQ
                </a>
              </div>

              {/* CTA Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-[#5f6368] hover:text-[#13343B] transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  data-event="click_cta"
                  data-cta="start_trial"
                  data-section="header"
                  className="bg-[#1FB8CD] text-white px-5 py-2 rounded-lg hover:bg-[#1A6872] transition-all font-medium"
                >
                  Start Free Trial
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 rounded-lg text-[#5f6368] hover:text-[#13343B] hover:bg-[#F3F3EE]" aria-label="Open menu">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <section id="hero" className="px-4 py-16 sm:py-24 sm:px-6" data-section="hero">
            <div className="mx-auto max-w-[960px]">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                {/* Left: Copy, CTAs, Proof */}
                <div>
                  <h1 className="text-4xl sm:text-5xl font-bold text-[#13343B] leading-tight mb-6">
                    Pass Your Finance Certification Exams on Your First Try
                  </h1>

                  <p className="text-lg text-[#5f6368] mb-8 leading-relaxed">
                    Master CFA, FRM, and more with an exam-style question bank, realistic mock exams, and analytics that pinpoint your weakest topics.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Link
                      href="/signup"
                      data-event="click_cta"
                      data-cta="start_trial"
                      data-section="hero"
                      className="bg-[#1FB8CD] text-white px-8 py-3.5 rounded-lg text-base font-medium hover:bg-[#1A6872] transition-all text-center"
                    >
                      Start Free Trial
                    </Link>
                    <Link
                      href="/practice"
                      data-event="click_cta"
                      data-cta="view_demo"
                      data-section="hero"
                      className="border border-[#EAEEEF] text-[#13343B] px-8 py-3.5 rounded-lg text-base font-medium hover:bg-[#F3F3EE] transition-all text-center"
                    >
                      View Question Bank
                    </Link>
                  </div>

                  <p className="text-sm text-[#9aa0a6] mb-8">No credit card required. Cancel anytime.</p>

                  {/* Proof Row */}
                  <div className="flex flex-wrap gap-8 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-semibold text-[#13343B]">92%</span>
                      <span className="text-[#5f6368]">pass rate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-semibold text-[#13343B]">3,000+</span>
                      <span className="text-[#5f6368]">candidates passed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-semibold text-[#13343B]">2,500+</span>
                      <span className="text-[#5f6368]">questions</span>
                    </div>
                  </div>
                </div>

                {/* Right: Product Screenshot Card */}
                <aside className="bg-white border border-[#EAEEEF] rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#EAEEEF]">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                    <span className="ml-4 text-sm text-[#9aa0a6]">Question Bank</span>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-[#F3F3EE] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#1FB8CD] font-medium">Ethics & Professional Standards</span>
                        <span className="text-xs text-[#28c840]">85%</span>
                      </div>
                      <div className="w-full bg-[#EAEEEF] rounded-full h-1.5">
                        <div className="bg-[#28c840] h-1.5 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <div className="bg-[#F3F3EE] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#1FB8CD] font-medium">Quantitative Methods</span>
                        <span className="text-xs text-[#febc2e]">62%</span>
                      </div>
                      <div className="w-full bg-[#EAEEEF] rounded-full h-1.5">
                        <div className="bg-[#febc2e] h-1.5 rounded-full" style={{width: '62%'}}></div>
                      </div>
                    </div>
                    <div className="bg-[#F3F3EE] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#1FB8CD] font-medium">Financial Statement Analysis</span>
                        <span className="text-xs text-[#ff5f57]">28%</span>
                      </div>
                      <div className="w-full bg-[#EAEEEF] rounded-full h-1.5">
                        <div className="bg-[#ff5f57] h-1.5 rounded-full" style={{width: '28%'}}></div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#EAEEEF] text-center">
                    <p className="text-sm text-[#9aa0a6]">Your personalized analytics dashboard</p>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          {/* Pain Section */}
          <section id="pain" className="px-4 py-16 sm:px-6 border-t border-[#EAEEEF]" data-section="pain">
            <div className="mx-auto max-w-[960px]">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#13343B] text-center mb-12">
                The Cost of Failing Your Finance Certification Exam
              </h2>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-white border border-[#EAEEEF] rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-[#ff5f57]/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#ff5f57]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-[#13343B] mb-2">£50,000+ Lost Earnings</h3>
                  <p className="text-[#5f6368] text-sm leading-relaxed">
                    Delayed promotions and bonuses from not having the certification your peers already hold.
                  </p>
                </div>

                <div className="bg-white border border-[#EAEEEF] rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-[#ff5f57]/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#ff5f57]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-[#13343B] mb-2">6-12 Months Career Delay</h3>
                  <p className="text-[#5f6368] text-sm leading-relaxed">
                    Waiting for the next exam window while recruitment cycles and opportunities pass you by.
                  </p>
                </div>

                <div className="bg-white border border-[#EAEEEF] rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-[#ff5f57]/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#ff5f57]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-[#13343B] mb-2">Confidence & Reputation Hit</h3>
                  <p className="text-[#5f6368] text-sm leading-relaxed">
                    The pressure of retaking with colleagues watching and questions about your competence.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Product Section */}
          <section id="product" className="px-4 py-16 sm:px-6 border-t border-[#EAEEEF]" data-section="product">
            <div className="mx-auto max-w-[960px]">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#13343B] text-center mb-4">
                Everything You Need to Pass With Confidence
              </h2>
              <p className="text-[#5f6368] text-center mb-12 max-w-2xl mx-auto">
                Our comprehensive platform gives you the tools, practice, and insights to master your finance certification exam.
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white border border-[#EAEEEF] rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-[#1FB8CD]/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-[#13343B] mb-2">Comprehensive Question Bank</h3>
                  <p className="text-[#5f6368] text-sm leading-relaxed">
                    2,500+ exam-style questions across CFA, FRM, and other finance certifications, each with detailed explanations and formulas.
                  </p>
                </div>

                <div className="bg-white border border-[#EAEEEF] rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-[#1FB8CD]/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-[#13343B] mb-2">Performance Analytics</h3>
                  <p className="text-[#5f6368] text-sm leading-relaxed">
                    Topic breakdown, LOS analysis, and time-per-question metrics to identify weaknesses and track improvement.
                  </p>
                </div>

                <div className="bg-white border border-[#EAEEEF] rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-[#1FB8CD]/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-[#13343B] mb-2">Study Guides & Formula Sheets</h3>
                  <p className="text-[#5f6368] text-sm leading-relaxed">
                    Downloadable PDF guides and quick-reference formula sheets for efficient revision.
                  </p>
                </div>

                <div className="bg-white border border-[#EAEEEF] rounded-lg p-6 hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-[#1FB8CD]/10 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-[#13343B] mb-2">Realistic Mock Exams</h3>
                  <p className="text-[#5f6368] text-sm leading-relaxed">
                    Timed simulations that mirror the actual exam format, difficulty, and question distribution.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Proof Section - Stats Strip */}
          <section id="proof" className="px-4 py-12 sm:px-6 bg-[#1FB8CD]" data-section="proof">
            <div className="mx-auto max-w-[960px]">
              <div className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
                <div>
                  <div className="text-3xl font-semibold text-white">92%</div>
                  <div className="mt-2 text-white/80 text-sm">Pass rate among engaged users</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-white">2,500+</div>
                  <div className="mt-2 text-white/80 text-sm">Exam-style practice questions</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-white">3.5x</div>
                  <div className="mt-2 text-white/80 text-sm">Average score improvement</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-white">3,000+</div>
                  <div className="mt-2 text-white/80 text-sm">Candidates passed with us</div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="px-4 py-16 sm:px-6" data-section="testimonials">
            <div className="mx-auto max-w-[960px]">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#13343B] text-center mb-12">
                Success Stories From Candidates Like You
              </h2>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-white border border-[#EAEEEF] rounded-lg p-6">
                  <div className="flex text-[#febc2e] mb-4">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="text-sm">{star}</span>
                    ))}
                  </div>
                  <p className="text-[#5f6368] text-sm mb-4 leading-relaxed">
                    &ldquo;I failed CFA Level 1 on my first attempt. After using AnalystTrainer for 3 months, I passed with scores in the 90th percentile! The detailed explanations really helped.&rdquo;
                  </p>
                  <div className="border-t border-[#EAEEEF] pt-4">
                    <p className="font-medium text-[#13343B]">Rachel Thompson</p>
                    <p className="text-sm text-[#9aa0a6]">Investment Analyst, London</p>
                    <p className="text-xs text-[#1FB8CD] mt-1">CFA Level I - June 2024</p>
                  </div>
                </div>

                <div className="bg-white border border-[#EAEEEF] rounded-lg p-6">
                  <div className="flex text-[#febc2e] mb-4">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="text-sm">{star}</span>
                    ))}
                  </div>
                  <p className="text-[#5f6368] text-sm mb-4 leading-relaxed">
                    &ldquo;The mock exams were incredibly accurate. The quantitative questions were especially helpful - exactly like the real thing!&rdquo;
                  </p>
                  <div className="border-t border-[#EAEEEF] pt-4">
                    <p className="font-medium text-[#13343B]">James Chen</p>
                    <p className="text-sm text-[#9aa0a6]">Risk Manager, Singapore</p>
                    <p className="text-xs text-[#1FB8CD] mt-1">FRM Part 1 - May 2024</p>
                  </div>
                </div>

                <div className="bg-white border border-[#EAEEEF] rounded-lg p-6">
                  <div className="flex text-[#febc2e] mb-4">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i} className="text-sm">{star}</span>
                    ))}
                  </div>
                  <p className="text-[#5f6368] text-sm mb-4 leading-relaxed">
                    &ldquo;Worth every penny! The performance tracking helped me focus on Ethics and Fixed Income. Passed CFA Level 2 comfortably.&rdquo;
                  </p>
                  <div className="border-t border-[#EAEEEF] pt-4">
                    <p className="font-medium text-[#13343B]">Sophie Martinez</p>
                    <p className="text-sm text-[#9aa0a6]">Portfolio Manager, New York</p>
                    <p className="text-xs text-[#1FB8CD] mt-1">CFA Level II - August 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="px-4 py-16 sm:px-6 bg-[#F3F3EE]" data-section="pricing">
            <div className="mx-auto max-w-[960px]">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#13343B] text-center mb-4">
                Choose Your Study Plan
              </h2>
              <p className="text-[#5f6368] text-center mb-12">
                Start with a free trial. Upgrade only if it helps you pass.
              </p>

              <div className="grid gap-6 lg:grid-cols-4">
                {/* Trial */}
                <div className="bg-white border border-[#EAEEEF] rounded-lg p-6">
                  <h3 className="text-lg font-medium text-[#13343B] mb-2">Trial</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-semibold text-[#13343B]">Free</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-4 h-4 text-[#1FB8CD] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      50 practice questions
                    </li>
                    <li className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-4 h-4 text-[#1FB8CD] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      1 mini mock exam
                    </li>
                    <li className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-4 h-4 text-[#1FB8CD] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      7-day access
                    </li>
                  </ul>
                  <Link
                    href="/signup"
                    data-event="click_cta"
                    data-cta="pricing_plan_select"
                    data-plan="trial"
                    className="block w-full text-center bg-[#1FB8CD] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#1A6872] transition-all"
                  >
                    Start Free Trial
                  </Link>
                </div>

                {/* Basic */}
                <div className="bg-white border border-[#EAEEEF] rounded-lg p-6">
                  <h3 className="text-lg font-medium text-[#13343B] mb-2">Basic</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-semibold text-[#13343B]">£299</span>
                    <span className="text-[#9aa0a6]">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-4 h-4 text-[#1FB8CD] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      500 practice questions
                    </li>
                    <li className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-4 h-4 text-[#1FB8CD] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Basic tracking
                    </li>
                    <li className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-4 h-4 text-[#1FB8CD] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      2 mock exams
                    </li>
                    <li className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-4 h-4 text-[#1FB8CD] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Email support
                    </li>
                  </ul>
                  <button className="w-full border border-[#EAEEEF] text-[#13343B] px-6 py-2.5 rounded-lg font-medium hover:bg-[#F3F3EE] transition-all">
                    Get Started
                  </button>
                </div>

                {/* Standard - Most Popular */}
                <div className="relative bg-white border-2 border-[#1FB8CD] rounded-lg p-6">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1FB8CD] text-white text-xs font-medium px-3 py-1 rounded">
                    Most Popular
                  </div>
                  <h3 className="text-lg font-medium text-[#13343B] mb-2">Standard</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-semibold text-[#13343B]">£599</span>
                    <span className="text-[#9aa0a6]">/3 months</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-4 h-4 text-[#1FB8CD] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Full question bank
                    </li>
                    <li className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-4 h-4 text-[#1FB8CD] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Advanced analytics
                    </li>
                    <li className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-4 h-4 text-[#1FB8CD] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      All mock exams
                    </li>
                    <li className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-4 h-4 text-[#1FB8CD] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Study guides included
                    </li>
                    <li className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-4 h-4 text-[#1FB8CD] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Priority support
                    </li>
                  </ul>
                  <button className="w-full bg-[#1FB8CD] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#1A6872] transition-all">
                    Get Started
                  </button>
                </div>

                {/* Premium */}
                <div className="bg-white border border-[#EAEEEF] rounded-lg p-6">
                  <h3 className="text-lg font-medium text-[#13343B] mb-2">Premium</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-semibold text-[#13343B]">£999</span>
                    <span className="text-[#9aa0a6]">/lifetime</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm">
                    <li className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-4 h-4 text-[#1FB8CD] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Everything in Standard
                    </li>
                    <li className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-4 h-4 text-[#1FB8CD] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Personalized study plan
                    </li>
                    <li className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-4 h-4 text-[#1FB8CD] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Lifetime access
                    </li>
                    <li className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-4 h-4 text-[#1FB8CD] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      1:1 review sessions
                    </li>
                  </ul>
                  <button className="w-full border border-[#EAEEEF] text-[#13343B] px-6 py-2.5 rounded-lg font-medium hover:bg-[#F3F3EE] transition-all">
                    Get Started
                  </button>
                </div>
              </div>

              {/* Pass Guarantee */}
              <div className="mt-8 text-center">
                <p className="text-[#5f6368] text-sm">
                  <span className="text-[#1FB8CD] font-medium">Pass Guarantee:</span> Complete 80%+ of questions and all mocks. If you don&apos;t pass, get extended access or a full refund.
                </p>
                <div className="flex justify-center gap-6 mt-4">
                  <span className="text-[#9aa0a6] text-xs">Secure Payment</span>
                  <span className="text-[#9aa0a6] text-xs">All Cards Accepted</span>
                  <span className="text-[#9aa0a6] text-xs">30-Day Money Back</span>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="px-4 py-16 sm:px-6 border-t border-[#EAEEEF]" data-section="faq">
            <div className="mx-auto max-w-[720px]">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#13343B] text-center mb-12">
                Frequently Asked Questions
              </h2>

              <div className="space-y-3">
                <details className="group bg-white border border-[#EAEEEF] rounded-lg" data-event="faq_open">
                  <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-[#13343B]">
                    How similar are your questions to the real CFA and FRM exams?
                    <svg className="w-4 h-4 text-[#9aa0a6] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-[#5f6368] text-sm leading-relaxed">
                    Our question bank is written to mirror real CFA and FRM exam blueprints, difficulty levels, and wording. Each item includes step-by-step explanations and formula references. Many candidates report our questions are slightly harder than the real exam.
                  </div>
                </details>

                <details className="group bg-white border border-[#EAEEEF] rounded-lg" data-event="faq_open">
                  <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-[#13343B]">
                    What if I fail after using AnalystTrainer?
                    <svg className="w-4 h-4 text-[#9aa0a6] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-[#5f6368] text-sm leading-relaxed">
                    If you complete the required percentage of questions and mock exams and still do not pass, you may qualify for an extended access period or a refund under our pass guarantee policy.
                  </div>
                </details>

                <details className="group bg-white border border-[#EAEEEF] rounded-lg" data-event="faq_open">
                  <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-[#13343B]">
                    Which finance certifications do you cover?
                    <svg className="w-4 h-4 text-[#9aa0a6] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-[#5f6368] text-sm leading-relaxed">
                    We currently focus on CFA Level 1, with comprehensive coverage of all 10 topic areas. FRM and other finance certifications are coming soon. Our content is regularly reviewed and updated to match the latest exam formats.
                  </div>
                </details>

                <details className="group bg-white border border-[#EAEEEF] rounded-lg" data-event="faq_open">
                  <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-[#13343B]">
                    Can I use AnalystTrainer on my phone or tablet?
                    <svg className="w-4 h-4 text-[#9aa0a6] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-[#5f6368] text-sm leading-relaxed">
                    Yes! Our platform is fully responsive and works seamlessly on all devices. Your progress syncs automatically across desktop, tablet, and mobile so you can study anywhere.
                  </div>
                </details>

                <details className="group bg-white border border-[#EAEEEF] rounded-lg" data-event="faq_open">
                  <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-[#13343B]">
                    Do I need to install any software?
                    <svg className="w-4 h-4 text-[#9aa0a6] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-[#5f6368] text-sm leading-relaxed">
                    No installation required. AnalystTrainer is a web-based platform that works in any modern browser. Simply sign up and start practicing immediately.
                  </div>
                </details>
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section id="final-cta" className="px-4 py-20 sm:px-6 bg-[#13343B]" data-section="final-cta">
            <div className="mx-auto max-w-[720px] text-center">
              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">
                Join 3,000+ Finance Professionals Who Passed
              </h2>
              <p className="text-lg text-white/80 mb-8">
                Start your free trial in under a minute. No credit card required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href="/signup"
                  data-event="click_cta"
                  data-cta="start_trial"
                  data-section="final-cta"
                  className="bg-[#1FB8CD] text-white px-8 py-3.5 rounded-lg text-base font-medium hover:bg-[#92DCE2] hover:text-[#13343B] transition-all"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="#"
                  data-event="click_cta"
                  data-cta="lead_magnet"
                  data-section="final-cta"
                  className="border border-white/30 text-white px-8 py-3.5 rounded-lg text-base font-medium hover:bg-white/10 transition-all"
                >
                  Get 20 Free CFA Questions
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  100% Money-Back Guarantee
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Cancel Anytime
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Instant Access
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#EAEEEF] px-4 py-12 sm:px-6 bg-white">
          <div className="mx-auto max-w-[960px]">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="mb-4 font-medium text-[#13343B]">AnalystTrainer</h3>
                <p className="text-sm text-[#9aa0a6]">
                  The leading platform for finance certification exam preparation.
                </p>
              </div>

              <div>
                <h4 className="mb-4 font-medium text-[#13343B]">Resources</h4>
                <ul className="space-y-2 text-sm text-[#9aa0a6]">
                  <li><Link href="/question-bank" className="hover:text-[#13343B] transition-colors">Question Bank</Link></li>
                  <li><Link href="/mock-exams" className="hover:text-[#13343B] transition-colors">Mock Exams</Link></li>
                  <li><Link href="/study-guides" className="hover:text-[#13343B] transition-colors">Study Guides</Link></li>
                  <li><Link href="/formula-sheets" className="hover:text-[#13343B] transition-colors">Formula Sheets</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-medium text-[#13343B]">Support</h4>
                <ul className="space-y-2 text-sm text-[#9aa0a6]">
                  <li><Link href="/help" className="hover:text-[#13343B] transition-colors">Help Center</Link></li>
                  <li><Link href="/contact" className="hover:text-[#13343B] transition-colors">Contact Us</Link></li>
                  <li><a href="#proof" className="hover:text-[#13343B] transition-colors">Success Stories</a></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 font-medium text-[#13343B]">Legal</h4>
                <ul className="space-y-2 text-sm text-[#9aa0a6]">
                  <li><Link href="/privacy" className="hover:text-[#13343B] transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-[#13343B] transition-colors">Terms of Service</Link></li>
                  <li><Link href="/refund" className="hover:text-[#13343B] transition-colors">Refund Policy</Link></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 border-t border-[#EAEEEF] pt-8 text-center text-sm text-[#9aa0a6]">
              <p>© 2024 AnalystTrainer. All rights reserved.</p>
              <p className="mt-2">Not affiliated with or endorsed by CFA Institute, GARP, or other certification bodies.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
