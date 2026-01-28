'use client'

import { useEffect } from 'react'
import { ReviewRating } from '@/lib/flashcards/types'
import { getEstimatedIntervals, formatInterval } from '@/lib/flashcards/sm2'

interface ReviewButtonsProps {
  onReview: (rating: ReviewRating) => void
  disabled?: boolean
  repetitions: number
  easeFactor: number
  interval: number
}

const BUTTONS: {
  rating: ReviewRating
  label: string
  color: string
  hoverColor: string
  key: string
}[] = [
  {
    rating: 'again',
    label: 'Again',
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-600',
    key: '1'
  },
  {
    rating: 'hard',
    label: 'Hard',
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-600',
    key: '2'
  },
  {
    rating: 'good',
    label: 'Good',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-600',
    key: '3'
  },
  {
    rating: 'easy',
    label: 'Easy',
    color: 'bg-[#1FB8CD]',
    hoverColor: 'hover:bg-[#1FB8CD]/90',
    key: '4'
  }
]

export default function ReviewButtons({
  onReview,
  disabled = false,
  repetitions,
  easeFactor,
  interval
}: ReviewButtonsProps) {
  // Get estimated intervals for each rating
  const intervals = getEstimatedIntervals(repetitions, easeFactor, interval)

  // Keyboard shortcuts: 1, 2, 3, 4
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      const keyMap: Record<string, ReviewRating> = {
        '1': 'again',
        '2': 'hard',
        '3': 'good',
        '4': 'easy'
      }

      if (keyMap[e.key]) {
        e.preventDefault()
        onReview(keyMap[e.key])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onReview, disabled])

  return (
    <div className="mt-6">
      <p className="text-center text-sm text-gray-500 mb-3">
        How well did you know this?
      </p>

      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {BUTTONS.map(({ rating, label, color, hoverColor, key }) => (
          <button
            key={rating}
            onClick={() => onReview(rating)}
            disabled={disabled}
            className={`
              ${color} ${hoverColor} text-white py-3 md:py-4 px-2 rounded-xl font-medium
              transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
              flex flex-col items-center justify-center gap-1
            `}
          >
            <span className="text-sm md:text-base font-semibold">{label}</span>
            <span className="text-xs opacity-80">{formatInterval(intervals[rating])}</span>
            <span className="text-xs opacity-60 hidden md:block">({key})</span>
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-3">
        Press 1-4 to rate
      </p>
    </div>
  )
}
