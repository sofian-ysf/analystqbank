import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FBFAF4] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <Link href="/" className="inline-block mb-8">
          <Image src="/logo.png" alt="AnalystTrainer" width={200} height={45} className="h-10 w-auto mx-auto" />
        </Link>

        {/* 404 Illustration */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <p className="text-2xl font-semibold text-gray-900 mt-4">Page Not Found</p>
          <p className="text-gray-600 mt-2 max-w-md mx-auto">
            Looks like you've wandered off the study path. Don't worry, we'll get you back on track.
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Where would you like to go?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#1FB8CD] hover:bg-[#1FB8CD]/5 transition-colors"
            >
              <svg className="w-5 h-5 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Homepage</span>
            </Link>

            <Link
              href="/question-bank"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#1FB8CD] hover:bg-[#1FB8CD]/5 transition-colors"
            >
              <svg className="w-5 h-5 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Question Bank</span>
            </Link>

            <Link
              href="/practice/mock-exam"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#1FB8CD] hover:bg-[#1FB8CD]/5 transition-colors"
            >
              <svg className="w-5 h-5 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Mock Exams</span>
            </Link>

            <Link
              href="/flashcards"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#1FB8CD] hover:bg-[#1FB8CD]/5 transition-colors"
            >
              <svg className="w-5 h-5 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Flashcards</span>
            </Link>

            <Link
              href="/blog"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#1FB8CD] hover:bg-[#1FB8CD]/5 transition-colors"
            >
              <svg className="w-5 h-5 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Blog</span>
            </Link>

            <Link
              href="/help"
              className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-[#1FB8CD] hover:bg-[#1FB8CD]/5 transition-colors"
            >
              <svg className="w-5 h-5 text-[#1FB8CD]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Help Centre</span>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#13343B] to-[#1a4a54] rounded-xl p-8 text-white">
          <h3 className="text-xl font-semibold mb-2">Lost? Start with a free practice question</h3>
          <p className="text-white/80 mb-6">Experience how AnalystTrainer helps you master CFA Level 1</p>
          <Link
            href="/try-free"
            className="inline-block bg-[#1FB8CD] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1A6872] transition-colors"
          >
            Try Demo Questions
          </Link>
        </div>
      </div>
    </div>
  )
}
