import { NextRequest, NextResponse } from 'next/server';
import { isGmailConnected, fetchEmailThreads, sendEmail } from '@/lib/gmail';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'status') {
      const connected = await isGmailConnected();
      return NextResponse.json({ connected });
    }

    const userEmail = searchParams.get('user_email');
    if (!userEmail) {
      return NextResponse.json({ error: 'user_email is required' }, { status: 400 });
    }

    const threads = await fetchEmailThreads(userEmail);
    return NextResponse.json({ threads });
  } catch (error: any) {
    console.error('Error fetching emails:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emails', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, body: emailBody } = body;

    if (!to || !subject || !emailBody) {
      return NextResponse.json(
        { error: 'to, subject, and body are required' },
        { status: 400 }
      );
    }

    const result = await sendEmail(to, subject, emailBody);

    if (result.success) {
      return NextResponse.json({ success: true, messageId: result.messageId });
    } else {
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    );
  }
}