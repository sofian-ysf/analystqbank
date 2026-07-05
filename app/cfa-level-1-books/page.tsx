import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CFA Level 1 Books 2026 | Recommended Reading | AnalystTrainer',
  description: 'Find the best CFA Level 1 books and study materials for 2026. Plus, practise 2,500+ exam-style questions with our question bank.',
}

export default function CFALevel1Books() {
  redirect('/cfa-level-1-practice-questions')
}
