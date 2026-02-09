import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | AnalystTrainer',
  description: 'AnalystTrainer privacy policy. Learn how we protect your data and personal information.',
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
