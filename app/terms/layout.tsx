import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | AnalystTrainer',
  description: 'AnalystTrainer terms of service. Read our terms and conditions for using the CFA Level 1 exam prep platform.',
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
