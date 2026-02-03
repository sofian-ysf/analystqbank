import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CFA Level 1 Features | Question Bank, Mock Exams & Analytics',
  description: 'Explore AnalystTrainer features: 2,500+ practice questions, realistic mock exams, performance analytics, and detailed explanations. Everything you need to pass CFA Level 1.',
  keywords: 'CFA question bank features, CFA mock exam features, CFA analytics, CFA study tools',
  alternates: {
    canonical: 'https://www.analysttrainer.com/features',
  },
  openGraph: {
    title: 'CFA Level 1 Features | AnalystTrainer',
    description: '2,500+ questions, mock exams, analytics & detailed explanations. Everything to pass CFA Level 1.',
    url: 'https://www.analysttrainer.com/features',
    type: 'website',
  },
}

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
