import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const token_hash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type')
  const plan = requestUrl.searchParams.get('plan')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'

  console.log('Auth callback hit:', {
    hasCode: !!code,
    hasTokenHash: !!token_hash,
    type,
    plan,
    next,
    url: request.url
  })

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
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    }
  )

  let user = null
  let authError = null

  // Handle token_hash flow (email confirmation, magic links)
  if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as 'signup' | 'email' | 'recovery' | 'invite' | 'magiclink',
    })
    user = data?.user
    authError = error
    console.log('Token hash verification:', { error: error?.message, userId: user?.id })
  }
  // Handle code flow (OAuth, PKCE)
  else if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    user = data?.user
    authError = error
    console.log('Code exchange result:', { error: error?.message, userId: user?.id })
  }

  if (!authError && user) {
    // Calculate trial end time (24 hours from now)
    const trialEndsAt = new Date()
    trialEndsAt.setHours(trialEndsAt.getHours() + 24)

    // Update user profile with trial info
    // The trigger creates the profile, we just update it with trial info
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        subscription_plan: 'free', // Use 'free' as trial (schema constraint)
        subscription_status: 'trialing',
        trial_ends_at: trialEndsAt.toISOString(),
        full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
      })
      .eq('id', user.id)

    console.log('Profile update result:', { updateError: updateError?.message, userId: user.id })

    // If user selected a paid plan, redirect to checkout
    if (plan === 'basic' || plan === 'premium') {
      return NextResponse.redirect(
        new URL(`/api/stripe/create-checkout?plan=${plan}`, requestUrl.origin)
      )
    }

    return NextResponse.redirect(new URL(next, requestUrl.origin))
  }

  // Return to login with error if something went wrong
  console.log('Auth failed:', { authError: authError?.message })
  return NextResponse.redirect(new URL('/login?message=Could not authenticate', requestUrl.origin))
}