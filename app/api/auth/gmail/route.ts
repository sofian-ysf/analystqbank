import { NextResponse } from 'next/server';
import { getGmailAuthUrl } from '@/lib/gmail';

export async function GET() {
  try {
    const authUrl = getGmailAuthUrl();

    return NextResponse.json({ authUrl });
  } catch (error: any) {
    console.error('Error generating Gmail auth URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate auth URL', details: error.message },
      { status: 500 }
    );
  }
}