'use client'

import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { useState } from 'react'
import Breadcrumbs from '@/components/Breadcrumbs'
import FloatingGetStartedButton from '../components/FloatingGetStartedButton'

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'lifetime' | 'monthly'>('lifetime')

  // Product Schema for SEO
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "AnalystTrainer CFA Level 1 Exam Prep",
    "description": "Comprehensive CFA Level 1 exam preparation with 2,000+ practice questions, unlimited mock exams, and detailed explanations.",
    "brand": {
      "@type": "Brand",
      "name": "AnalystTrainer"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "2 Month Plan",
        "price": "25",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31"
      },
      {
        "@type": "Offer",
        "name": "6 Month Plan",
        "price": "40",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31"
      },
      {
        "@type": "Offer",
        "name": "Lifetime Plan",
        "price": "60",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2026-12-31"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "500"
    }
  }

  // FAQ Schema for pricing FAQs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I upgrade later?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! You can upgrade from Basic to Premium at any time. We'll credit your original purchase toward the upgrade."
        }
      },
      {
        "@type": "Question",
        "name": "Can I try before I buy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Visit /try-free to practice 15 demo questions instantly with no signup required. This lets you experience our question quality before purchasing."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a refund policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with AnalystTrainer, we'll refund your purchase—no questions asked."
        }
      }
    ]
  }

  const plans = {
    lifetime: [
      {
        name: '2 Month',
        price: 25,
        period: 'one-time',
        description: 'Essential exam preparation',
        features: [
          '2,000+ practice questions',
          'Unlimited mock exams',
          'Detailed explanations',
          'Performance analytics',
          'All 10 CFA L1 topics',
        ],
        cta: 'Get Started',
        href: '/signup?plan=2month',
        popular: false,
        perDay: '£0.42/day',
      },
      {
        name: '6 Month',
        price: 40,
        period: 'one-time',
        description: 'Extended exam mastery',
        features: [
          '2,000+ practice questions',
          'Unlimited mock exams',
          'Detailed explanations',
          'Performance analytics',
          'All 10 CFA L1 topics',
        ],
        cta: 'Get Started',
        href: '/signup?plan=6month',
        popular: true,
        perDay: '£0.22/day',
      },
      {
        name: 'Lifetime',
        price: 60,
        period: 'one-time',
        description: 'Complete lifetime access',
        features: [
          '2,000+ practice questions',
          'Unlimited mock exams',
          'Detailed explanations',
          'Performance analytics',
          'All 10 CFA L1 topics',
          'Priority email support',
        ],
        cta: 'Get Started',
        href: '/signup?plan=lifetime',
        popular: false,
        perDay: 'Best value',
      },
    ],
  }

  const comparisonFeatures = [
    { name: 'Practice Questions', tier2: '2,000+', tier6: '2,000+', tierLifetime: '2,000+' },
    { name: 'Mock Exams', tier2: 'Unlimited', tier6: 'Unlimited', tierLifetime: 'Unlimited' },
    { name: 'Detailed Explanations', tier2: true, tier6: true, tierLifetime: true },
    { name: 'Performance Analytics', tier2: true, tier6: true, tierLifetime: true },
    { name: 'All 10 CFA L1 Topics', tier2: true, tier6: true, tierLifetime: true },
    { name: 'Priority Email Support', tier2: false, tier6: false, tierLifetime: true },
  ]

  const faqs = [
    {
      question: 'Can I upgrade later?',
      answer: "Yes! You can upgrade from Basic to Premium at any time. We'll credit your original purchase toward the upgrade.",
    },
    {
      question: 'Is there a refund policy?',
      answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with AnalystTrainer, we'll refund your purchase—no questions asked.",
    },
    {
      question: 'Do you offer student discounts?',
      answer: 'Yes! Students get 20% off all plans. Contact us with your student ID for a discount code.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and PayPal through our secure Stripe payment processor.',
    },
    {
      question: 'Can I share my account?',
      answer: 'Each license is for individual use. For group or corporate licenses, please contact us for special pricing.',
    },
  ]

  return (
    <>
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        strategy="beforeInteractive"
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="beforeInteractive"
      />

      <div className="min-h-screen bg-[#FBFAF4]">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/">
              <Image src="/logo.png" alt="AnalystTrainer" width={180} height={40} className="h-8 w-auto" />
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-[#5f6368] hover:text-[#13343B] transition-colors">
                Login
              </Link>
              <Link href="/try-free" className="bg-[#1FB8CD] text-white px-5 py-2 rounded-lg hover:bg-[#1A6872] transition-all font-medium">
                Try Free Demo
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <Breadcrumbs />

      {/* Hero */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your CFA Level 1 preparation needs. Try 15 free demo questions at /try-free before purchasing.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {plans.lifetime.map((plan) => (
              <div
                key={plan.name}
                className={`pill-card relative ${plan.popular ? 'ring-2 ring-green-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="text-center pb-6 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-light text-gray-900">
                      {plan.price === 0 ? 'Free' : `£${plan.price}`}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">{plan.period}</p>
                  {plan.perDay && (
                    <p className="mt-1 text-xs text-green-600 font-medium">{plan.perDay}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-600">{plan.description}</p>
                </div>

                <div className="py-6 space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={plan.href}
                  className={`block w-full text-center pill-btn ${
                    plan.popular ? 'pill-btn-primary' : 'pill-btn-secondary'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Money-Back Guarantee */}
      <section className="px-4 py-12 sm:px-6 lg:px-8 bg-green-50">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-center gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900">30-Day Money-Back Guarantee</h3>
              <p className="text-gray-600">Not satisfied? Get a full refund within 30 days. No questions asked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Compare Plans
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">2 Month</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">6 Month</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Lifetime</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm text-gray-900">{feature.name}</td>
                      <td className="px-6 py-4 text-center text-sm">
                        {typeof feature.tier2 === 'boolean' ? (
                          feature.tier2 ? (
                            <svg className="w-5 h-5 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )
                        ) : (
                          <span className="text-gray-600">{feature.tier2}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        {typeof feature.tier6 === 'boolean' ? (
                          feature.tier6 ? (
                            <svg className="w-5 h-5 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )
                        ) : (
                          <span className="text-gray-600">{feature.tier6}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        {typeof feature.tierLifetime === 'boolean' ? (
                          feature.tierLifetime ? (
                            <svg className="w-5 h-5 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )
                        ) : (
                          <span className="text-gray-600">{feature.tierLifetime}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-r from-[#13343B] to-[#1a4a54]">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to pass CFA Level 1?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join thousands of successful candidates. Choose your plan and start preparing today.
          </p>
          <Link
            href="/signup?plan=6month"
            className="inline-block bg-[#1FB8CD] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>

        <FloatingGetStartedButton />
      </div>
    </>
  )
}
