'use client'

import { usePathname } from 'next/navigation'
import ExitIntentPopup from './ExitIntentPopup'

export default function ExitIntentWrapper() {
  const pathname = usePathname()

  // Don't show on auth pages, dashboard, practice sessions, or admin
  const excludedPaths = [
    '/login',
    '/signup',
    '/dashboard',
    '/practice/session',
    '/admin',
    '/auth',
    '/settings',
    '/checkout',
  ]

  if (excludedPaths.some(path => pathname.startsWith(path))) {
    return null
  }

  // Determine variant based on current page
  let variant: 'formula-sheet' | 'free-trial' | 'discount' | 'question-of-day' = 'formula-sheet'

  if (pathname.startsWith('/blog')) {
    variant = 'formula-sheet'
  } else if (pathname.startsWith('/pricing')) {
    variant = 'free-trial'
  } else if (pathname.startsWith('/topics')) {
    variant = 'question-of-day'
  } else if (pathname === '/' || pathname.startsWith('/cfa-level-1')) {
    variant = 'free-trial'
  } else if (pathname.startsWith('/flashcards')) {
    variant = 'question-of-day'
  }

  return <ExitIntentPopup variant={variant} delay={8000} cookieDays={3} />
}
