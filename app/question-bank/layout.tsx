import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CFA Level 1 Question Bank 2026 | 2,500+ Practice Questions',
  description: 'Pass CFA Level 1 with 2,500+ practice questions written by charterholders. Detailed explanations for every question. From £50 lifetime access.',
  keywords: 'CFA Level 1 questions, CFA practice questions, CFA question bank, CFA Level 1 practice test, CFA exam questions',
  alternates: {
    canonical: 'https://www.analysttrainer.com/question-bank',
  },
  openGraph: {
    title: 'CFA Level 1 Question Bank | 2,500+ Questions',
    description: 'Pass CFA Level 1 with 2,500+ practice questions written by charterholders. Detailed explanations for every question.',
    url: 'https://www.analysttrainer.com/question-bank',
    type: 'website',
  },
}

export default function QuestionBankLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
