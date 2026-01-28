// Flashcard Types for AnalystQBank

// =============================================================================
// DATABASE TYPES
// =============================================================================

export interface FlashcardDeck {
  id: string
  name: string
  slug: string
  description: string | null
  topic_area: string  // Maps to CFA topic ID
  card_count: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Flashcard {
  id: string
  deck_id: string
  front: string  // HTML/LaTeX content
  back: string   // HTML/LaTeX content
  topic_area: string
  subtopic: string | null
  anki_note_id: number | null
  sort_order: number
  created_at: string
}

export interface UserFlashcardProgress {
  id: string
  user_id: string
  flashcard_id: string
  ease_factor: number      // SM-2: default 2.5, min 1.3
  interval_days: number    // Days until next review
  repetitions: number      // Successful review count
  due_date: string         // ISO timestamp
  last_reviewed_at: string | null
  created_at: string
  updated_at: string
}

export interface FlashcardReviewHistory {
  id: string
  user_id: string
  flashcard_id: string
  quality: number  // 1-5 (1=again, 2=hard, 3=good, 5=easy)
  ease_factor_before: number
  ease_factor_after: number
  interval_before: number
  interval_after: number
  reviewed_at: string
}

// =============================================================================
// COMPOSITE TYPES
// =============================================================================

export interface DeckStats {
  total: number
  new: number           // Never studied
  learning: number      // In progress (interval < 21 days)
  due: number           // Ready for review today
  mastered: number      // Graduated (interval >= 21 days)
  masteryPercentage: number
}

export interface DeckWithStats extends FlashcardDeck {
  stats: DeckStats
}

export interface FlashcardWithProgress extends Flashcard {
  progress?: UserFlashcardProgress
  isNew: boolean
  isDue: boolean
}

export interface StudySession {
  deckId: string
  deckName: string
  cards: FlashcardWithProgress[]
  currentIndex: number
  completedCount: number
  totalCount: number
  sessionStats: SessionStats
}

export interface SessionStats {
  again: number
  hard: number
  good: number
  easy: number
}

// =============================================================================
// REVIEW TYPES
// =============================================================================

export type ReviewRating = 'again' | 'hard' | 'good' | 'easy'
export type ReviewQuality = 1 | 2 | 3 | 5

// =============================================================================
// API RESPONSE TYPES
// =============================================================================

export interface DecksResponse {
  decks: DeckWithStats[]
}

export interface StudyCardsResponse {
  cards: FlashcardWithProgress[]
  deck: {
    id: string
    name: string
    slug: string
    topic_area: string
    card_count: number
  }
  stats: {
    totalInDeck: number
    dueCount: number
    newCount: number
    studyingCount: number
  }
}

export interface ReviewResponse {
  success: boolean
  nextDueDate: string
  updatedProgress: UserFlashcardProgress
}

export interface ProgressStatsResponse {
  totalCards: number
  cardsStudied: number
  cardsDueToday: number
  newCards: number
  averageEaseFactor: number
  streakDays: number
  reviewsToday: number
  reviewsThisWeek: number
}

// =============================================================================
// ANKI IMPORT TYPES
// =============================================================================

export interface ParsedAnkiDeck {
  name: string
  cards: ParsedAnkiCard[]
  mediaMapping: Record<string, string>
}

export interface ParsedAnkiCard {
  noteId: number
  front: string
  back: string
  tags: string[]
  mediaFiles: string[]
}
