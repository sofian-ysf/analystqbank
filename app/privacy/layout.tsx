import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | AnalystTrainer',
  description: 'Read the privacy policy for AnalystTrainer, the CFA Level 1 exam preparation platform. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: 'https://www.analysttrainer.com/privacy',
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
