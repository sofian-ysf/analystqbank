'use client'

import { useState } from 'react'
import Link from 'next/link'

interface MockQuestion {
  id: number
  topic: string
  question: string
  options: { id: string; text: string }[]
  correctAnswer: string
  explanation: string
}

const mockQuestions: MockQuestion[] = [
  {
    id: 1,
    topic: 'Quantitative Methods',
    question:
      'An investment of $10,000 grows to $12,167 over 4 years with annual compounding. The annual rate of return is closest to:',
    options: [
      { id: 'A', text: '4.0%' },
      { id: 'B', text: '5.0%' },
      { id: 'C', text: '6.5%' },
    ],
    correctAnswer: 'B',
    explanation:
      'Using r = (FV/PV)^(1/n) − 1 = (12,167/10,000)^(1/4) − 1 = 1.2167^0.25 − 1 ≈ 0.05, or 5.0%.',
  },
  {
    id: 2,
    topic: 'Fixed Income',
    question:
      'All else equal, as a bond approaches maturity, the price of a bond trading at a premium will most likely:',
    options: [
      { id: 'A', text: 'Rise toward its future value' },
      { id: 'B', text: 'Remain unchanged' },
      { id: 'C', text: 'Fall toward its par value' },
    ],
    correctAnswer: 'C',
    explanation:
      'A premium bond is priced above par because its coupon exceeds the market yield. As it approaches maturity, this "pull to par" causes the price to decline toward face value, converging to par at maturity.',
  },
  {
    id: 3,
    topic: 'Ethical & Professional Standards',
    question:
      'A member uses non-material, non-public information to make an investment recommendation. According to the CFA Institute Standards, this action is:',
    options: [
      { id: 'A', text: 'A violation of Standard II(A) Material Nonpublic Information' },
      { id: 'B', text: 'Permitted, as the information is not material' },
      { id: 'C', text: 'Permitted only for institutional clients' },
    ],
    correctAnswer: 'B',
    explanation:
      'Standard II(A) prohibits acting on information that is both material and non-public. Because the information here is non-material, using it does not breach the standard — the mosaic theory allows analysts to combine non-material pieces to reach conclusions.',
  },
]

export default function MockPreview() {
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (questionId: number, optionId: string) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }))
  }

  const correctCount = mockQuestions.filter(
    (q) => answers[q.id] === q.correctAnswer
  ).length

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Exam-style header with timer */}
        <div className="bg-gradient-to-r from-[#13343B] to-[#1a4a54] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium">
              Try a Mock Question
            </span>
            <span className="text-white/70 text-sm hidden sm:inline">3 questions</span>
          </div>
          {/* Simulated timer — visual only, does not count down */}
          <div className="flex items-center gap-2 rounded-full bg-red-500/90 px-3 py-1.5 text-white">
            <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-mono font-semibold tabular-nums">00:10</span>
          </div>
        </div>

        {/* Questions */}
        <div className="divide-y divide-gray-100">
          {mockQuestions.map((q, index) => {
            const selected = answers[q.id]
            return (
              <div key={q.id} className="p-6">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-sm font-semibold text-gray-400">Q{index + 1}</span>
                  <span className="text-xs text-[#1FB8CD] font-medium">{q.topic}</span>
                </div>
                <p className="text-gray-900 font-medium mb-4 leading-relaxed">{q.question}</p>
                <div className="space-y-2">
                  {q.options.map((option) => {
                    const isSelected = selected === option.id
                    const isCorrect = option.id === q.correctAnswer
                    let styles = 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    if (submitted) {
                      if (isCorrect) {
                        styles = 'border-green-500 bg-green-50'
                      } else if (isSelected) {
                        styles = 'border-red-500 bg-red-50'
                      } else {
                        styles = 'border-gray-200 opacity-60'
                      }
                    } else if (isSelected) {
                      styles = 'border-[#1FB8CD] bg-[#1FB8CD]/5'
                    }
                    return (
                      <label
                        key={option.id}
                        className={`flex items-center gap-3 w-full p-3 rounded-xl border-2 transition-all ${
                          submitted ? 'cursor-default' : 'cursor-pointer'
                        } ${styles}`}
                      >
                        <input
                          type="radio"
                          name={`mock-q-${q.id}`}
                          value={option.id}
                          checked={isSelected}
                          onChange={() => handleSelect(q.id, option.id)}
                          disabled={submitted}
                          className="h-4 w-4 accent-[#1FB8CD]"
                        />
                        <span className="text-sm font-medium text-gray-700">{option.id}.</span>
                        <span className="text-sm text-gray-700">{option.text}</span>
                      </label>
                    )
                  })}
                </div>

                {submitted && (
                  <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <p className="text-sm font-semibold text-green-700 mb-1">
                      Correct answer: {q.correctAnswer}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer: submit or results + signup CTA */}
        <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
          {!submitted ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                Select an answer for each question, then submit to see how you did.
              </p>
              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(answers).length === 0}
                className="px-8 py-3 bg-[#1FB8CD] text-white rounded-full font-semibold hover:bg-[#18a3b5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900 mb-2">
                You scored {correctCount} / {mockQuestions.length}
              </p>
              <p className="text-gray-600">
                Want to see your full score across all 10 topics?{' '}
                <Link
                  href="/signup"
                  className="font-semibold text-[#1FB8CD] hover:text-[#18a3b5] underline underline-offset-4"
                >
                  Sign up for free →
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
