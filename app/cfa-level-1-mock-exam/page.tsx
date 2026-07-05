import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'
import FloatingGetStartedButton from '../components/FloatingGetStartedButton'
import MockPreview from '@/components/MockPreview'

export const metadata: Metadata = {
  title: 'Free CFA Mock Exam 2026 — 180 Questions',
  description: 'Take a free CFA Level 1 mock exam with 180 questions. Timed sessions matching the real exam format. Try 5 sample mock questions instantly — no signup required.',
  keywords: 'cfa mock exam, cfa mock test, cfa exam practice, cfa practice exam, cfa level 1 mock exam, mock exam cfa, cfa practice test, cfa exam simulation, cfa mock questions',
  alternates: {
    canonical: 'https://www.analysttrainer.com/cfa-level-1-mock-exam',
  },
  openGraph: {
    title: 'CFA Mock Exam 2026 | 180 Questions | CFA Exam Prep',
    description: 'Full-length CFA mock exam. 180 questions, instant results, detailed explanations.',
    url: 'https://www.analysttrainer.com/cfa-level-1-mock-exam',
    type: 'website',
  },
}

export default function CFALevel1MockExam() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'CFA Level 1 Mock Exams',
    description: 'Realistic CFA Level 1 mock exams with 180 questions and detailed scoring',
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
        name: 'How do I access the CFA mock exam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To access the CFA Level 1 mock exam on AnalystTrainer: 1) Sign up for an account, 2) Navigate to "Mock Exams" from your dashboard, 3) Click "Start Mock Exam" to begin. Basic and Premium plans include multiple mock exams.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many mock exams should I take before CFA Level 1?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We recommend taking 4-6 mock exams before your CFA Level 1 exam. Start with your first mock 6-8 weeks before exam day, then take one mock every 1-2 weeks.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many mock exams are included?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Basic plan includes 5 mock exams. Premium plan includes unlimited mock exams for lifetime access.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long is each CFA Level 1 mock exam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Each mock exam contains 180 questions split into two sessions of 90 questions each. You have 2 hours 15 minutes per session, just like the real CFA exam.',
        },
      },
      {
        '@type': 'Question',
        name: 'What score do I need to pass the CFA Level 1 exam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The CFA Institute does not disclose the exact passing score, but it is estimated to be around 70% based on historical data. We recommend aiming for 75%+ on mock exams to build a comfortable margin.',
        },
      },
      {
        '@type': 'Question',
        name: 'When should I start taking mock exams?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We recommend taking your first mock exam 6-8 weeks before your exam date. Then take additional mocks every 1-2 weeks to track improvement and build stamina.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I take CFA mock exams on a computer or paper?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The CFA Level 1 exam is now computer-based, so we strongly recommend taking mock exams on a computer to match the actual exam experience.',
        },
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
        { name: 'CFA Level 1 Mock Exam', url: '/cfa-level-1-mock-exam' }
      ]} />

      <main className="min-h-screen bg-white">
        <Navigation />

        {/* Breadcrumb Navigation */}
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-4">
          <BreadcrumbNavigation
            items={[
              { name: 'Home', url: '/' },
              { name: 'Mock Exam', url: '/cfa-level-1-mock-exam' }
            ]}
          />
        </div>

        {/* ===== HERO ===== */}
        <section className="hero-section relative pt-24 pb-16 sm:pt-32 sm:pb-24 bg-gradient-to-b from-[#fbfaf4] to-white px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-normal tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Free CFA Level 1 <span className="underline decoration-3 decoration-gray-900 underline-offset-4">Mock Exam</span> — 180 Questions <em>Timed & Scored</em>
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-gray-600 mx-auto">
              Try 3 mock questions below — no signup needed. Timed, scored, with detailed explanations.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center mb-10">
              <Link
                href="/try-free"
                className="pill-btn pill-btn-primary pill-btn-lg"
              >
                Try Free Mock Now
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
                  <div className="text-2xl font-medium text-gray-900">180</div>
                  <div className="text-xs text-gray-600">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-medium text-gray-900">2h 15m</div>
                  <div className="text-xs text-gray-600">Per Session</div>
                </div>
                <div>
                  <div className="text-2xl font-medium text-gray-900">10</div>
                  <div className="text-xs text-gray-600">Topics Covered</div>
                </div>
                <div>
                  <div className="text-2xl font-medium text-gray-900">Unlimited</div>
                  <div className="text-xs text-gray-600">Mock Exams</div>
                </div>
              </div>
            </div>
            {/* Interactive Mock Preview — Centered Below */}
            <div className="max-w-2xl mx-auto">
              <MockPreview />
            </div>
          </div>
        </section>

        {/* ===== MOCK EXAM VS REAL EXAM ===== */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Mock Exam vs Real CFA Exam
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Our mock exam mirrors the real thing so there are no surprises on exam day.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border-2 border-[#1FB8CD] bg-[#1FB8CD]/5 overflow-hidden">
                <div className="bg-[#1FB8CD] px-6 py-4 text-center">
                  <h3 className="text-lg font-bold text-white">AnalystTrainer Mock Exam</h3>
                </div>
                <dl className="divide-y divide-[#1FB8CD]/20">
                  {[
                    { label: 'Number of Questions', value: '180' },
                    { label: 'Time Limit', value: '2h 15m per session' },
                    { label: 'Format', value: 'Computer-based, multiple choice' },
                    { label: 'Topic Coverage', value: 'All 10 topics, exam-weighted' },
                    { label: 'Scoring', value: 'Instant results with topic breakdown' },
                  ].map((row) => (
                    <div key={row.label} className="px-6 py-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-[#13343B]/60 mb-1">{row.label}</dt>
                      <dd className="flex items-start gap-2 text-gray-900 font-medium">
                        <svg className="w-5 h-5 flex-shrink-0 text-[#1FB8CD] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                <div className="bg-gray-100 px-6 py-4 text-center">
                  <h3 className="text-lg font-bold text-gray-900">CFA Level 1 Exam</h3>
                </div>
                <dl className="divide-y divide-gray-100">
                  {[
                    { label: 'Number of Questions', value: '180' },
                    { label: 'Time Limit', value: '2h 15m per session' },
                    { label: 'Format', value: 'Computer-based, multiple choice' },
                    { label: 'Topic Coverage', value: 'All 10 topics, exam-weighted' },
                    { label: 'Scoring', value: 'Results after exam window' },
                  ].map((row) => (
                    <div key={row.label} className="px-6 py-4">
                      <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">{row.label}</dt>
                      <dd className="text-gray-700 font-medium">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ===== HOW TO USE MOCK EXAMS ===== */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              How to Use Mock Exams
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Four simple steps to turn mock exams into real exam-day results.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <div className="w-11 h-11 bg-[#1FB8CD] text-white rounded-xl flex items-center justify-center font-bold text-lg mb-4">1</div>
                <h3 className="font-semibold text-gray-900 mb-2">Take a baseline mock</h3>
                <p className="text-gray-600 text-sm">Around 8 weeks out, sit a full mock under real conditions — timed, no pausing, no notes — to see where you stand.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <div className="w-11 h-11 bg-[#1FB8CD] text-white rounded-xl flex items-center justify-center font-bold text-lg mb-4">2</div>
                <h3 className="font-semibold text-gray-900 mb-2">Review every question</h3>
                <p className="text-gray-600 text-sm">Go through each answer — including the ones you got right — and note the concepts you need to revisit.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <div className="w-11 h-11 bg-[#1FB8CD] text-white rounded-xl flex items-center justify-center font-bold text-lg mb-4">3</div>
                <h3 className="font-semibold text-gray-900 mb-2">Target weak areas</h3>
                <p className="text-gray-600 text-sm">Identify your lowest-scoring topics, study them, then take another mock every 1-2 weeks to measure improvement.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <div className="w-11 h-11 bg-[#1FB8CD] text-white rounded-xl flex items-center justify-center font-bold text-lg mb-4">4</div>
                <h3 className="font-semibold text-gray-900 mb-2">Final mock, 1 week out</h3>
                <p className="text-gray-600 text-sm">Sit one last full mock to lock in timing and build confidence. Review only your weak spots before exam day.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHAT YOUR SCORE MEANS ===== */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              What Your Score Means
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Target 70%+ on our mocks. Most candidates who score 65%+ pass the real exam.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-red-400">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Below 50%</h3>
                <p className="text-gray-600 text-sm">Significant concept gaps. Focus on understanding core material before more mocks. Use topic-based practice questions.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-yellow-400">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">50-65%</h3>
                <p className="text-gray-600 text-sm">Making progress but need more work. Target weak topics and keep practicing. Schedule regular mocks to track improvement.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-400">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">65-75%</h3>
                <p className="text-gray-600 text-sm">Good shape. The estimated pass mark is ~70%. Focus on turning weak areas into strengths and keep building consistency.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-400">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Above 75%</h3>
                <p className="text-gray-600 text-sm">Excellent. Maintain your routine, review weak spots, and build time management confidence with full-length mocks.</p>
              </div>
            </div>
            <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
              <p className="text-gray-700 text-center">
                <strong>Note:</strong> Mock scores are indicators, not guarantees. The actual CFA exam may feel different under pressure. Aim to score consistently above 70% to build a comfortable margin.
              </p>
            </div>
          </div>
        </section>

        {/* ===== PRICING OVERVIEW ===== */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Start free, upgrade when you&apos;re ready.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Free</h3>
                <p className="text-3xl font-bold text-gray-900 mb-4">£0</p>
                <p className="text-gray-600 text-sm mb-6">Try 5 mock questions and see what a full exam feels like.</p>
                <Link href="/try-free" className="block w-full px-4 py-3 border-2 border-[#1FB8CD] text-[#1FB8CD] rounded-full font-semibold hover:bg-[#1FB8CD] hover:text-white transition-colors">
                  Try Free
                </Link>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-md border-2 border-[#1FB8CD] relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#1FB8CD] text-white text-xs font-semibold rounded-full">Popular</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium</h3>
                <p className="text-3xl font-bold text-gray-900 mb-1">£40</p>
                <p className="text-gray-600 text-sm mb-6">Unlimited mock exams, 2,500+ questions, lifetime access.</p>
                <Link href="/signup" className="block w-full px-4 py-3 bg-[#1FB8CD] text-white rounded-full font-semibold hover:bg-[#18a3b5] transition-colors">
                  Get Premium
                </Link>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic</h3>
                <p className="text-3xl font-bold text-gray-900 mb-4">£25</p>
                <p className="text-gray-600 text-sm mb-6">5 mock exams and 1,500 questions. Good for targeted practice.</p>
                <Link href="/signup" className="block w-full px-4 py-3 border-2 border-[#1FB8CD] text-[#1FB8CD] rounded-full font-semibold hover:bg-[#1FB8CD] hover:text-white transition-colors">
                  Get Basic
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-20 px-4 bg-[#13343B]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Test Yourself?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Try 3 mock questions free — no credit card needed.
            </p>
            <Link
              href="/try-free"
              className="inline-block px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
            >
              Try Free Mock Exam Now
            </Link>
            <p className="mt-4 text-gray-400 text-sm">Already a member? <Link href="/login" className="text-[#1FB8CD] hover:underline">Log in</Link></p>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Mock Exam FAQs
            </h2>
            <div className="space-y-4">
              {[
                { q: 'How to access CFA mock exam?', a: 'Sign up for an account, navigate to "Mock Exams" from your dashboard, and click "Start Mock Exam." Basic and Premium plans include multiple mock exams.' },
                { q: 'How many mock exams should I take before CFA Level 1?', a: 'We recommend 4-6 mock exams. Start 6-8 weeks before exam day and take one every 1-2 weeks. This lets you review results, strengthen weak areas, and track improvement.' },
                { q: 'How many mock exams are included?', a: 'Basic plan includes 5 mock exams. Premium plan includes unlimited mock exams for lifetime access.' },
                { q: 'How long is each mock exam?', a: '180 questions split into two sessions of 90 questions each. You have 2 hours 15 minutes per session — the same as the real CFA exam.' },
                { q: 'Can I pause and resume a mock exam?', a: 'Yes, your progress is saved automatically. However, we recommend completing each session in one sitting to simulate real exam conditions.' },
                { q: 'What score do I need to pass?', a: 'The passing score is estimated to be around 70% based on historical data. Aim for 75%+ on mocks to build a comfortable margin.' },
                { q: 'Are mock questions different from practice questions?', a: 'Mock exams use the same question bank but arranged in the real exam format and topic weighting. They test your ability under timed conditions across all topics.' },
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
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">More CFA Level 1 Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/cfa-level-1-practice-questions" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Practice Questions</h3>
                <p className="text-gray-600 text-sm">2,500+ CFA Level 1 practice questions with explanations</p>
              </Link>
              <Link href="/free-cfa-questions" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Free Questions</h3>
                <p className="text-gray-600 text-sm">15 free demo questions - no signup required</p>
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
                  <li><Link href="/free-cfa-questions" className="hover:text-gray-900">Free Questions</Link></li>
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
