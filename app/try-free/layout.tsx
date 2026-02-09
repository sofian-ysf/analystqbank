import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Try Free Demo | CFA Level 1 Practice Questions',
  description: 'Try 15 free CFA Level 1 practice questions. Experience our detailed explanations, exam tips, and step-by-step solutions. No signup required.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Try Free CFA Level 1 Questions | AnalystTrainer Demo',
    description: 'Try 15 free CFA Level 1 practice questions with detailed explanations. No signup required.',
    url: 'https://www.analysttrainer.com/try-free',
  },
}

export default function TryFreeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
