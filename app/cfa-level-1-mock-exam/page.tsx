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
          text: 'We recommend taking 4-6 mock exams before your CFA Level 1 exam. Start with your first mock 6-8 weeks before exam day to establish a baseline, then take one mock every 1-2 weeks. This schedule allows time to review results, strengthen weak areas, and track improvement. More mock exams generally lead to better exam-day performance.',
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
          text: 'We recommend taking your first mock exam 6-8 weeks before your exam date to establish a baseline. Then take additional mocks every 1-2 weeks to track improvement and build stamina.',
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

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#13343B] to-[#1a4a54] text-white pt-28 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-[#1FB8CD]/20 rounded-full text-[#1FB8CD] text-sm font-medium mb-6">
              Free Mock Exam — Updated for 2026
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Free CFA Level 1 Mock Exam 2026 — 180 Questions
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Experience the real CFA exam with our <strong className="text-white">180-question mock test</strong>. Timed sessions, realistic difficulty, and comprehensive score reports. Start your mock exam today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/try-free"
                className="px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
              >
                Try Free Now — No Credit Card
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                View All Plans
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>180 Questions Per Exam</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Timed Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Detailed Scoring</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Topic Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>No Signup Required</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mock Exam vs Real CFA Exam */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Mock Exam vs Real CFA Exam
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Our mock exam mirrors the real thing so there are no surprises on exam day.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AnalystTrainer column */}
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

              {/* Real CFA exam column */}
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

        {/* Exam Structure */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Mock Exam Structure
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Session 1</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#1FB8CD]/10 rounded-lg flex items-center justify-center text-[#1FB8CD] font-semibold">90</span>
                    <span className="text-gray-700">Questions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#1FB8CD]/10 rounded-lg flex items-center justify-center text-[#1FB8CD] font-semibold">2h</span>
                    <span className="text-gray-700">15 minutes time limit</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#1FB8CD]/10 rounded-lg flex items-center justify-center text-[#1FB8CD] font-semibold">5</span>
                    <span className="text-gray-700">Topic areas covered</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Session 2</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#1FB8CD]/10 rounded-lg flex items-center justify-center text-[#1FB8CD] font-semibold">90</span>
                    <span className="text-gray-700">Questions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#1FB8CD]/10 rounded-lg flex items-center justify-center text-[#1FB8CD] font-semibold">2h</span>
                    <span className="text-gray-700">15 minutes time limit</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-[#1FB8CD]/10 rounded-lg flex items-center justify-center text-[#1FB8CD] font-semibold">5</span>
                    <span className="text-gray-700">Topic areas covered</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How & When to Use Mock Exams — condensed */}
        <section className="py-20 px-4 bg-white">
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
                <h3 className="font-semibold text-gray-900 mb-2">Target weak areas &amp; retest</h3>
                <p className="text-gray-600 text-sm">Study your lowest-scoring topics, then take another mock every 1–2 weeks to measure improvement.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <div className="w-11 h-11 bg-[#1FB8CD] text-white rounded-xl flex items-center justify-center font-bold text-lg mb-4">4</div>
                <h3 className="font-semibold text-gray-900 mb-2">Final mock, 1 week out</h3>
                <p className="text-gray-600 text-sm">Sit one last full mock to lock in timing and build confidence, then review only your weak spots before exam day.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Mock Preview — try a mock question */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Try a Mock Question
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Feel the pressure of the clock. Answer these three exam-style questions, then submit to see the correct answers and explanations.
            </p>
            <MockPreview />
          </div>
        </section>

        {/* What Your Score Means */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              What Your CFA Mock Exam Score Means
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Understanding how to interpret your mock exam results helps you plan your remaining study time effectively.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-red-400">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Below 50%</h3>
                <p className="text-gray-600 text-sm">You have significant gaps in your knowledge. Focus on understanding core concepts before taking more mocks. Review study materials and use topic-based practice questions.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-yellow-400">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">50-65%</h3>
                <p className="text-gray-600 text-sm">You are making progress but need more work. Identify your weakest topics and dedicate extra time to them. Continue with regular practice questions alongside periodic mocks.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-400">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">65-75%</h3>
                <p className="text-gray-600 text-sm">You are in good shape but should not get complacent. The CFA Institute does not publish exact passing scores, but historically they have been around 70%. Focus on turning weak areas into strengths.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-400">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Above 75%</h3>
                <p className="text-gray-600 text-sm">Excellent work! Maintain your study habits and continue with regular review. Focus on any remaining weak topics and ensure you are comfortable with time management.</p>
              </div>
            </div>
            <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
              <p className="text-gray-700 text-center">
                <strong>Important:</strong> Mock exam scores are indicators, not guarantees. The actual CFA exam may feel different due to exam-day nerves. Aim to score consistently above 70% on mocks to build a comfortable margin.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-[#13343B]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Test Yourself?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Take your first CFA Level 1 mock exam today and see where you stand.
            </p>
            <Link
              href="/try-free"
              className="inline-block px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
            >
              Try Free Mock Exam Now
            </Link>
            <p className="mt-4 text-gray-400 text-sm">Try 5 mock questions free — no signup required.</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Mock Exam FAQs
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How to access CFA mock exam?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">To access the CFA Level 1 mock exam on AnalystTrainer: 1) Sign up for an account, 2) Navigate to "Mock Exams" from your dashboard, 3) Click "Start Mock Exam" to begin. Basic and Premium plans include multiple mock exams.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How many mock exams should I take before CFA Level 1?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">We recommend taking 4-6 mock exams before your CFA Level 1 exam. Start with your first mock 6-8 weeks before exam day to establish a baseline, then take one mock every 1-2 weeks. This schedule allows time to review results, strengthen weak areas, and track improvement. More mock exams generally lead to better exam-day performance.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How many mock exams are included?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Basic plan includes 5 mock exams. Premium plan includes unlimited mock exams for lifetime access.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How long is each mock exam?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Each mock exam contains 180 questions split into two sessions of 90 questions each. You have 2 hours 15 minutes per session, just like the real CFA exam.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Can I pause and resume a mock exam?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Yes, you can save your progress and return later. However, we recommend completing each session in one sitting to simulate real exam conditions and build stamina.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  When should I start taking mock exams?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">We recommend taking your first mock exam 6-8 weeks before your exam date to establish a baseline. Then take additional mocks every 1-2 weeks to track improvement and build stamina.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  What score do I need to pass the CFA Level 1 exam?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">The CFA Institute does not disclose the exact passing score, but it is estimated to be around 70% based on historical data. The passing score is set using a Modified Angoff method and may vary slightly each exam window. We recommend aiming for 75%+ on mock exams to build a comfortable margin.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Are mock exam questions different from practice questions?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Mock exam questions are drawn from the same question bank as our practice questions, but they are assembled in the exact format and topic weighting of the real CFA exam. Mock exams test your ability to perform under timed conditions across all topics, while practice questions let you focus on specific areas.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Should I take mock exams on a computer or paper?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">The CFA Level 1 exam is now computer-based, so we strongly recommend taking mock exams on a computer to match the actual exam experience. Our platform is designed to simulate the computer-based testing interface used by the CFA Institute.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How do I improve my mock exam scores?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">The key is thorough review. After each mock, spend 2-3 hours reviewing every question. Identify topics where you scored below 70% and dedicate extra study time to those areas. Use practice questions to strengthen weak topics before your next mock. Consistent improvement comes from this cycle of test, review, and targeted study.</p>
              </details>
            </div>
          </div>
        </section>

        {/* Related Resources */}
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

        {/* Internal Linking - Practice Questions Promotion */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-[#1FB8CD] rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    Build Your Foundation with Daily Practice
                  </h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Mock exams test your readiness, but consistent practice builds the knowledge you need to pass. Our 2,500+ practice questions cover every CFA Level 1 topic with detailed explanations.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">2,500+ Questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">All 10 Topics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Instant Feedback</span>
                    </div>
                  </div>
                  <Link
                    href="/cfa-level-1-practice-questions"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1FB8CD] text-white rounded-lg font-semibold hover:bg-[#18a3b5] transition-colors"
                  >
                    Start Practicing Free
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <Link href="/" className="text-xl font-bold text-gray-900">AnalystTrainer</Link>
                <p className="mt-4 text-sm text-gray-600">
                  The leading platform for CFA Level 1 exam preparation.
                </p>
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
