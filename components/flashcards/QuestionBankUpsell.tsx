'use client'

import Link from 'next/link'

interface QuestionBankUpsellProps {
  topicArea?: string
  topicName?: string
  masteredCount?: number
  variant?: 'banner' | 'card' | 'inline'
}

export default function QuestionBankUpsell({
  topicArea,
  topicName,
  masteredCount,
  variant = 'banner'
}: QuestionBankUpsellProps) {

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-3 p-4 bg-[#1FB8CD]/5 rounded-xl border border-[#1FB8CD]/20">
        <div className="flex-shrink-0 w-10 h-10 bg-[#1FB8CD]/10 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-700">
            Ready to test your knowledge?
          </p>
        </div>
        <Link
          href={topicArea ? `/question-bank?topic=${topicArea}` : '/question-bank'}
          className="flex-shrink-0 text-sm font-medium text-[#1FB8CD] hover:text-[#1FB8CD]/80"
        >
          Practice Questions →
        </Link>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className="bg-white rounded-2xl border border-[#EAEEEF] p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-[#1FB8CD]/10 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">Test Your Knowledge</h3>
            <p className="text-sm text-gray-600 mb-4">
              {masteredCount
                ? `You've mastered ${masteredCount} concepts. Challenge yourself with exam-style questions.`
                : 'Put your learning to the test with CFA exam-style practice questions.'}
            </p>
            <Link
              href={topicArea ? `/question-bank?topic=${topicArea}` : '/question-bank'}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1FB8CD] text-white rounded-full text-sm font-medium hover:bg-[#1FB8CD]/90 transition-colors"
            >
              Open Question Bank
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Default: banner variant
  return (
    <div className="bg-gradient-to-r from-[#13343B] to-[#1a4a54] rounded-2xl p-6 md:p-8 text-white">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
            <svg className="w-7 h-7 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-bold mb-1">
            {topicName ? `Master ${topicName}` : 'Ready to Test Yourself?'}
          </h3>
          <p className="text-gray-300 text-sm md:text-base">
            {masteredCount
              ? `Great progress! You've reviewed ${masteredCount} cards. Now challenge yourself with real exam questions.`
              : 'You understand the concepts. Now practice with CFA Level 1 exam-style questions to solidify your knowledge.'}
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link
            href={topicArea ? `/question-bank?topic=${topicArea}` : '/question-bank'}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1FB8CD] text-white rounded-full font-semibold hover:bg-[#1FB8CD]/90 transition-colors shadow-lg hover:shadow-xl"
          >
            Try Question Bank
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Trust indicators */}
      <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-4 md:gap-6 text-sm text-gray-400">
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          2,500+ Questions
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Detailed Explanations
        </span>
        <span className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Performance Tracking
        </span>
      </div>
    </div>
  )
}
