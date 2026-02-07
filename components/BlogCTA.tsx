'use client'

import Link from 'next/link'

interface BlogCTAProps {
  variant?: 'inline' | 'box' | 'banner'
  title?: string
  description?: string
}

export function BlogCTAInline() {
  return (
    <div className="my-8 p-6 bg-gradient-to-r from-[#13343B] to-[#1a4a54] rounded-2xl text-white">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-lg">Ready to test your knowledge?</p>
          <p className="text-gray-300 text-sm">Try <Link href="/free-cfa-questions" className="underline hover:text-white">100 CFA Level 1 practice questions</Link> free.</p>
        </div>
        <Link
          href="/cfa-level-1-practice-questions"
          className="shrink-0 px-6 py-3 bg-[#1FB8CD] text-white rounded-full font-medium hover:bg-[#18a3b5] transition-colors"
        >
          View Questions
        </Link>
      </div>
    </div>
  )
}

export function BlogCTABox() {
  return (
    <div className="my-12 p-8 bg-[#fbfaf4] border border-gray-200 rounded-2xl">
      <div className="text-center max-w-xl mx-auto">
        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
          Free Trial Available
        </span>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Put Your Knowledge to the Test
        </h3>
        <p className="text-gray-600 mb-6">
          Master CFA Level 1 with 2,500+ exam-style practice questions. Every question includes detailed explanations written by CFA charterholders.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="px-6 py-3 bg-[#13343B] text-white rounded-full font-medium hover:bg-[#1a4a54] transition-colors"
          >
            Start Free Trial
          </Link>
          <Link
            href="/cfa-level-1-practice-questions"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:border-gray-400 transition-colors"
          >
            Learn More
          </Link>
        </div>
        <p className="mt-4 text-xs text-gray-500">No credit card required. 100 free questions included.</p>
      </div>
    </div>
  )
}

export function BlogCTASidebar() {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm sticky top-24">
      <h4 className="font-semibold text-gray-900 mb-2">Practice CFA Questions</h4>
      <p className="text-sm text-gray-600 mb-4">
        2,500+ questions with detailed explanations. Start with 100 free questions.
      </p>
      <Link
        href="/signup"
        className="block w-full text-center px-4 py-2.5 bg-[#13343B] text-white rounded-lg font-medium hover:bg-[#1a4a54] transition-colors text-sm"
      >
        Try Free
      </Link>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-2">Also available:</p>
        <ul className="space-y-1.5 text-sm">
          <li>
            <Link href="/flashcards" className="text-[#1FB8CD] hover:underline">
              Free Flashcards (1,600+)
            </Link>
          </li>
          <li>
            <Link href="/cfa-level-1-mock-exam" className="text-[#1FB8CD] hover:underline">
              Mock Exams
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export function BlogCTAEndOfArticle() {
  return (
    <div className="mt-12 mb-8 p-8 bg-gradient-to-br from-[#13343B] to-[#1a4a54] rounded-2xl text-white">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-3">
          Ready to Pass CFA Level 1?
        </h3>
        <p className="text-gray-300 mb-6">
          Join thousands of candidates who passed their CFA Level 1 exam using AnalystTrainer. Get instant access to <Link href="/cfa-level-1-practice-questions" className="underline hover:text-white">2,500+ practice questions</Link>, <Link href="/cfa-level-1-mock-exam" className="underline hover:text-white">mock exams</Link>, and detailed explanations.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="px-8 py-3 bg-[#1FB8CD] text-white rounded-full font-semibold hover:bg-[#18a3b5] transition-colors"
          >
            Start Free Trial
          </Link>
          <Link
            href="/cfa-level-1-practice-questions"
            className="px-8 py-3 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
          >
            View Practice Questions
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <Link href="/free-cfa-questions" className="hover:underline">100 free questions</Link>
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#1FB8CD]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Instant access
          </span>
        </div>
      </div>
    </div>
  )
}

export function BlogCTAFlashcards() {
  return (
    <div className="my-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="inline-block px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium mb-2">
            100% Free
          </span>
          <p className="font-semibold text-gray-900">Master CFA concepts with free flashcards</p>
          <p className="text-gray-600 text-sm">1,600+ flashcards covering all 10 CFA Level 1 topics.</p>
        </div>
        <Link
          href="/flashcards"
          className="shrink-0 px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors"
        >
          Study Free Flashcards
        </Link>
      </div>
    </div>
  )
}

// Related internal links component
export function BlogRelatedLinks({
  links
}: {
  links: Array<{ href: string; text: string }>
}) {
  return (
    <div className="my-8 p-5 bg-gray-50 rounded-xl border border-gray-200">
      <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Related Resources</h4>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-[#1FB8CD] hover:underline flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
