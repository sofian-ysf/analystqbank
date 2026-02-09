'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function PromoBanner() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Add class to body when banner is visible to offset navbar
    if (isVisible) {
      document.body.classList.add('has-promo-banner')
    } else {
      document.body.classList.remove('has-promo-banner')
    }
    return () => {
      document.body.classList.remove('has-promo-banner')
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[1001] bg-[#13343B] text-white px-4 py-2.5 text-center">
      <div className="flex items-center justify-center gap-2 text-sm">
        <span className="hidden sm:inline">Try before you buy:</span>
        <Link
          href="/try-free"
          className="font-semibold underline underline-offset-2 hover:text-[#1FB8CD] transition-colors"
        >
          15 free CFA questions with full explanations
        </Link>
        <span className="text-[#1FB8CD]">→</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1"
        aria-label="Dismiss banner"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
