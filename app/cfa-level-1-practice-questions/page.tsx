import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import BreadcrumbSchema, { BreadcrumbNavigation } from '@/components/BreadcrumbSchema'
import FloatingGetStartedButton from '../components/FloatingGetStartedButton'
import DemoQuestion from '@/components/DemoQuestion'

export const metadata: Metadata = {
  title: 'CFA Level 1 Question Bank 2026 | 2,500+ Practice Questions & Answers',
  description: 'Free CFA Level 1 question bank for 2026. Practise 2,500+ exam-style questions with detailed answers. Try a sample question instantly — no signup needed.',
  keywords: 'cfa practice questions, cfa exam practice questions, cfa level 1 practice questions, cfa sample questions, cfa practice test, cfa level 1 questions, cfa exam questions with answers, cfa mock exam questions',
  alternates: {
    canonical: 'https://www.analysttrainer.com/cfa-level-1-practice-questions',
  },
  openGraph: {
    title: '2,500+ CFA Practice Questions 2026 | CFA Exam Prep',
    description: '2,500+ CFA practice questions covering all 10 CFA Level 1 topics. Detailed explanations, instant feedback.',
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
        <section className="bg-gradient-to-b from-[#13343B] to-[#1a4a54] text-white pt-28 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-[#1FB8CD]/20 rounded-full text-[#1FB8CD] text-sm font-medium mb-6">
              Try a Real CFA Question — No Signup Needed
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              CFA Level 1 Question Bank 2026
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              2,500+ exam-style questions. Pick an answer below to see how it works.
            </p>

            {/* Interactive demo — the entire hero centres on this */}
            <div className="mb-6">
              <DemoQuestion />
            </div>

            <p className="text-lg text-gray-200 mb-8">
              Want 2,500 more?{' '}
              <Link href="/try-free" className="font-semibold text-[#1FB8CD] hover:text-white underline underline-offset-4 transition-colors">
                Try 15 free questions now →
              </Link>
            </p>

            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>2,500+ Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span>Detailed Explanations</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>All 10 Topics</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                </svg>
                <span>Performance Analytics</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== TOPIC COVERAGE ===== */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
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

        {/* ===== PRICING OVERVIEW ===== */}
        <section className="py-20 px-4 bg-gray-50">
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
                <p className="text-gray-600 text-sm mb-6">Try 15 sample questions and get a feel for our question bank.</p>
                <Link href="/try-free" className="block w-full px-4 py-3 border-2 border-[#1FB8CD] text-[#1FB8CD] rounded-full font-semibold hover:bg-[#1FB8CD] hover:text-white transition-colors">
                  Try Free
                </Link>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-md border-2 border-[#1FB8CD] relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#1FB8CD] text-white text-xs font-semibold rounded-full">Popular</span>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium</h3>
                <p className="text-3xl font-bold text-gray-900 mb-1">£40</p>
                <p className="text-gray-600 text-sm mb-6">Full access to 2,500+ questions, mock exams, and analytics.</p>
                <Link href="/signup" className="block w-full px-4 py-3 bg-[#1FB8CD] text-white rounded-full font-semibold hover:bg-[#18a3b5] transition-colors">
                  Get Premium
                </Link>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Basic</h3>
                <p className="text-3xl font-bold text-gray-900 mb-4">£25</p>
                <p className="text-gray-600 text-sm mb-6">1,500 questions across select topics. Good for targeted practice.</p>
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
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">More CFA Level 1 Resources</h2>
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
