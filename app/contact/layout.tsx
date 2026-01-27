import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | AnalystTrainer - CFA Level 1 Support',
  description: 'Get in touch with AnalystTrainer support team. We are here to help with any questions about our CFA Level 1 practice questions and mock exams.',
  alternates: {
    canonical: 'https://www.analysttrainer.com/contact',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
