import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About AnalystTrainer | CFA Level 1 Exam Prep',
  description: 'AnalystTrainer helps candidates pass CFA Level 1 with 2,500+ practice questions & mock exams. Written by CFA charterholders. From £50 lifetime.',
  alternates: {
    canonical: 'https://www.analysttrainer.com/about',
  },
  openGraph: {
    title: 'About AnalystTrainer | CFA Level 1 Exam Prep',
    description: 'AnalystTrainer helps candidates pass CFA Level 1 with 2,500+ practice questions & mock exams. Written by CFA charterholders.',
    url: 'https://www.analysttrainer.com/about',
    type: 'website',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
