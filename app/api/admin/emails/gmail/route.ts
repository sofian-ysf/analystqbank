import { NextRequest, NextResponse } from 'next/server';
import { isGmailConnected, fetchEmailThreads, sendEmail } from '@/lib/gmail';
import { createAdminClient } from '@/lib/supabase';

export async function DELETE(request: NextRequest) {
  try {
    const supabase = createAdminClient();

    // Delete the stored Gmail tokens
    const { error } = await supabase
      .from('admin_settings')
      .delete()
      .eq('key', 'gmail_refresh_token');

    if (error) {
      console.error('Error deleting Gmail tokens:', error);
      return NextResponse.json(
        { error: 'Failed to disconnect Gmail', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error disconnecting Gmail:', error);
    return NextResponse.json(
      { error: 'Failed to disconnect Gmail', details: error.message },
      { status: 500 }
    );
  }
}

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

    // Check if it's an invalid_grant error (token expired/revoked)
    if (error.message?.includes('invalid_grant') || error.message?.includes('Token has been revoked')) {
      return NextResponse.json(
        { error: 'Gmail connection expired. Please reconnect.', invalid_grant: true },
        { status: 401 }
      );
    }

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
      // Check if it's an invalid_grant error
      if (result.error?.includes('invalid_grant') || result.error?.includes('Token has been revoked')) {
        return NextResponse.json(
          { error: 'Gmail connection expired. Please reconnect.', invalid_grant: true },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to send email', details: result.error },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error sending email:', error);

    // Check if it's an invalid_grant error (token expired/revoked)
    if (error.message?.includes('invalid_grant') || error.message?.includes('Token has been revoked')) {
      return NextResponse.json(
        { error: 'Gmail connection expired. Please reconnect.', invalid_grant: true },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send email', details: error.message },
      { status: 500 }
    );
  }
}