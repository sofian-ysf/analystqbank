import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Help Center | AnalystTrainer',
  description: 'Get help with AnalystTrainer. FAQs about CFA Level 1 practice questions, mock exams, subscriptions, and account management.',
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
