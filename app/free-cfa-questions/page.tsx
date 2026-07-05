import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import DemoQuestion from '@/components/DemoQuestion'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'

export const metadata: Metadata = {
  title: 'Free CFA Level 1 Practice Questions — 15 Demo Questions No Signup',
  description: 'Try 15 free CFA Level 1 practice questions instantly. No signup, no credit card. Written by charterholders with detailed explanations.',
  keywords: 'free CFA questions, free CFA Level 1 practice questions, free CFA practice test, CFA questions free, CFA Level 1 free questions, CFA sample questions free',
  alternates: {
    canonical: 'https://www.analysttrainer.com/free-cfa-questions',
  },
  openGraph: {
    title: 'Free CFA Level 1 Practice Questions — 15 Demo Questions',
    description: 'Try 15 free CFA Level 1 practice questions instantly. No signup needed.',
    url: 'https://www.analysttrainer.com/free-cfa-questions',
    type: 'website',
  },
}

export default function FreeCFAQuestions() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Free CFA Level 1 Demo Questions',
    description: '15 free CFA Level 1 practice questions with detailed explanations (no signup required)',
    brand: { '@type': 'Brand', name: 'AnalystTrainer' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'GBP',
      price: '0',
      availability: 'https://schema.org/InStock',
    },
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do I need to sign up to try free CFA questions?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No! Visit our demo page to practice 15 questions instantly with no signup required. To access more, choose a paid plan.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do free CFA questions include explanations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. Every free question includes the same detailed explanations as our paid content. We explain why the correct answer is right and why each incorrect option is wrong.',
        },
      },
      {
        '@type': 'Question',
        name: 'What topics do the free questions cover?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Free questions cover all 10 CFA Level 1 topic areas: Ethics, Quantitative Methods, Economics, Financial Statement Analysis, Corporate Issuers, Equity Investments, Fixed Income, Derivatives, Alternative Investments, and Portfolio Management.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are 15 free questions enough to pass?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While the demo showcases our question quality, most successful candidates practice between 1,500—3,000 questions. For comprehensive preparation, we recommend a paid plan.',
        },
      },
    ],
  }

  const plans = [
    {
      name: '2 Month',
      price: 25,
      period: 'one-time',
      perDay: '£0.42/day',
      features: ['2,000+ practice questions', 'Unlimited mock exams', 'Detailed explanations', 'Performance analytics'],
      href: '/signup?plan=2month',
      popular: false,
    },
    {
      name: '6 Month',
      price: 40,
      period: 'one-time',
      perDay: '£0.22/day',
      features: ['2,000+ practice questions', 'Unlimited mock exams', 'Detailed explanations', 'Performance analytics'],
      href: '/signup?plan=6month',
      popular: true,
    },
    {
      name: 'Lifetime',
      price: 70,
      period: 'one-time',
      perDay: 'Best value',
      features: ['2,000+ practice questions', 'Unlimited mock exams', 'Detailed explanations', 'Priority email support'],
      href: '/signup?plan=lifetime',
      popular: false,
    },
  ]

  const faqs = [
    {
      q: 'Do I need to sign up to try free CFA questions?',
      a: 'No — you can practice 15 questions instantly with no signup required. Visit the demo to start in 10 seconds.',
    },
    {
      q: 'Do free CFA questions include explanations?',
      a: 'Every free question includes the same detailed explanations as our paid content — why the correct answer is right and why each incorrect option is wrong.',
    },
    {
      q: 'What topics do the free questions cover?',
      a: 'Free questions span all 10 CFA Level 1 topic areas: Ethics, Quantitative Methods, Economics, Financial Statement Analysis, Corporate Issuers, Equity Investments, Fixed Income, Derivatives, Alternative Investments, and Portfolio Management.',
    },
    {
      q: 'Are 15 free questions enough to pass?',
      a: 'The 15-question demo is designed to showcase question quality. Most successful candidates practise 1,500—3,000 questions. For comprehensive prep, choose a paid plan.',
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen bg-white">
        <Navigation />

        <BreadcrumbSchema items={[
          { name: 'Home', url: '/' },
          { name: 'Free CFA Questions', url: '/free-cfa-questions' },
        ]} />

        {/* Breadcrumb Navigation */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <BreadcrumbNavigation
            items={[
              { name: 'Home', url: '/' },
              { name: 'Free Questions', url: '/free-cfa-questions' },
            ]}
          />
        </div>

        {/* Hero */}
        <section className="hero-section relative pt-24 pb-16 sm:pt-32 sm:pb-24 bg-gradient-to-b from-[#fbfaf4] to-white px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-normal tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Try 15 Free <span className="underline decoration-3 decoration-gray-900 underline-offset-4">CFA Level 1</span> Questions — <em>No Signup</em>
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-gray-600 mx-auto">
              Pick an answer below to see instant explanations. All 10 topics covered, written by charterholders.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center mb-10">
              <Link
                href="/try-free"
                className="pill-btn pill-btn-primary pill-btn-lg"
              >
                Start 15-Question Demo
              </Link>
              <Link
                href="/pricing"
                className="pill-btn pill-btn-secondary pill-btn-lg"
              >
                View Plans
              </Link>
            </div>
            <div className="flex justify-center mb-16">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-12 gap-y-4">
                <div>
                  <div className="text-2xl font-medium text-gray-900">15</div>
                  <div className="text-xs text-gray-600">Free Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-medium text-gray-900">10</div>
                  <div className="text-xs text-gray-600">Topics Covered</div>
                </div>
                <div>
                  <div className="text-2xl font-medium text-gray-900">Instantly</div>
                  <div className="text-xs text-gray-600">No Signup</div>
                </div>
                <div>
                  <div className="text-2xl font-medium text-gray-900">2,500+</div>
                  <div className="text-xs text-gray-600">With Upgrade</div>
                </div>
              </div>
            </div>
            {/* Interactive Demo */}
            <div className="max-w-2xl mx-auto">
              <DemoQuestion />
            </div>
            <p className="mt-6 text-base text-gray-500">
              This is one of 15 demo questions.{' '}
              <Link href="/try-free" className="font-medium text-[#1FB8CD] hover:text-gray-900 underline underline-offset-4 transition-colors">
                Try all 15 free →
              </Link>
            </p>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="px-4 py-24 sm:px-6 lg:px-8 bg-[#fbfaf4]">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900 mb-4">
                Upgrade to the Full Question Bank
              </h2>
              <p className="text-lg text-gray-600">
                Liked the demo? Unlock 2,500+ questions, unlimited mock exams, and detailed analytics.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-2xl bg-white p-8 shadow-sm border ${plan.popular ? 'border-2 border-green-500 relative' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="text-center pb-6 border-b border-gray-100">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-light text-gray-900">£{plan.price}</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{plan.period}</p>
                    <p className="mt-1 text-xs text-green-600 font-medium">{plan.perDay}</p>
                  </div>
                  <div className="py-6 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={plan.href}
                    className={`block w-full text-center py-3 rounded-full font-medium transition-colors ${
                      plan.popular
                        ? 'bg-[#1FB8CD] text-white hover:bg-[#18a3b5]'
                        : 'border-2 border-gray-200 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center text-xs text-gray-400">Secure payment via Stripe. All cards accepted.</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-medium tracking-tight text-center text-gray-900 mb-12">
              Free Questions FAQ
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details key={faq.q} className="group bg-gray-50 rounded-xl p-6">
                  <summary className="flex justify-between items-center cursor-pointer font-medium text-gray-900">
                    {faq.q}
                    <svg className="w-5 h-5 transition-transform group-open:rotate-180 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-gray-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-[#13343B]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-6">
              Ready to Try the Full Demo?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              15 questions. No signup. No credit card.
            </p>
            <Link
              href="/try-free"
              className="inline-block px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
            >
              Start Free Demo Now
            </Link>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 px-4 bg-gray-50 border-t">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-medium tracking-tight text-gray-900 mb-8 text-center">More CFA Level 1 Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/cfa-level-1-practice-questions" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Full Question Bank</h3>
                <p className="text-gray-600 text-sm">2,500+ CFA Level 1 practice questions with explanations</p>
              </Link>
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Full 180-question mock exams in real exam format</p>
              </Link>
              <Link href="/flashcards" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Free Flashcards</h3>
                <p className="text-gray-600 text-sm">1,600+ flashcards covering all CFA Level 1 topics</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
