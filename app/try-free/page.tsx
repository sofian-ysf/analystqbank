'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { demoQuestions } from './demoQuestions'

export default function TryFreePage() {
  useEffect(() => {
    document.title = 'Free CFA Level 1 Demo — 15 Practice Questions | AnalystTrainer'
  }, [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [answers, setAnswers] = useState<Record<string, { selected: string; correct: boolean }>>({})
  const [showMobileProgress, setShowMobileProgress] = useState(false)

  const currentQuestion = demoQuestions[currentIndex]
  const isCorrect = selectedAnswer === currentQuestion?.correct_answer

  const handleSubmit = () => {
    if (!selectedAnswer || hasSubmitted) return
    const correct = selectedAnswer === currentQuestion.correct_answer
    if (correct) setScore(prev => prev + 1)
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: { selected: selectedAnswer, correct }
    }))
    setHasSubmitted(true)
  }

  const handleNext = () => {
    if (currentIndex < demoQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setHasSubmitted(false)
    } else {
      setIsComplete(true)
    }
  }

  const jumpToQuestion = (index: number) => {
    if (answers[demoQuestions[index].id] || index === currentIndex) {
      setCurrentIndex(index)
      setSelectedAnswer(answers[demoQuestions[index].id]?.selected || null)
      setHasSubmitted(!!answers[demoQuestions[index].id])
      setShowMobileProgress(false)
    }
  }

  // Group questions by topic for stats
  const topicStats = demoQuestions.reduce((acc, q) => {
    if (!acc[q.topic]) acc[q.topic] = { total: 0, correct: 0 }
    acc[q.topic].total++
    if (answers[q.id]?.correct) acc[q.topic].correct++
    return acc
  }, {} as Record<string, { total: number; correct: number }>)

  // Completion screen
  if (isComplete) {
    const percentage = Math.round((score / demoQuestions.length) * 100)

    return (
      <div className="min-h-screen bg-[#fbfaf4] flex flex-col">
        <Script
          id="product-json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: 'Free CFA Level 1 Demo Questions',
              description: '15 free CFA Level 1 practice questions with detailed explanations (no signup required)',
              brand: { '@type': 'Brand', name: 'AnalystTrainer' },
              offers: { '@type': 'Offer', priceCurrency: 'GBP', price: '0', availability: 'https://schema.org/InStock' },
            }),
          }}
          strategy="beforeInteractive"
        />
        <div className="min-h-screen bg-[#fbfaf4] flex flex-col">
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="AnalystTrainer" width={150} height={32} className="h-7 w-auto" />
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 max-w-md w-full text-center">
            <div className="w-28 h-28 mx-auto mb-6 relative">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="56" cy="56" r="48" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                <circle
                  cx="56" cy="56" r="48" fill="none"
                  stroke={percentage >= 70 ? '#22c55e' : percentage >= 50 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="10"
                  strokeDasharray={`${(percentage / 100) * 301.6} 301.6`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{percentage}%</span>
                <span className="text-xs text-gray-500">{score}/{demoQuestions.length}</span>
              </div>
            </div>

            <h1 className="text-xl font-semibold text-gray-900 mb-1">
              {percentage >= 70 ? 'Great job!' : percentage >= 50 ? 'Good effort!' : 'Keep practising!'}
            </h1>
            <p className="text-sm text-gray-500 mb-6">You completed all {demoQuestions.length} demo questions</p>

            <div className="grid grid-cols-2 gap-2 mb-6 text-left">
              {Object.entries(topicStats).slice(0, 6).map(([topic, stats]) => (
                <div key={topic} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-sm font-semibold text-gray-900">{stats.correct}/{stats.total}</div>
                  <div className="text-xs text-gray-500 truncate">{topic}</div>
                </div>
              ))}
            </div>

            <Link
              href="/signup"
              className="block w-full bg-[#1FB8CD] text-white py-3 rounded-lg font-medium hover:bg-[#18a3b5] transition-colors mb-3"
            >
              Get Started
            </Link>
            <p className="text-xs text-gray-500">2,500+ questions with detailed explanations</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <>
      <Script
        id="product-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
        strategy="beforeInteractive"
      />
      <div className="h-screen flex flex-col bg-[#fbfaf4] overflow-hidden">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="AnalystTrainer" width={140} height={32} className="h-6 w-auto" />
        </Link>
        <button
          onClick={() => setShowMobileProgress(!showMobileProgress)}
          className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full"
        >
          <span className="font-medium">{currentIndex + 1}/{demoQuestions.length}</span>
          <svg className={`w-4 h-4 transition-transform ${showMobileProgress ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </header>

      {/* Mobile Progress Dropdown */}
      {showMobileProgress && (
        <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex-shrink-0">
          <div className="grid grid-cols-5 gap-2">
            {demoQuestions.map((q, i) => {
              const answered = answers[q.id]
              const isCurrent = i === currentIndex
              return (
                <button
                  key={q.id}
                  onClick={() => jumpToQuestion(i)}
                  disabled={!answered && !isCurrent}
                  className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                    isCurrent ? 'bg-[#13343B] text-white' :
                    answered?.correct ? 'bg-green-100 text-green-700' :
                    answered ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-400'
                  }`}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col flex-shrink-0">
          <div className="p-4 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="AnalystTrainer" width={150} height={32} className="h-7 w-auto" />
            </Link>
          </div>

          <div className="p-4 border-b border-gray-100">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">Progress</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1FB8CD] transition-all duration-300"
                  style={{ width: `${(Object.keys(answers).length / demoQuestions.length) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-700">{Object.keys(answers).length}/{demoQuestions.length}</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-3 gap-2">
              {demoQuestions.map((q, i) => {
                const answered = answers[q.id]
                const isCurrent = i === currentIndex
                return (
                  <button
                    key={q.id}
                    onClick={() => jumpToQuestion(i)}
                    disabled={!answered && !isCurrent}
                    className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                      isCurrent ? 'bg-[#13343B] text-white ring-2 ring-[#13343B] ring-offset-2' :
                      answered?.correct ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                      answered ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                      'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="p-4 border-t border-gray-100">
            <Link
              href="/signup"
              className="block w-full text-center bg-[#1FB8CD] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#18a3b5] transition-colors"
            >
              Get Started
            </Link>
          </div>
        </aside>

        {/* Question Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto p-4 lg:p-6">
            {/* Question Card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4">
              {/* Question Header */}
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#13343B]/10 text-[#13343B]">
                    {currentQuestion.topic}
                  </span>
                  <span className="text-xs text-gray-500 hidden sm:inline">{currentQuestion.category}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  currentQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  currentQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {currentQuestion.difficulty}
                </span>
              </div>

              {/* Question Text */}
              <div className="px-4 py-4 sm:px-5 sm:py-5">
                <p className="text-gray-900 leading-relaxed">{currentQuestion.question_text}</p>
              </div>

              {/* Options */}
              <div className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-2">
                {currentQuestion.options.map((option) => {
                  const isSelected = selectedAnswer === option.letter
                  const isCorrectAnswer = option.letter === currentQuestion.correct_answer

                  let style = 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  if (hasSubmitted) {
                    if (isCorrectAnswer) style = 'border-green-500 bg-green-50'
                    else if (isSelected) style = 'border-red-500 bg-red-50'
                    else style = 'border-gray-200 opacity-50'
                  } else if (isSelected) {
                    style = 'border-[#13343B] bg-gray-50'
                  }

                  return (
                    <button
                      key={option.letter}
                      onClick={() => !hasSubmitted && setSelectedAnswer(option.letter)}
                      disabled={hasSubmitted}
                      className={`w-full text-left px-3 py-2.5 rounded-lg border-2 transition-all ${style}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium ${
                          hasSubmitted && isCorrectAnswer ? 'bg-green-500 text-white' :
                          hasSubmitted && isSelected ? 'bg-red-500 text-white' :
                          isSelected ? 'bg-[#13343B] text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {hasSubmitted && isCorrectAnswer ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : hasSubmitted && isSelected && !isCorrect ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            option.letter
                          )}
                        </span>
                        <span className="text-sm text-gray-900 pt-0.5">{option.text}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Submit Button */}
              {!hasSubmitted && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedAnswer}
                    className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors ${
                      selectedAnswer ? 'bg-[#13343B] text-white hover:bg-[#1a4a54]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Check Answer
                  </button>
                </div>
              )}
            </div>

            {/* Feedback */}
            {hasSubmitted && (
              <div className="space-y-3">
                {/* Result Banner */}
                <div className={`rounded-xl p-3 flex items-center gap-3 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  {isCorrect ? (
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  <span className={`text-sm font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Correct!' : `Incorrect - Answer: ${currentQuestion.correct_answer}`}
                  </span>
                </div>

                {/* Explanation */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="font-medium text-gray-900 text-sm">Explanation</h3>
                    <p className="text-sm text-gray-700 mt-1">{currentQuestion.explanation.summary}</p>
                  </div>

                  {currentQuestion.explanation.formula && (
                    <div className="px-4 py-3 border-b border-gray-100 bg-blue-50">
                      <h4 className="font-medium text-blue-900 text-sm mb-1">Formula</h4>
                      <p className="text-sm text-blue-800 font-mono">{currentQuestion.explanation.formula}</p>
                    </div>
                  )}

                  {currentQuestion.explanation.calculation_steps && (
                    <div className="px-4 py-3 border-b border-gray-100 bg-slate-50">
                      <h4 className="font-medium text-slate-900 text-sm mb-2">Step-by-Step</h4>
                      <div className="space-y-0.5">
                        {currentQuestion.explanation.calculation_steps.map((step, i) => (
                          <p key={i} className={`text-slate-800 ${step.startsWith('Step') ? 'font-medium text-sm mt-2 first:mt-0' : 'font-mono text-xs ml-3'}`}>
                            {step}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="px-4 py-3 border-b border-gray-100">
                    <h4 className="font-medium text-gray-900 text-sm mb-2">Key Points</h4>
                    <ul className="space-y-1">
                      {currentQuestion.explanation.key_points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-[#1FB8CD] mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {!isCorrect && currentQuestion.explanation.why_wrong[selectedAnswer!] && (
                    <div className="px-4 py-3 border-b border-gray-100 bg-amber-50">
                      <h4 className="font-medium text-amber-900 text-sm mb-1">Why {selectedAnswer} is incorrect</h4>
                      <p className="text-sm text-amber-800">{currentQuestion.explanation.why_wrong[selectedAnswer!]}</p>
                    </div>
                  )}

                  <div className="px-4 py-3 bg-[#13343B]/5">
                    <h4 className="font-medium text-[#13343B] text-sm mb-1">Exam Tip</h4>
                    <p className="text-sm text-gray-700">{currentQuestion.explanation.exam_tip}</p>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="w-full bg-[#13343B] text-white py-2.5 rounded-lg font-medium text-sm hover:bg-[#1a4a54] transition-colors flex items-center justify-center gap-2"
                >
                  {currentIndex < demoQuestions.length - 1 ? (
                    <>
                      Next Question
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  ) : (
                    'View Results'
                  )}
                </button>
              </div>
            )}

            {/* Mobile CTA - Bottom padding */}
            <div className="h-20 lg:hidden" />
          </div>
        </main>
      </div>

      {/* Mobile Bottom CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="text-sm">
          <span className="text-gray-500">Score: </span>
          <span className="font-medium text-gray-900">{score}/{Object.keys(answers).length || 0}</span>
        </div>
        <Link
          href="/signup"
          className="bg-[#1FB8CD] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#18a3b5]"
        >
          Get Started
        </Link>
      </div>
    </>
  )
}
