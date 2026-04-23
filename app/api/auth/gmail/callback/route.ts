import { NextRequest, NextResponse } from 'next/server';
import { handleGmailCallback } from '@/lib/gmail';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.redirect(
        new URL(`/admin/users?gmail_error=${encodeURIComponent(error)}`, request.url)
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL('/admin/users?gmail_error=missing_code', request.url)
      );
    }

    const success = await handleGmailCallback(code);

    if (success) {
      return NextResponse.redirect(
        new URL('/admin/users?gmail_connected=true', request.url)
      );
    } else {
      return NextResponse.redirect(
        new URL('/admin/users?gmail_error=token_exchange_failed', request.url)
      );
    }
  } catch (error: any) {
    console.error('Error handling Gmail callback:', error);
    return NextResponse.redirect(
      new URL(`/admin/users?gmail_error=${encodeURIComponent(error.message)}`, request.url)
    );
  }
}