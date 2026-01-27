import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | AnalystTrainer - CFA Level 1 Practice Questions',
  description: 'Learn about AnalystTrainer, the leading platform for CFA Level 1 exam preparation. Our mission is to help candidates pass the CFA exam with quality practice questions and mock exams.',
  alternates: {
    canonical: 'https://www.analysttrainer.com/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
