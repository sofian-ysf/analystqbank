import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''

  // Redirect non-www to www (only in production)
  if (hostname === 'analysttrainer.com') {
    const url = request.nextUrl.clone()
    url.host = 'www.analysttrainer.com'
    return NextResponse.redirect(url, 301)
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protected routes
  const protectedPaths = ['/dashboard', '/practice', '/mock-exams', '/performance', '/question-bank', '/research-hubs', '/settings', '/profile']
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  // Redirect to login if accessing protected route without authentication
  if (isProtectedPath && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users away from auth pages (unless just browsing)
  const authPaths = ['/login', '/signup']
  const isAuthPath = authPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isAuthPath && user) {
    // If there's a plan parameter, allow them through to checkout
    const hasPlanParam = request.nextUrl.searchParams.has('plan')
    if (hasPlanParam) {
      // Let them through to proceed to checkout
      return NextResponse.next()
    }

    // Check if user has a paid subscription
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('subscription_status')
      .eq('id', user.id)
      .single()

    // If user has lifetime subscription, go to dashboard; otherwise go to pricing
    if (profile?.subscription_status === 'lifetime') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.redirect(new URL('/pricing', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}