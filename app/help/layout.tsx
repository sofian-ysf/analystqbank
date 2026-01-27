import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Help Centre | AnalystTrainer - CFA Level 1 Support',
  description: 'Find answers to common questions about AnalystTrainer CFA Level 1 practice questions and mock exams. Get help with your account, subscription, and more.',
  alternates: {
    canonical: 'https://www.analysttrainer.com/help',
  },
}

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
