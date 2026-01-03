import { NextRequest, NextResponse } from 'next/server';
import { sendDiscordNotification, createNewUserNotification, createContactFormNotification } from '@/lib/discord';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body;

    if (!type) {
      return NextResponse.json(
        { error: 'Type is required' },
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
        if (!body.email) {
          return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }
        payload = createNewUserNotification(body.email);
        break;
      case 'contact_form':
        // Honeypot check - if this field has a value, it's a bot
        if (body.website) {
          // Silently reject but return success to not tip off bots
          return NextResponse.json({ message: 'Message sent successfully' });
        }
        if (!body.name || !body.email || !body.subject || !body.message) {
          return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        payload = createContactFormNotification(body.name, body.email, body.subject, body.message);
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