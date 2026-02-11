import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/app/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify the email matches the user's email
    if (user.email !== email) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Generate verification token
    const token = crypto.randomUUID()
    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24) // Token valid for 24 hours

    // Store token in user_profiles
    const adminSupabase = createAdminClient()
    const { error: updateError } = await adminSupabase
      .from('user_profiles')
      .update({
        email_verification_token: token,
        email_verification_token_expires: expiresAt.toISOString(),
        email_verification_sent_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Error storing verification token:', updateError)
      return NextResponse.json({ error: 'Failed to generate verification link' }, { status: 500 })
    }

    // Create verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/verify-email?token=${token}`

    // Send email using Supabase auth (or your email service)
    // For now, we'll use a simple approach - in production, use a proper email service
    try {
      // You can integrate with your email service here (SendGrid, Resend, etc.)
      // For now, we'll just log it
      console.log(`Verification email would be sent to ${email}:`, verificationUrl)

      // TODO: Integrate with email service
      // Example with Resend:
      // await resend.emails.send({
      //   from: 'AnalystTrainer <noreply@analysttrainer.com>',
      //   to: email,
      //   subject: 'Verify your email address',
      //   html: `<p>Please verify your email by clicking this link: <a href="${verificationUrl}">Verify Email</a></p>`
      // })

      return NextResponse.json({
        success: true,
        message: 'Verification email sent',
        // For development only - remove in production
        verificationUrl: process.env.NODE_ENV === 'development' ? verificationUrl : undefined
      })
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

  } catch (error) {
    console.error('Error in send-verification-email:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
