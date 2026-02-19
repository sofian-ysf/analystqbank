'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'lifetime' | 'monthly'>('lifetime')

  const plans = {
    lifetime: [
      {
        name: 'Free Trial',
        price: 0,
        period: '24 hours',
        description: 'Try before you buy',
        features: [
          '100 practice questions',
          '1 mock exam',
          'Basic analytics',
          'Full flashcard access',
        ],
        cta: 'Start Free Trial',
        href: '/signup?plan=trial',
        popular: false,
      },
      {
        name: 'Basic',
        price: 50,
        period: 'one-time',
        description: 'Perfect for focused preparation',
        features: [
          '2,000 practice questions',
          '5 mock exams',
          'Performance analytics',
          'Lifetime access',
          'All 10 CFA L1 topics',
          'Detailed explanations',
        ],
        cta: 'Get Started',
        href: '/signup?plan=basic',
        popular: true,
        perDay: '£0.50/day over 3 months',
      },
      {
        name: 'Premium',
        price: 75,
        period: 'one-time',
        description: 'Complete exam mastery',
        features: [
          'Full question bank (2,500+)',
          'Unlimited mock exams',
          'Advanced analytics',
          'Lifetime access',
          'Priority email support',
          'Direct analyst contact',
        ],
        cta: 'Get Started',
        href: '/signup?plan=premium',
        popular: false,
        perDay: '£0.83/day over 3 months',
      },
    ],
  }

  const comparisonFeatures = [
    { name: 'Practice Questions', trial: '100', basic: '2,000', premium: '2,500+' },
    { name: 'Mock Exams', trial: '1', basic: '5', premium: 'Unlimited' },
    { name: 'Flashcards', trial: true, basic: true, premium: true },
    { name: 'Performance Analytics', trial: 'Basic', basic: 'Standard', premium: 'Advanced' },
    { name: 'All 10 CFA L1 Topics', trial: true, basic: true, premium: true },
    { name: 'Detailed Explanations', trial: true, basic: true, premium: true },
    { name: 'Lifetime Access', trial: false, basic: true, premium: true },
    { name: 'Priority Support', trial: false, basic: false, premium: true },
    { name: 'Direct Analyst Contact', trial: false, basic: false, premium: true },
  ]

  const faqs = [
    {
      question: 'Can I upgrade later?',
      answer: 'Yes! You can upgrade from Basic to Premium at any time. We'll credit your original purchase toward the upgrade.',
    },
    {
      question: 'What's included in the free trial?',
      answer: 'The free trial gives you 24 hours of full access including 100 practice questions, 1 mock exam, and all flashcards. No credit card required.',
    },
    {
      question: 'Is there a refund policy?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you're not satisfied with AnalystTrainer, we'll refund your purchase—no questions asked.',
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
              <Link href="/signup" className="bg-[#1FB8CD] text-white px-5 py-2 rounded-lg hover:bg-[#1A6872] transition-all font-medium">
                Start Free Trial
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your CFA Level 1 preparation needs. Start with a free trial, upgrade anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-3">
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
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Free Trial</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Basic</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm text-gray-900">{feature.name}</td>
                      <td className="px-6 py-4 text-center text-sm">
                        {typeof feature.trial === 'boolean' ? (
                          feature.trial ? (
                            <svg className="w-5 h-5 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )
                        ) : (
                          <span className="text-gray-600">{feature.trial}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        {typeof feature.basic === 'boolean' ? (
                          feature.basic ? (
                            <svg className="w-5 h-5 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )
                        ) : (
                          <span className="text-gray-600">{feature.basic}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        {typeof feature.premium === 'boolean' ? (
                          feature.premium ? (
                            <svg className="w-5 h-5 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )
                        ) : (
                          <span className="text-gray-600">{feature.premium}</span>
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
            Join thousands of successful candidates. Start your free trial today.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-[#1FB8CD] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  )
}
