// SM-2 Spaced Repetition Algorithm
// Based on SuperMemo-2 by Piotr Wozniak
// https://www.supermemo.com/en/archives1990-2015/english/ol/sm2

import { ReviewRating, ReviewQuality } from './types'

// =============================================================================
// TYPES
// =============================================================================

export interface SM2Input {
  quality: ReviewQuality      // 1, 2, 3, or 5
  repetitions: number         // Current repetition count
  easeFactor: number          // Current ease factor
  interval: number            // Current interval in days
}

export interface SM2Output {
  repetitions: number
  easeFactor: number
  interval: number
  nextDueDate: Date
}

// =============================================================================
// CONSTANTS
// =============================================================================

const MIN_EASE_FACTOR = 1.3
const DEFAULT_EASE_FACTOR = 2.5
const MASTERY_THRESHOLD_DAYS = 21  // Cards with interval >= 21 days are "mastered"

// =============================================================================
// CORE ALGORITHM
// =============================================================================

/**
 * Calculate new SM-2 values based on review quality
 */
export function calculateSM2(input: SM2Input): SM2Output {
  const { quality, repetitions, easeFactor, interval } = input

  let newRepetitions = repetitions
  let newEaseFactor = easeFactor
  let newInterval = interval

  if (quality === 1) {
    // "Again" - reset progress, start over
    newRepetitions = 0
    newInterval = 1
    // Keep ease factor (no penalty on single failure)
  } else if (quality === 2) {
    // "Hard" - don't reset but apply penalty
    newEaseFactor = Math.max(easeFactor - 0.15, MIN_EASE_FACTOR)
    newInterval = Math.max(1, Math.ceil(interval * 1.2))
  } else {
    // "Good" (3) or "Easy" (5) - successful review
    newRepetitions = repetitions + 1

    // Update ease factor using SM-2 formula
    // EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
    newEaseFactor = Math.max(
      MIN_EASE_FACTOR,
      easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
    )

    // Calculate new interval
    if (newRepetitions === 1) {
      newInterval = 1
    } else if (newRepetitions === 2) {
      newInterval = 6
    } else {
      newInterval = Math.ceil(interval * newEaseFactor)
    }

    // "Easy" bonus: 30% acceleration
    if (quality === 5) {
      newInterval = Math.ceil(newInterval * 1.3)
    }
  }

  // Calculate next due date (set to start of day UTC)
  const nextDueDate = new Date()
  nextDueDate.setUTCHours(0, 0, 0, 0)
  nextDueDate.setUTCDate(nextDueDate.getUTCDate() + newInterval)

  return {
    repetitions: newRepetitions,
    easeFactor: Math.round(newEaseFactor * 100) / 100, // Round to 2 decimal places
    interval: newInterval,
    nextDueDate
  }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Convert user-friendly rating to SM-2 quality score
 */
export function ratingToQuality(rating: ReviewRating): ReviewQuality {
  const map: Record<ReviewRating, ReviewQuality> = {
    'again': 1,
    'hard': 2,
    'good': 3,
    'easy': 5
  }
  return map[rating]
}

/**
 * Get estimated intervals for each rating button
 */
export function getEstimatedIntervals(
  repetitions: number,
  easeFactor: number,
  interval: number
): Record<ReviewRating, number> {
  const ratings: ReviewRating[] = ['again', 'hard', 'good', 'easy']
  const result: Record<ReviewRating, number> = {} as Record<ReviewRating, number>

  for (const rating of ratings) {
    const quality = ratingToQuality(rating)
    const output = calculateSM2({ quality, repetitions, easeFactor, interval })
    result[rating] = output.interval
  }

  return result
}

/**
 * Determine card learning status
 */
export function getCardStatus(
  repetitions: number,
  interval: number,
  dueDate: Date | string
): 'new' | 'learning' | 'due' | 'mastered' {
  if (repetitions === 0) return 'new'
  if (interval >= MASTERY_THRESHOLD_DAYS) return 'mastered'
  if (isCardDue(dueDate)) return 'due'
  return 'learning'
}

/**
 * Check if a card is due for review
 */
export function isCardDue(dueDate: Date | string): boolean {
  const due = new Date(dueDate)
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)
  return due <= today
}

/**
 * Calculate mastery level (0-100)
 */
export function calculateMasteryLevel(repetitions: number, easeFactor: number): number {
  // 50% from repetitions (max at 5), 50% from ease factor (normalized)
  const repScore = Math.min(repetitions / 5, 1) * 50
  const efNormalized = (easeFactor - MIN_EASE_FACTOR) / (3.5 - MIN_EASE_FACTOR)
  const efScore = Math.max(0, Math.min(efNormalized, 1)) * 50
  return Math.round(repScore + efScore)
}

/**
 * Format interval for display
 */
export function formatInterval(days: number): string {
  if (days === 0) return 'Now'
  if (days === 1) return '1 day'
  if (days < 7) return `${days} days`
  if (days < 14) return '1 week'
  if (days < 30) return `${Math.round(days / 7)} weeks`
  if (days < 60) return '1 month'
  if (days < 365) return `${Math.round(days / 30)} months`
  return `${Math.round(days / 365)} year${days >= 730 ? 's' : ''}`
}

/**
 * Get default progress values for a new card
 */
export function getDefaultProgress() {
  return {
    ease_factor: DEFAULT_EASE_FACTOR,
    interval_days: 0,
    repetitions: 0,
    due_date: new Date().toISOString()
  }
}

// =============================================================================
// EXPORTS
// =============================================================================

export {
  MIN_EASE_FACTOR,
  DEFAULT_EASE_FACTOR,
  MASTERY_THRESHOLD_DAYS
}
