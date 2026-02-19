'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

export default function Breadcrumbs() {
  const pathname = usePathname()

  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null

  // Build breadcrumb segments
  const segments = pathname.split('/').filter(Boolean)

  // Map path segments to readable names
  const segmentNames: { [key: string]: string } = {
    'question-bank': 'Question Bank',
    'mock-exams': 'Mock Exams',
    'formula-sheets': 'Formula Sheets',
    'try-free': 'Try Free',
    'cfa-level-1-practice-questions': 'Practice Questions',
    'cfa-level-1-mock-exam': 'Mock Exam',
    'free-cfa-questions': 'Free Questions',
    'practice': 'Practice',
    'mock-exam': 'Mock Exam',
    'flashcards': 'Flashcards',
    'blog': 'Blog',
    'about': 'About',
    'help': 'Help',
    'pricing': 'Pricing',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'refund': 'Refund Policy',
    'topics': 'Topics',
    'settings': 'Settings',
    'dashboard': 'Dashboard',
  }

  // Build breadcrumb items
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    ...segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/')
      const name = segmentNames[segment] || segment.split('-').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ')

      return { name, href }
    })
  ]

  return (
    <nav className="bg-white border-b border-gray-200" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 py-3 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <Fragment key={crumb.href}>
              <li className="flex items-center">
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-500">{crumb.name}</span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-[#1FB8CD] hover:text-[#1A6872] transition-colors"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
              {index < breadcrumbs.length - 1 && (
                <li>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </li>
              )}
            </Fragment>
          ))}
        </ol>
      </div>
    </nav>
  )
}
