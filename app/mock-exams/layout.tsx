import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CFA Level 1 Mock Exams 2026 | Realistic 180-Question Practice Tests',
  description: 'Realistic CFA Level 1 mock exams with 180 questions each. Exam-weighted by topic. Timed practice with detailed score analysis. From £50 lifetime.',
  keywords: 'CFA mock exam, CFA Level 1 mock test, CFA practice exam, CFA Level 1 practice test, CFA exam simulation',
  alternates: {
    canonical: 'https://www.analysttrainer.com/mock-exams',
  },
  openGraph: {
    title: 'CFA Level 1 Mock Exams | 180-Question Practice Tests',
    description: 'Realistic CFA Level 1 mock exams with 180 questions each. Exam-weighted by topic. Timed practice with detailed score analysis.',
    url: 'https://www.analysttrainer.com/mock-exams',
    type: 'website',
  },
}

export default function MockExamsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
