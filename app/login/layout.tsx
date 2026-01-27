import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login | AnalystTrainer - CFA Level 1 Practice Questions',
  description: 'Sign in to your AnalystTrainer account to access CFA Level 1 practice questions, mock exams, and performance analytics.',
  alternates: {
    canonical: 'https://www.analysttrainer.com/login',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
