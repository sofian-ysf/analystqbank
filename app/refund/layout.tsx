import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refund Policy | AnalystTrainer',
  description: 'Read the refund policy for AnalystTrainer CFA Level 1 exam prep. We offer a 7-day refund policy on all new subscriptions.',
  alternates: {
    canonical: 'https://www.analysttrainer.com/refund',
  },
}

export default function RefundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
