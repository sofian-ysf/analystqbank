import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Token required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Find user with this token
    const { data: profile, error: findError } = await supabase
      .from('user_profiles')
      .select('id, email_verification_token_expires')
      .eq('email_verification_token', token)
      .single()

    if (findError || !profile) {
      return NextResponse.json({ error: 'Invalid verification token' }, { status: 400 })
    }

    // Check if token has expired
    const expiresAt = new Date(profile.email_verification_token_expires)
    if (expiresAt < new Date()) {
      return NextResponse.json({ error: 'Verification link has expired' }, { status: 400 })
    }

    // Mark email as verified
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        email_verified_at: new Date().toISOString(),
        email_verification_token: null,
        email_verification_token_expires: null,
      })
      .eq('id', profile.id)

    if (updateError) {
      console.error('Error updating verification status:', updateError)
      return NextResponse.json({ error: 'Failed to verify email' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully'
    })

  } catch (error) {
    console.error('Error in verify-email:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
