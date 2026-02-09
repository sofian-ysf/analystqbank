'use client'

import { useState } from 'react'
import Link from 'next/link'

const demoQuestion = {
  topic: 'Ethics',
  question: 'A portfolio manager discovers that a colleague has been front-running client trades. According to the CFA Institute Code of Ethics, the portfolio manager should most appropriately:',
  options: [
    { id: 'A', text: 'Ignore the situation to avoid workplace conflict' },
    { id: 'B', text: 'Report the violation to their supervisor or compliance department' },
    { id: 'C', text: 'Confront the colleague privately and ask them to stop' },
  ],
  correctAnswer: 'B',
  explanation: 'According to Standard I(A) - Knowledge of the Law, members must not knowingly participate in any violation of laws or regulations. When members reasonably believe that a violation has occurred, they should report the matter to the appropriate supervisory or compliance personnel. Front-running is a serious violation that harms clients and market integrity.',
}

export default function DemoQuestion() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleAnswerClick = (answerId: string) => {
    if (showResult) return
    setSelectedAnswer(answerId)
    setShowResult(true)
  }

  const isCorrect = selectedAnswer === demoQuestion.correctAnswer

  const getOptionStyle = (optionId: string) => {
    if (!showResult) {
      return 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 cursor-pointer'
    }
    if (optionId === demoQuestion.correctAnswer) {
      return 'border-green-500 bg-green-50'
    }
    if (optionId === selectedAnswer && !isCorrect) {
      return 'border-red-500 bg-red-50'
    }
    return 'border-gray-200 opacity-50'
  }

  const resetDemo = () => {
    setSelectedAnswer(null)
    setShowResult(false)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#13343B] to-[#1a4a54] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-medium">
                {demoQuestion.topic}
              </span>
              <span className="text-white/70 text-sm">Sample Question</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Try it yourself
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          <p className="text-gray-900 text-lg leading-relaxed mb-6">
            {demoQuestion.question}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {demoQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerClick(option.id)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${getOptionStyle(option.id)}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    showResult && option.id === demoQuestion.correctAnswer
                      ? 'bg-green-500 text-white'
                      : showResult && option.id === selectedAnswer && !isCorrect
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {showResult && option.id === demoQuestion.correctAnswer ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : showResult && option.id === selectedAnswer && !isCorrect ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      option.id
                    )}
                  </span>
                  <span className="text-gray-700 pt-1">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Result & Explanation */}
          {showResult && (
            <div className={`mt-6 p-5 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
              <div className="flex items-center gap-2 mb-3">
                {isCorrect ? (
                  <>
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-semibold text-green-800">Correct!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="font-semibold text-amber-800">Not quite - the correct answer is {demoQuestion.correctAnswer}</span>
                  </>
                )}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {demoQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="px-6 py-5 bg-gray-50 border-t border-gray-100">
          {showResult ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                Try <span className="font-semibold">14 more questions</span> in our free demo
              </p>
              <div className="flex gap-3">
                <button
                  onClick={resetDemo}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Try Again
                </button>
                <Link
                  href="/try-free"
                  className="px-6 py-2.5 bg-[#1FB8CD] text-white rounded-full text-sm font-medium hover:bg-[#18a3b5] transition-colors"
                >
                  Take Full Demo
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-center text-sm text-gray-500">
              Click an answer to see how our explanations work
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
