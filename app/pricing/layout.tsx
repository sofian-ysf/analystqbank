import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — CFA Level 1 Exam Prep Plans',
  description: 'Simple, transparent pricing for CFA Level 1 exam prep. 2 Month (£25), 6 Month (£40), or Lifetime (£70). All plans include 2,000+ questions and unlimited mock exams. 30-day money-back guarantee.',
  keywords: 'cfa level 1 pricing, cfa exam prep cost, cfa study material price, best value cfa prep, affordable cfa level 1 preparation, cfa question bank pricing',
  alternates: {
    canonical: 'https://www.analysttrainer.com/pricing',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Pricing — CFA Level 1 Exam Prep Plans | AnalystTrainer',
    description: 'From £25. Simple, transparent pricing for CFA Level 1 exam prep. 30-day money-back guarantee.',
    url: 'https://www.analysttrainer.com/pricing',
    type: 'website',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
