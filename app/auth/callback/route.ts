import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/signup?plan=6month'
  const plan = requestUrl.searchParams.get('plan')
  console.log('Callback - code:', !!code, 'plan:', plan, 'next:', next);
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
      let { data: profile } = await supabase
        .from('user_profiles')
        .select('subscription_plan, subscription_status, full_name')
        .eq('id', user.id)
        .single()

      // Create profile if it doesn't exist (fallback if database trigger didn't fire for OAuth)
      if (!profile) {
        console.log('No profile found for user, creating one:', user.id);
        const { data: newProfile, error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.email,
            subscription_plan: 'free',
            subscription_status: null
          })
          .select()
          .single()

        if (profileError) {
          console.error('Error creating profile:', profileError.message);
        } else if (newProfile) {
          console.log('Profile created successfully:', newProfile.id);
          profile = newProfile;
        }
      }

      // Determine if this is a new user (no profile existed before)
      const isNewUser = !profile;

      // Send appropriate Discord notification
      try {
        await fetch(`${requestUrl.origin}/api/notify-discord`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            userId: user.id,
            type: isNewUser ? 'new_user' : 'login',
            fullName: profile?.full_name || ''
          }),
        })
      } catch (notifyError) {
        console.error('Discord notification failed:', notifyError)
      }

      console.log('Profile after callback login:', JSON.stringify(profile));

      // If user has a valid paid subscription with lifetime status, go to dashboard
      if (profile?.subscription_status === 'lifetime') {
        console.log('User has lifetime subscription, redirecting to dashboard');
        return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
      }

      // If plan parameter is provided (from signup with plan selected), redirect to Stripe
      if (plan === '2month' || plan === '6month' || plan === 'lifetime') {
        console.log('Plan found, redirecting to Stripe checkout:', plan);
        return NextResponse.redirect(new URL(`/api/stripe/create-checkout?plan=${plan}`, requestUrl.origin))
      }

      // Otherwise, use the 'next' parameter or fallback to /signup
      console.log('No plan param, redirecting to signup');
      let redirectUrl = next
      // Validate next is safe (relative path starting with /)
      if (!redirectUrl.startsWith('/') || redirectUrl.includes('://')) {
        redirectUrl = '/signup?plan=6month'
      }

      return NextResponse.redirect(new URL(redirectUrl, requestUrl.origin))
    }

    console.log('No user after code exchange, redirecting to signup');
    return NextResponse.redirect(new URL('/signup?plan=6month', requestUrl.origin))
  }

  // No code provided, redirect to login
  return NextResponse.redirect(new URL('/login', requestUrl.origin))
}