import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up | AnalystTrainer - CFA Level 1 Practice Questions',
  description: 'Create your free AnalystTrainer account and start preparing for CFA Level 1 with 2,500+ practice questions and mock exams. No credit card required for free trial.',
  alternates: {
    canonical: 'https://www.analysttrainer.com/signup',
  },
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
