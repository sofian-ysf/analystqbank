import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'
import FloatingGetStartedButton from '../components/FloatingGetStartedButton'
import DemoQuestion from '@/components/DemoQuestion'

export const metadata: Metadata = {
  title: 'CFA Level 1 Practice Questions 2026 | 2,500+ Qbank by Charterholders',
  description: '2,500+ CFA Level 1 practice questions written by charterholders. Covers all 10 topics with detailed explanations. Try a sample question instantly — no signup needed.',
  keywords: 'cfa practice questions, cfa exam practice questions, cfa level 1 practice questions, cfa sample questions, cfa practice test, cfa level 1 questions, cfa exam questions with answers, cfa mock exam questions',
  alternates: {
    canonical: 'https://www.analysttrainer.com/cfa-level-1-practice-questions',
  },
  openGraph: {
    title: 'CFA Level 1 Practice Questions 2026 | 2,500+ Qbank by Charterholders',
    description: '2,500+ CFA practice questions covering all 10 CFA Level 1 topics, written by charterholders. Detailed explanations, instant feedback.',
    url: 'https://www.analysttrainer.com/cfa-level-1-practice-questions',
    type: 'website',
  },
}

const topics = [
  { name: 'Ethical & Professional Standards', slug: 'ethical-professional-standards', questions: 250, weight: '15-20%' },
  { name: 'Quantitative Methods', slug: 'quantitative-methods', questions: 200, weight: '6-9%' },
  { name: 'Economics', slug: 'economics', questions: 200, weight: '6-9%' },
  { name: 'Financial Statement Analysis', slug: 'financial-statement-analysis', questions: 350, weight: '11-14%' },
  { name: 'Corporate Issuers', slug: 'corporate-issuers', questions: 200, weight: '6-9%' },
  { name: 'Equity Investments', slug: 'equity-investments', questions: 300, weight: '11-14%' },
  { name: 'Fixed Income', slug: 'fixed-income', questions: 300, weight: '11-14%' },
  { name: 'Derivatives', slug: 'derivatives', questions: 200, weight: '5-8%' },
  { name: 'Alternative Investments', slug: 'alternative-investments', questions: 150, weight: '5-8%' },
  { name: 'Portfolio Management', slug: 'portfolio-management', questions: 350, weight: '8-12%' },
]

