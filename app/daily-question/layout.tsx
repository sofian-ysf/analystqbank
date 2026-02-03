import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free CFA Question of the Day | Daily CFA Level 1 Practice',
  description: 'Get a free CFA Level 1 practice question delivered to your inbox every morning. Build exam readiness one question at a time. Join 5,000+ candidates.',
  keywords: 'CFA question of the day, daily CFA question, free CFA practice, CFA Level 1 daily question, CFA email course',
  alternates: {
    canonical: 'https://www.analysttrainer.com/daily-question',
  },
  openGraph: {
    title: 'Free CFA Question of the Day | AnalystTrainer',
    description: 'One CFA Level 1 question every morning with detailed explanations. 100% free.',
    url: 'https://www.analysttrainer.com/daily-question',
    type: 'website',
  },
}

export default function DailyQuestionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
