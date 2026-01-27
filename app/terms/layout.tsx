import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | AnalystTrainer',
  description: 'Read the terms of service for AnalystTrainer, the CFA Level 1 exam preparation platform. Understand your rights and responsibilities when using our services.',
  alternates: {
    canonical: 'https://www.analysttrainer.com/terms',
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
