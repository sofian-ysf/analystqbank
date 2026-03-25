import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const plan = requestUrl.searchParams.get('plan')
  const error = requestUrl.searchParams.get('error')
  const errorDescription = requestUrl.searchParams.get('error_description')

  // Handle errors from Supabase
  if (error) {
    console.error('Auth error:', error, errorDescription)
    return NextResponse.redirect(
      new URL(`/login?message=${encodeURIComponent(errorDescription || error)}`, requestUrl.origin)
    )
  }

  if (code) {
    const cookieStore = await cookies()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing sessions.
            }
          },
        },
      }
    )

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      console.error('Code exchange error:', exchangeError)
      // If PKCE fails, redirect to login with a helpful message
      if (exchangeError.message.includes('code verifier')) {
        return NextResponse.redirect(
          new URL('/login?message=Your verification link expired or was opened in a different browser. Please log in with your email and password.', requestUrl.origin)
        )
      }
      return NextResponse.redirect(
        new URL(`/login?message=${encodeURIComponent(exchangeError.message)}`, requestUrl.origin)
      )
    }

    // Successfully authenticated - check if user has valid subscription
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('subscription_plan, subscription_status')
        .eq('id', user.id)
        .single()

      // If user has a valid paid subscription with lifetime status, go to dashboard
      if (profile?.subscription_plan && profile.subscription_status === 'lifetime') {
        return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
      }

      // If plan parameter is provided (from OAuth signup), redirect to Stripe
      if (plan === 'basic' || plan === 'premium') {
        return NextResponse.redirect(new URL(`/api/stripe/create-checkout?plan=${plan}`, requestUrl.origin))
      }

      // Otherwise, redirect to pricing page to select a plan
      return NextResponse.redirect(new URL('/pricing', requestUrl.origin))
    }

    return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
  }

  // No code provided, redirect to login
  return NextResponse.redirect(new URL('/login', requestUrl.origin))
}
