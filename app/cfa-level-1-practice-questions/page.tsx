import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navigation from '../components/Navigation'
import { PassGuaranteeCompact } from '@/components/PassGuarantee'

export const metadata: Metadata = {
  title: 'CFA Level 1 Practice Questions (2026) - 2,500+ With Answers',
  description: 'Pass CFA Level 1 first time with 2,500+ practice questions written by charterholders. Detailed explanations for every answer. Try 100 questions FREE — no credit card.',
  keywords: 'CFA Level 1 practice questions, CFA practice questions, CFA Level 1 questions, CFA question bank, CFA exam questions, CFA Level 1 practice test, CFA Level 1 sample questions, CFA questions with answers',
  alternates: {
    canonical: 'https://www.analysttrainer.com/cfa-level-1-practice-questions',
  },
  openGraph: {
    title: 'CFA Level 1 Practice Questions (2026) - 2,500+ With Answers',
    description: 'Pass CFA Level 1 first time. 2,500+ practice questions written by charterholders with step-by-step explanations. Try 100 FREE.',
    url: 'https://www.analysttrainer.com/cfa-level-1-practice-questions',
    type: 'website',
  },
}

const topics = [
  { name: 'Ethical & Professional Standards', questions: 250, weight: '15-20%' },
  { name: 'Quantitative Methods', questions: 200, weight: '6-9%' },
  { name: 'Economics', questions: 200, weight: '6-9%' },
  { name: 'Financial Statement Analysis', questions: 350, weight: '11-14%' },
  { name: 'Corporate Issuers', questions: 200, weight: '6-9%' },
  { name: 'Equity Investments', questions: 300, weight: '11-14%' },
  { name: 'Fixed Income', questions: 300, weight: '11-14%' },
  { name: 'Derivatives', questions: 200, weight: '5-8%' },
  { name: 'Alternative Investments', questions: 150, weight: '5-8%' },
  { name: 'Portfolio Management', questions: 350, weight: '8-12%' },
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many CFA Level 1 practice questions are included?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our question bank includes over 2,500 CFA Level 1 practice questions covering all 10 topic areas. Questions are regularly updated to reflect the latest CFA curriculum.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are the questions similar to the actual CFA exam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our questions are written to mirror the actual CFA Level 1 exam format, difficulty level, and topic weighting. Many candidates report our questions are slightly harder than the actual exam, which helps them feel more prepared.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do practice questions include explanations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every single question includes a detailed explanation showing why the correct answer is right and why the other options are incorrect. This helps you learn from mistakes and understand the underlying concepts.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many practice questions should I do before the CFA exam?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most successful candidates complete between 1,500 and 3,000 practice questions during their preparation. We recommend doing at least 150-200 questions per topic area.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the pass rate for CFA Level 1?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The CFA Level 1 pass rate typically ranges between 35% and 45%. Candidates who use structured practice questions and mock exams consistently outperform those who only read study materials.',
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

      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#13343B] to-[#1a4a54] text-white pt-28 pb-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-[#1FB8CD]/20 rounded-full text-[#1FB8CD] text-sm font-medium mb-6">
              Updated for 2026 CFA Exam
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              CFA Level 1 Practice Questions
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Master the CFA Level 1 exam with <strong className="text-white">2,500+ practice questions</strong> covering all 10 topic areas. Detailed explanations for every question.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/signup"
                className="px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
              >
                Start Free Trial - No Card Required
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                View Pricing
              </Link>
            </div>
            <div className="flex justify-center mb-12">
              <PassGuaranteeCompact />
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>2,500+ Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Performance Analytics</span>
              </div>
            </div>
          </div>
        </section>

        {/* Why Practice Questions Matter */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Why CFA Level 1 Practice Questions Are Essential
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              The CFA Level 1 exam tests your ability to apply knowledge under pressure. Practice questions are the most effective way to prepare.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-[#1FB8CD]/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Exam-Realistic Format</h3>
                <p className="text-gray-600">Our questions mirror the actual CFA exam format, difficulty, and topic weighting so you know exactly what to expect.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-[#1FB8CD]/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Learn from Mistakes</h3>
                <p className="text-gray-600">Every question includes a detailed explanation showing exactly why the correct answer is right and others are wrong.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="w-12 h-12 bg-[#1FB8CD]/10 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Your Progress</h3>
                <p className="text-gray-600">Identify weak areas with our performance analytics and focus your study time where it matters most.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Topic Coverage */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Complete CFA Level 1 Topic Coverage
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Our question bank covers all 10 CFA Level 1 topic areas with questions weighted to match the actual exam.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {topics.map((topic) => (
                <div key={topic.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h3 className="font-semibold text-gray-900">{topic.name}</h3>
                    <p className="text-sm text-gray-500">{topic.questions}+ questions</p>
                  </div>
                  <span className="px-3 py-1 bg-[#1FB8CD]/10 text-[#1FB8CD] rounded-full text-sm font-medium">
                    {topic.weight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Study Effectively */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              How to Use CFA Level 1 Practice Questions Effectively
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Simply answering questions is not enough. Here is how top-scoring candidates use practice questions to maximise their study efficiency.
            </p>
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">The Three-Phase Approach</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#1FB8CD] text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Learn First, Then Practice</h4>
                      <p className="text-gray-600">Read through a topic in your study materials before attempting questions. Blind practice without understanding the concepts leads to memorising answers rather than building knowledge.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#1FB8CD] text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Review Every Explanation</h4>
                      <p className="text-gray-600">Even when you get a question right, read the full explanation. You might have chosen correctly for the wrong reasons, or there may be additional insights that deepen your understanding.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-[#1FB8CD] text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Track and Target Weak Areas</h4>
                      <p className="text-gray-600">Use our analytics to identify topics where you score below 70%. Spend extra time reviewing these areas and return to practice them again until your scores improve.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Common Mistakes to Avoid</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <h4 className="font-semibold text-gray-900 mb-1">Rushing Through Questions</h4>
                    <p className="text-gray-600 text-sm">Speed comes with practice. Focus on accuracy first. Time yourself only during mock exams, not during topic practice.</p>
                  </div>
                  <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <h4 className="font-semibold text-gray-900 mb-1">Skipping Difficult Topics</h4>
                    <p className="text-gray-600 text-sm">Ethics and Fixed Income trip up many candidates. Do not avoid them—these topics are heavily weighted and often determine pass or fail.</p>
                  </div>
                  <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <h4 className="font-semibold text-gray-900 mb-1">Only Practising Questions You Know</h4>
                    <p className="text-gray-600 text-sm">It feels good to get questions right, but growth happens when you challenge yourself with unfamiliar material.</p>
                  </div>
                  <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <h4 className="font-semibold text-gray-900 mb-1">Waiting Until the End to Practice</h4>
                    <p className="text-gray-600 text-sm">Start practising from day one. Spaced repetition is proven to improve retention compared to cramming before the exam.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Different */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              What Makes Our CFA Level 1 Questions Different
            </h2>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Not all practice questions are created equal. Here is why candidates choose AnalystTrainer for their CFA exam preparation.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Written by CFA Charterholders</h3>
                <p className="text-gray-600 mb-4">Every question is written and reviewed by CFA charterholders with years of experience in the finance industry. We understand the exam because we have passed all three levels ourselves.</p>
                <p className="text-gray-600">Our writers include portfolio managers, investment analysts, and former exam graders who know exactly what the CFA Institute expects from candidates.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Updated for 2026 Curriculum</h3>
                <p className="text-gray-600 mb-4">The CFA curriculum changes every year. Our question bank is updated annually to reflect the latest Learning Outcome Statements (LOS) and reading assignments.</p>
                <p className="text-gray-600">We remove outdated questions and add new ones to ensure you are studying the right material for your exam window.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Explanations That Teach</h3>
                <p className="text-gray-600 mb-4">Every explanation includes the full reasoning process, not just the correct answer. We explain why each incorrect option is wrong and provide context from the CFA curriculum.</p>
                <p className="text-gray-600">Our explanations reference specific LOS codes so you know exactly where to review if you need more help.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Exam-Weighted Topic Distribution</h3>
                <p className="text-gray-600 mb-4">Our question bank mirrors the actual exam weighting. If Financial Statement Analysis is 14% of the exam, approximately 14% of our questions cover that topic.</p>
                <p className="text-gray-600">This ensures you spend your practice time on the topics that matter most for passing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Question */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Sample CFA Level 1 Practice Question
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              Here is an example of what our questions look like. Notice the exam-realistic format and comprehensive explanation.
            </p>
            <div className="bg-gray-50 rounded-2xl p-8 border">
              <span className="text-sm text-[#1FB8CD] font-medium">Ethics & Professional Standards</span>
              <p className="text-lg text-gray-900 font-medium mt-2 mb-6">
                An investment analyst discovers material nonpublic information about a client company through a conversation with the CEO at a social event. According to the CFA Institute Standards of Professional Conduct, the analyst should most appropriately:
              </p>
              <div className="space-y-3 mb-8">
                <div className="p-4 bg-white rounded-lg border">
                  <span className="font-medium text-gray-700">A.</span> Trade on the information only for discretionary accounts
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <span className="font-medium text-gray-700">B.</span> Inform the compliance department and refrain from trading
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <span className="font-medium text-gray-700">C.</span> Wait 24 hours before using the information to allow for public disclosure
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-green-800">Correct Answer: B</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>Explanation:</strong> Under Standard II(A) Material Nonpublic Information, members must not act or cause others to act on material nonpublic information. The analyst should report the receipt of such information to compliance and refrain from trading until the information becomes public through proper channels. Option A is incorrect because trading on MNPI is prohibited regardless of account type. Option C is incorrect because there is no time-based exception—the information must actually become public, not just have time pass.
                </p>
                <p className="text-gray-500 text-xs mt-3">Reference: CFA Level 1, Reading 1, LOS 1.a</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-[#13343B]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Practising CFA Level 1 Questions Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of candidates who passed their CFA Level 1 exam using our practice questions.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-[#1FB8CD] text-white rounded-full font-semibold text-lg hover:bg-[#18a3b5] transition-colors"
            >
              Start Your Free Trial Now
            </Link>
            <p className="mt-4 text-gray-400 text-sm">No credit card required. 100 free questions included.</p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How many CFA Level 1 practice questions are included?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Our question bank includes over 2,500 CFA Level 1 practice questions covering all 10 topic areas. Questions are regularly updated to reflect the latest CFA curriculum.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Are the questions similar to the actual CFA exam?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Yes! Our questions are written to mirror the actual CFA Level 1 exam format, difficulty level, and topic weighting. Many candidates report our questions are slightly harder than the actual exam, which helps them feel more prepared.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Do practice questions include explanations?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Every single question includes a detailed explanation showing why the correct answer is right and why the other options are incorrect. This helps you learn from mistakes and understand the underlying concepts.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Can I practice by topic area?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Absolutely! You can filter questions by any of the 10 CFA Level 1 topic areas, or practice mixed questions to simulate the real exam experience. Our analytics show you which topics need the most attention.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  How many practice questions should I do before the CFA exam?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Most successful candidates complete between 1,500 and 3,000 practice questions during their preparation. We recommend doing at least 150-200 questions per topic area, which ensures you see a variety of question styles and difficulty levels. Quality matters more than quantity—make sure you review explanations thoroughly rather than rushing through questions.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  What is the pass rate for CFA Level 1?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">The CFA Level 1 pass rate typically ranges between 35% and 45%. This means more than half of candidates fail on their first attempt. Candidates who use structured practice questions and mock exams consistently outperform those who only read study materials. Our users report pass rates significantly above the global average.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  Can I access practice questions on mobile?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Yes! Our platform is fully responsive and works on smartphones, tablets, and computers. Many candidates use their commute or lunch breaks to practice questions on mobile. Your progress syncs across all devices automatically.</p>
              </details>
              <details className="group bg-gray-50 rounded-xl p-6">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                  When should I start doing practice questions?
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-gray-600">Start practising as soon as you complete your first topic. Research shows that spaced practice—spreading questions over time—leads to better retention than cramming. We recommend practising questions for each topic within a few days of studying it, then returning to review those topics periodically.</p>
              </details>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 px-4 bg-gray-50 border-t">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">More CFA Level 1 Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/cfa-level-1-mock-exam" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Mock Exams</h3>
                <p className="text-gray-600 text-sm">Full 180-question mock exams in real exam format</p>
              </Link>
              <Link href="/free-cfa-questions" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Free Questions</h3>
                <p className="text-gray-600 text-sm">Start with 100 free practice questions - no card required</p>
              </Link>
              <Link href="/flashcards" className="p-6 bg-white rounded-xl border hover:border-[#1FB8CD] transition-colors group">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[#1FB8CD]">Free Flashcards</h3>
                <p className="text-gray-600 text-sm">1,600+ flashcards covering all CFA Level 1 topics</p>
              </Link>
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
      </div>
    </>
  )
}
