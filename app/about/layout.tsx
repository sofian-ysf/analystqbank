import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About AnalystTrainer | CFA Charterholders Helping You Pass',
  description: 'AnalystTrainer was built by CFA charterholders to help you pass CFA Level 1. Learn about our mission to make CFA prep accessible and effective.',
  alternates: {
    canonical: 'https://www.analysttrainer.com/about',
  },
  openGraph: {
    title: 'About AnalystTrainer | Built by CFA Charterholders',
    description: 'We built AnalystTrainer to help you pass CFA Level 1 on your first attempt.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