export default function CFALevel1PracticeQuestions() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'CFA Level 1 Practice Questions',
    description: '2,500+ CFA Level 1 practice questions with detailed explanations',
    brand: { '@type': 'Brand', name: 'AnalystTrainer' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'GBP',
      lowPrice: '0',
      highPrice: '75',
      offerCount: '3',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many CFA Level 1 practice questions are included?',
        acceptedAnswer: { '@type': 'Answer', text: 'Our question bank includes over 2,500 CFA Level 1 practice questions covering all 10 topic areas. Questions are regularly updated to reflect the latest CFA curriculum.' },
      },
      {
        '@type': 'Question',
        name: 'Are the questions similar to the actual CFA exam?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes! Our questions are written to mirror the actual CFA Level 1 exam format, difficulty level, and topic weighting. Many candidates report our questions are slightly harder than the actual exam, which helps them feel more prepared.' },
      },
      {
        '@type': 'Question',
        name: 'Do practice questions include explanations?',
        acceptedAnswer: { '@type': 'Answer', text: 'Every single question includes a detailed explanation showing why the correct answer is right and why the other options are incorrect. This helps you learn from mistakes and understand the underlying concepts.' },
      },
      {
        '@type': 'Question',
        name: 'Can I try CFA Level 1 questions for free?',
        acceptedAnswer: { '@type': 'Answer', text: 'Yes! You can try a sample question instantly on this page — no signup required. Use the interactive demo above to experience our question quality firsthand.' },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'CFA Level 1 Practice Questions', url: '/cfa-level-1-practice-questions' }
      ]} />

      <main className="min-h-screen bg-white">
        <Navigation />

        {/* Breadcrumb Navigation */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <BreadcrumbNavigation
            items={[
              { name: 'Home', url: '/' },
              { name: 'Practice Questions', url: '/cfa-level-1-practice-questions' }
            ]}
          />
        </div>

        {/* ===== HERO ===== */}
        <section className="hero-section relative pt-24 pb-16 sm:pt-32 sm:pb-24 bg-gradient-to-b from-[#fbfaf4] to-white px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-normal tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              CFA Level 1 <span className="underline decoration-3 decoration-gray-900 underline-offset-4">Question Bank</span> 2026 — <em>2,500+ Questions</em> by Charterholders
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-gray-600 mx-auto">
              Try a real question below — no signup needed. Pick an answer and see instant explanations.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center mb-10">
              <Link
                href="/try-free"
                className="pill-btn pill-btn-primary pill-btn-lg"
              >
                Try 15 Free Questions
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
                  <div className="text-2xl font-medium text-gray-900">2,500+</div>
                  <div className="text-xs text-gray-600">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-medium text-gray-900">10</div>
                  <div className="text-xs text-gray-600">Topic Areas</div>
                </div>
                <div>
                  <div className="text-2xl font-medium text-gray-900">1,600+</div>
                  <div className="text-xs text-gray-600">Flashcards</div>
                </div>
                <div>
                  <div className="text-2xl font-medium text-gray-900">Lifetime</div>
                  <div className="text-xs text-gray-600">Access</div>
                </div>
              </div>
            </div>
            {/* Interactive Demo — Centered Below */}
            <div className="max-w-2xl mx-auto">
              <DemoQuestion />
            </div>
            <p className="mt-6 text-base text-gray-500">
              Want 2,500 more?{' '}
              <Link href="/try-free" className="font-medium text-[#1FB8CD] hover:text-gray-900 underline underline-offset-4 transition-colors">
                Try 15 free demo questions →
              </Link>
            </p>
          </div>
        </section>

        {/* ===== TOPIC COVERAGE ===== */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-center text-gray-900 mb-4">
              All 10 CFA Level 1 Topics
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Questions weighted to match the actual exam, so you spend time on what matters.
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {topics.map((topic) => (
                <Link
                  key={topic.name}
                  href={`/topics/${topic.slug}`}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-transparent hover:border-[#1FB8CD] hover:bg-white transition-colors group"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#1FB8CD]">{topic.name}</h3>
                    <p className="text-sm text-gray-500">{topic.questions}+ questions</p>
                  </div>
                  <span className="px-3 py-1 bg-[#1FB8CD]/10 text-[#1FB8CD] rounded-full text-sm font-medium">
                    {topic.weight}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PRICING ===== */}
        <section id="pricing" className="px-4 py-24 sm:px-6 lg:px-8 bg-[#fbfaf4]">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-900 mb-4">
                Choose Your Plan
              </h2>
              <p className="text-lg text-gray-600">
                Try 15 free demo questions at{' '}
                <a href="https://www.analysttrainer.com/try-free" className="text-[#1FB8CD] hover:underline font-medium">
                  analysttrainer.com/try-free
                </a>
                . Choose your plan when you're ready.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* 2 Month */}
              <div className="rounded-2xl bg-white p-8 shadow-sm border">
                <div className="text-center pb-6 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">2 Month</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-light text-gray-900">£25</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">one-time</p>
                  <p className="mt-1 text-xs text-green-600 font-medium">£0.42/day</p>
                </div>
                <div className="py-6 space-y-3">
                  {['2,000+ practice questions', 'Unlimited mock exams', 'Detailed explanations', 'Performance analytics'].map((feature) => (
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
                <Link href="/signup?plan=2month" className="block w-full text-center py-3 border-2 border-gray-200 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-colors">
                  Get Started
                </Link>
              </div>

              {/* 6 Month — Most Popular */}
              <div className="rounded-2xl bg-white p-8 shadow-md border-2 border-green-500 relative">
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
                  {['2,000+ practice questions', 'Unlimited mock exams', 'Detailed explanations', 'Performance analytics'].map((feature) => (
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
                <Link href="/signup?plan=6month" className="block w-full text-center py-3 bg-[#1FB8CD] text-white rounded-full font-semibold hover:bg-[#18a3b5] transition-colors">
                  Get Started
                </Link>
              </div>

              {/* Lifetime — Best Value */}
              <div className="rounded-2xl bg-white p-8 shadow-sm border">
                <div className="text-center pb-6 border-b border-gray-100">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Lifetime</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-light text-gray-900">£70</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">one-time</p>
                  <p className="mt-1 text-xs text-green-600 font-medium">Best value</p>
                </div>
                <div className="py-6 space-y-3">
                  {['2,000+ practice questions', 'Unlimited mock exams', 'Detailed explanations', 'Priority email support'].map((feature) => (
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
                <Link href="/signup?plan=lifetime" className="block w-full text-center py-3 border-2 border-gray-200 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-colors">
                  Get Started
                </Link>
              </div>
            </div>

            <p className="mt-8 text-center text-xs text-gray-400">
              Secure payment via Stripe. All cards accepted.
            </p>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-20 px-4 bg-[#13343B]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-6">
              Ready to Practise 2,500+ Questions?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Try 15 questions free — no credit card needed.
            </p>
            <Link
              href="/try-free"
              className="inline-block px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
            >
              Try Free Now — No Credit Card
            </Link>
            <p className="mt-4 text-gray-400 text-sm">Already a member? <Link href="/login" className="text-[#1FB8CD] hover:underline">Log in</Link></p>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-medium tracking-tight text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                { q: 'How many CFA Level 1 practice questions are included?', a: 'Our question bank includes over 2,500 CFA Level 1 practice questions covering all 10 topic areas. Questions are regularly updated to reflect the latest CFA curriculum.' },
                { q: 'Are the questions similar to the actual CFA exam?', a: 'Yes! Our questions mirror the actual CFA Level 1 exam format, difficulty, and topic weighting. Many candidates find our questions slightly harder than the real exam, which better prepares them.' },
                { q: 'Do practice questions include explanations?', a: 'Every question includes a detailed explanation — why the correct answer is right and why each incorrect option is wrong. This helps you learn from mistakes and understand the underlying concepts.' },
                { q: 'Can I try CFA Level 1 questions for free?', a: 'Yes! Try a sample question on this page right now — no signup required. When you\'re ready, access 15 more free demo questions and see our full question bank.' },
              ].map((faq, i) => (
                <details key={i} className="group bg-gray-50 rounded-xl p-6">
                  <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
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

        {/* ===== RELATED RESOURCES ===== */}
        <section className="py-16 px-4 bg-gray-50 border-t">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-medium tracking-tight text-gray-900 mb-8 text-center">More CFA Level 1 Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Full 180-question mock exams in real exam format</p>
              </Link>
              <Link href="/free-cfa-questions" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Try Demo Questions</h3>
                <p className="text-gray-600 text-sm">15 free demo questions — no signup required</p>
              </Link>
              <Link href="/flashcards" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Free Flashcards</h3>
                <p className="text-gray-600 text-sm">1,600+ flashcards covering all CFA Level 1 topics</p>
              </Link>
            </div>
          </div>
        </section>

        {/* ===== FOOTER ===== */}
        <footer className="border-t border-gray-200 bg-white px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <Link href="/" className="text-xl font-bold text-gray-900">AnalystTrainer</Link>
                <p className="mt-4 text-sm text-gray-600">The leading platform for CFA Level 1 exam preparation.</p>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-gray-900">Product</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link href="/cfa-level-1-practice-questions" className="hover:text-gray-900">Practice Questions</Link></li>
                  <li><Link href="/cfa-level-1-mock-exam" className="hover:text-gray-900">Mock Exams</Link></li>
                  <li><Link href="/flashcards" className="hover:text-gray-900">Free Flashcards</Link></li>
                  <li><Link href="/pricing" className="hover:text-gray-900">Pricing</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 font-semibold text-gray-900">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link href="/blog" className="hover:text-gray-900">Blog</Link></li>
                  <li><Link href="/topics" className="hover:text-gray-900">Study Topics</Link></li>
                  <li><Link href="/try-free" className="hover:text-gray-900">Free Demo</Link></li>
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

        <FloatingGetStartedButton />
      </main>
    </>
  )
}
