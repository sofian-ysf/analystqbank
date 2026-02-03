import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start Free CFA Level 1 Trial | 100 Questions Free',
  description: 'Create your free account and get instant access to 100 CFA Level 1 practice questions + 1 mock exam. No credit card required. Start in 30 seconds.',
  alternates: {
    canonical: 'https://www.analysttrainer.com/signup',
  },
  openGraph: {
    title: 'Start Free CFA Level 1 Trial | AnalystTrainer',
    description: 'Get 100 free CFA Level 1 questions + 1 mock exam. No credit card required.',
  },
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
