'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface ExitIntentPopupProps {
  variant?: 'formula-sheet' | 'free-trial' | 'discount' | 'question-of-day'
  delay?: number // milliseconds before enabling exit detection
  cookieDays?: number // days before showing again
}

export default function ExitIntentPopup({
  variant = 'formula-sheet',
  delay = 5000,
  cookieDays = 7
}: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const storageKey = `exit_popup_${variant}_dismissed`

  // Check if popup was recently dismissed
  const wasRecentlyDismissed = useCallback(() => {
    if (typeof window === 'undefined') return true
    const dismissed = localStorage.getItem(storageKey)
    if (!dismissed) return false
    const dismissedDate = new Date(dismissed)
    const daysSince = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24)
    return daysSince < cookieDays
  }, [storageKey, cookieDays])

  // Mark as dismissed
  const dismiss = useCallback(() => {
    localStorage.setItem(storageKey, new Date().toISOString())
    setIsVisible(false)
  }, [storageKey])

  // Handle exit intent detection
  useEffect(() => {
    if (wasRecentlyDismissed()) return

    // Enable after delay
    const enableTimer = setTimeout(() => {
      setIsEnabled(true)
    }, delay)

    return () => clearTimeout(enableTimer)
  }, [delay, wasRecentlyDismissed])

  useEffect(() => {
    if (!isEnabled || wasRecentlyDismissed()) return

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves from the top of the page
      if (e.clientY <= 0 && !isVisible) {
        setIsVisible(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [isEnabled, isVisible, wasRecentlyDismissed])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)

    // TODO: Integrate with your email service (Supabase, ConvertKit, etc.)
    // For now, we'll simulate a submission
    try {
      // You can replace this with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      setTimeout(() => {
        dismiss()
      }, 2000)
    } catch (error) {
      console.error('Failed to submit:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isVisible) return null

  // Different content based on variant
  const content: Record<string, {
    badge: string
    badgeColor: string
    title: string
    description: string
    buttonText: string
    buttonLink?: string
    showEmailForm: boolean
  }> = {
    'formula-sheet': {
      badge: 'FREE DOWNLOAD',
      badgeColor: 'bg-green-100 text-green-700',
      title: 'Wait! Grab Your Free CFA Formula Sheet',
      description: 'Get our comprehensive CFA Level 1 formula sheet with 100+ essential formulas organized by topic. Used by 10,000+ candidates.',
      buttonText: 'Send Me the Formula Sheet',
      showEmailForm: true,
    },
    'free-trial': {
      badge: 'FREE TRIAL',
      badgeColor: 'bg-blue-100 text-blue-700',
      title: 'Not Ready to Commit?',
      description: 'Try 100 CFA Level 1 questions + 1 mock exam completely free. No credit card required.',
      buttonText: 'Start Free Trial',
      buttonLink: '/signup?plan=trial',
      showEmailForm: false,
    },
    'discount': {
      badge: 'LIMITED OFFER',
      badgeColor: 'bg-red-100 text-red-700',
      title: 'Wait! Here\'s 20% Off',
      description: 'Use code STAY20 at checkout for 20% off any plan. Offer expires in 24 hours.',
      buttonText: 'Claim My Discount',
      buttonLink: '/signup?discount=STAY20',
      showEmailForm: false,
    },
    'question-of-day': {
      badge: 'FREE DAILY PRACTICE',
      badgeColor: 'bg-purple-100 text-purple-700',
      title: 'Get a Free CFA Question Every Day',
      description: 'Join 5,000+ candidates receiving a daily CFA Level 1 question with detailed explanation. Build your knowledge one question at a time.',
      buttonText: 'Subscribe Free',
      showEmailForm: true,
    },
  }

  const c = content[variant]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-8">
          {/* Badge */}
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${c.badgeColor}`}>
            {c.badge}
          </span>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {c.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            {c.description}
          </p>

          {isSubmitted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-green-700 font-medium">Check your email!</p>
            </div>
          ) : c.showEmailForm ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1FB8CD] focus:border-transparent outline-none"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-[#13343B] text-white rounded-lg font-semibold hover:bg-[#1a4a54] transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : c.buttonText}
              </button>
            </form>
          ) : (
            <Link
              href={c.buttonLink || '/signup'}
              className="block w-full text-center px-6 py-3 bg-[#13343B] text-white rounded-lg font-semibold hover:bg-[#1a4a54] transition-colors"
              onClick={dismiss}
            >
              {c.buttonText}
            </Link>
          )}

          {/* Trust indicators */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                No spam, ever
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Instant delivery
              </span>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-1 bg-gradient-to-r from-[#1FB8CD] to-[#13343B]" />
      </div>
    </div>
  )
}
