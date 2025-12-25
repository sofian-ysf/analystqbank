"use client";

import Link from "next/link";
import { useState } from "react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Basic",
      description: "Perfect for getting started with CFA preparation",
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        "Access to 1,000+ practice questions",
        "Basic performance tracking",
        "Study guides for Level I",
        "Email support",
        "Mobile app access"
      ],
      buttonText: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      description: "Comprehensive preparation for serious candidates",
      monthlyPrice: 79,
      annualPrice: 790,
      features: [
        "Access to 5,000+ practice questions",
        "All CFA levels (I, II, III)",
        "Full-length mock exams",
        "Advanced analytics & progress tracking",
        "Formula sheets & quick references",
        "Research hubs & study materials",
        "Priority email & chat support",
        "Downloadable content"
      ],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      name: "Premium",
      description: "Ultimate preparation with personalized guidance",
      monthlyPrice: 149,
      annualPrice: 1490,
      features: [
        "Everything in Professional",
        "10,000+ practice questions",
        "Personalized study plans",
        "1-on-1 tutoring sessions (2 hours/month)",
        "Live webinars & Q&A sessions",
        "Exam strategy consultation",
        "Performance guarantee",
        "24/7 priority support"
      ],
      buttonText: "Start Free Trial",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#FBFAF4]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-[#13343B]">
                Finance Exam Prep
              </Link>
              <nav className="ml-10 flex space-x-8">
                <Link href="/features" className="text-[#5f6368] hover:text-[#13343B]">
                  Features
                </Link>
                <Link href="/pricing" className="text-gray-900 font-medium">
                  Pricing
                </Link>
                <Link href="/resources" className="text-[#5f6368] hover:text-[#13343B]">
                  Resources
                </Link>
                <Link href="/about" className="text-[#5f6368] hover:text-[#13343B]">
                  About
                </Link>
                <Link href="/contact" className="text-[#5f6368] hover:text-[#13343B]">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-sm font-medium text-[#5f6368] hover:text-[#13343B]">
                Sign in
              </Link>
              <Link href="/signup" className="text-sm font-medium text-white bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-800">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your preparation needs. All plans include a 14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="mx-4 relative inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Annual
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">Save 17%</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-sm border ${
                  plan.popular
                    ? 'border-gray-900 ring-2 ring-gray-900'
                    : 'border-gray-200'
                } p-8 hover:shadow-lg transition-shadow`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#13343B] mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-5xl font-bold text-gray-900">
                      ${isAnnual ? Math.floor(plan.annualPrice / 12) : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-600 ml-2">/month</span>
                    {isAnnual && (
                      <div className="text-sm text-[#9aa0a6] mt-1">
                        Billed annually (${plan.annualPrice})
                      </div>
                    )}
                  </div>

                  <Link
                    href="/signup"
                    className={`w-full block text-center px-6 py-3 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? 'bg-gray-900 text-white hover:bg-gray-800'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.buttonText}
                  </Link>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold text-[#13343B] mb-4">What&apos;s included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#13343B] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-[#13343B] mb-2">
                Can I switch plans at any time?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#13343B] mb-2">
                What happens during the free trial?
              </h3>
              <p className="text-gray-600">
                You get full access to all features of your chosen plan for 14 days. No credit card required to start.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#13343B] mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee. If you&apos;re not satisfied, we&apos;ll provide a full refund.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#13343B] mb-2">
                Is there a discount for students?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 20% discount for verified students. Contact us with your student ID for the discount code.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#13343B] mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for annual subscriptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your CFA Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful CFA candidates. Start your 14-day free trial today.
          </p>
          <Link href="/signup" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Start Free Trial
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#EAEEEF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link href="/" className="text-xl font-bold text-[#13343B]">
                Finance Exam Prep
              </Link>
              <p className="mt-4 text-gray-600">
                Your comprehensive platform for CFA exam success.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#13343B] mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-[#5f6368] hover:text-[#13343B]">Features</Link></li>
                <li><Link href="/pricing" className="text-[#5f6368] hover:text-[#13343B]">Pricing</Link></li>
                <li><Link href="/question-bank" className="text-[#5f6368] hover:text-[#13343B]">Question Bank</Link></li>
                <li><Link href="/mock-exams" className="text-[#5f6368] hover:text-[#13343B]">Mock Exams</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#13343B] mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="text-[#5f6368] hover:text-[#13343B]">Blog</Link></li>
                <li><Link href="/help" className="text-[#5f6368] hover:text-[#13343B]">Help Center</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#13343B] mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-[#5f6368] hover:text-[#13343B]">About</Link></li>
                <li><Link href="/contact" className="text-[#5f6368] hover:text-[#13343B]">Contact</Link></li>
                <li><Link href="/privacy" className="text-[#5f6368] hover:text-[#13343B]">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-[#5f6368] hover:text-[#13343B]">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#EAEEEF] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">© 2024 Finance Exam Prep. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-[#5f6368] hover:text-[#13343B]">Privacy</Link>
              <Link href="/terms" className="text-[#5f6368] hover:text-[#13343B]">Terms</Link>
              <Link href="/disclaimer" className="text-[#5f6368] hover:text-[#13343B]">Disclaimer</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}