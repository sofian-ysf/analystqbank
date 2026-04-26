export interface DiscordWebhookPayload {
  content?: string;
  embeds?: Array<{
    title?: string;
    description?: string;
    color?: number;
    timestamp?: string;
    fields?: Array<{
      name: string;
      value: string;
      inline?: boolean;
    }>;
  }>;
}

export async function sendDiscordNotification(
  webhookUrl: string,
  payload: DiscordWebhookPayload
): Promise<boolean> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send Discord notification:', error);
    return false;
  }
}

export function createNewUserNotification(email: string): DiscordWebhookPayload {
  return {
    embeds: [
      {
        title: '🎉 New User Registration',
        description: 'A new user has signed up for Finance Exam Prep!',
        color: 0x00ff00, // Green color
        timestamp: new Date().toISOString(),
        fields: [
          {
            name: 'Email',
            value: email,
            inline: true,
          },
          {
            name: 'Time',
            value: new Date().toLocaleString(),
            inline: true,
          },
        ],
      },
    ],
  };
}

export function createContactFormNotification(
  name: string,
  email: string,
  subject: string,
  message: string
): DiscordWebhookPayload {
  return {
    embeds: [
      {
        title: '📬 New Contact Form Submission',
        description: 'Someone has sent a message via the contact form.',
        color: 0x1fb8cd, // Brand color
        timestamp: new Date().toISOString(),
        fields: [
          {
            name: 'Name',
            value: name,
            inline: true,
          },
          {
            name: 'Email',
            value: email,
            inline: true,
          },
          {
            name: 'Subject',
            value: subject,
            inline: false,
          },
          {
            name: 'Message',
            value: message.length > 1000 ? message.substring(0, 1000) + '...' : message,
            inline: false,
          },
        ],
      },
    ],
  };
}

export function createLoginNotification(
  email: string,
  userId: string,
  fullName?: string
): DiscordWebhookPayload {
  return {
    embeds: [
      {
        title: '👤 User Login',
        description: 'A user has logged in successfully',
        color: 0x0074d4, // Blue
        timestamp: new Date().toISOString(),
        fields: [
          {
            name: 'Full Name',
            value: fullName || 'N/A',
            inline: true,
          },
          {
            name: 'Email',
            value: email,
            inline: true,
          },
          {
            name: 'User ID',
            value: userId,
            inline: false,
          },
          {
            name: 'Time',
            value: new Date().toLocaleString(),
            inline: true,
          },
        ],
      },
    ],
  };
}

export function createCheckoutStartNotification(
  email: string,
  userId: string,
  fullName: string | undefined,
  plan: string
): DiscordWebhookPayload {
  const planDisplay = plan === '2month' ? '2 Months' : plan === '6month' ? '6 Months' : plan === 'lifetime' ? 'Lifetime' : plan;
  return {
    embeds: [
      {
        title: '🛒 Checkout Started',
        description: 'A user has signed up and started checkout',
        color: 0xff9500, // Orange
        timestamp: new Date().toISOString(),
        fields: [
          {
            name: 'Full Name',
            value: fullName || 'N/A',
            inline: true,
          },
          {
            name: 'Email',
            value: email,
            inline: true,
          },
          {
            name: 'User ID',
            value: userId,
            inline: false,
          },
          {
            name: 'Plan Selected',
            value: planDisplay,
            inline: true,
          },
          {
            name: 'Time',
            value: new Date().toLocaleString(),
            inline: true,
          },
        ],
      },
    ],
  };
}

export function createCheckoutCompleteNotification(
  email: string,
  userId: string,
  fullName: string | undefined,
  plan: string,
  amount: number,
  currency: string = 'GBP'
): DiscordWebhookPayload {
  const planDisplay = plan === '2month' ? '2 Months' : plan === '6month' ? '6 Months' : plan === 'lifetime' ? 'Lifetime' : plan;
  const formattedAmount = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
  }).format(amount / 100); // Stripe amounts are in pence/cents

  return {
    embeds: [
      {
        title: '✅ Checkout Complete',
        description: 'A user has completed payment',
        color: 0x00ff00, // Green
        timestamp: new Date().toISOString(),
        fields: [
          {
            name: 'Full Name',
            value: fullName || 'N/A',
            inline: true,
          },
          {
            name: 'Email',
            value: email,
            inline: true,
          },
          {
            name: 'User ID',
            value: userId,
            inline: false,
          },
          {
            name: 'Plan Purchased',
            value: planDisplay,
            inline: true,
          },
          {
            name: 'Amount Paid',
            value: formattedAmount,
            inline: true,
          },
          {
            name: 'Time',
            value: new Date().toLocaleString(),
            inline: true,
          },
        ],
      },
    ],
  };
}