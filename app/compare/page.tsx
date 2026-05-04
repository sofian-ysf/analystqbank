import { Metadata } from 'next'
import Link from 'next/link'
import Navigation from '@/app/components/Navigation'
import FloatingGetStartedButton from '../components/FloatingGetStartedButton'

// Inline SVG checkmark - avoids Phosphor icons createContext issue in server components
const CheckIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
)

export const metadata: Metadata = {
  title: 'AnalystTrainer vs AnalystPrep: CFA Prep Comparison 2026',
  description: 'Compare AnalystTrainer and AnalystPrep for CFA Level 1. Features, pricing, and which is better for you.',
  keywords: 'analystprep, analyst prep login, cfa prep comparison',
  alternates: {
    canonical: 'https://www.analysttrainer.com/compare',
  },
}

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AnalystTrainer vs AnalystPrep
          </h1>
          <p className="text-xl text-gray-300">
            Compare CFA Level 1 prep platforms side-by-side
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose AnalystTrainer?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white border rounded-xl">
              <h3 className="text-xl font-bold mb-4">AnalystTrainer</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckIcon size={16} className="text-green-500 flex-shrink-0" /> 2,500+ questions
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon size={16} className="text-green-500 flex-shrink-0" /> Unlimited mock exams
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon size={16} className="text-green-500 flex-shrink-0" /> £75 lifetime access
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon size={16} className="text-green-500 flex-shrink-0" /> 1,600+ free flashcards
                </li>
              </ul>
            </div>
            <div className="p-6 bg-gray-50 border rounded-xl">
              <h3 className="text-xl font-bold mb-4">AnalystPrep</h3>
              <ul className="space-y-3 text-gray-600">
                <li>~2,000 questions</li>
                <li>Limited mocks</li>
                <li>$400+ subscription</li>
                <li>Mobile app</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#13343B] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Try AnalystTrainer Today</h2>
          <p className="text-xl mb-8">2,500+ questions and unlimited mock exams included with paid plans.</p>
          <Link href="/signup" className="inline-block px-8 py-4 bg-[#1FB8CD] rounded-full font-semibold">
            Get Started
          </Link>
        </div>
      </section>

      <FloatingGetStartedButton />
    </main>
  )
}
