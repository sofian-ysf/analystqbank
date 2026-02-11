'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

export default function EmailVerificationBanner() {
  const [user, setUser] = useState<any>(null)
  const [isVerified, setIsVerified] = useState(true)
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')
  const supabase = createClient()

  useEffect(() => {
    const checkVerification = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setUser(user)
        // Check if email is confirmed in Supabase auth
        // If using custom verification, check user_profiles table
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('email_verified_at')
          .eq('id', user.id)
          .single()

        // If email_verified_at is null, show banner
        setIsVerified(!!profile?.email_verified_at)
      }
    }

    checkVerification()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkVerification()
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleResendEmail = async () => {
    if (!user?.email) return

    setSending(true)
    setMessage('')

    try {
      const response = await fetch('/api/send-verification-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      })

      if (response.ok) {
        setMessage('Verification email sent! Check your inbox.')
      } else {
        setMessage('Failed to send email. Please try again.')
      }
    } catch (error) {
      setMessage('Error sending email. Please try again.')
    } finally {
      setSending(false)
    }
  }

  if (isVerified || !user) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[1002] bg-amber-500 text-white px-4 py-3 text-center">
      <div className="flex items-center justify-center gap-3 text-sm">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span className="font-medium">Please verify your email address to continue using AnalystTrainer</span>
        <button
          onClick={handleResendEmail}
          disabled={sending}
          className="ml-2 underline hover:no-underline font-semibold disabled:opacity-50"
        >
          {sending ? 'Sending...' : 'Resend Email'}
        </button>
      </div>
      {message && (
        <p className="mt-1 text-xs">{message}</p>
      )}
    </div>
  )
}
