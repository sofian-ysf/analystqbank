import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - CFA Level 1 Question Bank | AnalystTrainer',
  description: 'Simple, transparent pricing for CFA Level 1 exam prep. From £50 for lifetime access to 2,000+ practice questions. 30-day money-back guarantee. Start free trial today.',
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
