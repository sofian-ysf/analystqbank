import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free CFA Level 1 Flashcards 2026 | 1,600+ Cards with Spaced Repetition',
  description: '1,600+ free CFA Level 1 flashcards covering all 10 topics. Uses spaced repetition to help you remember formulas & concepts. 100% free, no credit card.',
  keywords: 'CFA flashcards, free CFA flashcards, CFA Level 1 flashcards, CFA study cards, CFA spaced repetition, CFA formula flashcards',
  alternates: {
    canonical: 'https://www.analysttrainer.com/flashcards',
  },
  openGraph: {
    title: 'Free CFA Level 1 Flashcards 2026 | 1,600+ Cards',
    description: '1,600+ free CFA Level 1 flashcards with spaced repetition. Master formulas and key concepts. 100% free.',
    url: 'https://www.analysttrainer.com/flashcards',
    type: 'website',
  },
}

export default function FlashcardsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
