'use client'

import { useEffect, useCallback } from 'react'
import { FlashcardWithProgress } from '@/lib/flashcards/types'
import MathText from '@/components/MathText'

interface FlashcardDisplayProps {
  card: FlashcardWithProgress
  showAnswer: boolean
  onShowAnswer: () => void
}

export default function FlashcardDisplay({
  card,
  showAnswer,
  onShowAnswer
}: FlashcardDisplayProps) {

  // Keyboard shortcut: Space to show answer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      if (e.key === ' ' && !showAnswer) {
        e.preventDefault()
        onShowAnswer()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showAnswer, onShowAnswer])

  // Render HTML content with LaTeX support
  const renderContent = useCallback((html: string) => {
    // Check if content has LaTeX patterns
    const hasLatex = /\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]|\$\$[^\$]+?\$\$/.test(html)

    if (hasLatex) {
      // Strip HTML tags but keep the text, then render with MathText
      const textContent = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      return <MathText text={textContent} />
    }

    // For plain HTML content
    return (
      <div
        className="flashcard-content prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* New card badge */}
      {card.isNew && (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#1FB8CD]/10 text-[#1FB8CD] mb-3">
          New Card
        </span>
      )}

      {/* Card container */}
      <div
        className={`bg-white rounded-2xl border border-[#EAEEEF] shadow-sm p-6 md:p-8 min-h-[280px] transition-all ${
          !showAnswer ? 'cursor-pointer hover:shadow-md hover:border-[#1FB8CD]/30' : ''
        }`}
        onClick={!showAnswer ? onShowAnswer : undefined}
      >
        {/* Front side (Question) */}
        <div className="mb-4">
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Question
          </span>
        </div>

        <div className="text-gray-900 text-lg leading-relaxed">
          {renderContent(card.front)}
        </div>

        {/* Back side (Answer) - shown after flip */}
        {showAnswer && (
          <>
            <hr className="my-6 border-[#EAEEEF]" />

            <div className="mb-4">
              <span className="text-xs font-medium text-[#1FB8CD] uppercase tracking-wider">
                Answer
              </span>
            </div>

            <div className="text-gray-900 text-lg leading-relaxed">
              {renderContent(card.back)}
            </div>
          </>
        )}
      </div>

      {/* Show Answer button */}
      {!showAnswer && (
        <button
          onClick={onShowAnswer}
          className="mt-4 w-full py-3.5 bg-[#13343B] text-white rounded-full font-medium hover:bg-[#13343B]/90 transition-colors"
        >
          Show Answer
          <span className="ml-2 text-gray-400 text-sm">(Space)</span>
        </button>
      )}

      {/* Custom styles for cloze deletions */}
      <style jsx global>{`
        .flashcard-content .cloze-blank {
          background-color: #1FB8CD;
          color: white;
          padding: 2px 10px;
          border-radius: 4px;
          font-weight: 600;
          display: inline-block;
        }

        .flashcard-content .cloze-answer {
          background-color: #10B981;
          color: white;
          padding: 2px 10px;
          border-radius: 4px;
          font-weight: 600;
          display: inline-block;
        }

        .flashcard-content .hint-link {
          color: #6B7280;
          text-decoration: underline;
          font-style: italic;
          cursor: help;
        }

        .flashcard-content .audio-indicator {
          background-color: #F3F4F6;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.875rem;
          color: #6B7280;
          display: inline-block;
        }

        .flashcard-content .answer-divider {
          border: none;
          border-top: 2px dashed #E5E7EB;
          margin: 1.5rem 0;
        }

        .flashcard-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1rem 0;
        }

        .flashcard-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }

        .flashcard-content th,
        .flashcard-content td {
          border: 1px solid #E5E7EB;
          padding: 8px 12px;
          text-align: left;
        }

        .flashcard-content th {
          background-color: #F9FAFB;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
