import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free CFA Level 1 Demo — 15 Practice Questions Instantly',
  description: 'Try 15 free CFA Level 1 practice questions instantly — no signup, no credit card. Written by charterholders with detailed explanations.',
  alternates: {
    canonical: 'https://www.analysttrainer.com/try-free',
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Free CFA Level 1 Practice Questions Demo',
    description: 'Try 15 free CFA Level 1 practice questions instantly — no signup needed.',
    url: 'https://www.analysttrainer.com/try-free',
    type: 'website',
  },
}

export default function TryFreeLayout({ children }: { children: React.ReactNode }) {
  return children
}
