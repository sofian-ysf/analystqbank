'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const EXCLUDED_PATHS = [
  '/try-free',
  '/signup',
  '/login',
  '/forgot-password',
  '/dashboard',
]

export default function FloatingGetStartedButton() {
  const pathname = usePathname()

  // Don't show on excluded pages
  if (EXCLUDED_PATHS.some(path => pathname.startsWith(path))) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="/pricing"
        className="flex items-center gap-2 bg-[#1FB8CD] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1A6872] transition-all font-medium"
        style={{
          boxShadow: '0 4px 20px rgba(31, 184, 205, 0.4)'
        }}
      >
        Get Started
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Link>
    </div>
  )
}
