import Link from "next/link";
import Script from "next/script";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://financeexamprep.co.uk/#organization",
        "name": "Finance Exam Prep",
        "url": "https://financeexamprep.co.uk",
        "logo": {
          "@type": "ImageObject",
          "url": "https://financeexamprep.co.uk/logo.png",
          "width": 600,
          "height": 60
        },
        "sameAs": [
          "https://twitter.com/financeexamprep",
          "https://facebook.com/financeexamprep",
          "https://linkedin.com/company/financeexamprep"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://financeexamprep.co.uk/#website",
        "url": "https://financeexamprep.co.uk",
        "name": "Finance Exam Prep",
        "description": "Comprehensive finance certification exam preparation platform",
        "publisher": {
          "@id": "https://financeexamprep.co.uk/#organization"
        }
      },
      {
        "@type": "Course",
        "name": "Finance Certification Exam Preparation",
        "description": "Complete preparation course for finance certification exams with 2000+ practice questions, mock exams, and study materials",
        "provider": {
          "@id": "https://financeexamprep.co.uk/#organization"
        },
        "educationalCredentialAwarded": "Finance Certification Preparation Certificate",
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "online",
          "duration": "P3M",
          "inLanguage": "en-GB"
        },
        "offers": [
          {
            "@type": "Offer",
            "category": "Basic",
            "price": "299",
            "priceCurrency": "GBP",
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "category": "Standard",
            "price": "599",
            "priceCurrency": "GBP",
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "category": "Premium",
            "price": "999",
            "priceCurrency": "GBP",
            "availability": "https://schema.org/InStock"
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "8500",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How similar are your questions to the actual finance certification exams?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our questions are written by certified finance professionals who have recently taken the exams. We regularly update our question bank based on feedback to ensure they match the current exam format and difficulty level."
            }
          },
          {
            "@type": "Question",
            "name": "What if I don't pass after using your platform?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We offer a 100% money-back guarantee. If you complete at least 80% of our question bank and all mock exams but don't pass your finance exam, we'll refund your full purchase price."
            }
          },
          {
            "@type": "Question",
            "name": "How long should I study before my exam?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We recommend starting your preparation at least 3 months before your exam date. Most successful candidates spend 2-3 hours daily on our platform."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />
      <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Finance Exam Prep
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-600 hover:text-gray-900 font-medium">
                Features
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">
                Pricing
              </Link>
              <Link href="/resources" className="text-gray-600 hover:text-gray-900 font-medium">
                Resources
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">
                Contact
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-700">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Only 47% pass on their first attempt
            </div>

            <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Pass Your Finance Certification
              <span className="block text-gray-900">On Your First Try</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600">
              Join thousands of finance professionals who've secured their certification with our comprehensive question bank and proven study system.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/signup"
                className="rounded-lg bg-gray-900 px-8 py-4 text-lg font-semibold text-white hover:bg-gray-800 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="#success-stories"
                className="rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-700 hover:border-gray-400 transition-colors"
              >
                See Success Stories
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">92%</div>
                <div className="text-sm text-gray-600">Pass Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">2,500+</div>
                <div className="text-sm text-gray-600">Practice Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">3,000+</div>
                <div className="text-sm text-gray-600">Passed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            The Cost of Failing Your Finance Certification Exam
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">£50,000+ Lost Income</h3>
              <p className="text-gray-600">Delay in certification means lost opportunities for higher-paying roles</p>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">6-12 Months Career Delay</h3>
              <p className="text-gray-600">Must wait for next exam sitting, delaying your career progression</p>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Professional Reputation</h3>
              <p className="text-gray-600">Impact on credibility and confidence in professional settings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything You Need to Pass with Confidence
          </h2>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">Comprehensive Question Bank</h3>
                  <p className="text-gray-600">2,500+ exam-style questions covering CFA, FRM, and other finance certification topics with detailed explanations</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">Performance Analytics</h3>
                  <p className="text-gray-600">Track your progress, identify weak areas, and focus your study time effectively</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                  <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">Study Guides & Resources</h3>
                  <p className="text-gray-600">Comprehensive study materials, formula sheets, and financial modeling guides</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-8">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">Recent Success Stories</h3>
              <div className="space-y-4">
                <div className="rounded-lg bg-white p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {"★★★★★".split("").map((star, i) => (
                        <span key={i}>{star}</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">2 days ago</span>
                  </div>
                  <p className="mb-2 font-semibold text-gray-900">Michael C. - Passed CFA Level 1</p>
                  <p className="text-sm text-gray-600">"The question bank was exactly like the real exam. Scored in the 90th percentile thanks to this platform!"</p>
                </div>

                <div className="rounded-lg bg-white p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {"★★★★★".split("").map((star, i) => (
                        <span key={i}>{star}</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">1 week ago</span>
                  </div>
                  <p className="mb-2 font-semibold text-gray-900">Jennifer L. - FRM Part 1 Success</p>
                  <p className="text-sm text-gray-600">"Failed my first attempt. Used this for 3 months and passed with confidence!"</p>
                </div>

                <div className="rounded-lg bg-white p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {"★★★★★".split("").map((star, i) => (
                        <span key={i}>{star}</span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">2 weeks ago</span>
                  </div>
                  <p className="mb-2 font-semibold text-gray-900">David K. - CFA Level 2 Pass</p>
                  <p className="text-sm text-gray-600">"The mock exams were harder than the real thing - exactly what I needed!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-900 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 text-center text-white lg:grid-cols-4">
            <div>
              <div className="text-4xl font-bold">92%</div>
              <div className="mt-2 text-gray-400">Pass Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold">2,500+</div>
              <div className="mt-2 text-gray-400">Questions</div>
            </div>
            <div>
              <div className="text-4xl font-bold">3.5x</div>
              <div className="mt-2 text-gray-400">Score Improvement</div>
            </div>
            <div>
              <div className="text-4xl font-bold">24/7</div>
              <div className="mt-2 text-gray-400">Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-4 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            Choose Your Study Plan
          </h2>
          <p className="mb-12 text-center text-xl text-gray-600">
            All plans include our pass guarantee - pass or get 100% refund
          </p>

          <div className="grid gap-8 lg:grid-cols-4">
            {/* Basic Plan */}
            <div className="rounded-xl border border-gray-200 bg-white p-8">
              <h3 className="mb-4 text-xl font-bold text-gray-900">Basic</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">£299</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">500 practice questions</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Basic performance tracking</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">2 mock exams</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Email support</span>
                </li>
              </ul>
              <button className="w-full rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 hover:border-gray-400 transition-colors">
                Get Started
              </button>
            </div>

            {/* Standard Plan */}
            <div className="relative rounded-xl border-2 border-gray-900 bg-white p-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-1 text-sm font-medium text-white">
                Most Popular
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">Standard</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">£599</span>
                <span className="text-gray-600">/3 months</span>
              </div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">1,500 practice questions</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">5 mock exams</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Study guides included</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Priority email support</span>
                </li>
              </ul>
              <button className="w-full rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white hover:bg-gray-800 transition-colors">
                Get Started
              </button>
            </div>

            {/* Premium Plan */}
            <div className="rounded-xl border border-gray-200 bg-white p-8">
              <h3 className="mb-4 text-xl font-bold text-gray-900">Premium</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">£999</span>
                <span className="text-gray-600">/6 months</span>
              </div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">2,500+ practice questions</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">AI-powered study plan</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Unlimited mock exams</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Priority email support</span>
                </li>
              </ul>
              <button className="w-full rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 hover:border-gray-400 transition-colors">
                Get Started
              </button>
            </div>

            {/* Ultimate Plan */}
            <div className="rounded-xl border border-gray-200 bg-white p-8">
              <h3 className="mb-4 text-xl font-bold text-gray-900">Ultimate</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">£1,999</span>
                <span className="text-gray-600">/lifetime</span>
              </div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Everything in Premium</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Personalized study roadmap</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Lifetime access</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Dedicated account manager</span>
                </li>
                <li className="flex items-start">
                  <svg className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Free retake support</span>
                </li>
              </ul>
              <button className="w-full rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 hover:border-gray-400 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="success-stories" className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            Success Stories from Real Candidates
          </h2>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex text-yellow-400">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className="text-xl">{star}</span>
                ))}
              </div>
              <p className="mb-4 text-gray-600">
                "I failed CFA Level 1 on my first attempt scoring below the MPS. After using this platform for 3 months, I passed with scores well above the 90th percentile! The detailed explanations really helped me understand the concepts."
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">Rachel Thompson</p>
                <p className="text-sm text-gray-600">Investment Analyst - London</p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex text-yellow-400">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className="text-xl">{star}</span>
                ))}
              </div>
              <p className="mb-4 text-gray-600">
                "The FRM mock exams were incredibly accurate. The quantitative questions were especially helpful - exactly like the real thing! Passed both parts on my first attempt."
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">James Chen</p>
                <p className="text-sm text-gray-600">Risk Manager - Singapore</p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="mb-4 flex text-yellow-400">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className="text-xl">{star}</span>
                ))}
              </div>
              <p className="mb-4 text-gray-600">
                "Worth every penny! The performance tracking helped me focus on Ethics and Fixed Income. Went from failing mocks to passing CFA Level 2 comfortably. The study plan kept me on track."
              </p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">Sophie Martinez</p>
                <p className="text-sm text-gray-600">Portfolio Manager - New York</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <details className="group rounded-lg border border-gray-200 bg-white p-6">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
                How similar are your questions to the actual finance certification exams?
                <svg className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-600">
                Our questions are written by CFA charterholders, FRM certified professionals, and other finance experts who have recently taken these exams. We regularly update our question bank based on feedback to ensure they match the current exam format and difficulty level. Many candidates report our questions are actually slightly harder than the real exam, which helps them feel more prepared.
              </p>
            </details>

            <details className="group rounded-lg border border-gray-200 bg-white p-6">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
                What if I don't pass after using your platform?
                <svg className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-600">
                We offer a 100% money-back guarantee. If you complete at least 80% of our question bank and all mock exams but don't pass your finance certification exam, we'll refund your full purchase price. Additionally, you'll keep access to help you prepare for your retake at no extra cost.
              </p>
            </details>

            <details className="group rounded-lg border border-gray-200 bg-white p-6">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
                How long should I study before my exam?
                <svg className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-600">
                We recommend starting your preparation at least 3-6 months before your exam date, depending on the level and your background. Most successful candidates spend 300+ hours studying. Our AI-powered study planner will create a personalized schedule based on your exam date and available study time.
              </p>
            </details>

            <details className="group rounded-lg border border-gray-200 bg-white p-6">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
                Can I access the platform on mobile devices?
                <svg className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-600">
                Yes! Our platform is fully responsive and works on all devices. You can study on your computer at home, tablet during your commute, or phone during breaks. Your progress syncs across all devices, so you can pick up exactly where you left off.
              </p>
            </details>

            <details className="group rounded-lg border border-gray-200 bg-white p-6">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
                Which finance certifications do you cover?
                <svg className="h-5 w-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="mt-4 text-gray-600">
                We currently offer comprehensive preparation for CFA (all levels), FRM (Parts 1 & 2), CPA, ACCA, and other major finance certifications. Our content is regularly reviewed and updated to ensure it remains current with the latest exam formats, topics, and industry standards.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
            Join 3,000+ Finance Professionals Who Passed Their Exams
          </h2>
          <p className="mb-8 text-xl text-gray-300">
            Start your free trial today. No credit card required.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </Link>
            <div className="text-white">
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 font-bold text-gray-900">Finance Exam Prep</h3>
              <p className="text-sm text-gray-600">
                The leading platform for finance certification exam preparation.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-gray-900">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/question-bank" className="hover:text-gray-900">Question Bank</Link></li>
                <li><Link href="/mock-exams" className="hover:text-gray-900">Mock Exams</Link></li>
                <li><Link href="/study-guides" className="hover:text-gray-900">Study Guides</Link></li>
                <li><Link href="/formula-sheets" className="hover:text-gray-900">Formula Sheets</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-gray-900">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/help" className="hover:text-gray-900">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-gray-900">Contact Us</Link></li>
                <li><Link href="/blog" className="hover:text-gray-900">Blog</Link></li>
                <li><Link href="/testimonials" className="hover:text-gray-900">Success Stories</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold text-gray-900">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-gray-900">Terms of Service</Link></li>
                <li><Link href="/refund" className="hover:text-gray-900">Refund Policy</Link></li>
                <li><Link href="/disclaimer" className="hover:text-gray-900">Disclaimer</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>© 2024 Finance Exam Prep. All rights reserved.</p>
            <p className="mt-2">Not affiliated with or endorsed by CFA Institute, GARP, or other certification bodies.</p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
