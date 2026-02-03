import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CFA Level 1 Pricing | From £50 One-Time | AnalystTrainer',
  description: 'Affordable CFA Level 1 prep from £50. Get lifetime access to 2,500+ practice questions, mock exams & analytics. Free trial included, no credit card required.',
  keywords: 'CFA Level 1 price, CFA prep cost, CFA question bank pricing, affordable CFA preparation',
  alternates: {
    canonical: 'https://www.analysttrainer.com/pricing',
  },
  openGraph: {
    title: 'CFA Level 1 Pricing | Lifetime Access from £50',
    description: 'Affordable CFA Level 1 prep with lifetime access. 2,500+ questions, mock exams & free trial included.',
    url: 'https://www.analysttrainer.com/pricing',
    type: 'website',
  },
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
