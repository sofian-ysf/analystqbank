import { NextRequest, NextResponse } from 'next/server';
import { sendDiscordNotification, createNewUserNotification } from '@/lib/discord';

export async function POST(request: NextRequest) {
  try {
    const { email, type } = await request.json();

    if (!email || !type) {
      return NextResponse.json(
        { error: 'Email and type are required' },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('Discord webhook URL not configured');
      return NextResponse.json(
        { error: 'Discord webhook not configured' },
        { status: 500 }
      );
    }

    let payload;
    switch (type) {
      case 'new_user':
        payload = createNewUserNotification(email);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid notification type' },
          { status: 400 }
        );
    }

    const success = await sendDiscordNotification(webhookUrl, payload);

    if (success) {
      return NextResponse.json({ message: 'Notification sent successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to send notification' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in Discord notification API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}