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